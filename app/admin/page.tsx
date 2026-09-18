'use client';

import React, { useState } from 'react';
import { AdminSidebar, AdminTabKey } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { FinancialDashboardModule } from '@/components/admin/FinancialDashboardModule';
import { UsersHubModule } from '@/components/admin/UsersHubModule';
import { TransactionsModule } from '@/components/admin/TransactionsModule';
import { OpportunitiesModule } from '@/components/admin/OpportunitiesModule';
import { GlobalSettingsModule } from '@/components/admin/GlobalSettingsModule';
import { adminService } from '@/lib/admin-service';
import { Menu, X } from 'lucide-react';

export default function AdminDashboardPage() {
  // Master Tab State
  const [activeTab, setActiveTab] = useState<AdminTabKey>('financeiro');
  // Light Mode default for Super Admin, with optional soft dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Dynamic counts for sidebar badges
  const djs = adminService.getDjs();
  const txs = adminService.getTransactions();
  const opps = adminService.getOpportunities();

  const counts = {
    djsTotal: djs.length,
    pendingTransactions: txs.filter(t => t.status === 'aguardando_pagamento').length,
    pendingOpportunities: opps.filter(o => o.status === 'pendente').length,
  };

  return (
    <div className={`min-h-screen flex transition-colors ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-100/80 text-slate-900'
    }`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
          }}
          isDarkMode={isDarkMode}
          counts={counts}
        />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setMobileSidebarOpen(false)} 
          />
          <div className="relative z-10 w-72 flex flex-col h-full shadow-2xl">
            <AdminSidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setMobileSidebarOpen(false);
              }}
              isDarkMode={isDarkMode}
              counts={counts}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header Bar with Hamburger */}
        <div className="lg:hidden flex items-center justify-between p-3 border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-xs tracking-wider uppercase font-mono">
            Nexora Command Center
          </span>
          <div className="w-8" />
        </div>

        {/* Global Admin Header */}
        <AdminHeader
          currentTab={activeTab}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Module Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'financeiro' && (
              <FinancialDashboardModule isDarkMode={isDarkMode} />
            )}
            {activeTab === 'usuarios' && (
              <UsersHubModule isDarkMode={isDarkMode} />
            )}
            {activeTab === 'transacoes' && (
              <TransactionsModule isDarkMode={isDarkMode} />
            )}
            {activeTab === 'oportunidades' && (
              <OpportunitiesModule isDarkMode={isDarkMode} />
            )}
            {activeTab === 'configuracoes' && (
              <GlobalSettingsModule isDarkMode={isDarkMode} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
