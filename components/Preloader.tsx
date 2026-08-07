"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "EXAMINA".split("");
const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

export default function Preloader() {
  const [entered, setEntered] = useState(false);
  const [gone, setGone] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
    }
    if (sessionStorage.getItem("examina_entered") === "1") {
      setGone(true);
    }
  }, []);

  if (gone) return null;

  const handleEnter = () => {
    sessionStorage.setItem("examina_entered", "1");
    setEntered(true);
    setTimeout(() => setGone(true), 800);
  };

  if (reduced) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A]">
        <p className="font-serif text-4xl text-white">Examina</p>
        <button
          onClick={handleEnter}
          className="mt-10 text-sm uppercase tracking-[0.3em] text-white/80 transition-colors hover:text-white"
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: entered ? 0 : 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A]"
    >
      <div className="flex overflow-hidden">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.08 * i }}
            className="font-serif text-5xl tracking-tight text-white sm:text-7xl"
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-[11px] uppercase tracking-[0.4em] text-white/50"
      >
        A quiz generator
      </motion.p>
      <motion.button
        onClick={handleEnter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="group mt-14 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/80 transition-colors duration-200 hover:text-white"
      >
        <span>Enter</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
          </svg>
        </span>
      </motion.button>
    </motion.div>
  );
}
