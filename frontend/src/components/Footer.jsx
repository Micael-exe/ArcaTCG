import React from "react";
import { Facebook, Twitter, Youtube, Instagram, Twitch } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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

const ArcaLogoSmall = () => (
  <img
    src="https://customer-assets-lqy194kg.emergentagent.net/job_digital-shop-430/artifacts/0vc1ra97_ArcaLOGO.jpeg"
    alt="ArcaTCG"
    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#26262a]"
  />
);

const Footer = () => {
  const { t, language, languages } = useLanguage();
  const currentLangLabel = languages.find((l) => l.code === language)?.label;

  return (
    <footer className="mt-20 border-t border-[#1a1a1e] bg-[#0b0b0e]">
      <div className="px-4 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <ArcaLogoSmall />
            <span className="text-white text-sm font-semibold">Arca<span className="text-[#ff9500]">TCG</span></span>
          </div>
          <p className="text-[12px] text-[#8a8a8e] mt-3 max-w-sm leading-relaxed">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Facebook, Twitter, Instagram, Youtube, Twitch].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#1a1a1e] hover:bg-[#26262a] transition-colors flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#c6c6ca]" />
              </a>
            ))}
          </div>
        </div>
        <FooterLinks title={t("footer.columnStore")} links={t("footer.items.store")} />
        <FooterLinks title={t("footer.columnCollections")} links={t("footer.items.collections")} />
        <FooterLinks title={t("footer.columnHelp")} links={t("footer.items.help")} />
        <FooterLinks title={t("footer.columnCommunity")} links={t("footer.items.community")} />
      </div>

      <div className="border-t border-[#1a1a1e] px-4 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-[11px] text-[#8a8a8e]">
          <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
          <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
          <a href="#" className="hover:text-white transition-colors">{t("footer.refund")}</a>
        </div>
        <div className="text-[11px] text-[#8a8a8e]">{currentLangLabel}</div>
      </div>
    </footer>
  );
};

export default Footer;
