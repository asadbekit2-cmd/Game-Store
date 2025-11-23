"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/Card";
import { Lock, Mail, User, ArrowRight, AlertCircle } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create account");
            }

            // Redirect to login
            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

            <Card className="w-full max-w-md bg-black/60 border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,243,255,0.1)] animate-in zoom-in-95 duration-500 fade-in">
                <CardHeader className="text-center space-y-2 pb-6">
                    <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 border border-secondary/20 shadow-[0_0_15px_rgba(255,0,255,0.3)] animate-pulse">
                        <User className="h-6 w-6 text-secondary" />
                    </div>
                    <h1 className="text-2xl font-bold font-orbitron text-white tracking-wide neon-text-magenta">
                        REQUEST ACCESS TO THE GRID
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Join the network and start your digital journey
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
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    className="pl-10"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

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

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="pl-10"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-bold shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Create Account <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center border-t border-white/5 pt-6">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-white hover:text-primary font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
