'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Calendar, User } from 'lucide-react';
import { WaveformIcon } from '@/components/ui/BeatFlowIcons';

export function MobileBottomNav() {
  const pathname = usePathname();

  // Ocultar a barra inferior em rotas focadas que não devem ter distrações
  // E também ocultar no perfil público (/[slug]) para não confundir contratantes.
  const knownRoutes = ['/', '/dashboard', '/explorar', '/eventos', '/perfil'];
  const isKnownRoute = knownRoutes.includes(pathname || '') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin');
  
  if (!isKnownRoute) {
    return null;
  }

  // 01. NAVEGAÇÃO PRINCIPAL (CONFORME GUIA OFICIAL BEAT FLOW)
  // Início, Explorar, Oportunidades (Waveform), Eventos (Calendar), Perfil (User)
  const navItems = [
    {
      label: 'Início',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Explorar',
      href: '/explorar',
      icon: Search,
      isActive: pathname?.startsWith('/explorar') || pathname?.startsWith('/luna-martins'),
    },
    {
      label: 'Oportunidades',
      href: '/dashboard/oportunidades',
      icon: WaveformIcon,
      isActive: pathname?.startsWith('/dashboard/oportunidades'),
    },
    {
      label: 'Eventos',
      href: '/dashboard/agenda',
      icon: Calendar,
      isActive: pathname?.startsWith('/dashboard/agenda'),
    },
    {
      label: 'Perfil',
      href: '/dashboard',
      icon: User,
      isActive: pathname?.startsWith('/dashboard') && !pathname?.startsWith('/dashboard/agenda') && !pathname?.startsWith('/dashboard/oportunidades'),
    },
  ];

  return (
    <nav 
      aria-label="Navegação mobile" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#08080F]/90 backdrop-blur-xl border-t border-white/10 px-4 py-2 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.isActive;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              active 
                ? 'text-[#8A3FFC] scale-105' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className={`relative p-1 rounded-xl transition-all ${
              active ? 'bg-[#8A3FFC]/20 shadow-[0_0_12px_rgba(138,63,252,0.4)]' : ''
            }`}>
              <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
              {active && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00D1FF]" />
              )}
            </div>
            <span className={`text-[10px] font-semibold tracking-tight ${active ? 'text-white font-bold' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
