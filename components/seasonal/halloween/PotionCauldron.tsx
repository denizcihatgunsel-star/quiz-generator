"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * PotionCauldron: Interactive cauldron with stirring mechanic
 * 
 * - SVG cauldron with bubbling ectoplasm
 * - Drag/touch to stir (wand follows pointer)
 * - Stirring speed drives bubble particles
 * - Sample Bloom's taxonomy questions float up
 * - Keyboard accessible with "Stir" button
 * - aria-live announces new questions
 * - Responsive on mobile
 */

interface SampleQuestion {
  text: string;
  bloom: string;
  color: string;
}

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  { text: "What is 2 + 2?", bloom: "Remember", color: "#8B4513" },
  { text: "Explain photosynthesis in your own words", bloom: "Understand", color: "#4a7c59" },
  { text: "Apply the quadratic formula to x² + 5x + 6 = 0", bloom: "Apply", color: "#7c3aed" },
  { text: "Compare mitosis and meiosis", bloom: "Analyze", color: "#b45309" },
  { text: "Evaluate the impact of the Industrial Revolution", bloom: "Evaluate", color: "#be123c" },
  { text: "Design an experiment to test water quality", bloom: "Create", color: "#15803d" },
];

export default function PotionCauldron() {
  const [stirSpeed, setStirSpeed] = useState(0);
  const [visibleQuestions, setVisibleQuestions] = useState<SampleQuestion[]>([]);
  const [wandPos, setWandPos] = useState({ x: 50, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef({ x: 50, y: 40 });
  const velocityRef = useRef(0);
  const questionIndexRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      // Clamp to cauldron bounds
      const clampedX = Math.max(20, Math.min(80, x));
      const clampedY = Math.max(30, Math.min(70, y));

      const dx = clampedX - lastPosRef.current.x;
      const dy = clampedY - lastPosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      velocityRef.current = speed;
      setStirSpeed(Math.min(10, speed * 2));

      lastPosRef.current = { x: clampedX, y: clampedY };
      setWandPos({ x: clampedX, y: clampedY });

      // Spawn question when stirring fast enough
      if (speed > 1.5 && visibleQuestions.length < 3) {
        const nextQuestion = SAMPLE_QUESTIONS[questionIndexRef.current % SAMPLE_QUESTIONS.length];
        setVisibleQuestions((prev) => [...prev, nextQuestion]);
        questionIndexRef.current++;
      }
    },
    [visibleQuestions.length]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handlePointerMove(e.clientX, e.clientY);
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMoveEvent = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handlePointerMove(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyboardStir = () => {
    // Simulate stirring motion
    const angle = Math.random() * Math.PI * 2;
    const radius = 15;
    const newX = 50 + Math.cos(angle) * radius;
    const newY = 50 + Math.sin(angle) * radius;

    setWandPos({ x: newX, y: newY });
    setStirSpeed(5);

    if (visibleQuestions.length < 3) {
      const nextQuestion = SAMPLE_QUESTIONS[questionIndexRef.current % SAMPLE_QUESTIONS.length];
      setVisibleQuestions((prev) => [...prev, nextQuestion]);
      questionIndexRef.current++;
    }

    setTimeout(() => setStirSpeed(0), 500);
  };

  useEffect(() => {
    const decay = setInterval(() => {
      setStirSpeed((prev) => Math.max(0, prev * 0.95));
      velocityRef.current *= 0.95;
    }, 100);

    return () => clearInterval(decay);
  }, []);

  const removeQuestion = (index: number) => {
    setVisibleQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // Auto-spawn questions when idle
  useEffect(() => {
    if (reducedMotion) return;

    const idleInterval = setInterval(() => {
      if (stirSpeed < 1 && visibleQuestions.length < 3) {
        const nextQuestion = SAMPLE_QUESTIONS[questionIndexRef.current % SAMPLE_QUESTIONS.length];
        setVisibleQuestions((prev) => [...prev, nextQuestion]);
        questionIndexRef.current++;
      }
    }, 2500);

    return () => clearInterval(idleInterval);
  }, [stirSpeed, visibleQuestions.length, reducedMotion]);

  // Generate idle bubbles
  const [idleBubbles, setIdleBubbles] = useState<number[]>([]);
  useEffect(() => {
    if (reducedMotion || stirSpeed > 2) return;

    const bubbleInterval = setInterval(() => {
      setIdleBubbles((prev) => [...prev, Date.now()].slice(-12));
    }, 1500);

    return () => clearInterval(bubbleInterval);
  }, [reducedMotion, stirSpeed]);

  return (
    <section className="relative py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-medium text-[#3B2027] mb-2">
            Stir up a quiz
          </h2>
          <p className="text-sm text-[#9A7280]">
            See what kinds of questions Examina generates
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-center">
          {/* Cauldron */}
          <div
            ref={containerRef}
            className="relative mx-auto touch-none select-none cursor-pointer"
            style={{
              width: "240px",
              height: "240px",
              touchAction: "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMoveEvent}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="application"
            aria-label="Interactive cauldron. Drag to stir and reveal sample questions."
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Idle bubbles */}
              {!reducedMotion && stirSpeed < 2 && (
                <>
                  {idleBubbles.map((timestamp) => (
                    <motion.circle
                      key={`idle-${timestamp}`}
                      cx={85 + Math.random() * 30}
                      cy={120}
                      r={2 + Math.random() * 2}
                      fill="#2ecc71"
                      opacity={0.6}
                      initial={{ cy: 120, opacity: 0.6 }}
                      animate={{ cy: 50, opacity: 0 }}
                      transition={{
                        duration: 1.6 + Math.random() * 0.8,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}

              {/* Stirring bubbles */}
              {!reducedMotion && stirSpeed > 0 && (
                <>
                  {Array.from({ length: Math.min(12, Math.floor(stirSpeed * 1.5)) }).map(
                    (_, i) => (
                      <motion.circle
                        key={`stir-${i}-${Date.now()}`}
                        cx={75 + Math.random() * 50}
                        cy={120}
                        r={2 + Math.random() * 3}
                        fill="#2ecc71"
                        opacity={0.7}
                        initial={{ cy: 120, opacity: 0.7 }}
                        animate={{ cy: 50, opacity: 0 }}
                        transition={{
                          duration: 1.6 + Math.random() * 0.8,
                          ease: "easeOut",
                        }}
                      />
                    )
                  )}
                </>
              )}

              {/* Cauldron body - plum tone */}
              <path
                d="M60 80 L70 140 Q100 155 130 140 L140 80 Q100 90 60 80"
                fill="#6A3A4C"
                stroke="#4A2537"
                strokeWidth="2"
              />

              {/* Liquid surface - green bubbles only */}
              <ellipse cx="100" cy="85" rx="42" ry="12" fill="#2ecc71" opacity="0.7">
                {!reducedMotion && (
                  <animate
                    attributeName="ry"
                    values="12;13;12"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                )}
              </ellipse>

              {/* Rim */}
              <ellipse
                cx="100"
                cy="80"
                rx="45"
                ry="8"
                fill="none"
                stroke="#3B2027"
                strokeWidth="3"
              />

              {/* Legs */}
              <path d="M70 140 L65 155" stroke="#3B2027" strokeWidth="3" />
              <path d="M100 145 L100 160" stroke="#3B2027" strokeWidth="3" />
              <path d="M130 140 L135 155" stroke="#3B2027" strokeWidth="3" />

              {/* Wand */}
              <motion.g
                animate={{ x: wandPos.x - 50, y: wandPos.y - 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <line
                  x1="100"
                  y1="40"
                  x2="100"
                  y2="10"
                  stroke="#8b4513"
                  strokeWidth="2"
                />
                <circle cx="100" cy="8" r="4" fill="#ffa500" />
                <circle cx="100" cy="8" r="2" fill="#ffff00">
                  {!reducedMotion && (
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              </motion.g>
            </svg>

            {/* Instruction overlay */}
            {!isDragging && stirSpeed === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-[#FDE8EC]/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#F3D5DC] text-sm text-[#3B2027]">
                  Drag to stir
                </div>
              </motion.div>
            )}
          </div>

          {/* Questions panel */}
          <div className="flex-1 max-w-md">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-[#A87680] mb-3">
                Sample questions
              </p>
              <button
                onClick={handleKeyboardStir}
                className="px-4 py-2 bg-[#3B2027] text-[#F6E3E8] text-sm font-medium hover:bg-[#52303B] transition-colors rounded-lg"
                aria-label="Stir the cauldron to reveal a question"
              >
                Stir
              </button>
            </div>

            <div
              className="space-y-3 min-h-[200px]"
              role="region"
              aria-live="polite"
              aria-atomic="false"
            >
              <AnimatePresence mode="popLayout">
                {visibleQuestions.map((q, i) => (
                  <motion.div
                    key={`${q.text}-${i}`}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 border border-[#F3D5DC] bg-[#FDE8EC] rounded-xl shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#F3D5DC] text-[#3B2027]">
                            Sample
                          </span>
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${q.color}20`,
                              color: q.color,
                            }}
                          >
                            {q.bloom}
                          </span>
                        </div>
                        <p className="text-sm text-[#3B2027] leading-relaxed">{q.text}</p>
                      </div>
                      <button
                        onClick={() => removeQuestion(i)}
                        className="text-[#9A7280] hover:text-[#3B2027] transition-colors"
                        aria-label="Dismiss question"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {visibleQuestions.length === 0 && (
              <p className="text-sm text-[#9A7280] italic">
                Stir the cauldron to reveal sample questions...
              </p>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="#generate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            Generate your own quiz
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
