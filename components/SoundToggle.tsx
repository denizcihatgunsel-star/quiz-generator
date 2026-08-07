"use client";

import { useRef, useState } from "react";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<{
    ctx: AudioContext;
    nodes: OscillatorNode[];
  } | null>(null);

  const chime = (ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  };

  const start = () => {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const gain = ctx.createGain();
    gain.gain.value = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;

    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = 110;
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = 110.6;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;

    o1.connect(filter);
    o2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    o1.start();
    o2.start();
    lfo.start();
    gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.5);

    audioRef.current = { ctx, nodes: [o1, o2, lfo] };
    chime(ctx);
  };

  const stop = () => {
    if (!audioRef.current) return;
    const { ctx, nodes } = audioRef.current;
    for (const n of nodes) {
      try {
        n.stop();
      } catch {
        // already stopped
      }
    }
    void ctx.close();
    audioRef.current = null;
  };

  const toggle = () => {
    if (on) {
      stop();
    } else {
      start();
    }
    setOn(!on);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      className="fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white/75 px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-md transition-colors duration-200 hover:border-neutral-300 hover:text-black"
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
