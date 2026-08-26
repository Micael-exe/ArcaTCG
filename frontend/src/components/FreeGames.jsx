import React from "react";
import { freeGames } from "../mock";
import { Gift } from "lucide-react";
import { optimizeImageUrl, IMAGE_SIZES } from "../lib/image";
import { useLanguage } from "../context/LanguageContext";

const FreeGames = () => {
  const { t } = useLanguage();

  const statusLabel = (status) => {
    if (status === "GRÁTIS AGORA") return t("freeGames.statusNow");
    if (status === "EM BREVE") return t("freeGames.statusSoon");
    return status;
  };

  return (
    <section className="px-4 lg:px-10 pt-14">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#ff9500]" />
          <h2 className="text-xl font-bold tracking-tight text-white">{t("freeGames.title")}</h2>
        </div>
        <a href="#" className="text-sm text-[#c6c6ca] hover:text-white transition-colors">
          {t("common.viewMore")}
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {freeGames.map((g) => (
          <div key={g.id} className="group relative rounded-xl overflow-hidden bg-[#1a1a1e]">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={optimizeImageUrl(g.image, { width: IMAGE_SIZES.freeGame })}
                alt={g.title}
                loading="lazy"
                decoding="async"
                width={IMAGE_SIZES.freeGame}
                height={Math.round((IMAGE_SIZES.freeGame * 9) / 16)}
                className="w-full h-full object-cover game-card-image group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 free-card-overlay pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span
                className={`inline-block text-[10px] tracking-wider font-bold px-2 py-1 rounded ${
                  g.status === "GRÁTIS AGORA" ? "bg-[#ff9500] text-[#101014]" : "bg-[#26262a] text-[#c6c6ca]"
                }`}
              >
                {statusLabel(g.status)}
              </span>
              <div className="mt-2 text-white text-[15px] font-semibold">{g.title}</div>
              <div className="text-[12px] text-[#c6c6ca]">{g.dates}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FreeGames;
