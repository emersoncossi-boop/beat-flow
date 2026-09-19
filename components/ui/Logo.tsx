import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  disableLink?: boolean;
}

export function Logo({ className, size = "md", disableLink = false }: LogoProps) {
  const sizes = {
    sm: {
      width: 195,
      height: 65,
      container: "w-[165px] sm:w-[195px] h-[55px] sm:h-[65px]",
    },
    md: {
      width: 255,
      height: 85,
      container: "w-[210px] sm:w-[255px] h-[70px] sm:h-[85px]",
    },
    lg: {
      width: 345,
      height: 115,
      container: "w-[285px] sm:w-[345px] h-[95px] sm:h-[115px]",
    }
  };

  const content = (
    <Image 
      src="/assets/beatflow/BF_logo-primary.png" 
      alt="Beat Flow by Nexora"
      width={sizes[size].width}
      height={sizes[size].height}
      priority
      style={{ width: 'auto', height: 'auto' }}
      className="max-w-full max-h-full object-contain object-left drop-shadow-[0_0_18px_rgba(138,63,252,0.45)] group-hover:drop-shadow-[0_0_26px_rgba(138,63,252,0.8)] transition-all duration-300"
    />
  );

  if (disableLink) {
    return (
      <div 
        className={cn("relative inline-flex items-center select-none", sizes[size].container, className)}
        aria-label="Beat Flow by Nexora"
      >
        {content}
      </div>
    );
  }

  return (
    <Link 
      href="/" 
      className={cn("relative inline-flex items-center group transition-transform duration-300 hover:opacity-95 focus:outline-none select-none", sizes[size].container, className)}
      aria-label="Beat Flow by Nexora - PÃ¡gina Inicial"
    >
      {content}
    </Link>
  );
}