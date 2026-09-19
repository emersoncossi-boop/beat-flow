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
  GripVertical,
  Crown,
  Lock,
  Zap,
  CheckCircle2,
  X,
  Globe,
  SlidersHorizontal,
  Volume2
} from 'lucide-react';

type ConceptTab = 'artista' | 'cena' | 'composicao' | 'conteudo' | 'movimento';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';
type PlanTier = 'ESSENTIAL' | 'PRO' | 'SIGNATURE';

export default function ArtistCanvasPage() {
  const { djProfile, updateDJProfile } = useAuth();

  // Active Concept & Device Selection
  const [activeConcept, setActiveConcept] = useState<ConceptTab>('cena');
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);

  // Active User Plan (Can be toggled to experience all tiers)
  const [currentPlan, setCurrentPlan] = useState<PlanTier>('PRO');

  // 1. ARTISTA State
  const [artistName, setArtistName] = useState(djProfile?.artisticName || 'Emerson Cossi');
  const [artistSlug, setArtistSlug] = useState(djProfile?.slug || 'emerson-cossi');
  const [artistGenre, setArtistGenre] = useState('Afro House Â· Deep Tech');
  const [artistPhoto, setArtistPhoto] = useState(
    djProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop'
  );
  const [artistPosition, setArtistPosition] = useState<'left' | 'center' | 'right'>('center');
  const [photoIntegration, setPhotoIntegration] = useState<number>(75); // 0 = Natural, 100 = Imersivo

  // 2. CENA State (Universe Families categorized by Plan Tier)
  const [sceneFamily, setSceneFamily] = useState<string>('cosmic');
  const [atmosphereIntensity, setAtmosphereIntensity] = useState<number>(80); // 0 = Sutil, 100 = Imersiva
  const [primaryGlow, setPrimaryGlow] = useState('#00D1FF');
  const [secondaryGlow, setSecondaryGlow] = useState('#8A3FFC');
  const [colorTemperature, setColorTemperature] = useState<number>(5500); // Kelvin

  // 3. COMPOSIÃ‡ÃƒO State (Approved Structures)
  const [compositionType, setCompositionType] = useState<'editorial-left' | 'cinematic-center' | 'artist-right' | 'full-bleed'>('cinematic-center');

  // 4. CONTEÃšDO State (Module Reordering in Zone 3)
  const [contentModules, setContentModules] = useState([
    { id: 'musica', name: 'MÃºsica em Destaque & Player', enabled: true, tier: 'ESSENTIAL' },
    { id: 'agenda', name: 'Agenda & PrÃ³ximas Datas', enabled: true, tier: 'ESSENTIAL' },
    { id: 'sobre', name: 'Sobre o Artista & Universo', enabled: true, tier: 'ESSENTIAL' },
    { id: 'galeria', name: 'Galeria de Palco 4K', enabled: true, tier: 'ESSENTIAL' },
    { id: 'epk', name: 'Press Kit / EPK (1-Click Alta ResoluÃ§Ã£o)', enabled: true, tier: 'PRO' },
    { id: 'rider', name: 'Rider TÃ©cnico Homologado & Mapa de Palco', enabled: true, tier: 'PRO' },
    { id: 'booking', name: 'Proposta Formal de Booking / WhatsApp Direto', enabled: true, tier: 'PRO' },
    { id: 'whitelabel', name: 'DomÃ­nio PrÃ³prio White Label (djemersoncossi.com)', enabled: false, tier: 'SIGNATURE' },
    { id: 'multiprofile', name: 'Multi-Perfil (Club vs Festival vs Private)', enabled: false, tier: 'SIGNATURE' }
  ]);

  // 5. MOVIMENTO State
  const [visualEnergy, setVisualEnergy] = useState<number>(65); // 0 = Minimal, 100 = Expressiva
  const [audioReactivity, setAudioReactivity] = useState<boolean>(true); // PRO
  const [parallaxEnabled, setParallaxEnabled] = useState<boolean>(true); // PRO
  const [webglParticles, setWebglParticles] = useState<boolean>(false); // SIGNATURE
  const [spatialAudio, setSpatialAudio] = useState<boolean>(false); // SIGNATURE

  // Scene Definitions categorized by Tier
  const allScenes: Record<string, { label: string; primary: string; secondary: string; bg: string; desc: string; tier: PlanTier }> = {
    // ESSENTIAL
    noir: { label: 'Noir & Chrome', primary: '#FFFFFF', secondary: '#94A3B8', bg: '#05060A', desc: 'Preto profundo, lasers prata, contraste editorial de alta moda.', tier: 'ESSENTIAL' },
    minimal: { label: 'Minimal Monochrome', primary: '#E2E8F0', secondary: '#64748B', bg: '#040508', desc: 'Tipografia dominante, precisÃ£o cirÃºrgica e luz direta suave.', tier: 'ESSENTIAL' },
    sunset: { label: 'Sunset Organic', primary: '#F59E0B', secondary: '#D97706', bg: '#0A0704', desc: 'Ã‚mbar quente, flares solares, vibe Tulum e Ibiza Sunset.', tier: 'ESSENTIAL' },
    darkclub: { label: 'Dark Club Red', primary: '#EF4444', secondary: '#991B1B', bg: '#080303', desc: 'Concreto brutalista, strobes vermelhos e atmosfera clubber.', tier: 'ESSENTIAL' },
    // PRO
    liquid: { label: 'Liquid Chrome', primary: '#A855F7', secondary: '#EC4899', bg: '#07040C', desc: 'Formas orgÃ¢nicas fluidas, refraÃ§Ãµes de luz e brilho sonoro.', tier: 'PRO' },
    ice: { label: 'Ice Futuristic', primary: '#38BDF8', secondary: '#0284C7', bg: '#03080F', desc: 'Vidro frio, lasers cianos estilo Afterlife e nÃ©voa volumÃ©trica.', tier: 'PRO' },
    raw: { label: 'Raw Industrial', primary: '#F97316', secondary: '#C2410C', bg: '#0A0503', desc: 'Poeira de palco, incandescentes vintage e energia rave visceral.', tier: 'PRO' },
    cosmic: { label: 'Cosmic Nebula', primary: '#00D1FF', secondary: '#8A3FFC', bg: '#04050A', desc: 'Profundidade celestial, poeira quÃ¢ntica e luas procedurais.', tier: 'PRO' },
    aurora: { label: 'Deep Aurora', primary: '#10B981', secondary: '#06B6D4', bg: '#020908', desc: 'Cortinas etÃ©reas boreais que ondulam no ritmo da bateria.', tier: 'PRO' },
    // SIGNATURE
    adaptive_light: { label: 'Luz Adaptativa IA', primary: '#00F5FF', secondary: '#FF0055', bg: '#030308', desc: 'IluminaÃ§Ã£o generativa sintetizada por IA em tempo real conforme as faixas do set.', tier: 'SIGNATURE' },
    reactive_space: { label: 'EspaÃ§o Reativo WebGL', primary: '#8B5CF6', secondary: '#3B82F6', bg: '#05020D', desc: 'Cenografia 3D procedural com partÃ­culas gravitacionais e profundidade de campo.', tier: 'SIGNATURE' },
    kinetic_matter: { label: 'MatÃ©ria CinÃ©tica 3D', primary: '#F43F5E', secondary: '#FB923C', bg: '#0B0205', desc: 'Esculturas digitais vivas que respondem Ã  posiÃ§Ã£o do cursor e transiÃ§Ãµes musicais.', tier: 'SIGNATURE' },
    generative_universe: { label: 'Universo Generativo Exclusivo', primary: '#EAB308', secondary: '#EC4899', bg: '#080703', desc: 'Design System exclusivo sob medida com direÃ§Ã£o criativa humana NEXORA.', tier: 'SIGNATURE' }
  };

  const activeScene = allScenes[sceneFamily] || allScenes.cosmic;

  // Calculate if the current composition requires an upgrade based on current plan
  const getRequiredTier = (): PlanTier => {
    if (activeScene.tier === 'SIGNATURE' || webglParticles || spatialAudio) return 'SIGNATURE';
    if (activeScene.tier === 'PRO' || audioReactivity || parallaxEnabled) return 'PRO';
    return 'ESSENTIAL';
  };

  const requiredTier = getRequiredTier();
  const needsUpgrade = (requiredTier === 'SIGNATURE' && currentPlan !== 'SIGNATURE') ||
                       (requiredTier === 'PRO' && currentPlan === 'ESSENTIAL');

  const handleSceneChange = (key: string) => {
    setSceneFamily(key);
    setPrimaryGlow(allScenes[key].primary);
    setSecondaryGlow(allScenes[key].secondary);
  };

  // AI Generator (Available to Signature, with Preview in Essential/Pro)
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
    }, 1000);
  };

  // Publish Action with tier validation
  const handlePublish = async () => {
    if (needsUpgrade) {
      setPlanModalOpen(true);
      return;
    }
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
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] font-bold">MEU UNIVERSO:</span>
            <span className="text-sm font-black tracking-tight text-white uppercase">{artistName}</span>
            
            {/* Interactive Plan Selector / Badge */}
            <button
              onClick={() => setPlanModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider transition ${
                currentPlan === 'SIGNATURE' 
                  ? 'bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20' 
                  : currentPlan === 'PRO'
                  ? 'bg-[#00D1FF]/10 border border-[#00D1FF]/40 text-[#00D1FF] hover:bg-[#00D1FF]/20'
                  : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20'
              }`}
            >
              <Crown className="w-3 h-3" />
              <span>PLANO {currentPlan}</span>
            </button>
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
            <span>{isAiGenerating ? 'Sintetizando...' : 'DireÃ§Ã£o de Arte IA'}</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/30 text-[9px] font-mono text-amber-300">
              SIGNATURE
            </span>
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
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-extrabold text-xs transition-all shadow-lg active:scale-95 cursor-pointer ${
              needsUpgrade
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            {publishSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Publicado!</span>
              </>
            ) : isPublishing ? (
              <span>Gravando...</span>
            ) : needsUpgrade ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Desbloquear {requiredTier} para Publicar</span>
              </>
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
            CONCEITO
          </div>

          {[
            { id: 'artista', label: 'ARTISTA', icon: User },
            { id: 'cena', label: 'CENA', icon: Sparkles },
            { id: 'composicao', label: 'COMPOSIÃ‡ÃƒO', icon: Layers },
            { id: 'conteudo', label: 'CONTEÃšDO', icon: Sliders },
            { id: 'movimento', label: 'MOVIMENTO', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeConcept === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveConcept(tab.id as ConceptTab)}
                className={`w-16 sm:w-20 py-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-white/15 to-white/5 border border-white/30 text-white shadow-lg'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#00D1FF]' : ''}`} />
                <span className="text-[10px] font-mono font-bold tracking-wider">{tab.label}</span>
              </button>
            );
          })}

          {/* Plan badge & Upgrade trigger */}
          <div className="mt-auto pt-4 flex flex-col items-center gap-2">
            <button
              onClick={() => setPlanModalOpen(true)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition flex flex-col items-center gap-1 cursor-pointer"
              title="Ver Tabela de Planos"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-[9px] font-mono uppercase text-white/40">Planos</span>
            </button>
          </div>
        </aside>

        {/* ZONE 2: CENTER STAGE PREVIEW CANVAS */}
        <main className="flex-1 bg-[#030407] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
          
          {/* Subtle Ambient Studio Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Contextual Tier Upgrade Alert Banner (If feature exceeds active plan) */}
          {needsUpgrade && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-xl flex items-center gap-3 shadow-2xl animate-fade-in">
              <Crown className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs text-amber-200">
                <strong className="font-bold text-amber-300">PrÃ©-visualizaÃ§Ã£o {requiredTier}:</strong> VocÃª pode testar e personalizar livremente. FaÃ§a upgrade para publicar.
              </p>
              <button
                onClick={() => setPlanModalOpen(true)}
                className="px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold transition shadow-sm"
              >
                Desbloquear
              </button>
            </div>
          )}

          {/* Simulated Device Frame */}
          <div 
            className={`h-full max-h-[880px] bg-black rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden transition-all duration-500 flex flex-col ${
              device === 'desktop' ? 'w-full max-w-5xl' : device === 'tablet' ? 'w-[768px]' : 'w-[390px]'
            }`}
          >
            {/* Screen Chrome Header */}
            <div className="h-7 px-4 bg-white/5 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              </div>
              <span className="truncate max-w-[200px]">beatflow.me/{artistSlug}</span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* ARTIST EXPERIENCE PREVIEW VIEWPORT (Direct Touch Canvas) */}
            <div className="flex-1 overflow-y-auto relative scrollbar-none">
              
              {/* STAGE HERO / ZONE 1 & 2 */}
              <div 
                className="min-h-[580px] w-full relative flex items-center justify-center overflow-hidden p-8 transition-colors duration-700 cursor-pointer group"
                style={{ backgroundColor: activeScene.bg }}
                onClick={() => setActiveConcept('cena')}
                title="Clique no fundo do palco para editar a CENA"
              >
                {/* 1. Volumetric Light Aura from Scene */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${primaryGlow}${Math.round(atmosphereIntensity * 0.4).toString(16).padStart(2, '0')} 0%, ${secondaryGlow}${Math.round(atmosphereIntensity * 0.2).toString(16).padStart(2, '0')} 50%, transparent 80%)`
                  }}
                />

                {/* 2. Top Stage Navigation */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">{artistName}</span>
                    {currentPlan === 'ESSENTIAL' && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/40">
                        POWERED BY BEAT FLOW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-wider text-white">
                      BOOKING
                    </button>
                  </div>
                </div>

                {/* 3. Stage Artist & Identity (Composition dependent) */}
                <div className={`relative z-10 w-full flex items-center justify-between gap-8 ${
                  compositionType === 'editorial-left' 
                    ? 'flex-col md:flex-row text-left' 
                    : compositionType === 'artist-right'
                    ? 'flex-col md:flex-row-reverse text-left'
                    : 'flex-col text-center justify-center'
                }`}>
                  
                  {/* Identity Box */}
                  <div 
                    className="max-w-md space-y-3 cursor-pointer hover:opacity-90 transition"
                    onClick={(e) => { e.stopPropagation(); setActiveConcept('artista'); }}
                    title="Clique para editar dados do Artista"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-mono uppercase text-[#00D1FF]">
                      <Radio className="w-3 h-3 animate-pulse" />
                      <span>{artistGenre}</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
                      {artistName}
                    </h1>

                    <p className="text-sm font-light text-white/70 leading-relaxed max-w-sm mx-auto">
                      ExperiÃªncia sonora imersiva. Sets de alta pressÃ£o melÃ³dica e arquitetura rÃ­tmica refinada para pistas exigentes.
                    </p>
                  </div>

                  {/* Monumental Artist Photography */}
                  <div 
                    className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer group/art shrink-0"
                    onClick={(e) => { e.stopPropagation(); setActiveConcept('artista'); }}
                    title="Clique na foto para abrir controles do Artista"
                  >
                    <Image
                      src={artistPhoto}
                      alt={artistName}
                      fill
                      sizes="400px"
                      priority
                      className="object-cover transition-transform duration-700 group-hover/art:scale-105"
                      style={{
                        filter: `contrast(${100 + photoIntegration * 0.2}%) brightness(${100 - photoIntegration * 0.1}%)`
                      }}
                    />
                    
                    {/* Scene Glow Blend Overlay on Artist */}
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${activeScene.bg} 0%, transparent 60%), radial-gradient(circle at 50% 100%, ${primaryGlow}40 0%, transparent 70%)`,
                        opacity: photoIntegration / 100
                      }}
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/art:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <span className="px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-mono font-bold text-white">
                        Editar Foto & Enquadramento
                      </span>
                    </div>
                  </div>

                </div>

                {/* 4. Interactive Music Player Bar (Zone 2) */}
                <div 
                  className="absolute bottom-6 left-6 right-6 z-20 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setActiveConcept('conteudo'); }}
                  title="Clique para editar MÃ³dulos de Som & ConteÃºdo"
                >
                  <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 flex items-center justify-between shadow-2xl hover:border-white/40 transition">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setIsPlayingPreview(!isPlayingPreview); }}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition active:scale-95 shadow-lg"
                      >
                        {isPlayingPreview ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black translate-x-0.5" />}
                      </button>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>Set Oficial â€” Live at Space Miami</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#00D1FF]/20 text-[#00D1FF] text-[9px] font-mono">124 BPM</span>
                        </div>
                        <div className="text-[10px] font-mono text-white/50">Afro House & Melodic Techno â€¢ 1h 24m</div>
                      </div>
                    </div>

                    {/* Equalizer animation */}
                    <div className="flex items-end gap-1 h-5 px-3">
                      {[12, 20, 8, 16, 10, 18, 14, 22].map((height, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full transition-all duration-300"
                          style={{
                            height: isPlayingPreview ? `${Math.random() * 16 + 6}px` : `${height / 2}px`,
                            backgroundColor: primaryGlow
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* MÃ³dulos Funcionais ReordenÃ¡veis (Zone 3 Preview) */}
              <div className="p-6 bg-[#07080E] border-t border-white/10 space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-white/40 uppercase tracking-wider">
                  <span>MÃ³dulos Ativos no Universo</span>
                  <span className="text-[#00D1FF]">{contentModules.filter(m => m.enabled).length} Habilitados</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contentModules.filter(m => m.enabled).map((module) => (
                    <div
                      key={module.id}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs hover:border-white/20 transition"
                    >
                      <div className="flex items-center gap-2.5 text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{module.name}</span>
                      </div>
                      <span className="text-[9px] font-mono text-white/40 px-2 py-0.5 rounded bg-white/5">
                        {module.tier}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </main>

        {/* ZONE 3: PARAMETER DRAWER (RIGHT PANEL) */}
        <aside className="w-80 sm:w-96 border-l border-white/10 bg-[#08090F] flex flex-col p-6 overflow-y-auto shrink-0 z-20">
          
          {/* Active Concept Title */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D1FF] font-bold">PARÃ‚METROS</span>
              <h2 className="text-lg font-black uppercase text-white tracking-tight">
                {activeConcept === 'artista' && '01. Identidade & Foto'}
                {activeConcept === 'cena' && '02. FamÃ­lias de Cena'}
                {activeConcept === 'composicao' && '03. Estrutura do Palco'}
                {activeConcept === 'conteudo' && '04. MÃ³dulos & Som'}
                {activeConcept === 'movimento' && '05. DinÃ¢mica & Luz'}
              </h2>
            </div>
            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
              Auto-Save
            </span>
          </div>

          {/* 1. ARTISTA PARAMETERS */}
          {activeConcept === 'artista' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-white/70">Nome ArtÃ­stico</label>
                <input
                  type="text"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-[#00D1FF] focus:outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-white/70">Slug do Palco</label>
                <div className="flex items-center rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs font-mono text-white/50">
                  <span>beatflow.me/</span>
                  <input
                    type="text"
                    value={artistSlug}
                    onChange={(e) => setArtistSlug(e.target.value)}
                    className="flex-1 bg-transparent text-white focus:outline-none ml-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-white/70">GÃªnero Sonoro Principal</label>
                <input
                  type="text"
                  value={artistGenre}
                  onChange={(e) => setArtistGenre(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-[#00D1FF] focus:outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-white/70">URL da Foto de Palco</label>
                <input
                  type="text"
                  value={artistPhoto}
                  onChange={(e) => setArtistPhoto(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-[#00D1FF] focus:outline-none transition"
                />
              </div>

              {/* Slider 1: IntegraÃ§Ã£o */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-white/70">IntegraÃ§Ã£o da Foto</span>
                  <span className="font-mono text-[#00D1FF]">{photoIntegration}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={photoIntegration}
                  onChange={(e) => setPhotoIntegration(Number(e.target.value))}
                  className="w-full accent-[#00D1FF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>Natural</span>
                  <span>Imersivo</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. CENA PARAMETERS */}
          {activeConcept === 'cena' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono uppercase text-white/70">FamÃ­lias de Universos</label>
                  <span className="text-[10px] font-mono text-white/40">13 Cenas DisponÃ­veis</span>
                </div>

                {/* Categorized Scenes */}
                <div className="space-y-4">
                  {/* ESSENTIAL TIER SCENES */}
                  <div>
                    <div className="text-[10px] font-mono uppercase text-white/40 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-white/50" />
                      <span>Cenas Essential (Inclusas)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(allScenes).filter(([_, s]) => s.tier === 'ESSENTIAL').map(([key, scene]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleSceneChange(key)}
                          className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                            sceneFamily === key
                              ? 'bg-white/15 border-white shadow-lg ring-1 ring-white/40'
                              : 'bg-white/[0.02] border-white/10 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: scene.primary }} />
                            <span className="text-xs font-bold text-white truncate">{scene.label}</span>
                          </div>
                          <span className="text-[9px] font-mono text-white/40">ESSENTIAL</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PRO TIER SCENES */}
                  <div>
                    <div className="text-[10px] font-mono uppercase text-[#00D1FF] mb-2 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#00D1FF]" />
                      <span>Cenas Pro (Expandidas)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(allScenes).filter(([_, s]) => s.tier === 'PRO').map(([key, scene]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleSceneChange(key)}
                          className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                            sceneFamily === key
                              ? 'bg-white/15 border-[#00D1FF] shadow-lg ring-1 ring-[#00D1FF]/40'
                              : 'bg-white/[0.02] border-white/10 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: scene.primary }} />
                              <span className="text-xs font-bold text-white truncate">{scene.label}</span>
                            </div>
                            <span className="px-1 py-0.2 rounded bg-[#00D1FF]/10 text-[8px] font-mono text-[#00D1FF] font-bold">
                              PRO
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SIGNATURE TIER SCENES */}
                  <div>
                    <div className="text-[10px] font-mono uppercase text-amber-400 mb-2 flex items-center gap-1.5">
                      <Crown className="w-3 h-3 text-amber-400" />
                      <span>Cenas Signature (Generativas & Exclusivas)</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(allScenes).filter(([_, s]) => s.tier === 'SIGNATURE').map(([key, scene]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleSceneChange(key)}
                          className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                            sceneFamily === key
                              ? 'bg-amber-500/15 border-amber-400 shadow-lg ring-1 ring-amber-400/40'
                              : 'bg-white/[0.02] border-white/10 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: scene.primary }} />
                              <span className="text-xs font-bold text-white">{scene.label}</span>
                            </div>
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[8px] font-mono text-amber-300 font-bold">
                              SIGNATURE
                            </span>
                          </div>
                          <p className="text-[10px] text-white/50">{scene.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider 2: Atmosfera */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-white/70">Intensidade da Atmosfera</span>
                  <span className="font-mono text-[#00D1FF]">{atmosphereIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={atmosphereIntensity}
                  onChange={(e) => setAtmosphereIntensity(Number(e.target.value))}
                  className="w-full accent-[#00D1FF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>Sutil</span>
                  <span>Imersiva</span>
                </div>
              </div>

              {/* Pro Color Temperature */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-white/70">Temperatura da Luz (Kelvin)</span>
                  <span className="font-mono text-amber-300">{colorTemperature}K</span>
                </div>
                <input
                  type="range"
                  min="2700"
                  max="8000"
                  step="100"
                  value={colorTemperature}
                  onChange={(e) => setColorTemperature(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>2700K (Ã‚mbar)</span>
                  <span>8000K (Ice)</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. COMPOSIÃ‡ÃƒO PARAMETERS */}
          {activeConcept === 'composicao' && (
            <div className="space-y-6 animate-fade-in">
              <label className="text-xs font-mono uppercase text-white/70">Estruturas de Palco Aprovadas</label>
              
              <div className="space-y-3">
                {[
                  { id: 'cinematic-center', title: 'Cinematic Center', desc: 'Artista monumental no centro com atmosfera simÃ©trica e equilÃ­brio monumental.' },
                  { id: 'editorial-left', title: 'Editorial Left', desc: 'Tipografia dominante Ã  esquerda, artista imersivo Ã  direita estilo revista e alta moda.' },
                  { id: 'artist-right', title: 'Artist Right', desc: 'Foco visual lateral com painel de dados, mÃºsica e booking Ã  esquerda.' },
                  { id: 'full-bleed', title: 'Full Bleed Immersive', desc: 'O artista se funde ao fundo com iluminaÃ§Ã£o volumÃ©trica envolvente de ponta a ponta.' }
                ].map((comp) => (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setCompositionType(comp.id as typeof compositionType)}
                    className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer ${
                      compositionType === comp.id
                        ? 'bg-white/10 border-white shadow-lg'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-sm font-bold text-white mb-1">{comp.title}</div>
                    <div className="text-xs text-white/50 leading-relaxed">{comp.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. CONTEÃšDO PARAMETERS */}
          {activeConcept === 'conteudo' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono uppercase text-white/70">MÃ³dulos Profissionais</label>
                <span className="text-[10px] font-mono text-white/40">ReordenaÃ§Ã£o</span>
              </div>

              <div className="space-y-2.5">
                {contentModules.map((module, idx) => (
                  <div
                    key={module.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between group hover:border-white/20 transition"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-white/20 group-hover:text-white/60 cursor-grab" />
                      <div>
                        <div className="text-xs font-semibold text-white">{module.name}</div>
                        <div className="text-[10px] font-mono text-white/40">PosiÃ§Ã£o #{idx + 1}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        module.tier === 'SIGNATURE' 
                          ? 'bg-amber-500/20 text-amber-300' 
                          : module.tier === 'PRO'
                          ? 'bg-[#00D1FF]/20 text-[#00D1FF]'
                          : 'bg-white/10 text-white/60'
                      }`}>
                        {module.tier}
                      </span>
                      <input
                        type="checkbox"
                        checked={module.enabled}
                        onChange={(e) => {
                          const updated = [...contentModules];
                          updated[idx].enabled = e.target.checked;
                          setContentModules(updated);
                        }}
                        className="w-4 h-4 accent-[#00D1FF] cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. MOVIMENTO PARAMETERS */}
          {activeConcept === 'movimento' && (
            <div className="space-y-6 animate-fade-in">
              {/* Slider 3: Energia Visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-white/70">Energia Visual do Palco</span>
                  <span className="font-mono text-[#00D1FF]">{visualEnergy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={visualEnergy}
                  onChange={(e) => setVisualEnergy(Number(e.target.value))}
                  className="w-full accent-[#00D1FF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>Minimal</span>
                  <span>Expressiva</span>
                </div>
              </div>

              {/* Dynamic Controls */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
                  <div>
                    <div className="text-xs text-white font-bold flex items-center gap-2">
                      <span>Reatividade Sonora ao Set</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#00D1FF]/20 text-[#00D1FF] text-[8px] font-mono">PRO</span>
                    </div>
                    <div className="text-[10px] text-white/40">A luz e atmosfera pulsam com as batidas graves</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={audioReactivity}
                    onChange={(e) => setAudioReactivity(e.target.checked)}
                    className="w-4 h-4 accent-[#00D1FF]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
                  <div>
                    <div className="text-xs text-white font-bold flex items-center gap-2">
                      <span>Profundidade 3D & Parallax</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#00D1FF]/20 text-[#00D1FF] text-[8px] font-mono">PRO</span>
                    </div>
                    <div className="text-[10px] text-white/40">Camadas se movem suavemente ao rolar a pÃ¡gina</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={parallaxEnabled}
                    onChange={(e) => setParallaxEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#00D1FF]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
                  <div>
                    <div className="text-xs text-white font-bold flex items-center gap-2">
                      <span>PartÃ­culas WebGL Procedurais</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono">SIGNATURE</span>
                    </div>
                    <div className="text-[10px] text-white/40">Efeito de poeira e distorÃ§Ã£o quÃ¢ntica sob medida</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={webglParticles}
                    onChange={(e) => setWebglParticles(e.target.checked)}
                    className="w-4 h-4 accent-amber-400"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
                  <div>
                    <div className="text-xs text-white font-bold flex items-center gap-2">
                      <span>Ãudio Espacial de Entrada</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono">SIGNATURE</span>
                    </div>
                    <div className="text-[10px] text-white/40">TransiÃ§Ãµes sonoras orgÃ¢nicas entre capÃ­tulos</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={spatialAudio}
                    onChange={(e) => setSpatialAudio(e.target.checked)}
                    className="w-4 h-4 accent-amber-400"
                  />
                </label>
              </div>
            </div>
          )}

        </aside>

      </div>

      {/* 3. LUXURY PLAN SELECTION MODAL */}
      {planModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl bg-[#090A10] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] font-bold">NÃVEIS DE EXPERIÃŠNCIA</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">
                  Planos Beat Flow Artist
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  "Cobrar por profundidade. NÃ£o cobrar por dignidade visual."
                </p>
              </div>
              <button
                onClick={() => setPlanModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Plan Cards Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              
              {/* PLAN 01 â€” ESSENTIAL */}
              <div className={`p-5 rounded-2xl border transition relative flex flex-col ${
                currentPlan === 'ESSENTIAL' 
                  ? 'bg-white/10 border-white/40 shadow-xl' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">PLANO 01</div>
                <h4 className="text-lg font-black text-white uppercase mt-1">ESSENTIAL</h4>
                <div className="text-2xl font-black text-white mt-2">R$ 49<span className="text-xs font-normal text-white/50">/mÃªs</span></div>
                <p className="text-[11px] text-white/60 mt-1">PresenÃ§a bonita, digna e profissional para qualquer DJ.</p>
                
                <ul className="space-y-2 text-xs text-white/80 my-4 flex-1">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 4 Cenas essenciais (Noir, Sunset, etc.)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 1 Set principal + 3 destaques</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Agenda essencial & Rider PDF</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> SubdomÃ­nio beatflow.me/dj</li>
                </ul>

                <button
                  onClick={() => { setCurrentPlan('ESSENTIAL'); setPlanModalOpen(false); }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                    currentPlan === 'ESSENTIAL'
                      ? 'bg-white/20 text-white cursor-default'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {currentPlan === 'ESSENTIAL' ? 'Plano Ativo' : 'Mudar para Essential'}
                </button>
              </div>

              {/* PLAN 02 â€” PRO (RECOMMENDED) */}
              <div className={`p-5 rounded-2xl border transition relative flex flex-col ${
                currentPlan === 'PRO' 
                  ? 'bg-[#00D1FF]/10 border-[#00D1FF] shadow-2xl ring-1 ring-[#00D1FF]/40' 
                  : 'bg-white/[0.02] border-[#00D1FF]/30 hover:border-[#00D1FF]/60'
              }`}>
                <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-[#00D1FF] text-black text-[9px] font-mono font-black tracking-wider uppercase">
                  RECOMENDADO
                </div>
                <div className="text-[10px] font-mono text-[#00D1FF] uppercase tracking-widest">PLANO 02</div>
                <h4 className="text-lg font-black text-white uppercase mt-1">PRO</h4>
                <div className="text-2xl font-black text-white mt-2">R$ 99<span className="text-xs font-normal text-white/50">/mÃªs</span></div>
                <p className="text-[11px] text-white/60 mt-1">Para DJs em turnÃª, com impacto visual e ferramentas completas.</p>
                
                <ul className="space-y-2 text-xs text-white/80 my-4 flex-1">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00D1FF] shrink-0" /> Cenas expandidas (Liquid, Ice, Raw, etc.)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00D1FF] shrink-0" /> Reatividade Sonora & Motion AvanÃ§ado</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00D1FF] shrink-0" /> Sets Ilimitados & Tracklist detalhada</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00D1FF] shrink-0" /> 1-Click EPK & Rider TÃ©cnico Homologado</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00D1FF] shrink-0" /> CartÃ£o NFC & WhatsApp Booking Direto</li>
                </ul>

                <button
                  onClick={() => { setCurrentPlan('PRO'); setPlanModalOpen(false); }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                    currentPlan === 'PRO'
                      ? 'bg-[#00D1FF] text-black font-black cursor-default'
                      : 'bg-[#00D1FF] hover:bg-[#00D1FF]/90 text-black font-bold'
                  }`}
                >
                  {currentPlan === 'PRO' ? 'Plano Ativo' : 'Ativar Plano Pro'}
                </button>
              </div>

              {/* PLAN 03 â€” SIGNATURE */}
              <div className={`p-5 rounded-2xl border transition relative flex flex-col ${
                currentPlan === 'SIGNATURE' 
                  ? 'bg-amber-500/10 border-amber-400 shadow-2xl ring-1 ring-amber-400/40' 
                  : 'bg-white/[0.02] border-amber-500/30 hover:border-amber-500/60'
              }`}>
                <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-mono font-black tracking-wider uppercase">
                  EXCLUSIVO
                </div>
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">PLANO 03</div>
                <h4 className="text-lg font-black text-white uppercase mt-1">SIGNATURE</h4>
                <div className="text-2xl font-black text-white mt-2">R$ 249<span className="text-xs font-normal text-white/50">/mÃªs</span></div>
                <p className="text-[11px] text-white/60 mt-1">MÃ¡xima exclusividade, direÃ§Ã£o com IA e experiÃªncias sob medida.</p>
                
                <ul className="space-y-2 text-xs text-white/80 my-4 flex-1">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Cenas Generativas IA & PartÃ­culas WebGL</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> IA Artistic Direction contÃ­nua</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> DomÃ­nio prÃ³prio 100% White Label</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Multi-Perfil (Club / Festival / Private)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Ãudio espacial de entrada imersivo</li>
                </ul>

                <button
                  onClick={() => { setCurrentPlan('SIGNATURE'); setPlanModalOpen(false); }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                    currentPlan === 'SIGNATURE'
                      ? 'bg-amber-400 text-black font-black cursor-default'
                      : 'bg-amber-400 hover:bg-amber-300 text-black font-bold'
                  }`}
                >
                  {currentPlan === 'SIGNATURE' ? 'Plano Ativo' : 'Ativar Signature'}
                </button>
              </div>

            </div>

            <div className="text-center text-xs text-white/40 pt-2">
              VocÃª pode alternar entre os planos a qualquer momento. Nenhum artista terÃ¡ sua pÃ¡gina bloqueada ou visualmente inferior.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}