import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-orbitron tracking-wide",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-[0_0_5px_rgba(0,243,255,0.5)]",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_0_5px_rgba(255,0,255,0.5)]",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                neon: "border-primary text-primary shadow-[0_0_5px_rgba(0,243,255,0.3)] bg-primary/10",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
