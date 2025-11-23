"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaGalleryProps {
    images: string[];
    title: string;
}

export function MediaGallery({ images, title }: MediaGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className="space-y-4 animate-in slide-in-from-left-10 duration-700 fade-in">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] group">
                <Image
                    src={activeImage}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-500"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="grid grid-cols-4 gap-2 md:gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(image)}
                        className={cn(
                            "relative aspect-video w-full overflow-hidden rounded-md border transition-all duration-300",
                            activeImage === image
                                ? "border-primary shadow-[0_0_10px_rgba(0,243,255,0.5)] scale-105 z-10"
                                : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                        )}
                    >
                        <Image
                            src={image}
                            alt={`${title} screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
