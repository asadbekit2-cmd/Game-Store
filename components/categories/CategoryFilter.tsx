"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) {
    const allCategories = ["All", ...categories];

    return (
        <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {allCategories.map((category, index) => {
                    const isActive = activeCategory === category || (category === "All" && activeCategory === "All");

                    return (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant={isActive ? "default" : "outline"}
                                onClick={() => onSelectCategory(category === "All" ? "All" : category)}
                                className={cn(
                                    "relative rounded-full px-6 py-2 font-orbitron font-bold text-sm transition-all duration-300 overflow-hidden group",
                                    isActive
                                        ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(0,243,255,0.5)] border-primary"
                                        : "bg-black/40 border-white/20 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                                )}
                            >
                                {/* Glitch effect background */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-50"
                                        animate={{
                                            x: ["-100%", "100%"],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    />
                                )}

                                {/* Hover glow effect */}
                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                    "bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                                )} />

                                <span className="relative z-10">
                                    {category === "All" ? "All Games" : category}
                                </span>
                            </Button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Active category indicator */}
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
            >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <span className="font-orbitron">
                    {activeCategory === "All" ? "Showing All Games" : `Filtered by: ${activeCategory}`}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </motion.div>
        </div>
    );
}
