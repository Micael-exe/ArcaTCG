import React from "react";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import FreeGames from "../components/FreeGames";
import SectionRow from "../components/SectionRow";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import Footer from "../components/Footer";
import { discoverGames } from "../mock";

const StorePage = () => {
  return (
    <div className="min-h-screen bg-[#101014] text-white">
      <Header />

      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr_320px] gap-6">
          <LeftSidebar />

          <main className="min-w-0">
            <HeroCarousel />
            <FreeGames />
            <SectionRow title="Descubra Novidades" items={discoverGames} />
            <SectionRow title="Mais Populares" items={[...discoverGames].reverse()} />
            <SectionRow title="Ofertas Imperdíveis" items={discoverGames.filter((g) => g.discount)} />
          </main>

          <div className="hidden xl:block pr-6 pt-6">
            <div className="sticky top-[112px]">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StorePage;
