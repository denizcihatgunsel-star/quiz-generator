"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * HeroCauldron: Licensed cauldron with rising question cards
 * 
 * - 220px desktop / 140px mobile
 * - Loaded from /seasonal/cauldron.svg (public domain, freesvg.org)
 * - Has built-in green bubbles, add few CSS bubbles only
 * - Question cards float up, one every 2.5s, max 3 visible
 * - White cards with 'Sample' tag + Bloom chip
 * - Cards rise and fade before reaching generator (mask in CSS)
 */

interface SampleQuestion {
  text: string;
  bloom: string;
  color: string;
}

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  { text: "What is the derivative of x²?", bloom: "Remember", color: "#78350F" },
  { text: "Explain why photosynthesis needs light", bloom: "Understand", color: "#15803d" },
  { text: "A car travels 150 km in 2.5 h; what is its average speed?", bloom: "Apply", color: "#7c3aed" },
  { text: "Compare the causes of WWI and WWII", bloom: "Analyze", color: "#b45309" },
  { text: "Which statistical test fits this dataset, and why?", bloom: "Evaluate", color: "#be123c" },
  { text: "Design an experiment to test plant growth vs. light colour", bloom: "Create", color: "#15803d" },
];

interface Bubble {
  id: string;
  x: number;
  delay: number;
}

export default function HeroCauldron() {
  const [visibleQuestions, setVisibleQuestions] = useState<SampleQuestion[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const questionIndexRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Generate few CSS bubbles (cauldron has built-in bubbles)
  useEffect(() => {
    if (reducedMotion) return;

    const bubbleCount = 3; // Just 3 CSS bubbles since SVG has animated ones
    const initialBubbles: Bubble[] = Array.from({ length: bubbleCount }, (_, i) => ({
      id: `bubble-${Date.now()}-${i}`,
      x: 40 + Math.random() * 20, // SVG coordinates
      delay: i * 0.4,
    }));
    
    setBubbles(initialBubbles);

    const interval = setInterval(() => {
      const newBubbles: Bubble[] = Array.from({ length: bubbleCount }, (_, i) => ({
        id: `bubble-${Date.now()}-${i}`,
        x: 40 + Math.random() * 20,
        delay: i * 0.4,
      }));
      setBubbles(newBubbles);
    }, 3000);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Spawn questions every 2.5s
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      if (visibleQuestions.length < 3) {
        const nextQuestion = SAMPLE_QUESTIONS[questionIndexRef.current % SAMPLE_QUESTIONS.length];
        setVisibleQuestions(prev => [...prev, nextQuestion]);
        questionIndexRef.current++;
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [visibleQuestions.length, reducedMotion]);

  // Auto-fade questions after 8s
  useEffect(() => {
    if (visibleQuestions.length === 0) return;
    
    const timeout = setTimeout(() => {
      setVisibleQuestions(prev => prev.slice(1));
    }, 8000);

    return () => clearTimeout(timeout);
  }, [visibleQuestions]);

  return (
    <div className="flex flex-col items-center gap-6 w-full md:w-auto">
      {/* Cauldron - loaded from licensed SVG file */}
      <div className="w-[140px] h-[140px] md:w-[220px] md:h-[220px] relative">
        <Image 
          src="/seasonal/cauldron.svg" 
          alt="" 
          width={220} 
          height={220}
          className="w-full h-full"
          aria-hidden="true"
          priority
        />
        {/* Few CSS bubbles (cauldron SVG has animated bubbles) */}
        {!reducedMotion && (
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {bubbles.map((bubble) => (
              <motion.circle
                key={bubble.id}
                cx={bubble.x}
                cy={70}
                r={2 + Math.random() * 1.5}
                fill="#B8E07A"
                opacity={0.7}
                initial={{ cy: 70, opacity: 0.7, scale: 1 }}
                animate={{ cy: 30, opacity: 0, scale: 1.3 }}
                transition={{
                  duration: 2.5 + Math.random() * 0.5,
                  delay: bubble.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </svg>
        )}
      </div>

      {/* Question cards */}
      <div className="w-full max-w-sm space-y-3" role="region" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {visibleQuestions.map((q, i) => (
            <motion.div
              key={`${q.text}-${i}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-3 bg-white border border-[#E8C9A0] rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F6B26B] bg-opacity-20 text-[#2A1520]">
                  Sample
                </span>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${q.color}20`,
                    color: q.color,
                  }}
                >
                  {q.bloom}
                </span>
              </div>
              <p className="text-xs text-[#2A1520] leading-relaxed">{q.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
