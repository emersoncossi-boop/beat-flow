'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Sparkles, 
  Layers, 
  Sliders, 
  Activity, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Play, 
  Pause, 
  Check, 
  ExternalLink, 
  UploadCloud, 
  Wand2, 
  Eye, 
  Send, 
  Disc3, 
  Music, 
  Calendar, 
  FileText, 
  Camera, 
  ShieldCheck, 
  Radio, 
  Flame,
  ArrowRight,
  ChevronRight,
  GripVertical
} from 'lucide-react';

type ConceptTab = 'artista' | 'cena' | 'composicao' | 'conteudo' | 'movimento';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export default function ArtistCanvasPage() {
  const { djProfile, updateDJProfile } = useAuth();

  // Active Concept Selection
  const [activeConcept, setActiveConcept] = useState<ConceptTab>('cena');
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  // 1. ARTISTA State
  const [artistName, setArtistName] = useState(djProfile?.artisticName || 'Emerson Cossi');
  const [artistSlug, setArtistSlug] = useState(djProfile?.slug || 'emerson-cossi');
  const [artistGenre, setArtistGenre] = useState('Afro House Â· Deep Tech');
  const [artistPhoto, setArtistPhoto] = useState(
    djProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop'
  );
  const [artistPosition, setArtistPosition] = useState<'left' | 'center' | 'right'>('center');
  const [photoIntegration, setPhotoIntegration] = useState<number>(75); // 0 = Natural, 100 = Imersivo

  // 2. CENA State (Universe Families)
  const [sceneFamily, setSceneFamily] = useState<'noir' | 'sunset' | 'ice' | 'raw' | 'cosmic' | 'liquid'>('cosmic');
  const [atmosphereIntensity, setAtmosphereIntensity] = useState<number>(80); // 0 = Sutil, 100 = Imersiva
  const [primaryGlow, setPrimaryGlow] = useState('#00D1FF');
  const [secondaryGlow, setSecondaryGlow] = useState('#8A3FFC');

  // 3. COMPOSIÃ‡ÃƒO State (Approved Structures)
  const [compositionType, setCompositionType] = useState<'editorial-left' | 'cinematic-center' | 'artist-right' | 'full-bleed'>('cinematic-center');

  // 4. CONTEÃšDO State (Module Reordering in Zone 3)
  const [contentOrder, setContentOrder] = useState<string[]>([
    'MÃºsica em Destaque',
    'Agenda & TurnÃª',
    'Sobre o Artista',
    'Galeria de Palco 4K',
    'Press Kit & EPK',
    'Rider TÃ©cnico Homologado',
    'Proposta Formal de Booking'
  ]);

  // 5. MOVIMENTO State
  const [visualEnergy, setVisualEnergy] = useState<number>(65); // 0 = Minimal, 100 = Expressiva
  const [audioReactivity, setAudioReactivity] = useState<boolean>(true);
  const [parallaxEnabled, setParallaxEnabled] = useState<boolean>(true);

  // Scene Family Profiles
  const sceneProfiles = {
    noir: { label: 'Noir & Chrome', primary: '#FFFFFF', secondary: '#94A3B8', bg: '#05060A', desc: 'Preto profundo, lasers prata, contraste editorial de alta moda.' },
    sunset: { label: 'Sunset Organic', primary: '#F59E0B', secondary: '#D97706', bg: '#0A0704', desc: 'Ã‚mbar quente, flares solares, vibe Tulum e Ibiza Sunset.' },
    ice: { label: 'Ice Futuristic', primary: '#38BDF8', secondary: '#0284C7', bg: '#03080F', desc: 'Vidro frio, lasers cianos estilo Afterlife e nÃ©voa volumÃ©trica.' },
    raw: { label: 'Raw Industrial', primary: '#EF4444', secondary: '#B91C1C', bg: '#080303', desc: 'Concreto, strobes vermelhos, energia peak-time underground.' },
    cosmic: { label: 'Cosmic Nebula', primary: '#00D1FF', secondary: '#8A3FFC', bg: '#04050A', desc: 'Profundidade celestial, poeira quÃ¢ntica e luas procedurais.' },
    liquid: { label: 'Liquid Chrome', primary: '#A855F7', secondary: '#EC4899', bg: '#07040C', desc: 'Formas orgÃ¢nicas fluidas, refraÃ§Ãµes de luz e brilho sonoro.' }
  };

  const handleSceneChange = (key: typeof sceneFamily) => {
    setSceneFamily(key);
    setPrimaryGlow(sceneProfiles[key].primary);
    setSecondaryGlow(sceneProfiles[key].secondary);
  };

  // AI Generator: Proposes Scene, Composition, and Motion tailored to the DJ
  const handleGenerateWithAi = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setSceneFamily('cosmic');
      setPrimaryGlow('#00D1FF');
      setSecondaryGlow('#8A3FFC');
      setCompositionType('cinematic-center');
      setAtmosphereIntensity(85);
      setVisualEnergy(70);
      setPhotoIntegration(80);
      setIsAiGenerating(false);
    }, 1200);
  };

  // Publish Universe
  const handlePublish = async () => {
    setIsPublishing(true);
    await updateDJProfile({
      artisticName: artistName,
      slug: artistSlug,
      avatarUrl: artistPhoto
    });
    setIsPublishing(false);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  const activeScene = sceneProfiles[sceneFamily];

  return (
    <div className="h-screen w-full flex flex-col bg-[#05060A] text-white overflow-hidden select-none font-sans">
      
      {/* 1. TOP STUDIO CONTROL BAR */}
      <header className="h-16 px-6 border-b border-white/10 bg-[#08090F]/90 backdrop-blur-2xl flex items-center justify-between shrink-0 z-30">
        
        {/* Left: Brand & DJ Universe Name */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition">
            <span>â† Painel</span>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] font-bold">MEU UNIVERSO:</span>
            <span className="text-sm font-black tracking-tight text-white uppercase">{artistName}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
              â— V2.6 PARAMETRIZADO
            </span>
          </div>
        </div>

        {/* Center: Device Screen Viewport Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition ${
              device === 'desktop' ? 'bg-white text-black font-bold shadow-md' : 'text-white/50 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition ${
              device === 'tablet' ? 'bg-white text-black font-bold shadow-md' : 'text-white/50 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition ${
              device === 'mobile' ? 'bg-white text-black font-bold shadow-md' : 'text-white/50 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: AI Assist, Live View, and Publish Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleGenerateWithAi}
            disabled={isAiGenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 text-xs text-white font-bold transition-all shadow-sm cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#00D1FF]" />
            <span>{isAiGenerating ? 'Sintetizando...' : 'Criar com IA'}</span>
          </button>

          <Link href={`/${artistSlug}`} target="_blank">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Ver Palco</span>
            </button>
          </Link>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black hover:bg-white/90 font-extrabold text-xs transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            {publishSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Publicado!</span>
              </>
            ) : isPublishing ? (
              <span>Gravando...</span>
            ) : (
              <>
                <span>Publicar Universo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN CREATIVE STUDIO BODY (SPLIT 3-ZONE LAYOUT) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* ZONE 1: MINIMAL LEFT BAR (THE 5 CORE CONCEPTS) */}
        <aside className="w-20 sm:w-28 border-r border-white/10 bg-[#07080E] flex flex-col items-center py-6 gap-3 shrink-0 z-20">
          <div className="text-[9px] font-mono uppercase text-white/30 tracking-widest mb-1">
            ESTÃšDIO
          </div>

          {[
            { id: 'artista', label: 'ARTISTA', icon: User },
            { id: 'cena', label: 'CENA', icon: Sparkles },
            { id: 'composicao', label: 'COMPOSIÃ‡ÃƒO', icon: Layers },
            { id: 'conteudo', label: 'CONTEÃšDO', icon: Sliders },
            { id: 'movimento', label: 'MOVIMENTO', icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeConcept === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveConcept(tab.id as ConceptTab)}
                className={`w-16 sm:w-20 py-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] font-black scale-105'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* ZONE 2: CENTER VIEWPORT PREVIEW (RESPONSIVE LIVE STAGE CANVAS) */}
        <main className="flex-1 bg-[#020306] flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
          
          {/* Ambient Lighting Spill matching the active scene */}
          <div 
            className="absolute inset-0 blur-[160px] opacity-25 pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse at center, ${primaryGlow} 0%, ${secondaryGlow} 50%, transparent 80%)`
            }}
          />

          {/* Interactive Screen Frame container */}
          <div 
            className={`h-full rounded-3xl border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-y-auto transition-all duration-500 relative flex flex-col justify-between ${
              device === 'desktop' 
                ? 'w-full max-w-[1240px]' 
                : device === 'tablet' 
                  ? 'w-[768px]' 
                  : 'w-[390px] rounded-[44px] border-2 border-white/20'
            }`}
            style={{
              backgroundColor: activeScene.bg,
              boxShadow: `0 20px 80px -15px ${primaryGlow}33`
            }}
          >
            
            {/* HERO STAGE SECTION (85vh impact) */}
            <div className="relative min-h-[540px] flex flex-col justify-between p-6 sm:p-10 overflow-hidden">
              
              {/* Layer 01: Procedural Scene Lighting & Texture */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${primaryGlow}22 0%, ${secondaryGlow}11 45%, transparent 75%)`,
                  opacity: atmosphereIntensity / 100
                }}
              />

              {/* Layer 02: Artist Media (integrated directly into the space) */}
              <div 
                onClick={() => setActiveConcept('artista')}
                className={`absolute inset-0 flex items-center cursor-pointer transition-all duration-500 ${
                  artistPosition === 'left' ? 'justify-start pl-8' : artistPosition === 'right' ? 'justify-end pr-8' : 'justify-center'
                }`}
              >
                <div 
                  className="relative h-[85%] aspect-[3/4] transition-all duration-700 hover:scale-102"
                  style={{
                    filter: `drop-shadow(0 0 ${photoIntegration * 0.4}px ${primaryGlow}44)`
                  }}
                >
                  <Image
                    src={artistPhoto}
                    alt={artistName}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover object-top rounded-3xl opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </div>
              </div>

              {/* Top Header of Stage */}
              <div className="relative z-10 flex items-center justify-between">
                <div 
                  onClick={() => setActiveConcept('cena')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono cursor-pointer hover:border-white/30 transition"
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryGlow }} />
                  <span>UNIVERSO {activeScene.label.toUpperCase()}</span>
                </div>

                <div 
                  onClick={() => setActiveConcept('conteudo')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-400 cursor-pointer"
                >
                  <Radio className="w-3 h-3" />
                  <span>DISPONÃVEL TURNÃŠ 2026</span>
                </div>
              </div>

              {/* Bottom Identity & Sound Player of Stage */}
              <div className="relative z-10 space-y-4 text-left max-w-xl">
                
                {/* Artist Name & Positioning */}
                <div 
                  onClick={() => setActiveConcept('artista')}
                  className="space-y-1 cursor-pointer hover:opacity-90 transition"
                >
                  <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none drop-shadow-xl">
                    {artistName}
                  </h1>
                  <p className="text-sm text-white/80 font-light">
                    {artistGenre}
                  </p>
                </div>

                {/* Primary Audio Player */}
                <div 
                  onClick={() => setActiveConcept('conteudo')}
                  className="p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 flex items-center justify-between gap-3 shadow-2xl cursor-pointer hover:border-white/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlayingPreview(!isPlayingPreview);
                      }}
                      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition flex-shrink-0 cursor-pointer"
                    >
                      {isPlayingPreview ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                    </button>
                    <div>
                      <span className="text-xs font-bold text-white block">Midnight Ritual (Original Mix)</span>
                      <span className="text-[10px] font-mono text-white/50 block">Master Hi-Fi Â· 124 BPM</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 h-5 px-2">
                    {[35, 80, 50, 100, 65, 40, 90, 30, 75, 45].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full transition-all"
                        style={{
                          height: isPlayingPreview ? `${h}%` : '25%',
                          backgroundColor: primaryGlow,
                          opacity: isPlayingPreview ? 1 : 0.4
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  type="button"
                  className="w-full py-3.5 rounded-2xl bg-white text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/95 transition shadow-2xl cursor-pointer"
                >
                  <span>Pedir Proposta de Show</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>

            {/* LOWER NARRATIVE CHAPTERS TEASER */}
            <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md space-y-4 text-left">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>PROGRESSÃƒO NARRATIVA:</span>
                <span>7 MÃ“DULOS HOMOLOGADOS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {contentOrder.slice(0, 4).map((mod, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/80">
                    <span className="text-white/40 block font-mono text-[10px]">0{i + 1}</span>
                    <span className="truncate block">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>

        {/* ZONE 3: RIGHT CONTEXTUAL DRAWER (DESIGN SYSTEM PARAMETER CONTROLS) */}
        <aside className="w-80 sm:w-96 border-l border-white/10 bg-[#08090F] p-6 overflow-y-auto shrink-0 z-20 text-left space-y-6">
          
          {/* Header of Contextual Drawer */}
          <div className="space-y-1 pb-4 border-b border-white/10">
            <span className="text-[10px] font-mono text-[#00D1FF] uppercase font-bold tracking-wider">
              PARÃ‚METROS GUIADOS
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {activeConcept === 'artista' && 'ConfiguraÃ§Ãµes do Artista'}
              {activeConcept === 'cena' && 'Atmosfera da Cena'}
              {activeConcept === 'composicao' && 'ComposiÃ§Ã£o do Palco'}
              {activeConcept === 'conteudo' && 'OrganizaÃ§Ã£o de ConteÃºdo'}
              {activeConcept === 'movimento' && 'Energia & Movimento'}
            </h2>
            <p className="text-xs text-white/50">
              {activeConcept === 'artista' && 'Integre sua foto sem criar caixas artificiais.'}
              {activeConcept === 'cena' && 'Escolha a frequÃªncia e as cores que dialogam com seu som.'}
              {activeConcept === 'composicao' && 'Estruturas de palco aprovadas pelo design system.'}
              {activeConcept === 'conteudo' && 'Reordene os capÃ­tulos da sua narrativa.'}
              {activeConcept === 'movimento' && 'Ajuste a intensidade cÃªnica e reatividade sonora.'}
            </p>
          </div>

          {/* CONTROLS FOR ARTISTA */}
          {activeConcept === 'artista' && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70">Nome ArtÃ­stico</label>
                <input
                  type="text"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-white/30 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70">Vertente / GÃªnero Principal</label>
                <input
                  type="text"
                  value={artistGenre}
                  onChange={(e) => setArtistGenre(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-white/30 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70">Foto do Palco / Editorial</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={artistPhoto}
                    onChange={(e) => setArtistPhoto(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 focus:border-white/30 outline-none truncate"
                  />
                </div>
              </div>

              {/* Posicionamento em Ãreas Inteligentes */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70">PosiÃ§Ã£o no Palco (Snap Inteligente)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['left', 'center', 'right'] as const).map(pos => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setArtistPosition(pos)}
                      className={`py-2 rounded-xl text-xs font-mono uppercase transition cursor-pointer ${
                        artistPosition === pos ? 'bg-white text-black font-bold shadow-md' : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {pos === 'left' ? 'Esquerda' : pos === 'center' ? 'Centro' : 'Direita'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Universal Slider: IntegraÃ§Ã£o com Ambiente */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70">INTEGRAÃ‡ÃƒO CÃŠNICA</span>
                  <span className="text-[#00D1FF] font-bold">
                    {photoIntegration < 30 ? 'Natural' : photoIntegration < 70 ? 'Integrado' : 'CinematogrÃ¡fico'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={photoIntegration}
                  onChange={(e) => setPhotoIntegration(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>Natural</span>
                  <span>Imersivo</span>
                </div>
              </div>
            </div>
          )}

          {/* CONTROLS FOR CENA */}
          {activeConcept === 'cena' && (
            <div className="space-y-5">
              <label className="text-xs font-mono text-white/70 block">FamÃ­lia de Universo Visual</label>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(sceneProfiles) as Array<keyof typeof sceneProfiles>).map(key => {
                  const sc = sceneProfiles[key];
                  const isSelected = sceneFamily === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSceneChange(key)}
                      className={`p-3 rounded-2xl border text-left space-y-1 transition cursor-pointer ${
                        isSelected 
                          ? 'bg-white/10 border-white shadow-lg scale-102' 
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sc.primary }} />
                        <span className="text-xs font-bold text-white">{sc.label}</span>
                      </div>
                      <p className="text-[10px] text-white/50 leading-tight">{sc.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Universal Slider: Atmosfera */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70">INTENSIDADE DA ATMOSFERA</span>
                  <span className="text-[#00D1FF] font-bold">{atmosphereIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={atmosphereIntensity}
                  onChange={(e) => setAtmosphereIntensity(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>Sutil</span>
                  <span>Imersiva</span>
                </div>
              </div>
            </div>
          )}

          {/* CONTROLS FOR COMPOSIÃ‡ÃƒO */}
          {activeConcept === 'composicao' && (
            <div className="space-y-5">
              <label className="text-xs font-mono text-white/70 block">Estruturas de Palco Homologadas</label>
              {[
                { id: 'cinematic-center', title: 'Cinematic Center', desc: 'Artista central, iluminaÃ§Ã£o de fundo monumental e CTAs inferiores.' },
                { id: 'editorial-left', title: 'Editorial Left', desc: 'Artista Ã  esquerda, tipografia pesada e espaÃ§o de respiro Ã  direita.' },
                { id: 'artist-right', title: 'Artist Right', desc: 'Identidade Ã  esquerda com amplo espaÃ§o negativo e foto imersiva.' },
                { id: 'full-bleed', title: 'Full Bleed', desc: 'MÃ­dia ocupa 100% da viewport com interface minimalista flutuante.' }
              ].map(comp => (
                <div
                  key={comp.id}
                  onClick={() => setCompositionType(comp.id as any)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-1 ${
                    compositionType === comp.id ? 'bg-white/10 border-white shadow-md' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <h4 className="text-xs font-bold text-white uppercase">{comp.title}</h4>
                  <p className="text-[11px] text-white/60">{comp.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* CONTROLS FOR CONTEÃšDO */}
          {activeConcept === 'conteudo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-white/70">Organizar CapÃ­tulos da PÃ¡gina</label>
                <span className="text-[10px] font-mono text-white/40">Snap por Zonas</span>
              </div>

              <div className="space-y-2">
                {contentOrder.map((mod, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs text-white/80 hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <GripVertical className="w-3.5 h-3.5 text-white/40" />
                      <span>{mod}</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">ZONA 03</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTROLS FOR MOVIMENTO */}
          {activeConcept === 'movimento' && (
            <div className="space-y-5">
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70">ENERGIA VISUAL</span>
                  <span className="text-purple-400 font-bold">{visualEnergy}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={visualEnergy}
                  onChange={(e) => setVisualEnergy(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>Minimal</span>
                  <span>Expressiva</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
                  <span className="text-xs text-white">Reatividade Sonora ao Set</span>
                  <input
                    type="checkbox"
                    checked={audioReactivity}
                    onChange={(e) => setAudioReactivity(e.target.checked)}
                    className="w-4 h-4 accent-[#00D1FF]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
                  <span className="text-xs text-white">Profundidade 3D / Parallax</span>
                  <input
                    type="checkbox"
                    checked={parallaxEnabled}
                    onChange={(e) => setParallaxEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#00D1FF]"
                  />
                </label>
              </div>
            </div>
          )}

        </aside>

      </div>
    </div>
  );
}