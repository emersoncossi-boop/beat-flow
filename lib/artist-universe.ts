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
  baseFee: string;
  durationSet: string;
  presetId: AtmospherePresetId;
  heroImage: string;
  heroVideo?: string;
  avatarImage: string;
  bioShort: string;
  bioLong: {
    pt: string;
    en: string;
    es: string;
  };
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
    inputs: string[];
    hospitality: string[];
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
    themeClass: 'theme-noir',
    accentColor: '#E2E8F0',
    fontHeading: 'font-mono tracking-tighter uppercase',
    background: {
      baseColor: '#07080B',
      gradientOverlay: 'radial-gradient(ellipse at 50% 15%, rgba(226, 232, 240, 0.12) 0%, rgba(7, 8, 11, 0.98) 75%)',
      vignetteOpacity: 0.92,
    },
    lighting: {
      primaryGlow: 'rgba(255, 255, 255, 0.18)',
      secondaryGlow: 'rgba(148, 163, 184, 0.12)',
      accentGlow: 'rgba(255, 255, 255, 0.35)',
      beamAngle: 45,
      glowIntensity: 0.8,
    },
    particles: {
      density: 22,
      speed: 0.4,
      color: 'rgba(226, 232, 240, 0.3)',
      sizeRange: [1, 2.5],
      type: 'smoke-haze',
    },
    audioSignature: {
      genre: 'Deep Tech / Noir Minimal',
      suggestedBpm: 124,
      synthesizerTone: 'dark-sub',
    }
  },
  'sunset-organic': {
    id: 'sunset-organic',
    name: 'Sunset & Organic',
    tagline: 'Golden Hour, Madeiras Nobres & Texturas Orgânicas',
    description: 'Calor do fim de tarde, luz âmbar envolvente e percussões étnicas de festivais beira-mar.',
    themeClass: 'theme-sunset',
    accentColor: '#F59E0B',
    fontHeading: 'font-serif tracking-tight',
    background: {
      baseColor: '#0B0806',
      gradientOverlay: 'radial-gradient(ellipse at 50% 15%, rgba(245, 158, 11, 0.18) 0%, rgba(11, 8, 6, 0.98) 75%)',
      vignetteOpacity: 0.88,
    },
    lighting: {
      primaryGlow: 'rgba(245, 158, 11, 0.25)',
      secondaryGlow: 'rgba(217, 119, 6, 0.15)',
      accentGlow: 'rgba(251, 191, 36, 0.45)',
      beamAngle: 60,
      glowIntensity: 0.9,
    },
    particles: {
      density: 28,
      speed: 0.5,
      color: 'rgba(245, 158, 11, 0.4)',
      sizeRange: [1.5, 3.5],
      type: 'sun-flare',
    },
    audioSignature: {
      genre: 'Organic House / Afro Melodic',
      suggestedBpm: 121,
      synthesizerTone: 'tribal-wood',
    }
  },
  'ice-futuristic': {
    id: 'ice-futuristic',
    name: 'Ice & Futuristic',
    tagline: 'Vidro Fosco, Luminescência Cyan & Pureza Sonora',
    description: 'Linhas etéreas, sintetizadores progressivos e atmosfera espacial de alta precisão.',
    themeClass: 'theme-ice',
    accentColor: '#38BDF8',
    fontHeading: 'font-sans font-light tracking-wide uppercase',
    background: {
      baseColor: '#04080F',
      gradientOverlay: 'radial-gradient(ellipse at 50% 15%, rgba(56, 189, 248, 0.16) 0%, rgba(4, 8, 15, 0.98) 75%)',
      vignetteOpacity: 0.90,
    },
    lighting: {
      primaryGlow: 'rgba(56, 189, 248, 0.22)',
      secondaryGlow: 'rgba(14, 165, 233, 0.14)',
      accentGlow: 'rgba(125, 211, 252, 0.40)',
      beamAngle: 30,
      glowIntensity: 0.85,
    },
    particles: {
      density: 35,
      speed: 0.7,
      color: 'rgba(56, 189, 248, 0.45)',
      sizeRange: [1, 2],
      type: 'digital-rain',
    },
    audioSignature: {
      genre: 'Melodic Techno / Progressive Wave',
      suggestedBpm: 126,
      synthesizerTone: 'synthwave-saw',
    }
  },
  'raw-industrial': {
    id: 'raw-industrial',
    name: 'Raw & Industrial',
    tagline: 'Concreto Brutalista, Estroboscópio & Pressão Sub-Bass',
    description: 'Energia crua de galpões underground, linhas analógicas e batidas cortantes.',
    themeClass: 'theme-raw',
    accentColor: '#EF4444',
    fontHeading: 'font-mono font-black tracking-tighter uppercase',
    background: {
      baseColor: '#0A0A0A',
      gradientOverlay: 'radial-gradient(ellipse at 50% 15%, rgba(239, 68, 68, 0.15) 0%, rgba(10, 10, 10, 0.98) 75%)',
      vignetteOpacity: 0.95,
    },
    lighting: {
      primaryGlow: 'rgba(239, 68, 68, 0.25)',
      secondaryGlow: 'rgba(185, 28, 28, 0.15)',
      accentGlow: 'rgba(248, 113, 113, 0.45)',
      beamAngle: 90,
      glowIntensity: 1.0,
    },
    particles: {
      density: 40,
      speed: 0.9,
      color: 'rgba(239, 68, 68, 0.35)',
      sizeRange: [1, 3],
      type: 'embers',
    },
    audioSignature: {
      genre: 'Peak Time Techno / Hard Groove',
      suggestedBpm: 134,
      synthesizerTone: 'sub-pulse',
    }
  },
  'berlin-warehouse': {
    id: 'berlin-warehouse',
    name: 'Berlin Warehouse',
    tagline: 'Subterrâneo, Neblina Densa & Monocromia Sonora',
    description: 'Inspirado nos templos de techno alemão, fumaça e frequências graves hipnóticas.',
    themeClass: 'theme-berlin',
    accentColor: '#94A3B8',
    fontHeading: 'font-mono uppercase tracking-widest',
    background: {
      baseColor: '#050507',
      gradientOverlay: 'radial-gradient(ellipse at 50% 20%, rgba(148, 163, 184, 0.10) 0%, rgba(5, 5, 7, 0.98) 80%)',
      vignetteOpacity: 0.96,
    },
    lighting: {
      primaryGlow: 'rgba(148, 163, 184, 0.15)',
      secondaryGlow: 'rgba(71, 85, 105, 0.10)',
      accentGlow: 'rgba(203, 213, 225, 0.30)',
      beamAngle: 40,
      glowIntensity: 0.7,
    },
    particles: {
      density: 20,
      speed: 0.3,
      color: 'rgba(148, 163, 184, 0.25)',
      sizeRange: [1, 2],
      type: 'smoke-haze',
    },
    audioSignature: {
      genre: 'Hypnotic Techno / Raw Groove',
      suggestedBpm: 132,
      synthesizerTone: 'dark-sub',
    }
  },
  'tulum-organic': {
    id: 'tulum-organic',
    name: 'Tulum Organic',
    tagline: 'Selva Mística, Incenso & Flautas Xamânicas',
    description: 'Batidas orgânicas de praia e floresta com sintetizadores etéreos.',
    themeClass: 'theme-tulum',
    accentColor: '#10B981',
    fontHeading: 'font-serif tracking-normal',
    background: {
      baseColor: '#030D08',
      gradientOverlay: 'radial-gradient(ellipse at 50% 15%, rgba(16, 185, 129, 0.14) 0%, rgba(3, 13, 8, 0.98) 75%)',
      vignetteOpacity: 0.90,
    },
    lighting: {
      primaryGlow: 'rgba(16, 185, 129, 0.20)',
      secondaryGlow: 'rgba(5, 150, 105, 0.12)',
      accentGlow: 'rgba(52, 211, 153, 0.38)',
      beamAngle: 50,
      glowIntensity: 0.8,
    },
    particles: {
      density: 25,
      speed: 0.4,
      color: 'rgba(16, 185, 129, 0.35)',
      sizeRange: [1.2, 2.8],
      type: 'dust',
    },
    audioSignature: {
      genre: 'Organic Downtempo / Deep Jungle',
      suggestedBpm: 118,
      synthesizerTone: 'warm-pad',
    }
  },
  'tokyo-cyber-neon': {
    id: 'tokyo-cyber-neon',
    name: 'Tokyo Cyber Neon',
    tagline: 'Neon Magenta, Reflexos Holográficos & Synthwave',
    description: 'Vibração noturna de Shinjuku com sintetizadores brilhantes e luzes fluorescentes.',
    themeClass: 'theme-tokyo',
    accentColor: '#EC4899',
    fontHeading: 'font-sans font-black tracking-tight uppercase',
    background: {
      baseColor: '#0D040A',
      gradientOverlay: 'radial-gradient(ellipse at 50% 15%, rgba(236, 72, 153, 0.18) 0%, rgba(13, 4, 10, 0.98) 75%)',
      vignetteOpacity: 0.88,
    },
    lighting: {
      primaryGlow: 'rgba(236, 72, 153, 0.28)',
      secondaryGlow: 'rgba(168, 85, 247, 0.18)',
      accentGlow: 'rgba(244, 114, 182, 0.50)',
      beamAngle: 75,
      glowIntensity: 0.95,
    },
    particles: {
      density: 32,
      speed: 0.6,
      color: 'rgba(236, 72, 153, 0.45)',
      sizeRange: [1, 2.5],
      type: 'digital-rain',
    },
    audioSignature: {
      genre: 'Synth Melodic / Cyberwave',
      suggestedBpm: 128,
      synthesizerTone: 'synthwave-saw',
    }
  }
};

export const ARTIST_PROFILES: Record<string, ArtistProfileData> = {
  camila: {
    slug: 'camila',
    name: 'CAMILA',
    tagline: 'Afro House · Deep House · Tech Noir',
    genres: ['Afro House', 'Deep House', 'Tech Noir'],
    location: 'São Paulo · SP',
    baseFee: 'R$ 4.500',
    durationSet: '2h00 Extended Set',
    presetId: 'noir-chrome',
    heroImage: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Elevando pistas de alta moda e clubs conceituais com frequências densas, percussão afro hipnótica e transições cirúrgicas.',
    bioLong: {
      pt: 'Camila emergiu na cena eletrônica brasileira como um dos nomes mais refinados da nova geração de Afro House e Deep Tech. Suas apresentações combinam groove percussivo afro com a sofisticação da alta moda e iluminação cinematográfica. Já comandou cabines emblemáticas como D-EDGE, Laroc Club e festas exclusivas em Tulum e Mykonos.',
      en: 'Camila emerged in the Brazilian electronic scene as one of the most refined names of the new generation of Afro House and Deep Tech. Her performances blend afro percussive groove with high-fashion sophistication and cinematic lighting.',
      es: 'Camila emergió en la escena electrónica brasileña como uno de los nombres más refinados de la nueva generación de Afro House y Deep Tech.'
    },
    quote: 'A música é a única linguagem que não precisa de tradução para comandar o corpo.',
    quoteAuthor: 'House Mag Review · 2026',
    spotifyMonthlyListeners: '142.800 ouvintes mensais',
    featuredTrack: {
      title: 'Midnight Ritual (Extended Club Mix)',
      artist: 'CAMILA',
      duration: '6:42',
      bpm: 124,
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=electronic-future-beats-117997.mp3'
    },
    discography: [
      { title: 'Midnight Ritual EP', label: 'MoBlack Records', year: '2026', coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400', type: 'EP Oficial' },
      { title: 'Sahara Groove (Original)', label: 'Keinemusik Tribute', year: '2025', coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400', type: 'Single' },
      { title: 'Noir Horizon Live Set', label: 'Beat Flow Studios', year: '2025', coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400', type: 'DJ Set Hi-Fi' }
    ],
    tourDates: [
      { date: '18 OUT 2026', dayMonth: '18 OUT', event: 'D-EDGE Club Noir Night', venue: 'D-EDGE', city: 'São Paulo, SP', status: 'Confirmado', ticketLink: 'https://ingressos.me/d-edge-camila' },
      { date: '01 NOV 2026', dayMonth: '01 NOV', event: 'Laroc Sunset Festival', venue: 'Laroc Club', city: 'Valinhos, SP', status: 'Sold Out', ticketLink: 'https://ingressos.me/laroc-camila' },
      { date: '14 NOV 2026', dayMonth: '14 NOV', event: 'Tulum Deep Gathering', venue: 'Papaya Playa', city: 'Tulum, México', status: 'Exclusivo' },
      { date: '05 DEZ 2026', dayMonth: '05 DEZ', event: 'Warung Beach Club Tour', venue: 'Warung Club', city: 'Itajaí, SC', status: 'Disponível' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200&auto=format&fit=crop'
    ],
    riderTechnical: {
      players: '3x Pioneer CDJ-3000 (Link Pro DJ RJ45 em Switch Gigabit)',
      mixer: '1x Pioneer DJM-A9 ou Allen & Heath Xone:96',
      monitors: '2x Monitores de Cabine L-Acoustics ou d&b audiotechnik com controle de volume independente ao alcance da DJ',
      power: '2x Pontos de energia 220V/110V estabilizados e aterrados na cabine',
      inputs: ['Canal 1: CDJ 1 (Esquerda)', 'Canal 2: CDJ 2 (Centro/Master)', 'Canal 3: CDJ 3 (Direita)', 'Canal 4: Return FX / Drum Machine'],
      hospitality: ['4x Garrafas de água mineral sem gás em temperatura ambiente', '2x Toalhas pretas de palco 100% algodão', '2x Red Bull Sugar Free gelados', 'Espaço seguro e monitorado para cases de fones e pendrives'],
      notes: 'Não é permitida fumaça CO2 direta apontada para a cabine da DJ durante o set.'
    },
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  sara: {
    slug: 'sara',
    name: 'SARA',
    tagline: 'Organic House · Melodic Afro · Sunset Sessions',
    genres: ['Organic House', 'Melodic Afro', 'Downtempo'],
    location: 'Florianópolis · SC',
    baseFee: 'R$ 7.200',
    durationSet: '3h00 Sunset Experience',
    presetId: 'sunset-organic',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Sonoridade quente, percussões orgânicas e melodias emotivas desenhadas para transições entre o dia e a noite.',
    bioLong: {
      pt: 'Sara é sinônimo de conexão orgânica e elegância sonora. Com passagens marcantes por festivais ao ar livre no litoral sul e palcos internacionais, suas apresentações criam uma jornada imersiva que abraça o público do início ao fim.',
      en: 'Sara is synonymous with organic connection and sonic elegance, creating emotional journeys across open-air festivals.',
      es: 'Sara es sinónimo de conexión orgánica y elegancia sonora en festivales al aire libre.'
    },
    quote: 'Quando o sol se põe, as frequências baixas contam a história que as palavras não alcançam.',
    quoteAuthor: 'Sunset Sessions Editorial · 2026',
    spotifyMonthlyListeners: '210.400 ouvintes mensais',
    featuredTrack: {
      title: 'Golden Horizon (Organic Sunset Mix)',
      artist: 'SARA',
      duration: '7:15',
      bpm: 121,
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=electronic-future-beats-117997.mp3'
    },
    discography: [
      { title: 'Golden Horizon EP', label: 'All Day I Dream', year: '2026', coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400', type: 'EP Oficial' },
      { title: 'Sol & Mar Live Set', label: 'Floripa Sunset Sessions', year: '2025', coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400', type: 'Live Set 4K' }
    ],
    tourDates: [
      { date: '25 OUT 2026', dayMonth: '25 OUT', event: 'Cafe de La Musique Sunset', venue: 'Cafe Jurerê', city: 'Florianópolis, SC', status: 'Confirmado', ticketLink: 'https://ingressos.me/sara-cafe' },
      { date: '15 NOV 2026', dayMonth: '15 NOV', event: 'Brava Beach Gathering', venue: 'Habbitat Brava', city: 'Praia Brava, SC', status: 'Disponível' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'
    ],
    riderTechnical: {
      players: '2x Pioneer CDJ-3000',
      mixer: '1x Allen & Heath Xone:96 ou Pioneer DJM-V10',
      monitors: '2x Genelec ou L-Acoustics alinhados na altura dos ouvidos',
      power: '2x Tomadas 220V estabilizadas',
      inputs: ['Canal 1: CDJ 1 (Esquerda)', 'Canal 2: CDJ 2 (Direita)', 'Canal 3: Sampler SPD-SX'],
      hospitality: ['Água de coco fresca', 'Frutas tropicais cortadas', 'Toalhas brancas de algodão'],
      notes: 'Cabine coberta com proteção solar total em eventos diurnos ao ar livre.'
    },
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com'
    }
  },
  luna: {
    slug: 'luna',
    name: 'LUNA BLOOM',
    tagline: 'Melodic Techno · Progressive Wave · Spatial Sound',
    genres: ['Melodic Techno', 'Progressive Wave', 'Cinematic'],
    location: 'Curitiba · PR',
    baseFee: 'R$ 5.800',
    durationSet: '2h30 Journey',
    presetId: 'ice-futuristic',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Sintetizadores etéreos, viagens sonoras progressivas e impacto cósmico em festivais e superclubs.',
    bioLong: {
      pt: 'Luna Bloom conduz multidões através de narrativas harmônicas profundas, unindo a precisão do Melodic Techno europeu com a paixão visceral das pistas sul-americanas.',
      en: 'Luna Bloom drives crowds through deep harmonic narratives, blending European Melodic Techno precision with South American passion.',
      es: 'Luna Bloom conduce multitudes a través de narrativas armónicas profundas con precisión y pasión.'
    },
    quote: 'O futuro da música eletrônica reside no espaço entre a luz e o silêncio.',
    quoteAuthor: 'Mixmag South America · 2026',
    spotifyMonthlyListeners: '188.000 ouvintes mensais',
    featuredTrack: {
      title: 'Aurora Borealis (Cosmic Journey)',
      artist: 'LUNA BLOOM',
      duration: '6:58',
      bpm: 126,
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=electronic-future-beats-117997.mp3'
    },
    discography: [
      { title: 'Aurora Borealis EP', label: 'Afterlife Inspired', year: '2026', coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400', type: 'EP Oficial' }
    ],
    tourDates: [
      { date: '22 OUT 2026', dayMonth: '22 OUT', event: 'Warung Beach Club', venue: 'Warung', city: 'Itajaí, SC', status: 'Confirmado', ticketLink: 'https://ingressos.me/luna-warung' },
      { date: '10 NOV 2026', dayMonth: '10 NOV', event: 'Privilège Festival', venue: 'Privilège', city: 'Búzios, RJ', status: 'Disponível' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop'
    ],
    riderTechnical: {
      players: '3x Pioneer CDJ-3000',
      mixer: '1x Pioneer DJM-A9 ou DJM-V10',
      monitors: '2x Monitores de alta fidelidade d&b audiotechnik',
      power: '220V aterrado',
      inputs: ['Canal 1: CDJ 1', 'Canal 2: CDJ 2', 'Canal 3: CDJ 3'],
      hospitality: ['Água mineral sem gás', 'Café expresso', 'Frutas vermelhas'],
      notes: 'Sincronização de timecode de iluminação e visuais via Pro DJ Link.'
    },
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  nina: {
    slug: 'nina',
    name: 'NINA ROXX',
    tagline: 'Peak Time Techno · Hard Groove · Raw Power',
    genres: ['Peak Time Techno', 'Hard Groove', 'Industrial'],
    location: 'Belo Horizonte · MG',
    baseFee: 'R$ 5.200',
    durationSet: '2h00 High Energy',
    presetId: 'raw-industrial',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Pressão sonora implacável, BPM acelerado e energia visceral para galpões e festivais de peso.',
    bioLong: {
      pt: 'Nina Roxx é uma força imparável no Hard Groove e Techno nacional. Sets rápidos, estroboscópicos e sem concessões que dominam os maiores galpões underground.',
      en: 'Nina Roxx delivers unrelenting energy and high-bpm power to underground warehouses and peak-time festival stages.',
      es: 'Nina Roxx entrega una energía implacable y sets de alto octanaje en los mayores festivales underground.'
    },
    quote: 'Sem rodeios. Sem filtros. Apenas pressão de sub-grave e velocidade.',
    quoteAuthor: 'Techno Underground BH · 2026',
    spotifyMonthlyListeners: '95.000 ouvintes mensais',
    featuredTrack: {
      title: 'Industrial Distortion (Warehouse Mix)',
      artist: 'NINA ROXX',
      duration: '5:45',
      bpm: 134,
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=electronic-future-beats-117997.mp3'
    },
    discography: [
      { title: 'Warehouse Assault EP', label: 'Raw Force Records', year: '2026', coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400', type: 'EP Vinil & Digital' }
    ],
    tourDates: [
      { date: '30 OUT 2026', dayMonth: '30 OUT', event: 'Galpão 55 Warehouse Rave', venue: 'Galpão 55', city: 'Belo Horizonte, MG', status: 'Confirmado', ticketLink: 'https://ingressos.me/nina-galpao' },
      { date: '12 DEZ 2026', dayMonth: '12 DEZ', event: 'Heavy Sound Warehouse', venue: 'Espaço Ferroviário', city: 'São Paulo, SP', status: 'Disponível' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop'
    ],
    riderTechnical: {
      players: '3x Pioneer CDJ-3000 ou CDJ-2000NXS2',
      mixer: '1x Pioneer DJM-900NXS2 ou DJM-A9',
      monitors: '2x Monitores de alta pressão com sub dedicado na cabine',
      power: '220V',
      inputs: ['Canal 1: CDJ 1', 'Canal 2: CDJ 2', 'Canal 3: CDJ 3'],
      hospitality: ['6x Cervejas Heineken geladas', '4x Red Bull', 'Água com gás gelada'],
      notes: 'Monitores com SPL mínimo de 110dB na cabine sem distorção.'
    },
    socials: {
      instagram: 'https://instagram.com',
      soundcloud: 'https://soundcloud.com'
    }
  }
};

export const DEFAULT_ATMOSPHERE_ID: AtmospherePresetId = 'noir-chrome';

export function saveDJAtmosphere(slug: string, presetId: AtmospherePresetId): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`bf_atmosphere_${slug.toLowerCase()}`, presetId);
    } catch {
      // Ignore localStorage errors
    }
  }
}

export function getDJAtmosphere(slug: string): AtmosphereConfig {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(`bf_atmosphere_${slug.toLowerCase()}`) as AtmospherePresetId;
      if (saved && ATMOSPHERE_PRESETS[saved]) {
        return ATMOSPHERE_PRESETS[saved];
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  const profile = ARTIST_PROFILES[slug.toLowerCase()];
  if (profile && ATMOSPHERE_PRESETS[profile.presetId]) {
    return ATMOSPHERE_PRESETS[profile.presetId];
  }
  return ATMOSPHERE_PRESETS[DEFAULT_ATMOSPHERE_ID];
}

export function getArtistProfile(slug: string): ArtistProfileData {
  const profile = ARTIST_PROFILES[slug.toLowerCase()];
  if (profile) return profile;

  // Generic fallback if slug is dynamic
  const formattedName = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    slug,
    name: `DJ ${formattedName}`,
    tagline: 'House · Techno · Electronic Live',
    genres: ['House', 'Techno', 'Electronic'],
    location: 'Brasil',
    baseFee: 'R$ 3.500',
    durationSet: '2h00 Set',
    presetId: 'noir-chrome',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    bioShort: 'Criando atmosferas memoráveis e elevando pistas de alta performance com sets autorais e curadoria refinada.',
    bioLong: {
      pt: 'Artista profissional integrante do ecossistema Beat Flow by NEXORA, com repertório dinâmico e rider técnico homologado para clubs e festivais.',
      en: 'Professional electronic music artist powered by Beat Flow by NEXORA.',
      es: 'Artista profesional de música electrónica en Beat Flow by NEXORA.'
    },
    quote: 'Música eletrônica é a arte de esculpir o tempo através do som.',
    quoteAuthor: 'Beat Flow Press · 2026',
    spotifyMonthlyListeners: '50.000 ouvintes',
    featuredTrack: {
      title: 'Hypnotic Pulse (Original Mix)',
      artist: `DJ ${formattedName}`,
      duration: '6:12',
      bpm: 125,
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=electronic-future-beats-117997.mp3'
    },
    discography: [
      { title: 'Origins EP', label: 'Independent', year: '2026', coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400', type: 'EP Oficial' }
    ],
    tourDates: [
      { date: '20 OUT 2026', dayMonth: '20 OUT', event: 'Tour Showcase Live', venue: 'Main Club', city: 'São Paulo, SP', status: 'Confirmado', ticketLink: 'https://ingressos.me' }
    ],
    pressPhotos: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop'
    ],
    riderTechnical: {
      players: '2x Pioneer CDJ-2000NXS2 ou CDJ-3000',
      mixer: '1x Pioneer DJM-900NXS2 ou DJM-A9',
      monitors: '2x Monitores de cabine com controle independente',
      power: '220V aterrado',
      inputs: ['Canal 1: CDJ 1', 'Canal 2: CDJ 2'],
      hospitality: ['4x Águas sem gás', '2x Toalhas pretas'],
      notes: 'Equipamentos revisados e cabos blindados de alta qualidade.'
    },
    socials: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com'
    }
  };
}