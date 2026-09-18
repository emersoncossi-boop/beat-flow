'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Save, 
  CheckCircle2, 
  Key, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Percent, 
  ShieldCheck, 
  Sparkles, 
  DollarSign, 
  History, 
  Lock,
  RefreshCw
} from 'lucide-react';
import { adminService, PlatformGlobalSettings } from '@/lib/admin-service';

interface GlobalSettingsModuleProps {
  isDarkMode: boolean;
}

export function GlobalSettingsModule({ isDarkMode }: GlobalSettingsModuleProps) {
  const [settings, setSettings] = useState<PlatformGlobalSettings>(() => adminService.getSettings());
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [simulatedGross, setSimulatedGross] = useState(5000);

  const toggleShowKey = (keyName: string) => {
    setShowKeys(prev => ({ ...prev, [keyName]: !prev[keyName] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = adminService.updateSettings(settings);
    setSettings(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  // Live Simulator calculation
  const simulatedDeposit = simulatedGross * (settings.depositPercentage / 100);
  const simulatedTake = simulatedDeposit * (settings.takeRatePercentage / 100);
  const simulatedDjNet = simulatedDeposit - simulatedTake;

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            Configurações Globais & Parametrização da Plataforma
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Parametrize regras financeiras, precificação de planos SaaS e credenciais de gateways sem re-deploy de código.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Alterações Gravadas com Sucesso!
            </span>
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Todas as Configurações</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION 1: REGRAS FINANCEIRAS & TAKE RATE (COM SIMULADOR)             */}
      {/* ==================================================================== */}
      <div className={`p-6 rounded-2xl border transition ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Percent className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. Taxas de Intermediação & Escrow (Take Rate da Plataforma)
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Comissão Padrão Nexora (Take Rate %):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="50"
                  value={settings.takeRatePercentage}
                  onChange={(e) => setSettings({ ...settings, takeRatePercentage: parseFloat(e.target.value) || 0 })}
                  className={`w-32 h-10 px-3 text-sm font-mono font-bold rounded-xl border focus:outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="0.5"
                  value={settings.takeRatePercentage}
                  onChange={(e) => setSettings({ ...settings, takeRatePercentage: parseFloat(e.target.value) })}
                  className="flex-1 accent-emerald-600"
                />
                <span className="text-xs font-mono font-bold text-emerald-600">
                  {settings.takeRatePercentage}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Percentual deduzido sobre o valor do sinal retido em custódia.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Sinal Obrigatório em Custódia (% do Cachê Total):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="5"
                  min="20"
                  max="100"
                  value={settings.depositPercentage}
                  onChange={(e) => setSettings({ ...settings, depositPercentage: parseInt(e.target.value) || 50 })}
                  className={`w-32 h-10 px-3 text-sm font-mono font-bold rounded-xl border focus:outline-none ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <span className="text-xs text-slate-500">
                  Trava de segurança que impede double booking na agenda.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Janela de Liberação do Saldo pós-evento (Horas):
              </label>
              <input
                type="number"
                min="0"
                max="72"
                value={settings.escrowReleaseHours}
                onChange={(e) => setSettings({ ...settings, escrowReleaseHours: parseInt(e.target.value) || 24 })}
                className={`w-32 h-10 px-3 text-sm font-mono font-bold rounded-xl border focus:outline-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Período para o contratante registrar contestação ou no-show antes da liberação ao DJ.
              </p>
            </div>
          </div>

          {/* Simulator Visualizer Column */}
          <div className="lg:col-span-6">
            <div className={`p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-emerald-950/20 border-emerald-800/40' 
                : 'bg-emerald-50/60 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Simulador de Margem em Tempo Real
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  Preview Ao Vivo
                </span>
              </div>

              <div className="mb-4">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Exemplo de Cachê de Evento (R$):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1000"
                    max="30000"
                    step="500"
                    value={simulatedGross}
                    onChange={(e) => setSimulatedGross(parseInt(e.target.value))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="text-xs font-mono font-bold w-24 text-right">
                    R$ {simulatedGross.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-emerald-200 dark:border-emerald-800/60">
                <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60">
                  <div className="text-[9px] uppercase font-mono text-slate-500 font-bold">
                    Sinal Custódia ({50}%)
                  </div>
                  <div className="text-xs font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                    R$ {simulatedDeposit.toLocaleString('pt-BR')}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60">
                  <div className="text-[9px] uppercase font-mono text-blue-600 font-bold">
                    Líquido DJ
                  </div>
                  <div className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                    R$ {simulatedDjNet.toLocaleString('pt-BR')}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-emerald-600 text-white">
                  <div className="text-[9px] uppercase font-mono text-emerald-100 font-bold">
                    Lucro Nexora
                  </div>
                  <div className="text-xs font-extrabold font-mono mt-0.5">
                    + R$ {simulatedTake.toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION 2: PRECIFICAÇÃO DOS PLANOS SAAS (SEM HARDCODE)               */}
      {/* ==================================================================== */}
      <div className={`p-6 rounded-2xl border transition ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <CreditCard className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            2. Valores dos Planos de Assinatura dos DJs (SaaS)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Plan Free */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase font-mono text-slate-500">Plano Free</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700">Entrada</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
              R$ 0,00 / mês
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              Perfil básico, 1 áudio SoundCloud, limite de 2 propostas/mês.
            </p>
          </div>

          {/* Plan PRO */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase font-mono text-emerald-600">Plano PRO</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Mais Popular</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">Preço Mensal (R$):</label>
                <input
                  type="number"
                  step="1"
                  value={settings.planPricing.proMonthly}
                  onChange={(e) => setSettings({ ...settings, planPricing: { ...settings.planPricing, proMonthly: parseFloat(e.target.value) || 0 } })}
                  className={`w-full h-9 px-3 text-xs font-mono font-bold rounded-lg border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">Preço Anual com Desconto (R$):</label>
                <input
                  type="number"
                  step="1"
                  value={settings.planPricing.proYearly}
                  onChange={(e) => setSettings({ ...settings, planPricing: { ...settings.planPricing, proYearly: parseFloat(e.target.value) || 0 } })}
                  className={`w-full h-9 px-3 text-xs font-mono font-bold rounded-lg border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Plan Elite */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase font-mono text-purple-600">Plano Elite</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">Agências & Top Tier</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">Preço Mensal (R$):</label>
                <input
                  type="number"
                  step="1"
                  value={settings.planPricing.eliteMonthly}
                  onChange={(e) => setSettings({ ...settings, planPricing: { ...settings.planPricing, eliteMonthly: parseFloat(e.target.value) || 0 } })}
                  className={`w-full h-9 px-3 text-xs font-mono font-bold rounded-lg border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">Preço Anual com Desconto (R$):</label>
                <input
                  type="number"
                  step="1"
                  value={settings.planPricing.eliteYearly}
                  onChange={(e) => setSettings({ ...settings, planPricing: { ...settings.planPricing, eliteYearly: parseFloat(e.target.value) || 0 } })}
                  className={`w-full h-9 px-3 text-xs font-mono font-bold rounded-lg border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION 3: CHAVES DE INTEGRAÇÃO / API KEYS (MASKED INPUTS)           */}
      {/* ==================================================================== */}
      <div className={`p-6 rounded-2xl border transition ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              3. Chaves de APIs & Gateways Financeiros
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-500" /> Criptografia AES-256 no Repositório
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stripe Secret Key */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Stripe Secret Key (Produção):
            </label>
            <div className="relative">
              <input
                type={showKeys['stripeKey'] ? 'text' : 'password'}
                value={settings.apiKeys.stripeSecretKey}
                onChange={(e) => setSettings({ ...settings, apiKeys: { ...settings.apiKeys, stripeSecretKey: e.target.value } })}
                className={`w-full h-9 pl-3 pr-10 text-xs font-mono rounded-lg border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="button"
                onClick={() => toggleShowKey('stripeKey')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                {showKeys['stripeKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[10px] text-emerald-600 font-mono mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Webhook: escutando live_charge_succeeded
            </div>
          </div>

          {/* Mercado Pago Token */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Mercado Pago Access Token (PIX Instantâneo):
            </label>
            <div className="relative">
              <input
                type={showKeys['mpKey'] ? 'text' : 'password'}
                value={settings.apiKeys.mercadoPagoAccessToken}
                onChange={(e) => setSettings({ ...settings, apiKeys: { ...settings.apiKeys, mercadoPagoAccessToken: e.target.value } })}
                className={`w-full h-9 pl-3 pr-10 text-xs font-mono rounded-lg border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="button"
                onClick={() => toggleShowKey('mpKey')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                {showKeys['mpKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[10px] text-emerald-600 font-mono mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Chave PIX Dinâmica ativa
            </div>
          </div>

          {/* OpenAI Key */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              OpenAI API Key (Geração de Bio & Press Kit):
            </label>
            <div className="relative">
              <input
                type={showKeys['openAiKey'] ? 'text' : 'password'}
                value={settings.apiKeys.openAiGeminiApiKey}
                onChange={(e) => setSettings({ ...settings, apiKeys: { ...settings.apiKeys, openAiGeminiApiKey: e.target.value } })}
                className={`w-full h-9 pl-3 pr-10 text-xs font-mono rounded-lg border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="button"
                onClick={() => toggleShowKey('openAiKey')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                {showKeys['openAiKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Gemini Key */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Google Gemini API Key (Recomendação & Matchmaking):
            </label>
            <div className="relative">
              <input
                type={showKeys['geminiKey'] ? 'text' : 'password'}
                value={settings.apiKeys.openAiGeminiApiKey}
                onChange={(e) => setSettings({ ...settings, apiKeys: { ...settings.apiKeys, openAiGeminiApiKey: e.target.value } })}
                className={`w-full h-9 pl-3 pr-10 text-xs font-mono rounded-lg border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="button"
                onClick={() => toggleShowKey('geminiKey')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                {showKeys['geminiKey'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Footer */}
      <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          <span>
            Última alteração gravada por <strong>{settings.lastUpdatedBy}</strong> em <strong>{settings.lastUpdatedAt}</strong>.
          </span>
        </div>
        <span className="font-mono text-[11px] text-emerald-600 font-bold">
          Configuração Sincronizada
        </span>
      </div>
    </form>
  );
}
