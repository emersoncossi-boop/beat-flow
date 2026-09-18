'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { 
  Search, 
  Bell, 
  Calendar, 
  Send, 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  MapPin, 
  ShieldCheck,
  ChevronRight,
  Eye,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  Disc3,
  Clock,
  Radio,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardHome() {
  const { djProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [timeRange, setTimeRange] = useState('Últimos 30 dias');
  const [availabilityActive, setAvailabilityActive] = useState(true);

  const artisticName = djProfile?.artisticName || 'DJ Skyline';
  const slug = djProfile?.slug || 'djskyline';
  const publicUrl = `beatflow.art/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${publicUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-full bg-[#08080F] text-white p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10 max-w-[1600px] mx-auto">
      {/* Top Bar Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
        {/* Search Bar with ⌘ K */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text"
            placeholder="Buscar propostas, eventos, locais..."
            className="w-full bg-[#161426]/70 border border-white/10 rounded-xl pl-10 pr-12 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#8A3FFC] transition"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded border border-white/10 font-mono">
            ⌘ K
          </kbd>
        </div>

        {/* Right Info: Slogan, Notifications, User Profile Badge */}
        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-end">
          <div className="hidden lg:block text-right">
            <span className="text-[10px] tracking-widest text-white/50 font-semibold uppercase block">
              Música Conecta Oportunidades
            </span>
          </div>

          {/* Notification Bell */}
          <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
          </button>

          {/* User Profile Pill */}
          <Link href="/dashboard/profile" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-full transition">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0">
              <Image 
                src={djProfile?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"}
                alt={artisticName}
                width={28}
                height={28}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block leading-none">{artisticName}</span>
              <span className="text-[9px] font-bold text-[#8A3FFC] bg-[#8A3FFC]/15 px-1.5 py-0.5 rounded uppercase tracking-wider">DJ VERIFICADO</span>
            </div>
          </Link>
        </div>
      </header>

      {/* HERO / CENTRAL DO DIA (O QUE PRECISO FAZER AGORA?) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00D1FF] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CENTRAL DO DIA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Hoje no Beat Flow
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-0.5">
              Suas decisões imediatas, negociações ativas e agenda da semana.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiado!' : 'Copiar Link'}</span>
            </button>
            <Link href={`/${slug}`} target="_blank">
              <Button size="sm" className="bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white text-xs font-bold h-10 px-4 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer">
                <span>Ver Press Kit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 CARDS DE AÇÃO IMEDIATA (O QUE FAZER HOJE) */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {/* Ação 1: Oportunidades */}
          <Link
            href="/dashboard/oportunidades"
            className="w-[85vw] md:w-auto min-w-[85vw] md:min-w-0 snap-center shrink-0 p-5 rounded-2xl bg-[#120F24]/90 hover:bg-[#16132C] border border-white/10 hover:border-white/20 transition group flex flex-col justify-between space-y-3 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                Buscar Oportunidades
              </h3>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Nenhum convite direto pendente no momento. Explore vagas abertas.
              </p>
            </div>
            <div className="text-xs font-bold text-white/50 flex items-center gap-1 pt-1 border-t border-white/5">
              <span>Explorar murais</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Ação 2: Negociação aguardando você */}
          <Link
            href="/dashboard/propostas"
            className="w-[85vw] md:w-auto min-w-[85vw] md:min-w-0 snap-center shrink-0 p-5 rounded-2xl bg-[#120F24]/90 hover:bg-[#16132C] border border-white/10 hover:border-white/20 transition group flex flex-col justify-between space-y-3 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                <Send className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-[#00D1FF] transition">
                0 propostas pendentes
              </h3>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Tudo em dia. Nenhuma negociação aguardando sua resposta.
              </p>
            </div>
            <div className="text-xs font-bold text-white/50 flex items-center gap-1 pt-1 border-t border-white/5">
              <span>Ver histórico</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Ação 3: Próximo Evento */}
          <Link
            href="/dashboard/agenda"
            className="w-[85vw] md:w-auto min-w-[85vw] md:min-w-0 snap-center shrink-0 p-5 rounded-2xl bg-[#120F24]/90 hover:bg-[#16132C] border border-white/10 hover:border-white/20 transition group flex flex-col justify-between space-y-3 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                Agenda Livre
              </h3>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Nenhum evento futuro confirmado no momento.
              </p>
            </div>
            <div className="text-xs font-bold text-white/50 flex items-center gap-1 pt-1 border-t border-white/5">
              <span>Gerenciar datas bloqueadas</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Ação 4: Press Kit Visitas */}
          <Link
            href="/dashboard/analytics"
            className="w-[85vw] md:w-auto min-w-[85vw] md:min-w-0 snap-center shrink-0 p-5 rounded-2xl bg-[#120F24]/90 hover:bg-[#16132C] border border-white/10 hover:border-white/20 transition group flex flex-col justify-between space-y-3 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-[#00D1FF] transition">
                0 visitas recentes
              </h3>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Compartilhe o link do seu Press Kit para atrair atenção de contratantes.
              </p>
            </div>
            <div className="text-xs font-bold text-white/50 group-hover:text-white flex items-center gap-1 pt-1 border-t border-white/5 transition">
              <span>Ver painel de acessos</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4 KPIS REAIS (EXATAMENTE COMO REQUISITADO NO ESCOPO) */}
      {/* 1. Visitas no Perfil | 2. Propostas Pendentes | 3. Eventos Confirmados | 4. Ganhos Estimados (Valor em Branco) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* KPI 1: Visitas no Perfil */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#120F24]/90 border border-white/10 flex items-center justify-between hover:border-[#8A3FFC]/50 transition shadow-xl group">
          <div className="space-y-1.5">
            <span className="text-xs text-white/60 font-medium">Visitas no Perfil</span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-extrabold text-white">0</span>
              <span className="text-xs font-semibold text-white/30 flex items-center">
                —
              </span>
            </div>
            <span className="text-[11px] text-white/40 block">Últimos 30 dias</span>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-[#8A3FFC]/15 border border-[#8A3FFC]/30 flex items-center justify-center text-[#8A3FFC] group-hover:scale-110 transition">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Propostas Pendentes */}
        <Link href="/dashboard/propostas" className="p-6 sm:p-7 rounded-3xl bg-[#120F24]/90 border border-white/10 flex items-center justify-between hover:border-amber-400/50 transition shadow-xl group cursor-pointer">
          <div className="space-y-1.5">
            <span className="text-xs text-white/60 font-medium">Propostas Pendentes</span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-extrabold text-white">0</span>
              <span className="text-xs font-semibold text-white/30 flex items-center">
                Nenhuma
              </span>
            </div>
            <span className="text-[11px] text-white/40 block">Abrir CRM para negociar</span>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
            <Send className="w-6 h-6" />
          </div>
        </Link>

        {/* KPI 3: Eventos Confirmados */}
        <Link href="/dashboard/agenda" className="p-6 sm:p-7 rounded-3xl bg-[#120F24]/90 border border-white/10 flex items-center justify-between hover:border-emerald-400/50 transition shadow-xl group cursor-pointer">
          <div className="space-y-1.5">
            <span className="text-xs text-white/60 font-medium">Eventos Confirmados</span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-extrabold text-white">0</span>
              <span className="text-xs font-semibold text-white/30 flex items-center">
                —
              </span>
            </div>
            <span className="text-[11px] text-white/40 block">Datas bloqueadas na agenda</span>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
            <Calendar className="w-6 h-6" />
          </div>
        </Link>

        {/* KPI 4: Ganhos Estimados (TEXTO FINANCEIRO EM BRANCO - NÃO EM VERDE) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#120F24]/90 border border-white/10 flex items-center justify-between hover:border-[#00D1FF]/50 transition shadow-xl group">
          <div className="space-y-1.5">
            <span className="text-xs text-white/60 font-medium">Ganhos Estimados</span>
            <div className="flex items-baseline gap-2.5">
              {/* Strictly white to respect color hierarchy and not compete with CTA buttons */}
              <span className="text-2xl sm:text-3xl font-extrabold text-white">R$ 0,00</span>
            </div>
            <span className="text-[11px] text-white/40 block">Sem recebíveis pendentes</span>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-[#00D1FF]/15 border border-[#00D1FF]/30 flex items-center justify-center text-[#00D1FF] group-hover:scale-110 transition">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Clean, High-Breathability Layout (8 cols + 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Propostas Recentes Inbound + Próximos Eventos da Agenda (8 cols) */}
        <div className="lg:col-span-8 space-y-8 lg:space-y-10">
          {/* Propostas Recentes Inbound (Acesso Rápido ao CRM) */}
          <div className="bg-[#120F24]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Propostas Recentes (Inbound)</h3>
                <p className="text-xs text-white/50 mt-0.5">Contratantes aguardando confirmação ou contraproposta</p>
              </div>
              <Link href="/dashboard/propostas" className="text-xs text-[#00D1FF] hover:underline flex items-center gap-1 font-semibold">
                Ver todas as propostas <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Empty State para Propostas Inbound */}
            <div className="flex flex-col items-center justify-center py-10 border border-white/5 border-dashed rounded-2xl bg-white/[0.02]">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-3">
                <Send className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-white mb-1">Nenhuma proposta pendente</p>
              <p className="text-xs text-white/50 text-center max-w-[280px]">
                Quando contratantes enviarem pedidos pelo seu Press Kit, eles aparecerão aqui.
              </p>
            </div>
          </div>

          {/* Próximos Eventos (Agenda Preview) */}
          <div className="bg-[#120F24]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Próximos Eventos Confirmados</h3>
                <p className="text-xs text-white/50 mt-0.5">Datas reservadas na agenda e rider técnico acordado</p>
              </div>
              <Link href="/dashboard/agenda" className="text-xs text-[#00D1FF] hover:underline flex items-center gap-1 font-semibold">
                Ver agenda completa <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Empty State para Agenda */}
            <div className="flex flex-col items-center justify-center py-10 border border-white/5 border-dashed rounded-2xl bg-white/[0.02]">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-white mb-1">Agenda livre</p>
              <p className="text-xs text-white/50 text-center max-w-[280px]">
                Nenhum evento futuro confirmado no momento.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Meu Perfil Resumo, Link Público & Dica (4 cols) */}
        <div className="lg:col-span-4 space-y-8 lg:space-y-10">
          {/* Meu Perfil Mini Card */}
          <div className="bg-[#120F24]/90 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-white">Press Kit Ativo</h3>
              <Link href="/dashboard/profile" className="text-xs text-[#00D1FF] hover:underline flex items-center gap-1 font-semibold">
                Editar <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#8A3FFC] shrink-0">
                <Image 
                  src={djProfile?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"}
                  alt={artisticName}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white">{artisticName}</h4>
                  <ShieldCheck className="w-4 h-4 text-[#00D1FF]" />
                </div>
                <span className="text-xs text-white/50 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-white/40" /> {djProfile?.city || 'São Paulo - SP'}
                </span>
              </div>
            </div>

            {/* Genre Chips */}
            <div className="flex flex-wrap gap-1.5">
              {(djProfile?.genres || ['House', 'Tech House', 'Melodic Techno']).map((tag) => (
                <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                  {tag}
                </span>
              ))}
            </div>

            {/* Metrics (No nested boxes) */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
              <div>
                <span className="text-sm font-bold text-white block">0</span>
                <span className="text-[10px] text-white/50">Visitas</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white block">0</span>
                <span className="text-[10px] text-white/50">Eventos</span>
              </div>
              <div>
                <span className="text-sm font-bold text-[#00D1FF] block">—</span>
                <span className="text-[10px] text-white/50">Avaliação</span>
              </div>
            </div>
          </div>

          {/* Seu Link Inteligente Card */}
          <div className="bg-[#120F24]/90 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Link Inteligente</span>
              <button 
                onClick={handleCopyLink}
                className="text-xs text-[#00D1FF] hover:underline flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <div className="bg-[#08080F] border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-mono text-white/90 truncate">{publicUrl}</span>
              <Copy className="w-4 h-4 text-white/40 shrink-0 cursor-pointer hover:text-white transition" onClick={handleCopyLink} />
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Adicione este link na bio do Instagram. Contratantes podem ouvir seu som e enviar pedidos formais com cachê direto para sua central.
            </p>
          </div>

          {/* Dica da Nexora */}
          <div className="bg-gradient-to-br from-[#1E143B] to-[#0D0B18] border border-white/15 rounded-3xl p-6 sm:p-7 space-y-3 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" /> Dica da Nexora
            </div>
            <h4 className="text-sm font-bold text-white">Exija referência sonora no Quick Book</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              O formulário inteligente agora obriga o contratante a informar o set ou link de som de referência. Isso evita divergência musical antes de você aceitar o sinal.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="pt-8 pb-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 uppercase tracking-wider">
        <div>
          <span className="font-bold text-white/70">BEAT FLOW</span> by NEXORA DIGITAL
        </div>
        <div>MÚSICA • CONEXÃO • OPORTUNIDADES</div>
        <div>FAÇA PARTE DE UMA CENA MAIOR.</div>
      </footer>
    </div>
  );
}
