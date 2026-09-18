'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Music, 
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { getArtistProfile } from '@/lib/artist-universe';
import { databaseService } from '@/lib/database-service';

export default function QuickBookPage() {
  const router = useRouter();
  const params = useParams();
  const slug = (params?.slug as string) || 'camila';

  const artist = getArtistProfile(slug);
  const theme = artist.theme;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  // Form states
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [locationCity, setLocationCity] = useState(artist.baseCity);
  const [durationHours, setDurationHours] = useState(2);
  const [offeredBudget, setOfferedBudget] = useState('4500');
  const [contractorName, setContractorName] = useState('');
  const [contractorContact, setContractorContact] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      const budgetNum = parseFloat(offeredBudget) || 4500;
      const newBooking = databaseService.createBooking({
        dj_id: artist.id,
        contractor_name: contractorName.trim() || 'Produtor / Contratante',
        contractor_contact: contractorContact.trim() || '+55 11 99999-8888',
        event_name: eventName.trim() || `Apresentação @ ${locationCity}`,
        event_date: eventDate,
        event_duration_hours: durationHours,
        location_city: locationCity.trim() || artist.baseCity,
        offered_budget: budgetNum,
        sound_reference_url: artist.socials.soundcloud || 'https://soundcloud.com/beatflow',
        notes: notes || 'Solicitação via página de booking direto.'
      });

      setCreatedBookingId(newBooking.id);
      setIsSubmitting(false);
      setStep(3);
    } catch {
      setIsSubmitting(false);
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <div 
        className="min-h-[100svh] flex items-center justify-center p-4 font-sans text-white"
        style={{ backgroundColor: theme.backgroundBase }}
      >
        <div 
          className="w-full max-w-lg rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative border"
          style={{
            backgroundColor: theme.backgroundElevated,
            borderColor: theme.borderColor,
            boxShadow: theme.glowEffect
          }}
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border shadow-lg"
            style={{ 
              backgroundColor: 'rgba(25, 211, 162, 0.12)', 
              borderColor: 'rgba(25, 211, 162, 0.4)',
              color: '#19D3A2'
            }}
          >
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span 
            className="text-[11px] font-mono font-bold tracking-widest uppercase mb-1.5 inline-block"
            style={{ color: theme.secondaryColor }}
          >
            PROPOSTA ENVIADA COM SUCESSO
          </span>

          <h2 className="text-3xl font-black text-white tracking-tight mb-3">
            Briefing Enviado para {artist.artisticName}
          </h2>

          <p className="text-sm text-white/70 mb-6 leading-relaxed">
            Sua solicitação de data para <strong>{eventName || 'o evento'}</strong> em <strong>{locationCity}</strong> foi registrada no sistema. O artista tem até 24h para responder.
          </p>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 flex items-center justify-between text-left">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block">Protocolo</span>
              <span className="text-xs font-mono font-bold text-white">#{createdBookingId || 'BF-BOOK-LIVE'}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-white/40 uppercase block">Sinal em Custódia (50%)</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                R$ {((parseFloat(offeredBudget) || 4500) * 0.5).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          <Link
            href={`/${slug}`}
            className="w-full h-12 rounded-xl text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-transform active:scale-[0.98] cursor-pointer shadow-lg"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Voltar para o Palco de {artist.artisticName}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-[100svh] flex flex-col items-center justify-center p-4 md:p-6 relative font-sans text-white"
      style={{ backgroundColor: theme.backgroundBase }}
    >
      <div 
        className="w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col border"
        style={{
          backgroundColor: theme.backgroundElevated,
          borderColor: theme.borderColor,
          boxShadow: theme.glowEffect
        }}
      >
        {/* Close Button */}
        <Link 
          href={`/${slug}`}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer z-20"
          aria-label="Voltar para a página do artista"
        >
          <X className="w-5 h-5" />
        </Link>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/10">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-white/20">
                  <Image 
                    src={artist.heroImage}
                    alt={artist.artisticName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-black text-white tracking-tight">{artist.artisticName}</h1>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    {artist.genres.slice(0, 2).join(' · ')}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-white/50">
                <span>ETAPA {step} DE 2</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              {step === 1 ? 'Dados do Evento' : 'Cachê & Contato Oficial'}
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              {step === 1 
                ? 'Informe o nome do evento, local e data para reserva de agenda.' 
                : 'Defina a proposta financeira de contratação com garantia de resposta em 24h.'}
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label htmlFor="book-event-name" className="text-xs font-medium text-white/80 block mb-1.5">
                    Nome do Evento ou Club *
                  </label>
                  <input
                    id="book-event-name"
                    type="text"
                    required
                    placeholder="Ex: Sunset Sessions, Festival Eclipse, Private Party"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="book-event-date" className="text-xs font-medium text-white/80 block mb-1.5">
                      Data do Evento *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="book-event-date"
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="book-location-city" className="text-xs font-medium text-white/80 block mb-1.5">
                      Cidade / Estado *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="book-location-city"
                        type="text"
                        required
                        value={locationCity}
                        onChange={(e) => setLocationCity(e.target.value)}
                        className="w-full h-11 pl-9 pr-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="book-duration-hours" className="text-xs font-medium text-white/80 block mb-1.5">
                    Duração da Apresentação
                  </label>
                  <select
                    id="book-duration-hours"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 transition-all cursor-pointer"
                  >
                    <option value={1.5}>1h 30m (Showcase)</option>
                    <option value={2}>2h 00m (Set Padrão)</option>
                    <option value={3}>3h 00m (Peak Time Extendido)</option>
                    <option value={4}>4h+ (All Night Long / Sunset)</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="book-offered-budget" className="text-xs font-medium text-white/80 block mb-1.5">
                    Proposta de Cachê (R$) *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="book-offered-budget"
                      type="number"
                      required
                      min={1000}
                      step={500}
                      value={offeredBudget}
                      onChange={(e) => setOfferedBudget(e.target.value)}
                      className="w-full h-11 pl-9 pr-3 rounded-xl bg-white/5 border border-white/15 text-sm font-bold text-white focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[11px] text-white/50">
                    <span>Sinal para reserva da data:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      50% = R$ {((parseFloat(offeredBudget) || 0) * 0.5).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="book-contractor-name" className="text-xs font-medium text-white/80 block mb-1.5">
                      Seu Nome / Produtora *
                    </label>
                    <input
                      id="book-contractor-name"
                      type="text"
                      required
                      placeholder="Ex: Rafael Castro"
                      value={contractorName}
                      onChange={(e) => setContractorName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="book-contractor-contact" className="text-xs font-medium text-white/80 block mb-1.5">
                      WhatsApp ou E-mail *
                    </label>
                    <input
                      id="book-contractor-contact"
                      type="text"
                      required
                      placeholder="+55 11 98765-4321"
                      value={contractorContact}
                      onChange={(e) => setContractorContact(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="book-notes" className="text-xs font-medium text-white/80 block mb-1.5">
                    Observações de Produção
                  </label>
                  <textarea
                    id="book-notes"
                    rows={2}
                    placeholder="Ex: Rider CDJ-3000 confirmado; transporte terrestre incluso."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 sm:p-8 border-t border-white/10 flex items-center justify-between gap-3">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-11 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <span className="text-xs text-white/40 font-mono">
                Sem taxas de agência
              </span>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 sm:px-8 rounded-xl text-black font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] flex items-center gap-2 ml-auto cursor-pointer shadow-lg"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Enviando...</span>
                </>
              ) : step === 1 ? (
                <>
                  <span>Próximo Passo</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              ) : (
                <>
                  <span>Enviar Solicitação Oficial</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
