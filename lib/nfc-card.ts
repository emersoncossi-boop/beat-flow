'use client';

/**
 * NFC Digital Card & vCard Contact Export Helper
 * Allows DJs to write to physical NFC cards or export smart vCard contacts directly.
 */

export interface DJContactCard {
  name: string;
  tagline: string;
  url: string;
  email?: string;
  phone?: string;
  instagram?: string;
  photoUrl?: string;
}

// 1. Web NFC API (Android Native NFC Write / Beam)
export async function writeToNfcTag(url: string): Promise<{ success: boolean; message: string }> {
  if (typeof window === 'undefined') return { success: false, message: 'Janela indisponível' };

  // @ts-ignore
  if (!('NDEFReader' in window)) {
    return { 
      success: false, 
      message: 'NFC direto via navegador suportado em dispositivos Android. No iPhone, utilize o QR Code dinâmico ou tag pré-gravada.' 
    };
  }

  try {
    // @ts-ignore
    const ndef = new NDEFReader();
    await ndef.write({
      records: [
        { recordType: "url", data: url }
      ]
    });
    return { success: true, message: 'Cartão NFC gravado com sucesso! Aproxime de qualquer celular.' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Erro ou aproximação cancelada.' };
  }
}

// 2. Universal vCard (.vcf) Generator for Apple iOS & Android Contacts
export function downloadVCard(
  contactOrSlug: DJContactCard | string,
  name?: string,
  phone?: string,
  email?: string,
  url?: string
) {
  if (typeof window === 'undefined') return;

  const contact: DJContactCard = typeof contactOrSlug === 'object' 
    ? contactOrSlug 
    : {
        name: name || contactOrSlug,
        tagline: 'Artista Oficial Beat Flow',
        url: url || `https://beatflow.me/${contactOrSlug}`,
        email: email || `${contactOrSlug}@beatflow.me`,
        phone: phone || '+55 11 99999-9999',
      };

  const displayName = contact.name || 'Artista';
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${displayName}`,
    `TITLE:${contact.tagline || 'DJ & Produtor'}`,
    `URL:${contact.url || ''}`,
    contact.email ? `EMAIL;TYPE=INTERNET:${contact.email}` : '',
    contact.phone ? `TEL;TYPE=CELL:${contact.phone}` : '',
    contact.instagram ? `X-SOCIALPROFILE;type=instagram:${contact.instagram}` : '',
    'NOTE:Perfil Oficial e Press Kit via Beat Flow',
    'END:VCARD'
  ].filter(Boolean).join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', `${displayName.toLowerCase().replace(/\s+/g, '_')}_contato.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}