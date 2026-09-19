"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Headphones, 
  Calendar, 
  Sparkles, 
  Check, 
  Sliders
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { HeroInteractiveStage } from '@/components/landing/HeroInteractiveStage';

export default function BeatFlowLandingPage() {
  const router = useRouter();
  const [djHandleInput, setDjHandleInput] = useState("");

  const handleClaimSlug = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanHandle = djHandleInput.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
    const targetUrl = cleanHandle 
      ? `/login?mode=signup&handle=${encodeURIComponent(cleanHandle)}` 
      : '/login?mode=signup';
    router.push(targetUrl);
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white flex flex-col selection:bg-white selection:text-black">
      
      {/* ---------------------------------------------------- */}
      {/* 1. HEADER EDITORIAL (COMPACTO, FLUIDO & ERGONOMICO)  */}
      {/* ---------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-[#07080B]/90 backdrop-blur-xl border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 active:scale-95 transition-transform">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <a href="#contraste" className="hover:text-white transition-colors">O Contraste</a>
            <a href="#pilares" className="hover:text-white transition-colors">Recursos</a>
            <a href="#planos" className="hover:text-white transition-colors">Planos</a>
            <Link href="/explorar" className="hover:text-white transition-colors">Explorar DJs</Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white px-3 py-2 transition-colors"
            >
              Entrar
            </Link>
            <Link 
              href="/login?mode=signup" 
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center active:scale-95"
            >
              Criar Perfil
            </Link>
          </div>

        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 2. HERO SECTION - ALTA CONVERSAO & ERGONOMIA MOBILE  */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-8 pb-14 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#07080B]">
        
        {/* Architectural Chiaroscuro Stage Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Direct Value Proposition & Handle Claim */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              {/* Official Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                  PRESS KIT OFICIAL PARA DJS
                </span>
              </div>

              {/* High-Impact Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-5">
                Seu som abre a porta.<br />
                O Beat Flow <span className="text-zinc-400 font-extrabold">fecha o show.</span>
              </h1>

              {/* Punchy Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-xl mb-8 leading-relaxed">
                M&uacute;sica com marcadores de drop, rider t&eacute;cnico homologado, agenda sincronizada e propostas formais em um &uacute;nico link profissional de alta autoridade.
              </p>

              {/* Mobile-Ergonomic Handle Claim Form (16px font prevents iOS zoom) */}
              <div className="w-full max-w-lg mb-6">
                <form 
                  onSubmit={handleClaimSlug}
                  className="p-1.5 rounded-2xl bg-[#0F1118] border border-white/15 focus-within:border-white/40 focus-within:bg-white/[0.06] transition-all shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                >
                  <div className="flex items-center w-full px-3.5 h-12 bg-white/5 rounded-xl">
                    <span className="text-zinc-400 font-mono text-xs sm:text-sm select-none shrink-0">
                      beatflow.me/@
                    </span>
                    <input
                      type="text"
                      placeholder="seunome"
                      value={djHandleInput}
                      onChange={(e) => setDjHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                      style={{ fontSize: '16px' }}
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      className="bg-transparent text-white font-mono text-base focus:outline-none w-full placeholder:text-zinc-600 ml-1 py-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 px-6 rounded-xl bg-white hover:bg-zinc-200 active:scale-95 text-black font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
                  >
                    <span>Reivindicar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Micro-Feedback */}
                <div className="mt-3 text-left px-2">
                  {djHandleInput.trim().length > 0 ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>beatflow.me/@<strong>{djHandleInput}</strong> dispon&iacute;vel</span>
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Garante seu endere&ccedil;o oficial antes que outro artista registre</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Trust Indicator */}
              <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                <span>Utilizado por DJs residentes e headliners em todo o Brasil</span>
              </div>

            </div>

            {/* Right Column: Realistic Faithful Stage Mockup */}
            <div className="lg:col-span-6 w-full mt-4 lg:mt-0">
              <HeroInteractiveStage 
                djHandle={djHandleInput} 
                onClaim={() => handleClaimSlug()} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. O CONTRASTE (O FIM DA BIO AMADORA E DO CAOS)      */}
      {/* ---------------------------------------------------- */}
      <section id="contraste" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#050609] relative">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-4">
              EFICI&Ecirc;NCIA &amp; CONVERS&Atilde;O
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              O fim da bio amadora e dos cach&ecirc;s perdidos.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Contratantes e curadores tomam decis&otilde;es em segundos. Quando o seu material est&aacute; disperso, a fric&ccedil;&atilde;o destr&oacute;i o interesse.
            </p>
          </div>

          {/* 2-Column Direct Contrast Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* The Chaos Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-red-500/20 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold uppercase mb-4">
                  A Bio Amadora
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Links soltos e conversas que esfriam
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-400">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>Links de &aacute;udio sem indica&ccedil;&atilde;o de onde o som realmente explode.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>PDFs pesados de 40MB com riders que n&atilde;o abrem no 4G do contratante.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>Conversas informais no WhatsApp que se arrastam e perdem a data.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>Inseguran&ccedil;a do produtor sobre o suporte t&eacute;cnico e rider real.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-red-400/80">
                Resultado: Negocia&ccedil;&otilde;es perdidas por demora e amadorismo.
              </div>
            </div>

            {/* The Beat Flow Stage Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/20 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-4">
                  O Padr&atilde;o Beat Flow
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Presen&ccedil;a editorial e fechamento &aacute;gil
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Cue Points:</strong> O produtor ouve o &aacute;pice do seu set em 5 segundos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Rider Homologado:</strong> CDJs, mixers e cabine especificados sem ru&iacute;dos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Agenda Sincronizada:</strong> Cidades e datas dispon&iacute;veis transparentes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span><strong>Proposta Estruturada:</strong> Receba propostas completas prontas para fechar.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-emerald-400 font-bold">
                Resultado: Decis&otilde;es r&aacute;pidas e cach&ecirc;s valorizados.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. OS 4 PILARES DO PALCO (BENTO GRID ARQUITETURAL)    */}
      {/* ---------------------------------------------------- */}
      <section id="pilares" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#07080B] relative">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-4">
              ARQUITETURA C&Ecirc;NICA
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Tudo o que o contratante precisa em 1 tela.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Criado exclusivamente para a din&acirc;mica da m&uacute;sica eletr&ocirc;nica, dispensando anexos e arquivos pesados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Pilar 1 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Player com Marcadores de Drop</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Contratantes n&atilde;o ouvem sets de 2 horas. Os cue points levam o ouvinte direto ao momento de &aacute;pice da sua apresenta&ccedil;&atilde;o em segundos.
                </p>
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Rider T&eacute;cnico Homologado</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  CDJ-3000, mixers rotativos e especifica&ccedil;&otilde;es de cabine descritos com clareza. Zero surpresas t&eacute;cnicas no dia do show.
                </p>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Agenda &amp; Turn&ecirc;s Sincronizadas</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Datas livres e cidades em turn&ecirc; sempre atualizadas. Elimina mensagens repetitivas sobre disponibilidade de datas.
                </p>
              </div>
            </div>

            {/* Pilar 4 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Formaliza&ccedil;&atilde;o Direta de Propostas</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Receba solicita&ccedil;&otilde;es estruturadas com data, formato de apresenta&ccedil;&atilde;o, local e or&ccedil;amento j&aacute; preenchidos pelo contratante.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. PLANOS E NIVEIS DE EXPERIENCIA                    */}
      {/* ---------------------------------------------------- */}
      <section id="planos" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#050609] relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-4">
              TRANSPAR&Ecirc;NCIA RADICAL
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Planos &amp; N&iacute;veis de Presen&ccedil;a
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Cobrar por profundidade. N&atilde;o cobrar por dignidade visual. Todos os planos criam uma p&aacute;gina p&uacute;blica impec&aacute;vel e veloz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* PLANO 01 - ESSENTIAL */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">PLANO 01</div>
                <h3 className="text-xl font-bold text-white mb-2">ESSENTIAL</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-black text-white">R$ 0</span>
                  <span className="text-xs text-zinc-500">/ gr&aacute;tis</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6">
                  Para DJs em in&iacute;cio de posicionamento que precisam de presen&ccedil;a profissional imediata.
                </p>
                <ul className="space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Link oficial <strong>beatflow.me/@seunome</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Player de &aacute;udio com cue points</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Rider t&eacute;cnico essencial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bot&atilde;o de contato direto</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10">
                <Link href="/login?mode=signup" className="block w-full">
                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition cursor-pointer">
                    Come&ccedil;ar Gratuitamente
                  </button>
                </Link>
              </div>
            </div>

            {/* PLANO 02 - PRO (DESTAQUE DA CENA) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.04] border-2 border-white/30 flex flex-col justify-between relative shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-md">
                O PADR&Atilde;O DA CENA
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">PLANO 02</div>
                <h3 className="text-xl font-bold text-white mb-2">PRO</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-black text-white">R$ 39</span>
                  <span className="text-xs text-zinc-400">/ m&ecirc;s</span>
                </div>
                <p className="text-xs text-zinc-300 mb-6">
                  Para artistas em circula&ccedil;&atilde;o que demandam formaliza&ccedil;&atilde;o de shows e agenda ativa.
                </p>
                <ul className="space-y-3 text-xs text-zinc-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tudo do Essential</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Sistema de propostas e reservas</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Agenda de turn&ecirc;s sincronizada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cat&aacute;logo de atmosferas visuais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Selo oficial de Artista Homologado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>M&eacute;tricas de contratantes</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/15">
                <Link href="/login?mode=signup" className="block w-full">
                  <button className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 active:scale-95 text-black font-bold text-xs transition cursor-pointer shadow-md">
                    Ativar Padr&atilde;o Pro
                  </button>
                </Link>
              </div>
            </div>

            {/* PLANO 03 - SIGNATURE */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">PLANO 03</div>
                <h3 className="text-xl font-bold text-white mb-2">SIGNATURE</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-black text-white">R$ 89</span>
                  <span className="text-xs text-zinc-500">/ m&ecirc;s</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6">
                  Presen&ccedil;a c&ecirc;nica cinematogr&aacute;fica para headliners e projetos em grande expans&atilde;o.
                </p>
                <ul className="space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tudo do Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cart&atilde;o NFC F&iacute;sico Beat Flow</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Curadoria c&ecirc;nica personalizada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Suporte priorit&aacute;rio via WhatsApp</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10">
                <Link href="/login?mode=signup" className="block w-full">
                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition cursor-pointer">
                    Escolher Signature
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. FECHAMENTO & FINAL CLAIM                          */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#07080B] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            O seu pr&oacute;ximo show come&ccedil;a<br />na primeira impress&atilde;o.
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 mb-8 max-w-xl mx-auto">
            Garanta seu endere&ccedil;o oficial antes que outro artista registre seu nome art&iacute;stico.
          </p>

          <form 
            onSubmit={handleClaimSlug}
            className="p-1.5 rounded-2xl bg-[#0F1118] border border-white/15 focus-within:border-white/40 max-w-md mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-2xl mb-4"
          >
            <div className="flex items-center w-full px-3.5 h-12 bg-white/5 rounded-xl">
              <span className="text-zinc-400 font-mono text-xs sm:text-sm select-none shrink-0">
                beatflow.me/@
              </span>
              <input
                type="text"
                placeholder="seunome"
                value={djHandleInput}
                onChange={(e) => setDjHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                style={{ fontSize: '16px' }}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                className="bg-transparent text-white font-mono text-base focus:outline-none w-full placeholder:text-zinc-600 ml-1 py-1"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-xl bg-white hover:bg-zinc-200 active:scale-95 text-black font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
            >
              <span>Ativar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. FOOTER EDITORIAL DE LUXO                         */}
      {/* ---------------------------------------------------- */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#050609] text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider">BEAT FLOW</span>
            <span>&middot;</span>
            <span>Uma plataforma oficial NEXORA</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/explorar" className="hover:text-white transition-colors">Explorar DJs</Link>
            <Link href="/login" className="hover:text-white transition-colors">Entrar</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Super Admin</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}