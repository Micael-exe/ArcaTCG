import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Package, LogOut, User as UserIcon, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets-lqy194kg.emergentagent.net/job_digital-shop-430/artifacts/0vc1ra97_ArcaLOGO.jpeg";

const brl = (v) => `R$ ${Number(v).toFixed(2).replace('.', ',')}`;

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth", { replace: true, state: { from: "/perfil" } });
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get(`${API}/orders`, { withCredentials: true });
        setOrders(data.orders || []);
      } catch (e) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, authLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[#101014] text-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#ff9500] border-t-transparent animate-spin" />
      </div>
    );
  }

  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#101014] text-white">
      <div className="px-4 lg:px-10 py-4 border-b border-[#1a1a1e] flex items-center gap-3">
        <button onClick={() => navigate("/")} className="w-9 h-9 rounded-full hover:bg-[#1a1a1e] flex items-center justify-center transition-colors" aria-label="voltar">
          <ArrowLeft className="w-5 h-5 text-[#c6c6ca]" />
        </button>
        <a href="/" className="flex items-center gap-2.5">
          <img src={LOGO_URL} alt="ArcaTCG" className="w-9 h-9 rounded-full object-cover ring-1 ring-[#26262a]" />
          <span className="text-white font-extrabold tracking-tight text-[16px]">Arca<span className="text-[#ff9500]">TCG</span></span>
        </a>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* User card */}
        <div className="bg-[#141418] rounded-2xl p-6 border border-[#1f1f24] mb-8">
          <div className="flex items-center gap-4">
            {user.picture ? (
              <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-[#ff9500]" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#ff9500] text-[#101014] font-bold text-2xl flex items-center justify-center">{initial}</div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[11px] text-[#8a8a8e] uppercase tracking-widest mb-1">
                <UserIcon className="w-3 h-3" /> Perfil
              </div>
              <h1 className="text-xl font-bold truncate">{user.name}</h1>
              <p className="text-sm text-[#c6c6ca] truncate">{user.email}</p>
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-2 bg-[#26262a] hover:bg-[#35353a] px-4 py-2 rounded-md text-sm transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Orders */}
        <div className="flex items-center gap-2 mb-5">
          <ShoppingBag className="w-5 h-5 text-[#ff9500]" />
          <h2 className="text-lg font-bold">Meus Pedidos</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 rounded-full border-2 border-[#ff9500] border-t-transparent animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#141418] rounded-2xl p-10 border border-[#1f1f24] text-center">
            <Package className="w-10 h-10 text-[#8a8a8e] mx-auto mb-3" />
            <p className="text-sm text-[#c6c6ca] mb-4">Você ainda não tem pedidos.</p>
            <button onClick={() => navigate("/")}
              className="bg-[#ff9500] hover:bg-[#ffab33] text-[#101014] font-semibold px-5 py-2.5 rounded-md text-sm transition-colors">
              Explorar a loja
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.order_id} className="bg-[#141418] rounded-xl border border-[#1f1f24] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-[#1a1a1e] border-b border-[#1f1f24]">
                  <div>
                    <div className="text-[11px] text-[#8a8a8e] uppercase tracking-widest">Pedido</div>
                    <div className="text-sm font-mono text-white">{o.order_id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-[#8a8a8e]">{formatDate(o.created_at)}</div>
                    <div className="text-sm font-bold text-[#ff9500]">{brl(o.total)}</div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {(o.items || []).map((it) => (
                    <div key={it.product_id} className="flex items-center gap-3">
                      <div className="w-12 h-14 flex-shrink-0 rounded-md overflow-hidden bg-[#101014]">
                        <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] text-white truncate">{it.title}</div>
                        <div className="text-[11px] text-[#8a8a8e]">Qtd: {it.quantity} · {brl(it.price)}</div>
                      </div>
                      <div className="text-[13px] text-white font-medium">{brl(it.price * it.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
