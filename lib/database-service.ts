'use client';

// ============================================================================
// BEAT FLOW — DATABASE SERVICE & STATE MACHINE ENGINE
// Implementa as 4 entidades especificadas:
// 1. dj_profiles (Press Kit, Rider Técnico, Slugs, Embeds)
// 2. bookings (Máquina de Estados de Propostas + SoundCloud Ref)
// 3. transactions (Controle de Adiantamento 50% Sinal + Gateway Webhooks)
// 4. schedule_locks (Bloqueio Automático de Datas / Anti-Double Booking)
// ============================================================================

export interface DjProfileModel {
  id: string;
  user_id: string;
  slug: string;
  artistic_name: string;
  city_base: string;
  bio_text: string;
  genres: string[];
  fee_range_min: number;
  fee_range_max: number;
  audio_links: {
    soundcloud_url?: string;
    spotify_url?: string;
  };
  technical_rider: {
    cdjs?: string;
    mixer?: string;
    monitors?: number;
    notes?: string;
  };
  live_photos_urls: string[];
  is_open_to_bookings: boolean;
  created_at: string;
}

export type BookingStatus = 
  | 'pendente' 
  | 'em_negociacao' 
  | 'aguardando_pagamento' 
  | 'aprovada' 
  | 'recusada';

export interface BookingModel {
  id: string;
  dj_id: string;
  contractor_name: string;
  contractor_contact: string;
  event_name: string;
  event_date: string; // ISO String or YYYY-MM-DD
  event_duration_hours: number;
  location_city: string;
  offered_budget: number;
  sound_reference_url: string; // SoundCloud ou Spotify obrigatório
  notes?: string;
  status: BookingStatus;
  counter_offer_budget?: number;
  created_at: string;
}

export type PaymentStatus = 'aguardando' | 'pago' | 'reembolsado';

export interface TransactionModel {
  id: string;
  booking_id: string;
  amount_total: number;
  deposit_amount: number; // 50% de sinal
  payment_status: PaymentStatus;
  payment_gateway_id?: string;
  contract_pdf_url?: string;
  paid_at?: string;
  created_at: string;
}

export interface ScheduleLockModel {
  id: string;
  dj_id: string;
  booking_id?: string;
  locked_date: string; // YYYY-MM-DD
  event_title: string;
  is_auto_locked: boolean;
  created_at: string;
}

// STORAGE KEYS
const STORAGE_PROFILES = 'beatflow_db_dj_profiles_v1';
const STORAGE_BOOKINGS = 'beatflow_db_bookings_v1';
const STORAGE_TRANSACTIONS = 'beatflow_db_transactions_v1';
const STORAGE_LOCKS = 'beatflow_db_schedule_locks_v1';

// INITIAL SEED DATA
const SEED_PROFILES: DjProfileModel[] = [
  {
    id: 'dj-luna-001',
    user_id: 'usr_luna_123',
    slug: 'luna-martins',
    artistic_name: 'Luna Martins',
    city_base: 'São Paulo - SP',
    bio_text: 'Produtora musical e DJ especializada em timbres analógicos, baixos envolventes e melodias etéreas. Cria uma atmosfera progressiva única para sunsets, clubs e festivais conceituais.',
    genres: ['Melodic Techno', 'Tech House', 'Deep House'],
    fee_range_min: 2500,
    fee_range_max: 6000,
    audio_links: {
      soundcloud_url: 'https://soundcloud.com/lunamartins/sunset-melodic-live',
      spotify_url: 'https://open.spotify.com/artist/lunamartins',
    },
    technical_rider: {
      cdjs: '2x Pioneer CDJ-3000 (Pro DJ Link)',
      mixer: '1x Pioneer DJM-A9',
      monitors: 2,
      notes: 'Monitores de cabine em estéreo alinhados ao ouvido do artista e ponto de energia aterrado 220V/110V',
    },
    live_photos_urls: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600'
    ],
    is_open_to_bookings: true,
    created_at: new Date('2026-01-10T12:00:00Z').toISOString(),
  },
  {
    id: 'dj-skyline-002',
    user_id: 'usr_skyline_456',
    slug: 'djskyline',
    artistic_name: 'DJ Skyline',
    city_base: 'São Paulo - SP',
    bio_text: 'Grooves dinâmicos e basslines pulsantes com foco em pistas conceituais e festivais. Residente em clubes de destaque no sudeste do Brasil.',
    genres: ['Tech House', 'House', 'Progressive'],
    fee_range_min: 3500,
    fee_range_max: 8000,
    audio_links: {
      soundcloud_url: 'https://soundcloud.com/djskyline/club-peak-session',
      spotify_url: 'https://open.spotify.com/artist/djskyline',
    },
    technical_rider: {
      cdjs: '2x Pioneer CDJ-3000',
      mixer: 'Pioneer DJM-A9 ou DJM-900NXS2',
      monitors: 2,
      notes: 'Somente cabos de áudio balanceados',
    },
    live_photos_urls: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600'
    ],
    is_open_to_bookings: true,
    created_at: new Date('2026-01-12T12:00:00Z').toISOString(),
  }
];

const SEED_BOOKINGS: BookingModel[] = [
  {
    id: 'book-101',
    dj_id: 'dj-luna-001',
    contractor_name: 'Solaris Beach Club',
    contractor_contact: '+55 11 98877-6655',
    event_name: 'Sunset Melodic Opening',
    event_date: '2026-10-18',
    event_duration_hours: 3,
    location_city: 'Guarujá - SP',
    offered_budget: 4500,
    sound_reference_url: 'https://soundcloud.com/lunamartins/sunset-melodic-live',
    notes: 'Buscamos sonoridade melódica para o pôr do sol no deck principal.',
    status: 'pendente',
    created_at: '2026-09-02T14:20:00Z',
  },
  {
    id: 'book-102',
    dj_id: 'dj-luna-001',
    contractor_name: 'Festival Pulsar',
    contractor_contact: '+55 11 97766-5544',
    event_name: 'Palco Horizonte • Noite de Abertura',
    event_date: '2026-10-24',
    event_duration_hours: 2,
    location_city: 'Campos do Jordão - SP',
    offered_budget: 6000,
    sound_reference_url: 'https://soundcloud.com/lunamartins/sunset-melodic-live',
    notes: 'Abertura do festival após live act internacional.',
    status: 'em_negociacao',
    counter_offer_budget: 6500,
    created_at: '2026-09-08T16:00:00Z',
  },
  {
    id: 'book-103',
    dj_id: 'dj-luna-001',
    contractor_name: 'Club D-Edge Showcase',
    contractor_contact: '+55 11 96655-4433',
    event_name: 'Quinta Techno Special Guest',
    event_date: '2026-09-12',
    event_duration_hours: 3,
    location_city: 'São Paulo - SP',
    offered_budget: 5000,
    sound_reference_url: 'https://soundcloud.com/lunamartins/sunset-melodic-live',
    notes: 'Confirmado com rider Pioneer CDJ-3000.',
    status: 'aprovada',
    created_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'book-104',
    dj_id: 'dj-luna-001',
    contractor_name: 'Private Rooftop Jardins',
    contractor_contact: '+55 11 95544-3322',
    event_name: 'Exclusive Sunset Lounge',
    event_date: '2026-09-20',
    event_duration_hours: 4,
    location_city: 'São Paulo - SP',
    offered_budget: 5500,
    sound_reference_url: 'https://soundcloud.com/lunamartins/sunset-melodic-live',
    notes: 'Sinal de 50% pago via PIX Escrow.',
    status: 'aprovada',
    created_at: '2026-09-10T11:30:00Z',
  }
];

const SEED_TRANSACTIONS: TransactionModel[] = [
  {
    id: 'tx-103',
    booking_id: 'book-103',
    amount_total: 5000,
    deposit_amount: 2500,
    payment_status: 'pago',
    payment_gateway_id: 'bf_gw_998123',
    contract_pdf_url: 'https://beatflow.art/contratos/contrato_book-103.pdf',
    paid_at: '2026-09-03T11:00:00Z',
    created_at: '2026-09-02T10:00:00Z',
  },
  {
    id: 'tx-104',
    booking_id: 'book-104',
    amount_total: 5500,
    deposit_amount: 2750,
    payment_status: 'pago',
    payment_gateway_id: 'bf_gw_998124',
    contract_pdf_url: 'https://beatflow.art/contratos/contrato_book-104.pdf',
    paid_at: '2026-09-11T12:00:00Z',
    created_at: '2026-09-10T11:30:00Z',
  }
];

const SEED_SCHEDULE_LOCKS: ScheduleLockModel[] = [
  {
    id: 'lock-103',
    dj_id: 'dj-luna-001',
    booking_id: 'book-103',
    locked_date: '2026-09-12',
    event_title: 'Quinta Techno Special Guest',
    is_auto_locked: true,
    created_at: '2026-09-02T10:00:00Z',
  },
  {
    id: 'lock-104',
    dj_id: 'dj-luna-001',
    booking_id: 'book-104',
    locked_date: '2026-09-20',
    event_title: 'Exclusive Sunset Lounge',
    is_auto_locked: true,
    created_at: '2026-09-10T11:30:00Z',
  }
];

class DatabaseService {
  // Helpers to read/write from localStorage
  private getStorage<T>(key: string, seed: T): T {
    if (typeof window === 'undefined') return seed;
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(seed));
        return seed;
      }
      return JSON.parse(data) as T;
    } catch {
      return seed;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('Storage write error:', err);
    }
  }

  // ==========================================
  // 1. DJ PROFILES (Press Kit, Rider, Slugs)
  // ==========================================
  public getProfiles(): DjProfileModel[] {
    return this.getStorage<DjProfileModel[]>(STORAGE_PROFILES, SEED_PROFILES);
  }

  public getProfileBySlug(slug: string): DjProfileModel | null {
    const profiles = this.getProfiles();
    return profiles.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  public getProfileById(id: string): DjProfileModel | null {
    const profiles = this.getProfiles();
    return profiles.find((p) => p.id === id) || null;
  }

  public updateProfile(id: string, updates: Partial<DjProfileModel>): DjProfileModel | null {
    const profiles = this.getProfiles();
    const idx = profiles.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    const updated = { ...profiles[idx], ...updates };
    profiles[idx] = updated;
    this.setStorage(STORAGE_PROFILES, profiles);
    return updated;
  }

  // ==========================================
  // 2. BOOKINGS & CENTRAL DE PROPOSTAS
  // MÁQUINA DE ESTADOS:
  // pendente -> em_negociacao | aguardando_pagamento | recusada
  // aguardando_pagamento -> aprovada (pós sinal 50%)
  // ==========================================
  public getBookings(djId?: string): BookingModel[] {
    const list = this.getStorage<BookingModel[]>(STORAGE_BOOKINGS, SEED_BOOKINGS);
    if (djId) {
      return list.filter((b) => b.dj_id === djId);
    }
    return list;
  }

  public createBooking(data: Omit<BookingModel, 'id' | 'created_at' | 'status'>): BookingModel {
    const bookings = this.getBookings();
    
    // Check if the requested date is already locked (Anti-double booking)
    const isLocked = this.isDateLocked(data.dj_id, data.event_date);
    if (isLocked) {
      throw new Error(`A data ${data.event_date} já está bloqueada para este artista.`);
    }

    const newBooking: BookingModel = {
      ...data,
      id: `book-${Date.now().toString().slice(-6)}`,
      status: 'pendente',
      created_at: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    this.setStorage(STORAGE_BOOKINGS, bookings);
    return newBooking;
  }

  // State Machine Transition: Aceitar Proposta
  // Gera transação com 50% de sinal e bloqueia automaticamente a data na agenda
  public acceptProposal(bookingId: string): { booking: BookingModel; transaction: TransactionModel } {
    const bookings = this.getBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) throw new Error('Proposta não encontrada');

    const booking = bookings[idx];
    booking.status = 'aguardando_pagamento';
    bookings[idx] = booking;
    this.setStorage(STORAGE_BOOKINGS, bookings);

    // 1. Gera registro de transação com 50% de sinal
    const totalAmount = booking.counter_offer_budget || booking.offered_budget;
    const depositAmount = Math.round(totalAmount * 0.5);

    const transaction = this.createOrUpdateTransaction({
      booking_id: booking.id,
      amount_total: totalAmount,
      deposit_amount: depositAmount,
      payment_status: 'aguardando',
      payment_gateway_id: `bf_gw_${Date.now().toString().slice(-6)}`,
      contract_pdf_url: `https://beatflow.art/contratos/contrato_${booking.id}.pdf`,
    });

    // 2. Trava de segurança: Bloqueio automático de data na agenda para evitar double booking
    this.lockDate({
      dj_id: booking.dj_id,
      booking_id: booking.id,
      locked_date: booking.event_date,
      event_title: booking.event_name,
      is_auto_locked: true,
    });

    return { booking, transaction };
  }

  // State Machine Transition: Contraproposta
  public submitCounterOffer(bookingId: string, counterBudget: number, notes?: string): BookingModel {
    const bookings = this.getBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) throw new Error('Proposta não encontrada');

    const booking = bookings[idx];
    booking.status = 'em_negociacao';
    booking.counter_offer_budget = counterBudget;
    if (notes) {
      booking.notes = (booking.notes ? `${booking.notes} | ` : '') + `Contraproposta: R$ ${counterBudget} (${notes})`;
    }
    bookings[idx] = booking;
    this.setStorage(STORAGE_BOOKINGS, bookings);
    return booking;
  }

  // State Machine Transition: Recusar Proposta
  public declineProposal(bookingId: string): BookingModel {
    const bookings = this.getBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) throw new Error('Proposta não encontrada');

    const booking = bookings[idx];
    booking.status = 'recusada';
    bookings[idx] = booking;
    this.setStorage(STORAGE_BOOKINGS, bookings);

    // Remove eventual bloqueio de agenda
    this.unlockDateByBookingId(bookingId);

    return booking;
  }

  // ==========================================
  // 3. TRANSAÇÕES E CONTRATOS (50% SINAL & GATEWAYS)
  // ==========================================
  public getTransactions(): TransactionModel[] {
    return this.getStorage<TransactionModel[]>(STORAGE_TRANSACTIONS, SEED_TRANSACTIONS);
  }

  public getTransactionByBookingId(bookingId: string): TransactionModel | null {
    const list = this.getTransactions();
    return list.find((t) => t.booking_id === bookingId) || null;
  }

  public createOrUpdateTransaction(data: Omit<TransactionModel, 'id' | 'created_at'>): TransactionModel {
    const list = this.getTransactions();
    const existingIdx = list.findIndex((t) => t.booking_id === data.booking_id);

    if (existingIdx !== -1) {
      const updated: TransactionModel = {
        ...list[existingIdx],
        ...data,
      };
      list[existingIdx] = updated;
      this.setStorage(STORAGE_TRANSACTIONS, list);
      return updated;
    }

    const newTx: TransactionModel = {
      ...data,
      id: `tx-${Date.now().toString().slice(-6)}`,
      created_at: new Date().toISOString(),
    };
    list.unshift(newTx);
    this.setStorage(STORAGE_TRANSACTIONS, list);
    return newTx;
  }

  // Simulação de Webhook do Gateway (Stripe / Mercado Pago)
  // Ao ser chamado com sucesso, marca a transação como 'pago' e a proposta como 'aprovada'
  public processPaymentWebhook(bookingId: string): { transaction: TransactionModel; booking: BookingModel } {
    const tx = this.getTransactionByBookingId(bookingId);
    if (!tx) throw new Error('Transação não encontrada');

    tx.payment_status = 'pago';
    tx.paid_at = new Date().toISOString();
    this.createOrUpdateTransaction(tx);

    // Atualiza status da proposta para 'aprovada'
    const bookings = this.getBookings();
    const bIdx = bookings.findIndex((b) => b.id === bookingId);
    if (bIdx !== -1) {
      bookings[bIdx].status = 'aprovada';
      this.setStorage(STORAGE_BOOKINGS, bookings);
    }

    return { transaction: tx, booking: bookings[bIdx] };
  }

  // ==========================================
  // 4. AGENDA & BLOQUEIO DE DATAS (ANTI-DOUBLE BOOKING)
  // ==========================================
  public getScheduleLocks(djId?: string): ScheduleLockModel[] {
    const list = this.getStorage<ScheduleLockModel[]>(STORAGE_LOCKS, SEED_SCHEDULE_LOCKS);
    if (djId) {
      return list.filter((l) => l.dj_id === djId);
    }
    return list;
  }

  public isDateLocked(djId: string, dateString: string): boolean {
    const locks = this.getScheduleLocks(djId);
    // Standardize comparison to YYYY-MM-DD
    const targetDate = dateString.slice(0, 10);
    return locks.some((l) => l.locked_date.slice(0, 10) === targetDate);
  }

  public lockDate(data: Omit<ScheduleLockModel, 'id' | 'created_at'>): ScheduleLockModel {
    const locks = this.getScheduleLocks();
    
    // Check if already locked
    const existing = locks.find(
      (l) => l.dj_id === data.dj_id && l.locked_date.slice(0, 10) === data.locked_date.slice(0, 10)
    );
    if (existing) {
      return existing;
    }

    const newLock: ScheduleLockModel = {
      ...data,
      id: `lock-${Date.now().toString().slice(-6)}`,
      created_at: new Date().toISOString(),
    };
    locks.push(newLock);
    this.setStorage(STORAGE_LOCKS, locks);
    return newLock;
  }

  public unlockDate(lockId: string): void {
    const locks = this.getScheduleLocks();
    const filtered = locks.filter((l) => l.id !== lockId);
    this.setStorage(STORAGE_LOCKS, filtered);
  }

  public unlockDateByBookingId(bookingId: string): void {
    const locks = this.getScheduleLocks();
    const filtered = locks.filter((l) => l.booking_id !== bookingId);
    this.setStorage(STORAGE_LOCKS, filtered);
  }
}

export const databaseService = new DatabaseService();
