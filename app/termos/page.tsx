import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: "Termos de Uso — Beat Flow",
  description: "Termos e condições gerais de uso da plataforma Beat Flow by NEXORA.",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#08080F] text-white py-16 px-6 sm:px-12 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao início</span>
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">Termos de Uso</h1>
          <p className="text-xs text-zinc-500">Última atualização: Setembro de 2026</p>
        </div>
      </div>

      <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Objeto e Aceitação</h2>
          <p>
            O <strong>Beat Flow by NEXORA</strong> é uma plataforma digital que conecta DJs, produtores musicais e artistas a contratantes e fãs, fornecendo ferramentas de exibição de Press Kit, portfólio de áudio, agenda e gestão de propostas de booking. Ao acessar ou criar uma conta na plataforma, você concorda integralmente com estes Termos de Uso.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Cadastro e Responsabilidade pelo Conteúdo</h2>
          <p>
            O artista é o único responsável pela veracidade dos dados informados em seu perfil público, incluindo nome artístico, fotos, vídeos, faixas de áudio e informações de rider técnico. É estritamente proibido o upload de materiais que violem direitos autorais ou propriedade intelectual de terceiros.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Contratações e Transações</h2>
          <p>
            O Beat Flow atua como facilitador tecnológico entre contratantes e artistas. A negociação de cachês, horários de apresentação e cumprimento de contratos de shows são de responsabilidade direta entre as partes envolvidas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Planos e Assinaturas</h2>
          <p>
            A plataforma disponibiliza planos gratuitos e assinaturas pagas (Planos Pro e Agency). O cancelamento pode ser solicitado a qualquer momento diretamente pelo painel de controle do usuário.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Contato</h2>
          <p>
            Em caso de dúvidas sobre estes termos, entre em contato através do e-mail oficial: <strong>suporte@beatflow.com.br</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}