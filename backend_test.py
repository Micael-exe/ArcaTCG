#!/usr/bin/env python3
"""
ArcaTCG Backend API Test Suite
Tests auth and cart flows against production backend
"""
import requests
import json
import time
import sys
from datetime import datetime

# Backend URL from frontend/.env
BASE_URL = "https://digital-shop-430.preview.emergentagent.com/api"

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "skipped": []
}

def log_test(name, passed, details=""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if details:
        print(f"   {details}")
    
    if passed:
        test_results["passed"].append(name)
    else:
        test_results["failed"].append({"name": name, "details": details})

def log_skip(name, reason):
    """Log skipped test"""
    print(f"⏭️  SKIP: {name}")
    print(f"   {reason}")
    test_results["skipped"].append({"name": name, "reason": reason})

def print_summary():
    """Print test summary"""
    print("\n" + "="*70)
    print("TEST SUMMARY")
    print("="*70)
    print(f"✅ Passed: {len(test_results['passed'])}")
    print(f"❌ Failed: {len(test_results['failed'])}")
    print(f"⏭️  Skipped: {len(test_results['skipped'])}")
    
    if test_results['failed']:
        print("\n❌ FAILED TESTS:")
        for fail in test_results['failed']:
            print(f"  - {fail['name']}")
            if fail['details']:
                print(f"    {fail['details']}")
    
    if test_results['skipped']:
        print("\n⏭️  SKIPPED TESTS:")
        for skip in test_results['skipped']:
            print(f"  - {skip['name']}: {skip['reason']}")
    
    print("="*70)
    return len(test_results['failed']) == 0

# ============================================================================
# AUTH FLOW TESTS
# ============================================================================

def test_auth_flow():
    """Test complete auth flow: register, login, /me, logout"""
    print("\n" + "="*70)
    print("TESTING AUTH FLOW")
    print("="*70)
    
    # Generate unique email for this test run
    timestamp = int(time.time() * 1000)
    test_email = f"test.user.{timestamp}@arcatcg.com"
    test_password = "SecurePass123!"
    test_name = "Test User ArcaTCG"
    
    session_token = None
    
    # Test 1: Register new user
    print(f"\n1️⃣  Testing POST /auth/register with email: {test_email}")
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json={
                "name": test_name,
                "email": test_email,
                "password": test_password
            },
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            # Check response has required fields
            if all(k in data for k in ["user_id", "email", "name"]):
                # Check for session_token cookie
                if "session_token" in response.cookies:
                    session_token = response.cookies["session_token"]
                    log_test(
                        "Register new user",
                        True,
                        f"user_id={data['user_id']}, email={data['email']}, cookie set"
                    )
                else:
                    log_test(
                        "Register new user",
                        False,
                        "Response OK but no session_token cookie set"
                    )
            else:
                log_test(
                    "Register new user",
                    False,
                    f"Missing fields in response: {data}"
                )
        else:
            log_test(
                "Register new user",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("Register new user", False, f"Exception: {str(e)}")
    
    # Test 2: Register duplicate email
    print(f"\n2️⃣  Testing POST /auth/register with duplicate email")
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json={
                "name": test_name,
                "email": test_email,
                "password": test_password
            },
            timeout=10
        )
        
        if response.status_code == 400:
            data = response.json()
            if "E-mail já cadastrado" in data.get("detail", ""):
                log_test("Register duplicate email returns 400", True, data.get("detail"))
            else:
                log_test(
                    "Register duplicate email returns 400",
                    False,
                    f"Wrong error message: {data.get('detail')}"
                )
        else:
            log_test(
                "Register duplicate email returns 400",
                False,
                f"Expected 400, got {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("Register duplicate email returns 400", False, f"Exception: {str(e)}")
    
    # Test 3: Login with correct credentials
    print(f"\n3️⃣  Testing POST /auth/login with correct credentials")
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={
                "email": test_email,
                "password": test_password
            },
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if all(k in data for k in ["user_id", "email", "name"]):
                if "session_token" in response.cookies:
                    session_token = response.cookies["session_token"]
                    log_test(
                        "Login with correct credentials",
                        True,
                        f"user_id={data['user_id']}, cookie set"
                    )
                else:
                    log_test(
                        "Login with correct credentials",
                        False,
                        "Response OK but no session_token cookie set"
                    )
            else:
                log_test(
                    "Login with correct credentials",
                    False,
                    f"Missing fields in response: {data}"
                )
        else:
            log_test(
                "Login with correct credentials",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("Login with correct credentials", False, f"Exception: {str(e)}")
    
    # Test 4: Login with wrong password
    print(f"\n4️⃣  Testing POST /auth/login with wrong password")
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={
                "email": test_email,
                "password": "WrongPassword123!"
            },
            timeout=10
        )
        
        if response.status_code == 401:
            data = response.json()
            log_test("Login with wrong password returns 401", True, data.get("detail"))
        else:
            log_test(
                "Login with wrong password returns 401",
                False,
                f"Expected 401, got {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("Login with wrong password returns 401", False, f"Exception: {str(e)}")
    
    # Test 5: GET /auth/me with Bearer token
    if session_token:
        print(f"\n5️⃣  Testing GET /auth/me with Bearer token")
        try:
            response = requests.get(
                f"{BASE_URL}/auth/me",
                headers={"Authorization": f"Bearer {session_token}"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if all(k in data for k in ["user_id", "email", "name"]):
                    if data["email"] == test_email:
                        log_test(
                            "GET /auth/me with auth",
                            True,
                            f"Returned user: {data['email']}"
                        )
                    else:
                        log_test(
                            "GET /auth/me with auth",
                            False,
                            f"Wrong user returned: {data['email']}"
                        )
                else:
                    log_test(
                        "GET /auth/me with auth",
                        False,
                        f"Missing fields: {data}"
                    )
            else:
                log_test(
                    "GET /auth/me with auth",
                    False,
                    f"Status {response.status_code}: {response.text}"
                )
        except Exception as e:
            log_test("GET /auth/me with auth", False, f"Exception: {str(e)}")
    else:
        log_skip("GET /auth/me with auth", "No session_token available")
    
    # Test 6: GET /auth/me without auth
    print(f"\n6️⃣  Testing GET /auth/me without auth")
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("GET /auth/me without auth returns 401", True)
        else:
            log_test(
                "GET /auth/me without auth returns 401",
                False,
                f"Expected 401, got {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("GET /auth/me without auth returns 401", False, f"Exception: {str(e)}")
    
    # Test 7: Logout
    if session_token:
        print(f"\n7️⃣  Testing POST /auth/logout")
        try:
            response = requests.post(
                f"{BASE_URL}/auth/logout",
                cookies={"session_token": session_token},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("ok"):
                    log_test("Logout", True, "Session deleted")
                else:
                    log_test("Logout", False, f"Unexpected response: {data}")
            else:
                log_test(
                    "Logout",
                    False,
                    f"Status {response.status_code}: {response.text}"
                )
        except Exception as e:
            log_test("Logout", False, f"Exception: {str(e)}")
        
        # Test 8: GET /auth/me after logout
        print(f"\n8️⃣  Testing GET /auth/me after logout")
        try:
            response = requests.get(
                f"{BASE_URL}/auth/me",
                headers={"Authorization": f"Bearer {session_token}"},
                timeout=10
            )
            
            if response.status_code == 401:
                log_test("GET /auth/me after logout returns 401", True)
            else:
                log_test(
                    "GET /auth/me after logout returns 401",
                    False,
                    f"Expected 401, got {response.status_code}: {response.text}"
                )
        except Exception as e:
            log_test("GET /auth/me after logout returns 401", False, f"Exception: {str(e)}")
    else:
        log_skip("Logout", "No session_token available")
        log_skip("GET /auth/me after logout", "No session_token available")
    
    return session_token

# ============================================================================
# CART FLOW TESTS
# ============================================================================

def test_cart_flow():
    """Test complete cart flow with authentication"""
    print("\n" + "="*70)
    print("TESTING CART FLOW")
    print("="*70)
    
    # Create a new user for cart testing
    timestamp = int(time.time() * 1000)
    test_email = f"cart.user.{timestamp}@arcatcg.com"
    test_password = "CartPass123!"
    test_name = "Cart Test User"
    
    # Test 1: GET /cart without auth
    print(f"\n1️⃣  Testing GET /cart without auth")
    try:
        response = requests.get(f"{BASE_URL}/cart", timeout=10)
        
        if response.status_code == 401:
            log_test("GET /cart without auth returns 401", True)
        else:
            log_test(
                "GET /cart without auth returns 401",
                False,
                f"Expected 401, got {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("GET /cart without auth returns 401", False, f"Exception: {str(e)}")
    
    # Register and login to get session token
    print(f"\n2️⃣  Registering cart test user: {test_email}")
    session_token = None
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json={
                "name": test_name,
                "email": test_email,
                "password": test_password
            },
            timeout=10
        )
        
        if response.status_code == 200 and "session_token" in response.cookies:
            session_token = response.cookies["session_token"]
            log_test("Register cart test user", True, f"Got session token")
        else:
            log_test(
                "Register cart test user",
                False,
                f"Status {response.status_code}: {response.text}"
            )
            return  # Can't continue without auth
    except Exception as e:
        log_test("Register cart test user", False, f"Exception: {str(e)}")
        return
    
    headers = {"Authorization": f"Bearer {session_token}"}
    
    # Test 3: GET /cart (should be empty)
    print(f"\n3️⃣  Testing GET /cart (should be empty)")
    try:
        response = requests.get(f"{BASE_URL}/cart", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "items" in data and len(data["items"]) == 0:
                log_test("GET /cart returns empty cart", True, f"items: []")
            else:
                log_test(
                    "GET /cart returns empty cart",
                    False,
                    f"Expected empty items, got: {data}"
                )
        else:
            log_test(
                "GET /cart returns empty cart",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("GET /cart returns empty cart", False, f"Exception: {str(e)}")
    
    # Test 4: POST /cart/add first product
    print(f"\n4️⃣  Testing POST /cart/add (first product)")
    product1 = {
        "product_id": "prod_booster_001",
        "title": "Booster Pack Série 1",
        "image": "https://via.placeholder.com/200x280/4F46E5/FFFFFF?text=Booster",
        "price": 29.90,
        "quantity": 1
    }
    try:
        response = requests.post(
            f"{BASE_URL}/cart/add",
            headers=headers,
            json=product1,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "items" in data and len(data["items"]) == 1:
                item = data["items"][0]
                if item["product_id"] == product1["product_id"] and item["quantity"] == 1:
                    log_test(
                        "POST /cart/add first product",
                        True,
                        f"Added {item['title']}, quantity=1"
                    )
                else:
                    log_test(
                        "POST /cart/add first product",
                        False,
                        f"Item mismatch: {item}"
                    )
            else:
                log_test(
                    "POST /cart/add first product",
                    False,
                    f"Expected 1 item, got: {data}"
                )
        else:
            log_test(
                "POST /cart/add first product",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /cart/add first product", False, f"Exception: {str(e)}")
    
    # Test 5: POST /cart/add same product (should merge)
    print(f"\n5️⃣  Testing POST /cart/add same product (should merge)")
    try:
        response = requests.post(
            f"{BASE_URL}/cart/add",
            headers=headers,
            json=product1,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "items" in data and len(data["items"]) == 1:
                item = data["items"][0]
                if item["product_id"] == product1["product_id"] and item["quantity"] == 2:
                    log_test(
                        "POST /cart/add same product merges quantity",
                        True,
                        f"Quantity increased to 2"
                    )
                else:
                    log_test(
                        "POST /cart/add same product merges quantity",
                        False,
                        f"Expected quantity=2, got: {item}"
                    )
            else:
                log_test(
                    "POST /cart/add same product merges quantity",
                    False,
                    f"Expected 1 item with quantity=2, got: {data}"
                )
        else:
            log_test(
                "POST /cart/add same product merges quantity",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /cart/add same product merges quantity", False, f"Exception: {str(e)}")
    
    # Test 6: POST /cart/add different product
    print(f"\n6️⃣  Testing POST /cart/add different product")
    product2 = {
        "product_id": "prod_deck_002",
        "title": "Deck Iniciante",
        "image": "https://via.placeholder.com/200x280/10B981/FFFFFF?text=Deck",
        "price": 49.90,
        "quantity": 1
    }
    try:
        response = requests.post(
            f"{BASE_URL}/cart/add",
            headers=headers,
            json=product2,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "items" in data and len(data["items"]) == 2:
                log_test(
                    "POST /cart/add different product",
                    True,
                    f"Now have 2 items in cart"
                )
            else:
                log_test(
                    "POST /cart/add different product",
                    False,
                    f"Expected 2 items, got: {data}"
                )
        else:
            log_test(
                "POST /cart/add different product",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /cart/add different product", False, f"Exception: {str(e)}")
    
    # Test 7: POST /cart/update quantity to 5
    print(f"\n7️⃣  Testing POST /cart/update (set quantity to 5)")
    try:
        response = requests.post(
            f"{BASE_URL}/cart/update",
            headers=headers,
            json={"product_id": product1["product_id"], "quantity": 5},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            item = next((i for i in data["items"] if i["product_id"] == product1["product_id"]), None)
            if item and item["quantity"] == 5:
                log_test(
                    "POST /cart/update quantity to 5",
                    True,
                    f"Quantity updated to 5"
                )
            else:
                log_test(
                    "POST /cart/update quantity to 5",
                    False,
                    f"Expected quantity=5, got: {item}"
                )
        else:
            log_test(
                "POST /cart/update quantity to 5",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /cart/update quantity to 5", False, f"Exception: {str(e)}")
    
    # Test 8: POST /cart/update quantity to 0 (should clamp to 1)
    print(f"\n8️⃣  Testing POST /cart/update (set quantity to 0, should clamp to 1)")
    try:
        response = requests.post(
            f"{BASE_URL}/cart/update",
            headers=headers,
            json={"product_id": product1["product_id"], "quantity": 0},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            item = next((i for i in data["items"] if i["product_id"] == product1["product_id"]), None)
            if item and item["quantity"] == 1:
                log_test(
                    "POST /cart/update quantity to 0 clamps to 1",
                    True,
                    f"Quantity clamped to 1"
                )
            else:
                log_test(
                    "POST /cart/update quantity to 0 clamps to 1",
                    False,
                    f"Expected quantity=1, got: {item}"
                )
        else:
            log_test(
                "POST /cart/update quantity to 0 clamps to 1",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /cart/update quantity to 0 clamps to 1", False, f"Exception: {str(e)}")
    
    # Test 9: POST /cart/remove first product
    print(f"\n9️⃣  Testing POST /cart/remove (remove first product)")
    try:
        response = requests.post(
            f"{BASE_URL}/cart/remove",
            headers=headers,
            json={"product_id": product1["product_id"]},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "items" in data and len(data["items"]) == 1:
                remaining = data["items"][0]
                if remaining["product_id"] == product2["product_id"]:
                    log_test(
                        "POST /cart/remove",
                        True,
                        f"Removed product, 1 item remains"
                    )
                else:
                    log_test(
                        "POST /cart/remove",
                        False,
                        f"Wrong item remaining: {remaining}"
                    )
            else:
                log_test(
                    "POST /cart/remove",
                    False,
                    f"Expected 1 item remaining, got: {data}"
                )
        else:
            log_test(
                "POST /cart/remove",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /cart/remove", False, f"Exception: {str(e)}")
    
    # Test 10: POST /checkout with items
    print(f"\n🔟 Testing POST /checkout with items")
    try:
        response = requests.post(
            f"{BASE_URL}/checkout",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if all(k in data for k in ["order_id", "total"]):
                log_test(
                    "POST /checkout with items",
                    True,
                    f"order_id={data['order_id']}, total={data['total']}"
                )
            else:
                log_test(
                    "POST /checkout with items",
                    False,
                    f"Missing fields in response: {data}"
                )
        else:
            log_test(
                "POST /checkout with items",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /checkout with items", False, f"Exception: {str(e)}")
    
    # Test 11: GET /cart after checkout (should be empty)
    print(f"\n1️⃣1️⃣  Testing GET /cart after checkout (should be empty)")
    try:
        response = requests.get(f"{BASE_URL}/cart", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "items" in data and len(data["items"]) == 0:
                log_test("GET /cart after checkout is empty", True, f"Cart cleared")
            else:
                log_test(
                    "GET /cart after checkout is empty",
                    False,
                    f"Expected empty cart, got: {data}"
                )
        else:
            log_test(
                "GET /cart after checkout is empty",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("GET /cart after checkout is empty", False, f"Exception: {str(e)}")
    
    # Test 12: POST /checkout with empty cart
    print(f"\n1️⃣2️⃣  Testing POST /checkout with empty cart")
    try:
        response = requests.post(
            f"{BASE_URL}/checkout",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 400:
            data = response.json()
            if "Carrinho vazio" in data.get("detail", ""):
                log_test("POST /checkout with empty cart returns 400", True, data.get("detail"))
            else:
                log_test(
                    "POST /checkout with empty cart returns 400",
                    False,
                    f"Wrong error message: {data.get('detail')}"
                )
        else:
            log_test(
                "POST /checkout with empty cart returns 400",
                False,
                f"Expected 400, got {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /checkout with empty cart returns 400", False, f"Exception: {str(e)}")
    
    # Test 13: POST /cart/clear
    print(f"\n1️⃣3️⃣  Testing POST /cart/clear")
    # First add an item
    try:
        requests.post(f"{BASE_URL}/cart/add", headers=headers, json=product1, timeout=10)
        
        response = requests.post(f"{BASE_URL}/cart/clear", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "items" in data and len(data["items"]) == 0:
                log_test("POST /cart/clear", True, f"Cart cleared")
            else:
                log_test(
                    "POST /cart/clear",
                    False,
                    f"Expected empty cart, got: {data}"
                )
        else:
            log_test(
                "POST /cart/clear",
                False,
                f"Status {response.status_code}: {response.text}"
            )
    except Exception as e:
        log_test("POST /cart/clear", False, f"Exception: {str(e)}")

# ============================================================================
# MAIN
# ============================================================================

def main():
    print("="*70)
    print("ArcaTCG Backend API Test Suite")
    print("="*70)
    print(f"Backend URL: {BASE_URL}")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Run auth tests
    test_auth_flow()
    
    # Run cart tests
    test_cart_flow()
    
    # Print summary
    success = print_summary()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
