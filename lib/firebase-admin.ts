import { initializeApp, getApps, getApp, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import firebaseConfig from '../firebase-applet-config.json';

let adminAppInstance: App | null = null;

function getAdminApp(): App {
  if (!adminAppInstance) {
    adminAppInstance = !getApps().length
      ? initializeApp({
          projectId: firebaseConfig.projectId,
        })
      : getApp();
  }
  return adminAppInstance;
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

export function getAdminDb(): Firestore {
  const app = getAdminApp();
  const dbId = (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId;
  return dbId ? getFirestore(app, dbId) : getFirestore(app);
}

export const adminAuth = new Proxy({} as Auth, {
  get(_target, prop) {
    const auth = getAdminAuth();
    const val = (auth as unknown as Record<string, unknown>)[prop as string];
    return typeof val === 'function' ? val.bind(auth) : val;
  },
});

export const adminDb = new Proxy({} as Firestore, {
  get(_target, prop) {
    const db = getAdminDb();
    const val = (db as unknown as Record<string, unknown>)[prop as string];
    return typeof val === 'function' ? val.bind(db) : val;
  },
});


