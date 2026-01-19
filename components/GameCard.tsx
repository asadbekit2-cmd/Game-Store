"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Game } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Star, ShoppingCart, Heart, Play, Check } from "lucide-react";

interface GameCardProps {
    game: Game;
    isOwned?: boolean;
}

export function GameCard({ game, isOwned = false }: GameCardProps) {
    const [isInCart, setIsInCart] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsInCart(true);
        setTimeout(() => setIsInCart(false), 2000);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handlePlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        alert(`Launching ${game.title}...`);
    };

    // Validate and provide fallback for invalid image URLs
    const getValidImageUrl = (url: string | undefined | null): string => {
        if (!url) return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070";

        // Check if it's a valid URL starting with http:// or https:// or /
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
            return url;
        }

        // If it's a relative path or invalid URL, return fallback
        return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070";
    };

    return (
        <Link href={`/games/${game.id}`} className="block h-full group">
            <Card className="relative flex flex-col h-full overflow-hidden rounded-lg shadow-lg bg-black/40 border border-white/5 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all duration-300">
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                        src={getValidImageUrl(game.image)}
                        alt={game.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                        {game.isNew && (
                            <Badge variant="neon" className="bg-black/60 backdrop-blur-sm">NEW</Badge>
                        )}
                        {game.isTrending && (
                            <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm shadow-[0_0_10px_rgba(255,0,255,0.4)]">HOT</Badge>
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-end">
                            <div>
                                <Badge variant="outline" className="mb-2 border-primary/30 text-primary bg-primary/5 backdrop-blur-sm text-[10px]">
                                    {game.category}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                <Star className="h-3 w-3 fill-yellow-400" />
                                {game.rating}
                            </div>
                        </div>
                    </div>
                </div>

                <CardHeader className="pb-2">
                    <h3 className="font-orbitron text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors truncate">
                        {game.title}
                    </h3>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {game.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {game.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                    <div className="flex flex-col">
                        {game.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through decoration-red-500/70">
                                ${game.originalPrice}
                            </span>
                        )}
                        <span className="font-orbitron text-lg font-bold text-white group-hover:neon-text-cyan transition-all">
                            ${game.price}
                        </span>
                    </div>

                    <div className="flex gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {!isOwned && (
                            <Button
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    "h-8 w-8 rounded-full hover:bg-white/10",
                                    isWishlisted ? "text-red-500 hover:text-red-400" : "hover:text-secondary"
                                )}
                                onClick={handleWishlist}
                            >
                                <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500")} />
                            </Button>
                        )}
                        <Button
                            size="sm"
                            className={cn(
                                "h-8 px-3 gap-1 border",
                                isOwned
                                    ? "bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-black border-green-500/50"
                                    : isInCart
                                        ? "bg-primary/40 text-white border-primary/70"
                                        : "bg-primary/20 hover:bg-primary text-primary hover:text-black border-primary/50"
                            )}
                            onClick={isOwned ? handlePlay : handleAddToCart}
                            disabled={isInCart}
                        >
                            {isOwned ? (
                                <>
                                    <Play className="h-3 w-3" /> Play
                                </>
                            ) : isInCart ? (
                                <>
                                    <Check className="h-3 w-3" /> Added
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="h-3 w-3" /> Buy
                                </>
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
