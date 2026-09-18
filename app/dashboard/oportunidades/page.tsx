'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Check, 
  ArrowLeft, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  Clock, 
  Music, 
  Building2, 
  ExternalLink,
  ShieldCheck,
  Disc3,
  UserCheck
} from 'lucide-react';

interface GigOpportunity {
  id: string;
  title: string;
  contractor: string;
  contractorType: 'Club' | 'Festival' | 'Agência' | 'Privado';
  city: string;
  venue: string;
  date: string;
  timeSlot: string;
  budget: string;
  genres: string[];
  description: string;
  technicalRequirements: string;
  applicantsCount: number;
  urgent?: boolean;
}

const INITIAL_OPPORTUNITIES: GigOpportunity[] = [
  {
    id: 'gig-1',
    title: 'DJ para Casamento Premium em Ilhabela',
    contractor: 'Agência Matrimoni & Som',
    contractorType: 'Agência',
    city: 'Ilhabela, SP',
    venue: 'Espaço Mar & Céu (Beira-mar)',
    date: '14 de Novembro de 2026',
    timeSlot: '21h00 às 03h00 (Set de 6 horas)',
    budget: 'R$ 4.500',
    genres: ['Tech House', 'House', 'Open Format'],
    description: 'Casamento para 220 convidados. O casal busca sonoridade sofisticada de início (House elegante) evoluindo para Tech House e remixes de clássicos na pista cheia.',
    technicalRequirements: 'Pioneer CDJ-3000 (par) + Mixer DJM-900 NXS2 + 2x Retornos QSC no palco.',
    applicantsCount: 7,
    urgent: true,
  },
  {
    id: 'gig-2',
    title: 'Warm-up Sunset Club • Abertura de Temporada',
    contractor: 'Solaris Beach Club',
    contractorType: 'Club',
    city: 'Rio de Janeiro, RJ',
    venue: 'Deck Lounge Barra',
    date: '28 de Novembro de 2026',
    timeSlot: '17h30 às 20h30 (Set de 3 horas)',
    budget: 'R$ 3.800',
    genres: ['Melodic Techno', 'Deep House', 'Afro House'],
    description: 'Sunset à beira da praia com público jovem e exigente. Procuramos artista com repertório melódico refinado e transições perfeitas para o pôr do sol.',
    technicalRequirements: 'Pioneer CDJ-3000 + DJM-A9 fornecido pela casa.',
    applicantsCount: 14,
  },
  {
    id: 'gig-3',
    title: 'Festival Aurora Stage Secundário',
    contractor: 'Curadoria Aurora Arts',
    contractorType: 'Festival',
    city: 'Curitiba, PR',
    venue: 'Parque das Pedreiras',
    date: '12 de Dezembro de 2026',
    timeSlot: '01h00 às 02h30 (Set de 90 min)',
    budget: 'R$ 7.200',
    genres: ['Techno', 'Melodic Techno', 'Progressive House'],
    description: 'Apresentação em palco imersivo com projeções e sistema Funktion-One. Curadoria busca projetos autorais ou DJs com identidade sonora marcante.',
    technicalRequirements: 'Rider completo Pioneer PRO DJ LINK ou Allen & Heath Xone:96 sob solicitação prévia.',
    applicantsCount: 29,
  },
  {
    id: 'gig-4',
    title: 'Festa Privada de Aniversário 30 Anos',
    contractor: 'Produção Rodrigo B.',
    contractorType: 'Privado',
    city: 'São Paulo, SP',
    venue: 'Rooftop Jardins',
    date: '05 de Dezembro de 2026',
    timeSlot: '22h00 às 02h00 (Set de 4 horas)',
    budget: 'R$ 3.200',
    genres: ['Tech House', 'Afro House', 'House'],
    description: 'Evento exclusivo para 80 convidados no rooftop. Foco em groove, basslines pulsantes e clima intimista de club europeu.',
    technicalRequirements: 'CDJ-2000 NXS2 ou 3000 no local + iluminação cênica instalada.',
    applicantsCount: 5,
  },
  {
    id: 'gig-5',
    title: 'Residência Semestral - Sextas de Verão',
    contractor: 'Grupo High Vibe',
    contractorType: 'Club',
    city: 'Florianópolis, SC',
    venue: 'Vibe Jurerê',
    date: 'Início Janeiro / 2027',
    timeSlot: 'Sextas-feiras • 23h00 às 02h00',
    budget: 'R$ 3.500 / noite',
    genres: ['House', 'Deep House', 'Indie Dance'],
    description: 'Contrato para 8 datas de temporada de verão. Artista residente para abrir e sustentar a pista antes dos headliners internacionais.',
    technicalRequirements: 'Setup Pioneer Nexus 2 completo no booth principal.',
    applicantsCount: 18,
  },
];

export default function OportunidadesPage() {
  const { djProfile } = useAuth();
  const [opportunities, setOpportunities] = useState<GigOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track applications made by this DJ
  const [appliedGigs, setAppliedGigs] = useState<Record<string, { date: string; message: string }>>({});
  const [applyingGigId, setApplyingGigId] = useState<string | null>(null);
  const [successModalGig, setSuccessModalGig] = useState<GigOpportunity | null>(null);

  const djSlug = djProfile?.slug || 'luna-martins';
  const djName = djProfile?.artisticName || 'Luna Martins';

  const handleApply = (gig: GigOpportunity) => {
    setApplyingGigId(gig.id);
    
    // Simulate instantaneous, frictionless 1-click submission
    setTimeout(() => {
      setAppliedGigs((prev) => ({
        ...prev,
        [gig.id]: {
          date: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          message: `Candidatura enviada com o Press Kit oficial: beatflow.art/${djSlug}`,
        },
      }));
      setApplyingGigId(null);
      setSuccessModalGig(gig);
    }, 600);
  };

  const filtered = opportunities.filter((gig) => {
    if (selectedCity !== 'all' && !gig.city.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }
    if (selectedGenre !== 'all' && !gig.genres.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase()))) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${gig.title} ${gig.venue} ${gig.city} ${gig.contractor} ${gig.description}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6 pb-24 sm:pb-16 px-3 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
            <Link href="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-zinc-200">Oportunidades</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Oportunidades de Apresentação
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Eventos, clubs e festivais buscando DJs com compatibilidade de perfil e rider.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden md:block">
            <span className="text-[11px] text-zinc-400 block">Press Kit Ativo</span>
            <span className="text-xs font-semibold text-zinc-200">beatflow.art/{djSlug}</span>
          </div>
          <Link href={`/${djSlug}`} target="_blank" className="w-full sm:w-auto">
            <Button size="sm" variant="outline" className="w-full sm:w-auto bg-zinc-900 border-zinc-800 text-zinc-200 text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 hover:text-white h-9 px-3.5">
              <span>Ver Press Kit</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0C1017] border border-zinc-800 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3">
          {/* Search input */}
          <div className="sm:col-span-6 relative">
            <label htmlFor="opportunities-search-input" className="sr-only">
              Buscar oportunidade, evento ou club
            </label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              id="opportunities-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar evento, club ou local..."
              aria-label="Buscar evento, club ou local"
              className="w-full h-9 sm:h-10 bg-zinc-900/90 border border-zinc-800 rounded-xl pl-9 pr-3 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#0C1017] focus:border-[#8A3FFC] transition-all"
            />
          </div>

          {/* City & Genre filter (2 cols on mobile for compact density) */}
          <div className="grid grid-cols-2 sm:col-span-6 gap-2">
            <div>
              <label htmlFor="opportunities-city-select" className="sr-only">
                Filtrar oportunidades por cidade
              </label>
              <select
                id="opportunities-city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label="Filtrar oportunidades por cidade"
                className="w-full h-9 sm:h-10 bg-zinc-900/90 border border-zinc-800 rounded-xl px-2.5 text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#0C1017] focus:border-[#8A3FFC] transition-all cursor-pointer"
              >
                <option value="all">Todas as Cidades</option>
                <option value="São Paulo">São Paulo - SP</option>
                <option value="Rio de Janeiro">Rio de Janeiro - RJ</option>
                <option value="Ilhabela">Ilhabela - SP</option>
                <option value="Curitiba">Curitiba - PR</option>
                <option value="Florianópolis">Florianópolis - SC</option>
              </select>
            </div>

            <div>
              <label htmlFor="opportunities-genre-select" className="sr-only">
                Filtrar oportunidades por gênero musical
              </label>
              <select
                id="opportunities-genre-select"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                aria-label="Filtrar oportunidades por gênero musical"
                className="w-full h-9 sm:h-10 bg-zinc-900/90 border border-zinc-800 rounded-xl px-2.5 text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#0C1017] focus:border-[#8A3FFC] transition-all cursor-pointer"
              >
                <option value="all">Todos os Gêneros</option>
                <option value="Tech House">Tech House</option>
                <option value="Melodic Techno">Melodic Techno</option>
                <option value="House">House</option>
                <option value="Deep House">Deep House</option>
                <option value="Afro House">Afro House</option>
                <option value="Open Format">Open Format</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick summary counts */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Exibindo <strong>{filtered.length}</strong> vagas abertas com cachê garantido</span>
          </div>
          <div className="text-[11px] text-zinc-400">
            {Object.keys(appliedGigs).length} candidaturas ativas
          </div>
        </div>
      </div>

      {/* Opportunities Single-Column Responsive List - Zero Horizontal Scroll */}
      <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
        {filtered.map((gig) => {
          const isApplied = Boolean(appliedGigs[gig.id]);
          const isApplying = applyingGigId === gig.id;

          return (
            <div
              key={gig.id}
              className="w-full rounded-2xl bg-[#0B0F17] border border-zinc-800 hover:border-zinc-700/80 p-3.5 sm:p-5 shadow-md transition-all space-y-3"
            >
              {/* Top Row: Type & Urgency Badge + Contractor + Budget */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                    {gig.contractorType}
                  </span>
                  {gig.urgent && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      Urgente
                    </span>
                  )}
                  <span className="text-xs text-zinc-400 hidden xs:inline">
                    Por <strong className="text-zinc-200 font-medium">{gig.contractor}</strong>
                  </span>
                </div>

                {/* Budget - Highlighted clearly */}
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-semibold text-zinc-400 block sm:hidden">Cachê</span>
                  <span className="text-base sm:text-xl font-bold text-white tracking-tight">{gig.budget}</span>
                </div>
              </div>

              {/* Title & Contractor info */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {gig.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5 xs:hidden">
                  Postado por <strong className="text-zinc-300 font-medium">{gig.contractor}</strong>
                </p>
              </div>

              {/* Key Details Strip (Compact Density on 360px-430px) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-2 px-2.5 sm:px-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60 text-xs">
                {/* Location */}
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-zinc-200 font-medium">{gig.city}</span>
                    <span className="text-zinc-400 text-[11px] ml-1.5 truncate">({gig.venue})</span>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-2 min-w-0">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-zinc-200 font-medium">{gig.date}</span>
                    <span className="text-zinc-400 text-[11px] ml-1.5 truncate">
                      ({gig.timeSlot.includes('(') ? gig.timeSlot.split('(')[0].trim() : gig.timeSlot})
                    </span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex items-center gap-2 min-w-0 sm:col-span-2 lg:col-span-1">
                  <Music className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {gig.genres.map(g => (
                      <span key={g} className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real Compatibility Indicators (Compact Pills) */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Compatibilidade:</span>
                <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                  <Check className="w-3 h-3 shrink-0" /> Gênero musical
                </span>
                <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                  <Check className="w-3 h-3 shrink-0" /> Rider técnico
                </span>
                <span className="text-emerald-400 font-medium text-xs flex items-center gap-1">
                  <Check className="w-3 h-3 shrink-0" /> Data livre na agenda
                </span>
              </div>

              {/* Description and Technical Requirements */}
              <div className="space-y-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <p className="line-clamp-2 sm:line-clamp-none">{gig.description}</p>
                <div className="text-xs text-zinc-400 flex items-start sm:items-center gap-1.5 pt-0.5">
                  <Disc3 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5 sm:mt-0" />
                  <span><strong className="text-zinc-200 font-medium">Rider exigido:</strong> {gig.technicalRequirements}</span>
                </div>
              </div>

              {/* Action Bar (Candidatar com Press Kit • em 1 clique) */}
              <div className="pt-2.5 border-t border-zinc-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <UserCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{gig.applicantsCount} DJs concorrendo</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400 text-[11px] sm:text-xs">Repasse via Beat Flow</span>
                </div>

                <div className="w-full sm:w-auto">
                  {isApplied ? (
                    <div className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm px-4 py-2 rounded-xl font-medium">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Candidatura Enviada • Press Kit Vinculado</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleApply(gig)}
                      disabled={isApplying}
                      className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs sm:text-sm px-5 h-9 sm:h-10 rounded-xl shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      {isApplying ? (
                        <>
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                          <span>Enviando Press Kit...</span>
                        </>
                      ) : (
                        <>
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>Candidatar com Press Kit (1 clique)</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <Briefcase className="w-8 h-8 text-zinc-500 mx-auto" />
            <h3 className="text-sm sm:text-base font-semibold text-white">Nenhuma oportunidade encontrada</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Tente alterar os filtros de cidade ou gênero musical para visualizar outras vagas disponíveis.
            </p>
          </div>
        )}
      </div>

      {/* Celebratory Modal after 1-Click Apply */}
      {successModalGig && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0C1017] border border-zinc-800 rounded-2xl p-5 sm:p-7 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <Check className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">Candidatura Enviada!</h3>
              <p className="text-xs text-zinc-400">
                Seu Press Kit completo foi entregue com prioridade para a curadoria de <strong className="text-zinc-200">{successModalGig.contractor}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Vaga:</span>
                <span className="text-zinc-200 font-medium text-right">{successModalGig.title}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Cachê Estimado:</span>
                <span className="text-white font-bold">{successModalGig.budget}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Press Kit Anexado:</span>
                <span className="text-zinc-200 font-mono">beatflow.art/{djSlug}</span>
              </div>
            </div>

            <div className="pt-1">
              <Button
                onClick={() => setSuccessModalGig(null)}
                className="w-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs sm:text-sm font-semibold h-10 rounded-xl"
              >
                Continuar Navegando
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
