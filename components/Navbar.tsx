"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Terminal, Search, User, ShoppingBag, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);

    const navItems = [
        { name: "Store", href: "/" },
        { name: "Categories", href: "/categories" },
        { name: "Library", href: "/library" },
    ];

    // Add Admin link if user is admin
    if (session?.user && (session.user as any).isAdmin) {
        navItems.push({ name: "Admin", href: "/admin" });
    }

    // Handle Escape key to close search modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isSearchOpen) {
                setIsSearchOpen(false);
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isSearchOpen]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-1 border border-primary/50 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors shadow-[0_0_10px_rgba(0,243,255,0.2)] group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                        <Terminal className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-orbitron text-xl font-bold tracking-wider text-white group-hover:text-primary transition-colors drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                        CYBERDECK
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-all duration-300 hover:text-primary font-orbitron tracking-wide relative group",
                                pathname === item.href ? "text-primary neon-text-cyan" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_5px_rgba(0,243,255,0.8)]",
                                pathname === item.href && "w-full"
                            )} />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:flex text-muted-foreground hover:text-primary"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {session ? (
                        <div className="relative group">
                            <Link href="/profile">
                                <Button
                                    variant="ghost"
                                    className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="max-w-[100px] truncate">
                                        {session.user?.name || "User"}
                                    </span>
                                </Button>
                            </Link>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                <div className="p-2 space-y-1">
                                    <Link href="/profile">
                                        <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                            Profile
                                        </Button>
                                    </Link>
                                    <Link href="/library">
                                        <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                            Library
                                        </Button>
                                    </Link>
                                    {(session.user as any).isAdmin && (
                                        <Link href="/admin">
                                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm text-secondary">
                                                Admin Panel
                                            </Button>
                                        </Link>
                                    )}
                                    <div className="h-px bg-white/10 my-1" />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                        onClick={() => signOut()}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-secondary hover:neon-text-magenta">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary relative group"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingBag className="h-5 w-5" />
                        <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] animate-pulse">
                            2
                        </Badge>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-muted-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl absolute w-full left-0 top-16 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "text-base font-medium transition-colors hover:text-primary font-orbitron tracking-wide p-2 rounded-md hover:bg-white/5",
                                    pathname === item.href ? "text-primary neon-text-cyan bg-white/5" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                        <Button
                            variant="outline"
                            className="w-full justify-center gap-2"
                            onClick={() => {
                                setIsSearchOpen(true);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <Search className="h-4 w-4" /> Search
                        </Button>
                        {session ? (
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>{session.user?.name || "User"}</span>
                                </div>
                                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center gap-2">
                                        Profile
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    className="w-full justify-center gap-2"
                                    onClick={() => {
                                        signOut();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <LogOut className="h-4 w-4" /> Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Link href="/login" className="w-full">
                                <Button variant="default" className="w-full justify-center gap-2">
                                    <User className="h-4 w-4" /> Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Search Modal */}
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
                    onClick={() => setIsSearchOpen(false)}
                >
                    <div
                        className="w-full max-w-2xl bg-black/90 border border-primary/30 rounded-lg shadow-[0_0_30px_rgba(0,243,255,0.2)] animate-in slide-in-from-top-10 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Search className="h-5 w-5 text-primary" />
                                <input
                                    type="text"
                                    placeholder="Search games, categories, or tags..."
                                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground text-lg font-orbitron"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="text-muted-foreground hover:text-white"
                                >
                                    ESC
                                </Button>
                            </div>

                            {searchQuery ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Search results for "{searchQuery}"
                                    </p>
                                    <Link
                                        href={`/categories?search=${encodeURIComponent(searchQuery)}`}
                                        className="block p-3 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                                        onClick={() => setIsSearchOpen(false)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Search className="h-4 w-4 text-primary" />
                                            <span className="text-white">Search all games for "{searchQuery}"</span>
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground text-sm">
                                        Start typing to search games...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Modal */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
                    onClick={() => setIsCartOpen(false)}
                >
                    <div
                        className="w-full max-w-md bg-black/95 border border-secondary/30 rounded-lg shadow-[0_0_30px_rgba(255,0,255,0.2)] animate-in slide-in-from-bottom-10 sm:slide-in-from-right-10 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold font-orbitron text-white flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5 text-secondary" />
                                    Your Cart
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-muted-foreground hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Mock cart items */}
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className="w-16 h-16 rounded bg-primary/10 flex items-center justify-center">
                                        <Terminal className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-white text-sm">Neon Nights: Uprising</h4>
                                        <p className="text-xs text-muted-foreground">Action RPG</p>
                                        <p className="text-sm font-bold text-primary mt-1">$59.99</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className="w-16 h-16 rounded bg-secondary/10 flex items-center justify-center">
                                        <Terminal className="h-8 w-8 text-secondary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-white text-sm">Cyber Soul</h4>
                                        <p className="text-xs text-muted-foreground">Adventure</p>
                                        <p className="text-sm font-bold text-secondary mt-1">$49.99</p>
                                    </div>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t border-white/10 pt-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-white">$109.98</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span className="text-white font-orbitron">Total</span>
                                    <span className="text-primary neon-text-cyan">$109.98</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2">
                                <Button
                                    className="w-full shadow-[0_0_20px_rgba(255,0,255,0.3)] bg-secondary hover:bg-secondary/90"
                                    onClick={() => {
                                        alert("Checkout functionality coming soon!");
                                        setIsCartOpen(false);
                                    }}
                                >
                                    Proceed to Checkout
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-white/10 hover:bg-white/5"
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
