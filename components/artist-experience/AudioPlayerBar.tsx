'use client';

import React from 'react';
import { Play, Pause, Disc3, Volume2, VolumeX, Sparkles, Radio } from 'lucide-react';
import { AtmosphereConfig } from '@/lib/artist-universe';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  atmosphere: AtmosphereConfig;
  activeCue: { label: string; title: string };
  progress: number;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute,
  atmosphere,
  activeCue,
  progress,
}) => {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 shadow-[0_-10px_40px_rgba(0,0,0,0.85)]"
      style={{
        backgroundColor: 'rgba(5, 7, 12, 0.94)',
      }}
    >
      {/* Top micro progress bar */}
      <div className="w-full h-1 bg-white/5 relative overflow-hidden">
        <div 
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${atmosphere.lighting.primaryGlow}, ${atmosphere.lighting.secondaryGlow})`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Track Telemetry & Tone */}
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            onClick={onTogglePlay}
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-lg cursor-pointer"
            style={{
              backgroundColor: isPlaying ? atmosphere.lighting.primaryGlow : '#FFFFFF',
              color: '#000000',
            }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-white truncate">
                {activeCue.title}
              </span>
              <span 
                className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0"
                style={{
                  backgroundColor: `${atmosphere.lighting.primaryGlow}20`,
                  color: atmosphere.lighting.primaryGlow,
                  border: `1px solid ${atmosphere.lighting.primaryGlow}40`,
                }}
              >
                {atmosphere.audioSignature.suggestedBpm} BPM
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-white/50 font-mono mt-0.5 truncate">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400" />
                <span>Web Audio Síntese Analógica</span>
              </span>
              <span>•</span>
              <span className="text-white/70">{atmosphere.audioSignature.genre}</span>
            </div>
          </div>
        </div>

        {/* Center: Waveform Visualization */}
        <div className="hidden md:flex items-center gap-1.5 flex-1 max-w-xs justify-center px-4">
          {Array.from({ length: 24 }).map((_, i) => {
            const heightMultiplier = isPlaying 
              ? Math.max(15, Math.sin(i * 0.5 + progress * 0.2) * 80 + 35)
              : (i % 3 === 0 ? 30 : i % 2 === 0 ? 55 : 20);
            return (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-150"
                style={{
                  height: `${heightMultiplier}%`,
                  maxHeight: '32px',
                  minHeight: '4px',
                  backgroundColor: isPlaying && i <= (progress / 100) * 24
                    ? atmosphere.lighting.primaryGlow
                    : 'rgba(255, 255, 255, 0.15)',
                }}
              />
            );
          })}
        </div>

        {/* Right: Atmosphere Pill & Mute */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span 
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: atmosphere.lighting.primaryGlow }}
            />
            <span className="text-white/60 font-mono text-[11px]">Atmosfera:</span>
            <span className="text-white font-bold text-xs">{atmosphere.name}</span>
          </div>

          <button
            onClick={onToggleMute}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
            title={isMuted ? 'Desmutar' : 'Mutar áudio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
