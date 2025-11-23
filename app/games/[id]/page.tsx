"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchGame, fetchLibrary, addToLibrary } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Star, Loader2, Plus, Check } from "lucide-react";
import { GameInfo } from "@/components/game/GameInfo";
import { MediaGallery } from "@/components/game/MediaGallery";
import { Reviews } from "@/components/game/Reviews";
import { DownloadOptions } from "@/components/game/DownloadOptions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GameDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [game, setGame] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwned, setIsOwned] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const resolvedParams = await params;
                const [gameData, libraryData] = await Promise.all([
                    fetchGame(resolvedParams.id),
                    status === "authenticated" ? fetchLibrary().catch(() => []) : Promise.resolve([])
                ]);

                setGame(gameData);

                if (libraryData && Array.isArray(libraryData)) {
                    const owned = libraryData.some((g: any) => g.id === resolvedParams.id);
                    setIsOwned(owned);
                }
            } catch (error) {
                console.error("Failed to load game data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [params, status]);

    const handleAddToLibrary = async () => {
        if (status === "unauthenticated") {
            router.push(`/login?callbackUrl=/games/${game.id}`);
            return;
        }

        setIsAdding(true);
        try {
            await addToLibrary(game.id);
            setIsOwned(true);
        } catch (error) {
            console.error("Failed to add to library:", error);
            alert("Failed to add game to library. Please try again.");
        } finally {
            setIsAdding(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!game) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-red-500">Game not found</h1>
                <Link href="/">
                    <Button variant="outline">Back to Store</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent pointer-events-none z-0" />

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 pb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Store
                    </Link>
                    <div className="flex flex-wrap gap-3 mb-4">
                        <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-primary/50 text-primary">
                            {game.category}
                        </Badge>
                        {game.isNew && <Badge variant="neon">NEW ARRIVAL</Badge>}
                        {game.isTrending && <Badge variant="secondary">TRENDING</Badge>}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-white mb-4 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                        {game.title}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xl font-bold">{game.rating}</span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/20" />
                        <p className="text-lg text-white/80 max-w-2xl line-clamp-2">
                            {game.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <MediaGallery
                            images={[game.image, ...(game.screenshots || [])]}
                            title={game.title}
                        />

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold font-orbitron text-primary">About the Game</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {game.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {game.tags?.map((tag: string) => (
                                    <Badge key={tag} variant="outline" className="bg-white/5">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Purchase/Download Section */}
                        <div className="p-8 rounded-xl border border-primary/30 bg-primary/5 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold font-orbitron text-white mb-2">
                                        {isOwned ? "Ready to Deploy" : "Acquire License"}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {isOwned
                                            ? "This software is already in your personal vault."
                                            : "Add this software to your collection to begin extraction."}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        {game.originalPrice && (
                                            <p className="text-sm text-muted-foreground line-through decoration-red-500">
                                                ${game.originalPrice}
                                            </p>
                                        )}
                                        <p className="text-3xl font-bold text-primary neon-text-cyan">
                                            ${game.price}
                                        </p>
                                    </div>

                                    {isOwned ? (
                                        <Button size="lg" variant="secondary" className="h-14 px-8 gap-2 cursor-default">
                                            <Check className="h-5 w-5" />
                                            IN LIBRARY
                                        </Button>
                                    ) : (
                                        <Button
                                            size="lg"
                                            className="h-14 px-8 gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all"
                                            onClick={handleAddToLibrary}
                                            disabled={isAdding}
                                        >
                                            {isAdding ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Plus className="h-5 w-5" />
                                            )}
                                            ADD TO LIBRARY
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {isOwned && <DownloadOptions />}

                        <Reviews
                            reviews={game.reviews || []}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <GameInfo game={game} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
