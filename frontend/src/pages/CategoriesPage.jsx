import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GameCard } from "../components/SectionRow";
import { discoverGames, genres, genreColors } from "../mock";
import { optimizeImageUrl, IMAGE_SIZES } from "../lib/image";
import { useLanguage } from "../context/LanguageContext";

const ALL = "__all__";

const CategoriesPage = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [activeTag, setActiveTag] = useState(null);

  // Real product categories, derived from the catalog itself so this
  // page never drifts out of sync with what's actually for sale.
  const categoryTiles = useMemo(() => {
    const map = new Map();
    discoverGames.forEach((p) => {
      if (!map.has(p.genre)) {
        map.set(p.genre, { name: p.genre, image: p.image, count: 0 });
      }
      map.get(p.genre).count += 1;
    });
    return Array.from(map.values());
  }, []);

  const availableTags = useMemo(() => {
    if (activeCategory === ALL) return [];
    const set = new Set();
    discoverGames
      .filter((p) => p.genre === activeCategory)
      .forEach((p) => (p.tags || []).forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [activeCategory]);

  const results = useMemo(() => {
    return discoverGames.filter((p) => {
      const matchesCategory = activeCategory === ALL || p.genre === activeCategory;
      const matchesTag = !activeTag || (p.tags || []).includes(activeTag);
      return matchesCategory && matchesTag;
    });
  }, [activeCategory, activeTag]);

  const selectCategory = (name) => {
    setActiveCategory(name);
    setActiveTag(null);
    document.getElementById("categorias-resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#101014] text-white">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 lg:px-10">
        {/* Breadcrumb + title */}
        <div className="pt-6 text-[12px] text-[#8a8a8e]">
          <Link to="/" className="hover:text-white transition-colors">{t("categories.breadcrumbStore")}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-white">{t("categories.breadcrumbCategories")}</span>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <div className="w-9 h-9 rounded-lg bg-[#1a1a1e] flex items-center justify-center">
            <LayoutGrid className="w-4.5 h-4.5 text-[#ff9500]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t("categories.title")}</h1>
        </div>
        <p className="text-[13px] text-[#8a8a8e] mt-2 max-w-xl">
          {t("categories.subtitle")}
        </p>

        {/* Category tiles */}
        <section className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => selectCategory(ALL)}
              className={`category-tile relative rounded-xl overflow-hidden aspect-[4/3] group text-left ${
                activeCategory === ALL ? "ring-2 ring-[#ff9500]" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#26262a] to-[#1a1a1e]" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-3">
                <span className="text-[13px] font-semibold text-white">{t("categories.all")}</span>
                <span className="text-[11px] text-[#c6c6ca]">{discoverGames.length} {t("common.products")}</span>
              </div>
            </button>

            {categoryTiles.map((c) => (
              <button
                key={c.name}
                onClick={() => selectCategory(c.name)}
                className={`category-tile relative rounded-xl overflow-hidden aspect-[4/3] group text-left ${
                  activeCategory === c.name ? "ring-2 ring-[#ff9500]" : ""
                }`}
              >
                <img
                  src={optimizeImageUrl(c.image, { width: IMAGE_SIZES.card })}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-3">
                  <span className="text-[13px] font-semibold text-white">{c.name}</span>
                  <span className="text-[11px] text-[#c6c6ca]">{c.count} {c.count > 1 ? t("common.products") : t("common.product")}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Tag filters (only shown once a category is selected) */}
        {availableTags.length > 0 && (
          <section className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-[#8a8a8e] mr-1">{t("categories.filterBy")}</span>
            <button
              onClick={() => setActiveTag(null)}
              className={`text-[12px] px-3 py-1.5 rounded-full transition-colors ${
                !activeTag ? "bg-[#ff9500] text-[#101014] font-semibold" : "bg-[#1a1a1e] text-[#c6c6ca] hover:bg-[#26262a] hover:text-white"
              }`}
            >
              {t("categories.allTags")}
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-[12px] px-3 py-1.5 rounded-full transition-colors ${
                  activeTag === tag ? "bg-[#ff9500] text-[#101014] font-semibold" : "bg-[#1a1a1e] text-[#c6c6ca] hover:bg-[#26262a] hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </section>
        )}

        {/* Results grid */}
        <section id="categorias-resultados" className="pt-10 scroll-mt-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold tracking-tight text-white">
              {activeCategory === ALL ? t("categories.allProducts") : activeCategory}
            </h2>
            <span className="text-[12px] text-[#8a8a8e]">
              {results.length} {results.length !== 1 ? t("common.results") : t("common.result")}
            </span>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {results.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#8a8a8e] text-sm">
              {t("categories.noResults")}
            </div>
          )}
        </section>

        {/* Elemental browsing (decorative — not tied to a product field yet) */}
        <section className="pt-14 pb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold tracking-tight text-white">{t("categories.exploreElements")}</h2>
            <span className="text-[11px] text-[#8a8a8e]">{t("categories.comingSoon")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <span
                key={g}
                title={t("categories.comingSoon")}
                className="text-[12px] px-3 py-1.5 rounded-full bg-[#1a1a1e] text-[#c6c6ca] flex items-center gap-2 opacity-80 cursor-not-allowed select-none"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: genreColors[g] || "#8a8a8e" }}
                />
                {g}
              </span>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoriesPage;
