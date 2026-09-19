'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Disc3 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080F] text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto shadow-inner">
          <Disc3 className="w-8 h-8 animate-spin" />
        </div>

        <div>
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
            Link Não Registrado
          </span>
          <h1 className="text-2xl font-black text-white">Este endereço está livre!</h1>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            O perfil que você tentou acessar ainda não foi criado. Garanta seu nome artístico antes que outro DJ registre.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link href="/login?mode=signup">
            <button className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-purple-600/30">
              <Sparkles className="w-4 h-4" />
              <span>Criar Meu Perfil Grátis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

          <Link href="/">
            <button className="w-full h-11 rounded-xl border border-zinc-700 bg-zinc-800/40 text-zinc-300 hover:text-white text-xs font-medium transition-colors">
              Ir para a Página Inicial
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}