import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-[0_0_24px_rgba(138,63,252,0.4)] hover:shadow-[0_0_32px_rgba(138,63,252,0.6)]",
        secondary:
          "bg-surface border border-white/10 text-white hover:bg-white/10 hover:border-white/20",
        outline:
          "border border-white/15 bg-transparent text-white hover:bg-white/5 hover:border-white/25",
        ghost: "hover:bg-white/5 text-text-secondary hover:text-white",
        pink: "bg-secondary text-white hover:bg-secondary-hover shadow-[0_0_24px_rgba(255,77,184,0.4)] hover:shadow-[0_0_32px_rgba(255,77,184,0.6)]",
        cyan: "bg-tertiary text-background font-bold hover:bg-tertiary-hover shadow-[0_0_24px_rgba(0,209,255,0.4)] hover:shadow-[0_0_32px_rgba(0,209,255,0.6)]",
        icon: "bg-surface border border-white/10 text-white hover:bg-white/10 flex items-center justify-center rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-sm font-bold sm:text-base",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
