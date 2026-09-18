'use client';

// ============================================================================
// NEXORA COMMAND CENTER — SUPER ADMIN SERVICE
// Modelos, Cálculos Financeiros, Gestão de Usuários, Moderação, Transações e Configurações
// ============================================================================

export type DjPlanType = 'Free' | 'PRO' | 'Elite';
export type DjUserStatus = 'ativo' | 'suspenso' | 'em_analise';

export interface AdminDjUser {
  id: string;
  artisticName: string;
  realName: string;
  email: string;
  slug: string;
  avatarUrl: string;
  plan: DjPlanType;
  status: DjUserStatus;
  primaryGenre: string;
  city: string;
  profileCompleteness: number; // 0-100%
  responseTimeHours: number; // Ex: 1.8 hrs
  healthScore: number; // 0-100%
  totalBookings: number;
  totalGmv: number; // Volume total movimentado em R$
  isShowcaseFeatured: boolean;
  showcaseRank?: number; // 1 to 4
  suspensionReason?: string;
  suspendedAt?: string;
  createdAt: string;
}

export interface ChurnMetricPoint {
  month: string;
  churnRate: number; // % cancelamento assinaturas
  inadimplenciaRate: number; // % falhas de cobrança / cartão
  revenueLoss: number; // R$ perda estimada
  recoveredRevenue: number; // R$ recuperado por dunning
}

export type AdminTransactionStatus = 
  | 'em_negociacao' 
  | 'aguardando_pagamento' 
  | 'aprovada' 
  | 'estornado' 
  | 'concluido';

export interface AdminTransactionRecord {
  id: string;
  bookingId: string;
  contractorName: string;
  contractorEmail: string;
  djId: string;
  djName: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  totalBudget: number; // Cachê integral acordado
  depositAmount: number; // 50% de sinal
  platformFeeRate: number; // e.g. 0.10 (10%)
  platformTakeRevenue: number; // 10% do sinal (lucro Nexora)
  djNetPayout: number; // Repasse para o DJ (90% do sinal)
  gatewayFee: number; // Taxa de processamento gateway (~2.9%)
  status: AdminTransactionStatus;
  gatewayTransactionId: string;
  contractHash: string;
  contractPdfUrl: string;
  paidAt?: string;
  refundedAt?: string;
  refundReason?: string;
  createdAt: string;
}

export type OpportunityStatus = 'pendente' | 'aprovado' | 'rejeitado';

export interface MarketplaceOpportunity {
  id: string;
  title: string;
  contractorName: string;
  contractorType: 'Club' | 'Festival' | 'Agência' | 'Privado';
  city: string;
  eventDate: string;
  budgetOffered: number;
  genreRequired: string;
  description: string;
  status: OpportunityStatus;
  candidatesCount: number;
  rejectionReason?: string;
  createdAt: string;
}

export interface PlatformGlobalSettings {
  takeRatePercentage: number;
  depositPercentage: number;
  escrowReleaseHours: number; // e.g. 10.0
  planPricing: {
    free: number;
    proMonthly: number;
    eliteMonthly: number;
    proYearly: number;
    eliteYearly: number;
  };
  apiKeys: {
    stripeSecretKey: string;
    stripeWebhookSecret: string;
    mercadoPagoAccessToken: string;
    openAiGeminiApiKey: string;
  };
  systemVersion: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

// ============================================================================
// SEED INITIAL DATA
// ============================================================================

const SEED_DJS: AdminDjUser[] = [
  {
    id: 'dj-luna-001',
    artisticName: 'Luna Martins',
    realName: 'Luna Martins de Souza',
    email: 'luna.martins@beatflow.art',
    slug: 'luna-martins',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    plan: 'Elite',
    status: 'ativo',
    primaryGenre: 'Melodic Techno',
    city: 'São Paulo - SP',
    profileCompleteness: 98,
    responseTimeHours: 1.4,
    healthScore: 96,
    totalBookings: 24,
    totalGmv: 114000,
    isShowcaseFeatured: true,
    showcaseRank: 1,
    createdAt: '2025-11-10',
  },
  {
    id: 'dj-skyline-002',
    artisticName: 'DJ Skyline',
    realName: 'Bruno Ribeiro Santos',
    email: 'bruno@djskyline.com',
    slug: 'djskyline',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    plan: 'PRO',
    status: 'ativo',
    primaryGenre: 'Tech House',
    city: 'São Paulo - SP',
    profileCompleteness: 92,
    responseTimeHours: 2.1,
    healthScore: 89,
    totalBookings: 18,
    totalGmv: 82500,
    isShowcaseFeatured: true,
    showcaseRank: 2,
    createdAt: '2025-12-04',
  },
  {
    id: 'dj-aurora-003',
    artisticName: 'Aurora V',
    realName: 'Aurora Vasconcelos',
    email: 'aurora.v@musicagency.com',
    slug: 'aurora-v',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    plan: 'Elite',
    status: 'ativo',
    primaryGenre: 'Deep House',
    city: 'Rio de Janeiro - RJ',
    profileCompleteness: 95,
    responseTimeHours: 1.2,
    healthScore: 94,
    totalBookings: 31,
    totalGmv: 168000,
    isShowcaseFeatured: true,
    showcaseRank: 3,
    createdAt: '2025-10-18',
  },
  {
    id: 'dj-krypton-004',
    artisticName: 'Krypton Bass',
    realName: 'Carlos Eduardo Neves',
    email: 'carlos.krypton@gmail.com',
    slug: 'krypton-bass',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    plan: 'PRO',
    status: 'ativo',
    primaryGenre: 'Techno',
    city: 'Curitiba - PR',
    profileCompleteness: 85,
    responseTimeHours: 3.5,
    healthScore: 82,
    totalBookings: 12,
    totalGmv: 54000,
    isShowcaseFeatured: true,
    showcaseRank: 4,
    createdAt: '2026-01-15',
  },
  {
    id: 'dj-solaria-005',
    artisticName: 'Solaria Sun',
    realName: 'Helena Alcantara',
    email: 'helena.solaria@outlook.com',
    slug: 'solaria-sun',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
    plan: 'PRO',
    status: 'ativo',
    primaryGenre: 'Afro House',
    city: 'Salvador - BA',
    profileCompleteness: 88,
    responseTimeHours: 2.8,
    healthScore: 86,
    totalBookings: 15,
    totalGmv: 63000,
    isShowcaseFeatured: false,
    createdAt: '2026-02-01',
  },
  {
    id: 'dj-subzero-006',
    artisticName: 'SubZero Beat',
    realName: 'Fernando Ramos',
    email: 'fernando.sub@gmail.com',
    slug: 'subzero-beat',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop',
    plan: 'Free',
    status: 'ativo',
    primaryGenre: 'Drum and Bass',
    city: 'Belo Horizonte - MG',
    profileCompleteness: 68,
    responseTimeHours: 8.5,
    healthScore: 58,
    totalBookings: 4,
    totalGmv: 12000,
    isShowcaseFeatured: false,
    createdAt: '2026-03-10',
  },
  {
    id: 'dj-vortex-007',
    artisticName: 'Vortex Pulse',
    realName: 'Gabriel Peixoto',
    email: 'vortex.pulse@spammail.net',
    slug: 'vortex-pulse',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    plan: 'Free',
    status: 'suspenso',
    primaryGenre: 'Hard Techno',
    city: 'Campinas - SP',
    profileCompleteness: 42,
    responseTimeHours: 24.0,
    healthScore: 28,
    totalBookings: 1,
    totalGmv: 2500,
    isShowcaseFeatured: false,
    suspensionReason: 'Reclamação de contratante por no-show recorrente e tentativa de desvio de pagamento fora da plataforma.',
    suspendedAt: '2026-08-12',
    createdAt: '2026-04-05',
  },
  {
    id: 'dj-novabeat-008',
    artisticName: 'Nova Beat',
    realName: 'Camila Ferreira',
    email: 'camila.novabeat@gmail.com',
    slug: 'nova-beat',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    plan: 'PRO',
    status: 'em_analise',
    primaryGenre: 'House',
    city: 'Florianópolis - SC',
    profileCompleteness: 79,
    responseTimeHours: 3.2,
    healthScore: 74,
    totalBookings: 6,
    totalGmv: 22000,
    isShowcaseFeatured: false,
    createdAt: '2026-07-20',
  }
];

const SEED_CHURN_DATA: ChurnMetricPoint[] = [
  { month: 'Out/25', churnRate: 4.2, inadimplenciaRate: 2.8, revenueLoss: 3200, recoveredRevenue: 1800 },
  { month: 'Nov/25', churnRate: 3.9, inadimplenciaRate: 2.5, revenueLoss: 2950, recoveredRevenue: 1950 },
  { month: 'Dez/25', churnRate: 4.5, inadimplenciaRate: 3.1, revenueLoss: 3800, recoveredRevenue: 2200 },
  { month: 'Jan/26', churnRate: 3.8, inadimplenciaRate: 2.4, revenueLoss: 2700, recoveredRevenue: 2000 },
  { month: 'Fev/26', churnRate: 3.2, inadimplenciaRate: 2.1, revenueLoss: 2350, recoveredRevenue: 1900 },
  { month: 'Mar/26', churnRate: 3.0, inadimplenciaRate: 1.9, revenueLoss: 2100, recoveredRevenue: 1850 },
  { month: 'Abr/26', churnRate: 2.8, inadimplenciaRate: 2.2, revenueLoss: 2400, recoveredRevenue: 2100 },
  { month: 'Mai/26', churnRate: 2.7, inadimplenciaRate: 1.8, revenueLoss: 1950, recoveredRevenue: 1750 },
  { month: 'Jun/26', churnRate: 2.5, inadimplenciaRate: 1.6, revenueLoss: 1800, recoveredRevenue: 1650 },
  { month: 'Jul/26', churnRate: 2.4, inadimplenciaRate: 1.7, revenueLoss: 1750, recoveredRevenue: 1600 },
  { month: 'Ago/26', churnRate: 2.2, inadimplenciaRate: 1.5, revenueLoss: 1600, recoveredRevenue: 1520 },
  { month: 'Set/26', churnRate: 2.1, inadimplenciaRate: 1.3, revenueLoss: 1420, recoveredRevenue: 1390 },
];

const SEED_TRANSACTIONS: AdminTransactionRecord[] = [
  {
    id: 'tx-sec-901',
    bookingId: 'book-104',
    contractorName: 'Casamento Premium • Marina & Lucas',
    contractorEmail: 'marina.noiva@gmail.com',
    djId: 'dj-luna-001',
    djName: 'Luna Martins',
    eventName: 'After Party Casamento',
    eventDate: '2026-07-04',
    eventLocation: 'Campos do Jordão - SP',
    totalBudget: 7000,
    depositAmount: 3500,
    platformFeeRate: 0.10,
    platformTakeRevenue: 350, // 10% de R$ 3.500
    djNetPayout: 3150, // 90% de R$ 3.500
    gatewayFee: 101.50, // 2.9%
    status: 'aprovada',
    gatewayTransactionId: 'ch_stripe_98A190Zk82',
    contractHash: 'sha256_e819fa00bc1928374d9e018a1',
    contractPdfUrl: 'https://beatflow.art/contratos/contrato_book-104.pdf',
    paidAt: '2026-05-10T14:22:00Z',
    createdAt: '2026-04-20T16:00:00Z',
  },
  {
    id: 'tx-sec-902',
    bookingId: 'book-103',
    contractorName: 'Festival Pulsar Beach',
    contractorEmail: 'booking@pulsarbeach.com.br',
    djId: 'dj-luna-001',
    djName: 'Luna Martins',
    eventName: 'Pulsar Beach Stage',
    eventDate: '2026-06-22',
    eventLocation: 'Florianópolis - SC',
    totalBudget: 6000,
    depositAmount: 3000,
    platformFeeRate: 0.10,
    platformTakeRevenue: 300,
    djNetPayout: 2700,
    gatewayFee: 87.00,
    status: 'aguardando_pagamento',
    gatewayTransactionId: 'pi_stripe_3N9281726',
    contractHash: 'sha256_b412ca88ef9910293a11b742',
    contractPdfUrl: 'https://beatflow.art/contratos/contrato_book-103.pdf',
    createdAt: '2026-04-28T09:00:00Z',
  },
  {
    id: 'tx-sec-903',
    bookingId: 'book-102',
    contractorName: 'Agência Sunset Grooves',
    contractorEmail: 'contato@sunsetgrooves.com',
    djId: 'dj-skyline-002',
    djName: 'DJ Skyline',
    eventName: 'Rooftop Melodic Sunset',
    eventDate: '2026-06-08',
    eventLocation: 'Rio de Janeiro - RJ',
    totalBudget: 5500,
    depositAmount: 2750,
    platformFeeRate: 0.10,
    platformTakeRevenue: 275,
    djNetPayout: 2475,
    gatewayFee: 79.75,
    status: 'em_negociacao',
    gatewayTransactionId: 'mp_pay_77261928',
    contractHash: 'sha256_draft_82910fa7281',
    contractPdfUrl: 'https://beatflow.art/contratos/contrato_book-102.pdf',
    createdAt: '2026-05-02T14:30:00Z',
  },
  {
    id: 'tx-sec-904',
    bookingId: 'book-105',
    contractorName: 'Club D-Edge (Curadoria)',
    contractorEmail: 'curadoria@d-edge.com.br',
    djId: 'dj-aurora-003',
    djName: 'Aurora V',
    eventName: 'Deep Sensations Night',
    eventDate: '2026-05-18',
    eventLocation: 'São Paulo - SP',
    totalBudget: 4500,
    depositAmount: 2250,
    platformFeeRate: 0.10,
    platformTakeRevenue: 225,
    djNetPayout: 2025,
    gatewayFee: 65.25,
    status: 'concluido',
    gatewayTransactionId: 'ch_stripe_77192801Aa',
    contractHash: 'sha256_f9918230aabbcc481920',
    contractPdfUrl: 'https://beatflow.art/contratos/contrato_book-105.pdf',
    paidAt: '2026-05-01T10:00:00Z',
    createdAt: '2026-04-12T11:00:00Z',
  },
  {
    id: 'tx-sec-905',
    bookingId: 'book-106',
    contractorName: 'Privê Club São Paulo',
    contractorEmail: 'gerencia@priveclub.com',
    djId: 'dj-krypton-004',
    djName: 'Krypton Bass',
    eventName: 'Dark Warehouse Session',
    eventDate: '2026-05-02',
    eventLocation: 'São Paulo - SP',
    totalBudget: 4000,
    depositAmount: 2000,
    platformFeeRate: 0.10,
    platformTakeRevenue: 200,
    djNetPayout: 1800,
    gatewayFee: 58.00,
    status: 'estornado',
    gatewayTransactionId: 're_stripe_8291028711',
    contractHash: 'sha256_void_9918274a7b',
    contractPdfUrl: 'https://beatflow.art/contratos/contrato_book-106.pdf',
    paidAt: '2026-04-15T09:00:00Z',
    refundedAt: '2026-04-29T17:30:00Z',
    refundReason: 'Interdição do local por ordem da defesa civil com aviso prévio comprovado. Reembolso total do sinal efetuado ao contratante.',
    createdAt: '2026-04-10T15:00:00Z',
  }
];

const SEED_OPPORTUNITIES: MarketplaceOpportunity[] = [
  {
    id: 'opp-101',
    title: 'Warm-up Conceitual para Headliner Alemão',
    contractorName: 'Club D-Edge São Paulo',
    contractorType: 'Club',
    city: 'São Paulo - SP',
    eventDate: '2026-06-14',
    budgetOffered: 3500,
    genreRequired: 'Melodic Techno / Tech House',
    description: 'Buscamos DJ com repertório refinado em vinil ou digital para abertura da pista principal (23h às 01h30). Rider padrão Pioneer 3000.',
    status: 'pendente',
    candidatesCount: 8,
    createdAt: '2026-05-12T10:00:00Z',
  },
  {
    id: 'opp-102',
    title: 'Sunset Stage • Festival Beira Mar 2026',
    contractorName: 'Agência Oca Produções',
    contractorType: 'Festival',
    city: 'Rio de Janeiro - RJ',
    eventDate: '2026-07-18',
    budgetOffered: 5500,
    genreRequired: 'Afro House / Deep House',
    description: 'Set das 17h às 19h no pôr do sol. Requer envio prévio de link SoundCloud com pelo menos 1 set ao vivo gravado.',
    status: 'aprovado',
    candidatesCount: 19,
    createdAt: '2026-05-08T15:30:00Z',
  },
  {
    id: 'opp-103',
    title: 'Festa Corporativa Exclusiva • Fintech Global',
    contractorName: 'Pulse Corporate Events',
    contractorType: 'Privado',
    city: 'São Paulo - SP',
    eventDate: '2026-06-26',
    budgetOffered: 4800,
    genreRequired: 'House / Nu-Disco / Remixes',
    description: 'Evento de celebração com 400 convidados. Som ambiente chic seguido de pista animada após as 21h.',
    status: 'aprovado',
    candidatesCount: 12,
    createdAt: '2026-05-05T12:00:00Z',
  },
  {
    id: 'opp-104',
    title: 'Festa Universitária Mega Bass (Anúncio Suspeito)',
    contractorName: 'Conta Anônima • Telegram Free',
    contractorType: 'Privado',
    city: 'Campinas - SP',
    eventDate: '2026-05-30',
    budgetOffered: 15000,
    genreRequired: 'Qualquer',
    description: 'Pagamento adiantado via PIX sem contrato! Chamar no Telegram @festatop2026.',
    status: 'rejeitado',
    candidatesCount: 0,
    rejectionReason: 'Tentativa explícita de phishing e desvio de transação fora da plataforma com promessa irreal de cachê.',
    createdAt: '2026-05-11T08:00:00Z',
  }
];

const SEED_SETTINGS: PlatformGlobalSettings = {
  takeRatePercentage: 10.0,
  depositPercentage: 50,
  escrowReleaseHours: 24,
  planPricing: {
    free: 0,
    proMonthly: 49.00,
    eliteMonthly: 129.00,
    proYearly: 470.00,
    eliteYearly: 1240.00,
  },
  apiKeys: {
    stripeSecretKey: 'sk_live_51N89x209849281aBcDeFgHiJkLmNoPqRsTuVwXyZ',
    stripeWebhookSecret: 'whsec_981a20bf8219c84e91028374d9e018a1bcde',
    mercadoPagoAccessToken: 'APP_USR-77281928374-091218-a892b10928374-live',
    openAiGeminiApiKey: 'AIzaSyDn981028_c891028374d9e018a1b2c3d4e5f',
  },
  systemVersion: 'v2.6.4 (Production Core)',
  lastUpdatedBy: 'admin@nexora.vc',
  lastUpdatedAt: '2026-05-12 14:30 BRT',
};

// STORAGE KEYS
const STORAGE_ADMIN_DJS = 'nexora_admin_djs_v1';
const STORAGE_ADMIN_TRANSACTIONS = 'nexora_admin_transactions_v1';
const STORAGE_ADMIN_OPPORTUNITIES = 'nexora_admin_opportunities_v1';
const STORAGE_ADMIN_SETTINGS = 'nexora_admin_settings_v1';

class AdminService {
  // --------------------------------------------------------------------------
  // DJS / USERS MANAGEMENT
  // --------------------------------------------------------------------------
  getDjs(): AdminDjUser[] {
    if (typeof window === 'undefined') return SEED_DJS;
    try {
      const raw = localStorage.getItem(STORAGE_ADMIN_DJS);
      if (!raw) {
        localStorage.setItem(STORAGE_ADMIN_DJS, JSON.stringify(SEED_DJS));
        return SEED_DJS;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_DJS;
    }
  }

  suspendDj(djId: string, reason: string): AdminDjUser[] {
    const list = this.getDjs();
    const updated = list.map((dj) => {
      if (dj.id === djId) {
        return {
          ...dj,
          status: 'suspenso' as DjUserStatus,
          suspensionReason: reason,
          suspendedAt: new Date().toISOString().slice(0, 10),
          isShowcaseFeatured: false,
          showcaseRank: undefined,
        };
      }
      return dj;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ADMIN_DJS, JSON.stringify(updated));
    }
    return updated;
  }

  reactivateDj(djId: string): AdminDjUser[] {
    const list = this.getDjs();
    const updated = list.map((dj) => {
      if (dj.id === djId) {
        return {
          ...dj,
          status: 'ativo' as DjUserStatus,
          suspensionReason: undefined,
          suspendedAt: undefined,
        };
      }
      return dj;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ADMIN_DJS, JSON.stringify(updated));
    }
    return updated;
  }

  updateShowcaseCuration(curatedIdsInOrder: string[]): AdminDjUser[] {
    const list = this.getDjs();
    const updated = list.map((dj) => {
      const rankIndex = curatedIdsInOrder.indexOf(dj.id);
      if (rankIndex !== -1) {
        return {
          ...dj,
          isShowcaseFeatured: true,
          showcaseRank: rankIndex + 1,
        };
      } else {
        return {
          ...dj,
          isShowcaseFeatured: false,
          showcaseRank: undefined,
        };
      }
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ADMIN_DJS, JSON.stringify(updated));
    }
    return updated;
  }

  // --------------------------------------------------------------------------
  // FINANCIAL KPIS & CHURN
  // --------------------------------------------------------------------------
  getFinancialKpis() {
    const djs = this.getDjs();
    const txs = this.getTransactions();

    // 1. MRR calculation based on active subscribers
    const proCount = djs.filter(d => d.plan === 'PRO' && d.status === 'ativo').length;
    const eliteCount = djs.filter(d => d.plan === 'Elite' && d.status === 'ativo').length;
    // Weighted average extrapolation for platform volume
    const simulatedActivePros = 642 + proCount;
    const simulatedActiveElites = 118 + eliteCount;
    const mrr = (simulatedActivePros * 49.00) + (simulatedActiveElites * 129.00);

    // 2. GMV (Gross Merchandise Volume)
    const approvedTxs = txs.filter(t => t.status === 'aprovada' || t.status === 'concluido');
    const directTxGmv = approvedTxs.reduce((acc, t) => acc + t.totalBudget, 0);
    const totalGmv = 584200 + directTxGmv;

    // 3. Platform Take Rate Revenue (comissao das transacoes)
    const directPlatformCut = approvedTxs.reduce((acc, t) => acc + t.platformTakeRevenue, 0);
    const platformTransactionRevenue = 58420 + directPlatformCut;

    // 4. Escrow deposit held
    const escrowHeld = txs
      .filter(t => t.status === 'aprovada')
      .reduce((acc, t) => acc + t.depositAmount, 0);

    // 5. Total refunded
    const totalRefunded = txs
      .filter(t => t.status === 'estornado')
      .reduce((acc, t) => acc + t.depositAmount, 0);

    return {
      mrr,
      mrrGrowth: '+12.4%',
      proSubscribers: simulatedActivePros,
      eliteSubscribers: simulatedActiveElites,
      totalGmv,
      gmvGrowth: '+18.7%',
      platformTransactionRevenue,
      platformRevenueGrowth: '+18.7%',
      escrowHeld,
      totalRefunded,
      averageBookingTicket: 4850,
      totalCompletedBookings: 142 + approvedTxs.length,
    };
  }

  getChurnHistory(): ChurnMetricPoint[] {
    return SEED_CHURN_DATA;
  }

  // --------------------------------------------------------------------------
  // TRANSACTIONS & CONTRACT AUDIT
  // --------------------------------------------------------------------------
  getTransactions(): AdminTransactionRecord[] {
    if (typeof window === 'undefined') return SEED_TRANSACTIONS;
    try {
      const raw = localStorage.getItem(STORAGE_ADMIN_TRANSACTIONS);
      if (!raw) {
        localStorage.setItem(STORAGE_ADMIN_TRANSACTIONS, JSON.stringify(SEED_TRANSACTIONS));
        return SEED_TRANSACTIONS;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_TRANSACTIONS;
    }
  }

  refundTransaction(txId: string, reason: string): AdminTransactionRecord[] {
    const list = this.getTransactions();
    const updated = list.map((tx) => {
      if (tx.id === txId) {
        return {
          ...tx,
          status: 'estornado' as AdminTransactionStatus,
          refundedAt: new Date().toISOString(),
          refundReason: reason,
        };
      }
      return tx;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ADMIN_TRANSACTIONS, JSON.stringify(updated));
    }
    return updated;
  }

  // --------------------------------------------------------------------------
  // MARKETPLACE OPPORTUNITIES
  // --------------------------------------------------------------------------
  getOpportunities(): MarketplaceOpportunity[] {
    if (typeof window === 'undefined') return SEED_OPPORTUNITIES;
    try {
      const raw = localStorage.getItem(STORAGE_ADMIN_OPPORTUNITIES);
      if (!raw) {
        localStorage.setItem(STORAGE_ADMIN_OPPORTUNITIES, JSON.stringify(SEED_OPPORTUNITIES));
        return SEED_OPPORTUNITIES;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_OPPORTUNITIES;
    }
  }

  approveOpportunity(oppId: string): MarketplaceOpportunity[] {
    const list = this.getOpportunities();
    const updated = list.map((opp) => {
      if (opp.id === oppId) {
        return { ...opp, status: 'aprovado' as OpportunityStatus, rejectionReason: undefined };
      }
      return opp;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ADMIN_OPPORTUNITIES, JSON.stringify(updated));
    }
    return updated;
  }

  rejectOpportunity(oppId: string, reason: string): MarketplaceOpportunity[] {
    const list = this.getOpportunities();
    const updated = list.map((opp) => {
      if (opp.id === oppId) {
        return { ...opp, status: 'rejeitado' as OpportunityStatus, rejectionReason: reason };
      }
      return opp;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ADMIN_OPPORTUNITIES, JSON.stringify(updated));
    }
    return updated;
  }

  getMarketplaceConversionMetrics() {
    const opps = this.getOpportunities();
    const totalPosted = 142 + opps.length;
    const approvedCount = opps.filter(o => o.status === 'aprovado').length + 112;
    const closedContracts = 89;
    const conversionRate = ((closedContracts / totalPosted) * 100).toFixed(1);
    const avgResponseTimeHours = 3.8;
    const totalGmvConnected = 284500;

    return {
      totalPosted,
      approvedCount,
      pendingCount: opps.filter(o => o.status === 'pendente').length,
      rejectedCount: opps.filter(o => o.status === 'rejeitado').length,
      closedContracts,
      conversionRate,
      avgResponseTimeHours,
      totalGmvConnected,
    };
  }

  // --------------------------------------------------------------------------
  // GLOBAL SETTINGS
  // --------------------------------------------------------------------------
  getSettings(): PlatformGlobalSettings {
    if (typeof window === 'undefined') return SEED_SETTINGS;
    try {
      const raw = localStorage.getItem(STORAGE_ADMIN_SETTINGS);
      if (!raw) {
        localStorage.setItem(STORAGE_ADMIN_SETTINGS, JSON.stringify(SEED_SETTINGS));
        return SEED_SETTINGS;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_SETTINGS;
    }
  }

  updateSettings(newSettings: Partial<PlatformGlobalSettings>): PlatformGlobalSettings {
    const current = this.getSettings();
    const merged: PlatformGlobalSettings = {
      ...current,
      ...newSettings,
      planPricing: {
        ...current.planPricing,
        ...(newSettings.planPricing || {}),
      },
      apiKeys: {
        ...current.apiKeys,
        ...(newSettings.apiKeys || {}),
      },
      lastUpdatedAt: new Date().toLocaleString('pt-BR'),
      lastUpdatedBy: 'admin@nexora.vc (Super Admin)',
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ADMIN_SETTINGS, JSON.stringify(merged));
    }
    return merged;
  }
}

export const adminService = new AdminService();
