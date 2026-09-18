import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '../../lib/firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthRequest extends NextRequest {
  user?: DecodedIdToken;
}

export async function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return null;
  }
}
