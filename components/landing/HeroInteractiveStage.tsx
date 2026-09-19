'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Play, 
  Pause, 
  Sparkles, 
  ArrowRight,
  Disc3,
  Flame,
  Zap,
  CheckCircle2,
  Calendar,
  Radio,
  Sliders,
  Volume2
} from 'lucide-react';

interface HeroInteractiveStageProps {
  djHandle: string;
  onClaim: () => void;
}

export function HeroInteractiveStage({ djHandle, onClaim }: HeroInteractiveStageProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const stages = [
    {
      id: 'camila',
      name: 'CAMILA',
      genre: 'Afro House Â· Deep Tech',
      themeTitle: 'Noir & Chrome Experience',
      accentColor: '#FFFFFF',
      glowColor: 'rgba(255, 255, 255, 0.35)',
      badgeClass: 'bg-white text-black font-extrabold',
      photo: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1200&auto=format&fit=crop',
      track: 'Midnight Ritual (Club Master)',
      bpm: 124,
      proposal: 'Proposta recebida: D-EDGE Club Â· R$ 4.500',
      rider: '2x CDJ-3000 + DJM-A9',
      stageTag: 'PALCO DIGITAL NOIR'
    },
    {
      id: 'sara',
      name: 'SARA',
      genre: 'Organic House Â· Sunset Sessions',
      themeTitle: 'Sunset & Organic Glow',
      accentColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      badgeClass: 'bg-amber-500 text-black font-extrabold',
      photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      track: 'Golden Horizon (Sunset Awakening)',
      bpm: 121,
      proposal: 'Data confirmada: FlorianÃ³polis Â· R$ 7.200',
      rider: '2x CDJ-3000 + Rotary Mixer',
      stageTag: 'SUNSET SESSIONS 2026'
    },
    {
      id: 'luna',
      name: 'LUNA BLOOM',
      genre: 'Melodic Techno Â· Progressive',
      themeTitle: 'Ice & Futuristic Aurora',
      accentColor: '#38BDF8',
      glowColor: 'rgba(56, 189, 248, 0.45)',
      badgeClass: 'bg-sky-400 text-black font-extrabold',
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      track: 'Aurora Borealis (Holographic Journey)',
      bpm: 126,
      proposal: 'Press Kit aberto pelo Warung Â· R$ 5.800',
      rider: '3x CDJ-3000 + DJM-V10',
      stageTag: 'MAINSTAGE HOLOGRÃFICO'
    },
    {
      id: 'nina',
      name: 'NINA ROXX',
      genre: 'Peak Time Techno Â· Hard Groove',
      themeTitle: 'Raw & Industrial Warehouse',
      accentColor: '#EF4444',
      glowColor: 'rgba(239, 68, 68, 0.45)',
      badgeClass: 'bg-red-500 text-white font-extrabold',
      photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      track: 'Industrial Warehouse Assault',
      bpm: 134,
      proposal: 'Show fechado: GalpÃ£o BH Â· R$ 6.200',
      rider: '4x CDJ-3000 + Ecler Warm4',
      stageTag: 'UNDERGROUND WAREHOUSE'
    }
  ];

  // Auto-scroll cinematic carousel every 4.0s
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % stages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, stages.length]);

  const current = stages[activeIndex] || stages[0];
  const customName = djHandle && djHandle.trim() !== '' ? djHandle.toUpperCase() : current.name;
  const customSlug = djHandle && djHandle.trim() !== '' ? djHandle.toLowerCase().replace(/[^a-z0-9]/g, '') : current.id;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[540px] mx-auto flex flex-col items-center select-none relative"
    >
      {/* 1. Volumetric Stage Ambient Light Diffusion */}
      <div 
        className="absolute -inset-10 rounded-full blur-[130px] opacity-30 pointer-events-none transition-all duration-1000"
        style={{ background: current.glowColor }}
      />

      {/* 2. Top Universe Selector Navigation Pills */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl mb-4 shadow-2xl z-20">
        {stages.map((stage, idx) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? `${stage.badgeClass} shadow-lg scale-105`
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {stage.id}
          </button>
        ))}
      </div>

      {/* 3. Live Activity Real-Time Notification Ticker */}
      <div className="w-full mb-3 px-4 py-2.5 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl flex items-center justify-between gap-3 shadow-xl z-20 transition-all duration-500">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <span className="text-xs text-white/90 truncate font-medium">
            {current.proposal}
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-bold flex-shrink-0 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
          AO VIVO
        </span>
      </div>

      {/* 4. Luxury Cinematic Studio Showcase Card (Apple Studio / Concert Stage Edition) */}
      <div 
        className="relative w-full rounded-[36px] p-2.5 sm:p-3 bg-gradient-to-b from-white/15 via-white/5 to-white/[0.02] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-20 transition-all duration-700 backdrop-blur-2xl"
        style={{
          boxShadow: `0 25px 80px -15px ${current.glowColor}, 0 0 0 1px rgba(255,255,255,0.15)`
        }}
      >
        <div className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden bg-black border border-white/10 flex flex-col justify-between">
          
          {/* Main Stage Performance Photography */}
          <div className="absolute inset-0">
            <Image
              src={current.photo}
              alt={current.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 540px"
              className="object-cover object-center transition-all duration-1000 scale-100 hover:scale-105"
            />
            {/* Cinematic Gradient Overlays: Top and Bottom for maximum contrast and elegance */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
          </div>

          {/* Top Stage Badges */}
          <div className="relative z-30 p-4 sm:p-5 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: current.accentColor }} />
              <span>{current.stageTag}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>{current.bpm} BPM</span>
            </div>
          </div>

          {/* Bottom Stage Info & Master Audio Player */}
          <div className="relative z-30 p-4 sm:p-5 space-y-3">
            
            {/* Artist Branding Title */}
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none drop-shadow-xl">
                  {customName}
                </h3>
                <CheckCircle2 className="w-5 h-5 text-[#00D1FF] shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-white/90 font-light flex items-center gap-2">
                <span>{current.genre}</span>
                <span className="text-white/40">â€¢</span>
                <span className="font-mono text-xs text-white/70">{current.rider}</span>
              </p>
            </div>

            {/* Master Hi-Fi Audio Player */}
            <div className="p-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 flex items-center justify-between gap-3 shadow-2xl">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0 shadow-lg cursor-pointer"
                  aria-label="Tocar prÃ©via"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                </button>
                <div className="min-w-0 text-left">
                  <span className="text-xs sm:text-sm font-bold text-white block truncate">
                    {current.track}
                  </span>
                  <span className="text-[10px] text-white/50 block font-mono">
                    Master Ãudio Hi-Fi Â· 320kbps
                  </span>
                </div>
              </div>

              {/* Dynamic 10-Band Waveform Equalizer */}
              <div className="flex items-center gap-1 h-5 px-1 shrink-0">
                {[35, 80, 50, 100, 65, 40, 90, 30, 75, 45].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-300"
                    style={{ 
                      height: isPlaying ? `${h}%` : '25%',
                      backgroundColor: current.accentColor,
                      opacity: isPlaying ? 1 : 0.4
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Direct Action Button */}
            <button
              type="button"
              onClick={onClaim}
              className="w-full py-3.5 rounded-2xl bg-white text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-white/95 active:scale-95 transition-all shadow-2xl cursor-pointer"
            >
              <span>Ativar Palco beatflow.me/{customSlug}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* 5. Bottom Carousel Progress Bar Indicators */}
        <div className="pt-3 pb-1 flex items-center justify-center gap-2">
          {stages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-10 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}