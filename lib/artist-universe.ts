'use client';

export type AtmospherePresetId = 
  | 'berlin-warehouse'
  | 'tulum-organic'
  | 'tokyo-cyber-neon'
  | 'ibiza-sunset-gold'
  | 'deep-abyss';

export interface AtmosphereLighting {
  primaryGlow: string;     // Hex color of main spotlight
  secondaryGlow: string;   // Hex color of ambient counter-light
  accentGlow: string;      // Accent pulse color
  beamAngle: number;       // Angle in degrees for atmospheric volumetric beam
  glowIntensity: number;   // 0.1 to 1.0 multiplier
}

export interface AtmosphereParticles {
  density: number;         // Count of particle nodes (e.g. 25 - 60)
  speed: number;           // Velocity multiplier (0.2 to 1.5)
  color: string;           // Particle color / tint
  sizeRange: [number, number]; // [min, max] in px
  type: 'dust' | 'embers' | 'digital-rain' | 'sun-flare' | 'smoke-haze';
}

export interface AtmosphereConfig {
  id: AtmospherePresetId;
  name: string;
  tagline: string;
  description: string;
  themeClass: string;
  background: {
    baseColor: string;       // e.g. '#06070B'
    gradientOverlay: string; // CSS background image string
    vignetteOpacity: number; // 0.0 to 1.0
  };
  lighting: AtmosphereLighting;
  particles: AtmosphereParticles;
  audioSignature: {
    genre: string;
    suggestedBpm: number;
    synthesizerTone: 'dark-sub' | 'tribal-wood' | 'synthwave-saw' | 'warm-pad' | 'sub-pulse';
  };
}

export const ATMOSPHERE_PRESETS: Record<AtmospherePresetId, AtmosphereConfig> = {
  'berlin-warehouse': {
    id: 'berlin-warehouse',
    name: 'Berlin Warehouse',
    tagline: 'Cru, Industrial & Subgrave Frio',
    description: 'Iluminação estroboscópica fria, partículas de névoa densa e subgraves cortantes inspirados nos galpões de Kreuzberg.',
    themeClass: 'theme-berlin',
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
      genre: 'Industrial & Peak Time Techno',
      suggestedBpm: 132,
      synthesizerTone: 'dark-sub',
    },
  },

  'tulum-organic': {
    id: 'tulum-organic',
    name: 'Tulum Organic Cenote',
    tagline: 'Místico, Terroso & Selva Noturna',
    description: 'Brilho esmeralda suave, partículas de brasas suspensas e texturas percussivas amadeiradas sob a selva caribenha.',
    themeClass: 'theme-tulum',
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
      sizeRange: [1.2, 3.5],
      type: 'embers',
    },
    audioSignature: {
      genre: 'Organic & Afro House',
      suggestedBpm: 122,
      synthesizerTone: 'tribal-wood',
    },
  },

  'tokyo-cyber-neon': {
    id: 'tokyo-cyber-neon',
    name: 'Neo Tokyo Club',
    tagline: 'Cyberpunk, Alta Energia & Magenta Laser',
    description: 'Reflexos em asfalto molhado, feixes de laser ultravioleta e neon ciano futurista para pistas de alta velocidade.',
    themeClass: 'theme-tokyo',
    background: {
      baseColor: '#070512',
      gradientOverlay: 'radial-gradient(ellipse at 50% -10%, rgba(217, 70, 239, 0.35) 0%, rgba(26, 11, 46, 0.85) 50%, #070512 100%)',
      vignetteOpacity: 0.7,
    },
    lighting: {
      primaryGlow: '#D946EF',
      secondaryGlow: '#06B6D4',
      accentGlow: '#A855F7',
      beamAngle: 45,
      glowIntensity: 0.88,
    },
    particles: {
      density: 55,
      speed: 0.9,
      color: '#F0ABFC',
      sizeRange: [1, 3],
      type: 'digital-rain',
    },
    audioSignature: {
      genre: 'Melodic Techno & Cyber House',
      suggestedBpm: 128,
      synthesizerTone: 'synthwave-saw',
    },
  },

  'ibiza-sunset-gold': {
    id: 'ibiza-sunset-gold',
    name: 'Ibiza Golden Sunset',
    tagline: 'Crepúsculo Dourado, Calor & Harmonia',
    description: 'Tons âmbar de pôr do sol à beira-mar em Es Vedrà, névoa dourada etérea e graves quentes que abraçam a pista.',
    themeClass: 'theme-ibiza',
    background: {
      baseColor: '#0C0603',
      gradientOverlay: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.3) 0%, rgba(69, 26, 3, 0.8) 55%, #0C0603 100%)',
      vignetteOpacity: 0.72,
    },
    lighting: {
      primaryGlow: '#F59E0B',
      secondaryGlow: '#FB7185',
      accentGlow: '#FDE68A',
      beamAngle: 50,
      glowIntensity: 0.82,
    },
    particles: {
      density: 35,
      speed: 0.35,
      color: '#FCD34D',
      sizeRange: [1.5, 4],
      type: 'sun-flare',
    },
    audioSignature: {
      genre: 'Deep & Progressive Sunset',
      suggestedBpm: 124,
      synthesizerTone: 'warm-pad',
    },
  },

  'deep-abyss': {
    id: 'deep-abyss',
    name: 'Deep Abyss Club',
    tagline: 'Minimalista, Oceânico & Imersivo',
    description: 'Bioluminescência ciano profunda, contrastes cirúrgicos em preto absoluto e respiração visual contínua.',
    themeClass: 'theme-abyss',
    background: {
      baseColor: '#020610',
      gradientOverlay: 'radial-gradient(ellipse at 50% -20%, rgba(14, 165, 233, 0.35) 0%, rgba(3, 20, 48, 0.85) 60%, #020610 100%)',
      vignetteOpacity: 0.82,
    },
    lighting: {
      primaryGlow: '#0EA5E9',
      secondaryGlow: '#6366F1',
      accentGlow: '#38BDF8',
      beamAngle: 30,
      glowIntensity: 0.8,
    },
    particles: {
      density: 42,
      speed: 0.45,
      color: '#7DD3FC',
      sizeRange: [1, 3.2],
      type: 'dust',
    },
    audioSignature: {
      genre: 'Tech House & Hypnotic Groove',
      suggestedBpm: 126,
      synthesizerTone: 'sub-pulse',
    },
  },
};

export const DEFAULT_ATMOSPHERE_ID: AtmospherePresetId = 'deep-abyss';

// Storage Key for Atmosphere synchronization
export const ATMOSPHERE_STORAGE_KEY_PREFIX = 'beatflow_dj_atmosphere_';

export function getDJAtmosphere(djSlugOrId: string): AtmosphereConfig {
  if (typeof window === 'undefined') {
    return ATMOSPHERE_PRESETS[DEFAULT_ATMOSPHERE_ID];
  }
  try {
    const raw = localStorage.getItem(`${ATMOSPHERE_STORAGE_KEY_PREFIX}${djSlugOrId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && ATMOSPHERE_PRESETS[parsed as AtmospherePresetId]) {
        return ATMOSPHERE_PRESETS[parsed as AtmospherePresetId];
      }
      if (parsed && parsed.id && ATMOSPHERE_PRESETS[parsed.id as AtmospherePresetId]) {
        return ATMOSPHERE_PRESETS[parsed.id as AtmospherePresetId];
      }
    }
  } catch (err) {
    console.error('Failed to read atmosphere config:', err);
  }
  return ATMOSPHERE_PRESETS[DEFAULT_ATMOSPHERE_ID];
}

export function saveDJAtmosphere(djSlugOrId: string, presetId: AtmospherePresetId): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${ATMOSPHERE_STORAGE_KEY_PREFIX}${djSlugOrId}`, JSON.stringify(presetId));
    // Broadcast event for multi-tab / real-time components
    window.dispatchEvent(new CustomEvent('beatflow_atmosphere_changed', { 
      detail: { djSlugOrId, presetId, config: ATMOSPHERE_PRESETS[presetId] } 
    }));
  } catch (err) {
    console.error('Failed to persist atmosphere config:', err);
  }
}

export interface ArtistProfile {
  id: string;
  slug: string;
  artisticName: string;
  baseCity: string;
  genres: string[];
  heroImage: string;
  socials: {
    soundcloud?: string;
    spotify?: string;
    instagram?: string;
  };
  theme: {
    backgroundBase: string;
    backgroundElevated: string;
    borderColor: string;
    glowEffect: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

export function getArtistProfile(slug: string): ArtistProfile {
  const atmosphere = getDJAtmosphere(slug);

  const isSkyline = slug.toLowerCase().includes('skyline');
  const fallbackName = isSkyline ? 'DJ Skyline' : 'Luna Martins';
  const fallbackCity = 'São Paulo - SP';
  const fallbackGenres = isSkyline 
    ? ['Tech House', 'House', 'Progressive']
    : ['Melodic Techno', 'Tech House', 'Deep House'];
  const fallbackImage = isSkyline
    ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600'
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';

  return {
    id: isSkyline ? 'dj-skyline-002' : 'dj-luna-001',
    slug: slug,
    artisticName: fallbackName,
    baseCity: fallbackCity,
    genres: fallbackGenres,
    heroImage: fallbackImage,
    socials: {
      soundcloud: isSkyline 
        ? 'https://soundcloud.com/djskyline/club-peak-session' 
        : 'https://soundcloud.com/lunamartins/sunset-melodic-live',
      spotify: 'https://open.spotify.com',
      instagram: 'https://instagram.com',
    },
    theme: {
      backgroundBase: atmosphere.background.baseColor,
      backgroundElevated: 'rgba(18, 20, 32, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.12)',
      glowEffect: `0 0 40px ${atmosphere.lighting.primaryGlow}33`,
      primaryColor: atmosphere.lighting.primaryGlow,
      secondaryColor: atmosphere.lighting.secondaryGlow,
    },
  };
}
