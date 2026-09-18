'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Sliders, 
  Disc3, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Radio,
  Zap,
  Eye,
  Music2
} from 'lucide-react';
import { ATMOSPHERE_PRESETS, AtmospherePresetId, AtmosphereConfig } from '@/lib/artist-universe';

interface AtmosphereDjExample {
  djName: string;
  avatar: string;
  stageImage: string;
  trackName: string;
  city: string;
  cacheBadge: string;
}

const ATMOSPHERE_DJ_SAMPLES: Record<AtmospherePresetId, AtmosphereDjExample> = {
  'berlin-warehouse': {
    djName: 'Klaus Richter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    stageImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    trackName: 'Kreuzberg Concrete (Original Peak Mix)',
    city: 'Berlim / São Paulo',
    cacheBadge: 'A partir de R$ 4.500',
  },
  'tulum-organic': {
    djName: 'Maya Sol',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    stageImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    trackName: 'Cenote Awakening (Afro Drum Journey)',
    city: 'Tulum / Trancoso',
    cacheBadge: 'A partir de R$ 6.000',
  },
  'tokyo-cyber-neon': {
    djName: 'Ren Cyber',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    stageImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    trackName: 'Shibuya Night Drive (Melodic Saw VIP)',
    city: 'Tóquio / Curitiba',
    cacheBadge: 'A partir de R$ 5.000',
  },
  'ibiza-sunset-gold': {
    djName: 'Luna Mar',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
    stageImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    trackName: 'Es Vedrà Twilight (Warm Sunset Cut)',
    city: 'Ibiza / Florianópolis',
    cacheBadge: 'A partir de R$ 5.500',
  },
  'deep-abyss': {
    djName: 'Vortex Void',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    stageImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    trackName: 'Mariana Trench (Hypnotic Sub Pulse)',
    city: 'Londres / Belo Horizonte',
    cacheBadge: 'A partir de R$ 4.000',
  },
};

export function AtmospheresShowcase() {
  const [selectedId, setSelectedId] = useState<AtmospherePresetId>('tokyo-cyber-neon');
  const [isPlayingSnippet, setIsPlayingSnippet] = useState<boolean>(false);

  const currentAtmosphere: AtmosphereConfig = ATMOSPHERE_PRESETS[selectedId];
  const currentDj: AtmosphereDjExample = ATMOSPHERE_DJ_SAMPLES[selectedId];

  const presetsList = Object.values(ATMOSPHERE_PRESETS);

  return (
    <section id="atmosferas-e-universos" className="py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#07090E] relative overflow-hidden text-left select-none">
      
      {/* Dynamic Background Glow reacting to the active atmosphere lighting tokens */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none rounded-full blur-[140px] opacity-25 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${currentAtmosphere.lighting.primaryGlow} 0%, ${currentAtmosphere.lighting.secondaryGlow} 50%, transparent 80%)`
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold tracking-[0.2em] text-[#00D1FF] uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
            <span>IDENTIDADE VISUAL & CÊNICA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08] mb-4">
            Cada gênero musical tem seu templo.<br className="hidden sm:block" />
            <span 
              className="transition-colors duration-500"
              style={{ color: currentAtmosphere.lighting.primaryGlow }}
            >
              Escolha a atmosfera do seu palco digital.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-normal">
            Seu Press Kit não é uma lista cinza e estática. O Beat Flow permite escolher a iluminação, textura, partículas e paleta que dialogam perfeitamente com a frequência sonora do seu set.
          </p>
        </div>

        {/* Atmosphere Selector Tabs (Tátil & Responsivo) */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 sm:pb-0 mb-12 snap-x snap-mandatory hide-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {presetsList.map((preset) => {
            const isSelected = preset.id === selectedId;
            return (
              <button
                key={preset.id}
                id={`btn-atmosphere-${preset.id}`}
                type="button"
                onClick={() => {
                  setSelectedId(preset.id);
                  setIsPlayingSnippet(false);
                }}
                className={`min-w-[160px] sm:min-w-0 snap-center py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2.5 border cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-white/10 text-white shadow-lg backdrop-blur-md scale-105'
                    : 'bg-black/30 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
                style={{
                  borderColor: isSelected ? preset.lighting.primaryGlow : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isSelected ? `0 0 20px ${preset.lighting.primaryGlow}33` : 'none'
                }}
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full transition-transform duration-300"
                  style={{ 
                    backgroundColor: preset.lighting.primaryGlow,
                    boxShadow: isSelected ? `0 0 10px ${preset.lighting.primaryGlow}` : 'none',
                    transform: isSelected ? 'scale(1.25)' : 'scale(1)'
                  }} 
                />
                <span className="whitespace-nowrap">{preset.name.split(' ')[0]} {preset.name.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        {/* Main Stage Interactive Showcase (Split Columns: Context & Live Stage Mockup) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Atmosphere DNA, Storytelling & Audio Profile (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAtmosphere.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Badge Tagline */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-semibold text-white/80">
                  <Flame className="w-3.5 h-3.5" style={{ color: currentAtmosphere.lighting.primaryGlow }} />
                  <span>{currentAtmosphere.tagline}</span>
                </div>

                {/* Atmosphere Name & Description */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                    {currentAtmosphere.name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {currentAtmosphere.description}
                  </p>
                </div>

                {/* Technical Atmospheric Specs */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] font-mono text-white/40 uppercase mb-1 flex items-center gap-1.5">
                      <Music2 className="w-3 h-3 text-white/60" />
                      <span>Gênero Alvo</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {currentAtmosphere.audioSignature.genre}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] font-mono text-white/40 uppercase mb-1 flex items-center gap-1.5">
                      <Radio className="w-3 h-3 text-white/60" />
                      <span>Cadência & BPM</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                      ~{currentAtmosphere.audioSignature.suggestedBpm} BPM
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] font-mono text-white/40 uppercase mb-1 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-white/60" />
                      <span>Partículas de Palco</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold capitalize text-white leading-tight">
                      {currentAtmosphere.particles.type.replace('-', ' ')}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] font-mono text-white/40 uppercase mb-1 flex items-center gap-1.5">
                      <Sliders className="w-3 h-3 text-white/60" />
                      <span>Luz Volumétrica</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full shrink-0 border border-white/30"
                        style={{ backgroundColor: currentAtmosphere.lighting.primaryGlow }} 
                      />
                      <span>Foco {currentAtmosphere.lighting.beamAngle}°</span>
                    </div>
                  </div>
                </div>

                {/* Direct CTA carrying the chosen atmosphere */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                  <Link 
                    href={`/login?mode=signup&atmosphere=${currentAtmosphere.id}`}
                    className="w-full sm:w-auto"
                  >
                    <button 
                      type="button"
                      id="btn-claim-atmosphere"
                      className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                      style={{
                        backgroundColor: currentAtmosphere.lighting.primaryGlow,
                        boxShadow: `0 0 25px ${currentAtmosphere.lighting.primaryGlow}66`
                      }}
                    >
                      <span>Usar este universo no meu perfil</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>

                  <Link href={`/${selectedId === 'berlin-warehouse' ? 'dj-nexus' : 'luna-live'}`} className="w-full sm:w-auto">
                    <button 
                      type="button"
                      className="w-full sm:w-auto h-12 px-5 rounded-xl border border-white/15 hover:border-white/30 bg-white/5 text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-white/60" />
                      <span>Ver perfil completo</span>
                    </button>
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Live Simulated Artist Stage in Real Atmosphere (7 cols) */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAtmosphere.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative rounded-3xl border overflow-hidden shadow-2xl p-5 sm:p-7"
                style={{
                  backgroundColor: currentAtmosphere.background.baseColor,
                  backgroundImage: currentAtmosphere.background.gradientOverlay,
                  borderColor: `${currentAtmosphere.lighting.primaryGlow}40`,
                  boxShadow: `0 20px 60px -15px ${currentAtmosphere.lighting.primaryGlow}22`
                }}
              >
                {/* Volumetric Stage Spotlight Beam */}
                <div 
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] h-[360px] pointer-events-none opacity-35 mix-blend-screen transition-all duration-700"
                  style={{
                    background: `conic-gradient(from 180deg at 50% 0%, transparent 160deg, ${currentAtmosphere.lighting.primaryGlow} 180deg, transparent 200deg)`,
                    filter: 'blur(28px)',
                    transform: `rotate(${currentAtmosphere.lighting.beamAngle - 30}deg)`
                  }}
                />

                {/* Stage Ambient Floating Motes (Simulated Particles) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div 
                    className="w-2 h-2 rounded-full absolute top-12 left-1/4 animate-ping opacity-60"
                    style={{ backgroundColor: currentAtmosphere.lighting.primaryGlow, animationDuration: '3s' }}
                  />
                  <div 
                    className="w-1.5 h-1.5 rounded-full absolute top-24 right-1/3 animate-pulse opacity-80"
                    style={{ backgroundColor: currentAtmosphere.lighting.secondaryGlow }}
                  />
                  <div 
                    className="w-1 h-1 rounded-full absolute bottom-20 left-1/3 animate-pulse opacity-70"
                    style={{ backgroundColor: currentAtmosphere.lighting.accentGlow }}
                  />
                </div>

                {/* Profile Header Card */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 shadow-xl shrink-0"
                      style={{ borderColor: currentAtmosphere.lighting.primaryGlow }}
                    >
                      <Image 
                        src={currentDj.avatar}
                        alt={currentDj.djName}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <span className="text-lg sm:text-2xl font-black text-white tracking-tight">
                          {currentDj.djName}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#00D1FF]" />
                      </div>
                      <p className="text-xs sm:text-sm text-white/60 font-medium">
                        {currentDj.city} · {currentAtmosphere.audioSignature.genre}
                      </p>
                      <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{currentDj.cacheBadge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA Mini */}
                  <div className="w-full sm:w-auto">
                    <button 
                      type="button"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-white/80" />
                      <span>Pedir Booking</span>
                    </button>
                  </div>
                </div>

                {/* Stage Photo Banner with Live Neon Waveform */}
                <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-white/10 mb-5 shadow-inner">
                  <Image 
                    src={currentDj.stageImage}
                    alt="Palco e apresentação do DJ"
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover opacity-65"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Overlaid Audio Player Control */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setIsPlayingSnippet(!isPlayingSnippet)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-black shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md"
                        style={{ backgroundColor: currentAtmosphere.lighting.primaryGlow }}
                        aria-label={isPlayingSnippet ? "Pausar demonstração" : "Tocar demonstração"}
                      >
                        {isPlayingSnippet ? (
                          <Pause className="w-4 h-4 fill-black" />
                        ) : (
                          <Play className="w-4 h-4 fill-black ml-0.5" />
                        )}
                      </button>

                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">
                          {currentDj.trackName}
                        </div>
                        <div className="text-[10px] font-mono text-white/50 flex items-center gap-1.5">
                          <span>Set Gravado Ao Vivo</span>
                          <span>•</span>
                          <span>{currentAtmosphere.audioSignature.suggestedBpm} BPM</span>
                        </div>
                      </div>
                    </div>

                    {/* Animated Micro Equalizer Bars */}
                    <div className="flex items-end gap-1 h-5 shrink-0 px-2" aria-hidden="true">
                      {[35, 75, 45, 95, 60, 85, 40].map((h, i) => (
                        <span 
                          key={i}
                          className="w-1 rounded-full transition-all duration-300"
                          style={{
                            height: isPlayingSnippet ? `${h}%` : '20%',
                            backgroundColor: currentAtmosphere.lighting.primaryGlow,
                            opacity: isPlayingSnippet ? 1 : 0.4
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Status bar inside the mockup */}
                <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Disc3 className="w-3.5 h-3.5" style={{ color: currentAtmosphere.lighting.primaryGlow }} />
                    <span>Rider: 2x CDJ-3000 + DJM-A9</span>
                  </span>
                  <span className="text-white/70">
                    Sinal 50% via Beat Flow Shield
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
