
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchGame, createGame, updateGame } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function GameEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [gameId, setGameId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        rating: "0",
        image: "",
        screenshots: ["", "", ""], // Array for multiple screenshots
        tags: "",
        isNew: false,
        isTrending: false,
        magnetLink: "",
        torrentLink: "",
        directDownloadLink: "",
    });

    useEffect(() => {
        const init = async () => {
            const resolvedParams = await params;
            if (resolvedParams.id !== "new") {
                setGameId(resolvedParams.id);
                loadGame(resolvedParams.id);
            }
        };
        init();
    }, [params]);

    const loadGame = async (id: string) => {
        try {
            setIsLoading(true);
            const game = await fetchGame(id);
            if (game) {
                setFormData({
                    title: game.title,
                    description: game.description,
                    price: game.price.toString(),
                    originalPrice: game.originalPrice?.toString() || "",
                    category: game.category,
                    rating: game.rating.toString(),
                    image: game.image,
                    screenshots: game.screenshots || ["", "", ""],
                    tags: game.tags.join(", "),
                    isNew: game.isNew,
                    isTrending: game.isTrending,
                    magnetLink: game.magnetLink || "",
                    torrentLink: game.torrentLink || "",
                    directDownloadLink: game.directDownloadLink || "",
                });
            }
        } catch (error) {
            console.error("Failed to load game:", error);
            alert("Failed to load game details");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const data = {
                ...formData,
                tags: formData.tags, // API handles splitting
            };

            if (gameId) {
                await updateGame(gameId, data);
            } else {
                await createGame(data);
            }
            alert(gameId ? "Game updated successfully!" : "Game created successfully!");
            router.push("/admin/games");
        } catch (error) {
            console.error("Failed to save game:", error);
            alert("Failed to save game");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-8 relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group mb-4">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Games
                    </Link>
                    <h1 className="text-4xl font-bold font-orbitron text-white mb-2">
                        {gameId ? "Edit Game" : "Add New Game"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl">
                    <Card className="bg-black/40 border-white/10 mb-8">
                        <CardContent className="p-6 space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                                    <Input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="bg-black/40 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                                    <Input
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="bg-black/40 border-white/10"
                                        placeholder="Action, RPG, Strategy..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Price ($)</label>
                                    <Input
                                        required
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="bg-black/40 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Original Price ($) (Optional)</label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                        className="bg-black/40 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Rating (0-5)</label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                        className="bg-black/40 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-muted-foreground">Main Image URL or Local Path</label>
                                    <Input
                                        required
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="bg-black/40 border-white/10"
                                        placeholder="https://... or /images/games/..."
                                        title="Enter a valid URL (https://) or local path (/images/...)"
                                    />
                                </div>
                            </div>

                            {/* Screenshots */}
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-muted-foreground">Screenshot URLs (Gallery Images)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {formData.screenshots.map((screenshot, index) => (
                                        <div key={index} className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Screenshot {index + 1}</label>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={screenshot}
                                                    onChange={(e) => {
                                                        const newScreenshots = [...formData.screenshots];
                                                        newScreenshots[index] = e.target.value;
                                                        setFormData({ ...formData, screenshots: newScreenshots });
                                                    }}
                                                    className="bg-black/40 border-white/10"
                                                    placeholder="https://... or /images/..."
                                                />
                                                {formData.screenshots.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            const newScreenshots = formData.screenshots.filter((_, i) => i !== index);
                                                            setFormData({ ...formData, screenshots: newScreenshots });
                                                        }}
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        ✕
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFormData({ ...formData, screenshots: [...formData.screenshots, ""] })}
                                    className="border-primary/30 hover:border-primary/50 text-primary"
                                >
                                    + Add Screenshot
                                </Button>
                            </div>

                            {/* Tags */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Tags (comma separated)</label>
                                <Input
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="bg-black/40 border-white/10"
                                    placeholder="Cyberpunk, Open World, Multiplayer..."
                                />
                            </div>

                            {/* Download Links */}
                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <h3 className="text-lg font-bold font-orbitron text-white flex items-center gap-2">
                                    Download Configuration
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Magnet Link (Optional)</label>
                                        <div className="flex gap-2">
                                            <div className="bg-white/5 border border-white/10 rounded px-3 py-2 flex items-center text-muted-foreground text-sm">🧲</div>
                                            <Input
                                                value={formData.magnetLink}
                                                onChange={(e) => setFormData({ ...formData, magnetLink: e.target.value })}
                                                className="bg-black/40 border-white/10 font-mono text-xs"
                                                placeholder="magnet:?xt=urn:btih:..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Torrent File URL (Optional)</label>
                                        <div className="flex gap-2">
                                            <div className="bg-white/5 border border-white/10 rounded px-3 py-2 flex items-center text-muted-foreground text-sm">📥</div>
                                            <Input
                                                value={formData.torrentLink}
                                                onChange={(e) => setFormData({ ...formData, torrentLink: e.target.value })}
                                                className="bg-black/40 border-white/10 font-mono text-xs"
                                                placeholder="https://example.com/game.torrent"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Direct Download URL (Optional)</label>
                                        <div className="flex gap-2">
                                            <div className="bg-white/5 border border-white/10 rounded px-3 py-2 flex items-center text-muted-foreground text-sm">☁️</div>
                                            <Input
                                                value={formData.directDownloadLink}
                                                onChange={(e) => setFormData({ ...formData, directDownloadLink: e.target.value })}
                                                className="bg-black/40 border-white/10 font-mono text-xs"
                                                placeholder="https://drive.google.com/..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full h-32 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            {/* Checkboxes */}
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isNew}
                                        onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                                        className="rounded border-white/10 bg-black/40 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium">Mark as New</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isTrending}
                                        onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                                        className="rounded border-white/10 bg-black/40 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium">Mark as Trending</span>
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href="/admin/games">
                            <Button type="button" variant="ghost">Cancel</Button>
                        </Link>
                        <Button
                            type="submit"
                            className="gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {gameId ? "Save Changes" : "Create Game"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
