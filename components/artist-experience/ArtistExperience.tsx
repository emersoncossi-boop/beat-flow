'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  Calendar, 
  Send, 
  Download, 
  Sliders, 
  MapPin, 
  Share2, 
  CheckCircle2, 
  ExternalLink,
  Headphones,
  Instagram,
  Music,
  Disc3,
  Sparkles,
  ChevronRight,
  FileText,
  Volume2,
  VolumeX,
  HelpCircle,
  Maximize2,
  Minimize2,
  QrCode,
  Info,
  Check,
  Flame,
  Radio
} from 'lucide-react';
import { 
  getDJAtmosphere, 
  getArtistProfile, 
  ArtistProfileData,
  AtmosphereConfig 
} from '@/lib/artist-universe';
import { AtmosphereCanvas } from './AtmosphereCanvas';
import { ConversationalBookingModal } from './ConversationalBookingModal';
import { LightboxModal } from './LightboxModal';
import { writeToNfcTag, downloadVCard } from '@/lib/nfc-card';

export interface ArtistExperienceProps {
  djSlug: string;
}

export function ArtistExperience({ djSlug }: ArtistExperienceProps) {
  const profile: ArtistProfileData = getArtistProfile(djSlug);
  const atmosphere: AtmosphereConfig = getDJAtmosphere(djSlug);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [trackProgress, setTrackProgress] = useState<number>(35);
  const [currentCuePoint, setCurrentCuePoint] = useState<string>("Intro");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isStageMode, setIsStageMode] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Cue Points / Drop Markers for fast contractor evaluation
  const cuePoints = [
    { label: "Intro", progress: 10, time: "0:45", desc: "Ambientação & Textura" },
    { label: "Build-up", progress: 40, time: "2:30", desc: "Crescimento de Tensão" },
    { label: "Peak Drop", progress: 65, time: "4:15", desc: "Clímax da Pista (Drop Principal)" },
    { label: "Outro", progress: 90, time: "5:50", desc: "Transição Suave" }
  ];

  const handleJumpToCue = (cue: typeof cuePoints[0]) => {
    setTrackProgress(cue.progress);
    setCurrentCuePoint(cue.label);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`min-h-screen text-white relative overflow-x-hidden ${atmosphere.themeClass} ${
        isStageMode ? 'fixed inset-0 z-50 overflow-hidden' : ''
      }`}
      style={{ backgroundColor: atmosphere.background.baseColor }}
    >
      {/* 1. ATMOSPHERIC VOLUMETRIC CANVAS */}
      <AtmosphereCanvas atmosphere={atmosphere} isPlaying={isPlaying} />

      {/* STAGE BACKDROP FULLSCREEN MODE (Cabine / Telão) */}
      {isStageMode && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <button 
            onClick={() => setIsStageMode(false)}
            className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-2"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Sair do Modo Palco</span>
          </button>

          <div className="space-y-6 max-w-lg">
            <div className="w-32 h-32 rounded-full mx-auto p-1 border-2 shadow-[0_0_60px_rgba(255,255,255,0.3)] animate-pulse" style={{ borderColor: atmosphere.accentColor }}>
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image src={profile.avatarImage} alt="" fill className="object-cover" />
              </div>
            </div>
            <h2 className="text-6xl sm:text-7xl font-black uppercase tracking-tighter text-white">
              {profile.name}
            </h2>
            <p className="text-sm font-mono text-white/60 tracking-widest uppercase">
              {profile.tagline}
            </p>
            <div className="flex items-center justify-center gap-1.5 h-10 pt-4">
              {[40, 80, 60, 100, 75, 90, 50, 85, 95, 60, 40, 70].map((h, i) => (
                <span 
                  key={i} 
                  className="w-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    height: `${h}%`,
                    backgroundColor: atmosphere.accentColor 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Artist Header with Subtle Micro-Hints */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-4 flex items-center justify-between pointer-events-auto backdrop-blur-xl bg-black/30 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black tracking-widest uppercase text-white">
            {profile.name}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-white/40">
            <span>/ {profile.location}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtle Orientation Icon: What is this page */}
          <div className="relative group hidden md:block">
            <button 
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              aria-label="Informações sobre a página"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-64 p-3 rounded-xl bg-zinc-900/95 border border-zinc-700/80 shadow-2xl text-[11px] text-zinc-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <p className="font-bold text-white mb-1">Palco Digital Oficial</p>
              Este é o endereço oficial de {profile.name} com músicas em alta fidelidade, rider validado e canal direto para contratação.
            </div>
          </div>

          {/* QR Code Digital Pass */}
          <button 
            onClick={() => setIsQrModalOpen(true)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Abrir QR Code de Contato"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>

          {/* Mode Full Screen Backdrop */}
          <button 
            onClick={() => setIsStageMode(true)}
            className="hidden sm:flex p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Modo Telão / Cabine"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={handleShare}
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Copiado!" : "Compartilhar"}</span>
          </button>

          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="px-5 py-1.5 rounded-full text-xs font-bold text-black transition-all hover:scale-105 cursor-pointer shadow-lg"
            style={{ backgroundColor: atmosphere.accentColor }}
          >
            Contratar
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 1. HERO / ARTIST STAGE */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[92vh] flex flex-col justify-end px-6 sm:px-12 md:px-20 pb-16 pt-32 z-10">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image 
            src={profile.heroImage} 
            alt={profile.name} 
            fill 
            priority
            className="object-cover object-center sm:object-top filter brightness-[0.65] contrast-[1.1]"
          />
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(to top, ${atmosphere.background.baseColor} 5%, transparent 60%, rgba(0,0,0,0.7) 100%)` 
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-widest text-white/80 uppercase">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: atmosphere.accentColor }} />
            <span>{profile.location}</span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
            {profile.name}
          </h1>

          <p className="text-lg sm:text-2xl font-light text-white/80 tracking-wide max-w-2xl">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button 
              onClick={togglePlay}
              className="h-14 px-8 rounded-full text-black font-bold text-sm tracking-wide flex items-center gap-3 transition-all hover:scale-105 cursor-pointer shadow-2xl"
              style={{ backgroundColor: atmosphere.accentColor }}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
              <span>{isPlaying ? "Pausar Som" : "Ouvir Agora"}</span>
            </button>

            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="h-14 px-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white font-bold text-sm tracking-wide flex items-center gap-2 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Contratar</span>
            </button>

            <button 
              onClick={() => scrollTo('como-funciona')}
              className="h-14 px-6 rounded-full bg-transparent hover:bg-white/5 text-white/70 hover:text-white font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Como Funciona</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. PLAYER DE ÁUDIO COM CUEPOINTS (PULAR PARA O DROP) */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-20 px-6 sm:px-12 md:px-20 -mt-8 mb-20">
        <div className="max-w-5xl mx-auto p-5 sm:p-6 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                <Image 
                  src={profile.featuredTrack.coverImage} 
                  alt={profile.featuredTrack.title} 
                  fill 
                  className="object-cover"
                />
                <button 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-white"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                    {profile.featuredTrack.bpm} BPM
                  </span>
                  <span className="text-[10px] font-mono text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded">
                    Marcador: {currentCuePoint}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{profile.featuredTrack.title}</h3>
                <p className="text-xs text-white/50">{profile.featuredTrack.artist}</p>
              </div>
            </div>

            {/* Cuepoints / Droppoints Bar for Instant Contractor Navigation */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              {cuePoints.map((cue, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpToCue(cue)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 ${
                    currentCuePoint === cue.label
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10'
                  }`}
                  title={cue.desc}
                >
                  <Flame className="w-3 h-3 text-purple-400" />
                  <span>{cue.label}</span>
                  <span className="text-[10px] opacity-60">({cue.time})</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-white/60">
              <span>{profile.featuredTrack.duration}</span>
              <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-full hover:bg-white/10 text-white/70">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sutil Micro-Orientação */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/40 font-mono">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Clique nos botões acima para pular direto para o clímax ou transição do set</span>
            </span>
            <span className="hidden sm:inline text-white/30">Áudio Masterizado 24-bit</span>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. GUIA SUTIL "COMO FUNCIONA O BOOKING" */}
      {/* ---------------------------------------------------- */}
      <section id="como-funciona" className="relative z-10 px-6 sm:px-12 md:px-20 py-12 max-w-5xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
              Processo Transparente & Seguro de Contratação
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <span className="text-sm font-bold font-mono text-purple-400">01. Envie a Data</span>
              <h4 className="text-sm font-bold text-white">Consulta em 1 Minuto</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Informe o tipo de evento, cidade e data desejada sem precisar preencher cadastros longos.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold font-mono text-purple-400">02. Alinhamento Direto</span>
              <h4 className="text-sm font-bold text-white">Rider & Proposta</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Você recebe a confirmação de disponibilidade com contrato formal e especificações técnicas.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold font-mono text-purple-400">03. Show Garantido</span>
              <h4 className="text-sm font-bold text-white">Sinal de 50% & Bloqueio</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Garantia de data na agenda do artista com recibo digital instantâneo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. MANIFESTO & IDENTIDADE */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-10 px-6 sm:px-12 md:px-20 py-16 max-w-5xl mx-auto">
        <div className="border-l-2 pl-8 space-y-4" style={{ borderColor: atmosphere.accentColor }}>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light italic leading-relaxed text-white/90">
            "{profile.quote}"
          </blockquote>
          <cite className="block text-xs font-mono tracking-widest uppercase text-white/50 not-italic">
            — {profile.quoteAuthor}
          </cite>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. AGENDA EDITORIAL */}
      {/* ---------------------------------------------------- */}
      <section id="agenda" className="relative z-10 px-6 sm:px-12 md:px-20 py-20 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                Próximas Apresentações
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Live Sync
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Agenda & Turnê
            </h2>
          </div>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="text-xs font-mono uppercase tracking-wider text-white hover:underline flex items-center gap-1"
          >
            <span>Consultar Data</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-white/10">
          {profile.tourDates.map((item, idx) => (
            <div key={idx} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:pl-2 transition-all">
              <div className="flex items-center gap-6">
                <span className="font-mono text-base font-bold text-white/90 w-24 shrink-0">
                  {item.dayMonth}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.event}
                  </h3>
                  <p className="text-xs text-white/50">{item.venue} • {item.city}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                  item.status === 'Confirmado' ? 'bg-white/10 text-white' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {item.status}
                </span>
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/20 text-white transition-colors"
                >
                  Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. SOBRE O ARTISTA & BIOGRAFIA */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-10 px-6 sm:px-12 md:px-20 py-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image 
            src={profile.avatarImage} 
            alt={profile.name} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="md:col-span-7 space-y-6">
          <span className="text-xs font-mono tracking-widest text-white/40 uppercase block">
            Biografia Oficial
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            A Arte & O Som
          </h2>
          <p className="text-base text-white/80 leading-relaxed">
            {profile.bioLong}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {profile.genres.map((g, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. PRESS KIT / EPK & RIDER TÉCNICO */}
      {/* ---------------------------------------------------- */}
      <section id="press-kit" className="relative z-10 px-6 sm:px-12 md:px-20 py-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                Material para Curadoria & Imprensa
              </span>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Homologado
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Press Kit Oficial (EPK)
            </h2>
          </div>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition-colors self-start"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Solicitar Pacote Completo (ZIP)</span>
          </button>
        </div>

        {/* Galeria de Fotos em Alta Resolução */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {profile.pressPhotos.map((photo, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedPhotoIndex(i)}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
            >
              <Image src={photo} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-mono text-white transition-opacity">
                Visualizar Hi-Res
              </div>
            </div>
          ))}
        </div>

        {/* Rider Técnico Homologado com Dica Sutil */}
        <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-white/70" />
                <span>Rider Técnico Homologado</span>
              </h3>
              <p className="text-xs text-white/40 mt-1">Configuração validada para operadores de áudio e diretores técnicos de eventos.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Validado de Fábrica
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="font-mono text-white/40 uppercase">CDJs / Players</span>
              <p className="font-semibold text-white">{profile.riderTechnical.players}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="font-mono text-white/40 uppercase">Mixer</span>
              <p className="font-semibold text-white">{profile.riderTechnical.mixer}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="font-mono text-white/40 uppercase">Monitores de Cabine</span>
              <p className="font-semibold text-white">{profile.riderTechnical.monitors}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="font-mono text-white/40 uppercase">Observações de Palco</span>
              <p className="font-semibold text-white">{profile.riderTechnical.notes}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 8. BOOKING CTA FINAL */}
      {/* ---------------------------------------------------- */}
      <section id="booking" className="relative z-10 px-6 sm:px-12 md:px-20 py-24 text-center max-w-4xl mx-auto">
        <span className="text-xs font-mono tracking-widest uppercase text-white/40 block mb-3">
          Disponibilidade para Gigs, Festivais & Residências
        </span>
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
          Leve a experiência {profile.name} para o seu evento
        </h2>
        <p className="text-base text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Inicie uma consulta direta de data e cachê em menos de 1 minuto sem burocracia.
        </p>

        <button 
          onClick={() => setIsBookingModalOpen(true)}
          className="h-16 px-10 rounded-full text-black font-extrabold text-base tracking-wide transition-all hover:scale-105 shadow-2xl cursor-pointer"
          style={{ backgroundColor: atmosphere.accentColor }}
        >
          Solicitar Proposta de Booking
        </button>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. RODAPÉ INSTITUCIONAL DISCRETO */}
      {/* ---------------------------------------------------- */}
      <footer className="relative z-10 py-10 px-6 sm:px-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
        <div>
          © {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <strong className="text-white/80">Beat Flow</strong>
          <span className="text-white/30">by NEXORA</span>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <LightboxModal 
          photos={profile.pressPhotos} 
          initialIndex={selectedPhotoIndex} 
          onClose={() => setSelectedPhotoIndex(null)} 
        />
      )}

      {/* Modal de Cartão Digital NFC & QR Pass */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-zinc-950 border border-zinc-800 p-6 text-center space-y-5 shadow-2xl">
            <button 
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 rounded-full mx-auto overflow-hidden relative border-2 border-purple-500/40 shadow-lg">
              <Image src={profile.avatarImage} alt="" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{profile.name}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Cartão Digital NFC & Passe de Contato</p>
            </div>
            <div className="p-4 bg-white rounded-2xl mx-auto w-44 h-44 flex items-center justify-center shadow-inner">
              <QrCode className="w-36 h-36 text-black" />
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => downloadVCard({
                  name: profile.name,
                  tagline: profile.tagline,
                  url: typeof window !== 'undefined' ? window.location.href : `https://beatflow.com.br/@${profile.slug}`,
                  photoUrl: profile.avatarImage
                })}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Salvar nos Contatos (vCard / iPhone)</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  const url = typeof window !== 'undefined' ? window.location.href : `https://beatflow.com.br/@${profile.slug}`;
                  const res = await writeToNfcTag(url);
                  alert(res.message);
                }}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Gravar Cartão Físico NFC (Aproximação)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Conversacional */}
      {isBookingModalOpen && (
        <ConversationalBookingModal 
          artistName={profile.name}
          accentColor={atmosphere.accentColor}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

    </div>
  );
}