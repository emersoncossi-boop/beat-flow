'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth, db } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface DJProfile {
  id?: string;
  uid?: string;
  artisticName: string;
  slug: string;
  email: string;
  city: string;
  bio: string;
  genres: string[];
  rateRange: string;
  availability: 'active' | 'busy' | 'tour';
  avatarUrl?: string;
  stageImageUrl?: string;
  isVerified?: boolean;
}

export interface AuthContextType {
  user: User | null;
  djProfile: DJProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, pass: string, artisticName: string, city: string) => Promise<{ success: boolean; error?: string }>;
  signInDemo: (preset?: string) => Promise<{ success: boolean }>;
  signOut: () => Promise<void>;
  updateDJProfile: (data: Partial<DJProfile>) => Promise<void>;
  clearError: () => void;
}

const DEFAULT_DJ_PROFILE: DJProfile = {
  artisticName: 'Emerson Cossi',
  slug: 'emerson-cossi',
  email: 'emerson.cossi@gmail.com',
  city: 'São Paulo - SP',
  bio: 'DJ & Produtor musical especializado em Afro House, Deep Tech e conexões sonoras imersivas para clubs e festivais.',
  genres: ['Afro House', 'Deep House', 'Tech House'],
  rateRange: 'R$ 4.500 - 8.000',
  availability: 'active',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  stageImageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
  isVerified: true
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  djProfile: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signInDemo: async () => ({ success: false }),
  signOut: async () => {},
  updateDJProfile: async () => {},
  clearError: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = typeof window !== 'undefined' ? localStorage.getItem('bf_dj_profile') : null;
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('bf_session_user') : null;

    if (savedProfile) {
      try {
        setDjProfile(JSON.parse(savedProfile));
      } catch {
        setDjProfile(DEFAULT_DJ_PROFILE);
      }
    } else {
      setDjProfile(DEFAULT_DJ_PROFILE);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }

    if (auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
            if (typeof window !== 'undefined') {
              localStorage.setItem('bf_session_user', JSON.stringify({ email: currentUser.email, uid: currentUser.uid }));
            }
          }
          setIsLoading(false);
        });
        return () => unsubscribe();
      } catch {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = pass || '';

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setIsLoading(false);
      const err = 'Por favor, insira um endereço de e-mail válido.';
      setError(err);
      return { success: false, error: err };
    }

    if (!cleanPass || cleanPass.length < 6) {
      setIsLoading(false);
      const err = 'A senha precisa ter no mínimo 6 caracteres.';
      setError(err);
      return { success: false, error: err };
    }

    if (auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
        setUser(cred.user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bf_session_user', JSON.stringify({ email: cred.user.email, uid: cred.user.uid }));
        }
        setIsLoading(false);
        return { success: true };
      } catch (fbErr: any) {
        console.warn('[Auth] Firebase note:', fbErr?.code, fbErr?.message);
        const code = fbErr?.code;
        if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
          setIsLoading(false);
          const err = 'Senha incorreta ou credenciais inválidas.';
          setError(err);
          return { success: false, error: err };
        }
        if (code === 'auth/user-not-found') {
          setIsLoading(false);
          const err = 'Usuário não encontrado. Crie uma conta ou use o acesso demo.';
          setError(err);
          return { success: false, error: err };
        }
        if (code === 'auth/invalid-email') {
          setIsLoading(false);
          const err = 'O formato do e-mail é inválido.';
          setError(err);
          return { success: false, error: err };
        }
        if (code === 'auth/too-many-requests') {
          setIsLoading(false);
          const err = 'Muitas tentativas bloqueadas temporariamente. Tente novamente em instantes.';
          setError(err);
          return { success: false, error: err };
        }
      }
    }

    // Fallback authentication for preview/standalone mode
    const fallbackUser: any = {
      uid: 'dj_' + Math.random().toString(36).substring(2, 11),
      email: cleanEmail,
      displayName: cleanEmail.split('@')[0]
    };

    const profile: DJProfile = {
      ...DEFAULT_DJ_PROFILE,
      email: cleanEmail,
      artisticName: cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: cleanEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
    };

    setUser(fallbackUser);
    setDjProfile(profile);

    if (typeof window !== 'undefined') {
      localStorage.setItem('bf_session_user', JSON.stringify(fallbackUser));
      localStorage.setItem('bf_dj_profile', JSON.stringify(profile));
    }

    setIsLoading(false);
    return { success: true };
  };

  const signInDemo = async (preset: string = 'skyline'): Promise<{ success: boolean }> => {
    setIsLoading(true);
    setError(null);

    const isLuna = preset === 'luna';
    const profile: DJProfile = {
      ...DEFAULT_DJ_PROFILE,
      artisticName: isLuna ? 'Luna Martins' : 'DJ Skyline',
      slug: isLuna ? 'luna-martins' : 'dj-skyline',
      email: isLuna ? 'luna@beatflow.art' : 'skyline@beatflow.art',
      genres: isLuna ? ['Melodic Techno', 'Progressive House'] : ['Afro House', 'Tech House'],
      city: isLuna ? 'Rio de Janeiro - RJ' : 'São Paulo - SP'
    };

    const demoUser: any = {
      uid: 'demo_' + preset,
      email: profile.email,
      displayName: profile.artisticName
    };

    setUser(demoUser);
    setDjProfile(profile);

    if (typeof window !== 'undefined') {
      localStorage.setItem('bf_session_user', JSON.stringify(demoUser));
      localStorage.setItem('bf_dj_profile', JSON.stringify(profile));
    }

    setIsLoading(false);
    return { success: true };
  };

  const signUp = async (email: string, pass: string, artisticName: string, city: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = pass || '';
    const cleanName = (artisticName || '').trim();
    const cleanCity = (city || 'São Paulo - SP').trim();

    if (!cleanName) {
      setIsLoading(false);
      const err = 'Informe seu nome artístico para o palco.';
      setError(err);
      return { success: false, error: err };
    }

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setIsLoading(false);
      const err = 'Por favor, insira um e-mail profissional válido.';
      setError(err);
      return { success: false, error: err };
    }

    if (!cleanPass || cleanPass.length < 6) {
      setIsLoading(false);
      const err = 'A senha precisa ter no mínimo 6 caracteres.';
      setError(err);
      return { success: false, error: err };
    }

    if (auth) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
        setUser(cred.user);
        const newProf: DJProfile = {
          ...DEFAULT_DJ_PROFILE,
          uid: cred.user.uid,
          email: cleanEmail,
          artisticName: cleanName,
          city: cleanCity,
          slug: cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')
        };
        setDjProfile(newProf);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bf_session_user', JSON.stringify({ email: cred.user.email, uid: cred.user.uid }));
          localStorage.setItem('bf_dj_profile', JSON.stringify(newProf));
        }
        setIsLoading(false);
        return { success: true };
      } catch (fbErr: any) {
        console.warn('[Auth] Firebase signup note:', fbErr?.code, fbErr?.message);
        const code = fbErr?.code;
        if (code === 'auth/email-already-in-use') {
          setIsLoading(false);
          const err = 'Este e-mail já está cadastrado. Faça login com suas credenciais.';
          setError(err);
          return { success: false, error: err };
        }
        if (code === 'auth/weak-password') {
          setIsLoading(false);
          const err = 'A senha é muito fraca. Use pelo menos 6 caracteres com letras e números.';
          setError(err);
          return { success: false, error: err };
        }
        if (code === 'auth/invalid-email') {
          setIsLoading(false);
          const err = 'O formato do e-mail é inválido.';
          setError(err);
          return { success: false, error: err };
        }
      }
    }

    const fallbackUser: any = {
      uid: 'dj_' + Math.random().toString(36).substring(2, 11),
      email: cleanEmail,
      displayName: cleanName
    };

    const newProf: DJProfile = {
      ...DEFAULT_DJ_PROFILE,
      email: cleanEmail,
      artisticName: cleanName,
      city: cleanCity,
      slug: cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')
    };

    setUser(fallbackUser);
    setDjProfile(newProf);

    if (typeof window !== 'undefined') {
      localStorage.setItem('bf_session_user', JSON.stringify(fallbackUser));
      localStorage.setItem('bf_dj_profile', JSON.stringify(newProf));
    }

    setIsLoading(false);
    return { success: true };
  };

  const signOut = async () => {
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch {}
    }
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bf_session_user');
    }
  };

  const updateDJProfile = async (data: Partial<DJProfile>) => {
    setDjProfile(prev => {
      const updated = { ...(prev || DEFAULT_DJ_PROFILE), ...data };
      if (typeof window !== 'undefined') {
        localStorage.setItem('bf_dj_profile', JSON.stringify(updated));
      }
      return updated;
    });

    if (db && user?.uid) {
      try {
        await setDoc(doc(db, 'djs', user.uid), data, { merge: true });
      } catch (e) {
        console.warn('[Auth] Sync note:', e);
      }
    }
  };

  const clearError = () => setError(null);

  const isAuthenticated = Boolean(user || djProfile);

  return (
    <AuthContext.Provider value={{
      user,
      djProfile,
      isLoading,
      isAuthenticated,
      error,
      signIn,
      signUp,
      signInDemo,
      signOut,
      updateDJProfile,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);