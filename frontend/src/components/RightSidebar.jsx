import React from "react";
import { topSellers, mostPlayed, upcomingGames, genres } from "../mock";

const formatPrice = (p) => {
  if (p === 0) return "Grátis";
  return `R$ ${p.toFixed(2).replace('.', ',')}`;
};

const RankRow = ({ title, items, showPrice }) => (
  <div>
    <h3 className="text-[15px] font-semibold text-white mb-3">{title}</h3>
    <div className="flex flex-col">
      {items.map((g) => (
        <a
          key={g.id}
          href="#"
          className="flex items-center gap-3 py-2 px-2 -mx-2 rounded-lg hover:bg-[#1a1a1e] transition-colors"
        >
          <div className="text-[13px] text-[#8a8a8e] w-6">{g.rank}</div>
          <div className="w-12 h-16 rounded-md overflow-hidden bg-[#1a1a1e] flex-shrink-0">
            <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] text-white truncate">{g.title}</div>
            <div className="text-[11px] text-[#8a8a8e]">
              {showPrice ? formatPrice(g.price) : g.tag}
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);

const RightSidebar = () => {
  return (
    <aside className="space-y-8">
      <RankRow title="Mais Vendidos" items={topSellers} showPrice />
      <RankRow title="Em Alta" items={mostPlayed} showPrice={false} />
      <RankRow title="Próximos Lançamentos" items={upcomingGames.map((g, i) => ({ ...g, rank: i + 1, tag: g.releaseDate }))} showPrice={false} />

      <div>
        <h3 className="text-[15px] font-semibold text-white mb-3">Tipos & Raridades</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <a
              key={g}
              href="#"
              className="text-[12px] px-3 py-1.5 rounded-full bg-[#1a1a1e] text-[#c6c6ca] hover:bg-[#26262a] hover:text-white transition-colors"
            >
              {g}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
