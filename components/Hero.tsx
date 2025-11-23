import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Play, Info } from "lucide-react";

export function Hero() {
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2070"
                    alt="Cyberpunk City"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full">
                <div className="max-w-2xl space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
                    <div className="flex items-center gap-2">
                        <Badge variant="neon" className="animate-pulse">FEATURED RELEASE</Badge>
                        <Badge variant="outline" className="border-white/20 text-white/70">RPG</Badge>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-white leading-tight tracking-tight">
                        NEON <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text-cyan">NIGHTS</span>
                        <br />
                        <span className="text-4xl md:text-6xl text-white/90">UPRISING</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                        Lead the rebellion in a neon-soaked metropolis controlled by mega-corporations.
                        Hack, fight, and survive in the most immersive cyberpunk open world ever created.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button size="lg" className="gap-2 text-base px-8 h-14 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                            <Play className="h-5 w-5 fill-current" /> Play Now
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2 text-base px-8 h-14 border-white/20 hover:bg-white/10 text-white">
                            <Info className="h-5 w-5" /> More Details
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 pt-8 text-sm text-muted-foreground">
                        <div className="flex flex-col">
                            <span className="font-bold text-white">9.8/10</span>
                            <span>IGN Rating</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="font-bold text-white">Over 1M</span>
                            <span>Players Online</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="font-bold text-white">PC / Console</span>
                            <span>Available Now</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-primary/10 to-transparent blur-[100px] pointer-events-none" />
            <div className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none opacity-20" />
            <div className="absolute top-20 right-20 w-60 h-60 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none opacity-20" />
        </section>
    );
}
