import React from "react";
import { Facebook, Twitter, Youtube, Instagram, Twitch } from "lucide-react";

const FooterLinks = ({ title, links }) => (
  <div>
    <h4 className="text-[13px] font-semibold text-white mb-3">{title}</h4>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l}>
          <a href="#" className="text-[12px] text-[#8a8a8e] hover:text-white transition-colors">
            {l}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#1a1a1e] bg-[#0b0b0e]">
      <div className="px-4 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="4" fill="#2A2A2E" />
              <path d="M9 8h14v2.4H11.4V15H21v2.4h-9.6v4.2H23V24H9V8z" fill="#FFFFFF" />
            </svg>
            <span className="text-white text-sm font-semibold">Epic Games Store</span>
          </div>
          <p className="text-[12px] text-[#8a8a8e] mt-3 max-w-sm leading-relaxed">
            © 2025, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Facebook, Twitter, Instagram, Youtube, Twitch].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#1a1a1e] hover:bg-[#26262a] transition-colors flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#c6c6ca]" />
              </a>
            ))}
          </div>
        </div>
        <FooterLinks title="Resources" links={["Company", "MegaGrants", "Support-A-Creator", "Publish on Epic Games", "Careers", "Students", "UnrealEd"]} />
        <FooterLinks title="Games" links={["Fortnite", "Rocket League", "Fall Guys", "Unreal Tournament", "Infinity Blade", "Shadow Complex", "Robo Recall"]} />
        <FooterLinks title="Marketplaces" links={["Epic Games Store", "Fab", "Sketchfab", "ArtStation", "Store Refund Policy", "Store EULA"]} />
        <FooterLinks title="Tools" links={["Unreal Engine", "MetaHuman", "Twinmotion", "Megascans", "RealityScan", "Rad Game Tools"]} />
      </div>

      <div className="border-t border-[#1a1a1e] px-4 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-[11px] text-[#8a8a8e]">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Store Refund Policy</a>
        </div>
        <div className="text-[11px] text-[#8a8a8e]">English</div>
      </div>
    </footer>
  );
};

export default Footer;
