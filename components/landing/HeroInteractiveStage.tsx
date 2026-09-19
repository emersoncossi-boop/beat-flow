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
      genre: 'Afro House · Deep Tech',
      location: 'São Paulo, SP',
      setDuration: '120 min',
      accentColor: '#FFFFFF',
      glowColor: 'rgba(255, 255, 255, 0.15)',
      badgeClass: 'bg-white text-black font-semibold',
      photo: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1200&auto=format&fit=crop',
      track: 'Midnight Ritual (Club Master)',
      bpm: 124,
      proposal: 'Proposta recebida: D-EDGE Club · R$ 4.500',
      rider: '2x CDJ-3000 + DJM-A9',
      stageTag: 'Camila · Afro House',
      bioSnippet: 'Arquiteta sonora com passagens pelos principais clubs underground de SP. Sets imersivos com alta pressão rítmica.'
    },
    {
      id: 'sara',
      name: 'SARA',
      genre: 'Organic House · Sunset Sessions',
      location: 'Florianópolis, SC',
      setDuration: '180 min',
      accentColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.2)',
      badgeClass: 'bg-zinc-200 text-black font-semibold',
      photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      track: 'Golden Horizon (Sunset Awakening)',
      bpm: 121,
      proposal: 'Data confirmada: Cafe de La Musique · R$ 7.200',
      rider: '2x CDJ-3000 + Rotary Mixer',
      stageTag: 'Sara · Organic House',
      bioSnippet: 'Conexão orgânica entre percussões afro e sintetizadores analógicos nos verões de Ibiza e Tulum.'
    },
    {
      id: 'luna',
      name: 'LUNA BLOOM',
      genre: 'Melodic Techno · Progressive',
      location: 'Curitiba, PR',
      setDuration: '90 min',
      accentColor: '#00D1FF',
      glowColor: 'rgba(0, 209, 255, 0.2)',
      badgeClass: 'bg-zinc-200 text-black font-semibold',
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      track: 'Aurora Borealis (Melodic Cut)',
      bpm: 126,
      proposal: 'Press Kit aberto por Warung Beach Club · R$ 5.800',
      rider: '3x CDJ-3000 + DJM-V10',
      stageTag: 'Luna · Melodic Techno',
      bioSnippet: 'Cenografia sonora futurista e progressões harmônicas expansivas com assinatura própria de pista.'
    },
    {
      id: 'nina',
      name: 'NINA ROXX',
      genre: 'Peak Time Techno · Industrial',
      location: 'Belo Horizonte, MG',
      setDuration: '120 min',
      accentColor: '#EF4444',
      glowColor: 'rgba(239, 68, 68, 0.2)',
      badgeClass: 'bg-zinc-200 text-black font-semibold',
      photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      track: 'Industrial Warehouse Assault',
      bpm: 134,
      proposal: 'Show fechado: Galpão 54 · R$ 6.200',
      rider: '4x CDJ-3000 + Ecler Warm4',
      stageTag: 'Nina · Peak Time',
      bioSnippet: 'Hard groove implacável, ritmos rápidos e texturas industriais para horários de pico em pistas exigentes.'
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
      <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-2.5 shadow-sm z-20 max-w-full overflow-x-auto no-scrollbar">
        {stages.map((stage, idx) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
              activeIndex === idx
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {stage.name}
          </button>
        ))}
      </div>

      {/* 3. Editorial Booking Status Note */}
      <div className="w-full mb-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex items-center justify-between gap-2 shadow-sm z-20 transition-all">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[11px] text-zinc-300 truncate font-mono">
            {current.proposal}
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 shrink-0">
          Sincronizado
        </span>
      </div>

      {/* 4. REAL ARTIST PROFILE BROWSER STAGE MOCKUP (EDITORIAL LAYOUT) */}
      <div 
        className="w-full rounded-2xl bg-[#08090E] border border-white/10 shadow-2xl z-20 overflow-hidden flex flex-col transition-all duration-500 backdrop-blur-2xl"
        style={{
          boxShadow: `0 16px 50px -10px ${current.glowColor}, 0 0 0 1px rgba(255,255,255,0.08)`
        }}
      >
        {/* Screen Chrome: Clean Editorial URL Bar */}
        <div className="h-8 px-3.5 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-300">
            <Lock className="w-2.5 h-2.5 text-zinc-400" />
            <span>beatflow.me/@{customSlug}</span>
          </div>

          <div className="text-[10px] font-mono text-zinc-500">
            OFICIAL
          </div>
        </div>

        {/* Spatial Header Bar */}
        <div className="px-3.5 py-2 bg-black/40 border-b border-white/[0.04] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-[9px]">
              BF
            </div>
            <span className="text-[11px] font-bold tracking-tight text-white uppercase">{customName}</span>
          </div>

          {/* Quick Access Navigation */}
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-medium">Palco</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5">EPK</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5">Rider</span>
            <span className="px-2 py-0.5 rounded hover:bg-white/5">Agenda</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              type="button"
              onClick={onClaim}
              className="px-3 py-1 rounded-full bg-white text-black font-bold text-[10px] uppercase hover:bg-zinc-200 transition shadow-sm cursor-pointer"
            >
              Contratar
            </button>
          </div>
        </div>

        {/* Hero Stage Body with Responsive CSS Grid (Single Column on Mobile, Compact Image) */}
        <div className="p-3.5 sm:p-5 relative overflow-hidden bg-[#06070B]">
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-5 items-center relative z-10">
            
            {/* Artist Stage Photo (Compact Aspect on Mobile, Widescreen Banner to save vertical height) */}
            <div className="order-1 sm:order-2 sm:col-span-5 relative">
              <div className="relative aspect-[16/9] sm:aspect-[3/4] max-h-[140px] sm:max-h-[250px] w-full rounded-xl overflow-hidden border border-white/10 shadow-lg group/photo">
                <Image
                  src={current.photo}
                  alt={current.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover/photo:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Cue Point Badge */}
                <div className="absolute bottom-2 left-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-[9px] font-mono text-zinc-300">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Drop 4:15
                  </span>
                  <span>{current.bpm} BPM</span>
                </div>
              </div>
            </div>

            {/* Left Column: Artist Identity, Editorial Specs & CTAs */}
            <div className="order-2 sm:order-1 sm:col-span-7 space-y-2.5 text-left">
              
              {/* Availability & Location Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Turnê 2026
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 text-[10px] font-mono">
                  {current.location}
                </span>
              </div>

              {/* Artist Name & Genre */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase leading-tight">
                  {customName}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  {current.genre}
                </p>
              </div>

              {/* Editorial Bio Snippet */}
              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-light">
                {current.bioSnippet}
              </p>

              {/* Tech Metrics Mini Bar */}
              <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[10px]">
                <div>
                  <span className="text-zinc-500 block font-mono text-[8px] uppercase">Cachê Base</span>
                  <span className="font-bold text-white text-[11px]">R$ 4.5k+</span>
                </div>
                <div className="border-x border-white/[0.06] px-1.5">
                  <span className="text-zinc-500 block font-mono text-[8px] uppercase">Tempo de Set</span>
                  <span className="font-bold text-white text-[11px]">{current.setDuration}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[8px] uppercase">Rider</span>
                  <span className="font-bold text-emerald-400 text-[11px] flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> Aprovado
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white text-black font-bold text-[11px] flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition active:scale-95 shadow-sm cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-black" /> : <Play className="w-3 h-3 fill-black" />}
                  <span>{isPlaying ? 'Pausar Set' : 'Ouvir Set Oficial'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClaim}
                  className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-[11px] transition active:scale-95 cursor-pointer"
                >
                  Solicitar Data
                </button>
              </div>

            </div>

          </div>

          {/* Master Audio Player Bar */}
          <div className="mt-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition shrink-0 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3 h-3 fill-black" /> : <Play className="w-3 h-3 fill-black ml-0.5" />}
              </button>
              <div className="min-w-0 text-left">
                <div className="text-[11px] font-semibold text-white truncate">
                  {current.track}
                </div>
                <div className="text-[9px] font-mono text-zinc-500">
                  Master Hi-Fi · 320kbps
                </div>
              </div>
            </div>

            {/* Subtle Equalizer Waveform */}
            <div className="flex items-end gap-0.5 h-3.5 px-1 shrink-0">
              {[25, 65, 40, 85, 55, 30, 75, 25, 60, 35].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${h}%` : '20%',
                    backgroundColor: '#FFFFFF',
                    opacity: isPlaying ? 0.9 : 0.25
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Module Bar */}
          <div className="mt-2.5 pt-2 border-t border-white/[0.06] grid grid-cols-5 gap-1 text-[8px] font-mono text-center text-zinc-500 uppercase tracking-wider">
            <div className="py-1 rounded bg-white/[0.04] text-zinc-200 font-medium">01 OUVIR</div>
            <div className="py-1 rounded">02 AGENDA</div>
            <div className="py-1 rounded">03 SOBRE</div>
            <div className="py-1 rounded">04 EPK</div>
            <div className="py-1 rounded">05 RIDER</div>
          </div>

        </div>

        {/* Action Claim Footer */}
        <div className="p-2.5 sm:p-3 bg-[#07080D] border-t border-white/[0.08] flex items-center justify-between gap-3">
          <div className="text-left text-[11px]">
            <span className="text-zinc-200 font-semibold block">Perfil oficial Beat Flow</span>
            <span className="text-zinc-500 text-[10px] font-mono">Disponível para reservas</span>
          </div>
          <button
            type="button"
            onClick={onClaim}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm cursor-pointer"
          >
            <span>Reivindicar Link</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 5. Bottom Carousel Indicators */}
      <div className="pt-2.5 flex items-center justify-center gap-1.5">
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