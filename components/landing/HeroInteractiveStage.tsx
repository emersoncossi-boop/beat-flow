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
  ArrowRight
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
    { text: "DJ Camila recebeu proposta para D-EDGE Club", fee: "R$ 4.500", time: "Há 4 min" },
    { text: "DJ Sara confirmou data em Florianópolis", fee: "R$ 7.200", time: "Há 12 min" },
    { text: "DJ Luna Bloom teve o Press Kit aberto por Warung", fee: "R$ 5.800", time: "Há 18 min" },
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
      genre: 'Afro House · Deep House'
    },
    sunset: {
      accent: '#F59E0B',
      accentBg: 'bg-amber-500',
      accentText: 'text-black',
      glow: 'rgba(245, 158, 11, 0.3)',
      badge: 'Sunset / Organic',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800',
      genre: 'Organic House · Downtempo'
    },
    ice: {
      accent: '#00D1FF',
      accentBg: 'bg-[#00D1FF]',
      accentText: 'text-black',
      glow: 'rgba(0, 209, 255, 0.3)',
      badge: 'Ice / Futuristic',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800',
      genre: 'Melodic Techno · Progressive'
    },
    raw: {
      accent: '#A3E635',
      accentBg: 'bg-lime-400',
      accentText: 'text-black',
      glow: 'rgba(163, 230, 53, 0.3)',
      badge: 'Raw / Industrial',
      photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800',
      genre: 'Peak Time · Hard Groove'
    }
  };

  const current = themeStyles[activeTheme];
  const displayName = djHandle.trim() ? djHandle.trim() : "seunome";

  return (
    <div className="relative w-full max-w-[420px] mx-auto [perspective:1200px]">
      
      {/* Floating Dynamic Social Proof Ticker */}
      <div className="absolute -top-12 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-xl shadow-2xl text-[11px] font-medium text-white transition-all duration-500 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300">{tickerEvents[liveTickerIndex].text}</span>
          <span className="font-mono text-emerald-400 font-bold">({tickerEvents[liveTickerIndex].fee})</span>
        </div>
      </div>

      {/* Preset Switcher Pills */}
      <div className="flex items-center justify-center gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800 mb-4 backdrop-blur-md">
        {(['noir', 'sunset', 'ice', 'raw'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTheme(t)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTheme === t 
                ? `${themeStyles[t].accentBg} ${themeStyles[t].accentText} shadow-md` 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 3D Glass Phone Device Container */}
      <div 
        className="relative rounded-[36px] p-3 bg-zinc-950 border-[2px] border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-500 overflow-hidden"
        style={{
          boxShadow: `0 20px 50px -10px ${current.glow}, 0 0 0 1px rgba(255,255,255,0.05)`
        }}
      >
        {/* Device Notch & Status Bar */}
        <div className="relative rounded-[28px] bg-[#07090E] border border-white/[0.08] overflow-hidden p-5 flex flex-col justify-between min-h-[490px]">
          
          {/* Background Ambient Art */}
          <div className="absolute inset-0 z-0">
            <Image 
              src={current.photo} 
              alt="DJ Preview" 
              fill 
              className="object-cover opacity-35 filter brightness-90 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/80 to-transparent" />
          </div>

          {/* Top Bar of the Phone */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.accent }} />
              {current.badge}
            </span>
            <span className="text-zinc-500">beatflow.me/@{displayName}</span>
          </div>

          {/* Center Artist Brand */}
          <div className="relative z-10 my-auto text-center space-y-2 py-6">
            <div className="w-20 h-20 rounded-full mx-auto p-0.5 border-2 shadow-2xl relative overflow-hidden" style={{ borderColor: current.accent }}>
              <Image src={current.photo} alt="DJ Avatar" fill className="object-cover" />
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-md">
              DJ {displayName}
            </h3>
            
            <p className="text-xs text-zinc-300 font-medium">
              {current.genre} • São Paulo
            </p>
            
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10 text-[10px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Agenda Aberta 2026</span>
            </div>
          </div>

          {/* Mini Interactive Audio Visualizer */}
          <div className="relative z-10 space-y-3">
            <div 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold shadow-md"
                  style={{ backgroundColor: current.accent }}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Live Set @ Warung Beach</p>
                  <p className="text-[10px] text-zinc-400">126 BPM • Hi-Fi Audio</p>
                </div>
              </div>

              {/* Animated Waveform bars */}
              <div className="flex items-center gap-1 h-5">
                {[30, 80, 50, 100, 60, 90, 40].map((h, i) => (
                  <span 
                    key={i} 
                    className="w-1 rounded-full transition-all duration-300"
                    style={{ 
                      height: isPlaying ? `${Math.max(20, h * (Math.sin(i + Date.now()/200)*0.4 + 0.6))}%` : '25%',
                      backgroundColor: current.accent
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Simulated Booking Button */}
            <button 
              type="button"
              onClick={onClaim}
              className="w-full py-3 rounded-xl font-bold text-xs text-black transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: current.accent }}
            >
              <span>Reivindicar Este Perfil</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}