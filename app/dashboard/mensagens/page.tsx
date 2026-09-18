'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Phone, 
  Calendar, 
  ArrowLeft,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusIndicator, WaveformIcon } from '@/components/ui/BeatFlowIcons';

interface MessageThread {
  id: string;
  sender: string;
  avatar: string;
  role: string;
  event: string;
  date: string;
  budgetFormatted: string;
  status: 'Nova Proposta' | 'Em Negociação' | 'Confirmada';
  statusColor: string;
  nextAction: string;
  unread: boolean;
  lastMessage: string;
  time: string;
  messages: {
    fromMe: boolean;
    text: string;
    time: string;
  }[];
}

const SAMPLE_THREADS: MessageThread[] = [
  {
    id: 'thread-1',
    sender: 'Marcos Silveira',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    role: 'Agência Groove & Co.',
    event: 'Festa Privada Jardins',
    date: '28 de Maio de 2026',
    budgetFormatted: 'R$ 3.500',
    status: 'Nova Proposta',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    nextAction: 'Decisão pendente: validar rider e aceitar proposta com 50% de sinal.',
    unread: true,
    lastMessage: 'Perfeito! O rider com Pioneer CDJ-3000 já está reservado no local.',
    time: '14:32',
    messages: [
      { fromMe: false, text: 'Olá Luna! Adoramos o set que você enviou no SoundCloud.', time: '14:10' },
      { fromMe: true, text: 'Muito obrigada Marcos! Qual a estimativa de horário de pico da pista?', time: '14:20' },
      { fromMe: false, text: 'Perfeito! O rider com Pioneer CDJ-3000 já está reservado no local.', time: '14:32' },
    ]
  },
  {
    id: 'thread-2',
    sender: 'Camila Drummond',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    role: 'Curadora Club Solaris',
    event: 'Warm-up Sunset Session',
    date: '06 de Junho de 2026',
    budgetFormatted: 'R$ 4.200',
    status: 'Em Negociação',
    statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    nextAction: 'Aguardando confirmação do contratante sobre o ajuste de cachê.',
    unread: false,
    lastMessage: 'Aprovamos a proposta de cachê. Vou enviar o contrato em seguida.',
    time: 'Ontem',
    messages: [
      { fromMe: false, text: 'Luna, tudo bem? Gostaríamos de confirmar sua data para o sunset.', time: 'Ontem 18:00' },
      { fromMe: true, text: 'Tudo ótimo, Camila! Proposta e rider técnico enviados pelo painel.', time: 'Ontem 18:25' },
      { fromMe: false, text: 'Aprovamos a proposta de cachê. Vou enviar o contrato em seguida.', time: 'Ontem 19:15' },
    ]
  },
  {
    id: 'thread-3',
    sender: 'Rafael Torres',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    role: 'Produtor Festival Aurora',
    event: 'Stage Melodic 2026',
    date: '19 de Julho de 2026',
    budgetFormatted: 'R$ 7.200',
    status: 'Confirmada',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    nextAction: 'Data confirmada na agenda. Sinal de 50% garantido.',
    unread: false,
    lastMessage: 'Confirmado o horário de 01h às 03h no palco principal.',
    time: '10 de Mai',
    messages: [
      { fromMe: false, text: 'Luna, alinhamos o line-up.', time: '10 Mai' },
      { fromMe: false, text: 'Confirmado o horário de 01h às 03h no palco principal.', time: '10 Mai' },
    ]
  }
];

export default function MensagensPage() {
  const [threads, setThreads] = useState<MessageThread[]>(SAMPLE_THREADS);
  const [activeId, setActiveId] = useState<string>(SAMPLE_THREADS[0].id);
  const [showMobileList, setShowMobileList] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [counterValue, setCounterValue] = useState('4.000');
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  const activeThread = threads.find((t) => t.id === activeId) || threads[0];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || replyText;
    if (!text.trim()) return;

    setThreads(prev => prev.map(t => {
      if (t.id === activeId) {
        return {
          ...t,
          lastMessage: text.trim(),
          time: 'Agora',
          messages: [
            ...t.messages,
            { fromMe: true, text: text.trim(), time: 'Agora' }
          ]
        };
      }
      return t;
    }));

    if (!textToSend) setReplyText('');
  };

  const handleConfirmAvailability = () => {
    const msg = `✅ Disponibilidade confirmada para ${activeThread.date} no evento ${activeThread.event}! Proposta pronta para fechamento com 50% de sinal garantido.`;
    handleSendMessage(msg);
    setActionSuccessNotice('Disponibilidade confirmada e enviada ao contratante!');
    setTimeout(() => setActionSuccessNotice(null), 3500);
  };

  const handleSendCounterOffer = () => {
    const msg = `📝 Olá! Sugiro uma contraproposta de R$ ${counterValue} para este set no ${activeThread.event}, mantendo rider técnico Pioneer completo.`;
    handleSendMessage(msg);
    setShowCounterModal(false);
    setActionSuccessNotice('Contraproposta enviada no chat!');
    setTimeout(() => setActionSuccessNotice(null), 3500);
  };

  const filteredThreads = threads.filter(t => 
    t.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-white/50 mb-1">
            <Link href="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-white">Mensagens</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <WaveformIcon size={26} color="#00D1FF" />
            <span>Mensagens e Negociações</span>
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Comunicação direta e rápida com contratantes e produtores de eventos.
          </p>
        </div>
      </div>

      {/* Main Inbox Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)] sm:h-[680px] bg-[#0E0C1B]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left List of Threads (4 cols) */}
        <div className={`lg:col-span-4 border-r border-white/10 flex-col h-full bg-[#0B0916] ${showMobileList ? 'flex' : 'hidden lg:flex'}`}>
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <label htmlFor="messages-search-input" className="sr-only">
                Buscar conversa
              </label>
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                id="messages-search-input"
                type="text"
                placeholder="Buscar conversa..."
                aria-label="Buscar conversa pelo nome do contratante ou evento"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#0B0916] focus:border-[#8A3FFC] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filteredThreads.map((t) => {
              const isSelected = t.id === activeId;
              return (
                <button
                  key={t.id}
                  onClick={() => { setActiveId(t.id); setShowMobileList(false); }}
                  className={`w-full p-4 text-left flex items-start gap-3 transition cursor-pointer ${
                    isSelected ? 'bg-white/10 border-l-4 border-l-[#8A3FFC]' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0 relative">
                    <Image 
                      src={t.avatar} 
                      alt={t.sender} 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {t.unread && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00D1FF] border border-[#0B0916]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{t.sender}</h4>
                      <span className="text-[10px] text-white/40">{t.time}</span>
                    </div>
                    <p className="text-[11px] text-[#00D1FF] font-medium truncate">{t.event}</p>
                    <p className="text-xs text-white/60 truncate mt-0.5">{t.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Pane (8 cols) */}
        <div className={`lg:col-span-8 flex-col h-full bg-[#0E0C1B] ${!showMobileList ? 'flex' : 'hidden lg:flex'}`}>
          {/* Action Success Toast Banner */}
          {actionSuccessNotice && (
            <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 py-2 text-xs text-emerald-300 font-semibold flex items-center justify-between animate-in fade-in">
              <span>{actionSuccessNotice}</span>
            </div>
          )}

          {/* Contextual Conversation Header (Auditado com Proposta) */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[#120F24] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowMobileList(true)}
                  className="lg:hidden p-2 -ml-2 rounded-full hover:bg-white/10 text-white/70 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <Image 
                    src={activeThread.avatar} 
                    alt={activeThread.sender} 
                    width={40} 
                    height={40} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {activeThread.sender}
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                      {activeThread.role}
                    </span>
                  </h3>
                  <div className="text-xs text-white/60 flex items-center gap-2 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00D1FF]" />
                    <span>{activeThread.event} • {activeThread.date}</span>
                  </div>
                </div>
              </div>

              {/* Status e Cachê */}
              <div className="sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between gap-1.5">
                <StatusIndicator 
                  status={activeThread.status === 'Confirmada' ? 'confirmado' : activeThread.status === 'Nova Proposta' ? 'pendente' : 'pendente'} 
                  label={activeThread.status} 
                />
                <span className="text-xs text-white/60">
                  Cachê: <strong className="text-white text-sm">{activeThread.budgetFormatted}</strong>
                </span>
              </div>
            </div>

            {/* Próxima Ação & Botões Contextuais */}
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-white/70">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px]">
                  <strong>Próxima Ação:</strong> {activeThread.nextAction}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleConfirmAvailability}
                  className="bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-300 text-xs h-8 px-3 rounded-xl cursor-pointer"
                >
                  Confirmar Data
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowCounterModal(true)}
                  className="bg-white/5 hover:bg-white/10 border-white/15 text-white text-xs h-8 px-3 rounded-xl cursor-pointer"
                >
                  Contraproposta
                </Button>

                <Link href="/dashboard/propostas">
                  <Button size="sm" className="bg-[#8A3FFC] hover:bg-[#7C3AED] text-white text-xs h-8 px-3 rounded-xl cursor-pointer">
                    Ver Proposta
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeThread.messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${m.fromMe ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                    m.fromMe 
                      ? 'bg-gradient-to-r from-[#8A3FFC] to-[#7C3AED] text-white rounded-br-sm shadow-lg' 
                      : 'bg-[#18152E] text-white/90 border border-white/10 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-white/40 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/10 bg-[#120F24]">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <label htmlFor="chat-thread-reply-input" className="sr-only">
                Escreva sua resposta para o contratante
              </label>
              <input 
                id="chat-thread-reply-input"
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escreva sua resposta para o contratante..."
                aria-label="Escreva sua resposta para o contratante"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#120F24] focus:border-[#8A3FFC] transition-all"
              />
              <Button 
                type="submit" 
                aria-label="Enviar mensagem na conversa"
                className="bg-[#8A3FFC] hover:bg-[#7C3AED] text-white h-11 px-5 rounded-xl flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Send className="w-4 h-4" />
                <span>Enviar</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Modal Rápido de Contraproposta no Chat */}
        {showCounterModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#120F24] border border-white/20 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
              <h4 className="text-sm font-bold text-white">Enviar Contraproposta Rápida</h4>
              <p className="text-xs text-white/60">
                Ajuste de cachê para {activeThread.event}. O contratante receberá a mensagem diretamente na conversa.
              </p>
              <div>
                <label htmlFor="quick-counter-value-input" className="text-xs text-white/70 block mb-1 font-medium cursor-pointer">
                  Novo Cachê (R$)
                </label>
                <input
                  id="quick-counter-value-input"
                  type="text"
                  value={counterValue}
                  onChange={(e) => setCounterValue(e.target.value)}
                  aria-label="Novo valor de cachê para contraproposta rápida"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#120F24] focus:border-[#8A3FFC] transition-all"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => setShowCounterModal(false)}
                  className="bg-white/5 border-white/10 text-xs text-white rounded-xl focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  type="button"
                  onClick={handleSendCounterOffer}
                  className="bg-[#8A3FFC] hover:bg-[#7C3AED] text-white text-xs rounded-xl font-bold focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none cursor-pointer"
                >
                  Enviar no Chat
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
