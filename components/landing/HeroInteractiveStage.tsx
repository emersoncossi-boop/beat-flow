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
  Volume2,
  ShieldCheck,
  QrCode,
  Share2,
  Send,
  Lock,
  ChevronRight,
  FileText,
  Music
} from 'lucide-react';

interface HeroInteractiveStageProps {
  djHandle: string;
  onClaim: () => void;
}

export function HeroInteractiveStage({ djHandle, onClaim }: HeroInteractiveStageProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'palco' | 'epk' | 'rider' | 'agenda'>('palco');

  const stages = [
    {
      id: 'camila',
      name: 'CAMILA',
      genre: 'Afro House \u00B7 Deep Tech',
      location: 'S\u00E3o Paulo, BR',
      setDuration: '120 min',
      accentColor: '#FFFFFF',
      glowColor: 'rgba(255, 255, 255, 0.25)',
      badgeClass: 'bg-white text-black font-extrabold',
      photo: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1200&auto=format&fit=crop',
      track: 'Midnight Ritual (Club Master)',
      bpm: 124,
      proposal: 'Proposta recebida: D-EDGE Club \u00B7 R$ 4.500',
      rider: '2x CDJ-3000 + DJM-A9',
      stageTag: 'NOIR & CHROME',
      bioSnippet: 'Arquiteta sonora com passagens pelos principais clubs underground de SP. Sets imersivos de alta press\u00E3o mel\u00F3dica.'
    },
    {
      id: 'sara',
      name: 'SARA',
      genre: 'Organic House \u00B7 Sunset Sessions',
      location: 'Florian\u00F3polis, BR',
      setDuration: '180 min',
      accentColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.35)',
      badgeClass: 'bg-amber-500 text-black font-extrabold',
      photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      track: 'Golden Horizon (Sunset Awakening)',
      bpm: 121,
      proposal: 'Data confirmada: Cafe de La Musique \u00B7 R$ 7.200',
      rider: '2x CDJ-3000 + Rotary Mixer',
      stageTag: 'SUNSET ORGANIC',
      bioSnippet: 'Conex\u00E3o org\u00E2nica entre percuss\u00F5es afro e sintetizadores anal\u00F3gicos. Presen\u00E7a confirmada nos ver\u00F5es de Ibiza e Tulum.'
    },
    {
      id: 'luna',
      name: 'LUNA BLOOM',
      genre: 'Melodic Techno \u00B7 Progressive',
      location: 'Curitiba, BR',
      setDuration: '90 min',
      accentColor: '#00D1FF',
      glowColor: 'rgba(0, 209, 255, 0.35)',
      badgeClass: 'bg-[#00D1FF] text-black font-extrabold',
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      track: 'Aurora Borealis (Holographic Master)',
      bpm: 126,
      proposal: 'Press Kit aberto por Warung Beach Club \u00B7 R$ 5.800',
      rider: '3x CDJ-3000 + DJM-V10',
      stageTag: 'ICE FUTURISTIC',
      bioSnippet: 'Cenografia sonora futurista e progress\u00F5es harm\u00F4nicas expansivas estilo Afterlife e Printworks.'
    },
    {
      id: 'nina',
      name: 'NINA ROXX',
      genre: 'Peak Time Techno \u00B7 Industrial',
      location: 'Belo Horizonte, BR',
      setDuration: '120 min',
      accentColor: '#EF4444',
      glowColor: 'rgba(239, 68, 68, 0.35)',
      badgeClass: 'bg-red-500 text-white font-extrabold',
      photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      track: 'Industrial Warehouse Assault',
      bpm: 134,
      proposal: 'Show fechado: Galp\u00E3o 54 \u00B7 R$ 6.200',
      rider: '4x CDJ-3000 + Ecler Warm4',
      stageTag: 'RAW WAREHOUSE',
      bioSnippet: 'Hard groove implac\u00E1vel, ritmos r\u00E1pidos e texturas industriais para hor\u00E1rios de pico em pistas exigentes.'
    }
  ];

  // Auto-rotation every 5s if not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % stages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, stages.length]);

  const current = stages[activeIndex] || stages[0];
  const customName = djHandle && djHandle.trim() !== '' ? djHandle.toUpperCase() : current.name;
  const customSlug = djHandle && djHandle.trim() !== '' ? djHandle.toLowerCase().replace(/[^a-z0-9]/g, '') : current.id;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[580px] mx-auto flex flex-col items-center select-none relative"
    >
      {/* 1. Volumetric Stage Ambient Glow */}
      <div 
        className="absolute -inset-8 rounded-[40px] blur-[120px] opacity-35 pointer-events-none transition-all duration-1000"
        style={{ background: current.glowColor }}
      />

      {/* 2. Top Scene Selector Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl mb-3.5 shadow-2xl z-20">
        {stages.map((stage, idx) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? `${stage.badgeClass} shadow-md scale-105`
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {stage.stageTag}
          </button>
        ))}
      </div>

      {/* 3. Live Contractor Activity Real-Time Ticker */}
      <div className="w-full mb-3 px-3.5 py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl flex items-center justify-between gap-2 shadow-xl z-20 transition-all">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <span className="text-[11px] text-white/90 truncate font-medium">
            {current.proposal}
          </span>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 font-bold flex-shrink-0 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
          AO VIVO
        </span>
      </div>

      {/* 4. REAL ARTIST PROFILE BROWSER STAGE MOCKUP (100% FAITHFUL TO ARTIST EXPERIENCE) */}
      <div 
        className="w-full rounded-3xl bg-[#090A10] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-20 overflow-hidden flex flex-col transition-all duration-700 backdrop-blur-2xl"
        style={{
          boxShadow: `0 20px 70px -10px ${current.glowColor}, 0 0 0 1px rgba(255,255,255,0.12)`
        }}
      >
        {/* Screen Chrome: Browser Address Bar */}
        <div className="h-8 px-4 bg-white/5 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/40 border border-white/10 text-white/70">
            <Lock className="w-2.5 h-2.5 text-emerald-400" />
            <span>beatflow.me/@{customSlug}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>STAGE PRO</span>
          </div>
        </div>

        {/* Spatial Command Bar (Exact Header from ArtistExperience) */}
        <div className="px-4 py-2.5 bg-black/40 border-b border-white/[0.06] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-[9px]">
              BF
            </div>
            <span className="text-[11px] font-bold tracking-tight text-white uppercase">{customName}</span>
          </div>

          {/* Quick Access Navigation Pills */}
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-white/60">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Palco</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5">EPK</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5">Rider</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5">Agenda</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-white flex items-center gap-1">
              <QrCode className="w-2.5 h-2.5" />
              <span>NFC</span>
            </button>
            <button 
              onClick={onClaim}
              className="px-3 py-1 rounded-full bg-white text-black font-extrabold text-[10px] uppercase hover:bg-white/90 transition shadow-sm"
            >
              Contratar
            </button>
          </div>
        </div>

        {/* Hero Stage Body (Exact 2-Column / Split Stage from ArtistExperience) */}
        <div className="p-4 sm:p-5 relative overflow-hidden bg-[#06070C]">
          
          {/* Volumetric Radial Light Aura */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[90px] opacity-25 pointer-events-none"
            style={{ background: current.accentColor }}
          />

          <div className="grid grid-cols-12 gap-4 items-center relative z-10">
            
            {/* Left Column (7 cols): Artist Identity, Specs & CTAs */}
            <div className="col-span-12 sm:col-span-7 space-y-3 text-left">
              
              {/* Availability & Location Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  TURN\u00CA 2026
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono">
                  {current.location}
                </span>
              </div>

              {/* Monumental Name */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase leading-none drop-shadow-xl">
                  {customName}
                </h3>
                <p className="text-xs text-[#00D1FF] font-mono mt-1 font-medium">
                  {current.genre}
                </p>
              </div>

              {/* Editorial Bio Snippet */}
              <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed font-light">
                {current.bioSnippet}
              </p>

              {/* Tech Metrics Mini Bar */}
              <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/10 text-[10px]">
                <div>
                  <span className="text-white/40 block font-mono text-[8px] uppercase">Cach\u00EA</span>
                  <span className="font-bold text-white text-[11px]">R$ 4.5k+</span>
                </div>
                <div className="border-x border-white/10 px-1.5">
                  <span className="text-white/40 block font-mono text-[8px] uppercase">BPM</span>
                  <span className="font-bold text-white text-[11px]">{current.bpm}</span>
                </div>
                <div>
                  <span className="text-white/40 block font-mono text-[8px] uppercase">Rider</span>
                  <span className="font-bold text-emerald-400 text-[11px] flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> OK
                  </span>
                </div>
              </div>

              {/* Stage Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white text-black font-extrabold text-[11px] flex items-center justify-center gap-1.5 hover:bg-white/90 transition active:scale-95 shadow-lg cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-black" /> : <Play className="w-3 h-3 fill-black" />}
                  <span>{isPlaying ? 'Pausar Set' : 'Ouvir Set Oficial'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClaim}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-[11px] transition active:scale-95 cursor-pointer"
                >
                  Solicitar Show
                </button>
              </div>

            </div>

            {/* Right Column (5 cols): 4K Artist Stage Photo with Parallax Glow */}
            <div className="col-span-12 sm:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group/photo">
                <Image
                  src={current.photo}
                  alt={current.name}
                  fill
                  sizes="260px"
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover/photo:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Floating Cue Point Badge */}
                <div className="absolute bottom-2 left-2 right-2 p-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-between text-[9px] font-mono text-white/80">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Drop 4:15
                  </span>
                  <span>124 BPM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Master Audio Player Bar (Exact Player from ArtistExperience) */}
          <div className="mt-3.5 p-2.5 rounded-xl bg-black/80 backdrop-blur-xl border border-white/15 flex items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition flex-shrink-0 cursor-pointer shadow-md"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
              </button>
              <div className="min-w-0 text-left">
                <div className="text-[11px] font-bold text-white truncate">
                  {current.track}
                </div>
                <div className="text-[9px] font-mono text-white/50">
                  Master Hi-Fi \u00B7 320kbps
                </div>
              </div>
            </div>

            {/* Dynamic Equalizer Waveform */}
            <div className="flex items-end gap-0.5 h-4 px-1 shrink-0">
              {[25, 75, 45, 95, 60, 35, 85, 30, 70, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${h}%` : '20%',
                    backgroundColor: current.accentColor,
                    opacity: isPlaying ? 1 : 0.4
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Module Bar (The 5 Core Modules of Beat Flow) */}
          <div className="mt-2.5 pt-2 border-t border-white/[0.08] grid grid-cols-5 gap-1 text-[8px] font-mono text-center text-white/40 uppercase tracking-widest">
            <div className="py-1 rounded bg-white/5 text-white/80 font-bold">01 OUVIR</div>
            <div className="py-1 rounded bg-white/[0.02] hover:bg-white/5">02 AGENDA</div>
            <div className="py-1 rounded bg-white/[0.02] hover:bg-white/5">03 SOBRE</div>
            <div className="py-1 rounded bg-white/[0.02] hover:bg-white/5">04 EPK</div>
            <div className="py-1 rounded bg-white/[0.02] hover:bg-white/5">05 RIDER</div>
          </div>

        </div>

        {/* Action Claim Footer */}
        <div className="p-3 bg-[#08090F] border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-left text-[11px]">
            <span className="text-white font-bold block">Quer um palco id\u00EAntico a este?</span>
            <span className="text-white/40 text-[10px] font-mono">Pronto em 2 minutos sem c\u00F3digo</span>
          </div>
          <button
            type="button"
            onClick={onClaim}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#8A3FFC] text-black font-extrabold text-xs flex items-center gap-1.5 hover:opacity-95 active:scale-95 transition shadow-lg cursor-pointer"
          >
            <span>Ativar Meu Palco</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 5. Bottom Carousel Indicators */}
      <div className="pt-3 flex items-center justify-center gap-2">
        {stages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

    </div>
  );
}