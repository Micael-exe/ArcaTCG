import React, { useRef } from "react";
import { ChevronRight, ChevronLeft, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { optimizeImageUrl, IMAGE_SIZES } from "../lib/image";

const formatPrice = (p) => {
  if (p === 0) return "Grátis";
  return `R$ ${p.toFixed(2).replace('.', ',')}`;
};

export const GameCard = ({ game }) => {
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(game);
  };

  return (
    <div className="game-card block rounded-xl p-2 hover:bg-[#1a1a1e]">
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
        <button
          onClick={handleAdd}
          className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all bg-[#ff9500] hover:bg-[#ffab33] text-[#101014] font-semibold py-2 rounded-md text-xs flex items-center justify-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar ao carrinho
        </button>
      </div>
      <div className="pt-3 px-1 pb-1">
        <div className="text-[11px] text-[#8a8a8e] mb-1">{game.tags?.[0] || "Produto"}</div>
        <div className="text-[14px] font-medium text-white line-clamp-1">{game.title}</div>
        <div className="mt-1 flex items-center gap-2 flex-wrap">
          {game.discount && (
            <span className="discount-badge text-[10px] px-1.5 py-0.5 rounded font-bold">
              {game.discount}
            </span>
          )}
          {game.oldPrice && (
            <span className="text-[12px] text-[#8a8a8e] line-through">{formatPrice(game.oldPrice)}</span>
          )}
          <span className="text-[13px] text-white font-medium">{formatPrice(game.price)}</span>
        </div>
      </div>
    </div>
  );
};

const SectionRow = ({ title, items, viewMore = true }) => {
  const scrollerRef = useRef(null);
  const scrollBy = (dx) => scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="px-4 lg:px-10 pt-14">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
        <div className="flex items-center gap-2">
          {viewMore && (
            <a href="#" className="text-sm text-[#c6c6ca] hover:text-white transition-colors mr-2">Ver mais</a>
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
