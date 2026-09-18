'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX, 
  Heart, 
  MoreHorizontal 
} from 'lucide-react';

interface AudioPlayerProps {
  title?: string;
  artist?: string;
  coverUrl?: string;
  durationSeconds?: number;
  initialTimeSeconds?: number;
  compact?: boolean;
}

export function AudioPlayer({
  title = "Midnight Flow",
  artist = "Luna Martins",
  coverUrl = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop",
  durationSeconds = 236, // 3:56
  initialTimeSeconds = 84, // 1:24
  compact = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTimeSeconds);
  const [isLiked, setIsLiked] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(80);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Synthesizer Web Audio ref for real playable sound
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 36 bars waveform pattern reflecting the exact UI kit graphic
  const baseWaveformHeights = [
    18, 26, 35, 22, 45, 60, 40, 75, 90, 65, 80, 100, 70, 85, 95, 60, 45, 30,
    42, 68, 88, 55, 78, 92, 60, 48, 70, 85, 95, 65, 45, 32, 24, 40, 28, 16
  ];

  // Play synthetic smooth melodic beat loop when active
  const startSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const notes = [220, 261.63, 293.66, 329.63, 392.00, 440]; // A Minor Pentatonic
      let noteIndex = 0;

      const playNote = () => {
        if (!ctx || ctx.state === 'suspended') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = notes[noteIndex % notes.length];
        noteIndex++;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const currentVol = isMuted ? 0 : (volume / 100) * 0.08;
        gain.gain.setValueAtTime(currentVol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      };

      synthIntervalRef.current = setInterval(playNote, 420);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  // Timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= durationSeconds ? 0 : prev + 1));
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      stopSynth();
    };
  }, [isPlaying, durationSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = (currentTime / durationSeconds) * 100;

  const handleWaveformClick = (barIndex: number) => {
    const fraction = (barIndex + 1) / baseWaveformHeights.length;
    setCurrentTime(Math.floor(fraction * durationSeconds));
  };

  if (compact) {
    return (
      <div className="h-16 rounded-2xl bg-surface/90 border border-white/10 flex items-center px-4 gap-4 backdrop-blur-xl shadow-2xl">
        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
          <Image src={coverUrl} alt={title} fill referrerPolicy="no-referrer" className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-white truncate">{title}</div>
          <div className="text-[11px] text-text-secondary truncate">{artist}</div>
          <div className="h-1 w-full bg-white/10 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center text-white shadow-[0_0_15px_rgba(138,63,252,0.5)] transition"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 ml-0.5 fill-white" />}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-surface/90 border border-white/10 p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-primary/10 blur-[60px] pointer-events-none rounded-full" />
      
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 relative z-10">
        {/* Track info */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0">
            <Image 
              src={coverUrl} 
              alt={title} 
              fill 
              referrerPolicy="no-referrer"
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-base text-white leading-tight">{title}</h4>
            <p className="text-xs text-text-secondary font-medium">{artist}</p>
          </div>

          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="ml-2 p-1.5 rounded-full hover:bg-white/5 text-text-secondary transition"
            title="Favoritar set"
          >
            <Heart 
              className={`w-4 h-4 transition ${
                isLiked ? 'text-secondary fill-secondary drop-shadow-[0_0_8px_rgba(255,77,139,0.5)]' : 'hover:text-white'
              }`} 
            />
          </button>
        </div>

        {/* Waveform & Timeline */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {/* Waveform Equalizer Bars */}
          <div className="h-10 flex items-center gap-[3px] py-1 cursor-pointer w-full select-none">
            {baseWaveformHeights.map((height, i) => {
              const barProgressFraction = (i + 1) / baseWaveformHeights.length;
              const isPassed = (progressPercent / 100) >= barProgressFraction;
              const isHovered = hoveredBarIndex !== null && i <= hoveredBarIndex;
              
              // Dynamic jitter if playing
              const dynamicHeight = isPlaying 
                ? Math.min(100, Math.max(20, height + (Math.sin((currentTime * 3) + i) * 15))) 
                : height;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredBarIndex(i)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  onClick={() => handleWaveformClick(i)}
                  className="flex-1 flex items-center justify-center h-full group/bar"
                >
                  <div
                    className={`w-full rounded-full transition-all duration-150 ${
                      isPassed || isHovered
                        ? 'bg-gradient-to-t from-primary to-tertiary shadow-[0_0_8px_rgba(0,209,255,0.4)]'
                        : 'bg-white/15 group-hover/bar:bg-white/30'
                    }`}
                    style={{ height: `${dynamicHeight}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Time tracker */}
          <div className="flex justify-between items-center text-[11px] font-mono text-text-secondary mt-1">
            <span>{formatTime(currentTime)}</span>
            <span className="text-white/40">{formatTime(durationSeconds)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
          <button 
            onClick={() => setIsShuffle(!isShuffle)}
            className={`p-2 rounded-full transition ${isShuffle ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
            title="Aleatório"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setCurrentTime((prev) => Math.max(0, prev - 15))}
            className="p-2 rounded-full text-text-secondary hover:text-white transition"
            title="Voltar 15s"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Central Play/Pause Button */}
          <button
            id="player-main-play-pause-btn"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center text-white shadow-[0_0_24px_rgba(138,63,252,0.6)] transform hover:scale-105 active:scale-95 transition"
            title={isPlaying ? "Pausar" : "Tocar Set"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-white" />
            )}
          </button>

          <button 
            onClick={() => setCurrentTime((prev) => Math.min(durationSeconds, prev + 15))}
            className="p-2 rounded-full text-text-secondary hover:text-white transition"
            title="Avançar 15s"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setIsRepeat(!isRepeat)}
            className={`p-2 rounded-full transition ${isRepeat ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
            title="Repetir"
          >
            <Repeat className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-white/10">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-text-secondary hover:text-white transition"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <button className="p-2 rounded-full text-text-secondary hover:text-white transition">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
