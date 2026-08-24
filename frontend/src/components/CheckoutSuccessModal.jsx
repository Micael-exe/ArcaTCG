import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, X, Package } from "lucide-react";

const brl = (v) => `R$ ${Number(v).toFixed(2).replace('.', ',')}`;

const CheckoutSuccessModal = ({ open, order, onClose }) => {
  const navigate = useNavigate();
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141418] border border-[#26262a] rounded-2xl w-full max-w-md p-7 shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 w-8 h-8 rounded-full hover:bg-[#1a1a1e] flex items-center justify-center" aria-label="fechar">
          <X className="w-4 h-4 text-[#c6c6ca]" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-9 h-9 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-1">Compra realizada!</h3>
          <p className="text-sm text-[#c6c6ca] mb-5">Seu pedido foi criado com sucesso.</p>

          <div className="w-full bg-[#1a1a1e] rounded-lg p-4 mb-5 border border-[#26262a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#8a8a8e] uppercase tracking-widest">Número do pedido</span>
              <Package className="w-4 h-4 text-[#ff9500]" />
            </div>
            <div className="text-sm font-mono text-white break-all">{order.order_id}</div>
            <div className="h-px bg-[#26262a] my-3" />
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#8a8a8e]">Total pago</span>
              <span className="text-lg font-bold text-[#ff9500]">{brl(order.total)}</span>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <button onClick={onClose}
              className="flex-1 bg-[#26262a] hover:bg-[#35353a] text-white font-medium py-2.5 rounded-md text-sm transition-colors">
              Continuar comprando
            </button>
            <button onClick={() => { onClose(); navigate("/perfil"); }}
              className="flex-1 bg-[#ff9500] hover:bg-[#ffab33] text-[#101014] font-semibold py-2.5 rounded-md text-sm transition-colors">
              Meus Pedidos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessModal;
