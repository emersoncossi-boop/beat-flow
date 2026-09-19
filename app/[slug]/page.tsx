import React from 'react';
import { ArtistExperience } from '@/components/artist-experience/ArtistExperience';
import { getArtistProfile } from '@/lib/artist-universe';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const profile = getArtistProfile(slug || 'camila');

  return {
    title: `${profile?.name || 'Artista'} — Perfil Oficial Beat Flow`,
    description: `${profile?.name || 'Artista'} (${profile?.tagline || 'House & Techno'}). Press Kit Oficial, Música, Agenda e Pedidos de Booking.`,
    openGraph: {
      title: `${profile?.name || 'Artista'} — Perfil Oficial`,
      description: profile?.bioShort || 'Perfil Oficial no Beat Flow',
      images: profile?.heroImage ? [{ url: profile.heroImage }] : [],
    },
  };
}

export default async function ArtistSlugPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#05060A]">
      <ArtistExperience djSlug={slug || 'camila'} />
    </main>
  );
}