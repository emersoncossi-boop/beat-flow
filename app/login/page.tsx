'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/ui/Logo';
import { 
  ArrowLeft, 
  LogIn, 
  UserPlus, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Fingerprint, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { isBiometricAvailable, authenticateWithBiometrics } from '@/lib/biometric-auth';

function LoginForm() {
  const { signIn, signUp, updateDJProfile } = useAuth();
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
  const [city, setCity] = useState('São Paulo - SP');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [hasBiometrics, setHasBiometrics] = useState<boolean>(false);
  const [biometricLoading, setBiometricLoading] = useState<boolean>(false);

  useEffect(() => {
    isBiometricAvailable().then(setHasBiometrics);
  }, []);

  const handleSwitchMode = (nextMode: 'login' | 'signup') => {
    setMode(nextMode);
    setLocalError(null);
    setAuthStatus('idle');
    setStatusMessage(null);
  };

  const handleBiometricAuth = async () => {
    setBiometricLoading(true);
    setLocalError(null);
    setAuthStatus('validating');
    setStatusMessage('Lendo identificação biométrica...');
    try {
      const result = await authenticateWithBiometrics();
      if (result.success) {
        setStatusMessage('Biometria confirmada! Entrando no painel...');
        setAuthStatus('success');
        await signIn(email || 'emerson.cossi@gmail.com', 'biometric_token');
        setTimeout(() => {
          router.push('/dashboard');
        }, 400);
      } else {
        setAuthStatus('error');
        setLocalError('Biometria cancelada ou não reconhecida. Digite sua senha.');
      }
    } catch (err: any) {
      setAuthStatus('error');
      setLocalError(err.message || 'Erro ao autenticar com biometria.');
    } finally {
      setBiometricLoading(false);
    }
  };

  const handleQuickDemoUser = async (demoKey: string) => {
    setIsSubmitting(true);
    setAuthStatus('validating');
    setStatusMessage('Carregando credenciais do DJ demo...');
    setLocalError(null);

    try {
      if (demoKey === 'emerson') {
        await signIn('emerson.cossi@gmail.com', '123456');
        await updateDJProfile({
          artisticName: 'Emerson Cossi',
          slug: 'emerson-cossi',
          city: 'São Paulo - SP',
          genres: ['Afro House', 'Deep Tech'],
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'
        });
      } else if (demoKey === 'camila') {
        await signIn('camila@beatflow.art', '123456');
        await updateDJProfile({
          artisticName: 'CAMILA',
          slug: 'camila',
          city: 'São Paulo - SP',
          genres: ['Afro House · Deep Tech'],
          avatarUrl: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=600&auto=format&fit=crop'
        });
      } else if (demoKey === 'sara') {
        await signIn('sara@beatflow.art', '123456');
        await updateDJProfile({
          artisticName: 'SARA',
          slug: 'sara',
          city: 'Florianópolis - SC',
          genres: ['Organic House · Sunset Sessions'],
          avatarUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop'
        });
      } else if (demoKey === 'luna') {
        await signIn('luna@beatflow.art', '123456');
        await updateDJProfile({
          artisticName: 'LUNA BLOOM',
          slug: 'luna',
          city: 'Curitiba - PR',
          genres: ['Melodic Techno · Progressive'],
          avatarUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop'
        });
      }

      setAuthStatus('success');
      setStatusMessage('Autenticação demo concluída! Acessando...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 350);
    } catch (err: any) {
      setAuthStatus('error');
      setLocalError('Não foi possível carregar o perfil de teste.');
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setStatusMessage(null);

    // 1. Client-Side Input Validations
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      setAuthStatus('error');
      setLocalError('Por favor, informe seu e-mail profissional.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setAuthStatus('error');
      setLocalError('Insira um formato de e-mail válido (exemplo: seu@email.com).');
      return;
    }

    if (!cleanPassword) {
      setAuthStatus('error');
      setLocalError('Por favor, informe sua senha de acesso.');
      return;
    }

    if (cleanPassword.length < 6) {
      setAuthStatus('error');
      setLocalError('A senha de acesso deve conter no mínimo 6 caracteres.');
      return;
    }

    if (mode === 'signup') {
      const cleanName = name.trim();
      if (!cleanName || cleanName.length < 2) {
        setAuthStatus('error');
        setLocalError('Informe seu nome artístico ou identidade como DJ.');
        return;
      }
    }

    // 2. Submission & Status Tracking
    setIsSubmitting(true);
    setAuthStatus('validating');
    setStatusMessage(
      mode === 'login'
        ? 'Validando e-mail e credenciais de acesso...'
        : 'Criando sua conta e provisionando o palco digital...'
    );

    try {
      if (mode === 'login') {
        const res = await signIn(cleanEmail, cleanPassword);
        if (res && res.success) {
          setAuthStatus('success');
          setStatusMessage('Login efetuado com sucesso! Redirecionando para o painel...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 450);
        } else {
          setAuthStatus('error');
          setLocalError(res?.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
          setIsSubmitting(false);
        }
      } else {
        const res = await signUp(cleanEmail, cleanPassword, name.trim(), city.trim() || 'São Paulo - SP');
        if (res && res.success) {
          setAuthStatus('success');
          setStatusMessage('Perfil registrado com sucesso! Entrando no painel...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 450);
        } else {
          setAuthStatus('error');
          setLocalError(res?.error || 'Erro ao registrar conta. Tente novamente.');
          setIsSubmitting(false);
        }
      }
    } catch (err: any) {
      setAuthStatus('error');
      setLocalError(err?.message || 'Ocorreu um erro ao conectar ao servidor de autenticação.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0C0E14]/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-5">
      
      <div className="text-center space-y-1.5">
        <div className="flex justify-center mb-1">
          <Logo />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white">
          {mode === 'login' ? 'Acessar seu Painel' : 'Criar seu Perfil Oficial'}
        </h2>
        <p className="text-xs text-white/50">
          {mode === 'login' 
            ? 'Gerencie sua agenda, rider técnico e propostas de shows.' 
            : 'Junte-se à nova geração de DJs com palco digital inteligente.'}
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
        disabled={biometricLoading || isSubmitting}
        className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer disabled:opacity-50"
      >
        <Fingerprint className="w-4 h-4 text-emerald-400" />
        <span>{biometricLoading ? 'Validando Biometria...' : 'Acesso Rápido com Digital / Face ID'}</span>
      </button>

      {/* 1-CLICK DEMO USERS NAVIGATOR */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
        <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
          <span className="font-bold flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[#00D1FF]" />
            <span>USUÁRIOS DEMO (1-CLIQUE):</span>
          </span>
          <span className="text-emerald-400 font-bold">PRONTO</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickDemoUser('emerson')}
            disabled={isSubmitting}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition cursor-pointer disabled:opacity-50"
          >
            <div className="text-xs font-bold text-white truncate">Emerson Cossi</div>
            <div className="text-[9px] text-[#00D1FF] font-mono">DJ Principal</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoUser('camila')}
            disabled={isSubmitting}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition cursor-pointer disabled:opacity-50"
          >
            <div className="text-xs font-bold text-white truncate">CAMILA</div>
            <div className="text-[9px] text-white/60 font-mono">Noir & Chrome</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoUser('sara')}
            disabled={isSubmitting}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition cursor-pointer disabled:opacity-50"
          >
            <div className="text-xs font-bold text-white truncate">SARA</div>
            <div className="text-[9px] text-amber-400 font-mono">Sunset Organic</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoUser('luna')}
            disabled={isSubmitting}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition cursor-pointer disabled:opacity-50"
          >
            <div className="text-xs font-bold text-white truncate">LUNA BLOOM</div>
            <div className="text-[9px] text-sky-400 font-mono">Ice Futuristic</div>
          </button>
        </div>

        {/* Super Admin Direct Button */}
        <Link href="/admin" className="block pt-1">
          <button
            type="button"
            className="w-full py-2 px-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Validar Super Admin (/admin)</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-[9px] text-white/40 uppercase font-mono">ou com e-mail e senha</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      {/* Real-time Status and Validation Feedback Banners */}
      {localError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span className="leading-snug">{localError}</span>
        </div>
      )}

      {statusMessage && authStatus === 'validating' && (
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <Loader2 className="w-4 h-4 shrink-0 text-purple-400 animate-spin" />
          <span className="leading-snug">{statusMessage}</span>
        </div>
      )}

      {statusMessage && authStatus === 'success' && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span className="leading-snug font-medium">{statusMessage}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
        {mode === 'signup' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70">Nome Artístico / DJ</label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                placeholder="Ex: DJ Alok / Sara Bloom"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (localError) setLocalError(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none transition disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70">Cidade Base</label>
              <input
                type="text"
                disabled={isSubmitting}
                placeholder="Ex: São Paulo - SP"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none transition disabled:opacity-50"
              />
            </div>
          </>
        )}

        <div className="space-y-1">
          <label className="text-xs font-mono text-white/70">E-mail Profissional</label>
          <input
            type="email"
            required
            disabled={isSubmitting}
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (localError) setLocalError(null);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none transition disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-white/70">Senha de Acesso</label>
          <input
            type="password"
            required
            disabled={isSubmitting}
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (localError) setLocalError(null);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 text-sm text-white outline-none transition disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-2xl bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-xl cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>{mode === 'login' ? 'Autenticando credenciais...' : 'Criando perfil oficial...'}</span>
            </>
          ) : authStatus === 'success' ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Acesso Autorizado</span>
            </>
          ) : (
            <span>{mode === 'login' ? 'Entrar no Painel' : 'Criar Perfil e Continuar'}</span>
          )}
        </button>
      </form>

      <div className="text-center pt-1">
        <Link href="/" className="text-xs text-white/40 hover:text-white transition-colors inline-flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          <span>Voltar para a Página Inicial</span>
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#07090E] flex items-center justify-center p-4 relative">
      <Suspense fallback={<div className="text-white text-xs font-mono">Carregando painel de autenticação...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}