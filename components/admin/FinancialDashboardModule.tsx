'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  ShieldAlert, 
  PiggyBank, 
  RotateCcw,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { adminService } from '@/lib/admin-service';

interface FinancialDashboardModuleProps {
  isDarkMode: boolean;
}

export function FinancialDashboardModule({ isDarkMode }: FinancialDashboardModuleProps) {
  const [timeRange, setTimeRange] = useState<'30d' | '6m' | '12m'>('12m');
  const [chartView, setChartView] = useState<'rates' | 'volume'>('rates');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const kpis = adminService.getFinancialKpis();
  const churnHistory = adminService.getChurnHistory();

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Mes,Taxa_Churn_Pct,Taxa_Inadimplencia_Pct,Perda_Financeira_BRL,Recuperado_BRL\n" +
      churnHistory.map(row => `${row.month},${row.churnRate},${row.inadimplenciaRate},${row.revenueLoss},${row.recoveredRevenue}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexora_churn_inadimplencia_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice('Relatório financeiro exportado com sucesso em formato CSV.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Visão Executiva & Balanço da Plataforma
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
              Auditado em Tempo Real
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Métricas consolidadas de receita de assinaturas SaaS, transações de bookings e retenção.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time range selector */}
          <div className={`p-1 rounded-xl border flex items-center gap-1 text-xs font-semibold ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-2.5 py-1 rounded-lg transition ${
                timeRange === '30d'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              30 Dias
            </button>
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-2.5 py-1 rounded-lg transition ${
                timeRange === '6m'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              6 Meses
            </button>
            <button
              onClick={() => setTimeRange('12m')}
              className={`px-2.5 py-1 rounded-lg transition ${
                timeRange === '12m'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              12 Meses
            </button>
          </div>

          <button
            onClick={handleExportCsv}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-emerald-700 text-xs font-bold">
            Dispensar
          </button>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3 TOP EXECUTIVE KPIS + SECONDARY REVENUE METRICS                    */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: MRR (Receita de Assinaturas PRO/Elite) */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              1. MRR (Assinaturas SaaS)
            </span>
            <span className="flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-800">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {kpis.mrrGrowth} MoM
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
              R$ {kpis.mrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>{kpis.proSubscribers} DJs PRO (R$ 49/mês)</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {kpis.eliteSubscribers} Elite (R$ 129/mês)
            </span>
          </div>
        </div>

        {/* KPI 2: GMV (Volume Financeiro Bruto) */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              2. GMV (Volume Bruto em Eventos)
            </span>
            <span className="flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-800">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {kpis.gmvGrowth} MoM
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
              R$ {kpis.totalGmv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Ticket Médio: R$ {kpis.averageBookingTicket.toLocaleString('pt-BR')}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {kpis.totalCompletedBookings} Bookings Concluídos
            </span>
          </div>
        </div>

        {/* KPI 3: Receita de Transações (Lucro Taxa Take Rate) */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isDarkMode 
            ? 'bg-slate-900 border-emerald-900/40 bg-radial-[at_top_right] from-emerald-950/20 to-transparent' 
            : 'bg-emerald-50/40 border-emerald-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono flex items-center gap-1.5">
              <PiggyBank className="w-4 h-4 text-emerald-600" />
              3. Receita de Transações (Take Rate)
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono">
              10.0% Fixo
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-400 font-mono">
              R$ {kpis.platformTransactionRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/60 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <span>Margem Líquida Retida</span>
            <span className="font-bold">100% Repasse Garantido</span>
          </div>
        </div>
      </div>

      {/* Secondary Financial Counters (Custódia vs Estornos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="text-[11px] font-medium text-slate-500">Volume em Custódia (Escrow)</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono mt-0.5">
              R$ {kpis.escrowHeld.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-400">Sinais retidos até 24h pós-evento</div>
          </div>
          <CreditCard className="w-7 h-7 text-slate-400 opacity-60" />
        </div>

        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="text-[11px] font-medium text-slate-500">Taxa de Inadimplência Média</div>
            <div className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono mt-0.5">
              1.3%
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold">-0.4% vs mês anterior</div>
          </div>
          <AlertTriangle className="w-7 h-7 text-rose-500 opacity-60" />
        </div>

        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="text-[11px] font-medium text-slate-500">Total Estornado (Refunds)</div>
            <div className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono mt-0.5">
              R$ {kpis.totalRefunded.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-400">1 caso auditado por força maior</div>
          </div>
          <RotateCcw className="w-7 h-7 text-rose-500 opacity-60" />
        </div>

        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="text-[11px] font-medium text-slate-500">LTV / CAC Ratio</div>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              5.8x
            </div>
            <div className="text-[10px] text-slate-400">Excelente eficiência de aquisição</div>
          </div>
          <TrendingUp className="w-7 h-7 text-emerald-500 opacity-60" />
        </div>
      </div>

      {/* ==================================================================== */}
      {/* CHART SECTION: CURVA DE INADIMPLÊNCIA & CHURN                       */}
      {/* ==================================================================== */}
      <div className={`p-6 rounded-2xl border ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Curva Histórica de Inadimplência & Churn Rate
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                12 Meses
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Acompanhamento de cancelamentos voluntários de planos (Churn) e falhas de cobrança de cartão (Inadimplência).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartView('rates')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                chartView === 'rates'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:text-slate-900'
              }`}
            >
              Ver Taxas Percentuais (%)
            </button>
            <button
              onClick={() => setChartView('volume')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                chartView === 'volume'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:text-slate-900'
              }`}
            >
              Perda Financeira vs Recuperado (R$)
            </button>
          </div>
        </div>

        {/* Legend / Semantics */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-medium text-slate-600 dark:text-slate-400">
          {chartView === 'rates' ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span>Taxa de Churn (%) — Cancelamentos de Assinatura</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span>Taxa de Inadimplência (%) — Falhas de Processamento</span>
              </div>
              <div className="ml-auto text-[11px] text-slate-400 font-mono">
                Benchmark do setor: Churn &lt; 3.0% / Inadimplência &lt; 2.0%
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />
                <span>Receita Perdida Bruta (R$)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>Receita Recuperada via Dunning Automático (R$)</span>
              </div>
            </>
          )}
        </div>

        {/* Chart Container */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'rates' ? (
              <AreaChart
                data={churnHistory}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorInad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? '#334155' : '#f1f5f9'} 
                />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }} 
                  axisLine={{ stroke: isDarkMode ? '#334155' : '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                  unit="%"
                  domain={[0, 6]}
                  axisLine={{ stroke: isDarkMode ? '#334155' : '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  }}
                  formatter={(value: any, name: any) => [
                    `${value}%`,
                    name === 'churnRate' ? 'Churn Rate' : 'Inadimplência'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="churnRate" 
                  stroke="#f43f5e" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorChurn)" 
                  name="churnRate"
                />
                <Area 
                  type="monotone" 
                  dataKey="inadimplenciaRate" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1} 
                  fill="url(#colorInad)" 
                  name="inadimplenciaRate"
                />
              </AreaChart>
            ) : (
              <BarChart
                data={churnHistory}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? '#334155' : '#f1f5f9'} 
                />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }} 
                  axisLine={{ stroke: isDarkMode ? '#334155' : '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                  axisLine={{ stroke: isDarkMode ? '#334155' : '#e2e8f0' }}
                  tickFormatter={(val) => `R$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  }}
                  formatter={(value: any, name: any) => [
                    `R$ ${Number(value).toLocaleString('pt-BR')}`,
                    name === 'revenueLoss' ? 'Perda por Cancelamento/Falha' : 'Recuperado por Retentativas'
                  ]}
                />
                <Bar dataKey="revenueLoss" fill="#e11d48" radius={[4, 4, 0, 0]} name="revenueLoss" />
                <Bar dataKey="recoveredRevenue" fill="#10b981" radius={[4, 4, 0, 0]} name="recoveredRevenue" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Insight Callout */}
        <div className={`mt-4 p-3.5 rounded-xl border flex items-start gap-3 ${
          isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
        }`}>
          <Info className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">Diagnóstico do Algoritmo de Cobrança:</strong> O churn de assinantes caiu de 4.2% para 2.1% no acumulado de 12 meses após a introdução da Central de Propostas integrada com sinal obrigatório de 50%. A taxa de recuperação de cobranças via retentativas automáticas no gateway Stripe atingiu 82.4% no último trimestre.
          </div>
        </div>
      </div>
    </div>
  );
}
