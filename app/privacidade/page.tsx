import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export const metadata = {
  title: "Política de Privacidade — Beat Flow",
  description: "Política de privacidade e proteção de dados (LGPD) do Beat Flow.",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#08080F] text-white py-16 px-6 sm:px-12 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao início</span>
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">Política de Privacidade</h1>
          <p className="text-xs text-zinc-500">Conformidade com a LGPD (Lei 13.709/2018)</p>
        </div>
      </div>

      <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Coleta e Uso de Dados</h2>
          <p>
            Coletamos apenas as informações necessárias para prestar nossos serviços: nome de usuário, e-mail de contato, nome artístico, fotos de divulgação, faixas de áudio e informações de agenda cadastradas voluntariamente pelo usuário.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Segurança e Armazenamento</h2>
          <p>
            Seus dados são armazenados em servidores criptografados e protegidos por autenticação de múltiplos fatores e regras de segurança rígidas. Não vendemos nem compartilhamos seus dados pessoais com terceiros.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Seus Direitos e Exclusão de Conta (LGPD e Apple Compliance)</h2>
          <p>
            Em conformidade com a LGPD e as diretrizes da Apple App Store e Google Play, você tem total controle sobre seus dados. A qualquer momento, você pode solicitar a exportação ou a <strong>exclusão definitiva de sua conta e todos os dados associados</strong> diretamente no painel do usuário ou pelo e-mail <strong>privacidade@beatflow.com.br</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Cookies e Métricas</h2>
          <p>
            Utilizamos cookies essenciais para manter sua sessão conectada com segurança e métricas anônimas de visualizações do perfil do artista.
          </p>
        </section>
      </div>
    </div>
  );
}