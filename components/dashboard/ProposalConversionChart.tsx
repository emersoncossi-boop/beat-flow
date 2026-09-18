'use client';

import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { TrendingUp, CheckCircle2, Send, Sparkles, BarChart2 } from 'lucide-react';

export interface ProposalConversionChartProps {
  confirmedCount?: number;
  totalProposalsCount?: number;
}

interface WeekDataPoint {
  semana: string;
  labelCurto: string;
  candidaturas: number;
  confirmados: number;
  conversao: number;
}

// Custom Tooltip with high contrast and accessibility
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload as WeekDataPoint;
    return (
      <div className="bg-[#18152e] border border-violet-500/40 rounded-xl p-3 shadow-2xl text-xs space-y-1.5 min-w-[170px]">
        <div className="font-bold text-white border-b border-white/10 pb-1 flex items-center justify-between">
          <span>{data.semana}</span>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
            {data.conversao}% conv.
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-300 pt-0.5">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8A3FFC]" />
            Candidaturas:
          </span>
          <strong className="text-white font-mono">{data.candidaturas}</strong>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#00D1FF]" />
            Shows Confirmados:
          </span>
          <strong className="text-emerald-400 font-mono">{data.confirmados}</strong>
        </div>
      </div>
    );
  }
  return null;
}

export function ProposalConversionChart({
  confirmedCount = 2,
  totalProposalsCount = 4
}: ProposalConversionChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Weekly data synthesized to reflect monthly progression of sent applications vs confirmed gigs
  // The current active week dynamically incorporates confirmed proposals from the active dashboard state
  const baseWeek4Confirmados = Math.max(2, confirmedCount);
  
  const chartData: WeekDataPoint[] = [
    {
      semana: 'Sem 1 (01-07)',
      labelCurto: 'Sem 1',
      candidaturas: 4,
      confirmados: 1,
      conversao: 25,
    },
    {
      semana: 'Sem 2 (08-14)',
      labelCurto: 'Sem 2',
      candidaturas: 6,
      confirmados: 2,
      conversao: 33,
    },
    {
      semana: 'Sem 3 (15-21)',
      labelCurto: 'Sem 3',
      candidaturas: 5,
      confirmados: 3,
      conversao: 60,
    },
    {
      semana: 'Sem 4 (22-30)',
      labelCurto: 'Sem 4',
      candidaturas: 7,
      confirmados: baseWeek4Confirmados,
      conversao: Math.round((baseWeek4Confirmados / 7) * 100),
    },
  ];

  const totalCandidaturas = chartData.reduce((acc, curr) => acc + curr.candidaturas, 0);
  const totalConfirmados = chartData.reduce((acc, curr) => acc + curr.confirmados, 0);
  const taxaConversaoGeral = Math.round((totalConfirmados / totalCandidaturas) * 100);

  return (
    <section 
      id="grafico-conversao-propostas"
      aria-label="Gráfico de evolução da conversão de candidaturas" 
      className="rounded-2xl bg-[#120F24]/90 border border-white/10 p-4 sm:p-6 space-y-4 shadow-lg"
    >
      {/* Header with Title & Live KPI Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-500/20 text-[#C084FC]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Evolução da Conversão de Propostas no Mês
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Candidaturas enviadas versus shows confirmados com contrato e sinal retido.
          </p>
        </div>

        {/* Quick summary metrics */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-violet-950/60 border border-violet-500/30 text-violet-200">
            <Send className="w-3.5 h-3.5 text-[#C084FC]" />
            <span>Enviadas: <strong className="text-white font-mono">{totalCandidaturas}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D1FF]" />
            <span>Confirmados: <strong className="text-white font-mono">{totalConfirmados}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Conversão: <strong className="font-mono text-emerald-300">{taxaConversaoGeral}%</strong></span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="h-64 sm:h-72 w-full pt-2">
        {!mounted ? (
          <div className="h-full w-full flex items-center justify-center text-xs text-white/40 animate-pulse">
            Carregando gráfico de evolução...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
              barGap={6}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255, 255, 255, 0.08)" 
                vertical={false} 
              />
              <XAxis 
                dataKey="semana" 
                stroke="rgba(255, 255, 255, 0.5)" 
                fontSize={11} 
                tickLine={false}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.5)" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} 
              />
              <Legend 
                verticalAlign="top" 
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}
                formatter={(value) => {
                  if (value === 'candidaturas') return <span className="text-slate-300 text-xs">Candidaturas Enviadas</span>;
                  if (value === 'confirmados') return <span className="text-slate-300 text-xs">Shows Confirmados</span>;
                  return value;
                }}
              />
              <Bar 
                dataKey="candidaturas" 
                name="candidaturas"
                fill="#8A3FFC" 
                radius={[5, 5, 0, 0]} 
                maxBarSize={38}
              />
              <Bar 
                dataKey="confirmados" 
                name="confirmados"
                fill="#00D1FF" 
                radius={[5, 5, 0, 0]} 
                maxBarSize={38}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Insight Micro-Narrative */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[11px] sm:text-xs text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <p>
          <strong className="text-white">Insight Comercial:</strong> Sua taxa de conversão saltou de <span className="text-violet-300">25% (Sem 1)</span> para <span className="text-emerald-300 font-bold">{chartData[chartData.length - 1].conversao}% (Sem 4)</span> à medida que contratantes receberam links com rider homologado e sinal de 50% facilitado.
        </p>
      </div>
    </section>
  );
}
