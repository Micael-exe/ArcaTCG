import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Menu, ChevronDown, Globe, Heart } from "lucide-react";
import { topBarLinks, navLinks, searchCatalog } from "../mock";
import { useLanguage } from "../context/LanguageContext";
const LOGO_URL = "https://customer-assets-lqy194kg.emergentagent.net/job_digital-shop-430/artifacts/0vc1ra97_ArcaLOGO.jpeg";

const ArcaLogo = () => (
  <Link to="/" className="flex items-center gap-2.5">
    <img
      src={LOGO_URL}
      alt="ArcaTCG"
      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#26262a]"
    />
    <span className="hidden sm:inline text-white font-extrabold tracking-tight text-[16px]">
      Arca<span className="text-[#ff9500]">TCG</span>
    </span>
  </Link>
);

// Strips accents and lowercases so search matches "pikachu" against
// "Pikachu" and "café" against "cafe" the same way.
const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const LanguageSwitcher = () => {
  const { language, setLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[13px] text-[#c6c6ca] hover:text-white transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{current.short}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-44 bg-[#141418] border border-[#26262a] rounded-lg shadow-xl z-50 overflow-hidden">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
                  l.code === language ? "text-[#ff9500] bg-[#1a1a1e]" : "text-[#c6c6ca] hover:bg-[#1a1a1e] hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SearchBox = ({ placeholder, viewAllLabel }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const suggestions = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];
    return searchCatalog
      .filter((p) => normalize(p.title).includes(q) || (p.tags || []).some((t) => normalize(t).includes(q)))
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const goToResults = (q) => {
    const trimmed = q.trim();
    setOpen(false);
    navigate(`/busca?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) goToResults(query);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8a8e]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-[#202024] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#8a8a8e] focus:outline-none focus:ring-2 focus:ring-[#ff9500]"
        />
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#141418] border border-[#26262a] rounded-lg shadow-xl z-50 overflow-hidden">
          {suggestions.map((p) => (
            <button
              key={p.id}
              onClick={() => goToResults(p.title)}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[#1a1a1e] transition-colors"
            >
              <img src={p.image} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
              <span className="text-[13px] text-[#c6c6ca] truncate">{p.title}</span>
            </button>
          ))}
          <button
            onClick={() => goToResults(query)}
            className="w-full text-left px-3 py-2.5 text-[12px] text-[#ff9500] hover:bg-[#1a1a1e] border-t border-[#26262a] transition-colors"
          >
            {viewAllLabel} "{query}"
          </button>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { t } = useLanguage();
  const [showTopBar, setShowTopBar] = useState(true);

  return (
    <header className="w-full sticky top-0 z-50 bg-[#101014] border-b border-[#1a1a1e]">
      {showTopBar && (
        <div className="hidden lg:flex items-center justify-center gap-6 px-6 py-2 text-[11px] text-[#8a8a8e] border-b border-[#1a1a1e]">
          {topBarLinks.map((l) => (
            <a key={l.key} href={l.href} className="hover:text-white transition-colors">
              {t(l.key)}
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 lg:gap-6 px-4 lg:px-10 py-3">
        <ArcaLogo />

        <nav className="hidden md:flex items-center gap-6 ml-4">
          {navLinks.map((l) =>
            l.key === "nav.categories" ? (
              <Link key={l.key} to="/categorias" className="nav-link text-[15px] font-medium text-[#c6c6ca] hover:text-white">
                {t(l.key)}
              </Link>
            ) : (
              <a key={l.key} href={l.href} className="nav-link text-[15px] font-medium text-[#c6c6ca] hover:text-white">
                {t(l.key)}
              </a>
            )
          )}
        </nav>

        <div className="flex-1 max-w-[420px] mx-auto">
          <SearchBox placeholder={t("header.searchPlaceholder")} viewAllLabel={t("header.viewAllResultsFor")} />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <LanguageSwitcher />
          <button aria-label={t("header.wishlist")} className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#202024] transition-colors">
            <Heart className="w-5 h-5 text-[#c6c6ca]" />
          </button>

          <button aria-label="menu" className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#202024]" onClick={() => setShowTopBar((v) => !v)}>
            <Menu className="w-5 h-5 text-[#c6c6ca]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
