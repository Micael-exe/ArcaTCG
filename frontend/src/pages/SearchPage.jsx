import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GameCard } from "../components/SectionRow";
import { searchCatalog } from "../mock";
import { useLanguage } from "../context/LanguageContext";

const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const SearchPage = () => {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return searchCatalog.filter(
      (p) => normalize(p.title).includes(q) || (p.tags || []).some((tag) => normalize(tag).includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-[#101014] text-white">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 lg:px-10 pt-8 pb-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-[#1a1a1e] flex items-center justify-center">
            <SearchIcon className="w-4.5 h-4.5 text-[#ff9500]" />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
            {query ? `${t("search.resultsFor")} "${query}"` : t("search.resultsFor")}
          </h1>
        </div>

        {query && (
          <p className="text-[13px] text-[#8a8a8e] mb-8">
            {results.length} {results.length !== 1 ? t("common.results") : t("common.result")}
          </p>
        )}

        {!query ? (
          <div className="text-center py-16 text-[#8a8a8e] text-sm">
            {t("search.noQuery")}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {results.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#8a8a8e] text-sm mb-4">{t("search.empty")}</p>
            <Link to="/" className="epic-btn-primary inline-block px-5 py-2.5 rounded-md text-sm font-semibold">
              {t("search.backToStore")}
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
