
"use client";

import { useState, useEffect } from "react";
import { fetchGames } from "@/lib/api";
import { Hero as HeroSection } from "@/components/Hero";
import { FeaturedSection } from "@/components/FeaturedSection";
import { GameGrid } from "@/components/GameGrid";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (error) {
        console.error("Failed to load games:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadGames();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const trendingGames = games.filter(g => g.isTrending);
  const newGames = games.filter(g => g.isNew);

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <HeroSection />

      <div className="container mx-auto px-4 space-y-20 py-10 relative z-10">
        <FeaturedSection title="Trending Now" games={trendingGames} />
        <FeaturedSection title="New Arrivals" games={newGames} />

        <div id="all-games" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-orbitron text-white flex items-center gap-3">
              <span className="w-1.5 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
              All Games
            </h2>
          </div>
          <GameGrid games={games} />
        </div>
      </div>
    </main>
  );
}

