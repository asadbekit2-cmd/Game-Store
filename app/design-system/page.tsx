import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Terminal, Zap, Shield, Cpu } from "lucide-react";

export default function DesignSystemPage() {
    return (
        <div className="container mx-auto py-12 space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold font-orbitron text-white neon-text-cyan">Design System</h1>
                <p className="text-muted-foreground">Component library and style guide for Cyberdeck Store.</p>
            </div>

            {/* Buttons */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold font-orbitron text-white border-b border-white/10 pb-2">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button>Default Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link Button</Button>
                    <Button variant="glass">Glass Button</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Terminal className="h-4 w-4" /></Button>
                </div>
            </section>

            {/* Badges */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold font-orbitron text-white border-b border-white/10 pb-2">Badges</h2>
                <div className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="neon">Neon</Badge>
                </div>
            </section>

            {/* Inputs */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold font-orbitron text-white border-b border-white/10 pb-2">Inputs</h2>
                <div className="grid max-w-sm gap-4">
                    <Input type="email" placeholder="Email address" />
                    <Input type="password" placeholder="Password" />
                    <Input disabled placeholder="Disabled input" />
                </div>
            </section>

            {/* Cards */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold font-orbitron text-white border-b border-white/10 pb-2">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Standard Card</CardTitle>
                            <CardDescription>This is a standard card description.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card content goes here. It uses the glassmorphism effect by default.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Action</Button>
                        </CardFooter>
                    </Card>

                    <Card className="neon-border-cyan">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="text-primary" /> Neon Card
                            </CardTitle>
                            <CardDescription>Card with cyan neon border.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Extra glow effects can be added with utility classes.</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Details</Button>
                        </CardFooter>
                    </Card>

                    <Card className="neon-border-magenta">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="text-secondary" /> Security
                            </CardTitle>
                            <CardDescription>Card with magenta neon border.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Badge variant="secondary">Encrypted</Badge>
                                <Badge variant="outline">Secure</Badge>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" className="w-full">Access</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    );
}
