import React from 'react';
import { notFound } from 'next/navigation';
import { ArtistExperience } from '@/components/artist-experience/ArtistExperience';
import { getArtistProfile } from '@/lib/artist-universe';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const profile = getArtistProfile(slug);

  return {
    title: `${profile.name} — Perfil Oficial Beat Flow`,
    description: `${profile.name} (${profile.tagline}). Press Kit Oficial, Música, Agenda e Pedidos de Booking em ${profile.location}.`,
    openGraph: {
      title: `${profile.name} — Perfil Oficial`,
      description: profile.bioShort,
      images: [{ url: profile.heroImage }],
    },
  };
}

export default async function ArtistSlugPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#05060A]">
      <ArtistExperience djSlug={slug} />
    </main>
  );
}