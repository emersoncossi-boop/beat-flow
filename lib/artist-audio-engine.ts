'use client';

import { AtmosphereConfig } from '@/lib/artist-universe';

class ArtistAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: NodeJS.Timeout | null = null;
  private currentBpm = 126;
  private currentTone: string = 'sub-pulse';

  public init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setAtmosphere(atmosphere: AtmosphereConfig) {
    this.currentBpm = atmosphere.audioSignature.suggestedBpm;
    this.currentTone = atmosphere.audioSignature.synthesizerTone;
    if (this.isPlaying) {
      // Re-arm clock with new tempo
      this.stop();
      this.start(atmosphere);
    }
  }

  public start(atmosphere: AtmosphereConfig) {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.currentBpm = atmosphere.audioSignature.suggestedBpm;
    this.currentTone = atmosphere.audioSignature.synthesizerTone;

    const intervalMs = (60 / this.currentBpm) * 500; // 8th notes loop
    let step = 0;

    this.intervalId = setInterval(() => {
      this.playStep(step % 16);
      step++;
    }, intervalMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playStep(stepIndex: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 4-on-the-floor Kick Drum (steps 0, 4, 8, 12)
    if (stepIndex % 4 === 0) {
      this.triggerKick(now);
    }

    // Offbeat Hi-hat (steps 2, 6, 10, 14)
    if (stepIndex % 4 === 2) {
      this.triggerHat(now);
    }

    // Procedural Bass / Atmosphere synth line based on chosen preset tone
    if (stepIndex % 2 === 1 || stepIndex === 0) {
      this.triggerSynth(now, stepIndex);
    }
  }

  private triggerKick(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  private triggerHat(time: number) {
    if (!this.ctx) return;
    // High frequency blip simulating closed analog hat
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(7500, time);
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.06);
  }

  private triggerSynth(time: number, step: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    let baseFreq = 55; // A1
    if (step === 2) baseFreq = 65.4; // C2
    if (step === 6) baseFreq = 73.4; // D2
    if (step === 10) baseFreq = 82.4; // E2

    if (this.currentTone === 'dark-sub') {
      osc.type = 'sawtooth';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, time);
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
    } else if (this.currentTone === 'tribal-wood') {
      osc.type = 'sine';
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(420, time);
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    } else if (this.currentTone === 'synthwave-saw') {
      osc.type = 'sawtooth';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850, time);
      gain.gain.setValueAtTime(0.14, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
    } else if (this.currentTone === 'warm-pad') {
      osc.type = 'triangle';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, time);
      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);
    } else {
      osc.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, time);
      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    }

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.5);
  }
}

export const artistAudioEngine = new ArtistAudioEngine();
