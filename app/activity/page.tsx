"use client";

import { Activity, Download, Trophy, Clock, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ActivityPage() {
    // Mock activity data
    const activities = [
        {
            id: 1,
            type: "play",
            game: "Neon Nights: Uprising",
            detail: "Played for 2 hours",
            date: "Just now",
            icon: Play,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/30"
        },
        {
            id: 2,
            type: "achievement",
            game: "Cyber Soul",
            detail: "Unlocked: 'Digital Immortality'",
            date: "2 hours ago",
            icon: Trophy,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/30"
        },
        {
            id: 3,
            type: "install",
            game: "Mech Warrior: Arena",
            detail: "Installation complete",
            date: "Yesterday",
            icon: Download,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/30"
        },
        {
            id: 4,
            type: "play",
            game: "Void Drifter",
            detail: "Played for 45 minutes",
            date: "2 days ago",
            icon: Play,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/30"
        },
        {
            id: 5,
            type: "achievement",
            game: "Neon Nights: Uprising",
            detail: "Unlocked: 'First Blood'",
            date: "3 days ago",
            icon: Trophy,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/30"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-8 relative z-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold font-orbitron text-white mb-2 flex items-center gap-3">
                        <span className="w-2 h-10 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                        Activity Log
                    </h1>
                    <p className="text-muted-foreground">
                        Track your digital footprint across the network
                    </p>
                </div>

                <div className="max-w-3xl mx-auto relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

                    <div className="space-y-8">
                        {activities.map((activity, index) => (
                            <div key={activity.id} className="relative pl-16 animate-in slide-in-from-bottom-5 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                {/* Timeline Dot */}
                                <div className={`absolute left-3 top-4 -translate-x-1/2 w-6 h-6 rounded-full border-2 ${activity.border} ${activity.bg} flex items-center justify-center z-10`}>
                                    <activity.icon className={`h-3 w-3 ${activity.color}`} />
                                </div>

                                <Card className="bg-black/40 border-white/5 hover:border-white/10 transition-all hover:translate-x-1">
                                    <CardContent className="p-4 flex items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-white">{activity.game}</h3>
                                                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 ${activity.color} ${activity.bg} border-0`}>
                                                    {activity.type.toUpperCase()}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.detail}
                                            </p>
                                        </div>
                                        <span className="text-xs text-white/40 whitespace-nowrap">
                                            {activity.date}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-4 py-2 rounded-full">
                            <Clock className="h-4 w-4" />
                            <span>End of history</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
