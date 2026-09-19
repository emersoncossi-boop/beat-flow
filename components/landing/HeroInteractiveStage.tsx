'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Play, 
  Pause, 
  Sparkles, 
  Calendar, 
  Headphones, 
  CheckCircle2, 
  Sliders, 
  Send,
  Volume2,
  Disc3,
  ArrowRight,
  ShieldCheck,
  QrCode,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface HeroInteractiveStageProps {
  djHandle: string;
  onClaim: () => void;
}

export function HeroInteractiveStage({ djHandle, onClaim }: HeroInteractiveStageProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const artists = [
    {
      id: 'camila',
      name: 'CAMILA',
      genre: 'Afro House Â· Deep House',
      theme: 'Noir & Chrome',
      accentColor: '#E2E8F0',
      glow: 'rgba(226, 232, 240, 0.25)',
      badgeClass: 'bg-white text-black font-bold',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      track: 'Midnight Ritual Club Mix',
      bpm: 124,
      proposal: 'Proposta para D-EDGE Club (R$ 4.500)'
    },
    {
      id: 'sara',
      name: 'SARA',
      genre: 'Organic House Â· Sunset Sessions',
      theme: 'Sunset & Organic',
      accentColor: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.35)',
      badgeClass: 'bg-amber-500 text-black font-bold',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
      track: 'Golden Horizon Sunset',
      bpm: 121,
      proposal: 'Confirmou data em FlorianÃ³polis (R$ 7.200)'
    },
    {
      id: 'luna',
      name: 'LUNA BLOOM',
      genre: 'Melodic Techno Â· Progressive',
      theme: 'Ice & Futuristic',
      accentColor: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.35)',
      badgeClass: 'bg-sky-400 text-black font-bold',
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
      track: 'Aurora Borealis Journey',
      bpm: 126,
      proposal: 'Press Kit aberto pelo Warung (R$ 5.800)'
    },
    {
      id: 'nina',
      name: 'NINA ROXX',
      genre: 'Peak Time Techno Â· Hard Groove',
      theme: 'Raw & Industrial',
      accentColor: '#EF4444',
      glow: 'rgba(239, 68, 68, 0.35)',
      badgeClass: 'bg-red-500 text-white font-bold',
      photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      track: 'Industrial Warehouse Assault',
      bpm: 134,
      proposal: 'Novo show confirmado em GalpÃ£o BH'
    }
  ];

  // Auto-scroll carousel every 3.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % artists.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, artists.length]);

  const currentArtist = artists[activeIndex];
  const customName = djHandle && djHandle.trim() !== '' ? djHandle.toUpperCase() : currentArtist.name;
  const customSlug = djHandle && djHandle.trim() !== '' ? djHandle.toLowerCase().replace(/[^a-z0-9]/g, '') : currentArtist.id;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[500px] mx-auto flex flex-col items-center select-none relative"
    >
      {/* 1. Volumetric Glow Behind Stage */}
      <div 
        className="absolute -inset-6 rounded-full blur-3xl opacity-35 pointer-events-none transition-all duration-1000"
        style={{ background: currentArtist.glow }}
      />

      {/* 2. Top Carousel Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-3 shadow-lg z-10">
        {artists.map((artist, idx) => (
          <button
            key={artist.id}
            onClick={() => setActiveIndex(idx)}
            className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-all duration-300 ${
              activeIndex === idx
                ? `${artist.badgeClass} shadow-md scale-105`
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {artist.id}
          </button>
        ))}
      </div>

      {/* 3. Live Activity Ticker */}
      <div className="w-full mb-3 px-4 py-2 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl flex items-center justify-between gap-3 shadow-xl z-10 transition-all duration-500">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <span className="text-xs text-white/90 truncate font-medium">
            {currentArtist.proposal}
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-bold flex-shrink-0">
          AO VIVO
        </span>
      </div>

      {/* 4. Cinematic Auto-Rotating Showcase Card */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl backdrop-blur-2xl z-10">
        
        {/* Main Artist Stage Visual */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={currentArtist.photo}
            alt={currentArtist.name}
            fill
            priority
            className="object-cover object-center transition-transform duration-1000 scale-100 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Top Live Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>STAGE DIGITAL 2026</span>
          </div>

          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono">
            {currentArtist.theme}
          </div>

          {/* Bottom Card Content */}
          <div className="absolute bottom-4 left-4 right-4 space-y-3">
            
            <div className="space-y-0.5">
              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none drop-shadow-md">
                {customName}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light">
                {currentArtist.genre} Â· <span className="font-mono text-emerald-400 font-bold">{currentArtist.bpm} BPM</span>
              </p>
            </div>

            {/* Audio Waveform Interactive Bar */}
            <div className="p-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                </button>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    {currentArtist.track}
                  </span>
                  <span className="text-[10px] text-white/40 block font-mono">
                    Ãudio Master Hi-Fi
                  </span>
                </div>
              </div>

              {/* Animated Waveform */}
              <div className="flex items-center gap-1 h-5">
                {[30, 80, 55, 100, 70, 40, 90, 35, 65, 45].map((h, i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-full bg-emerald-400 animate-pulse transition-all"
                    style={{ 
                      height: `${h}%`,
                      animationDelay: `${i * 0.1}s` 
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Direct Claim CTA */}
            <button
              onClick={onClaim}
              className="w-full py-3 rounded-2xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 transition-all shadow-lg"
            >
              <span>Criar Perfil beatflow.me/{customSlug}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

        {/* Carousel Progress Dots */}
        <div className="py-2.5 bg-black/90 flex items-center justify-center gap-2 border-t border-white/10">
          {artists.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}