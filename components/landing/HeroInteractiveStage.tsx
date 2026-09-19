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
  Sliders
} from 'lucide-react';
import { AiCosmicAtmosphereCanvas } from './AiCosmicAtmosphereCanvas';

interface HeroInteractiveStageProps {
  djHandle: string;
  onClaim: () => void;
}

export function HeroInteractiveStage({ djHandle, onClaim }: HeroInteractiveStageProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const universes = [
    {
      id: 'camila',
      name: 'CAMILA',
      genre: 'Afro House Â· Deep Space',
      themeTitle: 'Obsidian Eclipse',
      primaryColor: '#E2E8F0',
      secondaryColor: '#64748B',
      glowColor: '#94A3B8',
      moonType: 'eclipse' as const,
      badgeClass: 'bg-white text-black font-bold',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      track: 'Midnight Ritual (Cosmic Cut)',
      bpm: 124,
      proposal: 'Proposta recebida: D-EDGE Club (R$ 4.500)',
      stageLighting: 'Lasers Prata & Eclipse Negro'
    },
    {
      id: 'sara',
      name: 'SARA',
      genre: 'Organic House Â· Sunset Sessions',
      themeTitle: 'Golden Solar Corona',
      primaryColor: '#F59E0B',
      secondaryColor: '#D97706',
      glowColor: '#FBBF24',
      moonType: 'crescent' as const,
      badgeClass: 'bg-amber-500 text-black font-bold',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
      track: 'Golden Horizon (Sunset Awakening)',
      bpm: 121,
      proposal: 'Confirmou data em FlorianÃ³polis (R$ 7.200)',
      stageLighting: 'Flares Dourados & Poeira CÃ³smica'
    },
    {
      id: 'luna',
      name: 'LUNA BLOOM',
      genre: 'Melodic Techno Â· Progressive',
      themeTitle: 'Neon Aurora Pulsar',
      primaryColor: '#38BDF8',
      secondaryColor: '#0284C7',
      glowColor: '#00D1FF',
      moonType: 'full' as const,
      badgeClass: 'bg-sky-400 text-black font-bold',
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
      track: 'Aurora Borealis (Holographic Journey)',
      bpm: 126,
      proposal: 'Warung abriu Press Kit (R$ 5.800)',
      stageLighting: 'Luz Boreal & AnÃ©is QuÃ¢nticos'
    },
    {
      id: 'nina',
      name: 'NINA ROXX',
      genre: 'Peak Time Techno Â· Hard Groove',
      themeTitle: 'Crimson Supernova',
      primaryColor: '#EF4444',
      secondaryColor: '#B91C1C',
      glowColor: '#F87171',
      moonType: 'supernova' as const,
      badgeClass: 'bg-red-500 text-white font-bold',
      photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      track: 'Industrial Warehouse Assault',
      bpm: 134,
      proposal: 'Show confirmado em GalpÃ£o BH (R$ 6.200)',
      stageLighting: 'Strobe Vermelho & Matriz Industrial'
    }
  ];

  // Auto-scroll cinematic carousel every 4.5s
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % universes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, universes.length]);

  const current = universes[activeIndex] || universes[0];
  const customName = djHandle && djHandle.trim() !== '' ? djHandle.toUpperCase() : current.name;
  const customSlug = djHandle && djHandle.trim() !== '' ? djHandle.toLowerCase().replace(/[^a-z0-9]/g, '') : current.id;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[480px] sm:max-w-[520px] mx-auto flex flex-col items-center select-none relative"
    >
      {/* 1. Volumetric Atmosphere Backlight Diffusion */}
      <div 
        className="absolute -inset-10 rounded-full blur-[110px] opacity-35 pointer-events-none transition-all duration-1000"
        style={{ background: current.glowColor }}
      />

      {/* 2. Top Universe Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl mb-4 shadow-2xl z-20">
        {universes.map((uni, idx) => (
          <button
            key={uni.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              activeIndex === idx
                ? `${uni.badgeClass} shadow-lg scale-105`
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {uni.id}
          </button>
        ))}
      </div>

      {/* 3. Live Activity Ticker */}
      <div className="w-full mb-3 px-4 py-2.5 rounded-2xl bg-black/75 border border-white/10 backdrop-blur-xl flex items-center justify-between gap-3 shadow-xl z-20 transition-all duration-500">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <span className="text-xs text-white/90 truncate font-medium">
            {current.proposal}
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-bold flex-shrink-0">
          AO VIVO
        </span>
      </div>

      {/* 4. Luxury Titanium Smartphone Stage Container */}
      <div className="relative w-full rounded-[44px] sm:rounded-[48px] p-3 sm:p-3.5 bg-gradient-to-b from-[#2A2D35] via-[#15171C] to-[#0D0E12] border-2 border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-20">
        
        {/* Smartphone Chassis Screen Bezel */}
        <div className="relative w-full aspect-[9/17] rounded-[36px] sm:rounded-[40px] overflow-hidden bg-black border border-white/10 shadow-inner flex flex-col justify-between">
          
          {/* A. Procedural AI Generative Celestial Canvas Layer (Deep Space, Unique Moon & Nebula) */}
          <AiCosmicAtmosphereCanvas
            themeId={current.id}
            primaryColor={current.primaryColor}
            secondaryColor={current.secondaryColor}
            glowColor={current.glowColor}
            moonType={current.moonType}
            bpm={current.bpm}
          />

          {/* B. DJ Cutout / High-End Protagonist Photography */}
          <div className="absolute inset-x-0 bottom-0 top-12 flex items-end justify-center pointer-events-none">
            <div className="relative w-full h-[88%]">
              <Image
                src={current.photo}
                alt={current.name}
                fill
                priority
                className="object-cover object-top transition-transform duration-1000 scale-100"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              {/* Cinematic Vignette & Bottom Stage Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* C. Smartphone Top Notch / Dynamic Island */}
          <div className="relative z-30 pt-3 px-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: current.primaryColor }} />
              <span>AI ATMOSPHERE ENGINE</span>
            </div>
            
            {/* Dynamic Island pill */}
            <div className="w-20 h-4 rounded-full bg-black border border-white/10 shadow-sm flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white/20 mr-2" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>

            <div className="text-[10px] font-mono font-bold text-white/60">
              {current.bpm} BPM
            </div>
          </div>

          {/* D. Stage Lighting Pill */}
          <div className="relative z-30 px-5 pt-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90">
              <Sparkles className="w-3 h-3" style={{ color: current.primaryColor }} />
              <span>{current.themeTitle}</span>
            </div>
          </div>

          {/* E. Smartphone Stage Bottom Overlay (DJ Info + Audio Master Player + Instant Claim) */}
          <div className="relative z-30 p-4 sm:p-5 space-y-2.5">
            
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
                  {customName}
                </h3>
                <CheckCircle2 className="w-4 h-4 text-[#00D1FF]" />
              </div>
              <p className="text-xs text-white/80 font-light truncate">
                {current.genre}
              </p>
            </div>

            {/* Live Master Audio Player */}
            <div className="p-2.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 flex items-center justify-between gap-2.5 shadow-xl">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0 shadow-md"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
                </button>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    {current.track}
                  </span>
                  <span className="text-[10px] text-white/50 block font-mono">
                    Master Ãudio Hi-Fi 320kbps
                  </span>
                </div>
              </div>

              {/* Dynamic Waveform Visualizer */}
              <div className="flex items-center gap-0.5 h-4 px-1">
                {[35, 80, 50, 100, 65, 40, 90, 30, 75, 45].map((h, i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-full transition-all"
                    style={{ 
                      height: isPlaying ? `${h}%` : '25%',
                      backgroundColor: current.primaryColor,
                      opacity: isPlaying ? 1 : 0.4
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Action CTA Button inside phone */}
            <button
              type="button"
              onClick={onClaim}
              className="w-full py-3 rounded-2xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 transition-all shadow-xl cursor-pointer"
            >
              <span>Ativar Palco beatflow.me/{customSlug}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

        {/* 5. Bottom Carousel Progress Bar Indicators */}
        <div className="pt-3 pb-1 flex items-center justify-center gap-2">
          {universes.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}