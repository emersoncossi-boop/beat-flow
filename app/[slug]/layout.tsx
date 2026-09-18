import React from 'react';

export function generateStaticParams() {
  return [
    { slug: 'luna-martins' },
    { slug: 'alok' },
    { slug: 'vintage-culture' },
  ];
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
