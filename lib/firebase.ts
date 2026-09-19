import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App safely
let app: FirebaseApp;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    console.warn('[Firebase] Client App init fallback:', e);
    app = getApp();
  }
} else {
  app = getApp();
}

const firestoreDatabaseId = (firebaseConfig as { firestoreDatabaseId?: string })?.firestoreDatabaseId;

let auth: Auth;
try {
  auth = getAuth(app);
} catch {
  auth = null as any;
}

let db: Firestore;
try {
  db = firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app);
} catch {
  try {
    db = getFirestore(app);
  } catch {
    db = null as any;
  }
}

const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, db, googleAuthProvider };
export const getFirebaseAuth = () => auth || getAuth(app);
export const getFirebaseDb = () => db || (firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app));
export const getGoogleAuthProvider = () => googleAuthProvider;
export default app;