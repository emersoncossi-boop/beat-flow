'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Calendar, User, PlusCircle } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  // Hide mobile bottom bar on dedicated full-screen artist stage (/[slug])
  // to avoid distracting contractors while enjoying the artist experience
  const isArtistSlug = pathname && pathname !== '/' && !pathname.startsWith('/dashboard') && !pathname.startsWith('/admin') && !pathname.startsWith('/explorar') && !pathname.startsWith('/login') && !pathname.startsWith('/onboarding') && pathname.split('/').length === 2;

  // Hide on public landing page and on artist stage to keep experience focused and high-conversion
  if (pathname === "/" || isArtistSlug) {
    return null;
  }

  const navItems = [
    {
      label: 'In?cio',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Explorar',
      href: '/explorar',
      icon: Search,
      isActive: pathname?.startsWith('/explorar'),
    },
    {
      label: 'Criar Link',
      href: '/login?mode=signup',
      icon: PlusCircle,
      isActive: pathname?.startsWith('/login?mode=signup') || pathname?.startsWith('/onboarding'),
      isHighlight: true,
    },
    {
      label: 'Agenda',
      href: '/dashboard/agenda',
      icon: Calendar,
      isActive: pathname?.startsWith('/dashboard/agenda'),
    },
    {
      label: 'Meu Painel',
      href: '/dashboard',
      icon: User,
      isActive: pathname === '/dashboard' || pathname?.startsWith('/dashboard/profile'),
    },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 pointer-events-none flex justify-center pb-[env(safe-area-inset-bottom)]">
      <nav 
        aria-label="Navega??o m?vel" 
        className="pointer-events-auto w-full max-w-md bg-zinc-950/90 backdrop-blur-2xl border border-white/15 rounded-full px-3 py-2 flex items-center justify-around shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          const highlight = item.isHighlight;

          if (highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(147,51,234,0.6)] border-2 border-zinc-950 active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-white tracking-tight mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-95 ${
                active 
                  ? 'text-purple-400 font-bold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_8px_#C084FC]" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${active ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}