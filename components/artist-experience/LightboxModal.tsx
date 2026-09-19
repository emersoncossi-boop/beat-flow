'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface LightboxModalProps {
  imageUrl?: string | null;
  photos?: string[];
  initialIndex?: number;
  title?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ 
  imageUrl, 
  photos, 
  initialIndex = 0, 
  title, 
  onClose 
}) => {
  const photoList = photos && photos.length > 0 ? photos : imageUrl ? [imageUrl] : [];
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (photoList.length === 0) return null;

  const currentPhoto = photoList[currentIndex] || photoList[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photoList.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < photoList.length - 1 ? prev + 1 : 0));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close & Action Bar */}
        <div className="absolute -top-12 right-0 flex items-center gap-3">
          <a
            href={currentPhoto}
            download
            className="p-2 text-white/70 hover:text-white transition rounded-full bg-white/10 hover:bg-white/20"
            title="Download Alta Resolução"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white transition rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container with Nav Arrows */}
        <div className="relative w-full max-h-[82vh] overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black flex items-center justify-center">
          {photoList.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <img
            src={currentPhoto}
            alt={title || `Foto de Press ${currentIndex + 1}`}
            className="w-full h-full max-h-[80vh] object-contain mx-auto"
          />
        </div>

        <div className="mt-3 flex items-center justify-between w-full px-2 text-xs font-mono text-white/70">
          <span>{title || 'Material de Imprensa Oficial'}</span>
          {photoList.length > 1 && (
            <span>{currentIndex + 1} / {photoList.length}</span>
          )}
        </div>
      </div>
    </div>
  );
};
