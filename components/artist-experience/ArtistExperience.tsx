'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BadgeCheck, 
  MapPin, 
  Play, 
  Pause,
  SlidersHorizontal,
  Instagram,
  Speaker,
  Disc3,
  Music,
  Share2,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  Zap,
  Calendar,
  Radio,
  FileText,
  X,
  Copy,
  Check,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  AtmosphereConfig, 
  getDJAtmosphere, 
  ATMOSPHERE_PRESETS,
  DEFAULT_ATMOSPHERE_ID 
} from '@/lib/artist-universe';
import { AtmosphereCanvas } from './AtmosphereCanvas';
import { AudioPlayerBar } from './AudioPlayerBar';
import { LightboxModal } from './LightboxModal';
import { ConversationalBookingModal } from './ConversationalBookingModal';
import { artistAudioEngine } from '@/lib/artist-audio-engine';

export interface ArtistExperienceProps {
  djSlug: string;
  initialDjData?: {
    name?: string;
    location?: string;
    genres?: string[];
    bio?: string;
    coverUrl?: string;
    avatarUrl?: string;
    feeHint?: string;
    minFee?: number;
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
  };
  overrideAtmosphere?: AtmosphereConfig; // Permite prévia em tempo real vinda do dashboard
}

export const ArtistExperience: React.FC<ArtistExperienceProps> = ({
  djSlug,
  initialDjData,
  overrideAtmosphere,
}) => {
  // 1. Atmosphere state: starts with override if passed, or stored config
  const [atmosphere, setAtmosphere] = useState<AtmosphereConfig>(() => {
    return overrideAtmosphere || getDJAtmosphere(djSlug);
  });

  // Keep in sync with overrideAtmosphere changes (e.g. while editing in dashboard)
  useEffect(() => {
    if (overrideAtmosphere) {
      setAtmosphere(overrideAtmosphere);
      artistAudioEngine.setAtmosphere(overrideAtmosphere);
    }
  }, [overrideAtmosphere]);

  // Listen to cross-component or multi-tab atmosphere change events
  useEffect(() => {
    const handleAtmosphereChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ djSlugOrId: string; config: AtmosphereConfig }>;
      if (customEvent.detail && (customEvent.detail.djSlugOrId === djSlug || customEvent.detail.djSlugOrId === 'current')) {
        setAtmosphere(customEvent.detail.config);
        artistAudioEngine.setAtmosphere(customEvent.detail.config);
      }
    };

    window.addEventListener('beatflow_atmosphere_changed', handleAtmosphereChange);
    return () => {
      window.removeEventListener('beatflow_atmosphere_changed', handleAtmosphereChange);
    };
  }, [djSlug]);

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [activeCueIndex, setActiveCueIndex] = useState(0);

  // Modals & UI States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isRiderOpen, setIsRiderOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  // Artist data defaults
  const artistName = initialDjData?.name || 'Luna Martins';
  const artistCity = initialDjData?.location || 'São Paulo - SP';
  const artistGenres = initialDjData?.genres || ['Melodic Techno', 'Tech House', 'Afro House'];
  const artistMinFee = initialDjData?.minFee || 3500;
  const artistAvatar = initialDjData?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';
  const artistCover = initialDjData?.coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop';

  const cuePoints = [
    { label: '00:00', title: `${artistName} · Opening Ambient Haze`, progress: 0 },
    { label: '14:20', title: `${artistName} · Deep Peak Transition (ID)`, progress: 35 },
    { label: '38:45', title: `${artistName} · Main Stage Climax & Drop`, progress: 70 },
  ];

  const tourDates = [
    { date: '10 OUT', venue: 'Nocturne Club Showcase', city: 'São Paulo - SP', status: 'Confirmado', isHighlight: true },
    { date: '24 OUT', venue: 'Winter Electronic Summit', city: 'Campos do Jordão - SP', status: 'Headliner', isHighlight: false },
    { date: '14 NOV', venue: 'Warung Beach Tour', city: 'Curitiba - PR', status: 'Últimos Ingressos', isHighlight: true },
    { date: '05 DEZ', venue: 'D-EDGE Quinta Techno', city: 'São Paulo - SP', status: 'Confirmado', isHighlight: false },
  ];

  const galleryPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      title: 'Nocturne Club · Peak Time Live Set',
      tag: 'Live Stage',
    },
    {
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      title: 'Warung Tour · Sunset Stage',
      tag: 'Atmosphere',
    },
    {
      url: 'https://images.unsplash.com/photo-1546707012-c46675f12716?q=80&w=800&auto=format&fit=crop',
      title: 'Cabine & Hardware Deck · Pioneer CDJ-3000',
      tag: 'Hardware Setup',
    },
  ];

  const handleTogglePlay = () => {
    if (isPlaying) {
      artistAudioEngine.stop();
      setIsPlaying(false);
    } else {
      artistAudioEngine.start(atmosphere);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div 
      className="relative min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden"
      style={{ backgroundColor: atmosphere.background.baseColor }}
    >
      {/* 1. Dynamic Atmosphere Canvas with Particles & Volumetric Lighting */}
      <AtmosphereCanvas 
        atmosphere={atmosphere} 
        isAudioPlaying={isPlaying}
      />

      {/* Top Floating Glass Navigation */}
      <header className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
        <Link 
          href="/"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm tracking-tighter transition-transform group-hover:scale-105"
            style={{
              backgroundColor: atmosphere.lighting.primaryGlow,
              color: '#000000',
            }}
          >
            BF
          </div>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/80 group-hover:text-white transition">
            Beat Flow <span className="text-white/40">Artist Universe</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Active Atmosphere Badge */}
          <div 
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all"
            style={{
              backgroundColor: `${atmosphere.lighting.primaryGlow}15`,
              borderColor: `${atmosphere.lighting.primaryGlow}40`,
              color: atmosphere.lighting.primaryGlow,
            }}
          >
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: atmosphere.lighting.primaryGlow }} />
            <span>Atmosfera: {atmosphere.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition text-white/90 hover:text-white"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
          </button>
        </div>
      </header>

      {/* 2. Monumental Hero Section */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="relative rounded-3xl border border-white/15 overflow-hidden p-6 sm:p-12 shadow-2xl backdrop-blur-md bg-black/40">
          
          {/* Subtle Ambient Back-Glow */}
          <div 
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 transition-all duration-700"
            style={{ backgroundColor: atmosphere.lighting.primaryGlow }}
          />
          <div 
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 transition-all duration-700"
            style={{ backgroundColor: atmosphere.lighting.secondaryGlow }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: Avatar + Title & Metas */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div 
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden relative shrink-0 border-2 shadow-2xl transition-all duration-500"
                style={{
                  borderColor: atmosphere.lighting.primaryGlow,
                  boxShadow: `0 0 35px ${atmosphere.lighting.primaryGlow}50`,
                }}
              >
                <Image
                  src={artistAvatar}
                  alt={artistName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-white/10 text-white/90 border border-white/15">
                    DJ Oficial
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Agenda Aberta 2026/2027
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  {artistName}
                </h1>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-white/70 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-white/50" />
                    {artistCity}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-white/90">
                    {artistGenres.join(' · ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Hero Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={handleTogglePlay}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: atmosphere.lighting.primaryGlow,
                  color: '#000000',
                  boxShadow: `0 8px 25px ${atmosphere.lighting.primaryGlow}40`,
                }}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pausar Set Imersivo' : 'Ouvir Síntese Sonora'}</span>
              </button>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-white text-black hover:bg-white/90 transition-all shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Solicitar Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Micro Telemetry Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-white/40 font-mono text-[10px] uppercase">Formato de Cabine</div>
              <div className="font-bold text-white mt-0.5">DJ Set + Live Híbrido</div>
            </div>
            <div>
              <div className="text-white/40 font-mono text-[10px] uppercase">BPM de Pista</div>
              <div className="font-bold text-white mt-0.5">{atmosphere.audioSignature.suggestedBpm} BPM ({atmosphere.audioSignature.genre})</div>
            </div>
            <div>
              <div className="text-white/40 font-mono text-[10px] uppercase">Cachê de Referência</div>
              <div className="font-bold text-emerald-400 mt-0.5">A partir de R$ {artistMinFee.toLocaleString('pt-BR')}</div>
            </div>
            <div>
              <div className="text-white/40 font-mono text-[10px] uppercase">Rider Técnico</div>
              <button 
                onClick={() => setIsRiderOpen(true)}
                className="font-bold text-sky-400 hover:underline mt-0.5 flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                <span>Ver Rider Completo</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Interactive Cue Points & Audio Experience */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Music className="w-4 h-4" style={{ color: atmosphere.lighting.primaryGlow }} />
                <span>Sets & Transições Autorais</span>
              </h3>
              <p className="text-xs text-white/50">
                Pule direto para os momentos de ápice da apresentação de {artistName}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-white/60">Live Synthesis Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {cuePoints.map((cue, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCueIndex(idx);
                  setProgress(cue.progress);
                  if (!isPlaying) handleTogglePlay();
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  activeCueIndex === idx
                    ? 'border-white/40 bg-white/10 shadow-lg'
                    : 'border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20'
                }`}
              >
                <div className="truncate">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: atmosphere.lighting.primaryGlow }}>
                    <Play className="w-3 h-3 fill-current" />
                    <span>{cue.label}</span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1 truncate">
                    {cue.title}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-white/40 shrink-0">
                  {cue.progress}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Biography & Tour Dates */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editorial Bio */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: atmosphere.lighting.primaryGlow }} />
              <span>Conceito Artístico & Trajetória</span>
            </h3>
            <span className="text-xs font-mono text-white/40">Editorial 2026</span>
          </div>

          <p className="text-sm text-white/80 leading-relaxed">
            {initialDjData?.bio || "Produtora musical e DJ com presença consolidada na vanguarda da cena eletrônica de São Paulo. Seus sets combinam linhas de baixo hipnóticas, sintetizadores analógicos modulares e construções melódicas etéreas, desenhados cirurgicamente para momentos de ápice (Peak Time) e transições imersivas de pista."}
          </p>

          {showFullBio && (
            <p className="text-sm text-white/70 leading-relaxed pt-2 border-t border-white/10 animate-in fade-in">
              Com apresentações marcantes em clubs consagrados como D-EDGE, Warung Beach Tour e Nocturne Club, traz ao palco uma sinergia ímpar entre precisão técnica no rider e conexão emocional instantânea com o público.
            </p>
          )}

          <button
            onClick={() => setShowFullBio(!showFullBio)}
            className="text-xs font-bold font-mono transition hover:underline"
            style={{ color: atmosphere.lighting.primaryGlow }}
          >
            {showFullBio ? '← Ver Menos' : 'Ler Biografia Completa →'}
          </button>
        </div>

        {/* Tour Dates */}
        <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: atmosphere.lighting.primaryGlow }} />
              <span>Agenda & Turnê</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">Ao Vivo</span>
          </div>

          <div className="space-y-2.5">
            {tourDates.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white">{item.venue}</div>
                  <div className="text-[11px] text-white/50">{item.city}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-sky-400">{item.date}</div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    item.isHighlight ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-white/70'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="w-full py-2.5 rounded-xl border border-white/20 text-xs font-bold text-white hover:bg-white/10 transition mt-2 cursor-pointer"
          >
            Consultar Outra Data
          </button>
        </div>
      </section>

      {/* 5. Stage Photo Gallery */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md space-y-4">
          <h3 className="text-lg font-bold">Galeria de Palco & Estrutura</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryPhotos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setLightboxImage(photo.url);
                  setLightboxTitle(photo.title);
                }}
                className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 cursor-pointer shadow-lg"
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition" />
                <div className="absolute bottom-3 left-3 right-3 text-xs">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-md">
                    {photo.tag}
                  </span>
                  <p className="font-bold text-white mt-1 truncate">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing for bottom floating audio player */}
      <div className="h-28" />

      {/* Bottom Sticky Player */}
      <AudioPlayerBar
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        atmosphere={atmosphere}
        activeCue={cuePoints[activeCueIndex]}
        progress={progress}
      />

      {/* Conversational Booking Modal */}
      <ConversationalBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        djName={artistName}
        djSlug={djSlug}
        minFee={artistMinFee}
        atmosphere={atmosphere}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        imageUrl={lightboxImage}
        title={lightboxTitle}
        onClose={() => setLightboxImage(null)}
      />

      {/* Rider Modal */}
      {isRiderOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsRiderOpen(false)}
        >
          <div 
            className="w-full max-w-lg rounded-3xl bg-[#0B0E16] border border-white/20 p-6 sm:p-8 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsRiderOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black">Rider Técnico Homologado</h3>
            <p className="text-xs text-white/60">
              Requisitos mínimos de cabine para apresentações oficiais de {artistName}.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Disc3 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">2x Pioneer CDJ-3000 (Firmware 3.12+)</div>
                  <div className="text-[11px] text-white/50">Interligadas via cabo de rede Cat6 (Pro DJ Link).</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <SlidersHorizontal className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">1x Pioneer DJM-A9 ou DJM-V10</div>
                  <div className="text-[11px] text-white/50">Saída digital calibrada em 96kHz com aterramento.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Speaker className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">2x Monitores de Referência Estéreo</div>
                  <div className="text-[11px] text-white/50">L-Acoustics, Genelec ou Meyer Sound alinhados aos ouvidos.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Ponto 220V Estabilizado e Isolado</div>
                  <div className="text-[11px] text-white/50">Sem oscilações causadas por iluminação cênica.</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsRiderOpen(false)}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-white/90 transition shadow-lg mt-2 cursor-pointer"
            >
              Compreendi os Requisitos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
