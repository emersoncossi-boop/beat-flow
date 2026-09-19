'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { BookingFlow } from '@/components/booking/BookingFlow';
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  SlidersHorizontal 
} from 'lucide-react';
import { GenreTag, VerificadoBadge, WaveformIcon, StatusIndicator } from '@/components/ui/BeatFlowIcons';

interface ArtistCardData {
  name: string;
  slug: string;
  avatar: string;
  cover: string;
  city: string;
  genres: string[];
  rating: string;
  gigsCount: number;
  rateRange: string;
  featuredTrack: string;
  status: 'active' | 'busy';
}

const ARTISTS: ArtistCardData[] = [
  {
    name: 'Luna Martins',
    slug: 'luna-martins',
    avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    city: 'Rio de Janeiro - RJ',
    genres: ['Melodic Techno', 'Deep House'],
    rating: '5.0',
    gigsCount: 64,
    rateRange: 'R$ 2.500 - 7.000',
    featuredTrack: 'Midnight Flow (Original Mix)',
    status: 'active',
  },
  {
    name: 'DJ Skyline',
    slug: 'djskyline',
    avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    city: 'São Paulo - SP',
    genres: ['Tech House', 'House'],
    rating: '4.9',
    gigsCount: 48,
    rateRange: 'R$ 2.000 - 5.000',
    featuredTrack: 'Skyline Groove (VIP Mix)',
    status: 'active',
  },
  {
    name: 'Helena Fox',
    slug: 'helena-fox',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
    city: 'Curitiba - PR',
    genres: ['Techno', 'Industrial'],
    rating: '5.0',
    gigsCount: 36,
    rateRange: 'R$ 3.000 - 8.000',
    featuredTrack: 'Subterranean Pulse',
    status: 'active',
  },
  {
    name: 'Lucas Prado',
    slug: 'lucas-prado',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    city: 'Belo Horizonte - MG',
    genres: ['Afro House', 'Organic House'],
    rating: '4.8',
    gigsCount: 29,
    rateRange: 'R$ 2.000 - 4.500',
    featuredTrack: 'Ancestral Rhythms (Live)',
    status: 'active',
  },
  {
    name: 'Vortex Sound',
    slug: 'vortex-sound',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    city: 'Florianópolis - SC',
    genres: ['Progressive House', 'Melodic'],
    rating: '4.9',
    gigsCount: 52,
    rateRange: 'R$ 3.500 - 9.000',
    featuredTrack: 'Island Sunset Session',
    status: 'busy',
  },
  {
    name: 'Maya Lin',
    slug: 'maya-lin',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    city: 'Brasília - DF',
    genres: ['Tech House', 'Minimal'],
    rating: '5.0',
    gigsCount: 41,
    rateRange: 'R$ 2.800 - 6.000',
    featuredTrack: 'Analog Dreams EP',
    status: 'active',
  },
];

const GENRES = [
  'Todos',
  'Melodic Techno',
  'Tech House',
  'House',
  'Techno',
  'Afro House',
  'Deep House',
  'Progressive House'
];

export default function ExplorarPage() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');

  const filteredArtists = ARTISTS.filter((artist) => {
    const matchesSearch = 
      artist.name.toLowerCase().includes(search.toLowerCase()) ||
      artist.city.toLowerCase().includes(search.toLowerCase()) ||
      artist.genres.some((g) => g.toLowerCase().includes(search.toLowerCase()));

    const matchesGenre = 
      selectedGenre === 'Todos' || 
      artist.genres.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-[#08080F] text-white flex flex-col selection:bg-[#8A3FFC] selection:text-white pb-20">
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-[#08080F]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="outline" className="text-xs bg-white/5 border-white/10 hover:bg-white/10 text-white">
            <Link href="/login">
              Sou DJ / Entrar
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Banner Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A3FFC]/15 border border-[#8A3FFC]/30 text-xs text-[#C084FC] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" /> Catálogo Oficial de Talentos
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Encontre o DJ ideal para sua pista
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Artistas verificados da cena eletrônica com sets ao vivo, agenda transparente e solicitação direta de cachê.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome do DJ, gênero musical ou cidade (ex: Melodic, São Paulo)..."
              className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#8A3FFC] shadow-lg placeholder:text-white/30"
            />
          </div>

          {/* Genre Pills (11. CATEGORIAS E TAGS - OFICIAL BEAT FLOW) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {GENRES.map((genre) => (
              <GenreTag
                key={genre}
                genre={genre}
                size="md"
                active={selectedGenre === genre}
                onClick={() => setSelectedGenre(genre)}
              />
            ))}
          </div>
        </div>

        {/* Artist Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {filteredArtists.map((artist) => (
            <div
              key={artist.slug}
              className="w-[85vw] sm:w-auto shrink-0 snap-center sm:snap-align-none rounded-3xl border border-white/10 bg-[#0D0B18]/80 backdrop-blur-md overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:border-[#8A3FFC]/50 hover:shadow-[0_0_35px_rgba(138,63,252,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* Cover & Avatar */}
                <div className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={artist.cover}
                    alt={artist.name}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B18] via-transparent to-black/30" />
                  
                  {/* Status Indicator (07. USUÁRIO / PERFIL) */}
                  <div className="absolute top-3 right-3 bg-[#08080F]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-semibold text-white flex items-center gap-2">
                    <StatusIndicator status={artist.status === 'active' ? 'online' : 'busy'} size="sm" />
                    <span>{artist.status === 'active' ? 'Disponível' : 'Agenda Seleta'}</span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 pt-0 relative -mt-8 space-y-4">
                  <div className="flex items-end justify-between">
                    <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#7C3AED] to-[#00D1FF] shadow-lg">
                      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#08080F]">
                        <Image
                          src={artist.avatar}
                          alt={artist.name}
                          fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400 pb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {artist.rating}
                      <span className="text-white/40 font-normal">({artist.gigsCount})</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00D1FF] transition-colors">
                        {artist.name}
                      </h3>
                      <VerificadoBadge size={16} />
                    </div>
                    <div className="text-xs text-white/50 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#FF4DB8]" /> {artist.city}
                    </div>
                  </div>

                  {/* Genres (11. CATEGORIAS E TAGS) */}
                  <div className="flex flex-wrap gap-1.5">
                    {artist.genres.map((g, i) => (
                      <GenreTag key={i} genre={g} size="sm" />
                    ))}
                  </div>

                  {/* Rate & Featured Track (03. MÚSICA & 06. OPORTUNIDADES) */}
                  <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-white/60">
                      <span>Cachê estimado:</span>
                      <span className="font-semibold text-green-400">{artist.rateRange}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/40 truncate">
                      <WaveformIcon size={14} color="#8A3FFC" className="shrink-0" />
                      <span className="truncate">{artist.featuredTrack}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full text-xs bg-white/5 border-white/10 hover:bg-white/10 text-white"
                >
                  <Link href={`/${artist.slug}`}>
                    Ver Perfil
                  </Link>
                </Button>

                <BookingFlow 
                  djName={artist.name} 
                  djAvatar={artist.avatar}
                  triggerButton={
                    <Button className="w-full text-xs bg-[#8A3FFC] hover:bg-[#7C3AED] text-white font-semibold shadow-md">
                      Contratar
                    </Button>
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="p-16 text-center rounded-3xl bg-white/5 border border-white/5 space-y-3">
            <WaveformIcon size={32} color="#8A3FFC" className="mx-auto" />
            <p className="text-sm text-white/60">Nenhum artista encontrado com os filtros selecionados.</p>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => { setSearch(''); setSelectedGenre('Todos'); }}
              className="text-xs bg-white/5 text-white"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
