'use client';

import React, { useEffect, useRef } from 'react';
import { AtmosphereConfig } from '@/lib/artist-universe';

interface AtmosphereCanvasProps {
  atmosphere: AtmosphereConfig;
  className?: string;
  isAudioPlaying?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
}

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({
  atmosphere,
  className = '',
  isAudioPlaying = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = atmosphere.particles.density;
      const [minSize, maxSize] = atmosphere.particles.sizeRange;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.2 + Math.random() * 0.5;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * atmosphere.particles.speed * 0.8,
          vy: -(Math.random() * atmosphere.particles.speed * 0.9 + 0.1), // Gentle upward drift
          size: minSize + Math.random() * (maxSize - minSize),
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: 0.01 + Math.random() * 0.03,
        });
      }
      particlesRef.current = particles;
    };

    initParticles();
    window.addEventListener('resize', handleResize);

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Volumetric Light Spotlights
      const pulseMultiplier = isAudioPlaying ? 1 + Math.sin(tick * 0.08) * 0.25 : 1;
      const primaryGlow = atmosphere.lighting.primaryGlow;
      const secondaryGlow = atmosphere.lighting.secondaryGlow;
      const intensity = atmosphere.lighting.glowIntensity * pulseMultiplier;

      // Primary top spotlight
      const spotGrad1 = ctx.createRadialGradient(
        width * 0.5,
        -50,
        10,
        width * 0.5,
        height * 0.45,
        Math.max(width * 0.6, 350)
      );
      spotGrad1.addColorStop(0, hexToRgba(primaryGlow, 0.4 * intensity));
      spotGrad1.addColorStop(0.5, hexToRgba(primaryGlow, 0.12 * intensity));
      spotGrad1.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = spotGrad1;
      ctx.fillRect(0, 0, width, height);

      // Secondary ambient counter-spotlight (bottom or offset side)
      const spotGrad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        20,
        width * 0.8,
        height * 0.7,
        Math.max(width * 0.45, 300)
      );
      spotGrad2.addColorStop(0, hexToRgba(secondaryGlow, 0.25 * intensity));
      spotGrad2.addColorStop(0.6, hexToRgba(secondaryGlow, 0.05 * intensity));
      spotGrad2.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = spotGrad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Beam Angle
      const beamAngleRad = (atmosphere.lighting.beamAngle * Math.PI) / 180;
      const beamX = width * 0.5 + Math.cos(beamAngleRad) * 120;
      const beamY = height * 0.65;
      
      const beamGrad = ctx.createLinearGradient(width * 0.5, 0, beamX, beamY);
      beamGrad.addColorStop(0, hexToRgba(atmosphere.lighting.accentGlow, 0.15 * intensity));
      beamGrad.addColorStop(1, 'rgba(0,0,0,0)');
      
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(width * 0.5 - 60, 0);
      ctx.lineTo(width * 0.5 + 60, 0);
      ctx.lineTo(beamX + 180, beamY);
      ctx.lineTo(beamX - 180, beamY);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();
      ctx.restore();

      // 3. Render Particles
      const particles = particlesRef.current;
      const particleColor = atmosphere.particles.color;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (isAudioPlaying ? 1.4 : 1.0);
        p.y += p.vy * (isAudioPlaying ? 1.4 : 1.0);

        // Sinusoidal opacity breathing
        p.alpha = p.baseAlpha + Math.sin(tick * p.pulseSpeed) * 0.15;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(particleColor, Math.max(0.05, Math.min(1, p.alpha)));
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [atmosphere, isAudioPlaying]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Background radial gradient configured by tokens */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          backgroundColor: atmosphere.background.baseColor,
          backgroundImage: atmosphere.background.gradientOverlay,
        }}
      />
      {/* Dynamic Canvas Particles & Light Beams */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block" 
      />
      {/* Vignette Edge Shading */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, #000000 100%)',
          opacity: atmosphere.background.vignetteOpacity,
        }}
      />
    </div>
  );
};

function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
}
