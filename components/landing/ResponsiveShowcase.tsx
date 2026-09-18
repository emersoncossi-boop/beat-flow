'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  Pause,
  Menu,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  Send,
  Sliders,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Check,
  Volume2,
  ChevronRight,
  ExternalLink,
  Users,
  Search,
  Bell,
  Home,
  Compass,
  User,
  Instagram,
  Disc3,
  Share2
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function ResponsiveShowcase() {
  const [activeTab, setActiveTab] = useState<'landing' | 'profile' | 'booking' | 'dashboard'>('landing');
  
  // Interactive states inside the mobile mockups
  const [isPlayingLuna, setIsPlayingLuna] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedEventType, setSelectedEventType] = useState('Festa particular');
  const [selectedDashboardTab, setSelectedDashboardTab] = useState<'todos' | 'novos' | 'negociacao' | 'fechados'>('todos');

  // Dashboard orders from responsive-board.png
  const dashboardOrders = [
    { id: 1, type: 'Evento Corporativo', location: 'São Paulo - SP', date: '11/11/2026', status: 'Novo', statusColor: 'bg-green-500/20 text-green-400 border-green-500/30', category: 'novos' },
    { id: 2, type: 'Festa Particular', location: 'São Paulo - SP', date: '22/11/2026', status: 'Em negociação', statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30', category: 'negociacao' },
    { id: 3, type: 'Casa Noturna', location: 'Rio de Janeiro - RJ', date: '28/11/2026', status: 'Proposta enviada', statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30', category: 'negociacao' },
    { id: 4, type: 'Festival', location: 'São Paulo - SP', date: '05/12/2026', status: 'Novo', statusColor: 'bg-green-500/20 text-green-400 border-green-500/30', category: 'novos' },
    { id: 5, type: 'Evento Corporativo', location: 'Belo Horizonte - MG', date: '12/12/2026', status: 'Fechado', statusColor: 'bg-[#8A3FFC]/25 text-[#C084FC] border-[#8A3FFC]/40', category: 'fechados' },
  ];

  const filteredOrders = dashboardOrders.filter(order => {
    if (selectedDashboardTab === 'todos') return true;
    return order.category === selectedDashboardTab;
  });

  return (
    <section id="design-responsivo" className="py-16 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#06050b] relative overflow-hidden">
      
      {/* Background radial glow matching the halo ring and aurora tokens */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#8A3FFC]/12 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00D1FF]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Master Header directly following responsive-board.png */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A3FFC]/15 border border-[#8A3FFC]/30 text-[#C084FC] text-xs font-mono font-bold tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
            <span>DESIGN RESPONSIVO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4">
            Um link. A mesma presença em qualquer tela.
          </h2>
          <p className="text-base sm:text-lg text-[rgba(255,255,255,0.72)] leading-relaxed max-w-2xl mx-auto font-light">
            Seu Press Kit se adapta ao dispositivo sem perder identidade ou clareza.
          </p>

          {/* Interactive Navigation Tabs for the 4 Sections in responsive-board.png */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 max-w-2xl mx-auto backdrop-blur-md">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'landing'
                  ? 'bg-[#8A3FFC] text-white shadow-[0_0_20px_rgba(138,63,252,0.5)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>01. Landing Page</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'bg-[#8A3FFC] text-white shadow-[0_0_20px_rgba(138,63,252,0.5)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4" />
              <span>02. Perfil DJ</span>
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'booking'
                  ? 'bg-[#8A3FFC] text-white shadow-[0_0_20px_rgba(138,63,252,0.5)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>03. Pedido Conversacional</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'bg-[#8A3FFC] text-white shadow-[0_0_20px_rgba(138,63,252,0.5)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>04. Dashboard DJ</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 01. LANDING PAGE (Desktop, Tablet & Mobile Mockups) */}
        {activeTab === 'landing' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              
              {/* 1. DESKTOP MOCKUP (1440 x 900) - 6 cols */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full rounded-[24px] border border-white/15 bg-[#0d0c18] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group">
                  <div className="aspect-[16/10] w-full rounded-[16px] overflow-hidden border border-white/10 relative bg-[#090812]">
                    <Image 
                      src="/assets/landing/hero-dj-stage.jpg"
                      alt="Beat Flow Desktop View"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-45 brightness-90"
                    />
                    
                    <div className="absolute inset-0 p-5 flex flex-col justify-between bg-gradient-to-t from-[#090812] via-[#090812]/40 to-[#090812]/90">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <Logo size="sm" />
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-white/70">DJs</span>
                          <span className="text-[10px] text-white/70">Eventos</span>
                          <span className="text-[10px] text-white/70">Como funciona</span>
                          <span className="text-[10px] text-white/70">Planos</span>
                          <span className="text-[10px] text-white font-bold px-3 py-1 rounded-full bg-[#8A3FFC]">Entrar</span>
                        </div>
                      </div>

                      {/* Center Headline */}
                      <div className="max-w-[320px] my-auto">
                        <div className="text-[26px] font-black text-white leading-[0.95]">
                          MÚSICA<br />
                          CONECTA<br />
                          <span className="text-[#FF4DDB]">PESSOAS</span>
                        </div>
                        <p className="text-[11px] text-white/70 mt-2 font-light">
                          O primeiro link inteligente entre DJs e oportunidades.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="px-3.5 py-1.5 rounded-full bg-[#8A3FFC] text-white text-[10px] font-bold shadow-md">
                            Explorar DJs →
                          </div>
                          <div className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-[10px] flex items-center gap-1 font-medium">
                            <Play className="w-2.5 h-2.5 fill-white" /> Ver o vídeo
                          </div>
                        </div>

                        {/* Real Badges */}
                        <div className="flex items-center gap-3 text-[9px] text-white/60 mt-3 font-medium">
                          <span>👤 DJs reais</span>
                          <span>📅 Eventos reais</span>
                          <span>💼 Oportunidades</span>
                        </div>
                      </div>

                      {/* Bottom mini dock */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] text-white/40">
                        <span>BEAT FLOW by NEXORA</span>
                        <span>1440 × 900</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-2.5 w-28 mx-auto bg-white/15 rounded-b-xl mt-2 border-t border-white/20" />
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-white block">
                    DESKTOP
                  </span>
                  <span className="text-[11px] font-mono text-[rgba(255,255,255,0.48)]">
                    1440px+ (12 colunas)
                  </span>
                </div>
              </div>

              {/* 2. TABLET MOCKUP (768 x 1024) - 3.5 cols */}
              <div className="lg:col-span-3 flex flex-col items-center">
                <div className="w-full max-w-[280px] rounded-[30px] border-[5px] border-white/15 bg-[#090812] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
                  <div className="aspect-[3/4] w-full rounded-[22px] overflow-hidden relative border border-white/10 bg-[#080710]">
                    <Image 
                      src="/assets/landing/hero-dj-stage.jpg"
                      alt="Beat Flow Tablet View"
                      fill
                      sizes="280px"
                      className="object-cover opacity-45"
                    />

                    <div className="absolute inset-0 p-3.5 flex flex-col justify-between bg-gradient-to-t from-[#080710] via-[#080710]/40 to-[#080710]/95">
                      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                        <span className="font-extrabold text-[11px] text-white tracking-widest">BEAT FLOW</span>
                        <Menu className="w-3.5 h-3.5 text-white" />
                      </div>

                      <div className="my-auto text-center">
                        <div className="text-[20px] font-black text-white leading-none">
                          MÚSICA<br />
                          CONECTA<br />
                          <span className="text-[#FF4DDB]">PESSOAS</span>
                        </div>
                        <p className="text-[9px] text-white/70 mt-1.5 leading-tight">
                          O primeiro link inteligente entre DJs e oportunidades.
                        </p>
                        <div className="mt-2.5 space-y-1.5">
                          <div className="w-full py-1.5 rounded-full bg-[#8A3FFC] text-white text-[9px] font-bold">
                            Explorar DJs →
                          </div>
                          <div className="w-full py-1.5 rounded-full border border-white/15 bg-white/5 text-white text-[9px] flex items-center justify-center gap-1 font-medium">
                            <Play className="w-2 h-2 fill-white" /> Ver o vídeo
                          </div>
                        </div>
                      </div>

                      {/* Tablet Bottom Dock */}
                      <div className="grid grid-cols-4 gap-1 p-1 bg-white/5 rounded-xl border border-white/10 text-center text-[8px] text-white/60">
                        <span className="text-[#8A3FFC] font-bold">Início</span>
                        <span>Explorar</span>
                        <span>Eventos</span>
                        <span>Perfil</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-white block">
                    TABLET
                  </span>
                  <span className="text-[11px] font-mono text-[rgba(255,255,255,0.48)]">
                    768 × 1024 (8 colunas)
                  </span>
                </div>
              </div>

              {/* 3. MOBILE MOCKUP (375 x 812) - 2.5 cols (HIGHLIGHTED AS PER PROMPT!) */}
              <div className="lg:col-span-3 flex flex-col items-center">
                <div className="w-full max-w-[240px] rounded-[36px] border-[5px] border-[#8A3FFC]/50 bg-[#07060d] p-2 shadow-[0_0_40px_rgba(138,63,252,0.35)] relative">
                  
                  {/* Dynamic Island Notch */}
                  <div className="w-16 h-3 bg-black rounded-full mx-auto mb-1.5 border border-white/10" />

                  <div className="aspect-[9/19] w-full rounded-[26px] overflow-hidden relative border border-white/10 bg-[#080710]">
                    <Image 
                      src="/assets/landing/hero-dj-stage.jpg"
                      alt="Beat Flow Mobile View"
                      fill
                      sizes="240px"
                      className="object-cover opacity-45"
                    />

                    <div className="absolute inset-0 p-3 flex flex-col justify-between bg-gradient-to-t from-[#080710] via-[#080710]/40 to-[#080710]/95">
                      {/* Mobile Top Bar */}
                      <div className="flex items-center justify-between text-[10px] font-black text-white border-b border-white/10 pb-1.5">
                        <span className="text-xs tracking-wider">BEAT FLOW</span>
                        <Menu className="w-3.5 h-3.5 text-white" />
                      </div>

                      {/* Mobile Hero Center */}
                      <div className="text-center my-auto">
                        <div className="text-[20px] font-black text-white leading-tight">
                          MÚSICA<br />
                          CONECTA<br />
                          <span className="text-[#FF4DDB]">PESSOAS</span>
                        </div>
                        <p className="text-[8.5px] text-white/75 mt-1 leading-tight px-1 font-light">
                          O primeiro link inteligente entre DJs e oportunidades.
                        </p>
                        
                        <div className="mt-3 space-y-1.5">
                          <Link href="/explorar" className="block">
                            <div className="w-full py-1.5 rounded-full bg-[#8A3FFC] text-white text-[9.5px] font-bold shadow-md shadow-[#8A3FFC]/40">
                              Explorar DJs →
                            </div>
                          </Link>
                          <div className="w-full py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-[9px] flex items-center justify-center gap-1 font-medium">
                            <Play className="w-2 h-2 fill-white" /> Ver o vídeo
                          </div>
                        </div>

                        {/* Real Badges in Mobile */}
                        <div className="flex items-center justify-center gap-2 text-[7.5px] text-white/70 mt-2 font-medium">
                          <span>👤 DJs</span>
                          <span>•</span>
                          <span>📅 Eventos</span>
                          <span>•</span>
                          <span>💼 Oportunidades</span>
                        </div>
                      </div>

                      {/* Mobile Fixed Dock Bar */}
                      <div className="p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 grid grid-cols-4 gap-1 text-center text-[8px]">
                        <div className="flex flex-col items-center text-[#8A3FFC] font-bold">
                          <Home className="w-3 h-3" />
                          <span>Início</span>
                        </div>
                        <div className="flex flex-col items-center text-white/50">
                          <Compass className="w-3 h-3" />
                          <span>Explorar</span>
                        </div>
                        <div className="flex flex-col items-center text-white/50">
                          <Calendar className="w-3 h-3" />
                          <span>Eventos</span>
                        </div>
                        <div className="flex flex-col items-center text-white/50">
                          <User className="w-3 h-3" />
                          <span>Perfil</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#00D1FF] block">
                    MOBILE (375 × 812)
                  </span>
                  <span className="text-[11px] font-mono text-white/60">
                    4 colunas • Layout Nativo
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: 02. PERFIL PÚBLICO DO DJ (Mobile 375px Focus) */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left explanation info */}
            <div className="md:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[#00D1FF] text-xs font-mono font-bold uppercase">
                02. PERFIL PÚBLICO DO DJ • FORMATO MOBILE
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Luna Martins no Smartphone
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                O perfil público do DJ em <strong className="text-white">375px</strong> foi estruturado para conversão máxima: hero condensado com foto e badge verificado, bio magnética, player de áudio direto de 30 segundos, redes sociais oficiais e agenda do mês com solicitação instantânea.
              </p>
              
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D1FF]" />
                  <span>Call to Action primário dominante: <strong>Solicitar orçamento</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8A3FFC]" />
                  <span>Player integrado: <strong>Ouvir mix (30s)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF4DDB]" />
                  <span>Calendário interativo de disponibilidade (Novembro 2026)</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/luna-martins">
                  <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white text-xs font-bold shadow-lg hover:opacity-95 transition flex items-center gap-2">
                    <span>Abrir perfil real da Luna Martins</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Mobile Mockup Frame for Luna Martins */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-[280px] rounded-[38px] border-[5px] border-[#00D1FF]/40 bg-[#080710] p-2 shadow-[0_0_50px_rgba(0,209,255,0.25)] relative">
                
                {/* Notch */}
                <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2 border border-white/10" />

                {/* Mobile Screen */}
                <div className="aspect-[9/19] w-full rounded-[28px] overflow-hidden relative border border-white/10 bg-[#0d0c18] p-3 flex flex-col justify-between text-left overflow-y-auto">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-black text-white tracking-wider">BEAT FLOW</span>
                    <div className="flex items-center gap-2">
                      <Share2 className="w-3 h-3 text-white/70" />
                      <Menu className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Luna Martins Card */}
                  <div className="space-y-2 py-2">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#8A3FFC] shadow-lg mx-auto">
                      <Image 
                        src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop" 
                        alt="Luna Martins" 
                        fill 
                        className="object-cover" 
                      />
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm font-bold text-white">Luna Martins</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D1FF] fill-[#00D1FF]/20" />
                      </div>
                      <span className="text-[9px] text-white/60">São Paulo - SP</span>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center justify-center gap-1 text-[8px]">
                      <span className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80">Tech House</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80">Melodic</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80">Progressive</span>
                    </div>

                    {/* Bio exactly from responsive-board.png */}
                    <p className="text-[8.5px] text-white/75 text-center leading-relaxed italic">
                      &ldquo;Música é energia que transforma momentos em memórias. Vamos criar algo único juntos?&rdquo;
                    </p>

                    {/* Buttons */}
                    <div className="space-y-1.5 pt-1">
                      <Link href="/luna-martins">
                        <div className="w-full py-2 rounded-xl bg-[#8A3FFC] text-white text-[10px] font-bold text-center shadow-md shadow-[#8A3FFC]/40">
                          Solicitar orçamento
                        </div>
                      </Link>
                      
                      <button 
                        onClick={() => setIsPlayingLuna(!isPlayingLuna)}
                        className="w-full py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-[9px] flex items-center justify-center gap-1.5 font-medium transition"
                      >
                        {isPlayingLuna ? (
                          <>
                            <Pause className="w-2.5 h-2.5 fill-white" />
                            <span>Pausando mix...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-2.5 h-2.5 text-[#00D1FF]" />
                            <span>Ouvir mix (30s)</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Social icons row */}
                    <div className="flex items-center justify-center gap-2 pt-1 text-[9px] text-white/60">
                      <span className="p-1 rounded-full bg-white/5">f</span>
                      <span className="p-1 rounded-full bg-white/5">IG</span>
                      <span className="p-1 rounded-full bg-white/5">SC</span>
                      <span className="p-1 rounded-full bg-white/5">SP</span>
                    </div>

                    {/* Disponibilidade mini */}
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-left">
                      <span className="text-[9px] font-bold text-white block mb-1">Disponibilidade • Nov 2026</span>
                      <div className="grid grid-cols-7 gap-1 text-[7.5px] text-center text-white/60">
                        <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                        <span className="text-white/20">26</span><span className="text-white/20">27</span><span className="text-white/20">28</span><span className="text-white/20">29</span><span className="text-white/20">30</span><span>1</span><span className="bg-[#8A3FFC] text-white rounded font-bold">2</span>
                        <span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span className="bg-[#00D1FF] text-black rounded font-bold">8</span><span>9</span>
                      </div>
                    </div>
                  </div>

                  {/* Dock */}
                  <div className="border-t border-white/10 pt-1 text-[8px] text-center text-white/40">
                    Perfil Oficial • beatflow.com/luna-martins
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: 03. PEDIDO CONVERSACIONAL (Mobile 375px Focus) */}
        {activeTab === 'booking' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left explanation info */}
            <div className="md:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4DDB]/15 border border-[#FF4DDB]/30 text-[#FF4DDB] text-xs font-mono font-bold uppercase">
                03. PEDIDO CONVERSACIONAL • 7 PASSOS MOBILE
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Simples, rápido e sem cadastro
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                O fluxo conversacional permite ao contratante detalhar data, tipo de evento, local e receber proposta sem atrito em menos de 2 minutos.
              </p>

              {/* Step indicator controls */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest block">
                  Selecione a etapa para simular no smartphone:
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                    <button
                      key={s}
                      onClick={() => setBookingStep(s)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition ${
                        bookingStep === s
                          ? 'bg-[#8A3FFC] text-white shadow-md'
                          : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      P{s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
                <div className="font-bold text-white">Etapa atual no mockup: Passo {bookingStep} de 7</div>
                <div className="text-white/60">
                  {bookingStep === 1 && 'Boas-vindas e início sem fricção.'}
                  {bookingStep === 2 && 'Qual é o tipo de evento? (Particular, Corporativo, etc.)'}
                  {bookingStep === 3 && 'Quando será o evento? (Seletor de data intuitivo)'}
                  {bookingStep === 4 && 'Qual é o local? (Cidade / Estado)'}
                  {bookingStep === 5 && 'Informações adicionais e observações.'}
                  {bookingStep === 6 && 'Resumo transparente do pedido.'}
                  {bookingStep === 7 && 'Confirmação e acompanhamento de proposta.'}
                </div>
              </div>
            </div>

            {/* Right: Mobile Mockup Simulating Step */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-[280px] rounded-[38px] border-[5px] border-[#FF4DDB]/40 bg-[#080710] p-2 shadow-[0_0_50px_rgba(255,77,219,0.25)] relative">
                
                <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2 border border-white/10" />

                <div className="aspect-[9/19] w-full rounded-[28px] overflow-hidden relative border border-white/10 bg-[#0d0c18] p-3 flex flex-col justify-between text-left">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-black text-white tracking-wider">BEAT FLOW</span>
                    <span className="text-[9px] font-mono text-[#FF4DDB]">Passo {bookingStep}/7</span>
                  </div>

                  {/* Step Content */}
                  <div className="my-auto space-y-3">
                    {bookingStep === 1 && (
                      <div className="text-center space-y-3">
                        <div className="w-10 h-10 rounded-full bg-[#8A3FFC]/20 border border-[#8A3FFC]/40 flex items-center justify-center mx-auto text-[#8A3FFC]">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-white">
                          Vamos encontrar o DJ ideal para o seu evento?
                        </h4>
                        <p className="text-[9px] text-white/70 leading-relaxed">
                          Responda algumas perguntas e receba uma proposta personalizada.
                        </p>
                        <button 
                          onClick={() => setBookingStep(2)}
                          className="w-full py-2 rounded-xl bg-[#8A3FFC] text-white text-[10px] font-bold shadow-md shadow-[#8A3FFC]/40"
                        >
                          Começar agora
                        </button>
                        <span className="text-[7.5px] text-white/40 block">Sem cadastro • Leva menos de 2 minutos</span>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-white text-center">Qual é o tipo de evento?</h4>
                        {['Festa particular', 'Evento corporativo', 'Casa noturna', 'Festival', 'Outro'].map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setSelectedEventType(t);
                              setBookingStep(3);
                            }}
                            className={`w-full py-2 px-3 rounded-xl text-[9.5px] font-medium border text-left flex items-center justify-between transition ${
                              selectedEventType === t
                                ? 'bg-[#8A3FFC]/20 border-[#8A3FFC] text-white font-bold'
                                : 'bg-white/5 border-white/10 text-white/75 hover:bg-white/10'
                            }`}
                          >
                            <span>{t}</span>
                            <ChevronRight className="w-3 h-3 text-white/40" />
                          </button>
                        ))}
                      </div>
                    )}

                    {bookingStep === 3 && (
                      <div className="space-y-2 text-center">
                        <h4 className="text-xs font-bold text-white">Quando será o evento?</h4>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                          <Calendar className="w-6 h-6 text-[#8A3FFC] mx-auto mb-1" />
                          <span className="text-xs font-bold text-white block">15/11/2026</span>
                          <span className="text-[8px] text-white/50">Sábado • Noite</span>
                        </div>
                        <button 
                          onClick={() => setBookingStep(4)}
                          className="w-full py-2 rounded-xl bg-[#8A3FFC] text-white text-[10px] font-bold"
                        >
                          Confirmar data
                        </button>
                      </div>
                    )}

                    {bookingStep === 4 && (
                      <div className="space-y-2 text-center">
                        <h4 className="text-xs font-bold text-white">Qual é o local?</h4>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#00D1FF]" />
                          <input 
                            readOnly 
                            value="São Paulo - SP" 
                            className="bg-transparent text-xs text-white font-medium focus:outline-none w-full"
                          />
                        </div>
                        <button 
                          onClick={() => setBookingStep(5)}
                          className="w-full py-2 rounded-xl bg-[#8A3FFC] text-white text-[10px] font-bold"
                        >
                          Continuar
                        </button>
                      </div>
                    )}

                    {bookingStep === 5 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-white text-center">Alguma informação adicional?</h4>
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[9px] text-white/70 h-16 leading-tight">
                          Ex.: Número aproximado de convidados, estilo musical preferido, rider técnico...
                        </div>
                        <button 
                          onClick={() => setBookingStep(6)}
                          className="w-full py-2 rounded-xl bg-[#8A3FFC] text-white text-[10px] font-bold"
                        >
                          Continuar para o resumo
                        </button>
                      </div>
                    )}

                    {bookingStep === 6 && (
                      <div className="space-y-2 text-left">
                        <h4 className="text-xs font-bold text-white text-center">Resumo do pedido</h4>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[9px]">
                          <div className="flex justify-between"><span className="text-white/50">Tipo:</span> <span className="font-bold text-white">{selectedEventType}</span></div>
                          <div className="flex justify-between"><span className="text-white/50">Data:</span> <span className="font-bold text-white">15/11/2026</span></div>
                          <div className="flex justify-between"><span className="text-white/50">Local:</span> <span className="font-bold text-white">São Paulo - SP</span></div>
                          <div className="flex justify-between"><span className="text-white/50">DJ:</span> <span className="font-bold text-[#00D1FF]">Luna Martins</span></div>
                        </div>
                        <button 
                          onClick={() => setBookingStep(7)}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white text-[10px] font-bold shadow-lg"
                        >
                          Enviar solicitação
                        </button>
                      </div>
                    )}

                    {bookingStep === 7 && (
                      <div className="text-center space-y-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto text-green-400">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-white">Solicitação enviada com sucesso!</h4>
                        <p className="text-[8.5px] text-white/70 leading-relaxed">
                          O DJ receberá sua solicitação e em breve entrará em contato.
                        </p>
                        <button 
                          onClick={() => setBookingStep(1)}
                          className="w-full py-1.5 rounded-xl bg-white/10 text-white text-[9px] font-bold hover:bg-white/15 transition"
                        >
                          Recomeçar fluxo
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Navigation dots */}
                  <div className="flex items-center justify-center gap-1 pt-2 border-t border-white/10">
                    {[1, 2, 3, 4, 5, 6, 7].map((dot) => (
                      <span 
                        key={dot}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          bookingStep === dot ? 'bg-[#FF4DDB] w-3' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: 04. DASHBOARD DO DJ (Mobile 375px Focus) */}
        {activeTab === 'dashboard' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left explanation info */}
            <div className="md:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A3FFC]/15 border border-[#8A3FFC]/30 text-[#C084FC] text-xs font-mono font-bold uppercase">
                04. DASHBOARD DO DJ • GESTÃO NO CELULAR
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Meus Pedidos na Palma da Mão
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                No formato mobile de <strong className="text-white">375px</strong>, a aba Meus Pedidos permite filtrar propostas em segundos: <em>Todos (12)</em>, <em>Novos (4)</em>, <em>Em negociação (3)</em> e <em>Fechados (5)</em>, com status destacados por cor sem poluição visual.
              </p>

              {/* Filter toggle preview */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest block">
                  Filtrar pedidos no smartphone:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDashboardTab('todos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedDashboardTab === 'todos' ? 'bg-[#8A3FFC] text-white' : 'bg-white/5 text-white/60'
                    }`}
                  >
                    Todos (12)
                  </button>
                  <button
                    onClick={() => setSelectedDashboardTab('novos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedDashboardTab === 'novos' ? 'bg-[#8A3FFC] text-white' : 'bg-white/5 text-white/60'
                    }`}
                  >
                    Novos (4)
                  </button>
                  <button
                    onClick={() => setSelectedDashboardTab('negociacao')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedDashboardTab === 'negociacao' ? 'bg-[#8A3FFC] text-white' : 'bg-white/5 text-white/60'
                    }`}
                  >
                    Em negociação (3)
                  </button>
                  <button
                    onClick={() => setSelectedDashboardTab('fechados')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedDashboardTab === 'fechados' ? 'bg-[#8A3FFC] text-white' : 'bg-white/5 text-white/60'
                    }`}
                  >
                    Fechados (5)
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <Link href="/dashboard">
                  <button className="px-5 py-2.5 rounded-full bg-[#8A3FFC] hover:bg-[#7C3AED] text-white text-xs font-bold shadow-lg transition flex items-center gap-2">
                    <span>Acessar Dashboard Completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Mobile Mockup Frame for Dashboard */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-[280px] rounded-[38px] border-[5px] border-[#8A3FFC]/40 bg-[#080710] p-2 shadow-[0_0_50px_rgba(138,63,252,0.25)] relative">
                
                <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2 border border-white/10" />

                <div className="aspect-[9/19] w-full rounded-[28px] overflow-hidden relative border border-white/10 bg-[#0d0c18] p-3 flex flex-col justify-between text-left">
                  
                  {/* Dashboard Mobile Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-black text-white">BEAT FLOW</span>
                    <div className="flex items-center gap-2">
                      <Bell className="w-3 h-3 text-white/70" />
                      <div className="w-4 h-4 rounded-full bg-[#8A3FFC] text-[8px] flex items-center justify-center font-bold text-white">
                        DJ
                      </div>
                    </div>
                  </div>

                  {/* Orders Title & Filter Pills */}
                  <div className="py-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">Meus pedidos</span>
                      <span className="text-[8.5px] font-mono text-[#00D1FF]">12 ativos</span>
                    </div>

                    {/* Filter Tabs */}
                    <div className="grid grid-cols-4 gap-1 text-[7.5px] text-center font-semibold">
                      <button 
                        onClick={() => setSelectedDashboardTab('todos')}
                        className={`py-1 rounded ${selectedDashboardTab === 'todos' ? 'bg-[#8A3FFC] text-white' : 'bg-white/5 text-white/50'}`}
                      >
                        Todos (12)
                      </button>
                      <button 
                        onClick={() => setSelectedDashboardTab('novos')}
                        className={`py-1 rounded ${selectedDashboardTab === 'novos' ? 'bg-[#8A3FFC] text-white' : 'bg-white/5 text-white/50'}`}
                      >
                        Novos (4)
                      </button>
                      <button 
                        onClick={() => setSelectedDashboardTab('negociacao')}
                        className={`py-1 rounded ${selectedDashboardTab === 'negociacao' ? 'bg-[#8A3FFC] text-white' : 'bg-white/5 text-white/50'}`}
                      >
                        Negoc. (3)
                      </button>
                      <button 
                        onClick={() => setSelectedDashboardTab('fechados')}
                        className={`py-1 rounded ${selectedDashboardTab === 'fechados' ? 'bg-[#8A3FFC] text-white' : 'bg-white/5 text-white/50'}`}
                      >
                        Fech. (5)
                      </button>
                    </div>

                    {/* Orders List matching responsive-board.png */}
                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5">
                      {filteredOrders.map((order) => (
                        <div key={order.id} className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#8A3FFC]/40 flex items-center justify-between transition">
                          <div>
                            <div className="text-[9px] font-bold text-white">{order.type}</div>
                            <div className="text-[7.5px] text-white/50">{order.location} • {order.date}</div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[7px] px-1.5 py-0.5 rounded border font-medium ${order.statusColor}`}>
                              {order.status}
                            </span>
                            <span className="text-[8px] text-[#00D1FF] font-bold">Ver</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Dock Bar */}
                  <div className="p-1 rounded-xl bg-black/80 border border-white/10 grid grid-cols-4 gap-1 text-center text-[7.5px]">
                    <span className="text-white/50">Início</span>
                    <span className="text-[#8A3FFC] font-bold">Pedidos</span>
                    <span className="text-white/50">Agenda</span>
                    <span className="text-white/50">Perfil</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        )}

        {/* 05 & 06. BREAKPOINTS & PRINCÍPIOS RESPONSIVOS FROM THE BOARD */}
        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Breakpoints Table */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00D1FF] font-bold block">
              05. BREAKPOINTS E GRELHA RESPONSIVA
            </span>
            <h3 className="text-lg font-bold text-white">Estrutura de Colunas</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[#8A3FFC] font-bold block">Mobile</span>
                <span className="text-white font-mono text-[11px] block">320px - 767px</span>
                <span className="text-[10px] text-white/50">4 colunas</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[#00D1FF] font-bold block">Tablet</span>
                <span className="text-white font-mono text-[11px] block">768px - 1023px</span>
                <span className="text-[10px] text-white/50">8 colunas</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[#FF4DDB] font-bold block">Notebook</span>
                <span className="text-white font-mono text-[11px] block">1024px - 1439px</span>
                <span className="text-[10px] text-white/50">12 colunas</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-green-400 font-bold block">Desktop</span>
                <span className="text-white font-mono text-[11px] block">1440px+</span>
                <span className="text-[10px] text-white/50">12 colunas</span>
              </div>
            </div>
          </div>

          {/* Responsive Principles */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C084FC] font-bold block">
              06. PRINCÍPIOS RESPONSIVOS
            </span>
            <h3 className="text-lg font-bold text-white">Diretrizes de Implementação</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-white/80">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A3FFC]" />
                <span>Conteúdo prioritário</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF]" />
                <span>Navegação adaptativa</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4DDB]" />
                <span>Componentes flexíveis</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>Imagens otimizadas</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Tipografia escalável</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                <span>Performance fluida</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
