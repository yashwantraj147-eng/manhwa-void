// Web Audio API procedural sound synthesizer (Zero external dependencies)
let audioCtx = null;
let ambientOsc = null;
let ambientGain = null;
let isMuted = localStorage.getItem('manhwa_sound_muted') === 'true';

function getContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const sound = {
  isMuted() {
    return isMuted;
  },

  setMuted(muted) {
    isMuted = muted;
    localStorage.setItem('manhwa_sound_muted', muted);
    if (isMuted && ambientGain) {
      ambientGain.gain.setValueAtTime(0, audioCtx ? audioCtx.currentTime : 0);
    }
  },

  toggleMute() {
    this.setMuted(!isMuted);
    return isMuted;
  },

  playChime() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Dual crystal bell chime
      [587.33, 880, 1174.66].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.65);
      });
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  },

  playSwoosh() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Filtered noise swoosh
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.08);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      filter.Q.value = 3;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  },

  playPop() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  },

  playLevelUp() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const chords = [440, 554.37, 659.25, 880];

      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.85);
      });
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  },

  toggleAmbientDrone(enabled) {
    try {
      const ctx = getContext();
      if (!ctx) return;

      if (!enabled || isMuted) {
        if (ambientGain) {
          ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
        }
        return;
      }

      if (!ambientOsc) {
        ambientOsc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        ambientGain = ctx.createGain();

        ambientOsc.type = 'sawtooth';
        ambientOsc.frequency.setValueAtTime(65.41, ctx.currentTime); // Low C note

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, ctx.currentTime);

        ambientGain.gain.setValueAtTime(0, ctx.currentTime);
        ambientGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.5);

        ambientOsc.connect(filter);
        filter.connect(ambientGain);
        ambientGain.connect(ctx.destination);

        ambientOsc.start();
      } else if (ambientGain) {
        ambientGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.0);
      }
    } catch (e) {
      console.warn('Ambient drone error', e);
    }
  }
};
