"use client";

import { useEffect, useRef, useState } from "react";

type Pad = {
  ctx: AudioContext;
  master: GainNode;
  voices: { osc: OscillatorNode; gain: GainNode }[][];
  timers: number[];
  sparkleTimer: number;
};

const CHORDS: number[][] = [
  [220, 261.63, 329.63, 440],
  [174.61, 220, 261.63, 349.23],
  [261.63, 329.63, 392, 523.25],
  [196, 246.94, 293.66, 392],
];

const SPARKLES = [880, 1046.5, 1174.66, 1318.51, 1567.98, 1760];
const CHORD_LEVEL = 0.045;
const SWELL_MS = 2600;
const HOLD_MS = 5200;

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const padRef = useRef<Pad | null>(null);

  const sparkle = (ctx: AudioContext) => {
    const f = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    const t0 = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.013, t0 + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.7);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 1.8);
  };

  const start = () => {
    if (padRef.current) return; // already running
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1500;
    filter.Q.value = 0.4;
    master.connect(ctx.destination);
    filter.connect(master);

    const voices = CHORDS.map((chord) =>
      chord.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = freq;
        osc.detune.value = (Math.random() - 0.5) * 7;
        const gain = ctx.createGain();
        gain.gain.value = 0;
        osc.connect(gain);
        gain.connect(filter);
        osc.start();
        return { osc, gain };
      })
    );

    const pad: Pad = { ctx, master, voices, timers: [], sparkleTimer: 0 };
    padRef.current = pad;

    let chordIndex = 0;
    const setChord = (i: number) => {
      const now = ctx.currentTime;
      voices.forEach((chord, ci) => {
        const target = ci === i ? CHORD_LEVEL : 0;
        chord.forEach(({ gain }) => {
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(target, now + SWELL_MS / 1000);
        });
      });
    };

    setChord(0);
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 2);
    sparkle(ctx);

    const step = () => {
      if (!padRef.current || padRef.current !== pad) return;
      chordIndex = (chordIndex + 1) % CHORDS.length;
      setChord(chordIndex);
      const timer = window.setTimeout(step, SWELL_MS + HOLD_MS);
      pad.timers.push(timer);
    };
    pad.timers.push(window.setTimeout(step, SWELL_MS + HOLD_MS));

    const sparkleLoop = () => {
      if (!padRef.current || padRef.current !== pad) return;
      sparkle(ctx);
      pad.sparkleTimer = window.setTimeout(sparkleLoop, 4500 + Math.random() * 9000);
    };
    pad.sparkleTimer = window.setTimeout(sparkleLoop, 3500);
  };

  const stop = () => {
    const pad = padRef.current;
    if (!pad) return;
    const { ctx, master, voices, timers, sparkleTimer } = pad;
    timers.forEach((t) => window.clearTimeout(t));
    window.clearTimeout(sparkleTimer);
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 0.4);
    voices.forEach((chord) =>
      chord.forEach(({ gain }) => {
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
      })
    );
    window.setTimeout(() => {
      voices.forEach((chord) =>
        chord.forEach(({ osc }) => {
          try {
            osc.stop();
          } catch {
            // already stopped
          }
        })
      );
      void ctx.close();
    }, 500);
    padRef.current = null;
  };

  const toggle = () => {
    if (on) {
      stop();
    } else {
      start();
    }
    setOn(!on);
  };

  useEffect(() => {
    return () => {
      if (padRef.current) stop();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      className="fixed right-5 top-20 z-[90] flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white/75 px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-md transition-colors duration-200 hover:border-neutral-300 hover:text-black sm:bottom-5 sm:right-5 sm:top-auto"
    >
      {on ? (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.95 6a9 9 0 010 12M6 9H3v6h3l5 4V5L6 9z" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M10.5 5.7L6 9H3v6h3l5 4V5.7zM18.4 15.4A5 5 0 0015 8.4" />
        </svg>
      )}
      {on ? "Sound on" : "Sound off"}
    </button>
  );
}
