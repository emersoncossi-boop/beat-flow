'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  RotateCcw, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Lock,
  Download,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { adminService, AdminTransactionRecord, AdminTransactionStatus } from '@/lib/admin-service';

interface TransactionsModuleProps {
  isDarkMode: boolean;
}

export function TransactionsModule({ isDarkMode }: TransactionsModuleProps) {
  const [transactions, setTransactions] = useState<AdminTransactionRecord[]>(() => adminService.getTransactions());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedTxId, setExpandedTxId] = useState<string | null>('tx-sec-901');

  // Double-Confirmation Refund Modal
  const [refundingTx, setRefundingTx] = useState<AdminTransactionRecord | null>(null);
  const [refundReason, setRefundReason] = useState('Cancelamento de evento comprovado por força maior');
  const [refundConfirmationInput, setRefundConfirmationInput] = useState('');
  const [refundError, setRefundError] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Contract PDF Audit Modal
  const [auditingTx, setAuditingTx] = useState<AdminTransactionRecord | null>(null);

  const filtered = transactions.filter(tx => {
    const matchesSearch = 
      tx.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.djName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleTriggerRefund = () => {
    if (!refundingTx) return;
    if (refundConfirmationInput.trim().toUpperCase() !== 'CONFIRMAR ESTORNO') {
      setRefundError('Por favor digite "CONFIRMAR ESTORNO" exatamente como indicado para validar.');
      return;
    }

    const updated = adminService.refundTransaction(refundingTx.id, refundReason);
    setTransactions(updated);
    setSuccessAlert(`Estorno de R$ ${refundingTx.depositAmount.toLocaleString('pt-BR')} aprovado e disparado no gateway Stripe/Mercado Pago para o contratante.`);
    setRefundingTx(null);
    setRefundConfirmationInput('');
    setRefundError(null);

    setTimeout(() => setSuccessAlert(null), 5000);
  };

  const renderStatusBadge = (status: AdminTransactionStatus) => {
    switch (status) {
      case 'aprovada':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-800 px-2 py-0.5 rounded-full font-mono">
            <CheckCircle2 className="w-3 h-3" /> Sinal em Custódia
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 dark:text-blue-400 dark:bg-blue-950/50 dark:border-blue-800 px-2 py-0.5 rounded-full font-mono">
            <CheckCircle2 className="w-3 h-3" /> Repasse Concluído
          </span>
        );
      case 'aguardando_pagamento':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 dark:text-amber-400 dark:bg-amber-950/50 dark:border-amber-800 px-2 py-0.5 rounded-full font-mono">
            <Clock className="w-3 h-3" /> Aguardando Gateway
          </span>
        );
      case 'em_negociacao':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700 px-2 py-0.5 rounded-full font-mono">
            <Clock className="w-3 h-3" /> Em Negociação
          </span>
        );
      case 'estornado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 dark:text-rose-400 dark:bg-rose-950/50 dark:border-rose-800 px-2 py-0.5 rounded-full font-mono">
            <RotateCcw className="w-3 h-3" /> Estornado / Refund
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner if any action occurred */}
      {successAlert && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{successAlert}</span>
          </div>
          <button onClick={() => setSuccessAlert(null)} className="font-bold text-emerald-800 hover:underline">
            Fechar
          </button>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Central de Transações, Custódia & Contratos
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Motor financeiro de split automático (Sinal 50% / Repasse 90% DJ / Lucro 10% Nexora) e auditoria de contratos.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por contratante ou DJ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full h-8 pl-8 pr-3 text-xs rounded-lg border focus:outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`h-8 px-2.5 text-xs rounded-lg border font-medium ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Todos os Status</option>
            <option value="aprovada">Aprovada (Custódia)</option>
            <option value="aguardando_pagamento">Aguardando Pagamento</option>
            <option value="em_negociacao">Em Negociação</option>
            <option value="concluido">Concluído</option>
            <option value="estornado">Estornado (Refund)</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className={`rounded-2xl border overflow-hidden transition ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b font-mono uppercase text-[10px] tracking-wider ${
                isDarkMode ? 'border-slate-800 bg-slate-900/80 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}>
                <th className="py-3 px-4">ID Transação / Evento</th>
                <th className="py-3 px-4">Contratante</th>
                <th className="py-3 px-4">DJ Contratado</th>
                <th className="py-3 px-4">Cachê Total</th>
                <th className="py-3 px-4">Sinal (50%)</th>
                <th className="py-3 px-4">Status Custódia</th>
                <th className="py-3 px-4 text-right">Ações de Segurança</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((tx) => {
                const isExpanded = expandedTxId === tx.id;

                return (
                  <React.Fragment key={tx.id}>
                    <tr className={`transition-colors ${
                      isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/70'
                    }`}>
                      {/* Event & ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedTxId(isExpanded ? null : tx.id)}
                            className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                            title="Expandir Split Financeiro"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {tx.eventName}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {tx.id} • {tx.eventDate} ({tx.eventLocation})
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contractor */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900 dark:text-slate-200">
                          {tx.contractorName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {tx.contractorEmail}
                        </div>
                      </td>

                      {/* DJ */}
                      <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                        {tx.djName}
                      </td>

                      {/* Total Budget */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        R$ {tx.totalBudget.toLocaleString('pt-BR')}
                      </td>

                      {/* Deposit 50% */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-200">
                        R$ {tx.depositAmount.toLocaleString('pt-BR')}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {renderStatusBadge(tx.status)}
                      </td>

                      {/* Financial Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Contract PDF Audit Button */}
                          <button
                            onClick={() => setAuditingTx(tx)}
                            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
                              isDarkMode 
                                ? 'border-slate-700 hover:bg-slate-800 text-slate-300' 
                                : 'border-slate-200 hover:bg-slate-100 text-slate-700 shadow-xs'
                            }`}
                            title="Auditar Contrato Digital PDF"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-500" />
                            <span className="hidden md:inline">Auditar PDF</span>
                          </button>

                          {/* Critical Refund Button */}
                          {tx.status !== 'estornado' ? (
                            <button
                              onClick={() => {
                                setRefundingTx(tx);
                                setRefundConfirmationInput('');
                                setRefundError(null);
                              }}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900 transition flex items-center gap-1"
                              title="Disparar Estorno / Reembolso"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span className="hidden sm:inline">Estorno</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono italic">
                              Estornado
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* ========================================================== */}
                    {/* EXPANDED ROW: VISUALIZAÇÃO DO SPLIT DE PAGAMENTO           */}
                    {/* ========================================================== */}
                    {isExpanded && (
                      <tr className={`${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50/80'}`}>
                        <td colSpan={7} className="p-4 border-t border-b border-slate-200 dark:border-slate-800">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                <CreditCard className="w-4 h-4 text-emerald-600" />
                                Detalhamento do Split Financeiro (Regra 50% Sinal na Custódia)
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                Gateway Ref: {tx.gatewayTransactionId}
                              </span>
                            </div>

                            {/* Split Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              {/* 1. Sinal Bruto */}
                              <div className={`p-3 rounded-xl border ${
                                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                              }`}>
                                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                                  Valor Bruto do Sinal (50%)
                                </div>
                                <div className="text-base font-bold text-slate-900 dark:text-white font-mono mt-1">
                                  R$ {tx.depositAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-[10px] text-slate-400">Retido no escrow Stripe</div>
                              </div>

                              {/* 2. Repasse Líquido DJ (90%) */}
                              <div className={`p-3 rounded-xl border ${
                                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                              }`}>
                                <div className="text-[10px] font-bold text-blue-500 uppercase font-mono">
                                  Repasse Líquido DJ (90%)
                                </div>
                                <div className="text-base font-bold text-blue-600 dark:text-blue-400 font-mono mt-1">
                                  R$ {tx.djNetPayout.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-[10px] text-slate-400">Liberado 24h pós-show</div>
                              </div>

                              {/* 3. Taxa Plataforma Nexora (10% Take Rate) [VERDE CORPORATIVO] */}
                              <div className={`p-3 rounded-xl border ${
                                isDarkMode 
                                  ? 'bg-emerald-950/20 border-emerald-800/60' 
                                  : 'bg-emerald-50 border-emerald-300 shadow-xs'
                              }`}>
                                <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase font-mono flex items-center justify-between">
                                  <span>Lucro Nexora (Take Rate 10%)</span>
                                  <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">LÍQUIDO</span>
                                </div>
                                <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 font-mono mt-1">
                                  + R$ {tx.platformTakeRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-[10px] text-emerald-700 dark:text-emerald-400">Margem líquida da plataforma</div>
                              </div>

                              {/* 4. Taxa Gateway (~2.9%) */}
                              <div className={`p-3 rounded-xl border ${
                                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                              }`}>
                                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                                  Taxa de Processamento (2.9%)
                                </div>
                                <div className="text-base font-bold text-slate-600 dark:text-slate-300 font-mono mt-1">
                                  R$ {tx.gatewayFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-[10px] text-slate-400">Absorvido pelo processador</div>
                              </div>
                            </div>

                            {/* Additional Escrow Release Timeline */}
                            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
                              <span className="flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                                <strong>Trava de Segurança:</strong> Saldo de R$ {tx.djNetPayout.toLocaleString('pt-BR')} sob custódia legal até 24h após o término do evento ({tx.eventDate}).
                              </span>
                              <span className="font-mono text-[11px]">
                                Hash do Contrato: <span className="text-slate-700 dark:text-slate-300 font-bold">{tx.contractHash}</span>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL: DISPARAR ESTORNO / REFUND (DUPLA CONFIRMAÇÃO CRÍTICA)         */}
      {/* ==================================================================== */}
      {refundingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl animate-scale-up ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-rose-600 dark:text-rose-400">
                  Disparo de Estorno Financeiro (Refund)
                </h3>
                <p className="text-xs text-slate-500">
                  Ação crítica e irreversível no gateway de pagamento
                </p>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border mb-4 space-y-1.5 text-xs ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex justify-between">
                <span>Evento / Contrato:</span>
                <strong className="text-slate-900 dark:text-white">{refundingTx.eventName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Contratante Beneficiário:</span>
                <strong className="text-slate-900 dark:text-white">{refundingTx.contractorName} ({refundingTx.contractorEmail})</strong>
              </div>
              <div className="flex justify-between">
                <span>Valor a Estornar:</span>
                <strong className="text-rose-600 dark:text-rose-400 font-mono text-sm font-extrabold">
                  R$ {refundingTx.depositAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Justificativa Legal do Estorno:
                </label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className={`w-full h-9 px-3 text-xs rounded-xl border font-medium ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Cancelamento de evento comprovado por força maior (decreto/interdição)">
                    Força Maior / Interdição de Local Comprovada
                  </option>
                  <option value="No-Show não justificado do artista DJ">
                    No-Show ou Falta do Artista DJ
                  </option>
                  <option value="Acordo mútuo formal entre contratante e DJ com termo assinado">
                    Acordo Mútuo Formal de Rescisão
                  </option>
                  <option value="Suspeita de fraude ou estorno bancário contestado (Chargeback)">
                    Fraude ou Contestação do Cartão
                  </option>
                </select>
              </div>

              {/* High Friction Confirmation Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Segurança Operacional: Digite <span className="font-mono text-rose-600 font-extrabold">&quot;CONFIRMAR ESTORNO&quot;</span> para habilitar o estorno:
                </label>
                <input
                  type="text"
                  placeholder="CONFIRMAR ESTORNO"
                  value={refundConfirmationInput}
                  onChange={(e) => {
                    setRefundConfirmationInput(e.target.value);
                    setRefundError(null);
                  }}
                  className={`w-full h-10 px-3 text-xs font-mono rounded-xl border tracking-wider font-bold ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-rose-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-rose-600'
                  }`}
                />
                {refundError && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold">{refundError}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRefundingTx(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                  isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={handleTriggerRefund}
                disabled={refundConfirmationInput.trim().toUpperCase() !== 'CONFIRMAR ESTORNO'}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              >
                Confirmar e Disparar Estorno Imediato
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: AUDITORIA DE CONTRATO PDF DIGITAL                            */}
      {/* ==================================================================== */}
      {auditingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl animate-scale-up ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Auditoria de Instrumento Particular de Prestação de Serviços Musicais
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Contrato ID: {auditingTx.bookingId} • Registro Criptográfico {auditingTx.contractHash}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAuditingTx(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Document Content Scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs leading-relaxed font-serif bg-slate-50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
              <div className="text-center pb-2 border-b border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white">
                  Contrato de Booking Artístico e Custódia Financeira
                </h4>
                <p className="text-[11px] text-slate-500 italic mt-0.5">
                  Intermediado pela Plataforma Nexora Tecnologia S.A. (Beat Flow)
                </p>
              </div>

              <p>
                <strong>DAS PARTES:</strong> De um lado, <strong>{auditingTx.contractorName}</strong> (doravante CONTRATANTE), e de outro lado, o artista <strong>{auditingTx.djName}</strong> (doravante CONTRATADO).
              </p>

              <p>
                <strong>CLÁUSULA 1ª — DO OBJETO E DATA:</strong> O CONTRATADO compromete-se a apresentar performance artística no evento <strong>&quot;{auditingTx.eventName}&quot;</strong>, agendado para a data de <strong>{auditingTx.eventDate}</strong>, na cidade de <strong>{auditingTx.eventLocation}</strong>.
              </p>

              <p>
                <strong>CLÁUSULA 2ª — DOS VALORES E SINAL EM ESCROW:</strong> O cachê total acordado é de <strong>R$ {auditingTx.totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>, sendo obrigatório o pagamento prévio de 50% de sinal no montante de <strong>R$ {auditingTx.depositAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>, mantido em conta de custódia judicial/garantia pela plataforma Nexora.
              </p>

              <p>
                <strong>CLÁUSULA 3ª — DO REPASSE E TAXA:</strong> A Nexora deduzirá taxa de intermediação de 10% (R$ {auditingTx.platformTakeRevenue.toLocaleString('pt-BR')}) do sinal, liberando o valor líquido de R$ {auditingTx.djNetPayout.toLocaleString('pt-BR')} ao CONTRATADO em até 24 horas úteis após a conclusão do evento sem intercorrências.
              </p>

              <p>
                <strong>CLÁUSULA 4ª — DO RIDER TÉCNICO E CONDUTA:</strong> O CONTRATANTE obriga-se a disponibilizar equipamento compatível com o Technical Rider anexo (Pioneer CDJ-3000 / Mixer DJM-A9 com monitores aterrados).
              </p>

              <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-700 text-[11px] font-mono space-y-1">
                <div><strong>Assinatura Digital Contratante:</strong> {auditingTx.contractorEmail} (IP validado via OTP)</div>
                <div><strong>Assinatura Digital Artista:</strong> {auditingTx.djName} (Certificado Beat Flow)</div>
                <div><strong>Carimbo de Tempo ICP-Brasil:</strong> {auditingTx.createdAt}</div>
                <div><strong>Status no Ledger:</strong> CONTRATO VÁLIDO E EXECUTÁVEL</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Autenticidade garantida por SHA-256
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuditingTx(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Fechar Auditoria
                </button>
                <a
                  href={auditingTx.contractPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF Assinado</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
