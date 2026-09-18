import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white border-white/15",
        primary: "bg-primary/20 text-primary border-primary/30",
        secondary: "bg-secondary/15 text-secondary border-secondary/30",
        tertiary: "bg-tertiary/15 text-tertiary border-tertiary/30",
        highlight: "bg-secondary/15 text-secondary border-secondary/30",
        verified: "bg-tertiary/15 text-tertiary border-tertiary/30",
        live: "bg-secondary/20 text-secondary border-secondary/30",
        soldout: "bg-white/5 text-text-secondary border-white/10",
        upcoming: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        outline: "text-white border-white/20 bg-transparent",
        success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        error: "bg-rose-500/15 text-rose-400 border-rose-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
