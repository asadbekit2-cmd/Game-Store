"use client";

import { useState } from "react";
import { Game } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Star, ShoppingCart, Heart, Share2, Check } from "lucide-react";

interface GameInfoProps {
    game: Game;
}

export function GameInfo({ game }: GameInfoProps) {
    const [isInCart, setIsInCart] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = () => {
        setIsInCart(true);
        setTimeout(() => setIsInCart(false), 2000);
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: game.title,
                text: game.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };
    return (
        <div className="space-y-6 animate-in slide-in-from-right-10 duration-700 fade-in">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    {game.isNew && <Badge variant="neon">NEW RELEASE</Badge>}
                    {game.isTrending && <Badge variant="secondary">TRENDING</Badge>}
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">{game.category}</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-white leading-tight tracking-tight mb-2">
                    {game.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 text-yellow-400 font-bold">
                        <Star className="h-4 w-4 fill-yellow-400" />
                        {game.rating} <span className="text-muted-foreground font-normal">({game.reviews.length} reviews)</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <span>Release Date: 2077</span>
                </div>
            </div>

            <div className="p-6 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex items-end gap-4 mb-6">
                    <span className="text-4xl font-bold font-orbitron text-white neon-text-cyan">
                        ${game.price}
                    </span>
                    {game.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through decoration-red-500/70 mb-1">
                            ${game.originalPrice}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        size="lg"
                        className="w-full gap-2 text-base h-12 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                        onClick={handleAddToCart}
                        disabled={isInCart}
                    >
                        {isInCart ? (
                            <>
                                <Check className="h-5 w-5" /> Added to Cart
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="h-5 w-5" /> Add to Cart
                            </>
                        )}
                    </Button>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 gap-2 border-white/10 hover:bg-white/5"
                            onClick={handleWishlist}
                        >
                            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 gap-2 border-white/10 hover:bg-white/5"
                            onClick={handleShare}
                        >
                            <Share2 className="h-4 w-4" /> Share
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold font-orbitron text-white border-b border-white/10 pb-2">About This Game</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {game.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {game.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 hover:border-primary/50 transition-colors">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5 border border-white/5">
                    <span className="block text-muted-foreground text-xs mb-1">Developer</span>
                    <span className="font-medium text-white">Neon Studios</span>
                </div>
                <div className="p-3 rounded bg-white/5 border border-white/5">
                    <span className="block text-muted-foreground text-xs mb-1">Publisher</span>
                    <span className="font-medium text-white">CyberCorp</span>
                </div>
            </div>
        </div>
    );
}
