'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowLeft, 
  Calendar, 
  Sparkles,
  MapPin,
  CheckCircle2,
  FileCheck2,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'30d' | '90d' | '1a'>('30d');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-white/50 mb-1">
            <Link href="/dashboard" className="hover:text-white flex items-center gap-1 transition">
              <ArrowLeft className="w-3.5 h-3.5" /> Painel
            </Link>
            <span>/</span>
            <span className="text-white">Desempenho</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Métricas & Desempenho do Artista
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Resultados comerciais, alcance do press kit e conversão de contratos explicados para você.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center bg-[#131024] p-1.5 rounded-2xl border border-white/10 shadow-md">
          {(['30d', '90d', '1a'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                period === p
                  ? 'bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {p === '30d' ? 'Últimos 30 dias' : p === '90d' ? 'Últimos 3 meses' : 'Último ano'}
            </button>
          ))}
        </div>
      </div>

      {/* Camada de Interpretação Resumida: "O que estes números significam para você" */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#8A3FFC]/15 via-[#120F24] to-[#00D1FF]/10 border border-[#8A3FFC]/30 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00D1FF] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Diagnóstico do seu Mês
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">
          Seu ritmo de conversão cresceu 15% em relação ao mês anterior.
        </h3>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-3xl">
          Contratantes de São Paulo e Rio de Janeiro responderam mais rápido às suas propostas com rider Pioneer atualizado. Você já garantiu <strong>R$ 14.250</strong> em sinais de 50% custodiados na plataforma.
        </p>
      </div>

      {/* 4 Métricas que Importam para o DJ (com Camada de Interpretação e Comparativo Temporal) */}
      <div className="flex md:grid md:grid-cols-2 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* 1. Visualizações do Press Kit */}
        <div className="w-[85vw] md:w-auto shrink-0 snap-center md:snap-align-none p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 flex flex-col space-y-3 shadow-xl hover:border-white/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">
              Visualizações do Press Kit
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#8A3FFC]/20 text-[#C084FC] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-white tracking-tight">1.420</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18% vs mês anterior
            </span>
          </div>

          {/* Camada de Interpretação */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-white/70">
              💡 <strong>O que significa:</strong> Seu perfil foi visto por <strong>84 contratantes e produtores</strong> esta semana, principalmente após a publicação do set de verão.
            </p>
          </div>
        </div>

        {/* 2. Propostas Recebidas vs Aceitas */}
        <div className="w-[85vw] md:w-auto shrink-0 snap-center md:snap-align-none p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 flex flex-col space-y-3 shadow-xl hover:border-white/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">
              Propostas: Recebidas vs Aceitas
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#00D1FF]/20 text-[#00D1FF] flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-white tracking-tight">12 <span className="text-lg text-white/50 font-normal">recebidas</span> · 8 <span className="text-lg text-emerald-400 font-normal">aceitas</span></span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> 66.7%
            </span>
          </div>

          {/* Camada de Interpretação */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-white/70">
              💡 <strong>O que significa:</strong> Você fecha <strong>2 a cada 3 propostas recebidas</strong>. Respostas enviadas em menos de 2 horas aumentam o fechamento em 40%.
            </p>
          </div>
        </div>

        {/* 3. Faturamento do Mês */}
        <div className="w-[85vw] md:w-auto shrink-0 snap-center md:snap-align-none p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 flex flex-col space-y-3 shadow-xl hover:border-white/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">
              Faturamento do Mês (Confirmado + Previsto)
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-white tracking-tight">R$ 28.500</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +22% vs mês anterior
            </span>
          </div>

          {/* Camada de Interpretação */}
          <div className="pt-2 border-t border-white/5 space-y-1">
            <div className="flex justify-between text-[11px] text-white/60">
              <span>Sinais recebidos (50% custodiados): <strong className="text-emerald-300">R$ 14.250</strong></span>
              <span>Saldo pós-show: <strong className="text-white/90">R$ 14.250</strong></span>
            </div>
            <p className="text-xs text-white/70 pt-1">
              💡 <strong>O que significa:</strong> 100% dos cachês confirmados possuem sinal garantido antes de você embarcar para o evento.
            </p>
          </div>
        </div>

        {/* 4. Cidades com Maior Demanda */}
        <div className="w-[85vw] md:w-auto shrink-0 snap-center md:snap-align-none p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 flex flex-col space-y-3 shadow-xl hover:border-white/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">
              Cidades com Maior Demanda
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-xl font-extrabold text-white tracking-tight">São Paulo (52%) · Rio (28%)</span>
            <span className="text-xs font-bold text-white/50">Curitiba (12%)</span>
          </div>

          {/* Camada de Interpretação */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-white/70">
              💡 <strong>O que significa:</strong> Produtores do eixo SP-RJ são os que mais contratam seu repertório melódico, seguidos por festivais no Sul do país.
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown Geográfico e Histórico de Acessos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gráfico Semanal */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Fluxo de Contratações por Semana</h3>
              <p className="text-xs text-white/50">Acessos ao Press Kit vs propostas enviadas por semana</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-white/70">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8A3FFC]" /> Acessos
              </span>
              <span className="flex items-center gap-1.5 text-white/70">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D1FF]" /> Propostas
              </span>
            </div>
          </div>

          <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 border-b border-white/10 px-2">
            {[
              { week: 'Semana 1', a: '55%', p: '35%' },
              { week: 'Semana 2', a: '70%', p: '50%' },
              { week: 'Semana 3', a: '85%', p: '75%' },
              { week: 'Semana 4', a: '100%', p: '90%' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-2 h-full">
                  <div style={{ height: col.a }} className="w-5 sm:w-8 bg-[#8A3FFC] rounded-t group-hover:brightness-110 transition" />
                  <div style={{ height: col.p }} className="w-5 sm:w-8 bg-[#00D1FF] rounded-t group-hover:brightness-110 transition" />
                </div>
                <span className="text-[11px] text-white/50 font-medium">{col.week}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-white/40 uppercase block">Horário de Maior Acesso</span>
              <span className="font-bold text-white">16h às 21h (Quintas e Sextas)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-white/40 uppercase block">Dispositivo</span>
              <span className="font-bold text-white">Mobile (79% dos contratantes)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-white/40 uppercase block">Tempo Médio no Press Kit</span>
              <span className="font-bold text-[#00D1FF]">3m 45s por sessão</span>
            </div>
          </div>
        </div>

        {/* Ranking de Cidades */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Demanda Regional</h3>
              <p className="text-xs text-white/50">Distribuição geográfica dos acessos e contratações</p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { city: 'São Paulo - SP', pct: 52, cache: 'R$ 15.000' },
                { city: 'Rio de Janeiro - RJ', pct: 28, cache: 'R$ 7.500' },
                { city: 'Curitiba - PR', pct: 12, cache: 'R$ 3.500' },
                { city: 'Florianópolis - SC', pct: 8, cache: 'R$ 2.500' },
              ].map((loc, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">{loc.city}</span>
                    <span className="text-white/60 font-mono">{loc.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] rounded-full"
                      style={{ width: `${loc.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1">
            <span className="font-bold text-white flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Oportunidade
            </span>
            <p className="text-[11px] leading-relaxed">
              Fechamentos em São Paulo pagam em média 35% a mais por hora de set.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
