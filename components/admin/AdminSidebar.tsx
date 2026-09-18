'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Sliders, 
  ChevronRight,
  Zap,
  Terminal,
  ArrowUpRight,
  Database,
  Layers
} from 'lucide-react';

export type AdminTabKey = 
  | 'financeiro' 
  | 'usuarios' 
  | 'transacoes' 
  | 'oportunidades' 
  | 'configuracoes';

interface AdminSidebarProps {
  activeTab: AdminTabKey;
  onSelectTab: (tab: AdminTabKey) => void;
  isDarkMode: boolean;
  counts?: {
    djsTotal: number;
    pendingTransactions: number;
    pendingOpportunities: number;
  };
}

export function AdminSidebar({
  activeTab,
  onSelectTab,
  isDarkMode,
  counts = { djsTotal: 8, pendingTransactions: 2, pendingOpportunities: 1 },
}: AdminSidebarProps) {
  const navItems: Array<{
    key: AdminTabKey;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    {
      key: 'financeiro',
      label: 'Dashboard Financeiro',
      description: 'MRR, GMV & Churn',
      icon: TrendingUp,
      badge: '+12.4%',
      badgeColor: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-950/60',
    },
    {
      key: 'usuarios',
      label: 'Hub de DJs & Curadoria',
      description: 'Health Score & Showcase',
      icon: Users,
      badge: counts.djsTotal,
      badgeColor: 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-950/60',
    },
    {
      key: 'transacoes',
      label: 'Transações & Contratos',
      description: 'Split 90/10, Estornos, PDFs',
      icon: ShieldCheck,
      badge: counts.pendingTransactions > 0 ? `${counts.pendingTransactions} pend.` : undefined,
      badgeColor: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-950/60',
    },
    {
      key: 'oportunidades',
      label: 'Painel Oportunidades',
      description: 'Marketplace & Anti-Spam',
      icon: Briefcase,
      badge: counts.pendingOpportunities > 0 ? `${counts.pendingOpportunities} fila` : undefined,
      badgeColor: 'text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-950/60',
    },
    {
      key: 'configuracoes',
      label: 'Configurações Globais',
      description: 'Take Rate & API Keys',
      icon: Sliders,
    },
  ];

  return (
    <aside className={`w-72 border-r flex flex-col shrink-0 transition-colors select-none ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-800 text-slate-200' 
        : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {/* Brand Header */}
      <div className={`h-18 px-5 border-b flex items-center justify-between ${
        isDarkMode ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black tracking-tighter text-sm shadow-md">
            NX
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight flex items-center gap-1.5 text-slate-900 dark:text-white">
              NEXORA
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Command
              </span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Backoffice Beat Flow v2.6
            </span>
          </div>
        </div>

        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="API Status: OK" />
      </div>

      {/* Navigation Group */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
          Módulos Operacionais
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${
                isActive
                  ? isDarkMode
                    ? 'bg-slate-800 text-white font-semibold shadow-xs border border-slate-700'
                    : 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200 shadow-xs'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isActive
                    ? isDarkMode 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-emerald-600 text-white'
                    : isDarkMode 
                      ? 'bg-slate-800/80 text-slate-400' 
                      : 'bg-slate-100 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="truncate font-bold leading-tight">{item.label}</div>
                  <div className={`text-[10px] truncate ${
                    isActive 
                      ? isDarkMode ? 'text-slate-300' : 'text-emerald-700' 
                      : 'text-slate-400'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-2 ${
                  item.badgeColor || 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Links Section */}
        <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
          Ambientes Conectados
        </div>

        <Link
          href="/dashboard/propostas"
          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
            isDarkMode 
              ? 'text-slate-400 hover:text-white hover:bg-slate-900' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Central Propostas (DJ)</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <Link
          href="/djskyline"
          target="_blank"
          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
            isDarkMode 
              ? 'text-slate-400 hover:text-white hover:bg-slate-900' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Zap className="w-3.5 h-3.5 text-slate-400" />
            <span>Press Kit Público</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>

      {/* Governance Footer */}
      <div className={`p-3.5 m-3 rounded-2xl border ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            Auditoria Ativa
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            SOC2 / LGPD
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          Todas as ações de estorno, moderação e alteração de taxas geram log criptográfico imutável.
        </p>
      </div>
    </aside>
  );
}
