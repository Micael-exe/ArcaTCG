import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search, LayoutGrid } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const NotFoundPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/busca?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-[#101014] text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center py-16">
          <img
            src="/favicon-192x192.png"
            alt="ArcaTCG"
            className="w-20 h-20 mx-auto mb-6 opacity-90"
          />

          <div className="text-[88px] leading-none font-extrabold tracking-tight text-white">
            404
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-3">
            {t("notfound.heading")}
          </h1>
          <p className="text-[13px] text-[#8a8a8e] mt-3 leading-relaxed">
            {t("notfound.text")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              to="/"
              className="epic-btn-primary w-full sm:w-auto px-6 py-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              {t("notfound.backToStore")}
            </Link>
            <Link
              to="/categorias"
              className="epic-btn-secondary w-full sm:w-auto px-6 py-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              {t("notfound.viewCategories")}
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-[#1a1a1e]">
            <p className="text-[12px] text-[#8a8a8e] mb-3">{t("notfound.searchPrompt")}</p>
            <form onSubmit={handleSubmit} className="relative max-w-sm mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8a8e]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("notfound.searchPlaceholder")}
                className="w-full bg-[#1a1a1e] rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#8a8a8e] focus:outline-none focus:ring-2 focus:ring-[#ff9500]"
              />
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
