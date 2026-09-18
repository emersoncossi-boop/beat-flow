'use client';

import React from 'react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  imageUrl: string | null;
  title?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ imageUrl, title, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition rounded-full bg-white/10 hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative w-full max-h-[82vh] overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black">
          <img
            src={imageUrl}
            alt={title || 'Foto de Cabine'}
            className="w-full h-full max-h-[80vh] object-contain mx-auto"
          />
        </div>
        {title && (
          <p className="mt-3 text-xs sm:text-sm font-mono text-white/70 text-center">
            {title}
          </p>
        )}
      </div>
    </div>
  );
};
