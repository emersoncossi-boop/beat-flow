'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { ArrowLeft, LogIn, UserPlus, Sparkles, AlertCircle, Fingerprint, ShieldCheck } from 'lucide-react';
import { isBiometricAvailable, authenticateWithBiometrics, registerBiometricKey } from '@/lib/biometric-auth';

function LoginForm() {
  const { signIn, signUp, signInDemo, isAuthenticated, isLoading: authLoading, error: authError, clearError } = useAuth();
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
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
        // Authenticated with native device biometric (Face ID / Touch ID / Android Biometric)
        await signInDemo('luna');
        router.push('/dashboard');
      } else {
        setLocalError('Biometria cancelada ou não reconhecida. Use e-mail e senha.');
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
      setLocalError('Preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        const res = await signIn(email, password);
        if (res && !res.success) {
          setLocalError(res.error || 'Credenciais inválidas. Tente novamente.');
        } else {
          // Register biometric prompt if available
          if (hasBiometrics && typeof window !== 'undefined' && !localStorage.getItem('bf_biometric_enabled')) {
            await registerBiometricKey(email, name || email);
          }
          router.push('/dashboard');
        }
      } else {
        const res = await signUp(email, password, {
          artisticName: name.trim() || email.split('@')[0],
          city: city.trim(),
          genres: ['Tech House', 'Melodic Techno'],
        });

        if (res && !res.success) {
          setLocalError(res.error || 'Erro ao criar conta. Tente novamente.');
        } else {
          if (hasBiometrics) {
            await registerBiometricKey(email, name || email);
          }
          router.push('/onboarding');
        }
      }
    } catch (err: any) {
      setLocalError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAccess = async (profile: 'luna' | 'skyline') => {
    setIsSubmitting(true);
    await signInDemo(profile);
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md bg-[#0D0B18]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(138,63,252,0.2)] relative z-10">
      <div className="text-center mb-6 flex flex-col items-center">
        <Logo size="md" className="mb-3" />
        
        {/* Toggle Mode */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full mt-4">
          <button
            type="button"
            onClick={() => handleSwitchMode('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-[#8A3FFC] text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('signup')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-[#8A3FFC] text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Criar conta
          </button>
        </div>

        <p className="text-xs text-white/60 mt-3">
          {mode === 'login' 
            ? 'Acesse seu painel profissional, agenda e propostas de shows.' 
            : 'Crie seu perfil profissional de DJ e receba pedidos de contratação.'}
        </p>

        {rawHandle && mode === 'signup' && (
          <div className="w-full mt-3 p-3 rounded-2xl bg-gradient-to-r from-[#8A3FFC]/20 to-[#00D1FF]/20 border border-[#00D1FF]/40 flex items-center gap-2.5 text-xs text-white shadow-lg text-left">
            <Sparkles className="w-4 h-4 text-[#00D1FF] shrink-0" />
            <span>
              Endereço <strong>beatflow.me/@{rawHandle}</strong> pré-reservado para o seu cadastro!
            </span>
          </div>
        )}
      </div>

      {/* Biometric Native Access Button (Touch ID / Face ID / Android Biometrics) */}
      {hasBiometrics && mode === 'login' && (
        <button
          type="button"
          onClick={handleBiometricAuth}
          disabled={biometricLoading}
          className="w-full mb-4 py-3 px-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-purple-500/40 text-white text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Fingerprint className="w-4 h-4 text-purple-400" />
          <span>{biometricLoading ? 'Verificando biometria...' : 'Entrar com Digital / Face ID'}</span>
        </button>
      )}

      {(localError || authError) && (
        <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span>{localError || authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Nome Artístico ou Nome Completo</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#8A3FFC] transition-colors placeholder:text-white/20"
              placeholder="Ex: DJ Luna, DJ Vortex"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#8A3FFC] transition-colors placeholder:text-white/20"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#8A3FFC] transition-colors placeholder:text-white/20"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Cidade Principal</label>
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#8A3FFC] transition-colors placeholder:text-white/20"
              placeholder="Ex: São Paulo - SP"
            />
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8A3FFC] to-[#00D1FF] hover:opacity-90 text-white font-bold text-sm shadow-[0_0_25px_rgba(138,63,252,0.4)] mt-2"
        >
          {isSubmitting ? (
            'Processando...'
          ) : mode === 'login' ? (
            <>Entrar no Beat Flow <LogIn className="w-4 h-4 ml-2" /></>
          ) : (
            <>Criar Perfil e Continuar <UserPlus className="w-4 h-4 ml-2" /></>
          )}
        </Button>
      </form>

      {/* Demo shortcuts */}
      <div className="mt-6 pt-5 border-t border-white/10">
        <p className="text-[11px] text-white/50 text-center uppercase tracking-wider mb-2.5 font-semibold">
          Acesso Rápido para Testes (1 Clique)
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            type="button"
            variant="outline" 
            onClick={() => handleDemoAccess('luna')}
            className="w-full text-xs rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#8A3FFC]/50 text-white flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00D1FF]" />
            Luna Martins
          </Button>
          <Button 
            type="button"
            variant="outline" 
            onClick={() => handleDemoAccess('skyline')}
            className="w-full text-xs rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#8A3FFC]/50 text-white flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4DB8]" />
            DJ Skyline
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-white/50 flex items-center justify-center gap-1 hover:text-white transition">
          <ArrowLeft className="w-3 h-3" /> Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#08080F] flex flex-col items-center justify-center p-6 relative overflow-hidden text-white">
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-[#8A3FFC]/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-[#00D1FF]/15 blur-[140px] rounded-full pointer-events-none" />
      <Suspense fallback={<div className="text-white text-sm">Carregando autenticação...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}