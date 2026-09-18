'use client';

import React from 'react';

interface LuminousDividerProps {
  glow?: boolean;
  className?: string;
}

export function LuminousDivider({ className = '' }: LuminousDividerProps) {
  return (
    <div className={`w-full h-px bg-[#1F1F1F] select-none pointer-events-none ${className}`} />
  );
}
