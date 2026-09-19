import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-95";
    
    const variantStyles: Record<string, string> = {
      default: "bg-white text-black hover:bg-white/90 shadow-md",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
      outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white",
      secondary: "bg-white/10 text-white hover:bg-white/20",
      ghost: "hover:bg-white/10 text-white",
      link: "text-white underline-offset-4 hover:underline"
    };

    const sizeStyles: Record<string, string> = {
      default: "h-10 px-5 py-2",
      sm: "h-8 rounded-full px-3 text-xs",
      lg: "h-12 rounded-full px-8 text-base font-semibold",
      icon: "h-9 w-9"
    };

    return (
      <button
        className={cn(baseStyles, variantStyles[variant] || variantStyles.default, sizeStyles[size] || sizeStyles.default, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };