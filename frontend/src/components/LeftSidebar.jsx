import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { genres } from "../mock";

const sidebarSections = [
  {
    title: "Tipos & Raridades",
    items: genres.slice(0, 10),
  },
];

const quickLinks = [
  "Booster Packs",
  "Booster Box",
  "Elite Trainer Box",
  "Cartas Avulsas",
  "Decks Prontos",
  "Promo Cards",
  "Acessórios",
  "Sleeves",
  "Toploaders",
  "Ofertas",
];

const LeftSidebar = () => {
  return (
    <aside className="hidden xl:block sticky top-[112px] h-[calc(100vh-112px)] overflow-y-auto pr-2 epic-scroll">
      <div className="px-2 py-4 space-y-6">
        <div>
          <h3 className="text-[12px] uppercase tracking-widest text-[#8a8a8e] mb-3 px-2 flex items-center justify-between">
            <span>Categorias</span>
            <Link to="/categorias" className="text-[#ff9500] normal-case tracking-normal text-[11px] hover:underline">Ver todas</Link>
          </h3>
          <ul className="space-y-1">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="sidebar-item flex items-center justify-between text-[13px] text-[#c6c6ca] hover:text-white px-2 py-1.5 rounded-md hover:bg-[#1a1a1e]">
                  <span>{l}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {sidebarSections.map((s) => (
          <div key={s.title}>
            <h3 className="text-[12px] uppercase tracking-widest text-[#8a8a8e] mb-3 px-2">{s.title}</h3>
            <ul className="space-y-1">
              {s.items.map((l) => (
                <li key={l}>
                  <a href="#" className="sidebar-item block text-[13px] text-[#c6c6ca] hover:text-white px-2 py-1.5 rounded-md hover:bg-[#1a1a1e]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
