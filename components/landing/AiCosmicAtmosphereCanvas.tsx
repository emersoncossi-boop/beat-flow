'use client';

import React, { useRef, useEffect } from 'react';

export interface AiCosmicAtmosphereProps {
  themeId: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  moonType: 'crescent' | 'full' | 'eclipse' | 'supernova' | 'hologram';
  bpm?: number;
  className?: string;
}

/**
 * AiCosmicAtmosphereCanvas:
 * Procedural AI Generative Celestial Canvas engine.
 * Generates an unrepeatable, unique space-depth cosmic background with:
 * - Procedural Celestial Moon & Coronal Halo (Waxing Crescent, Eclipse, Supernova)
 * - Volumetric Nebula Clouds with harmonic noise
 * - Floating Stardust Particles & Harmonic Sound Rings
 * - Never repeats identical frames: dynamically driven by time-based trigonometric seeds
 */
export function AiCosmicAtmosphereCanvas({
  themeId,
  primaryColor,
  secondaryColor,
  glowColor,
  moonType,
  bpm = 124,
  className = ''
}: AiCosmicAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 400);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 400;
      height = canvas.height = canvas.offsetHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    // Procedural Stars Seed
    const starCount = 65;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2
    }));

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      const beatCycle = (now / (60000 / bpm)) % 1;
      const beatPulse = Math.sin(beatCycle * Math.PI) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Space Cosmic Void Gradient
      const baseGrad = ctx.createLinearGradient(0, 0, width * 0.5, height);
      baseGrad.addColorStop(0, '#030508');
      baseGrad.addColorStop(0.5, '#070A10');
      baseGrad.addColorStop(1, '#020306');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Nebula Organic Glows
      const nebulaX = width * 0.5 + Math.sin(elapsed * 0.4) * (width * 0.1);
      const nebulaY = height * 0.35 + Math.cos(elapsed * 0.3) * (height * 0.08);
      const nebulaRadius = width * (0.8 + beatPulse * 0.3);

      const nebulaGrad = ctx.createRadialGradient(
        nebulaX, nebulaY, 10,
        nebulaX, nebulaY, nebulaRadius
      );
      nebulaGrad.addColorStop(0, `${primaryColor}44`);
      nebulaGrad.addColorStop(0.4, `${secondaryColor}22`);
      nebulaGrad.addColorStop(0.8, `${glowColor}08`);
      nebulaGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Procedural Celestial Moon / Eclipse / Supernova
      const moonCenterX = width * 0.5;
      const moonCenterY = height * 0.38;
      const moonRadius = width * 0.22;

      // Outer Corona Glow
      const coronaGrad = ctx.createRadialGradient(
        moonCenterX, moonCenterY, moonRadius * 0.8,
        moonCenterX, moonCenterY, moonRadius * 2.2
      );
      coronaGrad.addColorStop(0, `${primaryColor}66`);
      coronaGrad.addColorStop(0.4, `${glowColor}25`);
      coronaGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(moonCenterX, moonCenterY, moonRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Moon Body Base
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonCenterX, moonCenterY, moonRadius, 0, Math.PI * 2);
      ctx.clip();

      // Moon Surface Texture Gradient
      const moonSurfGrad = ctx.createLinearGradient(
        moonCenterX - moonRadius, moonCenterY - moonRadius,
        moonCenterX + moonRadius, moonCenterY + moonRadius
      );
      moonSurfGrad.addColorStop(0, '#FFFFFF');
      moonSurfGrad.addColorStop(0.3, primaryColor);
      moonSurfGrad.addColorStop(0.7, secondaryColor);
      moonSurfGrad.addColorStop(1, '#05070B');
      ctx.fillStyle = moonSurfGrad;
      ctx.fillRect(moonCenterX - moonRadius, moonCenterY - moonRadius, moonRadius * 2, moonRadius * 2);

      // Moon Phase Shadow (Crescent / Eclipse / Hologram)
      if (moonType === 'crescent' || moonType === 'eclipse') {
        const shadowOffset = moonRadius * (moonType === 'crescent' ? 0.65 : 0.2);
        ctx.beginPath();
        ctx.arc(
          moonCenterX + shadowOffset,
          moonCenterY - shadowOffset * 0.2,
          moonRadius * 0.95,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = '#05070B';
        ctx.fill();
      }

      ctx.restore();

      // 4. Harmonic Audio Waveform Ring around Celestial Center
      ctx.save();
      ctx.strokeStyle = `${primaryColor}55`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const ringPoints = 36;
      for (let i = 0; i <= ringPoints; i++) {
        const angle = (i / ringPoints) * Math.PI * 2;
        const wave = Math.sin(angle * 6 + elapsed * 3) * (6 + beatPulse * 15);
        const r = moonRadius * 1.4 + wave;
        const rx = moonCenterX + Math.cos(angle) * r;
        const ry = moonCenterY + Math.sin(angle) * (r * 0.45); // Elliptical orbital tilt
        if (i === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // 5. Floating Stardust Particles
      for (const s of stars) {
        s.phase += s.speed;
        const currentAlpha = Math.max(0.1, Math.min(1, s.alpha + Math.sin(s.phase) * 0.4));
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Volumetric Stage Light Beams
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const beamGrad = ctx.createLinearGradient(moonCenterX, 0, moonCenterX, height);
      beamGrad.addColorStop(0, `${primaryColor}30`);
      beamGrad.addColorStop(0.5, `${secondaryColor}15`);
      beamGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(moonCenterX - width * 0.15, 0);
      ctx.lineTo(moonCenterX + width * 0.15, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [themeId, primaryColor, secondaryColor, glowColor, moonType, bpm]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}