"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/Card";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            const result = await import("next-auth/react").then(mod => mod.signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            }));

            if (result?.error) {
                setError("Invalid email or password");
                setIsLoading(false);
            } else {
                // Successful login
                const searchParams = new URLSearchParams(window.location.search);
                const callbackUrl = searchParams.get("callbackUrl") || "/";
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An unexpected error occurred");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

            <Card className="w-full max-w-md bg-black/60 border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,243,255,0.1)] animate-in zoom-in-95 duration-500 fade-in">
                <CardHeader className="text-center space-y-2 pb-8">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20 shadow-[0_0_15px_rgba(0,243,255,0.3)] animate-pulse">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold font-orbitron text-white tracking-wide neon-text-cyan">
                        ENTER THE NETWORK
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Authenticate your credentials to access the mainframe
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    className="pl-10"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    className="pl-10"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link
                                href="#"
                                className="text-xs text-primary hover:text-primary/80 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-bold shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Authenticating...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign In <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center border-t border-white/5 pt-6">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-white hover:text-primary font-medium transition-colors">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
