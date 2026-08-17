import React from "react";
import { freeGames } from "../mock";
import { Gift } from "lucide-react";

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block text-[10px] tracking-wider font-bold px-2 py-1 rounded ${
      status === "GRÁTIS AGORA" ? "bg-[#ff9500] text-[#101014]" : "bg-[#26262a] text-[#c6c6ca]"
    }`}
  >
    {status}
  </span>
);

const FreeGames = () => {
  return (
    <section className="px-4 lg:px-10 pt-14">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#ff9500]" />
          <h2 className="text-xl font-bold tracking-tight text-white">Brindes & Promoções</h2>
        </div>
        <a href="#" className="text-sm text-[#c6c6ca] hover:text-white transition-colors">
          Ver mais
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {freeGames.map((g) => (
          <a key={g.id} href="#" className="group block relative rounded-xl overflow-hidden bg-[#1a1a1e]">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={g.image}
                alt={g.title}
                className="w-full h-full object-cover game-card-image group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 free-card-overlay pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <StatusBadge status={g.status} />
              <div className="mt-2 text-white text-[15px] font-semibold">{g.title}</div>
              <div className="text-[12px] text-[#c6c6ca]">{g.dates}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FreeGames;
