import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { featuredGames } from "../mock";
import { useCart } from "../context/CartContext";

const HeroCarousel = () => {
  const { addItem } = useCart();
  const [active, setActive] = useState(0);
  const current = featuredGames[active];

  useEffect(() => {
    const t = setInterval(() => {
      setActive((v) => (v + 1) % featuredGames.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const goPrev = () => setActive((v) => (v - 1 + featuredGames.length) % featuredGames.length);
  const goNext = () => setActive((v) => (v + 1) % featuredGames.length);

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 px-4 lg:px-10 pt-6">
        {/* Big hero */}
        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-[16/8] bg-[#1a1a1e] featured-card group">
          <img
            key={current.id}
            src={current.hero}
            alt={current.title}
            className="featured-card-img absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-fade" />
          <div className="absolute inset-0 hero-fade-bottom lg:hidden" />

          <div className="absolute left-6 md:left-10 bottom-8 md:bottom-12 max-w-[520px]">
            <span className="inline-block text-[11px] tracking-[0.14em] font-semibold text-[#c6c6ca] mb-3">
              {current.tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              {current.title}
            </h1>
            <p className="text-[15px] md:text-base text-[#c6c6ca] mb-6 leading-relaxed">
              {current.description}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => addItem({ id: current.id, title: current.title, image: current.hero, price: 199.9 })}
                className="epic-btn-primary px-6 py-3 rounded-md text-sm font-semibold">
                {current.cta}
              </button>
              <button className="epic-btn-secondary px-6 py-3 rounded-md text-sm font-semibold">
                Lista de Desejos
              </button>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={goPrev}
            aria-label="prev"
            className="carousel-arrow hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={goNext}
            aria-label="next"
            className="carousel-arrow hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 lg:hidden">
            {featuredGames.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        {/* Side list */}
        <div className="hidden lg:flex flex-col gap-1">
          {featuredGames.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActive(i)}
              className={`featured-side flex items-center gap-3 p-2 rounded-lg text-left ${
                i === active ? "active" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 bg-[#1a1a1e]">
                <img src={g.hero} alt={g.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-white truncate">{g.title}</div>
                <div className="text-[11px] text-[#8a8a8e] truncate">{g.tagline}</div>
              </div>
              {i === active && (
                <div className="h-8 w-[3px] rounded bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
