'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  AgendaIcon,
  AdicionarIcon,
  LocalizacaoIcon,
  ExcluirIcon,
  SucessoIcon,
  RelogioIcon,
  EsquerdaIcon,
  FecharIcon,
  SegurancaIcon,
  BloqueadoIcon,
  DataConfirmadaIcon,
  ExternoIcon,
  StatusIndicator
} from '@/components/ui/BeatFlowIcons';
import { Button } from '@/components/ui/button';
import { databaseService, ScheduleLockModel, BookingModel } from '@/lib/database-service';

export default function AgendaPage() {
  const [scheduleLocks, setScheduleLocks] = useState<ScheduleLockModel[]>(() => {
    return typeof window !== 'undefined' ? databaseService.getScheduleLocks('dj-luna-001') : [];
  });
  const [bookings, setBookings] = useState<BookingModel[]>(() => {
    return typeof window !== 'undefined' ? databaseService.getBookings('dj-luna-001') : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'auto' | 'manual'>('all');

  // Form state para novo bloqueio de data manual
  const [eventTitle, setEventTitle] = useState('');
  const [lockDate, setLockDate] = useState('');
  const [notes, setNotes] = useState('');

  const refreshAgenda = () => {
    const locks = databaseService.getScheduleLocks('dj-luna-001');
    const allBookings = databaseService.getBookings('dj-luna-001');
    setScheduleLocks(locks);
    setBookings(allBookings);
  };

  const handleAddLock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !lockDate) return;

    databaseService.lockDate({
      dj_id: 'dj-luna-001',
      locked_date: lockDate,
      event_title: eventTitle,
      is_auto_locked: false,
    });

    refreshAgenda();
    setIsModalOpen(false);
    setEventTitle('');
    setLockDate('');
    setNotes('');
  };

  const handleUnlock = (lockId: string) => {
    databaseService.unlockDate(lockId);
    refreshAgenda();
  };

  const filteredLocks = scheduleLocks.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'auto') return item.is_auto_locked;
    if (filter === 'manual') return !item.is_auto_locked;
    return true;
  });

  const autoCount = scheduleLocks.filter((s) => s.is_auto_locked).length;
  const manualCount = scheduleLocks.filter((s) => !s.is_auto_locked).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-white/50 mb-1">
            <Link href="/dashboard" className="hover:text-white flex items-center gap-1 transition">
              <EsquerdaIcon className="w-3.5 h-3.5" /> Painel
            </Link>
            <span>/</span>
            <span className="text-white">Agenda de Shows</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Agenda de Shows & Datas Reservadas
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Datas confirmadas e compromissos pessoais com proteção automática contra conflito de agenda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] hover:opacity-95 text-white font-bold text-xs h-10 px-4 rounded-xl shadow-[0_0_15px_rgba(138,63,252,0.4)] flex items-center gap-1.5 cursor-pointer"
          >
            <AdicionarIcon className="w-4 h-4" />
            <span>Reservar Data Pessoal</span>
          </Button>
        </div>
      </div>

      {/* Trava Anti-Conflito de Agenda Banner */}
      <div className="p-4 rounded-2xl bg-[#8A3FFC]/10 border border-[#8A3FFC]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
            <SegurancaIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              <span>Proteção Contra Conflito de Agenda Ativada</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PROTEÇÃO AUTOMÁTICA
              </span>
            </h3>
            <p className="text-white/70 leading-relaxed text-[11px] mt-0.5">
              Sempre que você confirma uma proposta, a data é automaticamente reservada na sua agenda. Se outro contratante tentar solicitar a mesma data no seu Press Kit, o Beat Flow informará com elegância que você já está ocupado.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/dashboard/propostas">
            <Button size="sm" variant="outline" className="bg-white/5 border-white/15 text-white text-xs h-9 rounded-xl cursor-pointer">
              Gestão de Contratos
            </Button>
          </Link>
        </div>
      </div>

      {/* Filtros e Contadores */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setFilter('all')}
            className={`whitespace-nowrap shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer ${
              filter === 'all'
                ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Todas ({scheduleLocks.length})
          </button>
          <button
            onClick={() => setFilter('auto')}
            className={`whitespace-nowrap shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              filter === 'auto'
                ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span>Shows Confirmados</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
              {autoCount}
            </span>
          </button>
          <button
            onClick={() => setFilter('manual')}
            className={`whitespace-nowrap shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              filter === 'manual'
                ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span>Compromissos Pessoais</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300">
              {manualCount}
            </span>
          </button>
        </div>
      </div>

      {/* Lista de Bloqueios */}
      <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
        {filteredLocks.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#120F24]/50 border border-white/10 space-y-3 w-full">
            <DataConfirmadaIcon className="w-10 h-10 text-white/30 mx-auto" />
            <p className="text-sm text-white/70">Nenhuma data bloqueada nesta categoria.</p>
          </div>
        ) : (
          filteredLocks.map((lock) => {
            const linkedBooking = bookings.find((b) => b.id === lock.booking_id);
            const formattedDate = new Date(lock.locked_date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            });

            return (
              <div
                key={lock.id}
                className="w-[85vw] lg:w-full min-w-[85vw] lg:min-w-0 snap-center shrink-0 p-5 rounded-3xl bg-[#120F24]/90 border border-white/10 hover:border-white/20 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0">
                    <AgendaIcon className="w-4 h-4 text-[#00D1FF] mb-0.5" />
                    <span className="text-xs font-bold text-white leading-none font-mono">
                      {lock.locked_date.slice(8, 10)}/{lock.locked_date.slice(5, 7)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-white">{lock.event_title}</h3>
                      {lock.is_auto_locked ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <SucessoIcon className="w-3 h-3" /> Show Confirmado (Proposta Aceita)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Data Reservada pelo DJ
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-white/60">
                      Data reservada na agenda: <strong className="text-white">{formattedDate}</strong>
                    </p>

                    {linkedBooking && (
                      <div className="text-[11px] text-[#00D1FF] flex items-center gap-2 pt-1">
                        <span>Contratante: {linkedBooking.contractor_name}</span>
                        <span>•</span>
                        <span>Cachê: R$ {linkedBooking.offered_budget.toLocaleString('pt-BR')}</span>
                        <Link href="/dashboard/propostas" className="hover:underline flex items-center gap-0.5">
                          <span>Ver Contrato</span>
                          <ExternoIcon className="w-2.5 h-2.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {!lock.is_auto_locked && (
                    <Button
                      onClick={() => handleUnlock(lock.id)}
                      variant="outline"
                      className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400 text-xs h-9 px-3 rounded-xl cursor-pointer"
                    >
                      <ExcluirIcon className="w-3.5 h-3.5 mr-1" />
                      Liberar Data
                    </Button>
                  )}
                  {lock.is_auto_locked && (
                    <span className="text-xs text-emerald-400 font-medium">
                      CONTRATO CONFIRMADO
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: RESERVAR DATA PESSOAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E0C1B] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <FecharIcon className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Reservar Data na Agenda</h3>
              <p className="text-xs text-white/60">
                Reserve uma data para férias, turnês ou compromissos pessoais. O Press Kit mostrará esta data como indisponível para novos contratantes.
              </p>
            </div>

            <form onSubmit={handleAddLock} className="space-y-4 text-xs">
              <div>
                <label htmlFor="agenda-lock-title" className="block text-white/80 font-medium mb-1.5 cursor-pointer">
                  Título / Motivo da Reserva *
                </label>
                <input
                  id="agenda-lock-title"
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Ex: Turnê Internacional / Férias / Gravação em Estúdio"
                  aria-label="Título ou motivo do bloqueio de agenda"
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#120F24] focus:border-[#8A3FFC] transition-all"
                />
              </div>

              <div>
                <label htmlFor="agenda-lock-date" className="block text-white/80 font-medium mb-1.5 cursor-pointer">
                  Data a ser Reservada *
                </label>
                <input
                  id="agenda-lock-date"
                  type="date"
                  required
                  value={lockDate}
                  onChange={(e) => setLockDate(e.target.value)}
                  aria-label="Data a ser bloqueada ou reservada na agenda"
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#120F24] focus:border-[#8A3FFC] transition-all [color-scheme:dark]"
                />
              </div>

              <div>
                <label htmlFor="agenda-lock-notes" className="block text-white/80 font-medium mb-1.5 cursor-pointer">
                  Observações (Opcional)
                </label>
                <textarea
                  id="agenda-lock-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notas internas do artista..."
                  aria-label="Notas e detalhes adicionais sobre o bloqueio"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#120F24] focus:border-[#8A3FFC] transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white/5 border-white/10 text-white text-xs h-11 rounded-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white text-xs font-bold h-11 rounded-xl shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                >
                  Confirmar Reserva
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
