'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Music2, Lock, Sparkles, UserCheck, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
// Ajuste o import do Logo se necessário
import { Logo } from '@/components/ui/Logo'; 

export function ProtectedDashboardGuard({ children }: { children: React.ReactNode }) {
  // Conexão com o novo hook limpo do Firebase
  const { user, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derivando os estados necessários para a interface
  const isLoading = loading;
  const isAuthenticated = !!user; 
  
  const clearError = () => setError(null);

  const signInDemo = async (type: string) => {
    setError(`Login de demonstração (${type}) temporariamente desativado durante a migração para o Firebase.`);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    // Aqui entrará a lógica real do Firebase Auth: signInWithEmailAndPassword(auth, email, password)
    // Mensagem temporária para você saber que o botão está vivo
    setError("O Firebase foi conectado na base, mas a função de login por email precisa ser linkada.");
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div id="auth-loading-state" className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(138,63,252,0.3)]">
            <div className="flex items-end gap-1 h-6">
              <span className="w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s] h-6" />
              <span className="w-1 bg-tertiary rounded-full animate-bounce [animation-delay:-0.15s] h-4" />
              <span className="w-1 bg-secondary rounded-full animate-bounce h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-white">Sincronizando Sessão</h2>
            <p className="text-xs text-text-secondary">Verificando credenciais do DJ no Firebase Auth...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div id="auth-guard-restricted" className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-secondary/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8 flex flex-col items-center">
            <Logo />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-text-secondary mt-3">
              <Lock className="w-3 h-3 text-secondary" />
              Área Restrita do Artista
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/90 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3">
                <Music2 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">Acesso ao Dashboard</h1>
              <p className="text-sm text-text-secondary leading-relaxed">
                Faça login com sua conta de DJ para acessar seu painel de gigs, propostas e métricas.
              </p>
            </div>

            {error && (
              <div className="p-3 mb-5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={clearError} className="text-white/60 hover:text-white font-bold ml-2">×</button>
              </div>
            )}

            {!showDirectForm ? (
              <div className="flex flex-col gap-3">
                <button 
                  id="btn-demo-login-skyline"
                  className="w-full flex items-center justify-center gap-2 h-11 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(138,63,252,0.4)] text-sm font-medium"
                  onClick={() => signInDemo('skyline')}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  Entrar como DJ Skyline (Demonstração)
                </button>

                <button 
                  id="btn-demo-login-luna"
                  className="w-full flex items-center justify-center gap-2 h-11 px-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium"
                  onClick={() => signInDemo('luna')}
                >
                  <UserCheck className="w-4 h-4 text-tertiary" />
                  Entrar como Luna Martins
                </button>

                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-surface px-2 text-text-secondary font-semibold tracking-wider">ou credenciais</span>
                  </div>
                </div>

                <button
                  id="btn-show-email-login"
                  className="w-full flex items-center justify-center gap-2 h-11 px-8 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium"
                  onClick={() => setShowDirectForm(true)}
                >
                  <LogIn className="w-4 h-4" />
                  Entrar com E-mail e Senha
                </button>

                <div className="pt-2 text-center text-xs text-text-secondary">
                  Não possui cadastro?{' '}
                  <Link href="/login?mode=signup" className="text-primary hover:underline font-semibold">
                    Criar perfil de DJ
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">E-mail do DJ</label>
                  <input
                    id="input-auth-email"
                    type="email"
                    required
                    placeholder="seu@beatflow.art"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-text-secondary">Senha</label>
                  </div>
                  <input
                    id="input-auth-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary transition"
                  />
                </div>

                <button 
                  id="btn-submit-auth"
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full flex items-center justify-center gap-2 h-11 px-8 mt-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? 'Autenticando...' : 'Acessar Painel'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowDirectForm(false)}
                  className="text-xs text-text-secondary hover:text-white transition text-center mt-1"
                >
                  ← Voltar para opções rápidas
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-text-secondary">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />Firebase Auth Protected
              </span>
              <Link href="/" className="hover:text-white transition">
                Voltar à Página Inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard liberado
  return <>{children}</>;
}