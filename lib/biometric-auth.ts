'use client';

/**
 * WebAuthn & Biometric Authentication Helper (Face ID / Touch ID / Fingerprint)
 * Uses native device credentials without extra cost or third-party APIs.
 */

export async function isBiometricAvailable(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (!window.PublicKeyCredential) return false;
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

export async function registerBiometricKey(email: string, userName: string): Promise<boolean> {
  if (!window.PublicKeyCredential) return false;

  try {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const userId = new Uint8Array(16);
    window.crypto.getRandomValues(userId);

    const credential = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: {
          name: "Beat Flow by NEXORA",
          id: window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname
        },
        user: {
          id: userId,
          name: email,
          displayName: userName || email
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 }, // ES256
          { type: "public-key", alg: -257 } // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform", // Face ID / Touch ID / Android Biometrics
          userVerification: "required"
        },
        timeout: 60000
      }
    });

    if (credential) {
      localStorage.setItem('bf_biometric_enabled', 'true');
      localStorage.setItem('bf_biometric_email', email);
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Biometric registration cancelled or unsupported:", err);
    return false;
  }
}

export async function authenticateWithBiometrics(): Promise<{ success: boolean; email?: string }> {
  if (!window.PublicKeyCredential) return { success: false };

  try {
    const savedEmail = localStorage.getItem('bf_biometric_email');
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge,
        timeout: 60000,
        userVerification: "required",
        rpId: window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname
      }
    });

    if (assertion) {
      return { success: true, email: savedEmail || undefined };
    }
    return { success: false };
  } catch (err) {
    console.warn("Biometric authentication cancelled or failed:", err);
    return { success: false };
  }
}