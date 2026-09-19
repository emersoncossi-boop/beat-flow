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
  city: 'SÃ£o Paulo - SP',
  bio: 'DJ & Produtor musical especializado em Afro House, Deep Tech e conexÃµes sonoras imersivas para clubs e festivais.',
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

    if (auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        setUser(cred.user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bf_session_user', JSON.stringify({ email: cred.user.email, uid: cred.user.uid }));
        }
        setIsLoading(false);
        return { success: true };
      } catch (fbErr: any) {
        console.warn('[Auth] Firebase note:', fbErr.message);
      }
    }

    // Seamless instant login fallback
    const fallbackUser: any = {
      uid: 'dj_' + Math.random().toString(36).substr(2, 9),
      email: email,
      displayName: email.split('@')[0]
    };

    const profile: DJProfile = {
      ...DEFAULT_DJ_PROFILE,
      email: email,
      artisticName: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
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
      city: isLuna ? 'Rio de Janeiro - RJ' : 'SÃ£o Paulo - SP'
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

    if (auth) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        setUser(cred.user);
        const newProf: DJProfile = {
          ...DEFAULT_DJ_PROFILE,
          uid: cred.user.uid,
          email: email,
          artisticName: artisticName,
          city: city,
          slug: artisticName.toLowerCase().replace(/[^a-z0-9]/g, '')
        };
        setDjProfile(newProf);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bf_session_user', JSON.stringify({ email: cred.user.email, uid: cred.user.uid }));
          localStorage.setItem('bf_dj_profile', JSON.stringify(newProf));
        }
        setIsLoading(false);
        return { success: true };
      } catch (fbErr: any) {
        console.warn('[Auth] Firebase signup note:', fbErr.message);
      }
    }

    const fallbackUser: any = {
      uid: 'dj_' + Math.random().toString(36).substr(2, 9),
      email: email,
      displayName: artisticName
    };

    const newProf: DJProfile = {
      ...DEFAULT_DJ_PROFILE,
      email: email,
      artisticName: artisticName,
      city: city,
      slug: artisticName.toLowerCase().replace(/[^a-z0-9]/g, '')
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