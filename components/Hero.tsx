"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Play, Info, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
    games?: any[];
}

export function Hero({ games = [] }: HeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Rotation logic
    useEffect(() => {
        if (games.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % games.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [games.length]);

    // Format local image paths
    const getExampleImage = (url?: string) => {
        if (!url) return "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2070";
        if (url.startsWith('http') || url.startsWith('/')) return url;
        return "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2070";
    };

    // Fallback static data if no trending games
    const activeGame = games.length > 0 ? games[currentIndex] : {
        id: "default",
        title: "NEON NIGHTS UPRISING",
        description: "Lead the rebellion in a neon-soaked metropolis controlled by mega-corporations. Hack, fight, and survive in the most immersive cyberpunk open world ever created.",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2070",
        rating: 9.8,
        category: "RPG",
        price: 59.99,
        isNew: true
    };

    // Calculate dynamic stats
    const rating = activeGame.rating || 9.8;
    const players = activeGame.id === "default" ? "Over 1M" : `${Math.floor(Math.random() * 500 + 10)}K`;

    if (!mounted) return null;

    return (
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-black">
            {/* Background Image with Transition */}
            <div key={activeGame.id} className="absolute inset-0 z-0 animate-in fade-in duration-1000">
                <Image
                    src={getExampleImage(activeGame.image)}
                    alt={activeGame.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full">
                <div key={`content-${activeGame.id}`} className="max-w-2xl space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
                    <div className="flex items-center gap-2">
                        {games.length > 0 ? (
                            <Badge variant="neon" className="animate-pulse">TRENDING NOW</Badge>
                        ) : (
                            <Badge variant="neon" className="animate-pulse">FEATURED RELEASE</Badge>
                        )}
                        <Badge variant="outline" className="border-white/20 text-white/70 uppercase">
                            {activeGame.category}
                        </Badge>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-white leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                        {activeGame.title}
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed line-clamp-3">
                        {activeGame.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href={activeGame.id !== "default" ? `/games/${activeGame.id}` : "#"}>
                            <Button size="lg" className="gap-2 text-base px-8 h-14 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all">
                                <Play className="h-5 w-5 fill-current" />
                                {activeGame.id !== "default" ? "Play Now" : "Coming Soon"}
                            </Button>
                        </Link>
                        {activeGame.id !== "default" && (
                            <Link href={`/games/${activeGame.id}`}>
                                <Button size="lg" variant="outline" className="gap-2 text-base px-8 h-14 border-white/20 hover:bg-white/10 text-white">
                                    <Info className="h-5 w-5" /> More Details
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-6 pt-8 text-sm text-muted-foreground">
                        <div className="flex flex-col">
                            <span className="font-bold text-white flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {rating}/5
                            </span>
                            <span>Rating</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="font-bold text-white">{players}</span>
                            <span>Active Players</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="font-bold text-white">PC / Web</span>
                            <span>Platform</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel Indicators */}
            {games.length > 1 && (
                <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                    {games.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={cn(
                                "w-12 h-1 rounded-full transition-all duration-300",
                                idx === currentIndex
                                    ? "bg-primary shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                                    : "bg-white/20 hover:bg-white/40"
                            )}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
