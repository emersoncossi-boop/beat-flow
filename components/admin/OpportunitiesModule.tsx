'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Filter, 
  Search, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  Sparkles,
  ShieldCheck,
  Building,
  Calendar,
  MapPin
} from 'lucide-react';
import { adminService, MarketplaceOpportunity, OpportunityStatus } from '@/lib/admin-service';

interface OpportunitiesModuleProps {
  isDarkMode: boolean;
}

export function OpportunitiesModule({ isDarkMode }: OpportunitiesModuleProps) {
  const [opportunities, setOpportunities] = useState<MarketplaceOpportunity[]>(() => adminService.getOpportunities());
  const [activeTab, setActiveTab] = useState<OpportunityStatus | 'all'>('pendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectingOpp, setRejectingOpp] = useState<MarketplaceOpportunity | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Conteúdo promocional, spam ou cachê incompatível com diretrizes de piso');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const metrics = adminService.getMarketplaceConversionMetrics();

  const handleApprove = (id: string) => {
    const updated = adminService.approveOpportunity(id);
    setOpportunities(updated);
    setActionNotice('Vaga aprovada com sucesso e liberada instantaneamente no feed público dos DJs!');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleConfirmReject = () => {
    if (!rejectingOpp) return;
    const updated = adminService.rejectOpportunity(rejectingOpp.id, rejectionReason);
    setOpportunities(updated);
    setActionNotice('Vaga rejeitada e bloqueada contra spam.');
    setRejectingOpp(null);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const filtered = opportunities.filter(o => {
    const matchesTab = activeTab === 'all' || o.status === activeTab;
    const matchesSearch = 
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="font-bold text-emerald-800">
            ✕
          </button>
        </div>
      )}

      {/* ==================================================================== */}
      {/* METRICS OF THE JOB BOARD                                             */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Taxa de Conversão */}
        <div className={`p-5 rounded-2xl border transition ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Taxa de Conversão
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
              Alta Eficiência
            </span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {metrics.conversionRate}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {metrics.closedContracts} contratos fechados de {metrics.totalPosted} vagas
          </p>
        </div>

        {/* Metric 2: Volume Conectado */}
        <div className={`p-5 rounded-2xl border transition ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Volume Financeiro Conectado
            </span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            R$ {(metrics.totalGmvConnected / 1000).toFixed(1)}k
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Transacionados diretamente no marketplace
          </p>
        </div>

        {/* Metric 3: Fila de Moderação */}
        <div className={`p-5 rounded-2xl border transition ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Fila Pendente Anti-Spam
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              metrics.pendingCount > 0 
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' 
                : 'bg-slate-100 text-slate-600'
            }`}>
              {metrics.pendingCount} pendentes
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            {metrics.pendingCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Exigem aprovação manual antes da publicação
          </p>
        </div>

        {/* Metric 4: Tempo Médio de Resposta */}
        <div className={`p-5 rounded-2xl border transition ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Tempo Médio de Resposta
            </span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {metrics.avgResponseTimeHours}h
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Agilidade média de contratação
          </p>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* APPROVAL QUEUE (TABLE / FILA DE APROVAÇÃO ANTI-SPAM)                 */}
      {/* ==================================================================== */}
      <div className={`rounded-2xl border overflow-hidden transition ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        {/* Sub-header Tabs & Search */}
        <div className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50/60'
        }`}>
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('pendente')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'pendente'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Pendentes de Moderação</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">
                {opportunities.filter(o => o.status === 'pendente').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('aprovado')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'aprovado'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Aprovadas no Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('rejeitado')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'rejeitado'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Rejeitadas (Anti-Spam)</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Todas ({opportunities.length})
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título ou contratante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-8 pl-8 pr-3 text-xs rounded-lg border focus:outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Opportunities List / Cards */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Nenhuma vaga encontrada nesta categoria.
            </div>
          ) : (
            filtered.map((opp) => {
              return (
                <div 
                  key={opp.id} 
                  className={`p-5 transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    opp.status === 'rejeitado'
                      ? isDarkMode ? 'bg-rose-950/15' : 'bg-rose-50/40'
                      : isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/70'
                  }`}
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono ${
                        opp.contractorType === 'Festival' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' 
                          : opp.contractorType === 'Club' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' 
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {opp.contractorType}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {opp.title}
                      </h4>
                      {opp.status === 'pendente' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" /> Requer Revisão
                        </span>
                      )}
                      {opp.status === 'aprovado' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3" /> Ativa no Feed
                        </span>
                      )}
                      {opp.status === 'rejeitado' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1 font-mono">
                          <XCircle className="w-3 h-3" /> Rejeitada (Spam)
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {opp.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {opp.contractorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {opp.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {opp.eventDate}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        Cachê: R$ {opp.budgetOffered.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[11px] text-purple-600 font-bold">
                        {opp.genreRequired}
                      </span>
                    </div>

                    {opp.rejectionReason && (
                      <div className="p-2.5 rounded-lg bg-rose-100/60 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span><strong>Motivo do Bloqueio:</strong> {opp.rejectionReason}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {opp.status === 'pendente' && (
                      <>
                        <button
                          onClick={() => handleApprove(opp.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Aprovar Vaga</span>
                        </button>
                        <button
                          onClick={() => setRejectingOpp(opp)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900 text-xs font-bold transition flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Rejeitar</span>
                        </button>
                      </>
                    )}

                    {opp.status === 'aprovado' && (
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        {opp.candidatesCount} DJs inscritos
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL: REJEITAR VAGA COM JUSTIFICATIVA                               */}
      {/* ==================================================================== */}
      {rejectingOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl animate-scale-up ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Rejeitar Oportunidade
                </h3>
                <p className="text-xs text-slate-500">
                  {rejectingOpp.title} ({rejectingOpp.contractorName})
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Justificativa Anti-Spam:
                </label>
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className={`w-full h-9 px-3 text-xs rounded-xl border font-medium ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Conteúdo promocional, spam ou cachê incompatível com diretrizes de piso">
                    Spam ou tentativa de autopromoção
                  </option>
                  <option value="Tentativa explícita de transação externa ou contato via Telegram/WhatsApp sem escrow">
                    Desvio de transação fora do escrow
                  </option>
                  <option value="Informações falsas de local ou evento fictício">
                    Evento fictício ou inautêntico
                  </option>
                  <option value="Violação de direitos autorais ou termos legais">
                    Violação de termos de conformidade
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRejectingOpp(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                  isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
              >
                Confirmar Rejeição
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
