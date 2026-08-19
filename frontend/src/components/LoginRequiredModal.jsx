import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const LoginRequiredModal = () => {
  const { loginModalOpen, setLoginModalOpen } = useCart();
  const navigate = useNavigate();

  if (!loginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={() => setLoginModalOpen(false)} />
      <div className="relative bg-[#141418] border border-[#26262a] rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <button onClick={() => setLoginModalOpen(false)} className="absolute right-3 top-3 w-8 h-8 rounded-full hover:bg-[#1a1a1e] flex items-center justify-center" aria-label="fechar">
          <X className="w-4 h-4 text-[#c6c6ca]" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#ff9500]/15 flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-[#ff9500]" />
          </div>
          <h3 className="text-lg font-bold mb-2">Autenticação necessária</h3>
          <p className="text-sm text-[#c6c6ca] mb-6">Faça login na sua conta para continuar com a compra.</p>
          <div className="flex gap-3 w-full">
            <button onClick={() => setLoginModalOpen(false)}
              className="flex-1 bg-[#26262a] hover:bg-[#35353a] text-white font-medium py-2.5 rounded-md text-sm transition-colors">
              Cancelar
            </button>
            <button onClick={() => { setLoginModalOpen(false); navigate("/auth"); }}
              className="flex-1 bg-[#ff9500] hover:bg-[#ffab33] text-[#101014] font-semibold py-2.5 rounded-md text-sm transition-colors">
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
