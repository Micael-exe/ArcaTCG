import React from "react";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import FreeGames from "../components/FreeGames";
import SectionRow from "../components/SectionRow";
import Footer from "../components/Footer";
import { discoverGames } from "../mock";

const StorePage = () => {
  return (
    <div className="min-h-screen bg-[#101014] text-white">
      <Header />

      <main className="max-w-[1400px] mx-auto">
        <HeroCarousel />
        <FreeGames />
        <SectionRow title="Descubra Novidades" items={discoverGames} />
        <SectionRow title="Mais Populares" items={[...discoverGames].reverse()} />
        <SectionRow title="Ofertas Imperdíveis" items={discoverGames.filter((g) => g.discount)} />
      </main>

      <Footer />
    </div>
  );
};

export default StorePage;
