'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  Sparkles, Gift, Copy, Check, MessageSquare, 
  ShieldAlert, 
  ShieldCheck, 
  MoreVertical, 
  GripVertical, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award,
  AlertTriangle,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { adminService, AdminDjUser, DjPlanType, DjUserStatus } from '@/lib/admin-service';

interface UsersHubModuleProps {
  isDarkMode: boolean;
}

export function UsersHubModule({ isDarkMode }: UsersHubModuleProps) {
  // State
  const [djs, setDjs] = useState<AdminDjUser[]>(() => adminService.getDjs());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [sortField, setSortField] = useState<'healthScore' | 'totalGmv' | 'totalBookings'>('healthScore');
  const [sortAsc, setSortAsc] = useState(false);
  const [vipModalDj, setVipModalDj] = useState<AdminDjUser | null>(null);
  const [vipDays, setVipDays] = useState<number>(30);
  const [vipInviteCopied, setVipInviteCopied] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Showcase Curation State (IDs of featured DJs in order, 1-4)
  const [showcaseSlots, setShowcaseSlots] = useState<string[]>(() => {
    const featured = adminService.getDjs()
      .filter(d => d.isShowcaseFeatured)
      .sort((a, b) => (a.showcaseRank || 99) - (b.showcaseRank || 99))
      .map(d => d.id);
    return [
      featured[0] || 'dj-luna-001',
      featured[1] || 'dj-skyline-002',
      featured[2] || 'dj-aurora-003',
      featured[3] || 'dj-krypton-004',
    ];
  });
  const [draggedDjId, setDraggedDjId] = useState<string | null>(null);
  const [showcaseSaveNotice, setShowcaseSaveNotice] = useState(false);

  // Moderation Suspension Modal
  const [suspendingDj, setSuspendingDj] = useState<AdminDjUser | null>(null);
  const [suspensionReason, setSuspensionReason] = useState('Violação dos Termos: Tentativa de transação direta fora do escrow Beat Flow');
  const [moderatorNotes, setModeratorNotes] = useState('');

  // Dropdown menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Unique genres for filter
  const allGenres = Array.from(new Set(djs.map(d => d.primaryGenre))).filter(Boolean);

  // Filtering & Sorting
  const filteredDjs = djs.filter(dj => {
    const matchesSearch = 
      dj.artisticName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dj.realName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dj.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dj.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPlan = filterPlan === 'all' || dj.plan === filterPlan;
    const matchesStatus = filterStatus === 'all' || dj.status === filterStatus;
    const matchesGenre = filterGenre === 'all' || dj.primaryGenre === filterGenre;

    return matchesSearch && matchesPlan && matchesStatus && matchesGenre;
  }).sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });

  const totalPages = Math.ceil(filteredDjs.length / itemsPerPage) || 1;
  const paginatedDjs = filteredDjs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Health Score Visual Badge
  const renderHealthScore = (score: number, completeness: number, responseHours: number) => {
    let colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-300 dark:text-emerald-400 dark:bg-emerald-950/60 dark:border-emerald-800';
    let barColor = 'bg-emerald-500';

    if (score < 50) {
      colorClass = 'text-rose-700 bg-rose-50 border-rose-300 dark:text-rose-400 dark:bg-rose-950/60 dark:border-rose-800';
      barColor = 'bg-rose-500';
    } else if (score < 80) {
      colorClass = 'text-amber-700 bg-amber-50 border-amber-300 dark:text-amber-400 dark:bg-amber-950/60 dark:border-amber-800';
      barColor = 'bg-amber-500';
    }

    return (
      <div className="flex flex-col gap-1.5 w-32">
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border font-mono ${colorClass}`}>
            {score}%
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {responseHours}h resp.
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${score}%` }} />
        </div>
      </div>
    );
  };

  // Moderation: Suspend Account
  const handleConfirmSuspend = () => {
    if (!suspendingDj) return;
    const finalReason = `${suspensionReason}${moderatorNotes ? ` • Notas do Auditor: ${moderatorNotes}` : ''}`;
    const updated = adminService.suspendDj(suspendingDj.id, finalReason);
    setDjs(updated);
    setSuspendingDj(null);
    setOpenMenuId(null);
  };

  // Moderation: Reactivate Account
  const handleReactivate = (djId: string) => {
    const updated = adminService.reactivateDj(djId);
    setDjs(updated);
    setOpenMenuId(null);
  };

  // Drag and Drop Showcase Handlers
  const handleDragStart = (djId: string) => {
    setDraggedDjId(djId);
  };

  const handleDropOnSlot = (slotIndex: number) => {
    if (!draggedDjId) return;
    const newSlots = [...showcaseSlots];
    // Remove if already in another slot to avoid duplicates
    const existingIndex = newSlots.indexOf(draggedDjId);
    if (existingIndex !== -1) {
      newSlots[existingIndex] = newSlots[slotIndex];
    }
    newSlots[slotIndex] = draggedDjId;
    setShowcaseSlots(newSlots);
    setDraggedDjId(null);
  };

  const handleSaveShowcase = () => {
    const updated = adminService.updateShowcaseCuration(showcaseSlots);
    setDjs(updated);
    setShowcaseSaveNotice(true);
    setTimeout(() => setShowcaseSaveNotice(false), 3500);
  };

  const proDjsEligible = djs.filter(d => (d.plan === 'PRO' || d.plan === 'Elite') && d.status === 'ativo');

  return (
    <div className="space-y-8">
      {/* ==================================================================== */}
      {/* SUB-MODULE 1: CURADORIA SHOWCASE (DRAG AND DROP)                    */}
      {/* ==================================================================== */}
      <div className={`p-5 rounded-2xl border transition ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Curadoria Showcase • Destaques da Landing Page
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">
                Semana 38 / 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Arraste ou designe DJs com plano PRO/Elite com Health Score &gt; 80% para a vitrine principal pública.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {showcaseSaveNotice && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Curadoria Publicada!
              </span>
            )}
            <button
              onClick={handleSaveShowcase}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition shadow-xs flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Publicar Vitrine Semanal</span>
            </button>
          </div>
        </div>

        {/* Showcase 4 Slots (Target Dropzones) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {[0, 1, 2, 3].map((slotIdx) => {
            const djId = showcaseSlots[slotIdx];
            const dj = djs.find(d => d.id === djId);

            return (
              <div
                key={slotIdx}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropOnSlot(slotIdx)}
                className={`p-3.5 rounded-xl border-2 border-dashed transition-all relative ${
                  dj
                    ? isDarkMode 
                      ? 'border-emerald-500/40 bg-slate-800/60' 
                      : 'border-emerald-300 bg-emerald-50/30'
                    : isDarkMode 
                      ? 'border-slate-800 bg-slate-900/40' 
                      : 'border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Slot {slotIdx + 1} {slotIdx === 0 ? '(Hero Principal)' : ''}
                  </span>
                  <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500" /> #{slotIdx + 1}
                  </span>
                </div>

                {dj ? (
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 relative">
                      <Image
                        src={dj.avatarUrl}
                        alt={dj.artisticName}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {dj.artisticName}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {dj.primaryGenre} • {dj.city}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                          {dj.plan}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-emerald-600">
                          HS {dj.healthScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-slate-400 text-xs">
                    Arraste um DJ PRO aqui
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pool of Eligible PRO/Elite DJs to Drag */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono">
            Pool de DJs Qualificados para Showcase (Arraste para os slots acima):
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {proDjsEligible.map((dj) => {
              const isSelected = showcaseSlots.includes(dj.id);
              return (
                <div
                  key={dj.id}
                  draggable
                  onDragStart={() => handleDragStart(dj.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs cursor-grab active:cursor-grabbing transition select-none ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-slate-800/40 border-slate-700 text-slate-400 opacity-60'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                      : isDarkMode
                        ? 'bg-slate-800 border-slate-700 hover:border-emerald-500 text-slate-200'
                        : 'bg-white border-slate-200 hover:border-emerald-500 text-slate-800 shadow-xs'
                  }`}
                >
                  <GripVertical className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={dj.avatarUrl}
                      alt={dj.artisticName}
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-bold truncate max-w-[110px]">{dj.artisticName}</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">{dj.healthScore}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SUB-MODULE 2: TABELA MESTRA DE DJS (DATA TABLE ROBUSTA)              */}
      {/* ==================================================================== */}
      <div className={`rounded-2xl border overflow-hidden transition ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        {/* Table Filters Header */}
        <div className={`p-4 border-b space-y-3 ${
          isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50/60'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Base de Usuários • Cadastro de DJs
              </h3>
              <p className="text-xs text-slate-500">
                {filteredDjs.length} DJs encontrados com base nos filtros selecionados.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome, email ou cidade..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className={`w-full h-9 pl-9 pr-3 text-xs rounded-xl border transition focus:outline-none ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500'
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                }`}
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filtros:
            </span>

            {/* Filter by Plan */}
            <select
              value={filterPlan}
              onChange={(e) => { setFilterPlan(e.target.value); setCurrentPage(1); }}
              className={`h-8 px-2.5 text-xs rounded-lg border font-medium focus:outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <option value="all">Todos os Planos</option>
              <option value="Free">Plano Free</option>
              <option value="PRO">Plano PRO</option>
              <option value="Elite">Plano Elite</option>
            </select>

            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className={`h-8 px-2.5 text-xs rounded-lg border font-medium focus:outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <option value="all">Todos os Status</option>
              <option value="ativo">Ativo</option>
              <option value="suspenso">Suspenso (Banido)</option>
              <option value="em_analise">Em Análise</option>
            </select>

            {/* Filter by Genre */}
            <select
              value={filterGenre}
              onChange={(e) => { setFilterGenre(e.target.value); setCurrentPage(1); }}
              className={`h-8 px-2.5 text-xs rounded-lg border font-medium focus:outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <option value="all">Todas as Vertentes</option>
              {allGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className={`h-8 px-2.5 text-xs rounded-lg border flex items-center gap-1 font-semibold transition ${
                isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>{sortAsc ? 'Menor para Maior' : 'Maior para Menor'}</span>
            </button>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b font-mono uppercase text-[10px] tracking-wider ${
                isDarkMode ? 'border-slate-800 bg-slate-900/80 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}>
                <th className="py-3 px-4">DJ / Perfil</th>
                <th className="py-3 px-4">Plano</th>
                <th className="py-3 px-4">Vertente & Base</th>
                <th className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => setSortField('healthScore')}>
                  Health Score (0-100%)
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => setSortField('totalBookings')}>
                  Bookings
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => setSortField('totalGmv')}>
                  GMV Gerado
                </th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação Rápida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {paginatedDjs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    Nenhum DJ encontrado com os critérios de busca.
                  </td>
                </tr>
              ) : (
                paginatedDjs.map((dj) => {
                  const isSuspended = dj.status === 'suspenso';

                  return (
                    <tr 
                      key={dj.id}
                      className={`transition-colors ${
                        isSuspended 
                          ? isDarkMode ? 'bg-rose-950/20' : 'bg-rose-50/50'
                          : isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      {/* DJ / Perfil */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 relative">
                            <Image
                              src={dj.avatarUrl}
                              alt={dj.artisticName}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {dj.isShowcaseFeatured && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-amber-400 border-2 border-white dark:border-slate-900" title="Destaque na Vitrine" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                              {dj.artisticName}
                              <Link 
                                href={`/${dj.slug}`} 
                                target="_blank"
                                title="Abrir Press Kit Público"
                                className="text-slate-400 hover:text-emerald-600 transition"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">
                              {dj.email}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 truncate">
                              beatflow.art/{dj.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Plano */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          dj.plan === 'Elite'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                            : dj.plan === 'PRO'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}>
                          {dj.plan}
                        </span>
                      </td>

                      {/* Vertente Musical */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900 dark:text-slate-200">
                          {dj.primaryGenre}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {dj.city}
                        </div>
                      </td>

                      {/* Health Score */}
                      <td className="py-3.5 px-4">
                        {renderHealthScore(dj.healthScore, dj.profileCompleteness, dj.responseTimeHours)}
                      </td>

                      {/* Bookings */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                          {dj.totalBookings}
                        </span>
                      </td>

                      {/* GMV Gerado */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          R$ {dj.totalGmv.toLocaleString('pt-BR')}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {dj.status === 'ativo' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Ativo
                          </span>
                        ) : dj.status === 'suspenso' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                            <ShieldAlert className="w-3 h-3" /> Suspenso
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                            <Clock className="w-3 h-3" /> Em Análise
                          </span>
                        )}
                      </td>

                      {/* Ação Rápida (Dropdown / Moderação) */}
                      <td className="py-3.5 px-4 text-right relative">
                        <div className="inline-block text-left">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === dj.id ? null : dj.id)}
                            className={`p-1.5 rounded-lg border transition ${
                              isDarkMode 
                                ? 'border-slate-800 hover:bg-slate-800 text-slate-300' 
                                : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openMenuId === dj.id && (
                            <div className={`absolute right-4 mt-1 w-48 rounded-xl shadow-xl border py-1 z-30 ${
                              isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                            }`}>
                              <Link
                                href={`/${dj.slug}`}
                                target="_blank"
                                className="block px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                              >
                                <span>Ver Press Kit</span>
                                <ExternalLink className="w-3 h-3 text-slate-400" />
                              </Link>

                              {dj.status === 'ativo' ? (
                                <button
                                  onClick={() => {
                                    setSuspendingDj(dj);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
                                >
                                  <ShieldAlert className="w-3.5 h-3.5" />
                                  <span>Suspender Conta</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleReactivate(dj.id)}
                                  className="w-full text-left px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2"
                                >
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  <span>Reativar Conta</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className={`p-4 border-t flex items-center justify-between text-xs ${
          isDarkMode ? 'border-slate-800 bg-slate-900/60 text-slate-400' : 'border-slate-200 bg-slate-50/60 text-slate-500'
        }`}>
          <span>
            Mostrando {paginatedDjs.length} de {filteredDjs.length} DJs cadastrados
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border transition disabled:opacity-40 ${
                isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold font-mono text-slate-700 dark:text-slate-300">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border transition disabled:opacity-40 ${
                isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL: SUSPENDER CONTA (MODERAÇÃO)                                  */}
      {/* ==================================================================== */}
      {suspendingDj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl animate-scale-up ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Suspender Conta do DJ
                </h3>
                <p className="text-xs text-slate-500">
                  {suspendingDj.artisticName} ({suspendingDj.email})
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              A suspensão desativa o press kit público, revoga o acesso à agenda de propostas e congela repasses em custódia até conclusão da auditoria de compliance.
            </p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Motivo da Infração:
                </label>
                <select
                  value={suspensionReason}
                  onChange={(e) => setSuspensionReason(e.target.value)}
                  className={`w-full h-9 px-3 text-xs rounded-xl border font-medium ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Violação dos Termos: Tentativa de transação direta fora do escrow Beat Flow">
                    Tentativa de transação direta fora do escrow
                  </option>
                  <option value="No-Show não justificado com cancelamento em menos de 48h">
                    No-Show em evento confirmado
                  </option>
                  <option value="Violação de Rider Técnico com equipamento indevido">
                    Reclamação grave de contratante / Rider
                  </option>
                  <option value="Spam ou Phishing em mensagens da plataforma">
                    Spam ou comportamento malicioso
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Notas Internas do Moderador (Opcional):
                </label>
                <textarea
                  rows={2}
                  value={moderatorNotes}
                  onChange={(e) => setModeratorNotes(e.target.value)}
                  placeholder="Ex: Protocolo de denúncia #NX-8819 recebido pelo contratante..."
                  className={`w-full p-2.5 text-xs rounded-xl border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setSuspendingDj(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                  isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSuspend}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
              >
                Confirmar Suspensão Imediata
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Concessão de Cortesia VIP (Proprietário / Merchan) */}
      {vipModalDj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Passe VIP de Cortesia</h3>
                  <p className="text-xs text-slate-500">Zerar cobrança para marketing / embaixador</p>
                </div>
              </div>
              <button 
                onClick={() => setVipModalDj(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                ✕
              </button>
            </div>

            <div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Liberar acesso <strong>PRO ilimitado com R$ 0,00 de cobrança</strong> para o artista <strong>{vipModalDj.artisticName}</strong> (slug: <code className="font-mono text-purple-600">@{vipModalDj.slug}</code>).
              </p>

              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Duração da Cortesia (Renovável a qualquer momento):
              </label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[7, 15, 30].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setVipDays(d)}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      vipDays === d
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {d} Dias
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                <span>Mensagem de Convite VIP (WhatsApp):</span>
              </p>
              <p className="font-mono text-[11px] text-slate-500 italic">
                "Fala {vipModalDj.artisticName}! 🎧 Liberei {vipDays} dias de Acesso PRO 100% gratuito no Beat Flow para você divulgar seu Press Kit oficial..."
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  handleGrantVip(vipModalDj.id, vipDays);
                  setVipModalDj(null);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Ativar {vipDays} Dias VIP & Copiar Convite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
