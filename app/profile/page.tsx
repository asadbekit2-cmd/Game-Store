"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchProfile } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { User, Mail, Calendar, Shield, Gamepad2, MessageSquare, Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/profile");
            return;
        }

        if (status === "authenticated") {
            const loadProfile = async () => {
                try {
                    const data = await fetchProfile();
                    setProfile(data);
                } catch (error: any) {
                    console.log("Profile fetch error (session may be invalid):", error.message);
                    // If profile fetch fails, the session is likely invalid (e.g. after DB reset)
                    // Redirect to login to refresh session
                    signOut({ callbackUrl: "/login" });
                } finally {
                    setIsLoading(false);
                }
            };
            loadProfile();
        }
    }, [status, router]);

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Background Glow */}
            <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-4 pt-12 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.3)]">
                            <User className="h-16 w-16 text-white" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold font-orbitron text-white mb-2 flex items-center justify-center md:justify-start gap-3">
                                {profile.name}
                                {profile.isAdmin && (
                                    <span className="px-2 py-1 rounded bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold tracking-wider">
                                        ADMIN
                                    </span>
                                )}
                            </h1>
                            <p className="text-muted-foreground text-lg mb-4">{profile.email}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                    <Shield className="h-4 w-4 text-secondary" />
                                    <span>Level 1 Operative</span>
                                </div>
                            </div>
                        </div>
                        <div className="ml-auto">
                            <Button
                                variant="destructive"
                                className="gap-2"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <Link href="/library" className="group">
                            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-primary transition-colors">
                                        Library
                                    </h3>
                                    <Gamepad2 className="h-8 w-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-4xl font-bold text-white mb-2">{profile._count.library}</p>
                                <p className="text-sm text-muted-foreground">Games Owned</p>
                            </div>
                        </Link>

                        <div className="p-6 rounded-xl border border-secondary/20 bg-secondary/5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold font-orbitron text-white">
                                    Reviews
                                </h3>
                                <MessageSquare className="h-8 w-8 text-secondary opacity-50" />
                            </div>
                            <p className="text-4xl font-bold text-white mb-2">{profile._count.reviews}</p>
                            <p className="text-sm text-muted-foreground">Contributions</p>
                        </div>
                    </div>

                    {/* Account Settings (Mock) */}
                    <div className="rounded-xl border border-white/10 bg-black/40 p-8">
                        <h2 className="text-2xl font-bold font-orbitron text-white mb-6">Account Settings</h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between py-4 border-b border-white/5">
                                <div>
                                    <h4 className="font-medium text-white">Email Notifications</h4>
                                    <p className="text-sm text-muted-foreground">Receive updates about new game releases</p>
                                </div>
                                <div className="w-12 h-6 rounded-full bg-primary/20 border border-primary/50 relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-white/5">
                                <div>
                                    <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                                    <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                                </div>
                                <Button variant="outline" size="sm">Enable</Button>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <h4 className="font-medium text-red-400">Delete Account</h4>
                                    <p className="text-sm text-muted-foreground">Permanently remove your data from the grid</p>
                                </div>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
