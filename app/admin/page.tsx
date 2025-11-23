"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchGames, fetchReviews } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Gamepad2, MessageSquare, Users, TrendingUp, Plus, Loader2 } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalGames: 0,
        totalReviews: 0,
        avgRating: "0.0",
        activeUsers: "1.2K" // Mock for now
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [gamesData, reviewsData] = await Promise.all([
                    fetchGames(),
                    fetchReviews().catch(() => []) // Gracefully handle reviews fetch failure
                ]);

                setStats({
                    totalGames: gamesData.length,
                    totalReviews: reviewsData.length,
                    avgRating: gamesData.length > 0
                        ? (gamesData.reduce((acc: number, game: any) => acc + (game.rating || 0), 0) / gamesData.length).toFixed(1)
                        : "0.0",
                    activeUsers: "1.2K"
                });
            } catch (error) {
                console.log("Admin stats loading (database may be empty):", error);
                // Set default stats if there's an error
                setStats({
                    totalGames: 0,
                    totalReviews: 0,
                    avgRating: "0.0",
                    activeUsers: "0"
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, []);

    const statCards = [
        { label: "Total Games", value: stats.totalGames, icon: Gamepad2, color: "text-primary", bg: "bg-primary/10" },
        { label: "Total Reviews", value: stats.totalReviews, icon: MessageSquare, color: "text-secondary", bg: "bg-secondary/10" },
        { label: "Avg Rating", value: stats.avgRating, icon: TrendingUp, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        { label: "Active Users", value: stats.activeUsers, icon: Users, color: "text-green-400", bg: "bg-green-500/10" },
    ];

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
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-red-500/5 via-primary/5 to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-8 relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold font-orbitron text-white mb-2 flex items-center gap-3">
                            <span className="w-2 h-10 bg-red-500 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-pulse" />
                            ADMIN CONTROL
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            System Management Interface
                        </p>
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="border-white/10 hover:border-primary/50">
                            Back to Store
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {statCards.map((stat, index) => (
                        <Card key={index} className="bg-black/40 border-white/10 hover:border-white/20 transition-all">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold font-orbitron text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <Card className="bg-black/40 border-primary/20 hover:border-primary/50 transition-all">
                        <CardHeader>
                            <h3 className="text-xl font-bold font-orbitron text-white flex items-center gap-2">
                                <Gamepad2 className="h-5 w-5 text-primary" />
                                Game Management
                            </h3>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground mb-4">
                                Add, edit, or remove games from the store
                            </p>
                            <div className="flex gap-3">
                                <Link href="/admin/games" className="flex-1">
                                    <Button variant="outline" className="w-full border-white/10 hover:border-primary/50">
                                        View All Games
                                    </Button>
                                </Link>
                                <Link href="/admin/games/new" className="flex-1">
                                    <Button className="w-full gap-2">
                                        <Plus className="h-4 w-4" /> Add New
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-secondary/20 hover:border-secondary/50 transition-all">
                        <CardHeader>
                            <h3 className="text-xl font-bold font-orbitron text-white flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-secondary" />
                                Review Moderation
                            </h3>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground mb-4">
                                Moderate user reviews and comments
                            </p>
                            <Link href="/admin/reviews">
                                <Button variant="outline" className="w-full border-white/10 hover:border-secondary/50">
                                    Manage Reviews
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-black/40 border-white/10">
                    <CardHeader>
                        <h3 className="text-xl font-bold font-orbitron text-white">Recent Activity</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <div className="flex-1">
                                    <p className="text-sm text-white">New review added to "Neon Nights: Uprising"</p>
                                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-white">Game "Cyber Soul" was updated</p>
                                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-white">New user registered</p>
                                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
