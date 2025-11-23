"use client";

import { useState, useEffect } from "react";
import { fetchGames } from "@/lib/api";
import { GameGrid } from "@/components/GameGrid";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Action", "RPG", "Strategy", "Simulation", "Sports", "Racing"];

export default function CategoriesPage() {
    const [games, setGames] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredGames = games.filter(game => {
        const matchesCategory = activeCategory === "All" || game.category === activeCategory;
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-8 relative z-10">
                {/* Header */}
                <div className="mb-12 text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                        BROWSE GAMES
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Explore our vast collection of digital experiences. Filter by category or search for your next adventure.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between sticky top-20 z-20 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? "default" : "outline"}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "rounded-full border-white/10",
                                    activeCategory === category
                                        ? "shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                                        : "hover:border-primary/50 hover:bg-primary/5"
                                )}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search titles, tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-black/50 border-white/10 focus:border-primary/50"
                        />
                    </div>
                </div>

                {/* Results */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-sm text-muted-foreground border-b border-white/10 pb-4">
                            <span>Showing {filteredGames.length} results</span>
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                <span>Sorted by: Relevance</span>
                            </div>
                        </div>

                        {filteredGames.length > 0 ? (
                            <GameGrid games={filteredGames} />
                        ) : (
                            <div className="text-center py-20 border border-dashed border-white/10 rounded-lg bg-white/5">
                                <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
                                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                                <Button
                                    variant="link"
                                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                                    className="mt-4 text-primary"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
