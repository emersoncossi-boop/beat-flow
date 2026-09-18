"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  Pause,
  ArrowRight, 
  Users, 
  User,
  Calendar, 
  Send, 
  Heart,
  Share2, 
  TrendingUp, 
  X, 
  Disc3,
  Sparkles,
  Sliders,
  Menu,
  CheckCircle2,
  Headphones,
  FileText,
  Volume2,
  Maximize2,
  Zap,
  Info,
  Layers,
  Radio,
  Music,
  ChevronDown,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  AlertCircle,
  Flame,
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
  RefreshCw,
  Lock,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';

import { ResponsiveShowcase } from '@/components/landing/ResponsiveShowcase';
import { HeroInteractiveStage } from '@/components/landing/HeroInteractiveStage';
//
import { AtmosphericCanvas } from '@/components/landing/AtmosphericCanvas';
import { LuminousDivider } from '@/components/landing/LuminousDivider';
import { AtmospheresShowcase } from '@/components/landing/AtmospheresShowcase';

export default function BeatFlowLandingPage() {
  const router = useRouter();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [djHandleInput, setDjHandleInput] = useState("");
  const [openQuickBookIndex, setOpenQuickBookIndex] = useState<number | null>(null);
  const [expandedBioIndices, setExpandedBioIndices] = useState<Record<number, boolean>>({});
  const [quickBookData, setQuickBookData] = useState<Record<number, { date: string; venue: string; soundcloudUrl?: string; contact: string; submitted: boolean; submitting: boolean }>>({});

  const handleClaimSlug = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanHandle = djHandleInput.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
    const targetUrl = cleanHandle 
      ? `/login?mode=signup&handle=${encodeURIComponent(cleanHandle)}` 
      : '/login?mode=signup';
    router.push(targetUrl);
  };

  // Dedicated Booking Command Center state (Heroic Date Search & Proposal Flow)
  const [bookingUniverse, setBookingUniverse] = useState<number>(0); // 0: Clubs, 1: Eventos, 2: Produtores
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingCity, setBookingCity] = useState<string>("São Paulo, SP");
  const [bookingContact, setBookingContact] = useState<string>("");
  const [bookingSoundcloud, setBookingSoundcloud] = useState<string>("");
  const [bookingSubmitting, setBookingSubmitting] = useState<boolean>(false);
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [whatsappScenario, setWhatsappScenario] = useState<'loss' | 'win'>('loss');
  const [flowComparisonMode, setFlowComparisonMode] = useState<'chaos' | 'flow'>('chaos');
  const [hoveredFrictionCard, setHoveredFrictionCard] = useState<number | null>(null);

  const handleScrollToBooking = (universeIndex: number) => {
    setBookingUniverse(universeIndex);
    const el = document.getElementById("booking-command-center");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmitBookingFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingContact) return;
    setBookingSubmitting(true);
    setTimeout(() => {
      setBookingSubmitting(false);
      setBookingSubmitted(true);
    }, 700);
  };

  const handleResetBookingFlow = () => {
    setBookingSubmitted(false);
    setBookingDate("");
    setBookingContact("");
    setBookingSoundcloud("");
  };
  const [selectedDetailSegment, setSelectedDetailSegment] = useState<{
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    bio: string;
    genre: string;
    experience: string;
    performanceFormat: string;
    rider: {
      players: string;
      mixer: string;
      booth: string;
      power: string;
      mic: string;
      connections: string;
      stageNotes: string;
    };
    highlights: string[];
    tagText: string;
    accentColor: string;
    gradientClass: string;
  } | null>(null);

  // Close detail modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDetailSegment(null);
      }
    };

    if (selectedDetailSegment) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDetailSegment]);

  const handleToggleQuickBook = (index: number) => {
    setOpenQuickBookIndex(prev => prev === index ? null : index);
  };

  const handleToggleBio = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedBioIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFieldChange = (index: number, field: "date" | "venue" | "contact" | "soundcloudUrl", value: string) => {
    setQuickBookData(prev => {
      const current = prev[index] || { date: "", venue: "", contact: "", soundcloudUrl: "", submitted: false, submitting: false };
      return {
        ...prev,
        [index]: {
          ...current,
          [field]: value
        }
      };
    });
  };

  const handleSubmitQuickBook = (index: number) => {
    setQuickBookData(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        submitting: true
      }
    }));

    setTimeout(() => {
      setQuickBookData(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          submitting: false,
          submitted: true
        }
      }));
    }, 600);
  };

  const handleResetQuickBook = (index: number) => {
    setQuickBookData(prev => ({
      ...prev,
      [index]: {
        date: "",
        venue: "",
        contact: "",
        soundcloudUrl: "",
        submitted: false,
        submitting: false
      }
    }));
  };

  // Configurable statistics array (Placeholders as specified in prompt)
  const stats = [
    { value: "12K+", label: "DJs no Beat Flow" },
    { value: "280K+", label: "Conexões criadas" },
    { value: "1.2K+", label: "Eventos e oportunidades" }
  ];

  // 4 Core Value Cards ("Tudo o que um DJ precisa em um só lugar")
  const coreFeatures = [
    {
      id: "perfil-completo",
      mod: "MOD.01",
      tag: "DISCOGRAFIA & BIO",
      icon: Disc3,
      title: "Seu perfil completo",
      description: "Música, bio, redes e mais.",
      color: "text-[#C084FC]",
      accentGlow: "rgba(138,63,252,0.35)",
      borderColor: "hover:border-[#8A3FFC]/50",
      glowColor: "group-hover:bg-[#8A3FFC]/10"
    },
    {
      id: "novas-oportunidades",
      mod: "MOD.02",
      tag: "SMART CALENDAR",
      icon: Calendar,
      title: "Novas oportunidades",
      description: "Eventos, gigs e collabs.",
      color: "text-[#FF4DDB]",
      accentGlow: "rgba(255,77,219,0.35)",
      borderColor: "hover:border-[#FF4DDB]/50",
      glowColor: "group-hover:bg-[#FF4DDB]/10"
    },
    {
      id: "conexao-real",
      mod: "MOD.03",
      tag: "P2P NETWORKING",
      icon: Users,
      title: "Conexão real",
      description: "Com pessoas que vivem música.",
      color: "text-[#00D1FF]",
      accentGlow: "rgba(0,209,255,0.35)",
      borderColor: "hover:border-[#00D1FF]/50",
      glowColor: "group-hover:bg-[#00D1FF]/10"
    },
    {
      id: "mais-alcance",
      mod: "MOD.04",
      tag: "GLOBAL INDEX",
      icon: TrendingUp,
      title: "Mais alcance",
      description: "Sua presença para o mundo todo.",
      color: "text-emerald-400",
      accentGlow: "rgba(52,211,153,0.35)",
      borderColor: "hover:border-emerald-400/50",
      glowColor: "group-hover:bg-emerald-400/10"
    }
  ];

  // 4 Steps ("Como funciona")
  const workflowSteps = [
    {
      step: "01",
      title: "Monte sua presença",
      description: "Adicione bio, música, imagens, agenda e informações profissionais.",
      icon: Disc3
    },
    {
      step: "02",
      title: "Compartilhe um único link",
      description: "Use no Instagram, WhatsApp, mídia kit ou onde seu público já está.",
      icon: Share2
    },
    {
      step: "03",
      title: "Transforme interesse em pedido",
      description: "Quem acessa encontra contexto suficiente para avançar.",
      icon: Send
    },
    {
      step: "04",
      title: "Negocie e organize o booking",
      description: "Propostas, mensagens e datas continuam conectadas até a confirmação.",
      icon: Sliders
    }
  ];

  // DJ Segments Section: "Feito para DJs que querem presença profissional"
  const djSegments = [
    {
      title: "Clubs & Festas",
      subtitle: "Residentes, Open Format & Eletrônica",
      description: "Apresente seus vídeos ao vivo, telemetria de BPM, rider técnico homologado e receba propostas estruturadas sem perda de tempo.",
      badge: "Pista & Clubbing",
      tagText: "PIONEER CDJ-3000 · DJM-A9",
      accentColor: "#8A3FFC",
      gradientClass: "from-[#8A3FFC] to-[#00D1FF]",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
      contractorPain: "O contratante do club precisa saber com 100% de certeza se o rider técnico bate com a casa e se o DJ sustenta o horário de ápice (Peak Time).",
      keyBenefit: "Rider validado de fábrica, tempo de resposta recorde e gravação de set ao vivo direto da mesa.",
      metricBadge: "94% menos ruído técnico de cabine",
      feeRange: "R$ 2.500 — R$ 8.000",
      bio: "Focado em comandar a pista e garantir a energia até o final. Seja em uma residência noturna, num set open format frenético ou em uma jornada hipnótica de techno. A música fala mais alto e o rider técnico é essencial para entregar a melhor performance.",
      genre: "Melodic Techno, Tech House, Open Format, Peak Time",
      experience: "Organize sua agenda e datas livres",
      performanceFormat: "Set Solo, B2B, Residência (2h a 4h)",
      rider: {
        players: "2x Pioneer CDJ-3000 com firmware v3.12+ (Pro DJ Link)",
        mixer: "1x Pioneer DJM-A9 ou Allen & Heath Xone:96",
        booth: "2x Monitores de cabine com controle individual de ganho",
        power: "2x Linhas elétricas estabilizadas 220V com aterramento isolado",
        mic: "1x Microfone sem fio Shure/Sennheiser (quando aplicável)",
        connections: "Cabos digitais banhados a ouro e switch Gigabit",
        stageNotes: "Mesa rígida sem oscilação na altura de 1,05m."
      },
      highlights: [
        "Sets gravados direto do mixer DJM-A9",
        "Rider homologado para clubs e festivais",
        "Agenda de fins de semana sincronizada em tempo real"
      ]
    },
    {
      title: "Eventos & Experiências",
      subtitle: "Casamentos, Eventos Premium & Corporativo",
      description: "Filtre pedidos por estilo musical, horário de pista e garanta briefings detalhados e segurança jurídica antes de enviar o orçamento.",
      badge: "Premium & Social",
      tagText: "PREMIUM PA · BRIEFING HOMOLOGADO",
      accentColor: "#00D1FF",
      gradientClass: "from-[#00D1FF] to-[#8A3FFC]",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop",
      contractorPain: "Noivos e organizadores têm medo de DJ amador que toca músicas proscritas, atrasa o cronograma ou queima a caixa de som.",
      keyBenefit: "Contrato formal digital, sinal de 50% garantido e formulário de músicas proibidas e indispensáveis.",
      metricBadge: "Cachês até 3x mais altos por evento",
      feeRange: "R$ 4.000 — R$ 15.000",
      bio: "Especialista em criar a atmosfera certa para os momentos mais importantes. Casamentos, eventos corporativos de alto luxo e lançamentos de marca. O nível de exigência do cliente pede uma apresentação profissional e um processo de contratação sem ruídos.",
      genre: "Open Format Sofisticado, Pop Clássico, Nu-Disco, Deep House",
      experience: "Briefings detalhados e propostas alinhadas",
      performanceFormat: "Cerimônia, Recepção, Jantar e Pista de Dança",
      rider: {
        players: "Sistema integrado Pioneer XDJ-XZ ou OPUS-QUAD",
        mixer: "Mixer digital com controle independente de microfonia",
        booth: "Caixas ativas Genelec / QSC de alta fidelidade",
        power: "No-break senoidal de backup de energia para cerimônia",
        mic: "2x Sistemas sem fio UHF com receptor digital de longo alcance",
        connections: "Saídas balanceadas XLR estéreo com direct box",
        stageNotes: "Cabine com acabamento visual impecável e fiação 100% oculta."
      },
      highlights: [
        "Repertório 100% customizado com blacklist de faixas",
        "Postura executiva e vestimenta alinhada ao dress-code",
        "Orçamentos formais com contrato de prestação de serviços"
      ]
    },
    {
      title: "Produtores & Artistas",
      subtitle: "Live Acts, Sintetizadores & Projetos Autorais",
      description: "O contratante e o curador de festival ouvem suas tracks autorais e fecham datas sabendo exatamente a sua identidade sonora.",
      badge: "Autoral & Live Act",
      tagText: "ABLETON LIVE · HARDWARE SYNTHS",
      accentColor: "#FF4DB8",
      gradientClass: "from-[#FF4DB8] to-[#00D1FF]",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      contractorPain: "Curador de festival não quer set genérico; quer artista que agregue identidade e atraia a própria comunidade.",
      keyBenefit: "Playlists do Spotify e releases integrados no Press Kit; espaço de palco dimensionado para hardware.",
      metricBadge: "100% foco em identidade sonora autoral",
      feeRange: "R$ 3.500 — R$ 12.000",
      bio: "Foco 100% na identidade sonora. Como artista autoral e produtor, seus lançamentos e números importam para os contratantes. O Beat Flow é o seu canvas para expor lançamentos do Spotify, sets autorais no SoundCloud e garantir que o palco tenha o setup exato para o seu Live Act.",
      genre: "Música Autoral, Indie Dance, Melodic Techno, Progressive",
      experience: "Foco em apresentações que destacam sua própria arte",
      performanceFormat: "Live Act Híbrido (Ableton + Push) ou DJ Set Autoral",
      rider: {
        players: "2x Pioneer CDJ-3000 + Ableton Push 3 ou Akai Force",
        mixer: "Mixer 4 ou 6 canais com placa de áudio USB de baixa latência",
        booth: "Monitores profissionais de campo próximo (L-Acoustics / Genelec)",
        power: "4x Pontos 220V dedicados para laptops, sintetizador analógico e pedais",
        mic: "1x Microfone Shure SM58 para vocais / vocoder ao vivo",
        connections: "Conexões MIDI DIN e direct boxes balanceadas",
        stageNotes: "Mesa ampliada com 2m de largura para sintetizador e controladores."
      },
      highlights: [
        "Venda gigs baseadas no catálogo de tracks próprias",
        "Setup para performances híbridas (Live Hardware + CDJs)",
        "Curadoria direta para palcos alternativos e festivais"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#08080F] text-white selection:bg-[#8A3FFC] selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Dynamic Atmospheric Canvas (Filmic Stage Haze, Lasers, Volumetric Meshes) */}
      <AtmosphericCanvas />

      {/* Main Sticky Header (Height 88px to 96px, dark transparent with subtle blur) */}
      <header className="h-[88px] sm:h-[96px] border-b border-white/[0.08] bg-[#08080F]/85 backdrop-blur-xl sticky top-0 z-40 px-5 sm:px-8 md:px-12 lg:px-16 transition-all">
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between">
          
          {/* Official Beat Flow Logo */}
          <div className="flex items-center gap-12">
            <Logo size="md" />

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[rgba(255,255,255,0.72)]">
              <Link href="/explorar" className="hover:text-white transition-colors">
                Artistas
              </Link>
              <a href="#atmosferas-e-universos" className="hover:text-[#00D1FF] transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
                <span>Atmosferas</span>
              </a>
              <a href="#como-funciona" className="hover:text-white transition-colors">
                Como Funciona
              </a>
              <a href="#booking-command-center" className="hover:text-white transition-colors">
                Contratar DJ
              </a>
              <a href="#para-quem-e" className="hover:text-white transition-colors">
                Para quem é
              </a>
            </nav>
          </div>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3.5">
            <Link href="/login">
              <button className="text-sm font-medium text-white px-5 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer">
                Entrar
              </button>
            </Link>

            <Link href="/login?mode=signup">
              <button className="h-10 sm:h-11 px-6 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8A3FFC] to-[#9333EA] hover:opacity-95 text-white text-sm font-bold shadow-[0_0_22px_rgba(138,63,252,0.6)] hover:shadow-[0_0_34px_rgba(138,63,252,0.9)] transition-all flex items-center justify-center cursor-pointer">
                <span>Criar meu perfil</span>
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex sm:hidden items-center gap-3">
            <Link href="/login?mode=signup">
              <button className="px-3.5 py-1.5 rounded-full bg-[#8A3FFC] text-white text-xs font-bold shadow-md">
                Criar perfil
              </button>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition"
              aria-label="Abrir Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-[80px] left-0 w-full bg-[#0d0c1a] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2">
            <Link href="/explorar" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white py-2">
              Artistas
            </Link>
            <a href="#atmosferas-e-universos" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white py-2">
              Atmosferas
            </a>
            <a href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white py-2">
              Como Funciona
            </a>
            <a href="#booking-command-center" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white py-2">
              Contratar DJ
            </a>
            <a href="#para-quem-e" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-white py-2">
              Para quem é
            </a>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full py-2.5 rounded-xl border border-white/15 text-white text-sm font-medium">
                  Entrar
                </button>
              </Link>
              <Link href="/login?mode=signup" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8A3FFC] to-[#00D1FF] text-white text-sm font-bold shadow-lg shadow-[#8A3FFC]/40">
                  Criar meu perfil gratuito
                </button>
              </Link>
            </div>
          </div>
        )}

        <LuminousDivider glow={false} className="absolute bottom-0 left-0 right-0" />
      </header>

      {/* ---------------------------------------------------- */}
      {/* HERO SECTION (PERFECT VIEWPORT FIT — 100% BF ASSET FIDELITY & BRAND COLORS) */}
      {/* ---------------------------------------------------- */}
      <section className="relative h-auto min-h-[calc(100svh-88px)] w-full flex flex-col justify-center pt-24 pb-16 lg:py-0 overflow-hidden bg-[#05060A]">
        {/* Abstract Background / Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-[#8A3FFC]/10 via-[#00D1FF]/5 to-transparent blur-[120px] opacity-70" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FF4DB8]/5 blur-[150px] opacity-40" />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Column: Text & CTAs */}
          <div className="w-full lg:w-[54%] flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
            <div className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.25em] text-[#00D1FF] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] shadow-[0_0_8px_#00D1FF] animate-pulse" />
                PRESS KIT OFICIAL PARA DJS
              </span>
            </div>

            <h1 className="text-[44px] sm:text-[56px] lg:text-[68px] xl:text-[76px] font-black tracking-[-0.03em] text-white leading-[1.05] mb-6 drop-shadow-xl">
              Seu som abre a porta.<br />
              O Beat Flow transforma interesse em{' '}
              <span className="bg-gradient-to-r from-[#00D1FF] via-[#8A3FFC] to-[#FF4DB8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(138,63,252,0.45)]">
                contratação.
              </span>
            </h1>

            <p className="text-[15px] sm:text-[17px] lg:text-[19px] text-[var(--bf-text-secondary,#A7ADC0)] font-medium max-w-2xl mb-10 leading-[1.6]">
              Música, identidade, agenda, rider e pedidos de booking em um único perfil profissional. Compartilhe seu link e deixe contratantes entenderem seu trabalho sem uma sequência interminável de mensagens.
            </p>

            <div className="w-full max-w-[520px] mb-6 relative">
              <form 
                id="hero-slug-reservation-form"
                onSubmit={handleClaimSlug}
                className="p-1.5 rounded-2xl bg-[#0A0C14]/90 border border-white/10 hover:border-white/20 focus-within:border-[#00D1FF]/60 focus-within:ring-2 focus-within:ring-[#00D1FF]/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all flex flex-col sm:flex-row items-center gap-2 backdrop-blur-md"
              >
                <div className="flex items-center w-full px-4 h-14 bg-white/5 rounded-xl border border-transparent transition-colors focus-within:bg-white/10">
                  <span className="text-white/40 font-mono text-sm sm:text-base select-none shrink-0" aria-hidden="true">
                    beatflow.me/@
                  </span>
                  <input
                    id="hero-handle-input"
                    type="text"
                    placeholder="seunomeartistico"
                    value={djHandleInput}
                    onChange={(e) => setDjHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                    className="bg-transparent text-white font-mono text-base sm:text-lg focus:outline-none w-full placeholder:text-white/20 ml-1 py-1"
                  />
                </div>
                <button
                  type="submit"
                  id="hero-claim-submit-button"
                  className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8A3FFC] to-[#00D1FF] hover:brightness-110 text-white font-bold text-sm sm:text-base tracking-tight shadow-[0_0_24px_rgba(138,63,252,0.65)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)] flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  <span>Reivindicar</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <div className="mt-4 min-h-[24px] text-left px-2">
                {djHandleInput.trim().length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-mono text-emerald-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        beatflow.me/@<strong>{djHandleInput}</strong> disponível!
                      </span>
                    </motion.div>
                  ) : (
                 <span className="text-[12px] sm:text-[13px] font-mono text-[#00D1FF]/60 flex items-center gap-1.5">
                   <Sparkles className="w-3.5 h-3.5" />
                   <span>Garante seu endereço oficial antes que outro artista registre</span>
                 </span>
                 )}
              </div>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14 w-full">
              <Link href="/explorar" className="w-full sm:w-auto">
                <button 
                  type="button"
                  className="w-full sm:w-auto h-12 px-6 rounded-xl border border-white/10 hover:border-[#00D1FF]/50 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-medium text-sm tracking-tight flex items-center justify-center gap-2.5 transition-colors cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#00D1FF]/20 flex items-center justify-center transition-colors">
                    <Play className="w-3 h-3 fill-white text-white group-hover:text-[#00D1FF] ml-0.5 transition-colors" />
                  </div>
                  <span>Ver perfis de DJs ao vivo</span>
                </button>
              </Link>
              <button
                type="button"
                onClick={() => handleScrollToBooking(0)}
                className="w-full sm:w-auto h-12 px-5 rounded-xl border border-dashed border-white/15 hover:border-purple-400/50 text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer bg-black/20"
              >
                <Calendar className="w-4 h-4 text-purple-400/70" />
                <span>Sou contratante: buscar datas</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/[0.08] w-full max-w-[520px]">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--bf-text-secondary,#A7ADC0)]">
                <CheckCircle2 className="w-4 h-4 text-[#8A3FFC]" />
                <span>Perfil oficial</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--bf-text-secondary,#A7ADC0)]">
                <CheckCircle2 className="w-4 h-4 text-[#00D1FF]" />
                <span>Link próprio</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--bf-text-secondary,#A7ADC0)]">
                <CheckCircle2 className="w-4 h-4 text-[#FF4DB8]" />
                <span>Custódia de 50%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Phone & Live DJ Stage Simulator */}
          <div className="w-full lg:w-[46%] flex flex-col items-center justify-center relative z-20 pt-8 lg:pt-0">
            <HeroInteractiveStage 
              djHandle={djHandleInput} 
              onClaim={handleClaimSlug} 
            />
          </div>

        </div>
      </section>

      {/* Luminous Light Beam Divider — 100% Fidelity to BF_graphic-divider-gradient.svg */}
      <LuminousDivider glow={true} />

      {/* ---------------------------------------------------- */}
      {/* SEÇÃO DA DOR & SOLUÇÃO — UX NARRATIVE & DIAGNOSTIC */}
      {/* ---------------------------------------------------- */}
      <section id="problema" className="py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#05060A] relative overflow-hidden text-center select-none border-b border-white/5">
        
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Subtle Section Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold tracking-[0.2em] text-white/60 uppercase mb-8 shadow-sm"
          >
            Diagnóstico de Retenção
          </motion.div>

          {/* Clean, Refined Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1] max-w-4xl mx-auto"
          >
            O seu som atrai o produtor.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#00D1FF]">
              O seu perfil perde a data.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed mb-16 max-w-2xl mx-auto font-normal"
          >
            O contratante quer ouvir seu som, checar rider e validar a data livre em segundos. Quando o seu material está pulverizado, a fricção destrói o interesse.
          </motion.p>

          {/* Interactive State Switcher (Premium Segmented Control) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex p-1.5 rounded-full bg-white/[0.02] border border-white/10 mb-16 w-full max-w-md backdrop-blur-md shadow-2xl relative z-20"
          >
            <button
              type="button"
              onClick={() => setFlowComparisonMode('chaos')}
              className={`flex-1 py-3 px-4 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                flowComparisonMode === 'chaos'
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>A Fragmentação</span>
            </button>
            <button
              type="button"
              onClick={() => setFlowComparisonMode('flow')}
              className={`flex-1 py-3 px-4 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                flowComparisonMode === 'flow'
                  ? "bg-[#00D1FF]/10 text-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.15)] ring-1 ring-[#00D1FF]/30"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>O Padrão Beat Flow</span>
            </button>
          </motion.div>

          {/* Dynamic Interactive Stage */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {flowComparisonMode === 'chaos' ? (
                /* VIEW 1: O CAOS (Bento Grid Diagnostic) */
                <motion.div
                  key="chaos-stage"
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { staggerChildren: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(4px)', transition: { duration: 0.3 } }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 text-left w-full"
                >
                  {/* Hero Stat - Left Column */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="md:col-span-12 lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-rose-500/5 to-transparent border border-rose-500/10 flex flex-col justify-center text-left relative overflow-hidden group hover:border-rose-500/20 transition-colors"
                  >
                    <div className="absolute top-0 right-0 w-[200%] h-[200%] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-rose-400 to-rose-700/50 mb-4 tracking-tighter">
                      73%
                    </div>
                    <div className="text-sm font-bold text-white mb-3 uppercase tracking-[0.15em]">
                      Taxa de Drop-off
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed max-w-[280px]">
                      A cada 10 contratantes que chegam no seu Linktree, 7 desistem por excesso de cliques, lentidão ou falta de Call-to-Action claro.
                    </p>
                  </motion.div>

                  {/* Grid of Friction - Right Column */}
                  <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Card 1: Bio */}
                    <motion.div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                          Linktree
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 relative z-10">Labirinto de Links</h4>
                      <p className="text-xs text-white/40 leading-relaxed relative z-10">
                        Páginas lentas e excesso de botões concorrentes diluem o foco principal.
                      </p>
                    </motion.div>

                    {/* Card 2: SoundCloud */}
                    <motion.div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                          SoundCloud
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 relative z-10">Música sem Booking</h4>
                      <p className="text-xs text-white/40 leading-relaxed relative z-10">
                        Ouvem seu set de 1h, mas não há um fluxo direto para cotar a data e o cachê.
                      </p>
                    </motion.div>

                    {/* Card 3: WhatsApp */}
                    <motion.div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                          WhatsApp
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 relative z-10">Atraso e Assincronia</h4>
                      <p className="text-xs text-white/40 leading-relaxed relative z-10">
                        Áudios infinitos e atrasos na resposta geram perda de *timing* para a concorrência ágil.
                      </p>
                    </motion.div>

                    {/* Card 4: Rider PDF */}
                    <motion.div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                          Drive PDF
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 relative z-10">Barreira Técnica</h4>
                      <p className="text-xs text-white/40 leading-relaxed relative z-10">
                        PDFs de 40MB que não carregam no 4G da festa, gerando desalinhamento de equipamentos.
                      </p>
                    </motion.div>
                  </div>

                  {/* Tactical Callout CTA */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-12 p-[1px] rounded-3xl bg-gradient-to-r from-white/5 via-white/15 to-white/5 mt-2 overflow-hidden relative group cursor-pointer" 
                    onClick={() => setFlowComparisonMode('flow')}
                  >
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <div className="p-6 sm:p-8 rounded-[23px] bg-[#07090E] flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 h-full">
                      <div className="flex items-center gap-5 text-left">
                        <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 text-white flex items-center justify-center shrink-0 shadow-inner">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-base sm:text-lg font-bold text-white mb-1">
                            Pare de perder shows por atrito digital.
                          </h5>
                          <p className="text-sm text-white/40 font-normal">
                            Descubra como o ecossistema Beat Flow converte leads em 30 segundos.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-full sm:w-auto h-12 px-8 rounded-full bg-white text-black font-bold text-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 shrink-0"
                      >
                        <span>Ver Padrão Unificado</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* VIEW 2: BEAT FLOW PIPELINE (Cinematic Unified UI) */
                <motion.div
                  key="flow-stage"
                  initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)', transition: { duration: 0.3 } }}
                  className="w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 text-left w-full">
                    
                    {/* Hero Stat - Left Column (The "Green" Success Metric) */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="md:col-span-12 lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 flex flex-col justify-center text-left relative overflow-hidden group hover:border-emerald-500/20 transition-colors"
                    >
                      <div className="absolute top-0 right-0 w-[200%] h-[200%] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">Consolidação</span>
                      </div>

                      <div className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-600 mb-4 tracking-tighter flex items-end">
                        1
                      </div>
                      <div className="text-sm font-bold text-white mb-3 uppercase tracking-[0.15em]">
                        Único Link
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed max-w-[280px]">
                        A jornada flui sem interrupções. O produtor encontra player, agenda, rider e contrato em um único ambiente, eliminando pontos de fuga.
                      </p>
                    </motion.div>

                    {/* Pipeline Steps - Right Column */}
                    <div className="md:col-span-12 lg:col-span-7 rounded-3xl bg-[#0A0C13] border border-white/10 relative overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col">
                      {/* Glowing Top Edge */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D1FF]/50 to-transparent opacity-60" />
                      
                      {/* Radar/Grid Background Pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] pointer-events-none" />

                      <div className="relative z-10 flex flex-col h-full justify-between">
                    
                    {/* Console Top Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 mb-8 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D1FF] to-[#8A3FFC] p-[1px]">
                          <div className="w-full h-full bg-[#0A0C13] rounded-xl flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-[#00D1FF]" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">Pipeline Master</h4>
                          <div className="text-[10px] font-mono text-[#00D1FF] uppercase tracking-widest flex items-center gap-1.5 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
                            Operante · 60 FPS
                          </div>
                        </div>
                      </div>
                      
                      <span className="text-[11px] font-mono text-white/30 uppercase tracking-[0.2em]">
                        beatflow.me/oficial
                      </span>
                    </div>

                    {/* Grid of Steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 flex-1">
                      
                      {/* Step 1 */}
                      <div className="p-5 rounded-2xl bg-[#0F121C] border border-white/5 group hover:border-[#00D1FF]/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center mb-3 group-hover:bg-[#00D1FF]/10 group-hover:text-[#00D1FF] transition-colors">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <h5 className="text-sm font-bold text-white mb-1">1. Hi-Fi Player</h5>
                        <p className="text-xs text-white/40 leading-relaxed">Drops diretos em 5s. Sem logins ou fricção.</p>
                      </div>

                      {/* Step 2 */}
                      <div className="p-5 rounded-2xl bg-[#0F121C] border border-white/5 group hover:border-[#00D1FF]/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center mb-3 group-hover:bg-[#00D1FF]/10 group-hover:text-[#00D1FF] transition-colors">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <h5 className="text-sm font-bold text-white mb-1">2. Agenda Live</h5>
                        <p className="text-xs text-white/40 leading-relaxed">Cálculo de logística inteligente na tela.</p>
                      </div>

                      {/* Step 3 */}
                      <div className="p-5 rounded-2xl bg-[#0F121C] border border-white/5 group hover:border-[#00D1FF]/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center mb-3 group-hover:bg-[#00D1FF]/10 group-hover:text-[#00D1FF] transition-colors">
                          <Sliders className="w-4 h-4" />
                        </div>
                        <h5 className="text-sm font-bold text-white mb-1">3. Tech Rider</h5>
                        <p className="text-xs text-white/40 leading-relaxed">Setup interativo, atualizado e homologado.</p>
                      </div>

                      {/* Step 4 */}
                      <div className="p-5 rounded-2xl bg-[#0F121C] border border-white/5 group hover:border-emerald-500/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center mb-3 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <h5 className="text-sm font-bold text-white mb-1">4. Smart Contract</h5>
                        <p className="text-xs text-white/40 leading-relaxed">PIX Escrow, retenção de sinal e zero calotes.</p>
                      </div>

                    </div>
                  </div>
                  </div>
                  
                  {/* CTA Banner matching the chaos one */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-12 p-[1px] rounded-3xl bg-gradient-to-r from-emerald-500/30 via-[#00D1FF]/30 to-[#8A3FFC]/30 mt-2 overflow-hidden relative group cursor-pointer shadow-[0_0_30px_rgba(52,211,153,0.15)]" 
                  >
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <div className="p-6 sm:p-8 rounded-[23px] bg-[#07090E] flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 h-full">
                      <div className="flex items-center gap-5 text-left">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-base sm:text-lg font-bold text-white mb-1">
                            Seu link, sua agência.
                          </h5>
                          <p className="text-sm text-white/40 font-normal">
                            Multiplique seus fechamentos eliminando atritos de negociação.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById("hero-handle-input");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                            el.focus();
                          } else {
                            handleScrollToBooking(0);
                          }
                        }}
                        className="w-full sm:w-auto h-12 px-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm group-hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shrink-0 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                      >
                        <span>Gerar Meu Perfil Oficial</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Luminous Light Beam Divider */}
      <LuminousDivider glow={true} />

      {/* ---------------------------------------------------- */}
      {/* PRODUTO COMO PROVA & BENEFÍCIOS */}
      {/* ---------------------------------------------------- */}
      <section id="produto-como-prova" className="py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#08080F] relative">
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Não é uma bio com links.<br/>
              <span className="text-[#00D1FF]">É uma presença pronta para booking.</span>
            </h2>
            <p className="text-base sm:text-lg text-[rgba(255,255,255,0.72)] leading-relaxed">
              O Beat Flow conecta descoberta, música, identidade, disponibilidade e contratação na mesma experiência.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between mb-20">
            {/* Esquerda: Mockup com hotspots */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative aspect-[3/4] sm:aspect-square lg:aspect-[4/5] max-w-md mx-auto bg-[#10111E] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <Image 
                  src="/assets/landing/hero-dj-stage.jpg"
                  alt="Perfil Beat Flow"
                  fill
                  className="object-cover opacity-40 blur-sm"
                />
                
                {/* Labels estilizados */}
                <div className="absolute inset-0 flex flex-col justify-center gap-6 px-8">
                  <div className="bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 text-white shadow-lg ml-0 mr-12 hover:border-[#00D1FF]/50 transition-colors">
                    <Headphones className="w-6 h-6 text-[#00D1FF]" />
                    <span className="font-bold text-sm">OUVIR O SET</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 text-white shadow-lg ml-6 mr-6 hover:border-[#8A3FFC]/50 transition-colors">
                    <User className="w-6 h-6 text-[#8A3FFC]" />
                    <span className="font-bold text-sm">CONHECER O ARTISTA</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 text-white shadow-lg ml-12 mr-0 hover:border-[#FF4DB8]/50 transition-colors">
                    <Sliders className="w-6 h-6 text-[#FF4DB8]" />
                    <span className="font-bold text-sm">CONFERIR RIDER</span>
                  </div>
                  <div className="bg-[#8A3FFC] border border-white/20 p-4 rounded-xl flex items-center gap-4 text-white shadow-lg ml-0 mr-12 hover:bg-[#8A3FFC]/90 transition-colors">
                    <Calendar className="w-6 h-6 text-white" />
                    <span className="font-bold text-sm">PEDIR CONTRATAÇÃO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direita: Benefícios (6 listados na doc) */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  title: "PRESENÇA PROFISSIONAL",
                  desc: "Seu trabalho apresentado de forma consistente em um único endereço.",
                  icon: Disc3,
                  color: "text-[#00D1FF]"
                },
                {
                  title: "SEU SOM EM PRIMEIRO",
                  desc: "O contratante pode ouvir antes mesmo da primeira conversa.",
                  icon: Headphones,
                  color: "text-[#8A3FFC]"
                },
                {
                  title: "MENOS ATRITO",
                  desc: "As informações importantes já estão organizadas.",
                  icon: CheckCircle2,
                  color: "text-[#FF4DB8]"
                },
                {
                  title: "MAIS CONTEXTO",
                  desc: "Bio, estilos, mídia, agenda, setup e contato no lugar certo.",
                  icon: FileText,
                  color: "text-emerald-400"
                },
                {
                  title: "CAMINHO DE CONTRATAÇÃO",
                  desc: "O interesse pode evoluir para pedido e negociação.",
                  icon: Calendar,
                  color: "text-[#00D1FF]"
                },
                {
                  title: "GESTÃO CONECTADA",
                  desc: "Propostas, mensagens e datas não ficam espalhadas.",
                  icon: Layers,
                  color: "text-[#8A3FFC]"
                }
              ].map((b, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="w-full p-6 rounded-[20px] bg-[#0A0D14]/90 border border-white/5 hover:border-white/20 transition-all duration-300 relative group overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(138,63,252,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <b.icon className={`w-7 h-7 mb-4 ${b.color} group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`} />
                    <h3 className="text-[13px] font-black text-white mb-2 uppercase tracking-wider">{b.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/login?mode=signup">
              <Button size="sm" className="bg-[#8A3FFC] hover:bg-[#8A3FFC]/90 text-white font-bold text-sm px-8 py-3 h-12 rounded-full cursor-pointer shadow-[0_0_20px_rgba(138,63,252,0.4)]">
                Criar meu Press Kit grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Luminous Light Beam Divider */}
      <LuminousDivider glow={true} />

      {/* ---------------------------------------------------- */}
      {/* ATMOSPHERES & UNIVERSES INTERACTIVE SHOWCASE */}
      {/* ---------------------------------------------------- */}
      <AtmospheresShowcase />

      {/* Luminous Light Beam Divider */}
      <LuminousDivider glow={true} />

      {/* ---------------------------------------------------- */}
      {/* RESPONSIVE DEVICES SHOWCASE (DESKTOP, TABLET, MOBILE) */}
      {/* ---------------------------------------------------- */}
      <ResponsiveShowcase />

      {/* Luminous Light Beam Divider */}
      <LuminousDivider glow={true} />

      {/* ---------------------------------------------------- */}
      {/* SECTION: "COMO FUNCIONA" (4 ETAPAS NUMERADAS) */}
      {/* ---------------------------------------------------- */}
      <section id="como-funciona" className="py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#08080F]/90 relative">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00D1FF] font-bold mb-3 block">
              FLUXO DIRETO E PROFISSIONAL
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Como funciona
            </h2>
            <p className="text-base sm:text-lg text-[rgba(255,255,255,0.72)] leading-relaxed">
              Crie seu perfil, compartilhe seu link e receba pedidos qualificados sem complicação.
            </p>
          </div>

          {/* 4 Step Cards with Exact Mandated Text & 3D Motion Data Conduit */}
          <div className="relative">
            {/* 3D Motion Data Conduit connecting the steps on desktop */}
            <div className="hidden lg:block absolute top-[75px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#8A3FFC] via-[#00D1FF] to-[#FF4DDB] opacity-30 z-0">
              <motion.div 
                animate={{ left: ['-10%', '100%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 -translate-y-1/2 w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-[#00D1FF] to-white shadow-[0_0_15px_#00D1FF]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {workflowSteps.map((stepItem, idx) => {
                const StepIcon = stepItem.icon;
                const stepTags = [
                  "CONFIGURAÇÃO SIMPLES",
                  "SEU LINK OFICIAL",
                  "CENTRAL DE PROPOSTAS",
                  "CONTRATO & FECHAMENTO"
                ];
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full p-8 rounded-[24px] bg-[#10111E]/90 border border-white/10 hover:border-[#8A3FFC]/50 transition-all duration-300 relative group flex flex-col justify-between backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_rgba(138,63,252,0.2)] overflow-hidden"
                  >
                    {/* Top ambient highlight line */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#8A3FFC]/40 to-transparent group-hover:via-[#00D1FF] transition-all" />

                    <div>
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-3xl sm:text-4xl font-black bg-gradient-to-br from-white/50 to-white/10 bg-clip-text text-transparent group-hover:from-[#C084FC] group-hover:to-[#00D1FF] transition-all">
                          {stepItem.step}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8A3FFC] group-hover:text-[#00D1FF] group-hover:scale-110 transition-all shadow-inner">
                          <StepIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="text-[10px] font-mono tracking-widest text-[#00D1FF] uppercase mb-1">
                        {stepTags[idx]}
                      </div>

                      <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-white transition-colors">
                        {stepItem.title}
                      </h3>
                      <p className="text-sm text-[rgba(255,255,255,0.72)] leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#C084FC]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Etapa essencial</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#00D1FF]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Luminous Light Beam Divider */}
      <LuminousDivider glow={true} />

      {/* ---------------------------------------------------- */}
      {/* SECTION: "FEITO PARA DJS QUE QUEREM PRESENÇA PROFISSIONAL" */}
      {/* ---------------------------------------------------- */}
      <section id="para-quem-e" className="py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#080B0F] relative overflow-hidden">
        {/* Subtle Ambient Glow Orb from BF_graphic-glow-orb.svg */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-20 -z-0">
          <Image 
            src="/assets/beatflow/BF_graphic-glow-orb.svg" 
            alt="" 
            fill 
            className="object-contain" 
          />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 mb-4">
              <span>Posicionamento & Formatos de Apresentação</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Feito para DJs que querem <br className="hidden sm:block" /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">presença profissional</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed font-medium">
              Não importa a cena, pista ou estilo. O Beat Flow centraliza sua autoridade e facilita a sua contratação.
            </p>
          </motion.div>

          {/* 3 Executive Segment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {djSegments.map((segment, i) => {
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="w-full rounded-2xl bg-[#0B0F17] border border-[#1C2536] hover:border-zinc-600/70 transition-all duration-300 group flex flex-col justify-between shadow-xl relative overflow-hidden text-left"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header bar */}
                    <div className="p-5 pb-4 flex items-center justify-between gap-3 border-b border-zinc-800/80">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full border text-xs font-medium text-zinc-300 bg-white/5 border-white/10">
                          {segment.badge}
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Homologado</span>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-zinc-400">
                        {segment.feeRange}
                      </div>
                    </div>

                    {/* Stage Photo Banner */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black/60 border-b border-zinc-800/80">
                      <Image 
                        src={segment.image}
                        alt={segment.title}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />
                      
                      {/* Setup Tag on Image */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 text-xs font-medium text-zinc-200 flex items-center gap-2 shadow-md">
                          <Disc3 className="w-3.5 h-3.5 text-zinc-300" />
                          {segment.tagText}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-white transition-colors">
                          {segment.title}
                        </h3>
                        <div className="text-xs sm:text-sm text-zinc-400 font-medium mb-3">
                          {segment.subtitle}
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed mb-5 font-normal">
                          {segment.description}
                        </p>

                        {/* Contractor Pain Solution Callout */}
                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 mb-5 text-left">
                          <div className="flex items-start gap-3">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-1">
                                O que o Contratante Exige:
                              </div>
                              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                {segment.contractorPain}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Technical Highlights list */}
                        <ul className="space-y-2 mb-6 text-xs sm:text-sm text-zinc-300">
                          {segment.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-center gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Metric & Actions */}
                      <div className="pt-4 border-t border-zinc-800/80">
                        <div className="flex items-center gap-2 mb-4 text-xs font-medium text-zinc-400">
                          <Flame className="w-3.5 h-3.5 text-zinc-300" />
                          <span>{segment.metricBadge}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => setSelectedDetailSegment(segment)}
                            className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Ver Rider</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleScrollToBooking(i)}
                            className="py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Simular Proposta</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* THE BOOKING FLOW: High-Conversion Proposal Simulator & WhatsApp Contrast */}
          {/* ========================================================================= */}
          <div id="booking-command-center" className="mt-20 pt-16 border-t border-zinc-800/80 relative">
            
            {/* Soft Ambient Backdrop */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-zinc-800/10 blur-[100px] pointer-events-none -z-0" />

            {/* Conversion-Focused Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10141D] border border-zinc-700/80 text-xs font-semibold text-zinc-300 mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-wider uppercase text-[11px]">Conversão de Shows · Do Caos à Formalização</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-[1.12]">
                O fim dos cachês perdidos no WhatsApp.
              </h3>
              <p className="text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-2xl mx-auto">
                Enquanto uma conversa informal no WhatsApp se arrasta por horas e faz o contratante fechar com outro DJ, o Beat Flow valida sua agenda, alinha o rider e fecha o sinal de 50% em 30 segundos.
              </p>
            </motion.div>

            {/* Clean Comparison Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 max-w-5xl mx-auto">
              
              {/* The Chaos */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 sm:p-10 rounded-3xl bg-[#0A0C13] border border-rose-500/10 flex flex-col items-start relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-[150%] h-[150%] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.08)_0%,transparent_50%)] pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 relative z-10">
                  <MessageSquare className="w-5 h-5 text-rose-400" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight relative z-10">O Caos do WhatsApp</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8 relative z-10">
                  Conversas informais se arrastam por horas. PDFs se perdem no histórico. Cada minuto de demora é um convite para o contratante fechar com outro artista.
                </p>
                
                <div className="w-full mt-auto space-y-4 relative z-10">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-zinc-300 font-medium">
                    "Opa, e aí! Depende... Qual sábado? Que tipo de festa e que horas seria o som?"
                  </div>
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-rose-200/90 font-medium ml-6 sm:ml-12 relative">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-rose-500/30" />
                    "Era pro dia 14... Mas como demorou pra responder, já fechei com outro DJ que atendeu na hora."
                  </div>
                </div>
              </motion.div>

              {/* The Solution */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 sm:p-10 rounded-3xl bg-[#0A0C13] border border-emerald-500/20 flex flex-col items-start relative overflow-hidden group hover:border-emerald-500/40 transition-colors shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-[150%] h-[150%] -translate-y-1/2 -translate-x-1/4 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.12)_0%,transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight relative z-10">O Padrão Beat Flow</h4>
                <p className="text-sm text-emerald-100/60 leading-relaxed mb-8 relative z-10">
                  O contratante clica no seu link oficial, escolhe a data pré-validada e fecha negócio instantaneamente. Formalização expressa e zero calotes.
                </p>

                <div className="w-full mt-auto space-y-3 relative z-10">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between group-hover:bg-emerald-500/15 transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">1. Data Validada no Calendário</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between group-hover:bg-emerald-500/15 transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">2. Rider Técnico Aprovado</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between group-hover:bg-emerald-500/15 transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">3. Sinal Pago no PIX (Escrow)</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          
          {/* Expandable Modal: Bio Completa & Rider Técnico */}
          <AnimatePresence>
            {selectedDetailSegment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setSelectedDetailSegment(null)}
                className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col justify-end sm:justify-center sm:p-5 md:p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: "100%", scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: "100%", scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-[#0C1017] sm:border border-zinc-800 rounded-t-[28px] sm:rounded-2xl shadow-[0_-15px_40px_rgba(0,0,0,0.5)] sm:shadow-2xl flex flex-col overflow-hidden text-left mx-auto"
                >
                  {/* Mobile Drag Handle */}
                  <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
                    <div className="w-12 h-1.5 rounded-full bg-zinc-700/50" />
                  </div>

                  {/* Modal Header */}
                  <div className="px-5 sm:px-7 pb-5 sm:pb-7 pt-2 sm:pt-7 border-b border-zinc-800/80 relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className="px-3 py-1 rounded-full border text-xs font-medium text-zinc-300 bg-white/5 border-white/10">
                          {selectedDetailSegment.badge}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Perfil Profissional Homologado
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {selectedDetailSegment.title}
                      </h3>
                      <p className="text-sm text-zinc-400 font-medium mt-1">
                        {selectedDetailSegment.subtitle}
                      </p>
                    </div>

                    {/* Close Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedDetailSegment(null)}
                        className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
                        aria-label="Fechar modal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Scrollable Content */}
                  <div className="px-5 sm:px-7 py-6 sm:py-7 overflow-y-auto space-y-7 relative z-10 custom-scrollbar overscroll-contain">
                    {/* Quick meta badges: Gênero, Experiência, Formato */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 uppercase mb-1">
                          <Headphones className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Estilo Musical</span>
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {selectedDetailSegment.genre}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 uppercase mb-1">
                          <Radio className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Trajetória</span>
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {selectedDetailSegment.experience}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 uppercase mb-1">
                          <Zap className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Formato do Set</span>
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {selectedDetailSegment.performanceFormat}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 1: Bio Artística Completa */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-zinc-400" />
                        <h4 className="text-base font-semibold text-white">
                          Biografia & Trajetória Artística
                        </h4>
                      </div>
                      <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-300 leading-relaxed space-y-3">
                        <p>{selectedDetailSegment.bio}</p>
                        <p className="text-xs text-zinc-500">
                          Perfil estruturado no Beat Flow com sincronização de métricas e discografia oficial.
                        </p>
                      </div>
                    </div>

                    {/* SECTION 2: Rider Técnico Oficial */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-zinc-400" />
                          <h4 className="text-base font-semibold text-white">
                            Rider Técnico & Equipamentos Homologados
                          </h4>
                        </div>
                        <span className="text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                          {selectedDetailSegment.tagText}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                          <div className="text-xs text-zinc-400 uppercase mb-1 flex items-center gap-1.5">
                            <Disc3 className="w-3.5 h-3.5 text-zinc-300" />
                            <span>Players / Decks</span>
                          </div>
                          <div className="text-sm text-zinc-200 leading-relaxed font-medium">
                            {selectedDetailSegment.rider.players}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                          <div className="text-xs text-zinc-400 uppercase mb-1 flex items-center gap-1.5">
                            <Sliders className="w-3.5 h-3.5 text-zinc-300" />
                            <span>Mixer & Áudio</span>
                          </div>
                          <div className="text-sm text-zinc-200 leading-relaxed font-medium">
                            {selectedDetailSegment.rider.mixer}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                          <div className="text-xs text-zinc-400 uppercase mb-1 flex items-center gap-1.5">
                            <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
                            <span>Monitoramento de Cabine</span>
                          </div>
                          <div className="text-sm text-zinc-200 leading-relaxed font-medium">
                            {selectedDetailSegment.rider.booth}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                          <div className="text-xs text-zinc-400 uppercase mb-1 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-zinc-300" />
                            <span>Alimentação Elétrica</span>
                          </div>
                          <div className="text-sm text-zinc-200 leading-relaxed font-medium">
                            {selectedDetailSegment.rider.power}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                          <div className="text-xs text-zinc-400 uppercase mb-1 flex items-center gap-1.5">
                            <Radio className="w-3.5 h-3.5 text-zinc-300" />
                            <span>Microfonação & Voz</span>
                          </div>
                          <div className="text-sm text-zinc-200 leading-relaxed font-medium">
                            {selectedDetailSegment.rider.mic}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                          <div className="text-xs text-zinc-400 uppercase mb-1 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-zinc-300" />
                            <span>Conexões & Rede</span>
                          </div>
                          <div className="text-sm text-zinc-200 leading-relaxed font-medium">
                            {selectedDetailSegment.rider.connections}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 leading-relaxed flex items-start gap-2.5">
                        <span className="font-semibold text-zinc-200 shrink-0">Observação Técnica:</span>
                        <span>{selectedDetailSegment.rider.stageNotes}</span>
                      </div>
                    </div>

                    {/* SECTION 3: Highlights & Diferenciais */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                        Garantias & Padrões de Apresentação
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {selectedDetailSegment.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-zinc-300">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="p-5 sm:p-6 bg-zinc-900/80 border-t border-zinc-800 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-zinc-400">
                      Disponibilidade sob consulta em tempo real no calendário.
                    </div>
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          const segIndex = djSegments.findIndex(s => s.title === selectedDetailSegment.title);
                          setSelectedDetailSegment(null);
                          if (segIndex !== -1) {
                            handleScrollToBooking(segIndex);
                          }
                        }}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5 text-zinc-950" />
                        <span>Simular Proposta para este Formato</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedDetailSegment(null)}
                        className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white cursor-pointer transition-all"
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Luminous Light Beam Divider */}
      <LuminousDivider glow={true} />

      {/* ---------------------------------------------------- */}
      {/* FINAL HIGH-CONVERSION CTA BANNER */}
      {/* ---------------------------------------------------- */}
      <section className="py-28 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#05050a] relative overflow-hidden text-center">
        
        {/* Glow spotlights behind banner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-[#8A3FFC]/25 via-[#A855F7]/30 to-[#00D1FF]/20 blur-[180px] rounded-full pointer-events-none" />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#C084FC]" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/80">GARANTA SEU LINK EXCLUSIVO</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Seu próximo pedido pode começar pelo seu link.
          </h2>

          <p className="text-base sm:text-xl text-[rgba(255,255,255,0.72)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Crie seu perfil Beat Flow e transforme sua presença em oportunidades.
          </p>

          {/* Interactive DJ Handle Reservation Box (High-Conversion UX) */}
          <div className="max-w-xl mx-auto mb-3 p-2 rounded-2xl bg-[#0e0c1c]/90 border border-[#8A3FFC]/40 backdrop-blur-2xl shadow-[0_0_45px_rgba(138,63,252,0.35)] flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 flex items-center px-4 py-2.5 w-full bg-black/40 rounded-xl border border-white/10 focus-within:border-[#8A3FFC] focus-within:ring-2 focus-within:ring-[#8A3FFC]/30 transition-all">
              <label htmlFor="dj-handle-reservation-input" className="sr-only">
                Nome de usuário ou handle para reservar seu perfil no Beat Flow
              </label>
              <span className="text-white/40 font-mono text-sm sm:text-base select-none" aria-hidden="true">beatflow.me/@</span>
              <input 
                id="dj-handle-reservation-input"
                type="text" 
                placeholder="seunome" 
                aria-label="Escolha seu nome de usuário exclusivo na Beat Flow"
                value={djHandleInput}
                onChange={(e) => setDjHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ''))}
                className="bg-transparent text-white font-mono text-sm sm:text-base focus:outline-none w-full placeholder:text-white/30 ml-0.5"
              />
            </div>
            <Link 
              href={`/login?mode=signup${djHandleInput ? `&handle=${encodeURIComponent(djHandleInput)}` : ''}`} 
              className="w-full sm:w-auto"
            >
              <button 
                type="button"
                aria-label="Reservar link exclusivo do perfil"
                className="w-full sm:w-auto h-12 px-7 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8A3FFC] to-[#00D1FF] hover:brightness-110 text-white font-black text-sm shadow-[0_0_25px_rgba(138,63,252,0.6)] flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <span>Reservar link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Live Availability Feedback Badge */}
          <div className="mb-10 min-h-[24px]">
            {djHandleInput.trim().length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>beatflow.me/@{djHandleInput} está disponível para reserva imediata!</span>
              </motion.div>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs font-mono text-white/40 px-3 py-1">
                <span>⚡ Digite o nome do seu projeto para verificar disponibilidade em tempo real</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/login?mode=signup">
              <button className="h-15 px-10 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] text-white font-black text-base shadow-[0_0_30px_rgba(138,63,252,0.5)] hover:shadow-[0_0_40px_rgba(138,63,252,0.8)] flex items-center gap-3 transition-all transform hover:-translate-y-1 cursor-pointer">
                <span>Criar meu Press Kit grátis</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <Link href="/explorar">
              <button className="h-15 px-8 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all cursor-pointer">
                Ver perfil ao vivo
              </button>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-[rgba(255,255,255,0.6)]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Configuração em 2 minutos</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sem cartão de crédito</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% responsivo em qualquer tela</span>
            </span>
          </div>
        </div>
      </section>

      {/* Luminous Light Beam Divider */}
      <LuminousDivider glow={false} />

      {/* ---------------------------------------------------- */}
      {/* OFFICIAL FOOTER */}
      {/* ---------------------------------------------------- */}
      <footer className="py-12 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#040308] text-xs text-[rgba(255,255,255,0.72)]">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
            <div>
              <Logo size="md" />
              <p className="text-[rgba(255,255,255,0.72)] text-xs mt-3 max-w-sm leading-relaxed">
                A plataforma oficial de presença digital e contratação de DJs. Mais que um link, o seu próximo set.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-xs font-medium text-white/70">
              <Link href="/explorar" className="hover:text-white transition">Sobre</Link>
              <a href="#para-quem-e" className="hover:text-white transition">Preços</a>
              <Link href="/login" className="hover:text-white transition">Entrar</Link>
              <a href="#tudo-em-um-so-lugar" className="hover:text-white transition">Termos</a>
              <a href="#tudo-em-um-so-lugar" className="hover:text-white transition">Privacidade</a>
              <Link href="/login" className="hover:text-white transition">Contato</Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-[11px]">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white tracking-widest">BEAT FLOW</span>
              <span className="text-white/20">•</span>
              <span>O PRIMEIRO LINK PARA GRANDES OPORTUNIDADES</span>
            </div>

            <div className="text-center font-medium tracking-wider text-white/60">
              Música conecta. Pessoas transformam.
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-[rgba(255,255,255,0.48)]">
              <span>BEAT FLOW</span>
              <span>/</span>
              <span>CULTURA</span>
              <span>/</span>
              <span>SOM</span>
              <span>/</span>
              <span>PESSOAS</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Video Presentation Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="relative w-full max-w-3xl bg-[#0e0c1a] border border-white/20 rounded-2xl overflow-hidden shadow-2xl p-6">
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-white p-2 rounded-full bg-white/10 transition"
              aria-label="Fechar vídeo"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-[#8A3FFC] fill-[#8A3FFC]" />
              <span>Conheça a Experiência Beat Flow</span>
            </h3>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#8A3FFC]/20 border border-[#8A3FFC] flex items-center justify-center mb-4 text-[#8A3FFC] animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-white mb-2">Vitrine e Sala Privada</h4>
              <p className="text-sm text-[rgba(255,255,255,0.72)] max-w-md mb-6 leading-relaxed">
                Veja como o DJ cria seu link profissional com tocador sonoro contínuo, recebe pré-propostas estruturadas e fecha contratos em salas criptografadas.
              </p>
              <Link href="/login?mode=signup" onClick={() => setIsVideoModalOpen(false)}>
                <Button className="bg-[#8A3FFC] hover:bg-[#8A3FFC]/90 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg shadow-[#8A3FFC]/30">
                  Criar Perfil de Artista Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
