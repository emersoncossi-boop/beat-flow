'use client';

import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Lock,
  Send,
  FileText
} from 'lucide-react';
import { databaseService } from '@/lib/database-service';
import { AtmosphereConfig, ArtistProfileData } from '@/lib/artist-universe';

interface ConversationalBookingModalProps {
  isOpen?: boolean;
  onClose: () => void;
  profile?: ArtistProfileData;
  djName?: string;
  djSlug?: string;
  djId?: string;
  minFee?: number;
  atmosphere?: AtmosphereConfig;
}

export const ConversationalBookingModal: React.FC<ConversationalBookingModalProps> = ({
  isOpen = true,
  onClose,
  profile,
  djName,
  djSlug,
  djId = 'dj-001',
  minFee = 3500,
  atmosphere,
}) => {
  const activeName = profile?.name || djName || 'Artista';
  const activeSlug = profile?.slug || djSlug || 'artista';
  const activeMinFee = profile ? parseInt(profile.baseFee.replace(/\D/g, '')) || 3500 : minFee;

  const [step, setStep] = useState(1);
  const [contractorName, setContractorName] = useState('');
  const [contractorContact, setContractorContact] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventDuration, setEventDuration] = useState('2');
  const [offeredFee, setOfferedFee] = useState(activeMinFee.toString());
  const [musicReference, setMusicReference] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const budgetNum = parseFloat(offeredFee) || activeMinFee || 0;
  const depositNum = Math.round(budgetNum * 0.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      databaseService.createBooking({
        dj_id: djId,
        contractor_name: contractorName || 'Produtor / Contratante',
        contractor_contact: contractorContact || 'contato@evento.com',
        event_name: eventName || `Show com ${activeName}`,
        event_date: eventDate || new Date().toISOString().split('T')[0],
        event_duration_hours: parseInt(eventDuration) || 2,
        location_city: eventCity || 'SÃ£o Paulo - SP',
        offered_budget: budgetNum,
        sound_reference_url: musicReference || 'https://soundcloud.com',
        notes: notes || 'Proposta submetida via Palco Digital Beat Flow.',
      });

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Erro ao submeter proposta. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `OlÃ¡ ${activeName}! Gostaria de consultar disponibilidade para o evento *${eventName || 'Evento'}* em *${eventCity || 'Minha Cidade'}* no dia *${eventDate || 'Data a Definir'}*. OrÃ§amento estimado: *R$ ${budgetNum.toLocaleString('pt-BR')}*. Enviado via Beat Flow.`
    );
    window.open(`https://wa.me/5511999999999?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden text-white bg-[#0A0D14]"
      >
        {/* Glow Header */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-purple-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Proposta Enviada com Sucesso!</h3>
              <p className="text-sm text-white/60 max-w-md mx-auto">
                {activeName} e o Booker receberam os dados do evento. O sinal de 50% (R$ {depositNum.toLocaleString('pt-BR')}) serÃ¡ solicitado apÃ³s a confirmaÃ§Ã£o de data.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white/70 space-y-1 text-left max-w-sm mx-auto">
              <div><strong className="text-white">Evento:</strong> {eventName || 'Show'}</div>
              <div><strong className="text-white">Data:</strong> {eventDate || 'A definir'}</div>
              <div><strong className="text-white">Cidade:</strong> {eventCity || 'SÃ£o Paulo'}</div>
              <div><strong className="text-white">CachÃª Proposto:</strong> R$ {budgetNum.toLocaleString('pt-BR')}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={handleWhatsAppDirect}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Abrir WhatsApp do Booker</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                Etapa {step} de 3 Â· Booking Oficial
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Contratar {activeName}
              </h2>
              <p className="text-xs text-white/50">
                Preencha os detalhes do evento para gerar a estimativa de proposta formal.
              </p>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/70">Nome do Contratante / AgÃªncia</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Club Warung / AgÃªncia Level"
                      value={contractorName}
                      onChange={(e) => setContractorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/70">WhatsApp / E-mail de Contato</label>
                    <input
                      type="text"
                      required
                      placeholder="(11) 99999-9999 ou produtor@evento.com"
                      value={contractorContact}
                      onChange={(e) => setContractorContact(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/70">Nome do Evento / Festa</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Sunset Sessions"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/70">Data do Show</label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/70">Cidade / Estado</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: SÃ£o Paulo - SP"
                        value={eventCity}
                        onChange={(e) => setEventCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/70">DuraÃ§Ã£o do Set (Horas)</label>
                      <select
                        value={eventDuration}
                        onChange={(e) => setEventDuration(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
                      >
                        <option value="1.5">1h30 Set</option>
                        <option value="2">2h00 Extended</option>
                        <option value="3">3h00 Long Set</option>
                        <option value="4">4h00 All Night Long</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/70">Proposta de CachÃª (R$)</label>
                    <input
                      type="number"
                      required
                      min={activeMinFee}
                      step="100"
                      value={offeredFee}
                      onChange={(e) => setOfferedFee(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white font-mono outline-none"
                    />
                    <div className="flex items-center justify-between text-[11px] text-white/50 pt-1">
                      <span>CachÃª base mÃ­nimo: R$ {activeMinFee.toLocaleString('pt-BR')}</span>
                      <span className="text-emerald-400 font-bold">Sinal 50%: R$ {depositNum.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/70">ObservaÃ§Ãµes de LogÃ­stica ou Rider</label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Temos CDJ-3000 disponÃ­vel na cabine e translado do aeroporto incluso."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && (!contractorName || !contractorContact)) return;
                      setStep(step + 1);
                    }}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90"
                  >
                    <span>PrÃ³ximo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-7 py-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs shadow-lg shadow-emerald-400/20 active:scale-95"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Proposta Formal'}
                  </button>
                )}
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};