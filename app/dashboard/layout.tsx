'use client';

import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedDashboardGuard } from "@/components/auth/ProtectedDashboardGuard";
import { Logo } from "@/components/ui/Logo";
import { 
  Home, 
  Sparkles,
  User, 
  FileText, 
  Calendar, 
  BarChart3, 
  Mail, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Radio
} from "lucide-react";
import { WaveformIcon } from "@/components/ui/BeatFlowIcons";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { signOut, djProfile } = useAuth();
  
  // Navigation aligned with Beat Flow Canvas Architecture
  const navItems = [
    { href: "/dashboard", label: "Início", icon: Home },
    { href: "/dashboard/universo", label: "Meu Universo", icon: Sparkles, highlight: true },
    { href: "/dashboard/oportunidades", label: "Oportunidades", icon: WaveformIcon },
    { href: "/dashboard/propostas", label: "Propostas", icon: FileText, badge: 3 },
    { href: "/dashboard/agenda", label: "Eventos", icon: Calendar },
    { href: "/dashboard/mensagens", label: "Mensagens", icon: Mail, badge: 1 },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Meu Perfil", icon: User },
  ];

  const currentSlug = djProfile?.slug || 'emerson-cossi';
  const displayName = djProfile?.artisticName || 'Emerson Cossi';
  const avatarUrl = djProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
  const publicLink = `/${currentSlug}`;

  return (
    <ProtectedDashboardGuard>
      <div className="flex h-screen bg-[#08080F] text-white overflow-hidden selection:bg-[#8A3FFC] selection:text-white font-sans">
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-[#0C0A17] flex flex-col shrink-0 hidden md:flex">
          {/* Logo Brand Header */}
          <div className="h-16 flex items-center justify-start px-6 border-b border-white/5">
            <Logo size="md" />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link 
                  key={item.label}
                  href={item.href} 
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white shadow-[0_0_20px_rgba(138,63,252,0.4)] font-bold' 
                      : item.highlight
                        ? 'text-white bg-white/5 hover:bg-white/10 border border-white/10'
                        : 'text-white/65 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${item.highlight && !isActive ? 'text-[#00D1FF]' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive 
                        ? 'bg-white text-[#8A3FFC]' 
                        : 'bg-[#00D1FF] text-[#0C0A17] shadow-[0_0_10px_rgba(0,209,255,0.4)]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Quick Admin Shortcut */}
            <div className="pt-2 mt-2 border-t border-white/10">
              <Link
                href="/admin"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Super Admin</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 font-mono text-purple-300">
                  NEXORA
                </span>
              </Link>
            </div>
          </nav>

          {/* Artist Canvas Quick Teaser */}
          <div className="p-3.5 mx-3 mb-3 rounded-2xl relative overflow-hidden border border-white/10 bg-[#0F0D1C] shadow-lg">
            <div className="relative z-10 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>MEU UNIVERSO ATIVO</span>
              </div>
              <h4 className="text-xs font-bold text-white leading-tight">
                Palco Digital Parametrizado
              </h4>
              <p className="text-[10px] text-white/50 font-mono">Conteúdo Livre · Design Bloqueado</p>
            </div>
          </div>

          {/* User Bar Footer */}
          <div className="p-3 border-t border-white/10 flex items-center justify-between">
            <Link href={publicLink} target="_blank" className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-85 transition">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shrink-0">
                <Image 
                  src={avatarUrl} 
                  alt={displayName} 
                  width={36} 
                  height={36} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="text-xs font-bold text-white truncate">{displayName}</div>
                <div className="text-[10px] text-white/50 flex items-center gap-1 hover:text-[#00D1FF] transition">
                  Ver palco ao vivo <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>
            </Link>
            <button 
              onClick={signOut} 
              title="Encerrar Sessão" 
              className="p-2 text-white/40 hover:text-red-400 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="h-16 md:hidden border-b border-white/10 bg-[#0C0A17] flex items-center justify-between px-4">
            <Logo size="sm" />
            <div className="flex items-center gap-2">
              <Link 
                href="/admin"
                className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-[11px] font-mono font-bold flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
              <Link 
                href={publicLink}
                target="_blank" 
                className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white flex items-center gap-1.5"
              >
                <span>Ver Palco</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button 
                onClick={signOut} 
                className="p-2 text-white/60 hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </ProtectedDashboardGuard>
  );
}