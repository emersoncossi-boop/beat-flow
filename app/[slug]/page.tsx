'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { databaseService } from '@/lib/database-service';
import { ArtistExperience } from '@/components/artist-experience/ArtistExperience';

export default function PublicPressKit() {
  const params = useParams();
  const slug = (params?.slug as string) || 'luna-martins';

  // Fetch profile from database or fall back to default
  const dbProfile = databaseService.getProfileBySlug(slug);

  const initialDjData = {
    name: dbProfile?.artistic_name || (slug === 'djskyline' ? 'DJ Skyline' : 'Luna Martins'),
    location: dbProfile?.city_base || 'São Paulo - SP',
    genres: dbProfile?.genres?.length ? dbProfile.genres : ['Melodic Techno', 'Tech House', 'Deep House'],
    bio: dbProfile?.bio_text,
    minFee: dbProfile?.fee_range_min || 3500,
    avatarUrl: dbProfile?.live_photos_urls?.[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    coverUrl: dbProfile?.live_photos_urls?.[1] || '/assets/landing/hero-dj-stage.jpg',
  };

  return (
    <main className="min-h-screen bg-[#05070B]">
      <ArtistExperience 
        djSlug={slug}
        initialDjData={initialDjData}
      />
    </main>
  );
}
