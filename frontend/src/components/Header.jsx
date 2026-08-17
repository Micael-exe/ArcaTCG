import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, ChevronDown, Globe, Heart } from "lucide-react";
import { topBarLinks, navLinks } from "../mock";

const LOGO_URL = "https://customer-assets-lqy194kg.emergentagent.net/job_digital-shop-430/artifacts/0vc1ra97_ArcaLOGO.jpeg";

const ArcaLogo = () => (
  <a href="#" className="flex items-center gap-2.5">
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

const Header = () => {
  const [showTopBar, setShowTopBar] = useState(true);

  return (
    <header className="w-full sticky top-0 z-50 bg-[#101014] border-b border-[#1a1a1e]">
      {/* Top thin bar */}
      {showTopBar && (
        <div className="hidden lg:flex items-center justify-center gap-6 px-6 py-2 text-[11px] text-[#8a8a8e] border-b border-[#1a1a1e]">
          {topBarLinks.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* Main nav */}
      <div className="flex items-center gap-3 lg:gap-6 px-4 lg:px-10 py-3">
        <ArcaLogo />

        <nav className="hidden md:flex items-center gap-6 ml-4">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link text-[15px] font-medium text-[#c6c6ca] hover:text-white"
            >
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
          <button aria-label="cart" className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#202024] transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-[#c6c6ca]" />
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ff9500] text-[10px] font-bold text-[#101014] flex items-center justify-center">2</span>
          </button>
          <button className="epic-btn-primary px-4 py-2 rounded-md text-sm font-semibold">
            Entrar
          </button>
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
