'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  X, 
  Send, 
  Sparkles, 
  Check, 
  Calendar, 
  MapPin, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  CheckCheck, 
  Briefcase, 
  ArrowRight,
  Disc3,
  PartyPopper,
  Building2,
  Flame,
  Radio,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { saveBookingToFirestore, sendPrivateMessageToFirestore } from '@/lib/firestore-service';

interface BookingFlowProps {
  djName?: string;
  djAvatar?: string;
  initialOpen?: boolean;
  defaultStep?: 'chat' | 'review' | 'success' | 'private_room';
  initialDate?: string;
  triggerButton?: React.ReactNode;
}

type FlowStep = 'chat' | 'review' | 'success' | 'private_room';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  isCustomProposal?: boolean;
  proposalData?: {
    value: string;
    description: string;
  };
}

export function BookingFlow({
  djName = "Luna Martins",
  djAvatar = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop",
  initialOpen = false,
  defaultStep = 'chat',
  initialDate,
  triggerButton,
}: BookingFlowProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [step, setStep] = useState<FlowStep>(defaultStep);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState<string>(() => `book_${Date.now()}`);

  // Form conversation state
  const [questionIndex, setQuestionIndex] = useState(0);
  const [eventType, setEventType] = useState('Festa privada');
  const [eventDate, setEventDate] = useState(initialDate || '24 de maio de 2026');
  const [eventLocation, setEventLocation] = useState('São Paulo, SP');
  const [budgetRange, setBudgetRange] = useState('R$ 2.000 - 3.000');
  const [notes, setNotes] = useState(
    'Gostaria de um set de 3 horas. Somos um grupo de 120 pessoas. Tema da festa: aniversário. Se possível, trazer equipamento próprio de som.'
  );

  // Private room state
  const [inputMessage, setInputMessage] = useState('');
  const [privateRoomMessages, setPrivateRoomMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Oi! Obrigada pelo seu interesse! Adorei a proposta. Vamos conversar sobre alguns detalhes?',
      time: '14:28',
    },
    {
      id: 'm-2',
      sender: 'user',
      text: 'Oi, Luna! Que bom! Podemos ajustar o horário e falar sobre o rider?',
      time: '14:29',
    },
    {
      id: 'm-3',
      sender: 'bot',
      text: 'Claro! Vou te enviar uma proposta personalizada. 🎧',
      time: '14:30',
    },
    {
      id: 'm-4',
      sender: 'bot',
      text: 'Proposta personalizada pronta:',
      time: '14:30',
      isCustomProposal: true,
      proposalData: {
        value: 'R$ 2.800',
        description: 'Set de 3 horas • Inclui equipamento de som e iluminação',
      },
    },
    {
      id: 'm-5',
      sender: 'user',
      text: 'Perfeito! Vamos fechar! 😍',
      time: '14:31',
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'intro-1',
      sender: 'bot',
      text: 'Olá! 👋',
      time: '14:21',
    },
    {
      id: 'intro-2',
      sender: 'bot',
      text: 'Que legal ter você por aqui! Vou te fazer algumas perguntas rapidinhas para entender melhor seu evento, pode ser?',
      time: '14:21',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, privateRoomMessages, isTyping, isProcessing, step]);

  const handleStartConversation = () => {
    setChatMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text: 'Claro! Vamos lá! 🎵', time: '14:21' },
    ]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, sender: 'bot', text: 'Qual é o tipo de evento?', time: '14:21' },
      ]);
      setQuestionIndex(1);
    }, 900);
  };

  const handleSelectEventType = (type: string) => {
    setEventType(type);
    setChatMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text: type, time: '14:22' },
    ]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, sender: 'bot', text: 'Quando será o seu evento?', time: '14:22' },
      ]);
      setQuestionIndex(2);
    }, 800);
  };

  const handleSelectDate = (date: string) => {
    setEventDate(date);
    setChatMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text: date, time: '14:22' },
    ]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, sender: 'bot', text: 'Onde será realizado?', time: '14:22' },
      ]);
      setQuestionIndex(3);
    }, 800);
  };

  const handleSelectLocation = (loc: string) => {
    setEventLocation(loc);
    setChatMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text: loc, time: '14:22' },
    ]);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('review');
    }, 1400);
  };

  const handleConfirmSendBooking = async () => {
    const newId = `book_${Date.now()}`;
    setBookingId(newId);
    setStep('success');

    // Async save to Firestore
    saveBookingToFirestore({
      id: newId,
      djSlug: djName.toLowerCase().replace(/\s+/g, '-'),
      djName: djName,
      eventType: eventType,
      eventDate: eventDate,
      eventLocation: eventLocation,
      budgetRange: budgetRange,
      notes: notes,
      status: 'novo',
    });
  };

  const handleSendPrivateMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const msgText = inputMessage.trim();
    const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: msgText,
      time: timeStr,
    };

    setPrivateRoomMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Persist to Firestore
    sendPrivateMessageToFirestore(bookingId, {
      sender: 'visitor',
      text: msgText,
      time: timeStr,
    });

    // Simulated DJ response + save to Firestore
    setTimeout(() => {
      const djReplyText = 'Recebi sua mensagem! Estou ajustando nosso checklist e o contrato da data. 🎉';
      const djReplyTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setPrivateRoomMessages((prev) => [
        ...prev,
        {
          id: `m-rep-${Date.now()}`,
          sender: 'bot',
          text: djReplyText,
          time: djReplyTime,
        },
      ]);
      sendPrivateMessageToFirestore(bookingId, {
        sender: 'dj',
        text: djReplyText,
        time: djReplyTime,
      });
    }, 1200);
  };

  return (
    <>
      {triggerButton ? (
        <div onClick={() => setIsOpen(true)}>{triggerButton}</div>
      ) : (
        <Button
          id="btn-open-booking-modal"
          size="lg"
          className="w-full justify-center gap-2 shadow-[0_0_24px_rgba(138,63,252,0.4)]"
          onClick={() => setIsOpen(true)}
        >
          <Calendar className="w-5 h-5" />
          Solicitar proposta
        </Button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg h-[92vh] sm:h-[84vh] bg-surface border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* Top Modal Navigation Header */}
            <div className="h-16 px-4 sm:px-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-surface/95 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/50 shadow-[0_0_12px_rgba(138,63,252,0.3)]">
                    <Image src={djAvatar} alt={djName} width={40} height={40} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    {step === 'private_room' ? `Sala Privada • ${djName}` : `Conversar com ${djName}`}
                  </h3>
                  <p className="text-[11px] text-green-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online agora
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {step === 'private_room' && (
                  <button className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition">
                    <Video className="w-4 h-4" />
                  </button>
                )}
                <button
                  id="btn-close-booking-dialog"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* STEP 1 & 2: CONVERSATIONAL FORM FLOW */}
            {step === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-background/40 to-surface">
                {/* Chat Message Scrollable Container */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-3.5">
                  {chatMessages.map((m) => {
                    const isBot = m.sender === 'bot';
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col max-w-[85%] ${
                          isBot ? 'self-start items-start' : 'self-end items-end'
                        }`}
                      >
                        <div
                          className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                            isBot
                              ? 'bg-white/5 border border-white/10 text-white rounded-tl-sm backdrop-blur-md shadow-lg'
                              : 'bg-primary text-white rounded-tr-sm shadow-[0_0_16px_rgba(138,63,252,0.3)]'
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[10px] text-text-secondary mt-1 px-1">{m.time}</span>
                      </div>
                    );
                  })}

                  {/* Typing Feedback */}
                  {isTyping && (
                    <div className="self-start flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-text-secondary text-xs rounded-tl-sm animate-in fade-in">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] text-text-secondary ml-1">{djName} está digitando...</span>
                    </div>
                  )}

                  {/* Processing Status Feedback */}
                  {isProcessing && (
                    <div className="self-center my-4 p-4 rounded-2xl bg-surface/90 border border-primary/30 flex flex-col items-center justify-center gap-2 text-center shadow-xl">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-xs font-semibold text-white">Analisando suas informações...</div>
                      <div className="text-[11px] text-text-secondary">Isso só leva alguns segundos</div>
                    </div>
                  )}

                  {/* Interactive Questions Chips */}
                  {questionIndex === 0 && !isTyping && (
                    <div className="self-end mt-2">
                      <Button
                        id="chat-answer-start-btn"
                        onClick={handleStartConversation}
                        className="rounded-full shadow-lg gap-2 text-xs"
                      >
                        Claro! Vamos lá! <Sparkles className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {questionIndex === 1 && !isTyping && (
                    <div className="self-end flex flex-wrap justify-end gap-2 mt-2 max-w-[90%] animate-in fade-in">
                      <Button
                        id="chip-festa-privada"
                        variant="secondary"
                        onClick={() => handleSelectEventType('Festa privada')}
                        className="rounded-full text-xs hover:border-primary"
                      >
                        <PartyPopper className="w-3.5 h-3.5 mr-1 text-primary" /> Festa privada
                      </Button>
                      <Button
                        id="chip-corporativo"
                        variant="secondary"
                        onClick={() => handleSelectEventType('Evento corporativo')}
                        className="rounded-full text-xs hover:border-primary"
                      >
                        <Building2 className="w-3.5 h-3.5 mr-1 text-tertiary" /> Evento corporativo
                      </Button>
                      <Button
                        id="chip-festival"
                        variant="secondary"
                        onClick={() => handleSelectEventType('Festival')}
                        className="rounded-full text-xs hover:border-primary"
                      >
                        <Flame className="w-3.5 h-3.5 mr-1 text-secondary" /> Festival
                      </Button>
                      <Button
                        id="chip-casanoturna"
                        variant="secondary"
                        onClick={() => handleSelectEventType('Casa noturna')}
                        className="rounded-full text-xs hover:border-primary"
                      >
                        <Disc3 className="w-3.5 h-3.5 mr-1 text-yellow-400" /> Casa noturna
                      </Button>
                      <Button
                        id="chip-outro"
                        variant="secondary"
                        onClick={() => handleSelectEventType('Outro formato')}
                        className="rounded-full text-xs"
                      >
                        Outro
                      </Button>
                    </div>
                  )}

                  {questionIndex === 2 && !isTyping && (
                    <div className="self-end flex flex-col items-end gap-2 mt-2 w-full max-w-xs animate-in fade-in">
                      <div className="bg-surface/90 border border-white/10 rounded-2xl p-3.5 w-full flex flex-col gap-2.5 shadow-xl">
                        <label htmlFor="booking-flow-date-input" className="text-[11px] text-text-secondary font-medium">Escolha uma data prevista:</label>
                        <input
                          id="booking-flow-date-input"
                          type="date"
                          defaultValue="2024-05-24"
                          onChange={(e) => setEventDate(e.target.value)}
                          aria-label="Escolha a data prevista para o evento"
                          className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface focus:border-primary transition-all [color-scheme:dark]"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={() => handleSelectDate('24 de maio de 2024')}
                          >
                            24 de maio de 2024
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="text-xs"
                            onClick={() => handleSelectDate(eventDate)}
                          >
                            Confirmar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {questionIndex === 3 && !isTyping && !isProcessing && (
                    <div className="self-end flex flex-wrap justify-end gap-2 mt-2 max-w-[90%] animate-in fade-in">
                      <Button
                        variant="secondary"
                        onClick={() => handleSelectLocation('São Paulo, SP')}
                        className="rounded-full text-xs hover:border-primary"
                      >
                        <MapPin className="w-3.5 h-3.5 mr-1 text-tertiary" /> São Paulo, SP
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleSelectLocation('Rio de Janeiro, RJ')}
                        className="rounded-full text-xs hover:border-primary"
                      >
                        <MapPin className="w-3.5 h-3.5 mr-1 text-tertiary" /> Rio de Janeiro, RJ
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleSelectLocation('Curitiba, PR')}
                        className="rounded-full text-xs hover:border-primary"
                      >
                        <MapPin className="w-3.5 h-3.5 mr-1 text-tertiary" /> Curitiba, PR
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleSelectLocation('Outro local')}
                        className="rounded-full text-xs"
                      >
                        Outro local
                      </Button>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar (Footer) */}
                <div className="p-3 sm:p-4 border-t border-white/10 bg-surface shrink-0">
                  <div className="relative flex items-center">
                    <label htmlFor="booking-flow-message-input" className="sr-only">
                      Digite uma mensagem ou resposta para o booking
                    </label>
                    <input
                      id="booking-flow-message-input"
                      type="text"
                      placeholder="Digite uma mensagem ou resposta..."
                      aria-label="Digite uma mensagem ou resposta para o booking"
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-full pl-4 pr-12 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface focus:border-primary transition-all"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          handleSelectLocation(e.currentTarget.value.trim());
                        }
                      }}
                    />
                    <button
                      type="button"
                      aria-label="Enviar mensagem de booking"
                      className="absolute right-1 w-9 h-9 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center text-white transition shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVISÃO DO PEDIDO */}
            {step === 'review' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between bg-surface animate-in fade-in">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-white">Revisar pedido</h2>
                    <Badge variant="primary" className="text-[10px]">Passo 04</Badge>
                  </div>
                  <p className="text-xs text-text-secondary mb-6">
                    Confira as informações abaixo antes de enviar sua solicitação para a {djName}.
                  </p>

                  <div className="flex flex-col gap-3.5 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                        <PartyPopper className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">Evento</div>
                        <div className="text-sm font-semibold text-white">{eventType}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-tertiary/20 text-tertiary flex items-center justify-center shrink-0 border border-tertiary/30">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">Data</div>
                        <div className="text-sm font-semibold text-white">{eventDate}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center shrink-0 border border-secondary/30">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">Local</div>
                        <div className="text-sm font-semibold text-white">{eventLocation}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/30">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">Orçamento estimado</div>
                        <div className="text-sm font-semibold text-white">{budgetRange}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 border-t border-white/10 pt-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">Rider / Observações</div>
                        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{notes}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col gap-3">
                  <Button
                    id="btn-confirm-send-booking"
                    size="lg"
                    className="w-full gap-2 shadow-[0_0_24px_rgba(138,63,252,0.4)]"
                    onClick={handleConfirmSendBooking}
                  >
                    <Send className="w-4 h-4" /> Enviar pedido
                  </Button>
                  <p className="text-[11px] text-center text-text-secondary flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
                    Suas informações são privadas e enviadas diretamente para o DJ.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5: SUCESSO */}
            {step === 'success' && (
              <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-surface relative overflow-hidden animate-in fade-in">
                <div className="absolute inset-0 bg-primary/10 blur-[120px] pointer-events-none" />

                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_24px_rgba(138,63,252,0.8)]">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Pedido enviado com sucesso!</h2>
                <p className="text-xs text-text-secondary mb-6 max-w-xs leading-relaxed">
                  A {djName} recebeu sua solicitação e em breve entrará em contato com você.
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-8 flex items-start gap-3 text-left max-w-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] text-primary font-bold">i</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Você será notificado aqui e também por e-mail sobre as próximas atualizações.
                  </p>
                </div>

                <div className="w-full max-w-sm flex flex-col gap-3">
                  <Button
                    id="btn-access-private-room"
                    size="lg"
                    className="w-full gap-2 shadow-lg"
                    onClick={() => setStep('private_room')}
                  >
                    Acessar Sala Privada <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-xs text-text-secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Continuar explorando
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 6: SALA PRIVADA */}
            {step === 'private_room' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-background to-surface animate-in fade-in">
                {/* Chat Log */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-3.5">
                  {privateRoomMessages.map((m) => {
                    const isBot = m.sender === 'bot';

                    if (m.isCustomProposal && m.proposalData) {
                      return (
                        <div key={m.id} className="self-start w-full max-w-sm my-1">
                          <div className="rounded-2xl bg-gradient-to-br from-surface to-background border border-primary/40 p-4 shadow-xl">
                            <div className="flex items-center gap-2 mb-2 text-primary font-bold text-xs uppercase tracking-wider">
                              <Briefcase className="w-4 h-4" /> Proposta oficial
                            </div>
                            <div className="text-2xl font-bold text-white mb-1">
                              {m.proposalData.value}
                            </div>
                            <div className="text-xs text-text-secondary mb-4 leading-relaxed">
                              {m.proposalData.description}
                            </div>
                            <Button size="sm" className="w-full gap-1.5 text-xs">
                              Ver proposta completa <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                          <span className="text-[10px] text-text-secondary mt-1 px-1 block">{m.time}</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col max-w-[85%] ${
                          isBot ? 'self-start items-start' : 'self-end items-end'
                        }`}
                      >
                        <div
                          className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                            isBot
                              ? 'bg-white/5 border border-white/10 text-white rounded-tl-sm backdrop-blur-md shadow-md'
                              : 'bg-primary text-white rounded-tr-sm shadow-[0_0_16px_rgba(138,63,252,0.3)]'
                          }`}
                        >
                          {m.text}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-text-secondary mt-1 px-1">
                          <span>{m.time}</span>
                          {!isBot && <CheckCheck className="w-3 h-3 text-tertiary" />}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chips Suggestions */}
                <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto border-t border-white/5 shrink-0">
                  {['Vamos lá!', 'Qual a data?', 'Me conta mais', 'Perfeito!'].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputMessage(chip)}
                      className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-text-secondary hover:text-white shrink-0 transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={handleSendPrivateMessage}
                  className="p-3 sm:p-4 border-t border-white/10 bg-surface shrink-0 flex items-center gap-2"
                >
                  <button 
                    type="button" 
                    aria-label="Anexar arquivo ou referência"
                    className="p-2 text-text-secondary hover:text-white transition rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <div className="relative flex-1">
                    <label htmlFor="booking-private-chat-input" className="sr-only">
                      Digite uma mensagem privada para o DJ
                    </label>
                    <input
                      id="booking-private-chat-input"
                      type="text"
                      placeholder="Digite uma mensagem para o DJ..."
                      aria-label="Digite uma mensagem para o DJ"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="w-full h-10 bg-white/5 border border-white/10 rounded-full pl-4 pr-10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      aria-label="Inserir emoji"
                      className="absolute right-3 top-2.5 text-text-secondary hover:text-white transition rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    aria-label="Enviar mensagem privada para o DJ"
                    className="w-10 h-10 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center text-white transition shadow-md shrink-0 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
