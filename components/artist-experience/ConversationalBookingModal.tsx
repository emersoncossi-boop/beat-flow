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
  Lock 
} from 'lucide-react';
import { databaseService } from '@/lib/database-service';
import { AtmosphereConfig } from '@/lib/artist-universe';

interface ConversationalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  djName: string;
  djSlug: string;
  djId?: string;
  minFee?: number;
  atmosphere: AtmosphereConfig;
}

export const ConversationalBookingModal: React.FC<ConversationalBookingModalProps> = ({
  isOpen,
  onClose,
  djName,
  djSlug,
  djId = 'dj-luna-001',
  minFee = 3500,
  atmosphere,
}) => {
  const [step, setStep] = useState(1);
  const [contractorName, setContractorName] = useState('');
  const [contractorContact, setContractorContact] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventDuration, setEventDuration] = useState('3');
  const [offeredFee, setOfferedFee] = useState(minFee ? minFee.toString() : '4000');
  const [musicReference, setMusicReference] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const budgetNum = parseFloat(offeredFee) || minFee || 0;
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
        event_name: eventName || `Show com ${djName}`,
        event_date: eventDate || new Date().toISOString().split('T')[0],
        event_duration_hours: parseInt(eventDuration) || 3,
        location_city: eventCity || 'São Paulo - SP',
        offered_budget: budgetNum,
        sound_reference_url: musicReference || 'https://soundcloud.com/curated-track',
        notes: notes ? `[Atmosfera Solicitada: ${atmosphere.name}] ${notes}` : `[Atmosfera Solicitada: ${atmosphere.name}]`,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden text-white"
        style={{
          background: 'linear-gradient(145deg, rgba(15, 17, 26, 0.98) 0%, rgba(9, 11, 18, 0.99) 100%)',
        }}
      >
        {/* Glow Accent Header */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: `linear-gradient(90deg, ${atmosphere.lighting.primaryGlow}, ${atmosphere.lighting.secondaryGlow})`,
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div 
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center border"
              style={{
                borderColor: `${atmosphere.lighting.primaryGlow}60`,
                backgroundColor: `${atmosphere.lighting.primaryGlow}20`,
              }}
            >
              <CheckCircle2 className="w-8 h-8" style={{ color: atmosphere.lighting.primaryGlow }} />
            </div>

            <h3 className="text-2xl font-black tracking-tight">
              Proposta Enviada com Sucesso!
            </h3>

            <p className="text-sm text-white/70 leading-relaxed max-w-md mx-auto">
              A produção de <strong className="text-white">{djName}</strong> foi notificada e avaliará sua data para <strong>{eventCity || 'o local'}</strong>. O sinal de custódia (50%) só será acionado após a confirmação direta.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/50">Cachê Proposto:</span>
                <span className="font-bold text-white">R$ {budgetNum.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Sinal em Custódia (Escrow 50%):</span>
                <span className="font-bold text-emerald-400">R$ {depositNum.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Atmosfera de Palco:</span>
                <span className="font-bold text-sky-400">{atmosphere.name}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-white/90 transition shadow-lg"
            >
              Fechar e Voltar ao Perfil
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-1" style={{ color: atmosphere.lighting.primaryGlow }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contratação Direta · Beat Flow Escrow</span>
              </div>
              <h2 className="text-2xl font-black">
                Contratar {djName}
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Etapa {step} de 3 · Configuração de Data, Formato de Palco e Cachê
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200">
                {errorMessage}
              </div>
            )}

            {/* STEP 1: EVENT DETAILS */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Nome do Evento / Club / Festival
                  </label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Ex: Sunset Rooftop Sessions ou Main Stage Festival"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-white/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                      Data Pretendida
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-white/40 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                      Cidade / Estado
                    </label>
                    <input
                      type="text"
                      value={eventCity}
                      onChange={(e) => setEventCity(e.target.value)}
                      placeholder="Ex: São Paulo - SP"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-white/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Duração do Set
                  </label>
                  <select
                    value={eventDuration}
                    onChange={(e) => setEventDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-white/40 focus:outline-none"
                  >
                    <option value="2" className="bg-[#121622]">2 Horas (Peak Time / Abertura)</option>
                    <option value="3" className="bg-[#121622]">3 Horas (Formato Standard)</option>
                    <option value="4" className="bg-[#121622]">4 Horas (Extended Set)</option>
                    <option value="6" className="bg-[#121622]">6+ Horas (All Night Long)</option>
                  </select>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-white text-black hover:bg-white/90 transition flex items-center gap-2 shadow-lg"
                  >
                    <span>Próximo: Cachê & Escrow</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: FEE & ESCROW */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Proposta de Cachê Líquido (R$)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-sm text-white/50 font-bold">R$</span>
                    <input
                      type="number"
                      value={offeredFee}
                      onChange={(e) => setOfferedFee(e.target.value)}
                      min={minFee}
                      step="500"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-lg font-bold focus:border-white/40 focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-white/40 mt-1">
                    Cachê base de referência do artista: a partir de R$ {minFee.toLocaleString('pt-BR')}
                  </p>
                </div>

                {/* Escrow Breakdown Box */}
                <div 
                  className="p-4 rounded-2xl border space-y-2.5"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderColor: `${atmosphere.lighting.primaryGlow}30`,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold" style={{ color: atmosphere.lighting.primaryGlow }}>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Garantia de Custódia Beat Flow (50% Escrow)</span>
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed">
                    Você deposita <strong>R$ {depositNum.toLocaleString('pt-BR')}</strong> apenas após o aceite da artista. O valor fica retido com segurança e só é liberado para o artista no dia da apresentação.
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Referência Sonora (SoundCloud / Spotify)
                  </label>
                  <input
                    type="url"
                    value={musicReference}
                    onChange={(e) => setMusicReference(e.target.value)}
                    placeholder="https://soundcloud.com/... ou link de set"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-white/40 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white/70 hover:text-white flex items-center gap-1.5 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-white text-black hover:bg-white/90 transition flex items-center gap-2 shadow-lg"
                  >
                    <span>Próximo: Dados de Contato</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & SUBMISSION */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Seu Nome Completo ou Razão Social
                  </label>
                  <input
                    type="text"
                    required
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo (Diretor Artístico)"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-white/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    WhatsApp ou E-mail para Retorno
                  </label>
                  <input
                    type="text"
                    required
                    value={contractorContact}
                    onChange={(e) => setContractorContact(e.target.value)}
                    placeholder="+55 11 99999-8888 ou producao@club.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-white/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Observações / Rider Especial (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Horário previsto da cabine, estrutura de som do local..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:border-white/40 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white/70 hover:text-white flex items-center gap-1.5 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-400 text-black hover:opacity-95 transition flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Proposta com Escrow'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
