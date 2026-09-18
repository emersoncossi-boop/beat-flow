'use client';

export type AtmospherePresetId = 
  | 'noir-chrome'
  | 'sunset-organic'
  | 'ice-futuristic'
  | 'raw-industrial'
  | 'berlin-warehouse'
  | 'tulum-organic'
  | 'tokyo-cyber-neon';

export interface AtmosphereLighting {
  primaryGlow: string;
  secondaryGlow: string;
  accentGlow: string;
  beamAngle: number;
  glowIntensity: number;
}

export interface AtmosphereParticles {
  density: number;
  speed: number;
  color: string;
  sizeRange: [number, number];
  type: 'dust' | 'embers' | 'digital-rain' | 'sun-flare' | 'smoke-haze';
}

export interface AtmosphereConfig {
  id: AtmospherePresetId;
  name: string;
  tagline: string;
  description: string;
  themeClass: string;
  accentColor: string;
  fontHeading: string;
  background: {
    baseColor: string;
    gradientOverlay: string;
    vignetteOpacity: number;
  };
  lighting: AtmosphereLighting;
  particles: AtmosphereParticles;
  audioSignature: {
    genre: string;
    suggestedBpm: number;
    synthesizerTone: 'dark-sub' | 'tribal-wood' | 'synthwave-saw' | 'warm-pad' | 'sub-pulse';
  };
}

export interface ArtistProfileData {
  slug: string;
  name: string;
  tagline: string;
  genres: string[];
  location: string;
  presetId: AtmospherePresetId;
  heroImage: string;
  heroVideo?: string;
  avatarImage: string;
  bioShort: string;
  bioLong: string;
  quote: string;
  quoteAuthor: string;
  spotifyMonthlyListeners?: string;
  featuredTrack: {
    title: string;
    artist: string;
    duration: string;
    audioUrl?: string;
    coverImage: string;
    bpm: number;
  };
  discography: Array<{
    title: string;
    label: string;
    year: string;
    coverImage: string;
    type: string;
    link?: string;
  }>;
  tourDates: Array<{
    date: string;
    dayMonth: string;
    event: string;
    venue: string;
    city: string;
    status: 'Disponível' | 'Confirmado' | 'Sold Out' | 'Exclusivo';
    ticketLink?: string;
  }>;
  pressPhotos: string[];
  riderTechnical: {
    players: string;
    mixer: string;
    monitors: string;
    power: string;
    notes: string;
  };
  socials: {
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
  };
}

export const ATMOSPHERE_PRESETS: Record<AtmospherePresetId, AtmosphereConfig> = {
  'noir-chrome': {
    id: 'noir-chrome',
    name: 'Noir & Chrome',
    tagline: 'Dark Club, Reflexos Metálicos & Laser Prata',
    description: 'Estética monocromática de alto luxo inspirada nos melhores clubs noturnos de Londres e Berlim.',
    themeClass: 'theme-noir-chrome',
    accentColor: '#E2E8F0',
    fontHeading: 'font-sans uppercase tracking-tighter',
    background: {
      baseColor: '#050508',
      gradientOverlay: 'radial-gradient(ellipse at 50% 0%, rgba(226, 232, 240, 0.12) 0%, rgba(10, 12, 18, 0.95) 60%, #050508 100%)',
      vignetteOpacity: 0.9,
    },
    lighting: {
      primaryGlow: '#CBD5E1',
      secondaryGlow: '#94A3B8',
      accentGlow: '#FFFFFF',
      beamAngle: 15,
      glowIntensity: 0.8,
    },
    particles: {
      density: 35,
      speed: 0.3,
      color: '#E2E8F0',
      sizeRange: [1, 2],
      type: 'smoke-haze',
    },
    audioSignature: {
      genre: 'Afro House · Deep House · Tech Noir',
      suggestedBpm: 124,
      synthesizerTone: 'dark-sub',
    },
  },

  'sunset-organic': {
    id: 'sunset-organic',
    name: 'Sunset & Organic',
    tagline: 'Ouro Âmbar, Texturas Terrosas & Editorial',
    description: 'Atmosfera calorosa de fim de tarde em festivais ao ar livre, pôr do sol em Tulum e Ibiza.',
    themeClass: 'theme-sunset-organic',
    accentColor: '#F59E0B',
    fontHeading: 'font-serif tracking-tight',
    background: {
      baseColor: '#0A0704',
      gradientOverlay: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.22) 0%, rgba(26, 16, 8, 0.9) 60%, #0A0704 100%)',
      vignetteOpacity: 0.82,
    },
    lighting: {
      primaryGlow: '#F59E0B',
      secondaryGlow: '#EA580C',
      accentGlow: '#FDE68A',
      beamAngle: 45,
      glowIntensity: 0.85,
    },
    particles: {
      density: 45,
      speed: 0.5,
      color: '#FCD34D',
      sizeRange: [1.2, 3],
      type: 'sun-flare',
    },
    audioSignature: {
      genre: 'Organic House · Melodic Afro · Downtempo',
      suggestedBpm: 120,
      synthesizerTone: 'warm-pad',
    },
  },

  'ice-futuristic': {
    id: 'ice-futuristic',
    name: 'Ice & Futuristic',
    tagline: 'Vidro Fosco, Eterial & Luminescência Cyan',
    description: 'Design etéreo e tecnológico com vidro translúcido, névoa polar e sintetizadores progressivos.',
    themeClass: 'theme-ice-futuristic',
    accentColor: '#00D1FF',
    fontHeading: 'font-mono uppercase tracking-widest',
    background: {
      baseColor: '#04070C',
      gradientOverlay: 'radial-gradient(ellipse at 50% 0%, rgba(0, 209, 255, 0.2) 0%, rgba(6, 18, 32, 0.92) 55%, #04070C 100%)',
      vignetteOpacity: 0.85,
    },
    lighting: {
      primaryGlow: '#00D1FF',
      secondaryGlow: '#38BDF8',
      accentGlow: '#A5F3FC',
      beamAngle: 30,
      glowIntensity: 0.9,
    },
    particles: {
      density: 50,
      speed: 0.45,
      color: '#A5F3FC',
      sizeRange: [0.8, 2.2],
      type: 'digital-rain',
    },
    audioSignature: {
      genre: 'Melodic Techno · Progressive Wave',
      suggestedBpm: 126,
      synthesizerTone: 'sub-pulse',
    },
  },

  'raw-industrial': {
    id: 'raw-industrial',
    name: 'Raw & Industrial',
    tagline: 'Concreto Brutalista, Estroboscópio & Underground',
    description: 'Sonoridade cortante de subsolo, tipografia marcante e energia crua de galpão industrial.',
    themeClass: 'theme-raw-industrial',
    accentColor: '#A3E635',
    fontHeading: 'font-mono font-black uppercase tracking-tight',
    background: {
      baseColor: '#050606',
      gradientOverlay: 'radial-gradient(ellipse at 50% 0%, rgba(163, 230, 53, 0.15) 0%, rgba(12, 16, 12, 0.96) 65%, #050606 100%)',
      vignetteOpacity: 0.92,
    },
    lighting: {
      primaryGlow: '#A3E635',
      secondaryGlow: '#E2E8F0',
      accentGlow: '#BEF264',
      beamAngle: 20,
      glowIntensity: 0.75,
    },
    particles: {
      density: 30,
      speed: 0.6,
      color: '#D9F99D',
      sizeRange: [1, 2.5],
      type: 'smoke-haze',
    },
    audioSignature: {
      genre: 'Peak Time Techno · Hard Groove · Industrial',
      suggestedBpm: 138,
      synthesizerTone: 'synthwave-saw',
    },
  },

  'berlin-warehouse': {
    id: 'berlin-warehouse',
    name: 'Berlin Warehouse',
    tagline: 'Cru, Industrial & Subgrave Frio',
    description: 'Iluminação estroboscópica fria e névoa densa.',
    themeClass: 'theme-berlin',
    accentColor: '#38BDF8',
    fontHeading: 'font-sans uppercase',
    background: {
      baseColor: '#050608',
      gradientOverlay: 'radial-gradient(ellipse at 50% 0%, rgba(45, 55, 72, 0.4) 0%, rgba(13, 16, 23, 0.95) 60%, #050608 100%)',
      vignetteOpacity: 0.85,
    },
    lighting: {
      primaryGlow: '#94A3B8',
      secondaryGlow: '#38BDF8',
      accentGlow: '#E2E8F0',
      beamAngle: 25,
      glowIntensity: 0.65,
    },
    particles: {
      density: 40,
      speed: 0.4,
      color: '#CBD5E1',
      sizeRange: [1, 2.8],
      type: 'smoke-haze',
    },
    audioSignature: {
      genre: 'Techno',
      suggestedBpm: 132,
      synthesizerTone: 'dark-sub',
    },
  },

  'tulum-organic': {
    id: 'tulum-organic',
    name: 'Tulum Organic',
    tagline: 'Místico & Selva Noturna',
    description: 'Brilho esmeralda suave e percussão terrosa.',
    themeClass: 'theme-tulum',
    accentColor: '#10B981',
    fontHeading: 'font-serif',
    background: {
      baseColor: '#040907',
      gradientOverlay: 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.25) 0%, rgba(6, 40, 29, 0.8) 55%, #040907 100%)',
      vignetteOpacity: 0.78,
    },
    lighting: {
      primaryGlow: '#10B981',
      secondaryGlow: '#F59E0B',
      accentGlow: '#34D399',
      beamAngle: 35,
      glowIntensity: 0.75,
    },
    particles: {
      density: 48,
      speed: 0.55,
      color: '#6EE7B7',
      sizeRange: [1.5, 3.2],
      type: 'embers',
    },
    audioSignature: {
      genre: 'Organic House',
      suggestedBpm: 122,
      synthesizerTone: 'tribal-wood',
    },
  },

  'tokyo-cyber-neon': {
    id: 'tokyo-cyber-neon',
    name: 'Tokyo Cyber Neon',
    tagline: 'Luzes de Shinjuku',
    description: 'Magenta e ciano com sintetizadores.',
    themeClass: 'theme-tokyo',
    accentColor: '#EC4899',
    fontHeading: 'font-mono uppercase',
    background: {
      baseColor: '#07040B',
      gradientOverlay: 'radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.28) 0%, rgba(14, 5, 24, 0.9) 60%, #07040B 100%)',
      vignetteOpacity: 0.82,
    },
    lighting: {
      primaryGlow: '#EC4899',
      secondaryGlow: '#06B6D4',
      accentGlow: '#F472B6',
      beamAngle: 50,
      glowIntensity: 0.88,
    },
    particles: {
      density: 55,
      speed: 0.7,
      color: '#F472B6',
      sizeRange: [1.2, 2.5],
      type: 'digital-rain',
    },
    audioSignature: {
      genre: 'Cyberwave',
      suggestedBpm: 128,
      synthesizerTone: 'synthwave-saw',
    },
  },
};

export const ARTIST_PROFILES: Record<string, ArtistProfileData> = {
  camila: {
    slug: 'camila',
    name: 'CAMILA',
    tagline: 'Afro House · House · Tech Noir',
    genres: ['Afro House', 'Deep House', 'Tech Noir'],
    location: 'São Paulo · Brasil',
    presetId: 'noir-chrome',
    heroImage: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Presença magnética nas pistas mais exigentes do país. Curadoria impecável de percussão afro e synths cortantes.',
    bioLong: 'Com mais de 8 anos comandando residências em São Paulo, Rio e temporadas no litoral, Camila construiu uma identidade sonora hipnótica que equilibra elegância, ritmo ancestral e pressão de graves na cabine.',
    quote: 'A pista de dança não é apenas entretenimento; é um ritual de conexão coletiva onde cada transição conta uma história.',
    quoteAuthor: 'Mixmag Brasil',
    spotifyMonthlyListeners: '142.500',
    featuredTrack: {
      title: 'Ancestral Frequency (Extended Mix)',
      artist: 'CAMILA',
      duration: '6:14',
      bpm: 124,
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    },
    discography: [
      { title: 'Ancestral Frequency', label: 'MoBlack Records', year: '2026', type: 'EP', coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600' },
      { title: 'Nocturnal Whispers', label: 'Get Physical', year: '2025', type: 'Single', coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600' }
    ],
    tourDates: [
      { date: '2026-10-18', dayMonth: '18 OUT', event: 'D-EDGE Club', venue: 'Main Room', city: 'São Paulo, SP', status: 'Confirmado' },
      { date: '2026-10-31', dayMonth: '31 OUT', event: 'Warung Beach Club', venue: 'Garden Stage', city: 'Itajaí, SC', status: 'Confirmado' },
      { date: '2026-11-14', dayMonth: '14 NOV', event: 'Privilège', venue: 'Arena Sunset', city: 'Búzios, RJ', status: 'Disponível' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1200',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200'
    ],
    riderTechnical: {
      players: '2x Pioneer CDJ-3000 (Pro DJ Link atualizado v3.12+)',
      mixer: '1x Pioneer DJM-A9 ou Allen & Heath Xone:96',
      monitors: '2x Monitores de cabine ativos com controle individual',
      power: '2x Tomadas 220V estabilizadas na cabine',
      notes: 'Mesa rígida com altura mínima de 1,05m, livre de vibrações.'
    },
    socials: {
      instagram: 'https://instagram.com/djcamilamusic',
      soundcloud: 'https://soundcloud.com/djcamila',
      spotify: 'https://spotify.com'
    }
  },

  sara: {
    slug: 'sara',
    name: 'SARA',
    tagline: 'Organic House · Melodic Afro · Downtempo',
    genres: ['Organic House', 'Melodic Afro', 'Downtempo'],
    location: 'Rio de Janeiro · Brasil',
    presetId: 'sunset-organic',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Sonoridades orgânicas banhadas pela luz dourada do entardecer. Texturas percussivas e melodias profundas.',
    bioLong: 'Pioneira na fusão de instrumentos acústicos brasileiros com sintetizadores orgânicos, Sara é atração frequente em festivais conceituais ao ar livre e eventos de alto padrão internacional.',
    quote: 'Música feita para conectar o corpo à terra e a mente ao horizonte dourado do mar.',
    quoteAuthor: 'House Mag',
    spotifyMonthlyListeners: '98.200',
    featuredTrack: {
      title: 'Solstício Dourado',
      artist: 'SARA',
      duration: '7:02',
      bpm: 120,
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    },
    discography: [
      { title: 'Solstício Dourado EP', label: 'All Day I Dream', year: '2026', type: 'EP', coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600' }
    ],
    tourDates: [
      { date: '2026-10-24', dayMonth: '24 OUT', event: 'Sunset Sessions', venue: 'Praia Mole', city: 'Florianópolis, SC', status: 'Confirmado' },
      { date: '2026-11-07', dayMonth: '07 NOV', event: 'Cenote Festival', venue: 'Eco Park', city: 'Trancoso, BA', status: 'Confirmado' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200',
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200'
    ],
    riderTechnical: {
      players: '2x Pioneer CDJ-3000 + 1x Direct Box balanceada',
      mixer: '1x Pioneer DJM-900NXS2 ou DJM-A9',
      monitors: '2x Monitores Genelec ou QSC de alta precisão',
      power: 'Linha de energia isolada sem ruído de ground loop',
      notes: 'Ambiente com iluminação cênica suave e quente.'
    },
    socials: {
      instagram: 'https://instagram.com/saramusic',
      soundcloud: 'https://soundcloud.com/sara-sounds'
    }
  },

  luna: {
    slug: 'luna',
    name: 'LUNA',
    tagline: 'Melodic Techno · Progressive · Futuristic',
    genres: ['Melodic Techno', 'Progressive', 'Cinematic'],
    location: 'Curitiba · Brasil',
    presetId: 'ice-futuristic',
    heroImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Jornadas cinematográficas entre sintetizadores etéreos e baterias cirúrgicas. Uma experiência audiovisual futurista.',
    bioLong: 'Reconhecida internacionalmente por suas produções que atingiram o Top 10 Beatport Melodic Techno, Luna entrega sets que transportam a pista para dimensões sonoras imersivas.',
    quote: 'Criar música é esculpir o tempo através de frequências que ecoam no infinito.',
    quoteAuthor: 'DJ Mag',
    spotifyMonthlyListeners: '210.000',
    featuredTrack: {
      title: 'Cosmic Horizon',
      artist: 'LUNA',
      duration: '6:45',
      bpm: 126,
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    },
    discography: [
      { title: 'Cosmic Horizon EP', label: 'Afterlife Recordings', year: '2026', type: 'EP', coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600' }
    ],
    tourDates: [
      { date: '2026-10-15', dayMonth: '15 OUT', event: 'Hyperspace Festival', venue: 'Pavilhão Anhembi', city: 'São Paulo, SP', status: 'Confirmado' },
      { date: '2026-11-20', dayMonth: '20 NOV', event: 'Club Vibe', venue: 'Main Stage', city: 'Curitiba, PR', status: 'Confirmado' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200'
    ],
    riderTechnical: {
      players: '3x Pioneer CDJ-3000 (Sincronia Pro DJ Link)',
      mixer: '1x Pioneer DJM-V10 ou DJM-A9',
      monitors: '2x Monitores L-Acoustics ou Funktion-One',
      power: '4x Tomadas estabilizadas para hardware auxiliar',
      notes: 'Sincronia MIDI para mesa de luz e telão de LED.'
    },
    socials: {
      instagram: 'https://instagram.com/lunabloom',
      spotify: 'https://spotify.com'
    }
  },

  nina: {
    slug: 'nina',
    name: 'NINA',
    tagline: 'Peak Time Techno · Hard Groove · Industrial',
    genres: ['Hard Groove', 'Peak Time Techno', 'Industrial'],
    location: 'Belo Horizonte · Brasil',
    presetId: 'raw-industrial',
    heroImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Pressão sonora implacável, BPM acelerado e estética industrial crua. Sets de alta voltagem para pistas underground.',
    bioLong: 'Emergindo do cenário underground de Belo Horizonte, Nina conquistou os palcos mais intensos do techno nacional com mixagens dinâmicas em 3 decks e seleções em vinil e digital.',
    quote: 'Sem concessões comerciais: apenas a energia pura do ferro, do bumbo e da distorção controlada.',
    quoteAuthor: 'Resident Advisor',
    spotifyMonthlyListeners: '76.400',
    featuredTrack: {
      title: 'Concrete Pulse (Live Cut)',
      artist: 'NINA',
      duration: '5:50',
      bpm: 138,
      coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    },
    discography: [
      { title: 'Concrete Pulse', label: 'Tresor Berlin', year: '2026', type: 'EP', coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600' }
    ],
    tourDates: [
      { date: '2026-10-10', dayMonth: '10 OUT', event: 'Warehouse 99', venue: 'Galpão Central', city: 'Belo Horizonte, MG', status: 'Confirmado' },
      { date: '2026-11-12', dayMonth: '12 NOV', event: 'ODD Party', venue: 'Fábrica Desativada', city: 'São Paulo, SP', status: 'Confirmado' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200',
      'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1200'
    ],
    riderTechnical: {
      players: '3x Pioneer CDJ-3000 + 2x Technics SL-1200MK7',
      mixer: '1x Allen & Heath Xone:96',
      monitors: '2x Monitores de cabine com alto SPL sem distorção',
      power: 'Linhas 220V com disjuntor dedicado',
      notes: 'Cabine sem luz direta no rosto; estroboscópio traseiro.'
    },
    socials: {
      instagram: 'https://instagram.com/ninabeats',
      soundcloud: 'https://soundcloud.com/nina-industrial'
    }
  }
};

export const DEFAULT_ATMOSPHERE_ID: AtmospherePresetId = 'noir-chrome';

export function getDJAtmosphere(djSlug?: string): AtmosphereConfig {
  if (!djSlug) return ATMOSPHERE_PRESETS['noir-chrome'];
  const profile = ARTIST_PROFILES[djSlug.toLowerCase()];
  if (profile && ATMOSPHERE_PRESETS[profile.presetId]) {
    return ATMOSPHERE_PRESETS[profile.presetId];
  }
  return ATMOSPHERE_PRESETS['noir-chrome'];
}

export function getArtistProfile(slug?: string): ArtistProfileData {
  if (!slug) return ARTIST_PROFILES['camila'];
  const profile = ARTIST_PROFILES[slug.toLowerCase()];
  return profile || ARTIST_PROFILES['camila'];
}