"use client";

import { useState } from "react";
import { Review } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star, ThumbsUp, MessageSquare, Send } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ReviewsProps {
    reviews: Review[];
}

export function Reviews({ reviews: initialReviews }: ReviewsProps) {
    const [reviews, setReviews] = useState(initialReviews);
    const [isWriting, setIsWriting] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock submission
        setTimeout(() => {
            const newReview: Review = {
                id: `new-${Date.now()}`,
                user: "NeonDrifter", // Mock user
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NeonDrifter",
                rating,
                comment,
                date: new Date().toISOString().split('T')[0]
            };

            setReviews([newReview, ...reviews]);
            setComment("");
            setRating(5);
            setIsWriting(false);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-orbitron text-white">
                    {reviews.length} Reviews
                </h3>
                <Button
                    onClick={() => setIsWriting(!isWriting)}
                    variant={isWriting ? "secondary" : "default"}
                    className="gap-2"
                >
                    <MessageSquare className="h-4 w-4" />
                    {isWriting ? "Cancel Review" : "Write a Review"}
                </Button>
            </div>

            {isWriting && (
                <Card className="bg-white/5 border-primary/50 animate-in slide-in-from-top-5">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={cn(
                                                    "h-6 w-6 transition-colors",
                                                    star <= rating ? "fill-primary text-primary" : "text-white/20 hover:text-white/40"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Your Review</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share your experience with the network..."
                                    className="w-full min-h-[100px] rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/50 transition-all"
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={isSubmitting} className="gap-2">
                                    {isSubmitting ? (
                                        "Transmitting..."
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" /> Submit Review
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {reviews.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-lg bg-white/5">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <Card key={review.id} className="bg-black/40 border-white/5 hover:border-white/10 transition-colors">
                            <CardHeader className="flex flex-row items-start gap-4 pb-2">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10">
                                    <Image
                                        src={review.avatar}
                                        alt={review.user}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-white text-sm">{review.user}</h4>
                                        <span className="text-xs text-muted-foreground">{review.date}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 mt-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < review.rating ? "fill-primary text-primary" : "text-white/20"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    "{review.comment}"
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                                        <ThumbsUp className="h-3 w-3" /> Helpful
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
