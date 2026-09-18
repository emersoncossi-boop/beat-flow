import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firestoreDatabaseId = (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId;

// Export getters to prevent SSR initialization errors
export const getFirebaseAuth = () => getAuth(app);
export const getFirebaseDb = () => firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app);
export const getGoogleAuthProvider = () => new GoogleAuthProvider();

export const auth = typeof window !== 'undefined' ? getAuth(app) : null as any;
export const db = typeof window !== 'undefined' ? (firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app)) : null as any;
export const googleAuthProvider = typeof window !== 'undefined' ? new GoogleAuthProvider() : null as any;

export default app;
