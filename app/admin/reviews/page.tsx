
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchReviews, deleteReview } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Search, ArrowLeft, Check, X, Star, Loader2 } from "lucide-react";

export default function ReviewModerationPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const loadReviews = async () => {
        try {
            setIsLoading(true);
            const data = await fetchReviews();
            setReviews(data);
        } catch (error) {
            console.error("Failed to load reviews:", error);
            alert("Failed to load reviews");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const filteredReviews = reviews.filter(review =>
        review.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.game?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleApprove = (user: string, gameTitle: string) => {
        // In a real app, this would call an API to update 'approved' status
        alert(`Review by ${user} for "${gameTitle}" approved(mock action)`);
    };

    const handleDelete = async (id: string, user: string) => {
        if (confirm(`Are you sure you want to delete this review by ${user}?`)) {
            try {
                await deleteReview(id);
                alert("Review deleted successfully");
                loadReviews();
            } catch (error) {
                console.error("Failed to delete review:", error);
                alert("Failed to delete review");
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-secondary/5 via-primary/5 to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-8 relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group mb-4">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold font-orbitron text-white mb-2">
                        Review Moderation
                    </h1>
                    <p className="text-muted-foreground">
                        Manage user reviews and comments
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search reviews..."
                            className="pl-10 bg-black/40 border-white/10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        </div>
                    ) : (
                        filteredReviews.map((review) => (
                            <Card key={review.id} className="bg-black/40 border-white/10 hover:border-white/20 transition-all">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                                    {review.avatar ? (
                                                        <img src={review.avatar} alt={review.user?.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-sm font-bold text-primary">{review.user?.name?.substring(0, 2)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{review.user?.name || "Unknown User"}</p>
                                                    <p className="text-xs text-muted-foreground">{review.date}</p>
                                                </div>
                                            </div>

                                            <Link href={`/ games / ${review.gameId} `} className="inline-block mb-2">
                                                <Badge variant="outline" className="bg-white/5 hover:bg-white/10 transition-colors">
                                                    {review.game?.title || "Unknown Game"}
                                                </Badge>
                                            </Link>

                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h - 4 w - 4 ${i < review.rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-muted-foreground"
                                                            } `}
                                                    />
                                                ))}
                                                <span className="text-sm text-muted-foreground ml-2">
                                                    {review.rating}/5
                                                </span>
                                            </div>

                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>

                                        <div className="flex md:flex-col gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-green-500/30 hover:bg-green-500/10 hover:text-green-400 gap-2"
                                                onClick={() => handleApprove(review.user?.name, review.game?.title)}
                                            >
                                                <Check className="h-4 w-4" />
                                                <span className="hidden sm:inline">Approve</span>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-red-500/30 hover:bg-red-500/10 hover:text-red-400 gap-2"
                                                onClick={() => handleDelete(review.id, review.user?.name)}
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="hidden sm:inline">Delete</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {!isLoading && filteredReviews.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No reviews found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
