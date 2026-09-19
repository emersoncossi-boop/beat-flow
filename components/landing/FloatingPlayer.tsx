'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Play, Pause } from 'lucide-react';

interface FloatingPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  className?: string;
}

export function FloatingPlayer({ isPlaying, onTogglePlay, className = '' }: FloatingPlayerProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio synthesizer for real sound upon playback
  const handlePlayToggle = () => {
    try {
      if (!isPlaying) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioCtx();
          }
          if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
          }

          const ctx = audioCtxRef.current;
          const chords = [
            [220, 261.63, 329.63, 392.00], // Am7
            [174.61, 220, 261.63, 329.63], // Fmaj7
            [196.00, 246.94, 293.66, 392.00] // G7
          ];
          let chordIndex = 0;

          const playChord = () => {
            if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
            const now = ctx.currentTime;
            const currentChord = chords[chordIndex % chords.length];
            chordIndex++;

            currentChord.forEach((freq) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              const filter = ctx.createBiquadFilter();

              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, now);

              filter.type = 'lowpass';
              filter.frequency.setValueAtTime(800, now);
              filter.frequency.exponentialRampToValueAtTime(1800, now + 0.4);
              filter.frequency.exponentialRampToValueAtTime(400, now + 1.2);

              gain.gain.setValueAtTime(0.001, now);
              gain.gain.linearRampToValueAtTime(0.045, now + 0.1);
              gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);

              osc.connect(filter);
              filter.connect(gain);
              gain.connect(ctx.destination);

              osc.start(now);
              osc.stop(now + 1.4);
            });
          };

          playChord();
          synthTimerRef.current = setInterval(playChord, 1400);
        }
      } else {
        if (synthTimerRef.current) {
          clearInterval(synthTimerRef.current);
          synthTimerRef.current = null;
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
          audioCtxRef.current.suspend();
        }
      }
    } catch {
      // Fallback
    }

    onTogglePlay();
  };

  return (
    <div
      className={`relative w-full max-w-[420px] rounded-2xl bg-[#111111] border border-[#262626] p-4 shadow-2xl select-none ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Cover Art */}
        <div className="relative shrink-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[#333333] bg-[#1A1A1A]">
            <Image
              src="/assets/landing/player-cover.jpg"
              alt="Midnight Flow"
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
              priority
            />
          </div>
        </div>

        {/* Music Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#888888]">Set Oficial</span>
          </div>
          <h4 className="text-base font-bold text-white tracking-tight leading-tight truncate">
            Midnight Flow (Live Set)
          </h4>
          <p className="text-xs text-[#A0A0A0] font-medium leading-tight mt-1 truncate">
            Luna Martins · Melodic Techno
          </p>

          {/* Equalizer animation */}
          {isPlaying && (
            <div className="flex items-end gap-1 mt-2.5 h-3">
              {[8, 14, 10, 18, 12, 16, 9].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [4, h, 6] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                  className="w-[2.5px] rounded-full bg-white"
                />
              ))}
            </div>
          )}
        </div>

        {/* Play/Pause Button */}
        <div className="shrink-0 flex items-center justify-center">
          <button
            type="button"
            onClick={handlePlayToggle}
            className="w-12 h-12 rounded-xl bg-white hover:bg-[#F0F0F0] text-black flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
            title={isPlaying ? 'Pausar áudio' : 'Ouvir set demo'}
            aria-label={isPlaying ? 'Pausar áudio' : 'Ouvir set demo'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black text-black" />
            ) : (
              <Play className="w-5 h-5 fill-black text-black ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
