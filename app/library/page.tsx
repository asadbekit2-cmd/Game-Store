"use client";

import { useState, useEffect } from "react";
import { fetchLibrary } from "@/lib/api";
import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, Download, Grid, Clock, HardDrive, Zap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LibraryPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [ownedGames, setOwnedGames] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/library");
            return;
        }

        if (status === "authenticated") {
            const loadLibrary = async () => {
                try {
                    const games = await fetchLibrary();
                    setOwnedGames(games);
                } catch (error) {
                    console.error("Failed to load library:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadLibrary();
        }
    }, [status, router]);

    const filteredGames = ownedGames.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate stats
    const stats = {
        totalGames: ownedGames.length,
        totalSize: `${(ownedGames.length * 45.2).toFixed(1)} GB`, // Mock size calculation
        recentlyPlayed: Math.min(ownedGames.length, 3),
        hoursPlayed: (ownedGames.length * 12.5).toFixed(1) // Mock hours calculation
    };

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-green-500/5 via-primary/5 to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-8 relative z-10">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-2 flex items-center gap-3">
                        <span className="w-2 h-10 bg-green-500 rounded-full shadow-[0_0_15px_rgba(0,255,0,0.8)] animate-pulse" />
                        MY COLLECTION
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Your personal digital vault • {ownedGames.length} titles extracted
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 rounded-lg border border-green-500/20 bg-green-500/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Grid className="h-4 w-4 text-green-400" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Games</span>
                        </div>
                        <p className="text-2xl font-bold font-orbitron text-white">{stats.totalGames}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <HardDrive className="h-4 w-4 text-primary" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Storage Used</span>
                        </div>
                        <p className="text-2xl font-bold font-orbitron text-white">{stats.totalSize}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 rounded-lg border border-secondary/20 bg-secondary/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-secondary" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Hours Played</span>
                        </div>
                        <p className="text-2xl font-bold font-orbitron text-white">{stats.hoursPlayed}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Recently Played</span>
                        </div>
                        <p className="text-2xl font-bold font-orbitron text-white">{stats.recentlyPlayed}</p>
                    </motion.div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search your collection..."
                            className="pl-10 bg-black/40 border-white/10 focus:border-green-500/50 focus:ring-green-500/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-white/10 hover:border-green-500/50 hover:text-green-400 gap-2">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Filter</span>
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/10 hover:border-green-500/50 hover:text-green-400 gap-2">
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Sort</span>
                        </Button>
                    </div>
                </div>

                {/* CD Rack Style Divider */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
                    <span className="text-xs text-green-400 font-orbitron tracking-wider">COLLECTION VAULT</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
                </div>

                {/* Games Grid - CD Rack Style */}
                {filteredGames.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredGames.map((game, index) => (
                            <motion.div
                                key={game.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GameCard game={game} isOwned={true} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-lg bg-white/5 animate-in fade-in duration-500">
                        <div className="mb-4">
                            <Grid className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                        </div>
                        <p className="text-xl text-muted-foreground font-orbitron mb-2">No games found</p>
                        <p className="text-sm text-muted-foreground mb-4">Your search didn't match any titles in your collection</p>
                        <Button variant="default" className="gap-2" onClick={() => router.push("/")}>
                            <Download className="h-4 w-4" />
                            Browse Store
                        </Button>
                    </div>
                )}

                {/* Empty State for New Users */}
                {ownedGames.length === 0 && !isLoading && (
                    <div className="text-center py-20 border border-dashed border-green-500/20 rounded-lg bg-green-500/5 animate-in fade-in duration-500">
                        <div className="mb-4">
                            <HardDrive className="h-16 w-16 text-green-400 mx-auto mb-4 opacity-50" />
                        </div>
                        <p className="text-2xl text-white font-orbitron mb-2">Your Vault is Empty</p>
                        <p className="text-muted-foreground mb-6">Start building your collection by extracting games from the store</p>
                        <Button variant="default" size="lg" className="gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)]" onClick={() => router.push("/")}>
                            <Download className="h-5 w-5" />
                            Explore Store
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
