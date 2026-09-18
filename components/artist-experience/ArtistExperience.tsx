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
  X
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

export interface ArtistExperienceProps {
  djSlug: string;
}

export function ArtistExperience({ djSlug }: ArtistExperienceProps) {
  const profile: ArtistProfileData = getArtistProfile(djSlug);
  const atmosphere: AtmosphereConfig = getDJAtmosphere(djSlug);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [trackProgress, setTrackProgress] = useState<number>(24);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Toggle Play
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  // Share profile
  const handleShare = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Scroll to section
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`min-h-screen text-white relative overflow-x-hidden ${atmosphere.themeClass}`}
      style={{ backgroundColor: atmosphere.background.baseColor }}
    >
      {/* 1. ATMOSPHERIC CINEMATIC CANVAS (Volumetric lights & particles) */}
      <AtmosphereCanvas atmosphere={atmosphere} isPlaying={isPlaying} />

      {/* Top Floating Artist Minimal Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-black/20 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black tracking-widest uppercase text-white">
            {profile.name}
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-white/40">
            / {profile.location}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleShare}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5 px-3"
            title="Compartilhar Perfil"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiedLink ? "Link copiado!" : "Compartilhar"}</span>
          </button>

          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="px-5 py-2 rounded-full text-xs font-bold text-black transition-all hover:scale-105 cursor-pointer shadow-lg"
            style={{ backgroundColor: atmosphere.accentColor }}
          >
            Contratar
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 1. ARTIST STAGE / HERO (IMERSIVO & CINEMATOGRÁFICO) */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[92vh] flex flex-col justify-end px-6 sm:px-12 md:px-20 pb-16 pt-32 z-10">
        
        {/* Full Viewport Artist Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image 
            src={profile.heroImage} 
            alt={profile.name} 
            fill 
            priority
            className="object-cover object-center sm:object-top filter brightness-[0.65] contrast-[1.1] scale-105 transition-transform duration-1000"
          />
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(to top, ${atmosphere.background.baseColor} 5%, transparent 60%, rgba(0,0,0,0.7) 100%)` 
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-widest text-white/80 uppercase">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: atmosphere.accentColor }} />
            <span>{profile.location}</span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl">
            {profile.name}
          </h1>

          <p className="text-lg sm:text-2xl font-light text-white/80 tracking-wide max-w-2xl">
            {profile.tagline}
          </p>

          {/* Direct Stage CTAs */}
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
              onClick={() => scrollTo('press-kit')}
              className="h-14 px-6 rounded-full bg-transparent hover:bg-white/5 text-white/70 hover:text-white font-medium text-xs tracking-wider uppercase transition-colors"
            >
              Press Kit & Rider
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. EXPERIÊNCIA SONORA / PLAYER INTEGRADO */}
      {/* ---------------------------------------------------- */}
      <section className="relative z-20 px-6 sm:px-12 md:px-20 -mt-8 mb-20">
        <div className="max-w-5xl mx-auto p-5 sm:p-6 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          
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
                <span className="text-xs font-mono text-emerald-400">Hi-Fi Audio</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">{profile.featuredTrack.title}</h3>
              <p className="text-xs text-white/50">{profile.featuredTrack.artist}</p>
            </div>
          </div>

          {/* Visual Waveform Bar */}
          <div className="flex-1 w-full max-w-md flex items-center gap-1.5 h-8">
            {[40, 70, 45, 90, 60, 100, 75, 40, 85, 95, 50, 70, 30, 80, 100, 60, 40, 90, 75, 50, 30, 85, 60, 40].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 rounded-full transition-all duration-300"
                style={{ 
                  height: isPlaying ? `${Math.max(15, (h * (Math.sin(i + Date.now()/300) * 0.3 + 0.7)))}%` : `${h * 0.4}%`,
                  backgroundColor: i < (trackProgress / 4) ? atmosphere.accentColor : 'rgba(255,255,255,0.15)'
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/60">
            <span>{profile.featuredTrack.duration}</span>
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className="p-2 rounded-full hover:bg-white/10 text-white/70"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. IDENTIDADE & MANIFESTO ARTÍSTICO */}
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
      {/* 4. AGENDA EDITORIAL / TURNÊ */}
      {/* ---------------------------------------------------- */}
      <section id="agenda" className="relative z-10 px-6 sm:px-12 md:px-20 py-20 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase block mb-1">
              Próximas Apresentações
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Agenda & Turnê
            </h2>
          </div>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="text-xs font-mono uppercase tracking-wider text-white hover:underline flex items-center gap-1"
          >
            <span>Solicitar Data</span>
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
      {/* 5. SOBRE O ARTISTA & BIOGRAFIA */}
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
      {/* 6. PRESS KIT / EPK INTEGRADO */}
      {/* ---------------------------------------------------- */}
      <section id="press-kit" className="relative z-10 px-6 sm:px-12 md:px-20 py-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase block mb-1">
              Material para Curadoria & Imprensa
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Press Kit Oficial (EPK)
            </h2>
          </div>
          <a 
            href="#booking"
            onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); }}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition-colors self-start"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Solicitar Pacote Completo (ZIP)</span>
          </a>
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-mono text-white transition-opacity">
                Visualizar Hi-Res
              </div>
            </div>
          ))}
        </div>

        {/* Rider Técnico Homologado */}
        <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-white/70" />
              <span>Rider Técnico Homologado</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Validado
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
      {/* 7. BOOKING / CALL TO ACTION FINAL */}
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
      {/* 8. RODAPÉ DISCRETO INSTITUCIONAL */}
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

      {/* Lightbox Modal para Fotos Hi-Res */}
      {selectedPhotoIndex !== null && (
        <LightboxModal 
          photos={profile.pressPhotos} 
          initialIndex={selectedPhotoIndex} 
          onClose={() => setSelectedPhotoIndex(null)} 
        />
      )}

      {/* Fluxo de Booking Conversacional Progressivo */}
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