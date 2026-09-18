'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Sparkles, 
  MapPin, 
  Globe, 
  Music, 
  DollarSign, 
  Check, 
  ExternalLink, 
  ArrowLeft,
  Loader2,
  Camera,
  Sliders,
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Eye,
  Edit3,
  Calendar,
  Share2,
  Instagram,
  CheckCircle2,
  AlertCircle,
  SunMedium,
  Palette,
  Layers,
  Zap,
  Radio,
  Monitor,
  Smartphone
} from 'lucide-react';
import { GenreTag, VerificadoBadge, SpotifyIcon, SoundCloudIcon, WaveformIcon } from '@/components/ui/BeatFlowIcons';
import { 
  AtmosphereConfig, 
  AtmospherePresetId, 
  ATMOSPHERE_PRESETS, 
  DEFAULT_ATMOSPHERE_ID, 
  getDJAtmosphere, 
  saveDJAtmosphere 
} from '@/lib/artist-universe';
import { AtmosphereCanvas } from '@/components/artist-experience/AtmosphereCanvas';
import { ArtistExperience } from '@/components/artist-experience/ArtistExperience';

const GENRE_CHOICES = [
  'Tech House',
  'Melodic Techno',
  'House',
  'Deep House',
  'Afro House',
  'Techno',
  'Progressive House',
  'Indie Dance',
  'Open Format',
];

const RIDER_OPTIONS = [
  { id: 'cdj3000', label: '4x Pioneer CDJ-3000' },
  { id: 'cdj2000', label: '3x Pioneer CDJ-2000 NXS2' },
  { id: 'djma9', label: 'Pioneer DJM-A9' },
  { id: 'djmv10', label: 'Pioneer DJM-V10' },
  { id: 'technics', label: '2x Toca-discos Technics 1200' },
  { id: 'monitors', label: '2x Monitores de Referência' },
  { id: 'mic', label: 'Microfone sem fio' },
];

type AudienceContext = 'Clubs & Festivais' | 'Corporativo Premium' | 'Casamentos & Privados';

export default function ProfileSettingsPage() {
  const { djProfile, updateDJProfile } = useAuth();

  // Mode: Edição vs Prévia (Visual Builder)
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [activeTab, setActiveTab] = useState<'atmosphere' | 'bio' | 'music' | 'rider' | 'gallery'>('atmosphere');

  // Atmosphere State
  const currentSlug = djProfile?.slug || 'luna-martins';
  const [selectedAtmosphereId, setSelectedAtmosphereId] = useState<AtmospherePresetId>(() => {
    return getDJAtmosphere(currentSlug).id;
  });
  const [atmosphereChangedNotice, setAtmosphereChangedNotice] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const currentAtmosphere = ATMOSPHERE_PRESETS[selectedAtmosphereId] || ATMOSPHERE_PRESETS[DEFAULT_ATMOSPHERE_ID];

  const handleSelectAtmosphere = (presetId: AtmospherePresetId) => {
    setSelectedAtmosphereId(presetId);
    saveDJAtmosphere(currentSlug, presetId);
    saveDJAtmosphere('current', presetId);
    setAtmosphereChangedNotice(true);
    setTimeout(() => setAtmosphereChangedNotice(false), 3000);
  };

  // Form State
  const [artisticName, setArtisticName] = useState(djProfile?.artisticName || 'Luna Martins');
  const [slug, setSlug] = useState(djProfile?.slug || 'luna-martins');
  const [city, setCity] = useState(djProfile?.city || 'Rio de Janeiro - RJ');
  const [bio, setBio] = useState(
    djProfile?.bio || 'Produtora e DJ brasileira especializada em timbres analógicos, baixos pulsantes e melodias etéreas construídas para pistas exigentes.'
  );
  
  const [genres, setGenres] = useState<string[]>(djProfile?.genres || ['Melodic Techno', 'Deep House', 'House']);
  const [rateRange, setRateRange] = useState(djProfile?.rateRange || 'R$ 3.500 - 8.000');
  
  const [soundcloud, setSoundcloud] = useState('https://soundcloud.com/lunamartins/set-verao-2026');
  const [spotify, setSpotify] = useState('https://open.spotify.com/artist/lunamartins');
  const [instagram, setInstagram] = useState('https://instagram.com/lunamartins.dj');
  
  const [rider, setRider] = useState<string[]>(['cdj3000', 'djma9', 'monitors']);
  
  const [gallery, setGallery] = useState([
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop'
  ]);

  // AI State
  const [audienceContext, setAudienceContext] = useState<AudienceContext>('Clubs & Festivais');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [aiSuccess, setAiSuccess] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Completude Checklist items
  const hasPhoto = Boolean(djProfile?.avatarUrl || gallery.length > 0);
  const hasRider = rider.length > 0;
  const hasAudio = Boolean(soundcloud || spotify);
  const hasRate = Boolean(rateRange);
  const hasSocials = Boolean(instagram || soundcloud || spotify);

  const checklistItems = [
    { label: 'Foto de alta resolução', completed: hasPhoto },
    { label: 'Rider técnico preenchido', completed: hasRider },
    { label: 'Áudio/set incorporado', completed: hasAudio },
    { label: 'Faixa de cachê definida', completed: hasRate },
    { label: 'Redes sociais conectadas', completed: hasSocials },
  ];
  const completedCount = checklistItems.filter(i => i.completed).length;
  const completenessPercent = Math.round((completedCount / checklistItems.length) * 100);

  const toggleGenre = (g: string) => {
    if (genres.includes(g)) {
      if (genres.length > 1) setGenres(genres.filter((item) => item !== g));
    } else {
      setGenres([...genres, g]);
    }
  };

  const toggleRider = (id: string) => {
    if (rider.includes(id)) {
      setRider(rider.filter(item => item !== id));
    } else {
      setRider([...rider, id]);
    }
  };

  const removeImage = (idx: number) => {
    setGallery(gallery.filter((_, i) => i !== idx));
  };

  const handleGenerateAIBio = async () => {
    try {
      setIsGeneratingBio(true);
      setAiSuccess(false);

      const res = await fetch('/api/ai/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artisticName,
          genres,
          city,
          rateRange,
          audienceContext,
          currentBio: bio
        })
      });

      const data = await res.json();
      if (data?.bio) {
        setBio(data.bio);
        setAiSuccess(true);
        setTimeout(() => setAiSuccess(false), 3500);
      }
    } catch (err) {
      console.error('Falha ao gerar bio com IA:', err);
      setBio(`Com curadoria refinada focada em ${genres.slice(0, 2).join(' e ')}, ${artisticName} constrói narrativas sonoras elegantes para ${audienceContext.toLowerCase()}, unindo transições impecáveis e energia contagiante a partir de ${city.split('-')[0].trim()}.`);
      setAiSuccess(true);
      setTimeout(() => setAiSuccess(false), 3500);
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await updateDJProfile({
      artisticName,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ''),
      city,
      bio,
      genres,
      rateRange,
      availability: 'active',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-white/50 mb-1">
            <Link href="/dashboard" className="hover:text-white flex items-center gap-1 transition">
              <ArrowLeft className="w-3.5 h-3.5" /> Painel
            </Link>
            <span>/</span>
            <span className="text-white">Meu Press Kit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Meu Press Kit Oficial
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Sua vitrine pública para contratantes, clubs e agências fecharem datas com você.
          </p>
        </div>

        {/* Alternância Clara: Modo Edição ↔ Modo Prévia */}
        <div className="flex items-center gap-2 bg-[#120F24] p-1.5 rounded-2xl border border-white/10 shadow-lg">
          <button
            onClick={() => setViewMode('edit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'edit'
                ? 'bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white shadow-[0_0_15px_rgba(138,63,252,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modo Edição</span>
          </button>

          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'preview'
                ? 'bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white shadow-[0_0_15px_rgba(138,63,252,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Modo Prévia</span>
          </button>
        </div>
      </div>

      {/* Checklist de Completude Visível */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0E0C1B] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Qualidade do Press Kit
            </span>
            <span className="text-xs font-extrabold text-[#00D1FF] bg-[#00D1FF]/10 px-2 py-0.5 rounded-md border border-[#00D1FF]/20">
              {completenessPercent}% Completo
            </span>
          </div>
          <p className="text-[11px] text-white/50">
            Perfis com 100% de preenchimento têm 4x mais chances de fechamento imediato.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition ${
                item.completed
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              {item.completed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-white/30 shrink-0" />
              )}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Press Kit atualizado com sucesso! As alterações já estão visíveis para os contratantes.</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW MODE: PREVIEW (Como o Contratante Vê)                     */}
      {/* ============================================================== */}
      {viewMode === 'preview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
            <span className="text-white/60">
              Visualização fiel da página pública de contratação: <strong className="text-white">beatflow.art/{slug}</strong>
            </span>
            <Link href={`/${slug}`} target="_blank">
              <Button size="sm" variant="outline" className="bg-white/5 border-white/15 text-white text-xs h-8 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer">
                <span>Abrir em Nova Aba</span>
                <ExternalLink className="w-3 h-3 text-[#00D1FF]" />
              </Button>
            </Link>
          </div>

          <div className="rounded-3xl bg-[#090812] border border-white/15 p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#8A3FFC] blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D1FF] blur-3xl rounded-full" />
            </div>

            {/* Top Artist Hero */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-white/10">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#8A3FFC] shadow-2xl shrink-0">
                <Image
                  src={djProfile?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"}
                  alt={artisticName}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-center md:text-left space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{artisticName}</h2>
                  <VerificadoBadge size={20} />
                </div>

                <p className="text-xs text-white/60 flex items-center justify-center md:justify-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00D1FF]" />
                  <span>{city}</span>
                  <span>•</span>
                  <span>Cachê Base: <strong className="text-white">{rateRange}</strong></span>
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-1">
                  {genres.map(g => (
                    <GenreTag key={g} genre={g} size="sm" />
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-2">
                <Button className="bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white font-bold text-xs h-11 px-6 rounded-xl shadow-lg cursor-pointer">
                  Contratar Agora com 50% de Sinal
                </Button>
                <span className="text-[10px] text-white/40 text-center">Proteção integral Beat Flow</span>
              </div>
            </div>

            {/* Bio & Som */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Biografia Oficial</h3>
                <p className="text-sm text-white/90 leading-relaxed font-light">
                  {bio}
                </p>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">Rider Técnico Solicitado</h4>
                  <div className="flex flex-wrap gap-2">
                    {rider.map(rId => {
                      const opt = RIDER_OPTIONS.find(o => o.id === rId);
                      return opt ? (
                        <span key={rId} className="text-xs px-3 py-1 rounded-xl bg-white/5 border border-white/15 text-white/80 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#00D1FF]" /> {opt.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Player de Áudio</h3>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF5500]/20 flex items-center justify-center text-[#FF5500]">
                      <SoundCloudIcon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">Último Set Oficial</h4>
                      <p className="text-[11px] text-white/50 truncate">{soundcloud}</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] w-2/3" />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>34:12</span>
                    <span>1:18:40</span>
                  </div>
                </div>

                {gallery.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Galeria Visual</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {gallery.map((img, i) => (
                        <div key={i} className="aspect-video relative rounded-xl overflow-hidden border border-white/10">
                          <Image src={img} alt="Live" fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW MODE: EDIT (Visual Builder com Abas e IA Contextual)      */}
      {/* ============================================================== */}
      {viewMode === 'edit' && (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Navegação Tabulada do Visual Builder */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('atmosphere')}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'atmosphere'
                  ? 'bg-gradient-to-r from-purple-500/20 to-sky-500/20 text-white border border-sky-400/40 shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              <span>Atmosfera & Universo</span>
              <span className="px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-300 text-[10px] font-mono">
                Tokens
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bio')}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'bio'
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#8A3FFC]" />
              <span>Identidade & Biografia</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('music')}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'music'
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5 text-orange-400" />
              <span>Áudio & Redes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rider')}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'rider'
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#00D1FF]" />
              <span>Rider & Cachê</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>Galeria de Palco</span>
            </button>
          </div>

          {/* ABA 0: ATMOSFERA & UNIVERSO VISUAL (TROCA DE TOKENS EM TEMPO REAL) */}
          {activeTab === 'atmosphere' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Notificação de Atualização Imediata */}
              {atmosphereChangedNotice && (
                <div className="p-4 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-between gap-3 text-xs text-sky-200 animate-in fade-in">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>
                      Atmosfera <strong>{currentAtmosphere.name}</strong> ativada! Os tokens visuais de background, iluminação e partículas foram sincronizados instantaneamente no componente <strong>ArtistExperience</strong>.
                    </span>
                  </div>
                  <Link 
                    href={`/${currentSlug}`} 
                    target="_blank"
                    className="font-bold underline text-white hover:text-sky-300 shrink-0"
                  >
                    Ver ao Vivo →
                  </Link>
                </div>
              )}

              {/* Seletor de Presets de Atmosfera */}
              <div className="p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Palette className="w-4 h-4 text-sky-400" /> Escolha o Preset de Atmosfera Cênica
                    </h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      Altera dinamicamente os tokens cromáticos, partículas do canvas, gradientes e iluminação volumétrica do perfil público.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0">
                    Sincronização Reativa Ativa
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {Object.values(ATMOSPHERE_PRESETS).map((preset) => {
                    const isSelected = preset.id === selectedAtmosphereId;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectAtmosphere(preset.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                          isSelected
                            ? 'border-white bg-white/10 shadow-2xl scale-[1.01]'
                            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                        }`}
                      >
                        {/* Micro Background Glow Preview */}
                        <div 
                          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-70 transition"
                          style={{ backgroundColor: preset.lighting.primaryGlow }}
                        />

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white group-hover:text-white transition">
                            {preset.name}
                          </span>
                          {isSelected && (
                            <span 
                              className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-black"
                              style={{ backgroundColor: preset.lighting.primaryGlow }}
                            >
                              ATIVO
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-white/60 mb-3 leading-snug line-clamp-2">
                          {preset.description}
                        </p>

                        {/* Tokens Visuais da Atmosfera */}
                        <div className="space-y-2 pt-2 border-t border-white/10 text-[10px] font-mono">
                          {/* Cores de Iluminação */}
                          <div className="flex items-center justify-between">
                            <span className="text-white/40">Luzes Cênicas:</span>
                            <div className="flex items-center gap-1.5">
                              <span 
                                className="w-3.5 h-3.5 rounded-full border border-white/20" 
                                style={{ backgroundColor: preset.lighting.primaryGlow }} 
                                title={`Luz Primária: ${preset.lighting.primaryGlow}`}
                              />
                              <span 
                                className="w-3.5 h-3.5 rounded-full border border-white/20" 
                                style={{ backgroundColor: preset.lighting.secondaryGlow }} 
                                title={`Luz Secundária: ${preset.lighting.secondaryGlow}`}
                              />
                              <span 
                                className="w-3.5 h-3.5 rounded-full border border-white/20" 
                                style={{ backgroundColor: preset.lighting.accentGlow }} 
                                title={`Pulso Laser: ${preset.lighting.accentGlow}`}
                              />
                            </div>
                          </div>

                          {/* Partículas */}
                          <div className="flex items-center justify-between">
                            <span className="text-white/40">Partículas:</span>
                            <span className="text-white/80">
                              {preset.particles.density} nós ({preset.particles.type})
                            </span>
                          </div>

                          {/* Áudio & BPM */}
                          <div className="flex items-center justify-between">
                            <span className="text-white/40">Assinatura Sonora:</span>
                            <span className="text-sky-300 font-bold">
                              {preset.audioSignature.suggestedBpm} BPM
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAtmosphere(preset.id);
                          }}
                          className={`w-full mt-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black shadow-md'
                              : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-black" />
                              <span>Atmosfera em Execução</span>
                            </>
                          ) : (
                            <span>Aplicar Esta Atmosfera</span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inspeção em Tempo Real dos Tokens Selecionados */}
              <div className="p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" /> Telemetria de Tokens Visuais Atuais
                  </h3>
                  <span className="text-xs font-mono text-white/50">{currentAtmosphere.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  {/* Token 1: Background & Vignette */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] text-white/40 uppercase block">1. Background Token</span>
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-4 h-4 rounded-md border border-white/30" 
                        style={{ backgroundColor: currentAtmosphere.background.baseColor }}
                      />
                      <span className="font-bold text-white">{currentAtmosphere.background.baseColor}</span>
                    </div>
                    <div className="text-[11px] text-white/60">
                      Vinheta periférica: {Math.round(currentAtmosphere.background.vignetteOpacity * 100)}%
                    </div>
                  </div>

                  {/* Token 2: Volumetric Lighting */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] text-white/40 uppercase block">2. Iluminação Volumétrica</span>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentAtmosphere.lighting.primaryGlow }} />
                        <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: currentAtmosphere.lighting.secondaryGlow }} />
                      </div>
                      <span className="font-bold text-white">{currentAtmosphere.lighting.beamAngle}° Feixe</span>
                    </div>
                    <div className="text-[11px] text-white/60">
                      Intensidade: {Math.round(currentAtmosphere.lighting.glowIntensity * 100)}%
                    </div>
                  </div>

                  {/* Token 3: Particles & Smoke */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] text-white/40 uppercase block">3. Partículas & Densidade</span>
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-4 h-4 rounded-full border border-white/30" 
                        style={{ backgroundColor: currentAtmosphere.particles.color }}
                      />
                      <span className="font-bold text-white">{currentAtmosphere.particles.density} nós</span>
                    </div>
                    <div className="text-[11px] text-white/60">
                      Velocidade: {currentAtmosphere.particles.speed}x · {currentAtmosphere.particles.type}
                    </div>
                  </div>
                </div>
              </div>

              {/* Prévia Integrada em Tempo Real do ArtistExperience */}
              <div className="p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-sky-400" /> Prévia ao Vivo do Perfil Público com Atmosfera
                    </h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      Visualização reativa instantânea dos tokens aplicados no componente <strong>ArtistExperience</strong>.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('desktop')}
                        className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                          previewDevice === 'desktop' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'
                        }`}
                        title="Visualização Desktop"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Desktop</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('mobile')}
                        className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                          previewDevice === 'mobile' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'
                        }`}
                        title="Visualização Mobile (390px)"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Mobile</span>
                      </button>
                    </div>

                    <Link href={`/${currentSlug}`} target="_blank">
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/15 text-white text-xs h-8 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer">
                        <span>Página Pública</span>
                        <ExternalLink className="w-3 h-3 text-[#00D1FF]" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Container do Componente ArtistExperience com os tokens selecionados */}
                <div className="w-full flex justify-center bg-black/60 p-4 sm:p-6 rounded-2xl border border-white/10 overflow-hidden">
                  <div 
                    className={`transition-all duration-300 rounded-3xl border border-white/20 overflow-hidden relative shadow-2xl ${
                      previewDevice === 'mobile' 
                        ? 'w-[390px] max-w-full h-[720px] overflow-y-auto' 
                        : 'w-full h-[640px] overflow-y-auto'
                    }`}
                  >
                    <ArtistExperience 
                      djSlug={currentSlug}
                      initialDjData={{
                        name: artisticName,
                        location: city,
                        genres: genres,
                        bio: bio,
                        avatarUrl: djProfile?.avatarUrl,
                      }}
                      overrideAtmosphere={currentAtmosphere}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 1: IDENTIDADE & BIOGRAFIA COM IA CONTEXTUAL */}
          {activeTab === 'bio' && (
            <div className="space-y-6">
              {/* Header de Identidade */}
              <div className="p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-[#8A3FFC]" /> Dados Básicos do Artista
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-white/50 mb-1 uppercase tracking-wider">Nome Artístico</label>
                    <input
                      type="text"
                      value={artisticName}
                      onChange={(e) => setArtisticName(e.target.value)}
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3.5 text-xs text-white focus:outline-none focus:border-[#8A3FFC]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-white/50 mb-1 uppercase tracking-wider">Cidade Base</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3.5 text-xs text-white focus:outline-none focus:border-[#8A3FFC]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-white/50 mb-1 uppercase tracking-wider">Link Exclusivo</label>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 h-11 text-xs text-white/50 focus-within:border-[#8A3FFC]">
                      <span>beatflow.art/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className="bg-transparent text-white focus:outline-none flex-1 ml-1 text-xs"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Assistente IA Contextual de Biografia */}
              <div className="p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00D1FF]" /> Biografia Artística & Adaptação de Público
                    </h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      Gere textos de alto impacto adaptados para seu público alvo principal.
                    </p>
                  </div>

                  {/* Seletor de Público Alvo */}
                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    {(['Clubs & Festivais', 'Corporativo Premium', 'Casamentos & Privados'] as AudienceContext[]).map((aud) => (
                      <button
                        key={aud}
                        type="button"
                        onClick={() => setAudienceContext(aud)}
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          audienceContext === aud
                            ? 'bg-[#8A3FFC] text-white'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {aud}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl bg-black/40 border border-white/10 focus-within:border-[#8A3FFC] transition overflow-hidden">
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Escreva sobre sua identidade artística ou use o assistente IA..."
                    className="w-full bg-transparent p-4 pb-14 text-xs text-white placeholder:text-white/30 focus:outline-none resize-none leading-relaxed"
                  />

                  <div className="absolute right-3 bottom-3 flex items-center gap-3">
                    {aiSuccess && (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 animate-in fade-in">
                        <Check className="w-3.5 h-3.5" /> Biografia adaptada com sucesso!
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={handleGenerateAIBio}
                      disabled={isGeneratingBio}
                      className="bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] hover:opacity-95 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      {isGeneratingBio ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Aperfeiçoando texto...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Refinar para {audienceContext}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 2: ÁUDIO & REDES */}
          {activeTab === 'music' && (
            <div className="p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-6 shadow-xl">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <WaveformIcon size={18} color="#FF5500" /> Presença Sonora & Redes Sociais
                </h3>
                <p className="text-xs text-white/50">
                  Insira os links que serão exibidos no player interativo e nos botões de mídia do seu Press Kit.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-white/70 mb-1 uppercase tracking-wider">Set Principal (SoundCloud)</label>
                  <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-3.5 h-11 text-xs text-white focus-within:border-[#FF5500] transition">
                    <SoundCloudIcon size={18} className="mr-2.5 text-[#FF5500] shrink-0" />
                    <input
                      type="url"
                      value={soundcloud}
                      onChange={(e) => setSoundcloud(e.target.value)}
                      placeholder="https://soundcloud.com/..."
                      className="bg-transparent text-white focus:outline-none flex-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/70 mb-1 uppercase tracking-wider">Perfil no Spotify</label>
                  <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-3.5 h-11 text-xs text-white focus-within:border-[#1DB954] transition">
                    <SpotifyIcon size={18} className="mr-2.5 text-[#1DB954] shrink-0" />
                    <input
                      type="url"
                      value={spotify}
                      onChange={(e) => setSpotify(e.target.value)}
                      placeholder="https://open.spotify.com/..."
                      className="bg-transparent text-white focus:outline-none flex-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/70 mb-1 uppercase tracking-wider">Instagram Oficial</label>
                  <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-3.5 h-11 text-xs text-white focus-within:border-[#E1306C] transition">
                    <Instagram className="w-4 h-4 mr-2.5 text-[#E1306C] shrink-0" />
                    <input
                      type="url"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="bg-transparent text-white focus:outline-none flex-1 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: RIDER TÉCNICO & CACHÊ */}
          {activeTab === 'rider' && (
            <div className="p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-6 shadow-xl">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00D1FF]" /> Setup de Cabine & Expectativa de Cachê
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Estes itens definem a compatibilidade automática de rider com as propostas recebidas.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/70 mb-2 uppercase tracking-wider">
                  Faixa de Cachê Sugerida (Base)
                </label>
                <input
                  type="text"
                  value={rateRange}
                  onChange={(e) => setRateRange(e.target.value)}
                  placeholder="Ex: R$ 3.500 - 8.000"
                  className="w-full sm:w-80 h-11 bg-white/5 border border-white/10 rounded-xl px-3.5 text-xs text-white focus:outline-none focus:border-[#8A3FFC]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/70 mb-2 uppercase tracking-wider">
                  Equipamentos Aceitos no seu Rider
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {RIDER_OPTIONS.map((opt) => {
                    const isSelected = rider.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleRider(opt.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                          isSelected 
                            ? 'bg-[#00D1FF]/10 border border-[#00D1FF]/40 text-[#00D1FF]' 
                            : 'bg-black/40 border border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center ${isSelected ? 'border-[#00D1FF] bg-[#00D1FF]/20' : 'border-white/20'}`}>
                          {isSelected && <Check className="w-2.5 h-2.5 text-[#00D1FF]" />}
                        </div>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/70 mb-2 uppercase tracking-wider">
                  Gêneros Musicais
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRE_CHOICES.map((g) => {
                    const isSelected = genres.includes(g);
                    return (
                      <GenreTag
                        key={g}
                        genre={g}
                        active={isSelected}
                        onClick={() => toggleGenre(g)}
                        size="md"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: GALERIA DE PALCO */}
          {activeTab === 'gallery' && (
            <div className="p-6 rounded-3xl bg-[#0E0C1B] border border-white/10 space-y-6 shadow-xl">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-pink-400" /> Galeria Visual do Artista
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Fotos profissionais da cabine, momentos de pista cheia ou retratos editoriais.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {gallery.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                    <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-2">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] hover:opacity-95 text-white font-bold text-xs px-8 h-12 rounded-xl shadow-xl transition cursor-pointer"
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
