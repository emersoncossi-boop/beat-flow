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
  QrCode
} from 'lucide-react';

interface HeroInteractiveStageProps {
  djHandle: string;
  onClaim: () => void;
}

export function HeroInteractiveStage({ djHandle, onClaim }: HeroInteractiveStageProps) {
  const [activeTheme, setActiveTheme] = useState<'noir' | 'sunset' | 'ice' | 'raw'>('noir');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [liveTickerIndex, setLiveTickerIndex] = useState<number>(0);

  const tickerEvents = [
    { text: "DJ Camila recebeu proposta para D-EDGE Club", fee: "R$ 4.500", time: "HÃ¡ 4 min" },
    { text: "DJ Sara confirmou data em FlorianÃ³polis", fee: "R$ 7.200", time: "HÃ¡ 12 min" },
    { text: "DJ Luna Bloom teve o Press Kit aberto por Warung", fee: "R$ 5.800", time: "HÃ¡ 18 min" },
    { text: "@djvictor acabou de registrar seu perfil oficial", fee: "Novo Artista", time: "Agora" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTickerIndex(prev => (prev + 1) % tickerEvents.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const themeStyles = {
    noir: {
      accent: '#E2E8F0',
      accentBg: 'bg-white',
      accentText: 'text-black',
      glow: 'rgba(226, 232, 240, 0.25)',
      badge: 'Dark Club / Chrome',
      photo: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800',
      genre: 'Afro House Â· Deep House'
    },
    sunset: {
      accent: '#F59E0B',
      accentBg: 'bg-amber-500',
      accentText: 'text-black',
      glow: 'rgba(245, 158, 11, 0.3)',
      badge: 'Sunset / Organic',
      photo: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
      genre: 'Organic House Â· Melodic Afro'
    },
    ice: {
      accent: '#38BDF8',
      accentBg: 'bg-sky-400',
      accentText: 'text-black',
      glow: 'rgba(56, 189, 248, 0.3)',
      badge: 'Ice / Futuristic',
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
      genre: 'Melodic Techno Â· Progressive'
    },
    raw: {
      accent: '#EF4444',
      accentBg: 'bg-red-500',
      accentText: 'text-white',
      glow: 'rgba(239, 68, 68, 0.3)',
      badge: 'Raw / Industrial',
      photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800',
      genre: 'Peak Time Techno Â· Hard Groove'
    }
  };

  const currentTheme = themeStyles[activeTheme];
  const displayName = djHandle && djHandle.trim() !== '' ? djHandle.toUpperCase() : 'SEU NOME';
  const displaySlug = djHandle && djHandle.trim() !== '' ? djHandle.toLowerCase().replace(/[^a-z0-9]/g, '') : 'nomedodj';

  return (
    <div className="w-full max-w-[480px] mx-auto flex flex-col items-center select-none">
      
      {/* 1. Theme Atmosphere Switcher Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-lg">
        {(['noir', 'sunset', 'ice', 'raw'] as const).map(themeKey => (
          <button
            key={themeKey}
            onClick={() => setActiveTheme(themeKey)}
            className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-all duration-300 ${
              activeTheme === themeKey
                ? `${themeStyles[themeKey].accentBg} ${themeStyles[themeKey].accentText} font-bold shadow-md`
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {themeKey}
          </button>
        ))}
      </div>

      {/* 2. Floating Live Activity Social Proof Ticker */}
      <div className="w-full mb-3 px-4 py-2 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl flex items-center justify-between gap-3 shadow-xl transition-all duration-500">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <span className="text-xs text-white/80 truncate">
            {tickerEvents[liveTickerIndex].text}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 font-mono text-xs">
          <span className="text-emerald-400 font-bold">{tickerEvents[liveTickerIndex].fee}</span>
          <span className="text-white/30 text-[10px]">{tickerEvents[liveTickerIndex].time}</span>
        </div>
      </div>

      {/* 3. High-End 3D Smartphone Device Container */}
      <div 
        className="relative w-full aspect-[9/17] max-w-[340px] rounded-[44px] p-3.5 bg-neutral-950 border-[3px] border-neutral-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-500"
        style={{
          boxShadow: `0 20px 80px -10px ${currentTheme.glow}, 0 0 0 1px rgba(255,255,255,0.1)`
        }}
      >
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black border border-white/10 z-30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-950/80 mr-4 border border-blue-500/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Screen Content */}
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[#07090E] border border-white/10 flex flex-col justify-between p-4 text-white">
          
          {/* Top Hero Photo & Identity */}
          <div className="relative w-full h-[52%] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={currentTheme.photo}
              alt="DJ Preview"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-black/40" />

            {/* Live Playing Tag */}
            <div className="absolute top-7 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>STAGE LIVE</span>
            </div>

            {/* Theme Badge */}
            <div className="absolute top-7 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono">
              {currentTheme.badge}
            </div>

            {/* Bottom Artist Tag inside Hero */}
            <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
              <h3 className="text-2xl font-black tracking-tight text-white uppercase leading-none drop-shadow-md">
                {displayName}
              </h3>
              <p className="text-[11px] text-white/80 font-light truncate">
                {currentTheme.genre}
              </p>
            </div>
          </div>

          {/* Interactive Mini-Player Bar */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
              </button>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[11px] font-bold text-white block truncate">
                  Extended Set 2026
                </span>
                <span className="text-[10px] text-white/40 block font-mono">
                  126 BPM Â· Hi-Fi Audio
                </span>
              </div>
            </div>

            {/* Waveform Animation Bars */}
            <div className="flex items-center gap-0.5 h-4">
              {[40, 90, 60, 100, 75, 45, 85, 30].map((h, i) => (
                <div
                  key={i}
                  className={`w-0.5 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'
                  }`}
                  style={{ height: isPlaying ? `${h}%` : '25%' }}
                />
              ))}
            </div>
          </div>

          {/* Key Quick Specs Pills */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/70">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rider CDJ-3000</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-blue-400" />
              <span>Pass NFC Ativo</span>
            </div>
          </div>

          {/* Claim Call to Action inside Smartphone */}
          <button
            onClick={onClaim}
            className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-white/90 active:scale-95 transition-all shadow-lg"
          >
            <span>Garantir beatflow.me/{displaySlug}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

    </div>
  );
}