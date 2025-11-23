import { Game } from "@/lib/data";
import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface FeaturedSectionProps {
    title: string;
    games: Game[];
    viewAllLink?: string;
}

export function FeaturedSection({ title, games, viewAllLink = "#" }: FeaturedSectionProps) {
    return (
        <section className="py-16 container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold font-orbitron text-white flex items-center gap-2">
                        <span className="w-1 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
                        {title}
                    </h2>
                </div>

                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-white group">
                    View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </section>
    );
}
