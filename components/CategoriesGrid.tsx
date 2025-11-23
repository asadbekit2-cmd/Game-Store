"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Swords,
    Gamepad2,
    Ghost,
    Sparkles,
    Target,
    Boxes,
    Palette,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    {
        name: "Cyberpunk",
        icon: Zap,
        color: "from-primary to-cyan-400",
        borderColor: "border-primary/50",
        glowColor: "shadow-[0_0_20px_rgba(0,243,255,0.3)]",
        count: "24 Games"
    },
    {
        name: "Shooter",
        icon: Target,
        color: "from-red-500 to-orange-500",
        borderColor: "border-red-500/50",
        glowColor: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
        count: "18 Games"
    },
    {
        name: "RPG",
        icon: Swords,
        color: "from-secondary to-purple-500",
        borderColor: "border-secondary/50",
        glowColor: "shadow-[0_0_20px_rgba(255,0,255,0.3)]",
        count: "32 Games"
    },
    {
        name: "Horror",
        icon: Ghost,
        color: "from-gray-600 to-gray-800",
        borderColor: "border-gray-500/50",
        glowColor: "shadow-[0_0_20px_rgba(75,85,99,0.3)]",
        count: "12 Games"
    },
    {
        name: "Anime",
        icon: Sparkles,
        color: "from-pink-500 to-rose-500",
        borderColor: "border-pink-500/50",
        glowColor: "shadow-[0_0_20px_rgba(236,72,153,0.3)]",
        count: "28 Games"
    },
    {
        name: "Strategy",
        icon: Boxes,
        color: "from-blue-500 to-indigo-500",
        borderColor: "border-blue-500/50",
        glowColor: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        count: "16 Games"
    },
    {
        name: "Sandbox",
        icon: Palette,
        color: "from-green-500 to-emerald-500",
        borderColor: "border-green-500/50",
        glowColor: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
        count: "20 Games"
    },
    {
        name: "Indie",
        icon: Gamepad2,
        color: "from-yellow-500 to-amber-500",
        borderColor: "border-yellow-500/50",
        glowColor: "shadow-[0_0_20px_rgba(234,179,8,0.3)]",
        count: "45 Games"
    }
];

export function CategoriesGrid() {
    return (
        <section className="py-16 container mx-auto px-4">
            <div className="mb-12 text-center space-y-3">
                <h2 className="text-4xl font-bold font-orbitron text-white">
                    Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Category</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                    Navigate the digital underground. Each sector has its own flavor.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                        <Link key={category.name} href={`/categories?filter=${category.name.toLowerCase()}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={cn(
                                    "group relative overflow-hidden rounded-lg border bg-black/40 backdrop-blur-sm p-6 md:p-8",
                                    "transition-all duration-300 cursor-pointer",
                                    category.borderColor,
                                    "hover:bg-black/60"
                                )}
                            >
                                {/* Gradient Background on Hover */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                                    category.color
                                )} />

                                {/* Icon Container */}
                                <div className="relative flex flex-col items-center gap-4">
                                    <div className={cn(
                                        "p-4 rounded-lg border transition-all duration-300",
                                        category.borderColor,
                                        "group-hover:" + category.glowColor
                                    )}>
                                        <Icon className={cn(
                                            "h-8 w-8 md:h-10 md:w-10 transition-all duration-300",
                                            "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br",
                                            category.color
                                        )} />
                                    </div>

                                    {/* Text */}
                                    <div className="text-center space-y-1">
                                        <h3 className="font-orbitron font-bold text-white text-lg md:text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                                            {category.name}
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground">
                                            {category.count}
                                        </p>
                                    </div>
                                </div>

                                {/* Glitch Effect Overlay */}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 mix-blend-overlay glitch-hover" />
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
