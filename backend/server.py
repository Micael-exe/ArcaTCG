from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request, Response, Cookie, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ================== MODELS ==================

class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CartItem(BaseModel):
    product_id: str
    title: str
    image: str
    price: float
    quantity: int = 1

class Cart(BaseModel):
    user_id: str
    items: List[CartItem] = []
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AddCartRequest(BaseModel):
    product_id: str
    title: str
    image: str
    price: float
    quantity: int = 1

class UpdateCartRequest(BaseModel):
    product_id: str
    quantity: int

class RemoveCartRequest(BaseModel):
    product_id: str


# ================== AUTH HELPER ==================

async def get_current_user(
    request: Request,
    session_token: Optional[str] = Cookie(None),
    authorization: Optional[str] = Header(None),
) -> User:
    token = session_token
    if not token and authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1]

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")

    expires_at = session.get("expires_at")
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at and expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at and expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")

    user_doc = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    return User(**user_doc)


# ================== AUTH ROUTES ==================

@api_router.post("/auth/session")
async def create_session(request: Request, response: Response):
    """Exchange Emergent session_id for a session_token cookie."""
    body = await request.json()
    session_id = body.get("session_id")
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id required")

    async with httpx.AsyncClient() as client_http:
        r = await client_http.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id},
            timeout=15.0,
        )
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")

    data = r.json()
    email = data.get("email")
    name = data.get("name", email)
    picture = data.get("picture")
    session_token = data.get("session_token")

    # find or create user
    user_doc = await db.users.find_one({"email": email}, {"_id": 0})
    if user_doc:
        user_id = user_doc["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "created_at": datetime.now(timezone.utc),
        })

    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at,
        "created_at": datetime.now(timezone.utc),
    })

    response.set_cookie(
        key="session_token",
        value=session_token,
        max_age=7 * 24 * 60 * 60,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )

    return {
        "user_id": user_id,
        "email": email,
        "name": name,
        "picture": picture,
    }


@api_router.get("/auth/me")
async def me(user: User = Depends(get_current_user)):
    return {
        "user_id": user.user_id,
        "email": user.email,
        "name": user.name,
        "picture": user.picture,
    }


@api_router.post("/auth/logout")
async def logout(
    response: Response,
    session_token: Optional[str] = Cookie(None),
):
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    response.delete_cookie(key="session_token", path="/", samesite="none", secure=True)
    return {"ok": True}


# Email/password auth (simple, for demo)
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

import hashlib

def hash_pw(pw: str) -> str:
    return hashlib.sha256(pw.encode()).hexdigest()

@api_router.post("/auth/register")
async def register(req: RegisterRequest, response: Response):
    existing = await db.users.find_one({"email": req.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    await db.users.insert_one({
        "user_id": user_id,
        "email": req.email,
        "name": req.name,
        "picture": None,
        "password_hash": hash_pw(req.password),
        "created_at": datetime.now(timezone.utc),
    })
    session_token = f"tok_{uuid.uuid4().hex}"
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at,
        "created_at": datetime.now(timezone.utc),
    })
    response.set_cookie(
        key="session_token",
        value=session_token,
        max_age=7 * 24 * 60 * 60,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )
    return {"user_id": user_id, "email": req.email, "name": req.name, "picture": None}


@api_router.post("/auth/login")
async def login(req: LoginRequest, response: Response):
    user_doc = await db.users.find_one({"email": req.email})
    if not user_doc or user_doc.get("password_hash") != hash_pw(req.password):
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos")
    user_id = user_doc["user_id"]
    session_token = f"tok_{uuid.uuid4().hex}"
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at,
        "created_at": datetime.now(timezone.utc),
    })
    response.set_cookie(
        key="session_token",
        value=session_token,
        max_age=7 * 24 * 60 * 60,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )
    return {
        "user_id": user_id,
        "email": user_doc["email"],
        "name": user_doc["name"],
        "picture": user_doc.get("picture"),
    }


# ================== CART ROUTES ==================

async def _get_or_create_cart(user_id: str) -> dict:
    cart = await db.carts.find_one({"user_id": user_id}, {"_id": 0})
    if not cart:
        cart = {"user_id": user_id, "items": [], "updated_at": datetime.now(timezone.utc)}
        await db.carts.insert_one(cart.copy())
        cart.pop("_id", None)
    return cart


@api_router.get("/cart")
async def get_cart(user: User = Depends(get_current_user)):
    cart = await _get_or_create_cart(user.user_id)
    return cart


@api_router.post("/cart/add")
async def add_to_cart(req: AddCartRequest, user: User = Depends(get_current_user)):
    cart = await _get_or_create_cart(user.user_id)
    items = cart.get("items", [])
    existing = next((i for i in items if i["product_id"] == req.product_id), None)
    if existing:
        existing["quantity"] += req.quantity
    else:
        items.append(req.dict())
    await db.carts.update_one(
        {"user_id": user.user_id},
        {"$set": {"items": items, "updated_at": datetime.now(timezone.utc)}},
        upsert=True,
    )
    return {"user_id": user.user_id, "items": items}


@api_router.post("/cart/update")
async def update_cart(req: UpdateCartRequest, user: User = Depends(get_current_user)):
    cart = await _get_or_create_cart(user.user_id)
    items = cart.get("items", [])
    for i in items:
        if i["product_id"] == req.product_id:
            i["quantity"] = max(1, req.quantity)
            break
    await db.carts.update_one(
        {"user_id": user.user_id},
        {"$set": {"items": items, "updated_at": datetime.now(timezone.utc)}},
    )
    return {"user_id": user.user_id, "items": items}


@api_router.post("/cart/remove")
async def remove_from_cart(req: RemoveCartRequest, user: User = Depends(get_current_user)):
    cart = await _get_or_create_cart(user.user_id)
    items = [i for i in cart.get("items", []) if i["product_id"] != req.product_id]
    await db.carts.update_one(
        {"user_id": user.user_id},
        {"$set": {"items": items, "updated_at": datetime.now(timezone.utc)}},
    )
    return {"user_id": user.user_id, "items": items}


@api_router.post("/cart/clear")
async def clear_cart(user: User = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": user.user_id},
        {"$set": {"items": [], "updated_at": datetime.now(timezone.utc)}},
        upsert=True,
    )
    return {"user_id": user.user_id, "items": []}


@api_router.post("/checkout")
async def checkout(user: User = Depends(get_current_user)):
    cart = await _get_or_create_cart(user.user_id)
    if not cart.get("items"):
        raise HTTPException(status_code=400, detail="Carrinho vazio")
    order_id = f"order_{uuid.uuid4().hex[:12]}"
    total = sum(i["price"] * i["quantity"] for i in cart["items"])
    await db.orders.insert_one({
        "order_id": order_id,
        "user_id": user.user_id,
        "items": cart["items"],
        "total": total,
        "status": "created",
        "created_at": datetime.now(timezone.utc),
    })
    await db.carts.update_one(
        {"user_id": user.user_id},
        {"$set": {"items": [], "updated_at": datetime.now(timezone.utc)}},
    )
    return {"order_id": order_id, "total": total, "status": "created"}


@api_router.get("/orders")
async def list_orders(user: User = Depends(get_current_user)):
    cursor = db.orders.find({"user_id": user.user_id}, {"_id": 0}).sort("created_at", -1).limit(50)
    orders = []
    async for doc in cursor:
        # normalize date
        ca = doc.get("created_at")
        if hasattr(ca, "isoformat"):
            doc["created_at"] = ca.isoformat()
        orders.append(doc)
    return {"orders": orders}


@api_router.get("/")
async def root():
    return {"message": "ArcaTCG API", "version": "1.0"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Compress JSON/text responses over 500 bytes (gzip). Reduces payload
# size for list endpoints (orders, products, etc.) with no client changes needed.
app.add_middleware(GZipMiddleware, minimum_size=500)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
