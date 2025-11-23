import Link from "next/link";
import { Github, Twitter, Disc, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-black py-12 mt-auto relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <h3 className="font-orbitron text-lg font-bold text-primary neon-text-cyan flex items-center gap-2">
                            CYBERDECK <span className="text-xs px-1.5 py-0.5 rounded border border-primary/30 bg-primary/10">v2.0</span>
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The border between the black market and a legal storefront.
                            Extracting data since 2077.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-orbitron text-sm font-bold text-white mb-4">Store</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors hover:neon-text-cyan">New Releases</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors hover:neon-text-cyan">Trending</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors hover:neon-text-cyan">Categories</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-orbitron text-sm font-bold text-white mb-4">Community</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors hover:neon-text-cyan">Discussions</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors hover:neon-text-cyan">Reviews</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors hover:neon-text-cyan">Support</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-orbitron text-sm font-bold text-white">Stay Connected</h4>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-black/50 border-white/10" />
                            <Button size="icon" variant="secondary">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="text-muted-foreground hover:text-secondary transition-colors hover:neon-text-magenta">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-secondary transition-colors hover:neon-text-magenta">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-secondary transition-colors hover:neon-text-magenta">
                                <Disc className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; 2077 Cyberdeck Store. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
