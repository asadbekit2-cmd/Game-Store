"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchGames, deleteGame } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Search, Plus, Edit, Trash2, ArrowLeft, Loader2 } from "lucide-react";

export default function GamesManagementPage() {
    const [games, setGames] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const loadGames = async () => {
        try {
            setIsLoading(true);
            const data = await fetchGames({ search: searchQuery });
            setGames(data);
        } catch (error) {
            console.error("Failed to load games:", error);
            alert("Failed to load games");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            loadGames();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteGame(id);
                alert(`Game "${title}" deleted successfully`);
                loadGames(); // Refresh list
            } catch (error) {
                console.error("Failed to delete game:", error);
                alert("Failed to delete game");
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-8 relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group mb-4">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold font-orbitron text-white mb-2">
                        Game Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage all games in the store
                    </p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search games..."
                            className="pl-10 bg-black/40 border-white/10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Link href="/admin/games/new">
                        <Button className="gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                            <Plus className="h-4 w-4" /> Add New Game
                        </Button>
                    </Link>
                </div>

                {/* Games Table */}
                <Card className="bg-black/40 border-white/10">
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left p-4 text-sm font-orbitron text-muted-foreground">Game</th>
                                            <th className="text-left p-4 text-sm font-orbitron text-muted-foreground">Category</th>
                                            <th className="text-left p-4 text-sm font-orbitron text-muted-foreground">Price</th>
                                            <th className="text-left p-4 text-sm font-orbitron text-muted-foreground">Rating</th>
                                            <th className="text-left p-4 text-sm font-orbitron text-muted-foreground">Status</th>
                                            <th className="text-right p-4 text-sm font-orbitron text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {games.map((game) => (
                                            <tr key={game.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center overflow-hidden">
                                                            {game.image && (game.image.startsWith('http://') || game.image.startsWith('https://') || game.image.startsWith('/')) ? (
                                                                <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="text-xs font-bold text-primary">{game.title.substring(0, 2)}</span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-white">{game.title}</p>
                                                            <p className="text-xs text-muted-foreground">{game.reviews?.length || 0} reviews</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <Badge variant="outline" className="bg-white/5">
                                                        {game.category}
                                                    </Badge>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-orbitron text-primary">${game.price}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-yellow-400">★ {game.rating}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-1">
                                                        {game.isNew && <Badge variant="neon" className="text-[10px] px-1.5 py-0">NEW</Badge>}
                                                        {game.isTrending && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">HOT</Badge>}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/admin/games/${game.id}`}>
                                                            <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="hover:bg-red-500/10 hover:text-red-400"
                                                            onClick={() => handleDelete(game.id, game.title)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {!isLoading && games.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No games found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
