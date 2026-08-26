import React from "react";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import FreeGames from "../components/FreeGames";
import SectionRow from "../components/SectionRow";
import Footer from "../components/Footer";
import { discoverGames } from "../mock";
import { useLanguage } from "../context/LanguageContext";

const StorePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#101014] text-white">
      <Header />

      <main className="max-w-[1400px] mx-auto">
        <HeroCarousel />
        <FreeGames />
        <SectionRow title={t("store.sectionDiscover")} items={discoverGames} />
        <SectionRow title={t("store.sectionPopular")} items={[...discoverGames].reverse()} />
        <SectionRow title={t("store.sectionDeals")} items={discoverGames.filter((g) => g.discount)} />
      </main>

      <Footer />
    </div>
  );
};

export default StorePage;
