"use client";

import { useState } from "react";
import HeroList from "./components/HeroList";
import HeroDetail from "./components/HeroDetail";
import { Hero } from "../types"; // Import Hero type

const Home: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Star Wars Heroes</h1>
      <div className="flex">
        <div className="w-1/2">
          <HeroList onSelectHero={setSelectedHero} />
        </div>
        <div className="w-1/2">
          {selectedHero && <HeroDetail hero={selectedHero} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
