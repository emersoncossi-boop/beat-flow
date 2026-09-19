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
  Radio,
  Clock,
  ShieldCheck,
  Layers,
  Copy,
  Globe2,
  Ticket
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

  // States
  const [activeTab, setActiveTab] = useState<'palco' | 'epk' | 'rider' | 'agenda' | 'booking'>('palco');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [trackProgress, setTrackProgress] = useState<number>(35);
  const [currentCuePoint, setCurrentCuePoint] = useState<string>("Intro");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedBio, setCopiedBio] = useState<boolean>(false);
  const [bioLanguage, setBioLanguage] = useState<'pt' | 'en' | 'es'>('pt');
  const [isStageMode, setIsStageMode] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Parallax Tilt Handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  // Keyboard Navigation Shortcuts (Apple Pro style)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        setIsStageMode(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsBookingModalOpen(false);
        setIsQrModalOpen(false);
        setSelectedPhotoIndex(null);
        setIsStageMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cue Points / Drop Markers for fast contractor evaluation
  const cuePoints = [
    { label: "Intro", progress: 10, time: "0:45", desc: "AmbientaÃ§Ã£o & Textura" },
    { label: "Build-up", progress: 40, time: "2:30", desc: "Crescimento de TensÃ£o" },
    { label: "Peak Drop", progress: 65, time: "4:15", desc: "ClÃ­max da Pista (Drop Principal)" },
    { label: "Outro", progress: 90, time: "5:50", desc: "TransiÃ§Ã£o Suave" }
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

  const handleCopyBio = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(profile.bioLong[bioLanguage]);
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
    }
  };

  const scrollToSection = (tab: 'palco' | 'epk' | 'rider' | 'agenda' | 'booking') => {
    setActiveTab(tab);
    const element = document.getElementById(`section-${tab}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`min-h-screen text-slate-100 font-sans relative selection:bg-white/20 selection:text-white transition-colors duration-700 ${atmosphere.themeClass}`}
      style={{ backgroundColor: atmosphere.background.baseColor }}
    >
      {/* 1. ATMOSPHERE CANVAS & VOLUMETRIC SPOTLIGHTS */}
      <AtmosphereCanvas config={atmosphere} isPlaying={isPlaying} />

      {/* 2. SPATIAL FLOATING DESKTOP/MOBILE COMMAND HUB (Apple Pro Style) */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-2xl bg-black/40 border-b border-white/[0.08] transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Artist Chip */}
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-xs group-hover:scale-105 transition-transform">
                BF
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-semibold tracking-wider uppercase text-white/90 group-hover:text-white">
                  Beat Flow
                </span>
                <span className="block text-[10px] text-white/40 tracking-widest font-mono">
                  STAGE PRO
                </span>
              </div>
            </Link>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-white/80 font-medium">@{profile.slug}</span>
            </div>
          </div>

          {/* Desktop Multi-Section Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08] shadow-inner">
            {[
              { id: 'palco', label: 'âœ¦ Palco & Som' },
              { id: 'epk', label: 'âš¡ Press Kit & EPK' },
              { id: 'rider', label: 'ðŸŽ›ï¸ Rider & Palco' },
              { id: 'agenda', label: 'ðŸ—“ï¸ Agenda & TurnÃª' },
              { id: 'booking', label: 'ðŸ’¬ Proposta Formal' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-lg shadow-white/10 font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Hub & Utilities */}
          <div className="flex items-center gap-2">
            {/* Quick Digital NFC / QR Pass */}
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-all active:scale-95"
              title="Abrir Passe Digital NFC & Apple/Google Wallet"
            >
              <QrCode className="w-3.5 h-3.5 text-white/90" />
              <span className="hidden lg:inline text-[11px] font-medium">Pass NFC</span>
            </button>

            {/* Stage Mode (Fullscreen Visualizer for LED screens) */}
            <button
              onClick={() => setIsStageMode(!isStageMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all active:scale-95 ${
                isStageMode
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
              }`}
              title="Modo TelÃ£o LED (Atalho: tecla 'S')"
            >
              {isStageMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden xl:inline text-[11px]">TelÃ£o LED</span>
            </button>

            {/* Share link */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all active:scale-95"
              title="Copiar link oficial"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {/* Direct Booking CTA */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-bold transition-all shadow-md shadow-white/10 active:scale-95"
            >
              <span>Contratar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. MAIN CINEMATIC EXPERIENCE BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-24 relative z-10">

        {/* SECTION 1: HERO & DIGITAL STAGE */}
        <section id="section-palco" className="pt-4 sm:pt-8 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Monumental Identity & Specs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Availability Chip & Genre Pill */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  DISPONÃVEL TURNÃŠ 2026
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono">
                  {profile.location}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono">
                  {profile.durationSet}
                </span>
              </div>

              {/* Monumental Name */}
              <div className="space-y-2">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none uppercase drop-shadow-2xl">
                  {profile.name}
                </h1>
                <p className="text-lg sm:text-2xl text-white/80 font-light tracking-wide">
                  {profile.tagline}
                </p>
              </div>

              {/* Editorial Short Bio */}
              <p className="text-sm sm:text-base text-white/60 max-w-2xl font-light leading-relaxed">
                {profile.bioShort}
              </p>

              {/* Quick Tech & Booking Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 max-w-lg p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono text-white/40 block">CachÃª Base</span>
                  <span className="text-sm sm:text-base font-bold text-white">{profile.baseFee}</span>
                </div>
                <div className="space-y-0.5 border-x border-white/10 px-3">
                  <span className="text-[10px] uppercase font-mono text-white/40 block">BPM MÃ©dio</span>
                  <span className="text-sm sm:text-base font-bold text-white font-mono">{profile.featuredTrack.bpm} BPM</span>
                </div>
                <div className="space-y-0.5 pl-1">
                  <span className="text-[10px] uppercase font-mono text-white/40 block">Rider TÃ©cnico</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Homologado
                  </span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black hover:bg-white/90 text-sm font-bold shadow-xl shadow-white/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-black" />
                      <span>Pausar Faixa</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-black" />
                      <span>Ouvir Set em Destaque</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Proposta de Show</span>
                </button>
              </div>

            </div>

            {/* Right Column: 3D Parallax Photo & Live Waveform Deck */}
            <div 
              className="lg:col-span-5 relative"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* Volumetric Glow Backdrop */}
              <div 
                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none transition-all duration-700"
                style={{ background: atmosphere.lighting.accentGlow }}
              />

              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl backdrop-blur-xl">
                
                {/* Hero Artist Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={profile.heroImage}
                    alt={profile.name}
                    fill
                    priority
                    className={`object-cover object-center transition-transform duration-1000 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Vinyl/Platter overlay if playing */}
                  {isPlaying && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90 animate-pulse">
                      <Disc3 className="w-4 h-4 animate-spin text-white" />
                      <span>AO VIVO</span>
                    </div>
                  )}

                  {/* Floating Track Info Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
                          <Image
                            src={profile.featuredTrack.coverImage}
                            alt={profile.featuredTrack.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">
                            {profile.featuredTrack.title}
                          </span>
                          <span className="text-[11px] text-white/50 block truncate font-mono">
                            {profile.featuredTrack.artist} Â· {profile.featuredTrack.duration}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                      </button>
                    </div>

                    {/* Interactive Cue Points Switcher */}
                    <div className="space-y-1.5 pt-1 border-t border-white/10">
                      <div className="flex items-center justify-between text-[10px] text-white/40 font-mono">
                        <span>PONTOS DE AUDIÃ‡ÃƒO RÃPIDA:</span>
                        <span className="text-white/80 font-bold">{currentCuePoint}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {cuePoints.map(cue => (
                          <button
                            key={cue.label}
                            onClick={() => handleJumpToCue(cue)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${
                              currentCuePoint === cue.label
                                ? 'bg-white text-black font-bold shadow-sm'
                                : 'bg-white/5 hover:bg-white/15 text-white/70'
                            }`}
                          >
                            {cue.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: PRESS KIT & EPK (Site Oficial do Artista) */}
        <section id="section-epk" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Electronic Press Kit (EPK)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                Press Kit & Material de Imprensa
              </h2>
            </div>

            {/* Language Selector for International Bookers */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              <Globe2 className="w-3.5 h-3.5 text-white/40 ml-2" />
              {(['pt', 'en', 'es'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setBioLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                    bioLanguage === lang
                      ? 'bg-white text-black font-bold'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Extended Bio with Instant Copy Button */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-white/40 tracking-wider">
                  Biografia Oficial para Flyers e Revistas
                </span>
                <button
                  onClick={handleCopyBio}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition-all active:scale-95"
                >
                  {copiedBio ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBio ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>

              <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                {profile.bioLong[bioLanguage]}
              </p>

              {/* Quote Block */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border-l-2 border-white/40 space-y-1">
                <p className="italic text-sm text-white/90">"{profile.quote}"</p>
                <span className="text-xs text-white/40 font-mono block">â€” {profile.quoteAuthor}</span>
              </div>

              {/* Logos & Assets Download Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">Logos Oficiais em Vetor (PNG/SVG)</span>
                  <span className="text-xs text-white/40">Fundo transparente para designers de eventos</span>
                </div>
                <a
                  href={profile.heroImage}
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Pack de Logos</span>
                </a>
              </div>
            </div>

            {/* High-Resolution Press Photos Gallery */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase text-white/40 tracking-wider block">
                Fotos em Alta ResoluÃ§Ã£o (4K)
              </span>

              <div className="grid grid-cols-2 gap-3">
                {profile.pressPhotos.map((photoUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer hover:border-white/40 transition-all"
                  >
                    <Image
                      src={photoUrl}
                      alt={`${profile.name} Press ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold shadow-lg">
                        Ver 4K
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: RIDER TÃ‰CNICO & MAPA DE PALCO */}
        <section id="section-rider" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span>Rider TÃ©cnico & ProduÃ§Ã£o</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                EspecificaÃ§Ãµes de Cabine & Palco
              </h2>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Rider em PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Players & Mixer */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Disc3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">CDJs & Mixer Homologados</h3>
                  <span className="text-xs text-white/40 font-mono">Pioneer Pro DJ Link</span>
                </div>
              </div>
              <div className="space-y-2 text-xs text-white/70 font-mono">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/40 block">PLAYERS:</span>
                  <span className="text-white font-semibold">{profile.riderTechnical.players}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/40 block">MIXER:</span>
                  <span className="text-white font-semibold">{profile.riderTechnical.mixer}</span>
                </div>
              </div>
            </div>

            {/* Input List & Sound Monitoring */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">MonitoraÃ§Ã£o & Canais</h3>
                  <span className="text-xs text-white/40 font-mono">Input List EstÃ©reo</span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-white/70 font-mono">
                {profile.riderTechnical.inputs.map((input, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{input}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospitality & Camarim */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Hospitalidade & Camarim</h3>
                  <span className="text-xs text-white/40 font-mono">Itens Essenciais</span>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-white/70">
                {profile.riderTechnical.hospitality.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                    <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: AGENDA & TURNÃŠ (IntegraÃ§Ã£o Direta com Ingressos) */}
        <section id="section-agenda" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tour Dates & Festivais</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                Agenda Oficial de Shows
              </h2>
            </div>

            <div className="text-xs text-white/50 font-mono">
              Datas sincronizadas em tempo real
            </div>
          </div>

          <div className="space-y-3">
            {profile.tourDates.map((tour, idx) => (
              <div
                key={idx}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all"
              >
                {/* Date & Event */}
                <div className="flex items-center gap-5">
                  <div className="w-16 text-center font-mono">
                    <span className="text-lg sm:text-xl font-black text-white block leading-none">
                      {tour.dayMonth.split(' ')[0]}
                    </span>
                    <span className="text-[11px] text-white/40 font-bold block uppercase">
                      {tour.dayMonth.split(' ')[1]}
                    </span>
                  </div>

                  <div className="h-10 w-px bg-white/10" />

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {tour.event}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                        tour.status === 'Confirmado' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        tour.status === 'Sold Out' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        'bg-white/10 text-white/80'
                      }`}>
                        {tour.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      <span>{tour.venue} Â· {tour.city}</span>
                    </p>
                  </div>
                </div>

                {/* Direct Ticket / Guestlist Outward Action */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {tour.ticketLink ? (
                    <a
                      href={tour.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Garantir Ingresso / Lista VIP</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-all"
                    >
                      Solicitar Data
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: BOOKING & CONTRATO FORMAL */}
        <section id="section-booking" className="scroll-mt-24">
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-black/80 p-8 sm:p-12 backdrop-blur-2xl space-y-8">
            
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                CONTRATAÃ‡ÃƒO DIRETA & BLINDADA
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Contrate {profile.name} para o seu Evento
              </h2>
              <p className="text-sm sm:text-base text-white/60 font-light">
                Envie os detalhes da data, cidade e estrutura tÃ©cnica. O sistema calcula a estimativa de deslocamento e gera a minuta formal do contrato em minutos.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-white/90 text-sm font-bold shadow-xl shadow-white/10 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Send className="w-4 h-4 fill-black" />
                <span>Iniciar Proposta Formal</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQrModalOpen(true)}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-all active:scale-95"
              >
                <QrCode className="w-4 h-4" />
                <span>Salvar Contato vCard / Pass</span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40 font-mono">
              <div className="flex items-center gap-4">
                <span>ðŸ›¡ï¸ Sinal de 50% via PIX Direto</span>
                <span>ðŸ“‹ Contrato com Validade JurÃ­dica</span>
              </div>
              <div>
                <span>Powered by Beat Flow</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 4. MODALS & OVERLAYS */}
      
      {/* Booking Conversational Modal */}
      {isBookingModalOpen && (
        <ConversationalBookingModal
          profile={profile}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

      {/* Lightbox 4K Photos Modal */}
      {selectedPhotoIndex !== null && (
        <LightboxModal
          photos={profile.pressPhotos}
          initialIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}

      {/* Digital Pass & NFC Smart Tag Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-neutral-900 to-black border border-white/20 shadow-2xl space-y-6 text-center">
            
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white"
            >
              âœ•
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-emerald-400">Passe Digital NFC & QR</span>
              <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
              <p className="text-xs text-white/50 font-mono">beatflow.me/{profile.slug}</p>
            </div>

            {/* Dynamic QR Display */}
            <div className="p-6 rounded-2xl bg-white flex flex-col items-center justify-center mx-auto max-w-[220px] aspect-square shadow-2xl">
              <div className="w-full h-full flex flex-col items-center justify-center text-black font-black text-center">
                <QrCode className="w-32 h-32 text-black" />
                <span className="text-[10px] tracking-widest uppercase font-mono mt-1">APROXIME O CELULAR</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => downloadVCard(profile.slug, profile.name, "+55 11 99999-9999", `${profile.slug}@beatflow.me`, `https://beatflow.me/${profile.slug}`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-white/90 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Salvar Contato na Agenda (vCard)</span>
              </button>

              <button
                onClick={async () => {
                  const res = await writeToNfcTag(`https://beatflow.me/${profile.slug}`);
                  alert(res.message);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs transition-all active:scale-95"
              >
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Gravar em Tag NFC / Chaveiro</span>
              </button>
            </div>

            <p className="text-[11px] text-white/40">
              CompatÃ­vel com Apple Wallet, Google Wallet e qualquer smartphone com aproximaÃ§Ã£o NFC.
            </p>

          </div>
        </div>
      )}

      {/* Fullscreen Stage Mode Overlay */}
      {isStageMode && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 select-none">
          <button
            onClick={() => setIsStageMode(false)}
            className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono"
          >
            Sair do TelÃ£o (ESC)
          </button>

          <div className="text-center space-y-6 max-w-3xl">
            <span className="text-sm font-mono tracking-widest uppercase text-emerald-400 animate-pulse">
              â— AO VIVO NO PALCO
            </span>
            <h1 className="text-6xl sm:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_80px_rgba(255,255,255,0.4)]">
              {profile.name}
            </h1>
            <p className="text-xl sm:text-3xl text-white/70 font-light">
              {profile.tagline}
            </p>
            <div className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-mono text-sm">
              beatflow.me/{profile.slug}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}