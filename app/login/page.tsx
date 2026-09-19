'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { ArrowLeft, LogIn, UserPlus, Sparkles, AlertCircle, Fingerprint, ShieldCheck } from 'lucide-react';
import { isBiometricAvailable, authenticateWithBiometrics } from '@/lib/biometric-auth';

function LoginForm() {
  const { signIn, signUp, isAuthenticated, isLoading: authLoading, error: authError, clearError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawHandle = (searchParams?.get('handle') || searchParams?.get('claimSlug') || '').trim();
  const initialMode = (searchParams?.get('mode') === 'signup' || Boolean(rawHandle)) ? 'signup' : 'login';

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState(() => {
    if (rawHandle) {
      return rawHandle.replace(/[-_.]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return '';
  });
  const [email, setEmail] = useState('emerson.cossi@gmail.com');
  const [password, setPassword] = useState('123456');
  const [city, setCity] = useState('SÃ£o Paulo - SP');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [hasBiometrics, setHasBiometrics] = useState<boolean>(false);
  const [biometricLoading, setBiometricLoading] = useState<boolean>(false);

  useEffect(() => {
    isBiometricAvailable().then(setHasBiometrics);
  }, []);

  const handleSwitchMode = (nextMode: 'login' | 'signup') => {
    setMode(nextMode);
    setLocalError(null);
    clearError?.();
  };

  const handleBiometricAuth = async () => {
    setBiometricLoading(true);
    setLocalError(null);
    try {
      const result = await authenticateWithBiometrics();
      if (result.success) {
        // Log in immediately
        await signIn(email || 'emerson.cossi@gmail.com', 'biometric_token');
        router.push('/dashboard');
      } else {
        setLocalError('Biometria cancelada ou nÃ£o reconhecida. Digite sua senha.');
      }
    } catch (err: any) {
      setLocalError(err.message || 'Erro ao autenticar com biometria.');
    } finally {
      setBiometricLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError?.();

    if (!email || !password) {
      setLocalError('Preencha seu e-mail e senha.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        const res = await signIn(email, password);
        if (res && res.success) {
          router.push('/dashboard');
        } else {
          setLocalError(res?.error || 'Credenciais invÃ¡lidas. Tente novamente.');
        }
      } else {
        if (!name) {
          setLocalError('Informe seu nome artÃ­stico.');
          setIsSubmitting(false);
          return;
        }
        const res = await signUp(email, password, name, city || 'SÃ£o Paulo - SP');
        if (res && res.success) {
          router.push('/dashboard');
        } else {
          setLocalError(res?.error || 'Erro ao criar conta.');
        }
      }
    } catch (err: any) {
      setLocalError(err?.message || 'Ocorreu um erro ao entrar no painel.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-[#0C0E14]/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
      
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <Logo />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white">
          {mode === 'login' ? 'Acessar seu Painel' : 'Criar seu Perfil Oficial'}
        </h2>
        <p className="text-xs text-white/50">
          {mode === 'login' 
            ? 'Gerencie sua agenda, rider tÃ©cnico e propostas de shows.' 
            : 'Junte-se Ã  nova geraÃ§Ã£o de DJs com palco digital inteligente.'}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
        <button
          type="button"
          onClick={() => handleSwitchMode('login')}
          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mode === 'login'
              ? 'bg-white text-black shadow-md'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => handleSwitchMode('signup')}
          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mode === 'signup'
              ? 'bg-white text-black shadow-md'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Criar Conta
        </button>
      </div>

      {/* Biometric One-Tap Quick Access */}
      <button
        type="button"
        onClick={handleBiometricAuth}
        disabled={biometricLoading}
        className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer"
      >
        <Fingerprint className="w-4 h-4 text-emerald-400" />
        <span>{biometricLoading ? 'Validando Biometria...' : 'Acesso RÃ¡pido com Digital / Face ID'}</span>
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-[10px] text-white/40 uppercase font-mono">ou com e-mail</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      {localError && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{localError}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {mode === 'signup' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70">Nome ArtÃ­stico / DJ</label>
              <input
                type="text"
                required
                placeholder="Ex: DJ Alok / Sara Bloom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70">Cidade Base</label>
              <input
                type="text"
                placeholder="Ex: SÃ£o Paulo - SP"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
              />
            </div>
          </>
        )}

        <div className="space-y-1">
          <label className="text-xs font-mono text-white/70">E-mail Profissional</label>
          <input
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-white/70">Senha</label>
          <input
            type="password"
            required
            placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-2xl bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-white/90 active:scale-95 transition-all shadow-xl cursor-pointer"
        >
          {isSubmitting ? 'Acessando...' : (mode === 'login' ? 'Entrar no Painel' : 'Criar Perfil e Continuar')}
        </button>
      </form>

      <div className="text-center pt-2">
        <Link href="/" className="text-xs text-white/40 hover:text-white transition-colors">
          â† Voltar para a PÃ¡gina Inicial
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#07090E] flex items-center justify-center p-4 relative">
      <Suspense fallback={<div className="text-white text-xs">Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}