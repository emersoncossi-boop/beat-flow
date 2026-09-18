'use client';

import React, { useState } from 'react';
import { Play, Pause, Disc3, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileDynamicIslandProps {
  currentTrackTitle?: string;
  artistName?: string;
  onAction?: () => void;
}

export function MobileDynamicIsland({
  currentTrackTitle = "Ancestral Frequency (Live)",
  artistName = "DJ Camila",
  onAction
}: MobileDynamicIslandProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="md:hidden fixed top-3 left-4 right-4 z-40 pointer-events-none flex justify-center">
      <motion.div
        layout
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="pointer-events-auto w-full max-w-sm bg-zinc-950/90 backdrop-blur-2xl border border-white/15 rounded-full px-4 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3"
      >
        {/* Track / Artist info with micro equalizer */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md">
            <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
          </div>
          <div className="min-w-0 truncate">
            <p className="text-xs font-bold text-white truncate leading-none mb-1">{currentTrackTitle}</p>
            <p className="text-[10px] text-zinc-400 truncate leading-none">{artistName} • Warung Beach</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white/10 active:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          </button>

          {onAction && (
            <button
              onClick={onAction}
              className="h-8 px-3 rounded-full bg-purple-600 active:bg-purple-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
            >
              <span>Contratar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}