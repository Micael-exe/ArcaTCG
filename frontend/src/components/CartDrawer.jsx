import React from "react";
import { useNavigate } from "react-router-dom";
import { X, ShoppingCart, Plus, Minus, Trash2, LogIn } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const brl = (v) => `R$ ${v.toFixed(2).replace('.', ',')}`;

const CartDrawer = () => {
  const { items, drawerOpen, setDrawerOpen, updateQty, removeItem, totalPrice, checkout } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await checkout();
      alert(`Pedido criado! Nº ${res.order_id}\nTotal: ${brl(res.total)}`);
      setDrawerOpen(false);
    } catch (e) {
      alert("Erro ao finalizar compra");
    }
  };

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[#141418] border-l border-[#1f1f24] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f24]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#ff9500]" />
            <h3 className="text-[15px] font-semibold">Seu Carrinho</h3>
          </div>
          <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-full hover:bg-[#1a1a1e] flex items-center justify-center" aria-label="fechar">
            <X className="w-4 h-4 text-[#c6c6ca]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto epic-scroll px-5 py-4">
          {!user ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <LogIn className="w-10 h-10 text-[#8a8a8e]" />
              <p className="text-sm text-[#c6c6ca]">Faça login para ver seu carrinho</p>
              <button onClick={() => { setDrawerOpen(false); navigate("/auth"); }}
                className="bg-[#ff9500] hover:bg-[#ffab33] text-[#101014] font-semibold px-5 py-2.5 rounded-md text-sm transition-colors">
                Fazer Login
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <ShoppingCart className="w-10 h-10 text-[#8a8a8e]" />
              <p className="text-sm text-[#c6c6ca]">Seu carrinho está vazio</p>
              <p className="text-[12px] text-[#8a8a8e]">Adicione produtos para começar</p>
              <button onClick={() => setDrawerOpen(false)}
                className="bg-[#26262a] hover:bg-[#35353a] text-white px-5 py-2 rounded-md text-sm transition-colors">
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.product_id} className="flex gap-3 bg-[#1a1a1e] rounded-lg p-3">
                  <div className="w-16 h-20 flex-shrink-0 rounded-md overflow-hidden bg-[#101014]">
                    <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="text-[13px] text-white line-clamp-2 mb-1">{it.title}</div>
                    <div className="text-[12px] text-[#8a8a8e] mb-2">Unit.: {brl(it.price)}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-[#101014] rounded-md border border-[#26262a]">
                        <button onClick={() => updateQty(it.product_id, it.quantity - 1)} disabled={it.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center text-[#c6c6ca] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[13px] text-white w-6 text-center">{it.quantity}</span>
                        <button onClick={() => updateQty(it.product_id, it.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#c6c6ca] hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-white">{brl(it.price * it.quantity)}</span>
                        <button onClick={() => removeItem(it.product_id)} className="w-7 h-7 flex items-center justify-center text-[#8a8a8e] hover:text-red-400" aria-label="remover">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {user && items.length > 0 && (
          <div className="border-t border-[#1f1f24] px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#8a8a8e]">Subtotal</span>
              <span className="text-white">{brl(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-[15px] font-semibold">
              <span className="text-white">Total</span>
              <span className="text-[#ff9500]">{brl(totalPrice)}</span>
            </div>
            <button onClick={handleCheckout}
              className="w-full bg-[#ff9500] hover:bg-[#ffab33] text-[#101014] font-semibold py-3 rounded-md text-sm transition-colors">
              Finalizar Compra
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
