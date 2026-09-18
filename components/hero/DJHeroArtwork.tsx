'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  Users, 
  Send, 
  Heart, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles,
  Disc3,
  Flame,
  Radio
} from 'lucide-react';
import { BookingFlow } from '@/components/booking/BookingFlow';

interface DJHeroArtworkProps {
  onOpenBooking?: () => void;
}

export function DJHeroArtwork({ onOpenBooking }: DJHeroArtworkProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(84); // 1:24
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Equalizer waveform bars simulation
  const waveformHeights = [
    25, 40, 60, 35, 80, 100, 70, 95, 85, 60, 40, 75, 90, 100, 65, 85, 45, 30, 
    55, 75, 95, 60, 80, 90, 50, 70, 85, 60, 40, 25
  ];

  const togglePlayback = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Generate real gentle synthetic electronic beat loop using Web Audio API
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = audioCtx || new AudioContextClass();
        if (!audioCtx) setAudioCtx(ctx);

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Play synth beats
        let step = 0;
        audioIntervalRef.current = setInterval(() => {
          setPlaybackTime((prev) => (prev >= 236 ? 0 : prev + 1));
          
          if (ctx) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const now = ctx.currentTime;

            // Deep 4x4 electronic club kick + atmospheric sub bass
            if (step % 2 === 0) {
              osc.type = 'sine';
              osc.frequency.setValueAtTime(130, now);
              osc.frequency.exponentialRampToValueAtTime(38, now + 0.14);
              gain.gain.setValueAtTime(0.3, now);
              gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            } else {
              // High-hat shimmer
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(440, now);
              gain.gain.setValueAtTime(0.08, now);
              gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            }

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
          }
          step++;
        }, 500); // 120 BPM quarter notes
      } catch (err) {
        console.error("Audio synth error:", err);
      }
    } else {
      setIsPlaying(false);
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#141226] via-[#0d0b1a] to-[#080711] shadow-2xl group select-none">
      
      {/* 1. Base Stage & Crowd Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=2000&auto=format&fit=crop"
          alt="Concert Crowd & Stage Lasers"
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-cover object-center opacity-30 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-1000"
        />
        {/* Deep ambient vignette and color grade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090814] via-[#090814]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090814]/90 via-transparent to-[#090814]/90" />
      </div>

      {/* 2. Volumetric Stage Spotlights & Purple Lasers */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[500px] bg-gradient-to-b from-purple-500/20 via-primary/10 to-transparent rotate-[-25deg] blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[350px] h-[500px] bg-gradient-to-b from-blue-500/20 via-tertiary/10 to-transparent rotate-[25deg] blur-2xl pointer-events-none" />

      {/* 3. The Iconic Floating Neon Halo Ring (Above DJ's Head) */}
      <div className="absolute top-[12%] sm:top-[14%] right-[22%] sm:right-[26%] w-44 sm:w-56 h-20 sm:h-24 pointer-events-none z-10 flex items-center justify-center -rotate-[14deg]">
        {/* Outer ambient glow */}
        <div className="absolute inset-0 rounded-[100%] bg-primary/40 blur-[30px] animate-pulse duration-1000" />
        <div className="absolute inset-[-15%] rounded-[100%] bg-pink-500/25 blur-[45px]" />
        
        {/* SVG Neon Halo Ring with realistic 3D perspective and luminous stroke */}
        <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
          <defs>
            {/* Gradient for ring stroke */}
            <linearGradient id="haloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Under glow */}
          <ellipse 
            cx="100" 
            cy="40" 
            rx="86" 
            ry="28" 
            fill="none" 
            stroke="#a855f7" 
            strokeWidth="8" 
            opacity="0.35"
            filter="url(#neonGlow)"
          />

          {/* Core vivid neon ring */}
          <ellipse 
            cx="100" 
            cy="40" 
            rx="86" 
            ry="28" 
            fill="none" 
            stroke="url(#haloGradient)" 
            strokeWidth="4.5" 
            filter="url(#neonGlow)"
            className="animate-pulse"
          />

          {/* Inner white-hot specular highlight */}
          <ellipse 
            cx="100" 
            cy="40" 
            rx="86" 
            ry="28" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            opacity="0.8"
          />
        </svg>

        {/* Downward light beam cast on DJ */}
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-48 h-56 bg-gradient-to-b from-primary/35 via-purple-600/10 to-transparent blur-xl pointer-events-none" />
      </div>

      {/* 4. The DJ Silhouette (From Behind, Right Hand Pointing Up, Wearing Over-Ear Headphones) */}
      <div className="absolute bottom-0 right-[8%] sm:right-[15%] w-[260px] sm:w-[320px] md:w-[380px] h-[85%] sm:h-[90%] pointer-events-none z-10 flex items-end justify-center">
        <svg viewBox="0 0 400 450" className="w-full h-full overflow-visible drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          <defs>
            <linearGradient id="djShading" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1f1a3a" />
              <stop offset="18%" stopColor="#151228" />
              <stop offset="100%" stopColor="#080711" />
            </linearGradient>

            <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Silhouette of DJ Body */}
          <g>
            {/* Back & Shoulders */}
            <path 
              d="M 130 350 C 130 250, 160 215, 200 215 C 240 215, 270 250, 270 350 L 320 450 L 80 450 Z" 
              fill="url(#djShading)" 
              stroke="url(#rimLight)" 
              strokeWidth="1.5"
            />

            {/* Neck */}
            <path 
              d="M 185 220 L 185 180 L 215 180 L 215 220 Z" 
              fill="#120f24" 
            />

            {/* Head (Viewed from back) */}
            <ellipse 
              cx="200" 
              cy="148" 
              rx="32" 
              ry="38" 
              fill="#0f0c1d" 
              stroke="#a855f7" 
              strokeWidth="1" 
              strokeOpacity="0.5"
            />

            {/* DJ Over-Ear Studio Headphones */}
            {/* Headband */}
            <path 
              d="M 166 148 C 166 112, 234 112, 234 148" 
              fill="none" 
              stroke="#4c1d95" 
              strokeWidth="7" 
              strokeLinecap="round"
            />
            <path 
              d="M 166 148 C 166 112, 234 112, 234 148" 
              fill="none" 
              stroke="#c084fc" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />

            {/* Left Ear Cushion */}
            <ellipse 
              cx="165" 
              cy="150" 
              rx="9" 
              ry="16" 
              fill="#2e1065" 
              stroke="#a855f7" 
              strokeWidth="2" 
            />

            {/* Right Ear Cushion */}
            <ellipse 
              cx="235" 
              cy="150" 
              rx="9" 
              ry="16" 
              fill="#2e1065" 
              stroke="#c084fc" 
              strokeWidth="2" 
            />

            {/* Right Arm Raised High (Celebrating / Pointing up) */}
            <path 
              d="M 260 230 C 285 200, 310 150, 325 90 C 330 70, 335 50, 338 25 C 340 18, 345 10, 348 20 C 350 35, 345 65, 335 110 C 325 160, 305 210, 280 250 Z" 
              fill="url(#djShading)" 
              stroke="url(#rimLight)" 
              strokeWidth="1.5"
            />

            {/* Hand with pointing index finger */}
            <path 
              d="M 338 25 C 336 12, 342 0, 345 -10 C 347 -8, 350 5, 348 20 Z" 
              fill="#1f1a3a" 
              stroke="#c084fc" 
              strokeWidth="1.5"
            />

            {/* Neon Rim Light on Shoulders and Hair from the Halo */}
            <ellipse 
              cx="200" 
              cy="115" 
              rx="24" 
              ry="6" 
              fill="#a855f7" 
              opacity="0.35" 
              filter="blur(4px)" 
            />
          </g>
        </svg>
      </div>

      {/* 5. Floating Glassmorphic Chips / Badges (Exact from Mockup) */}
      {/* 📅 Eventos */}
      <div className="absolute top-[28%] sm:top-[26%] right-[6%] sm:right-[8%] z-20 transition-all hover:scale-105 duration-300">
        <BookingFlow
          defaultStep="chat"
          triggerButton={
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/75 border border-white/15 backdrop-blur-xl shadow-lg hover:border-primary/50 text-xs font-medium text-white group/btn">
              <Calendar className="w-3.5 h-3.5 text-primary group-hover/btn:scale-110 transition-transform" />
              <span>Eventos</span>
            </button>
          }
        />
      </div>

      {/* 👥 Colaborações */}
      <div className="absolute top-[40%] sm:top-[38%] right-[3%] sm:right-[4%] z-20 transition-all hover:scale-105 duration-300">
        <BookingFlow
          defaultStep="chat"
          triggerButton={
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/75 border border-white/15 backdrop-blur-xl shadow-lg hover:border-secondary/50 text-xs font-medium text-white group/btn">
              <Users className="w-3.5 h-3.5 text-secondary group-hover/btn:scale-110 transition-transform" />
              <span>Colaborações</span>
            </button>
          }
        />
      </div>

      {/* 🚀 Bookings */}
      <div className="absolute top-[52%] sm:top-[50%] right-[5%] sm:right-[7%] z-20 transition-all hover:scale-105 duration-300">
        <BookingFlow
          defaultStep="chat"
          triggerButton={
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/75 border border-white/15 backdrop-blur-xl shadow-lg hover:border-tertiary/50 text-xs font-medium text-white group/btn">
              <Send className="w-3.5 h-3.5 text-blue-400 group-hover/btn:scale-110 transition-transform" />
              <span>Bookings</span>
            </button>
          }
        />
      </div>

      {/* 🤍 Novos fãs */}
      <div className="absolute top-[64%] sm:top-[62%] right-[8%] sm:right-[11%] z-20 transition-all hover:scale-105 duration-300">
        <BookingFlow
          defaultStep="chat"
          triggerButton={
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/75 border border-white/15 backdrop-blur-xl shadow-lg hover:border-pink-500/50 text-xs font-medium text-white group/btn">
              <Heart className="w-3.5 h-3.5 text-pink-400 group-hover/btn:scale-110 transition-transform" />
              <span>Novos fãs</span>
            </button>
          }
        />
      </div>

      {/* 6. Atmospheric Floating Typography: GOOD MUSIC BETTER PEOPLE */}
      <div className="absolute top-[48%] sm:top-[44%] left-[16%] sm:left-[22%] z-10 pointer-events-none hidden sm:block opacity-60">
        <div className="flex flex-col text-[11px] sm:text-xs font-extrabold tracking-[0.3em] uppercase text-text-secondary leading-loose">
          <span>GOOD</span>
          <span>MUSIC</span>
          <span className="text-white/80">BETTER</span>
          <span className="text-white/80">PEOPLE</span>
        </div>
      </div>

      {/* 7. Floating Glassmorphism Audio Player (Exact from Mockup bottom) */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto sm:max-w-md z-30">
        <div className="rounded-2xl bg-surface/85 border border-white/15 p-3.5 sm:p-4 backdrop-blur-2xl shadow-2xl flex items-center gap-3.5 transition-all hover:border-primary/50">
          
          {/* DJ Album Artwork Thumbnail */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/15 shadow-md">
            <Image 
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop"
              alt="Midnight Flow"
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
            )}
          </div>

          {/* Track Titles & Waveform Equalizer */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">Midnight Flow</div>
                <div className="text-[10px] text-text-secondary truncate">Luna Martins</div>
              </div>
              <span className="text-[10px] font-mono text-primary/90 shrink-0 font-medium">
                {formatTime(playbackTime)}
              </span>
            </div>

            {/* Sound Wave Equalizer Bars */}
            <div className="h-6 flex items-center gap-[2.5px] mt-1.5 cursor-pointer" onClick={togglePlayback}>
              {waveformHeights.map((h, i) => {
                const isActive = (i / waveformHeights.length) <= (playbackTime / 240);
                const animatedHeight = isPlaying 
                  ? Math.min(100, Math.max(20, h + Math.sin((playbackTime * 4) + i) * 20))
                  : h;

                return (
                  <div
                    key={i}
                    className="flex-1 flex items-center justify-center h-full"
                  >
                    <div 
                      className={`w-full rounded-full transition-all duration-150 ${
                        isActive 
                          ? 'bg-gradient-to-t from-primary via-purple-400 to-pink-400 shadow-[0_0_6px_rgba(192,132,252,0.6)]' 
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                      style={{ height: `${animatedHeight}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Circular Play / Pause Button */}
          <button 
            onClick={togglePlayback}
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-[0_0_16px_rgba(138,63,252,0.6)] transition-all hover:scale-105 shrink-0"
            title={isPlaying ? "Pausar som" : "Ouvir som real"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 ml-0.5 fill-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
