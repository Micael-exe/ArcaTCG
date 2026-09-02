import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BadgeCheck, ShieldCheck, Truck, Lock, Minus, Plus, ExternalLink, Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GameCard } from "../components/SectionRow";
import SectionRow from "../components/SectionRow";
import { getProductById, discoverGames } from "../mock";
import { optimizeImageUrl, IMAGE_SIZES } from "../lib/image";
import { useLanguage } from "../context/LanguageContext";

const formatPrice = (p) => `R$ ${p.toFixed(2).replace(".", ",")}`;

const ProductPage = () => {
  const { id } = useParams();
  const { t, tc } = useLanguage();
  const product = useMemo(() => getProductById(id), [id]);
  const [qty, setQty] = useState(1);

  const related = useMemo(() => {
    if (!product) return [];
    return discoverGames.filter((p) => p.genre === product.genre && p.id !== product.id).slice(0, 5);
  }, [product]);

  // Cross-sell recommendations: products from OTHER categories, so
  // this differs from "Produtos Associados" below (same category).
  // Falls back to any other product if every remaining item happens
  // to share the same genre.
  const recommendations = useMemo(() => {
    if (!product) return [];
    const crossCategory = discoverGames.filter((p) => p.id !== product.id && p.genre !== product.genre);
    if (crossCategory.length > 0) return crossCategory.slice(0, 6);
    return discoverGames.filter((p) => p.id !== product.id).slice(0, 6);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#101014] text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-[#8a8a8e] mb-4">{t("product.notFound")}</p>
            <Link to="/" className="epic-btn-primary inline-block px-5 py-2.5 rounded-md text-sm font-semibold">
              {t("search.backToStore")}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inStock = product.stock > 0;
  const maxQty = Math.max(1, Math.min(product.stock || 1, 20));
  const hasBuyLink = Boolean(product.buyLink);

  return (
    <div className="min-h-screen bg-[#101014] text-white">
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 lg:px-10 pt-6 pb-16">
        {/* Breadcrumb */}
        <div className="text-[12px] text-[#8a8a8e] mb-6">
          <Link to="/" className="hover:text-white transition-colors">{t("product.breadcrumbStore")}</Link>
          <span className="mx-1.5">/</span>
          <Link to="/categorias" className="hover:text-white transition-colors">{product.genre}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-white">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
          {/* Image with ArcaTCG identity — glow ring + authenticity seal */}
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#1a1a1e] product-image-frame">
              <img
                src={optimizeImageUrl(product.image, { width: 800 })}
                alt={product.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#101014]/85 backdrop-blur-sm border border-[#ff9500]/40 rounded-full pl-2 pr-3 py-1.5">
                <BadgeCheck className="w-4 h-4 text-[#ff9500]" />
                <span className="text-[10px] font-semibold tracking-wide text-[#ff9500]">{t("product.sealAuthenticity")}</span>
              </div>
              {product.discount && (
                <span className="absolute top-3 left-3 discount-badge text-xs px-2.5 py-1 rounded font-bold">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { icon: ShieldCheck, label: t("product.trustOriginal") },
                { icon: Truck, label: t("product.trustShipping") },
                { icon: Lock, label: t("product.trustSecure") },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center bg-[#1a1a1e] rounded-lg py-3 px-2">
                  <Icon className="w-4 h-4 text-[#ff9500]" />
                  <span className="text-[10px] text-[#c6c6ca] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="inline-block text-[11px] tracking-wider font-bold px-2.5 py-1 rounded bg-[#1a1a1e] text-[#ff9500] mb-3">
              {tc(product.tags?.[0]) || product.genre}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-4">
              {product.title}
            </h1>

            {product.description && (
              <p className="text-[14px] text-[#c6c6ca] leading-relaxed mb-5 max-w-xl">
                {product.description}
              </p>
            )}

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.manufacturer && (
                <span className="text-[11px] px-3 py-1.5 rounded-full bg-[#1a1a1e] text-[#c6c6ca]">
                  <strong className="text-white font-medium">{t("product.manufacturer")}:</strong> {product.manufacturer}
                </span>
              )}
              {product.language && (
                <span className="text-[11px] px-3 py-1.5 rounded-full bg-[#1a1a1e] text-[#c6c6ca]">
                  <strong className="text-white font-medium">{t("product.language")}:</strong> {product.language}
                </span>
              )}
              {product.year && (
                <span className="text-[11px] px-3 py-1.5 rounded-full bg-[#1a1a1e] text-[#c6c6ca]">
                  <strong className="text-white font-medium">{t("product.year")}:</strong> {product.year}
                </span>
              )}
            </div>

            {/* Price / stock card */}
            <div className="rounded-xl overflow-hidden border border-[#26262a]">
              <div className="grid grid-cols-4 bg-[#1a1a1e] text-[11px] uppercase tracking-wide text-[#8a8a8e] px-4 py-2.5">
                <span>{t("product.tableCondition")}</span>
                <span>{t("product.tableStock")}</span>
                <span className="col-span-2 text-right">{t("product.tablePrice")}</span>
              </div>
              <div className="grid grid-cols-4 items-center px-4 py-4 bg-[#141418]">
                <span className="text-[13px] text-[#c6c6ca]">{product.condition}</span>
                <span className="text-[13px] text-[#c6c6ca]">
                  {inStock ? `${product.stock} ${t("product.inStockSuffix")}` : t("product.outOfStock")}
                </span>
                <div className="col-span-2 flex flex-col items-end gap-3">
                  <div className="flex items-baseline gap-2">
                    {product.oldPrice && (
                      <span className="text-[13px] text-[#8a8a8e] line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                    <span className="text-xl font-bold text-white">{formatPrice(product.price)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#26262a] rounded-md">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label={t("product.quantity")}
                        className="w-8 h-8 flex items-center justify-center text-[#c6c6ca] hover:text-white hover:bg-[#1a1a1e] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center text-[13px] text-white">{qty}</span>
                      <button
                        onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                        aria-label={t("product.quantity")}
                        className="w-8 h-8 flex items-center justify-center text-[#c6c6ca] hover:text-white hover:bg-[#1a1a1e] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {hasBuyLink ? (
                      <a
                        href={product.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-md text-sm font-bold flex items-center gap-2 bg-[#ff9500] text-[#101014] hover:bg-[#ffaa2b] transition-colors"
                      >
                        {t("product.buyButton")}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        disabled
                        title={t("product.buyLinkMissing")}
                        className="px-6 py-2.5 rounded-md text-sm font-semibold bg-[#26262a] text-[#6a6a6e] cursor-not-allowed"
                      >
                        {t("product.buyButton")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {!hasBuyLink && (
              <p className="text-[11px] text-[#6a6a6e] mt-2">{t("product.buyLinkMissing")}</p>
            )}
          </div>
        </div>

        {/* Purchase recommendations — cross-sell, positioned right
            below the buy area for an impulse-buy nudge. SectionRow
            carries its own horizontal padding (matches StorePage),
            so we cancel <main>'s padding here to keep alignment. */}
        {recommendations.length > 0 && (
          <div className="-mx-4 lg:-mx-10">
            <SectionRow
              title={
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff9500]" />
                  {t("product.recommendedForYou")}
                </span>
              }
              items={recommendations}
              viewMore={false}
            />
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <section className="pt-8">
            <h2 className="text-xl font-bold tracking-tight text-white mb-5">{t("product.relatedProducts")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {related.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
