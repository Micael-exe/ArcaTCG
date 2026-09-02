import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { optimizeImageUrl, IMAGE_SIZES } from "../lib/image";
import { useLanguage } from "../context/LanguageContext";

const formatPrice = (p, freeLabel) => {
  if (p === 0) return freeLabel;
  return `R$ ${p.toFixed(2).replace('.', ',')}`;
};

export const GameCard = ({ game }) => {
  const { tc, t } = useLanguage();

  return (
    <Link to={`/produto/${game.id}`} className="game-card block rounded-xl p-2 hover:bg-[#1a1a1e]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#1a1a1e] group">
        <img
          src={optimizeImageUrl(game.image, { width: IMAGE_SIZES.card })}
          alt={game.title}
          loading="lazy"
          decoding="async"
          width={IMAGE_SIZES.card}
          height={Math.round((IMAGE_SIZES.card * 4) / 3)}
          className="w-full h-full object-cover game-card-image"
        />
        {game.discount && (
          <span className="absolute top-2 left-2 discount-badge text-xs px-2 py-1 rounded">
            {game.discount}
          </span>
        )}
      </div>
      <div className="pt-3 px-1 pb-1">
        <div className="text-[11px] text-[#8a8a8e] mb-1">{tc(game.tags?.[0]) || t("common.product")}</div>
        <div className="text-[14px] font-medium text-white line-clamp-1">{game.title}</div>
        <div className="mt-1 flex items-center gap-2 flex-wrap">
          {game.discount && (
            <span className="discount-badge text-[10px] px-1.5 py-0.5 rounded font-bold">
              {game.discount}
            </span>
          )}
          {game.oldPrice && (
            <span className="text-[12px] text-[#8a8a8e] line-through">{formatPrice(game.oldPrice, t("common.free"))}</span>
          )}
          <span className="text-[13px] text-white font-medium">{formatPrice(game.price, t("common.free"))}</span>
        </div>
      </div>
    </Link>
  );
};

const SectionRow = ({ title, items, viewMore = true }) => {
  const { t } = useLanguage();
  const scrollerRef = useRef(null);
  const scrollBy = (dx) => scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="px-4 lg:px-10 pt-14">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
        <div className="flex items-center gap-2">
          {viewMore && (
            <a href="#" className="text-sm text-[#c6c6ca] hover:text-white transition-colors mr-2">{t("common.viewMore")}</a>
          )}
          <button onClick={() => scrollBy(-400)} className="carousel-arrow w-8 h-8 rounded-full flex items-center justify-center" aria-label="scroll left">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button onClick={() => scrollBy(400)} className="carousel-arrow w-8 h-8 rounded-full flex items-center justify-center" aria-label="scroll right">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="epic-scroll flex gap-3 overflow-x-auto -mx-2 px-2 pb-2 snap-x">
        {items.map((g) => (
          <div key={g.id} className="w-[180px] md:w-[210px] flex-shrink-0 snap-start">
            <GameCard game={g} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionRow;
