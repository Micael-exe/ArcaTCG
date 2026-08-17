import React from "react";
import { ChevronRight } from "lucide-react";
import { genres } from "../mock";

const sidebarSections = [
  {
    title: "Genres",
    items: genres.slice(0, 10),
  },
];

const quickLinks = [
  "Fortnite",
  "Rocket League",
  "Fall Guys",
  "Unreal Tournament",
  "Free Games",
  "Achievements",
  "Bundles",
  "Editor's Picks",
  "Recently Updated",
  "On Sale",
];

const LeftSidebar = () => {
  return (
    <aside className="hidden xl:block sticky top-[112px] h-[calc(100vh-112px)] overflow-y-auto pr-2 epic-scroll">
      <div className="px-2 py-4 space-y-6">
        <div>
          <h3 className="text-[12px] uppercase tracking-widest text-[#8a8a8e] mb-3 px-2">Discover</h3>
          <ul className="space-y-1">
            {quickLinks.map((l) => (
              <li key={l}>
                <a href="#" className="sidebar-item flex items-center justify-between text-[13px] text-[#c6c6ca] hover:text-white px-2 py-1.5 rounded-md hover:bg-[#1a1a1e]">
                  <span>{l}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
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
