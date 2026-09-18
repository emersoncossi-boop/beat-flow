'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  XCircle, 
  Sliders, 
  Check, 
  RefreshCw,
  Sparkles,
  Inbox,
  Send,
  Radio,
  AlertTriangle
} from 'lucide-react';
import {
  EsquerdaIcon,
  AgendaIcon,
  LocalizacaoIcon,
  RelogioIcon,
  SucessoIcon,
  SegurancaIcon,
  DocumentoIcon,
  ExternoIcon,
  MensagensIcon,
  CopiarIcon,
  FecharIcon,
  DireitaIcon,
  WaveformIcon,
  StatusIndicator
} from '@/components/ui/BeatFlowIcons';
import { Button } from '@/components/ui/button';
import { databaseService, BookingModel, TransactionModel } from '@/lib/database-service';
import { ProposalConversionChart } from '@/components/dashboard/ProposalConversionChart';

export interface ProposalItem {
  id: string;
  djId: string;
  client: string;
  clientContact: string;
  eventName: string;
  eventDate: string;
  eventDurationHours: number;
  location: string;
  budget: number;
  budgetFormatted: string;
  soundReferenceUrl: string;
  notes: string;
  receivedAt: string;
  status: 'pendente' | 'em_negociacao' | 'aguardando_pagamento' | 'aprovada' | 'recusada';
  counterOfferBudget?: number;
  depositAmount: number;
  paymentLink?: string;
  contractPdfUrl?: string;
}

function getProposalsFromDatabase(): ProposalItem[] {
  if (typeof window === 'undefined') return [];
  const rawBookings = databaseService.getBookings('dj-luna-001');
  return rawBookings.map((b) => {
    const tx = databaseService.getTransactionByBookingId(b.id);
    const activeBudget = b.counter_offer_budget || b.offered_budget;
    // Exactly 50% calculated mathematically
    const deposit = Math.round(activeBudget * 0.5);
    return {
      id: b.id,
      djId: b.dj_id,
      client: b.contractor_name,
      clientContact: b.contractor_contact,
      eventName: b.event_name,
      eventDate: b.event_date,
      eventDurationHours: b.event_duration_hours,
      location: b.location_city,
      budget: activeBudget,
      budgetFormatted: `R$ ${activeBudget.toLocaleString('pt-BR')}`,
      soundReferenceUrl: b.sound_reference_url,
      notes: b.notes || '',
      receivedAt: new Date(b.created_at).toLocaleDateString('pt-BR'),
      status: b.status,
      counterOfferBudget: b.counter_offer_budget,
      depositAmount: deposit,
      paymentLink: tx ? `https://pay.beatflow.art/sinal_${b.id}` : undefined,
      contractPdfUrl: tx?.contract_pdf_url || `https://beatflow.art/contratos/contrato_${b.id}.pdf`,
    };
  });
}

export default function CentralPropostasPage() {
  const [proposals, setProposals] = useState<ProposalItem[]>(() => getProposalsFromDatabase());
  const [activeTab, setActiveTab] = useState<'pendente' | 'all' | 'aprovada'>('pendente');

  // Transaction Modal (50% de sinal e contrato gerado)
  const [transactionModalItem, setTransactionModalItem] = useState<{
    proposal: ProposalItem;
    transaction: TransactionModel;
  } | null>(null);
  const [copiedPaymentLink, setCopiedPaymentLink] = useState(false);
  const [copiedRowId, setCopiedRowId] = useState<string | null>(null);
  const [isProcessingWebhook, setIsProcessingWebhook] = useState(false);
  const [webhookSuccessNotice, setWebhookSuccessNotice] = useState(false);

  // Counter-offer Modal
  const [counterOfferModalItem, setCounterOfferModalItem] = useState<ProposalItem | null>(null);
  const [counterBudgetInput, setCounterBudgetInput] = useState<string>('');
  const [counterDurationInput, setCounterDurationInput] = useState<string>('3');
  const [counterNotesInput, setCounterNotesInput] = useState<string>('');

  // Drawer de Conversa / Chat
  const [activeDrawerProposal, setActiveDrawerProposal] = useState<ProposalItem | null>(null);
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [chatThreads, setChatThreads] = useState<Record<string, { fromMe: boolean; text: string; time: string }[]>>({
    'book-101': [
      { fromMe: false, text: 'Olá! Enviamos os detalhes do espaço e o link de referência sonora. Consegue validar o som?', time: '14:28' }
    ],
    'book-102': [
      { fromMe: false, text: 'Boa tarde! Vimos seu set no SoundCloud e adoramos a energia para a abertura do Solaris. Aceita fechar hoje?', time: '16:10' }
    ]
  });

  const refreshProposals = () => {
    setProposals(getProposalsFromDatabase());
  };

  // Aceitar Proposta: Gera contrato, link de sinal (50%) e protege data na agenda
  const handleAcceptProposal = (item: ProposalItem) => {
    try {
      const { transaction } = databaseService.acceptProposal(item.id);
      refreshProposals();

      setChatThreads((prev) => ({
        ...prev,
        [item.id]: [
          ...(prev[item.id] || []),
          {
            fromMe: true,
            text: `🎉 Proposta aceita! Contrato gerado e data reservada na agenda. Link para o adiantamento de 50% (R$ ${transaction.deposit_amount.toLocaleString('pt-BR')}) enviado ao contratante.`,
            time: 'Agora',
          },
        ],
      }));

      const updatedProposal: ProposalItem = {
        ...item,
        status: 'aguardando_pagamento',
        depositAmount: transaction.deposit_amount,
        paymentLink: `https://pay.beatflow.art/sinal_${item.id}`,
        contractPdfUrl: transaction.contract_pdf_url,
      };

      setTransactionModalItem({
        proposal: updatedProposal,
        transaction,
      });
    } catch (err: any) {
      alert(err?.message || 'Erro ao aceitar proposta');
    }
  };

  // Confirmar pagamento do sinal (simulação de gateway)
  const handleSimulatePaymentWebhook = (bookingId: string) => {
    setIsProcessingWebhook(true);
    setTimeout(() => {
      databaseService.processPaymentWebhook(bookingId);
      refreshProposals();
      setIsProcessingWebhook(false);
      setWebhookSuccessNotice(true);
      setTimeout(() => setWebhookSuccessNotice(false), 4000);
      
      if (transactionModalItem && transactionModalItem.proposal.id === bookingId) {
        const updatedTx = databaseService.getTransactionByBookingId(bookingId);
        if (updatedTx) {
          setTransactionModalItem((prev) => prev ? {
            ...prev,
            proposal: { ...prev.proposal, status: 'aprovada' },
            transaction: updatedTx,
          } : null);
        }
      }
    }, 800);
  };

  // Contraproposta
  const handleOpenCounterOffer = (item: ProposalItem) => {
    setCounterOfferModalItem(item);
    setCounterBudgetInput(String(Math.round(item.budget * 1.2)));
    setCounterDurationInput(String(item.eventDurationHours));
    setCounterNotesInput('Agradeço pelo convite! Devido à logística e ao horário do set, sugiro este ajuste no cachê para mantermos a estrutura completa.');
  };

  const handleConfirmCounterOffer = () => {
    if (!counterOfferModalItem) return;

    const newBudgetValue = parseFloat(counterBudgetInput.replace(/[^0-9.]/g, '')) || counterOfferModalItem.budget;
    databaseService.submitCounterOffer(counterOfferModalItem.id, newBudgetValue, counterNotesInput);
    refreshProposals();

    setChatThreads((prev) => ({
      ...prev,
      [counterOfferModalItem.id]: [
        ...(prev[counterOfferModalItem.id] || []),
        {
          fromMe: true,
          text: `📝 Contraproposta enviada: Novo valor de R$ ${newBudgetValue.toLocaleString('pt-BR')} para set de ${counterDurationInput}h. Mensagem: ${counterNotesInput}`,
          time: 'Agora',
        },
      ],
    }));

    setCounterOfferModalItem(null);
  };

  // Recusar
  const handleDeclineProposal = (id: string) => {
    databaseService.declineProposal(id);
    refreshProposals();
  };

  // Enviar Mensagem
  const handleSendMessage = (propId: string) => {
    if (!chatMessageInput.trim()) return;

    setChatThreads((prev) => ({
      ...prev,
      [propId]: [
        ...(prev[propId] || []),
        {
          fromMe: true,
          text: chatMessageInput.trim(),
          time: 'Agora',
        },
      ],
    }));
    setChatMessageInput('');
  };

  const handleCopyPayment = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedPaymentLink(true);
    setTimeout(() => setCopiedPaymentLink(false), 2000);
  };

  const handleCopyRowLink = (proposalId: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedRowId(proposalId);
    setTimeout(() => setCopiedRowId(null), 2000);
  };

  const filteredProposals = proposals.filter((p) => {
    if (activeTab === 'pendente') return p.status === 'pendente' || p.status === 'em_negociacao';
    if (activeTab === 'aprovada') return p.status === 'aprovada' || p.status === 'aguardando_pagamento';
    return true;
  });

  const countPendente = proposals.filter((p) => p.status === 'pendente' || p.status === 'em_negociacao').length;
  const countAprovadas = proposals.filter((p) => p.status === 'aprovada' || p.status === 'aguardando_pagamento').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 px-4 sm:px-6">
      {/* 1. CABEÇALHO ORIENTADO À AÇÃO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-white/50 mb-1">
            <Link href="/dashboard" className="hover:text-white flex items-center gap-1 transition">
              <EsquerdaIcon className="w-3.5 h-3.5" /> Painel
            </Link>
            <span>/</span>
            <span className="text-white">Gestão de Contratos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestão de Contratos
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Gerencie pedidos, negocie valores e confirme datas sem conflito de agenda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/[slug]" as="/luna-martins" target="_blank">
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10 border-white/15 text-white text-xs h-10 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <ExternoIcon className="w-3.5 h-3.5" />
              <span>Ver Press Kit</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* BANNER DE DECISÃO ORIENTADO À AÇÃO */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#8A3FFC]/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white text-xs sm:text-sm block">
              🚨 2 decisões precisam de você
            </span>
            <span className="text-white/70 text-[11px] sm:text-xs">
              1 nova proposta aguardando aceite · 1 negociação aguardando resposta do contratante.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-white/50 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
          <SegurancaIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>Proteção de agenda ativa</span>
        </div>
      </div>

      {/* BANNER INFORMATIVO DE SINAL E PROTEÇÃO */}
      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>
            <strong>Sua data fica protegida ao confirmar:</strong> Ao aceitar uma proposta, a data é automaticamente reservada na sua agenda para evitar conflitos, com 50% de sinal garantido.
          </span>
        </div>
        <Link href="/dashboard/agenda" className="text-[#00D1FF] hover:underline font-semibold shrink-0 text-[11px] hidden sm:inline">
          Ver Agenda →
        </Link>
      </div>

      {/* EVOLUÇÃO DA CONVERSÃO (RECHARTS): CANDIDATURAS ENVIADAS VS SHOWS CONFIRMADOS NO MÊS */}
      <ProposalConversionChart 
        confirmedCount={countAprovadas} 
        totalProposalsCount={proposals.length} 
      />

      {/* TABS DE FILTRO */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('pendente')}
            className={`whitespace-nowrap shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'pendente'
                ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span>Decisões Pendentes</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300">
              {countPendente}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('aprovada')}
            className={`whitespace-nowrap shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'aprovada'
                ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span>Confirmadas / Em Pagamento</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
              {countAprovadas}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`whitespace-nowrap shrink-0 text-xs font-semibold px-3 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Todas ({proposals.length})
          </button>
        </div>

        <button 
          onClick={refreshProposals}
          className="text-xs text-white/50 hover:text-white flex items-center gap-1.5 transition p-1 cursor-pointer"
          title="Recarregar propostas"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Atualizar</span>
        </button>
      </div>

      {/* LISTA DE PROPOSTAS (LAYOUT CLEAN SEM CAIXAS DENTRO DE CAIXAS) */}
      <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
        {filteredProposals.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#120F24]/50 border border-white/10 space-y-3 w-full">
            <Inbox className="w-10 h-10 text-white/30 mx-auto" />
            <p className="text-sm text-white/70">Nenhuma proposta encontrada nesta categoria.</p>
          </div>
        ) : (
          filteredProposals.map((item) => {
            const thread = chatThreads[item.id] || [];

            return (
              <div
                key={item.id}
                className="w-[85vw] lg:w-full min-w-[85vw] lg:min-w-0 snap-center shrink-0 rounded-2xl bg-[#120F24]/90 border border-white/10 hover:border-white/20 p-5 sm:p-6 space-y-4 transition shadow-lg"
              >
                {/* LINHA 1 (O mais importante em 2 segundos): Contratante • Data • Cidade • Cachê */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-white">{item.client}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-xs text-white/80 font-medium">{item.eventName}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-white/60 flex-wrap">
                      <span className="flex items-center gap-1">
                        <AgendaIcon className="w-3.5 h-3.5 text-[#8A3FFC]" />
                        {item.eventDate} ({item.eventDurationHours}h de set)
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <LocalizacaoIcon className="w-3.5 h-3.5 text-[#00D1FF]" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Cachê Total e Sinal de 50% (Valor em Branco, visualmente limpo) */}
                  <div className="lg:text-right flex lg:flex-col items-baseline lg:items-end justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-white/50">Cachê Total:</span>
                      <span className="text-lg font-extrabold text-white">{item.budgetFormatted}</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">
                      50% de sinal garantido: <strong>R$ {item.depositAmount.toLocaleString('pt-BR')}</strong>
                    </span>
                  </div>
                </div>

                {/* LINHA 2: A Referência Sonora */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-1 text-xs">
                  <div className="flex items-center gap-2 text-white/70">
                    <Radio className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="font-semibold text-white/90">Referência do Contratante:</span>
                    <a
                      href={item.soundReferenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00D1FF] hover:underline flex items-center gap-1 font-medium truncate max-w-xs"
                    >
                      <WaveformIcon className="w-3.5 h-3.5 text-[#00D1FF]" />
                      <span>Ouvir Set de Referência</span>
                      <ExternoIcon className="w-3 h-3" />
                    </a>
                  </div>

                  {item.notes && (
                    <p className="text-white/50 text-[11px] italic truncate max-w-md">
                      "{item.notes}"
                    </p>
                  )}
                </div>

                {/* LINHA 3: Status e Ações Coerentes */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    {item.status === 'pendente' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        Nova Proposta
                      </span>
                    )}
                    {item.status === 'em_negociacao' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                        <RelogioIcon className="w-3.5 h-3.5" />
                        Aguardando Resposta do Contratante
                      </span>
                    )}
                    {item.status === 'aguardando_pagamento' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                        <RelogioIcon className="w-3.5 h-3.5" />
                        Contrato Emitido • Aguardando 50% de Sinal
                      </span>
                    )}
                    {item.status === 'aprovada' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                        <SucessoIcon className="w-3.5 h-3.5" />
                        Data Confirmada na Agenda • Sinal Custodiado
                      </span>
                    )}
                    {item.status === 'recusada' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-300 border border-red-500/30">
                        Proposta Recusada
                      </span>
                    )}

                    <Button
                      onClick={() => setActiveDrawerProposal(item)}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 cursor-pointer ml-1"
                    >
                      <MensagensIcon className="w-3.5 h-3.5 text-[#00D1FF]" />
                      <span>Mensagens ({thread.length})</span>
                    </Button>
                  </div>

                  {/* Ações Coerentes com o Estado */}
                  <div className="flex items-center gap-2">
                    {/* Estado: Pendente */}
                    {item.status === 'pendente' && (
                      <>
                        <Button
                          onClick={() => handleDeclineProposal(item.id)}
                          variant="outline"
                          size="sm"
                          className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400 text-xs h-9 px-3 rounded-xl cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1" />
                          Recusar
                        </Button>

                        <Button
                          onClick={() => handleOpenCounterOffer(item)}
                          variant="outline"
                          size="sm"
                          className="bg-white/5 hover:bg-white/10 border-white/15 text-white text-xs h-9 px-3 rounded-xl cursor-pointer"
                        >
                          <Sliders className="w-3.5 h-3.5 mr-1 text-[#8A3FFC]" />
                          Contraproposta
                        </Button>

                        <Button
                          onClick={() => handleAcceptProposal(item)}
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs h-9 px-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5 cursor-pointer"
                        >
                          <SucessoIcon className="w-3.5 h-3.5" />
                          <span>Aceitar e Proteger Agenda</span>
                        </Button>
                      </>
                    )}

                    {/* Estado: Em Negociação (SEM AÇÕES CONTRADITÓRIAS) */}
                    {item.status === 'em_negociacao' && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/50 hidden sm:inline">
                          Sua contraproposta de R$ {item.budget.toLocaleString('pt-BR')} foi enviada.
                        </span>
                        <Button
                          onClick={() => setActiveDrawerProposal(item)}
                          variant="outline"
                          size="sm"
                          className="bg-purple-500/15 hover:bg-purple-500/25 border-purple-500/30 text-purple-200 text-xs h-9 px-3.5 rounded-xl cursor-pointer"
                        >
                          <MensagensIcon className="w-3.5 h-3.5 mr-1.5 text-[#00D1FF]" />
                          Ver Conversa / Histórico
                        </Button>
                      </div>
                    )}

                    {/* Estado: Aguardando Pagamento */}
                    {item.status === 'aguardando_pagamento' && (
                      <div className="flex items-center flex-wrap gap-2">
                        <Button
                          onClick={() => handleCopyRowLink(item.id, `https://pay.beatflow.art/sinal_${item.id}`)}
                          size="sm"
                          variant="outline"
                          aria-label="Copiar link de pagamento do sinal"
                          className="bg-white/5 hover:bg-white/10 border-white/15 text-white text-xs h-9 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedRowId === item.id ? (
                            <SucessoIcon className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <CopiarIcon className="w-3.5 h-3.5 text-[#00D1FF]" />
                          )}
                          <span>{copiedRowId === item.id ? 'Link Copiado!' : 'Copiar PIX'}</span>
                        </Button>

                        <Button
                          onClick={() => handleSimulatePaymentWebhook(item.id)}
                          disabled={isProcessingWebhook}
                          size="sm"
                          variant="outline"
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-400 text-xs h-9 px-3 rounded-xl flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Simular Pagamento</span>
                        </Button>

                        <Button
                          onClick={() => {
                            const tx = databaseService.getTransactionByBookingId(item.id);
                            if (tx) {
                              setTransactionModalItem({ proposal: item, transaction: tx });
                            }
                          }}
                          size="sm"
                          className="bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs h-9 px-3.5 rounded-xl cursor-pointer"
                        >
                          <DocumentoIcon className="w-3.5 h-3.5 mr-1 text-[#00D1FF]" />
                          Ver Contrato & Link
                        </Button>
                      </div>
                    )}

                    {/* Estado: Aprovada */}
                    {item.status === 'aprovada' && (
                      <div className="flex items-center gap-2">
                        <Link href="/dashboard/agenda">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-[#8A3FFC]/15 hover:bg-[#8A3FFC]/25 border-[#8A3FFC]/30 text-purple-200 text-xs h-9 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer"
                          >
                            <AgendaIcon className="w-3.5 h-3.5 text-[#00D1FF]" />
                            <span>Ver na Agenda</span>
                          </Button>
                        </Link>

                        <Button
                          onClick={() => {
                            const tx = databaseService.getTransactionByBookingId(item.id);
                            if (tx) {
                              setTransactionModalItem({ proposal: item, transaction: tx });
                            }
                          }}
                          size="sm"
                          variant="outline"
                          className="bg-white/5 hover:bg-white/10 border-white/15 text-white text-xs h-9 px-3 rounded-xl cursor-pointer"
                        >
                          <DocumentoIcon className="w-3.5 h-3.5 mr-1 text-[#00D1FF]" />
                          Ver Contrato
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DRAWER LATERAL DE CONVERSA COM CONTRATANTE */}
      {activeDrawerProposal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#0E0C1B] border-l border-white/15 h-full flex flex-col p-6 space-y-4 shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Header do Drawer */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00D1FF]">
                  Negociação Direta
                </span>
                <h3 className="text-base font-bold text-white">{activeDrawerProposal.client}</h3>
                <p className="text-xs text-white/50">{activeDrawerProposal.eventName} • {activeDrawerProposal.eventDate}</p>
              </div>
              <button
                onClick={() => setActiveDrawerProposal(null)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
              >
                <FecharIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Resumo Rápido da Proposta no Topo do Chat */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex justify-between items-center">
                <div>
                  <span className="text-white/50 block text-[11px]">Cachê Atual</span>
                  <span className="font-extrabold text-white">{activeDrawerProposal.budgetFormatted}</span>
                </div>
                <div className="text-right">
                  <span className="text-white/50 block text-[11px]">Sinal (50%)</span>
                  <span className="font-bold text-emerald-400">R$ {activeDrawerProposal.depositAmount.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              {/* Ações contextuais de fechamento no Drawer */}
              {(activeDrawerProposal.status === 'aprovada' || activeDrawerProposal.status === 'aguardando_pagamento') && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const tx = databaseService.getTransactionByBookingId(activeDrawerProposal.id);
                      if (tx) {
                        setTransactionModalItem({ proposal: activeDrawerProposal, transaction: tx });
                      }
                    }}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#00D1FF] flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <DocumentoIcon className="w-3.5 h-3.5" />
                    <span>Ver Contrato Digital</span>
                  </button>
                  <Link 
                    href="/dashboard/agenda"
                    className="py-1.5 px-2.5 rounded-lg bg-[#8A3FFC]/15 hover:bg-[#8A3FFC]/25 border border-[#8A3FFC]/30 text-[11px] text-purple-200 flex items-center justify-center gap-1.5 transition"
                  >
                    <AgendaIcon className="w-3.5 h-3.5" />
                    <span>Ver Agenda</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {(chatThreads[activeDrawerProposal.id] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl text-xs max-w-[85%] ${
                    msg.fromMe
                      ? 'ml-auto bg-[#8A3FFC]/25 border border-[#8A3FFC]/40 text-white'
                      : 'mr-auto bg-white/5 border border-white/10 text-white/90'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[10px] text-white/40 block text-right mt-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input de Envio */}
            <div className="pt-3 border-t border-white/10 flex gap-2">
              <label htmlFor="drawer-chat-message-input" className="sr-only">
                Escreva sua mensagem para o contratante
              </label>
              <input
                id="drawer-chat-message-input"
                type="text"
                value={chatMessageInput}
                onChange={(e) => setChatMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(activeDrawerProposal.id)}
                placeholder="Escreva sua mensagem..."
                aria-label="Escreva sua mensagem para o contratante"
                className="flex-1 h-11 bg-white/5 border border-white/10 rounded-xl px-3.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#100D22] focus:border-[#8A3FFC] transition-all"
              />
              <Button
                type="button"
                aria-label="Enviar mensagem para o contratante"
                onClick={() => handleSendMessage(activeDrawerProposal.id)}
                className="h-11 px-4 bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white rounded-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONTRAPROPOSTA */}
      {counterOfferModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#120F24] border border-white/20 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setCounterOfferModalItem(null)}
              aria-label="Fechar modal de contraproposta"
              className="absolute top-5 right-5 text-white/40 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A3FFC]"
            >
              <FecharIcon className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A3FFC]">
                Ajuste de Proposta
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Enviar Contraproposta para {counterOfferModalItem.client}
              </h3>
              <p className="text-xs text-white/60 mt-1">
                {counterOfferModalItem.eventName} • Proposta original: {counterOfferModalItem.budgetFormatted}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="counter-budget-input" className="text-xs font-semibold text-white/70 block mb-1.5">
                  Novo Cachê Proposto (R$)
                </label>
                <input
                  id="counter-budget-input"
                  type="text"
                  value={counterBudgetInput}
                  onChange={(e) => setCounterBudgetInput(e.target.value)}
                  aria-describedby="counter-budget-hint"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#120F24] focus:border-[#8A3FFC] transition-all"
                />
                <span id="counter-budget-hint" className="text-[11px] text-white/40 block mt-1">
                  O sinal de 50% será automaticamente recalculado para <strong>R$ {Math.round((parseFloat(counterBudgetInput) || 0) * 0.5).toLocaleString('pt-BR')}</strong>.
                </span>
              </div>

              <div>
                <label htmlFor="counter-duration-input" className="text-xs font-semibold text-white/70 block mb-1.5">
                  Duração Estimada do Set (horas)
                </label>
                <input
                  id="counter-duration-input"
                  type="number"
                  min="1"
                  max="12"
                  value={counterDurationInput}
                  onChange={(e) => setCounterDurationInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#120F24] focus:border-[#8A3FFC] transition-all"
                />
              </div>

              <div>
                <label htmlFor="counter-notes-input" className="text-xs font-semibold text-white/70 block mb-1.5">
                  Mensagem para o Contratante
                </label>
                <textarea
                  id="counter-notes-input"
                  rows={3}
                  value={counterNotesInput}
                  onChange={(e) => setCounterNotesInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#120F24] focus:border-[#8A3FFC] transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setCounterOfferModalItem(null)}
                className="bg-white/5 border-white/10 text-white text-xs h-10 px-4 rounded-xl cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmCounterOffer}
                className="bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white font-bold text-xs h-10 px-5 rounded-xl cursor-pointer"
              >
                Enviar Contraproposta
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONTRATO GERADO E 50% DE SINAL */}
      {transactionModalItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#100D22] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setTransactionModalItem(null)}
              className="absolute top-5 right-5 text-white/40 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <FecharIcon className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <SucessoIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Data Reservada & Contrato Pronto</h3>
              <p className="text-xs text-white/60">
                A data para {transactionModalItem.proposal.eventName} foi reservada na sua agenda.
              </p>
            </div>

            {/* Resumo Financeiro */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Cachê Total Acordado:</span>
                <span className="font-bold text-white">R$ {transactionModalItem.transaction.amount_total.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Sinal de 50% (Garantia de Reserva):</span>
                <span className="font-bold text-emerald-400">R$ {transactionModalItem.transaction.deposit_amount.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-white/70 pt-2 border-t border-white/5">
                <span>Status do Pagamento:</span>
                <span className="font-bold text-amber-300 uppercase text-[10px]">
                  {transactionModalItem.transaction.payment_status === 'pago' ? 'Confirmado' : 'Aguardando Pagamento'}
                </span>
              </div>
            </div>

            {/* Link de Pagamento para Enviar ao Contratante */}
            <div className="space-y-2">
              <label htmlFor="pix-payment-link-input" className="text-xs font-semibold text-white/70 block">
                Link de Pagamento do Sinal (50%)
              </label>
              <div className="flex gap-2">
                <input
                  id="pix-payment-link-input"
                  type="text"
                  readOnly
                  aria-label="Link de pagamento do sinal de 50% para compartilhar com o contratante"
                  value={`https://pay.beatflow.art/sinal_${transactionModalItem.proposal.id}`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 text-xs font-mono text-white/80 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:ring-offset-2 focus:ring-offset-[#100D22] focus:border-[#8A3FFC] transition-all select-all"
                />
                <Button
                  type="button"
                  aria-label="Copiar link de pagamento"
                  onClick={() => handleCopyPayment(`https://pay.beatflow.art/sinal_${transactionModalItem.proposal.id}`)}
                  className="bg-white/10 hover:bg-white/15 text-white text-xs h-10 px-3 rounded-xl flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
                >
                  {copiedPaymentLink ? <SucessoIcon className="w-3.5 h-3.5 text-emerald-400" /> : <CopiarIcon className="w-3.5 h-3.5" />}
                  <span>{copiedPaymentLink ? 'Copiado!' : 'Copiar'}</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={() => setTransactionModalItem(null)}
                className="bg-white/5 border-white/10 text-white text-xs h-10 px-4 rounded-xl cursor-pointer"
              >
                Fechar
              </Button>
              <Link href="/dashboard/agenda">
                <Button className="bg-gradient-to-r from-[#8A3FFC] to-[#00D1FF] text-white font-bold text-xs h-10 px-5 rounded-xl cursor-pointer">
                  Ver Agenda Atualizada
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
