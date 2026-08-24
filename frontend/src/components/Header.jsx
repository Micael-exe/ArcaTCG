import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, ChevronDown, Globe, Heart, LogOut, UserCircle2 } from "lucide-react";
import { topBarLinks, navLinks } from "../mock";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const LOGO_URL = "https://customer-assets-lqy194kg.emergentagent.net/job_digital-shop-430/artifacts/0vc1ra97_ArcaLOGO.jpeg";

const ArcaLogo = () => (
  <a href="/" className="flex items-center gap-2.5">
    <img
      src={LOGO_URL}
      alt="ArcaTCG"
      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#26262a]"
    />
    <span className="hidden sm:inline text-white font-extrabold tracking-tight text-[16px]">
      Arca<span className="text-[#ff9500]">TCG</span>
    </span>
  </a>
);

const UserMenu = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-2 hover:bg-[#202024] rounded-full pl-1 pr-2 py-1 transition-colors">
        {user.picture ? (
          <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#ff9500] text-[#101014] font-bold text-sm flex items-center justify-center">{initial}</div>
        )}
        <span className="hidden md:inline text-[13px] text-white max-w-[120px] truncate">{user.name || user.email}</span>
        <ChevronDown className="w-3 h-3 text-[#c6c6ca]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-52 bg-[#141418] border border-[#26262a] rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-[#26262a]">
              <div className="text-[13px] text-white truncate">{user.name}</div>
              <div className="text-[11px] text-[#8a8a8e] truncate">{user.email}</div>
            </div>
            <button onClick={() => { setOpen(false); navigate("/perfil"); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#c6c6ca] hover:bg-[#1a1a1e] hover:text-white transition-colors">
              <UserCircle2 className="w-4 h-4" />
              Meu Perfil
            </button>
            <button onClick={() => { setOpen(false); logout(); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#c6c6ca] hover:bg-[#1a1a1e] hover:text-white transition-colors border-t border-[#26262a]">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems, setDrawerOpen } = useCart();
  const [showTopBar, setShowTopBar] = useState(true);

  return (
    <header className="w-full sticky top-0 z-50 bg-[#101014] border-b border-[#1a1a1e]">
      {showTopBar && (
        <div className="hidden lg:flex items-center justify-center gap-6 px-6 py-2 text-[11px] text-[#8a8a8e] border-b border-[#1a1a1e]">
          {topBarLinks.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 lg:gap-6 px-4 lg:px-10 py-3">
        <ArcaLogo />

        <nav className="hidden md:flex items-center gap-6 ml-4">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="nav-link text-[15px] font-medium text-[#c6c6ca] hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex-1 max-w-[420px] mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8a8e]" />
            <input
              type="text"
              placeholder="Buscar cartas, boosters, ETBs..."
              className="w-full bg-[#202024] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#8a8a8e] focus:outline-none focus:ring-2 focus:ring-[#ff9500]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button className="hidden md:flex items-center gap-1 text-[13px] text-[#c6c6ca] hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
            <span>PT-BR</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <button aria-label="wishlist" className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#202024] transition-colors">
            <Heart className="w-5 h-5 text-[#c6c6ca]" />
          </button>
          <button onClick={() => setDrawerOpen(true)} aria-label="carrinho"
            className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#202024] transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-[#c6c6ca]" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ff9500] text-[10px] font-bold text-[#101014] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <UserMenu user={user} logout={logout} />
          ) : (
            <button onClick={() => navigate("/auth")} className="epic-btn-primary px-4 py-2 rounded-md text-sm font-semibold">
              Entrar
            </button>
          )}

          <button aria-label="account" className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#202024]">
            <User className="w-5 h-5 text-[#c6c6ca]" />
          </button>
          <button aria-label="menu" className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#202024]" onClick={() => setShowTopBar(v => !v)}>
            <Menu className="w-5 h-5 text-[#c6c6ca]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
