'use client';

import React from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Activity, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  currentTab: string;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  financeiro: {
    title: 'Dashboard Financeiro',
    subtitle: 'Visão executiva de receita, MRR, GMV, Take Rate e curvas de inadimplência.',
  },
  usuarios: {
    title: 'Hub de Usuários & Curadoria',
    subtitle: 'Gestão de DJs, cálculo de Health Score, curadoria de showcase e moderação de contas.',
  },
  transacoes: {
    title: 'Central de Transações & Contratos',
    subtitle: 'Motor de segurança, split financeiro (DJ / Nexora / Gateway), estornos e auditoria de contratos.',
  },
  oportunidades: {
    title: 'Painel de Oportunidades (Marketplace)',
    subtitle: 'Fila de aprovação anti-spam de vagas para DJs e métricas de conversão de contratos.',
  },
  configuracoes: {
    title: 'Configurações Globais',
    subtitle: 'Parametrização de taxas da plataforma, precificação de planos e chaves de APIs.',
  },
};

export function AdminHeader({
  currentTab,
  isDarkMode,
  setIsDarkMode,
  searchQuery,
  setSearchQuery,
}: AdminHeaderProps) {
  const currentMeta = TAB_TITLES[currentTab] || {
    title: 'Nexora Command Center',
    subtitle: 'Painel de controle corporativo e governança da plataforma.',
  };

  return (
    <header className={`h-18 px-6 border-b flex items-center justify-between transition-colors ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-white' 
        : 'bg-white border-slate-200 text-slate-900 shadow-xs'
    }`}>
      {/* Title & Context */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Nexora Backoffice • Super Admin
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Produção Live
          </span>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          {currentMeta.title}
        </h1>
      </div>

      {/* Global Search + System Status + Theme + Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar DJs, bookings, txs... (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-9 pl-9 pr-3 text-xs rounded-lg border transition focus:outline-none ${
              isDarkMode
                ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white'
            }`}
          />
        </div>

        {/* System Health Badge */}
        <div className={`hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium ${
          isDarkMode
            ? 'bg-slate-800/50 border-slate-700 text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          <span>Gateway: 100% On</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span>Custódia: R$ 6.5k</span>
        </div>

        {/* Notifications */}
        <button 
          title="Notificações do Sistema"
          className={`relative p-2 rounded-lg border transition ${
            isDarkMode 
              ? 'border-slate-800 hover:bg-slate-800 text-slate-300' 
              : 'border-slate-200 hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        {/* Theme Toggle (Light / Dark Mode) */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Alternar para Light Mode' : 'Alternar para Soft Dark Mode'}
          className={`p-2 rounded-lg border transition ${
            isDarkMode 
              ? 'border-slate-800 hover:bg-slate-800 text-amber-400' 
              : 'border-slate-200 hover:bg-slate-100 text-slate-600'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* View DJ App Shortcut */}
        <Link
          href="/dashboard"
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
            isDarkMode
              ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs'
          }`}
        >
          <span>App DJs</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Super Admin User Indicator */}
        <div className={`flex items-center gap-2 pl-2 border-l ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            SA
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold leading-tight">Super Admin</div>
            <div className="text-[10px] text-slate-500">admin@nexora.vc</div>
          </div>
        </div>
      </div>
    </header>
  );
}
