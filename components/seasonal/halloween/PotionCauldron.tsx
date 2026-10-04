"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * PotionCauldron: Interactive cauldron with stirring mechanic
 * 
 * - SVG cauldron with bubbling ectoplasm
 * - Real drag/touch stirring with angular movement detection
 * - Stirring speed drives bubble particles
 * - Sample Bloom's taxonomy questions float up from vapor
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
  { text: "What is the derivative of x²?", bloom: "Remember", color: "#8B4513" },
  { text: "Explain why photosynthesis needs light", bloom: "Understand", color: "#4a7c59" },
  { text: "A car travels 150 km in 2.5 h; what is its average speed?", bloom: "Apply", color: "#7c3aed" },
  { text: "Compare the causes of WWI and WWII", bloom: "Analyze", color: "#b45309" },
  { text: "Which statistical test fits this dataset, and why?", bloom: "Evaluate", color: "#be123c" },
  { text: "Design an experiment to test plant growth vs. light colour", bloom: "Create", color: "#15803d" },
];

interface Bubble {
  id: string;
  x: number;
  duration: number;
}

export default function PotionCauldron() {
  const [stirSpeed, setStirSpeed] = useState(0);
  const [visibleQuestions, setVisibleQuestions] = useState<SampleQuestion[]>([]);
  const [wandAngle, setWandAngle] = useState(0);
  const [wandDistance, setWandDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(0);
  const questionIndexRef = useRef(0);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Generate bubbles based on stir speed
  useEffect(() => {
    if (reducedMotion) return;

    if (bubbleTimerRef.current) {
      clearInterval(bubbleTimerRef.current);
    }

    const interval = stirSpeed > 3 ? 200 : 1500; // Fast when stirring, slow when idle
    
    bubbleTimerRef.current = setInterval(() => {
      setBubbles(prev => {
        const newBubbles = [...prev];
        if (newBubbles.length >= 12) {
          newBubbles.shift(); // Remove oldest
        }
        newBubbles.push({
          id: `bubble-${Date.now()}-${Math.random()}`,
          x: 75 + Math.random() * 50, // SVG coordinates
          duration: 1.6 + Math.random() * 0.8,
        });
        return newBubbles;
      });
    }, interval);

    return () => {
      if (bubbleTimerRef.current) {
        clearInterval(bubbleTimerRef.current);
      }
    };
  }, [stirSpeed, reducedMotion]);

  // Remove bubbles after animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBubbles(prev => prev.slice(-12));
    }, 3000);
    return () => clearTimeout(timeout);
  }, [bubbles.length]);

  // Auto-spawn questions while stirring
  useEffect(() => {
    if (reducedMotion || stirSpeed < 3) {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
        questionTimerRef.current = null;
      }
      return;
    }

    if (!questionTimerRef.current) {
      questionTimerRef.current = setInterval(() => {
        if (visibleQuestions.length < 3) {
          const nextQuestion = SAMPLE_QUESTIONS[questionIndexRef.current % SAMPLE_QUESTIONS.length];
          setVisibleQuestions(prev => [...prev, nextQuestion]);
          questionIndexRef.current++;
        }
      }, 2500);
    }

    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
        questionTimerRef.current = null;
      }
    };
  }, [stirSpeed, visibleQuestions.length, reducedMotion]);

  // Auto-fade questions after 8 seconds
  useEffect(() => {
    if (visibleQuestions.length === 0) return;
    
    const timeout = setTimeout(() => {
      setVisibleQuestions(prev => prev.slice(1));
    }, 8000);

    return () => clearTimeout(timeout);
  }, [visibleQuestions]);

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;

      // Calculate angle and distance
      const angle = Math.atan2(dy, dx);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedDistance = Math.min(distance / (rect.width / 2), 1);

      setWandAngle(angle);
      setWandDistance(normalizedDistance * 0.4);

      // Calculate angular velocity for stirring
      let angleDiff = angle - lastAngleRef.current;
      
      // Handle wrap-around
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      const angularSpeed = Math.abs(angleDiff) * 50; // Scale factor
      setStirSpeed(Math.min(10, angularSpeed));

      lastAngleRef.current = angle;
    },
    []
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
    e.preventDefault();
    handlePointerMove(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
    // Decay stir speed
    setTimeout(() => setStirSpeed(0), 500);
  };

  const handleKeyboardStir = () => {
    // Simulate stirring burst
    setStirSpeed(8);
    
    if (visibleQuestions.length < 3) {
      const nextQuestion = SAMPLE_QUESTIONS[questionIndexRef.current % SAMPLE_QUESTIONS.length];
      setVisibleQuestions(prev => [...prev, nextQuestion]);
      questionIndexRef.current++;
    }

    setTimeout(() => setStirSpeed(0), 1000);
  };

  // Decay stir speed
  useEffect(() => {
    if (stirSpeed === 0 || isDragging) return;
    
    const decay = setInterval(() => {
      setStirSpeed(prev => Math.max(0, prev * 0.85));
    }, 100);

    return () => clearInterval(decay);
  }, [stirSpeed, isDragging]);

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
          <div className="relative flex flex-col items-center gap-3">
            <div
              ref={containerRef}
              className="relative touch-none select-none cursor-pointer w-[180px] h-[180px] sm:w-[240px] sm:h-[240px]"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMoveEvent}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{ touchAction: "none" }}
              role="application"
              aria-label="Interactive cauldron. Drag to stir and reveal sample questions."
            >
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Bubbles rising from liquid */}
                {!reducedMotion && bubbles.map((bubble) => (
                  <motion.circle
                    key={bubble.id}
                    cx={bubble.x}
                    cy={120}
                    r={2 + Math.random() * 3}
                    fill="#2ecc71"
                    opacity={0.7}
                    initial={{ cy: 120, opacity: 0.7, scale: 1 }}
                    animate={{ cy: 30, opacity: 0, scale: 1.5 }}
                    transition={{
                      duration: bubble.duration,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Cauldron body - plum tone */}
                <path
                  d="M60 80 L70 140 Q100 155 130 140 L140 80 Q100 90 60 80"
                  fill="#6A3A4C"
                  stroke="#4A2537"
                  strokeWidth="2"
                />

                {/* Liquid surface - green */}
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
                <path d="M70 140 L65 155" stroke="#3B2027" strokeWidth="3" strokeLinecap="round" />
                <path d="M100 145 L100 160" stroke="#3B2027" strokeWidth="3" strokeLinecap="round" />
                <path d="M130 140 L135 155" stroke="#3B2027" strokeWidth="3" strokeLinecap="round" />

                {/* Wand - follows drag */}
                <motion.g
                  animate={{
                    rotate: (wandAngle * 180 / Math.PI) + 90,
                    x: Math.cos(wandAngle) * wandDistance * 100,
                    y: Math.sin(wandAngle) * wandDistance * 100,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  style={{ transformOrigin: "100px 70px" }}
                >
                  <line
                    x1="100"
                    y1="70"
                    x2="100"
                    y2="40"
                    stroke="#8b4513"
                    strokeWidth="2.5"
                  />
                  <circle cx="100" cy="37" r="5" fill="#ffa500" />
                  <circle cx="100" cy="37" r="3" fill="#ffff00">
                    {!reducedMotion && stirSpeed > 2 && (
                      <animate
                        attributeName="opacity"
                        values="1;0.4;1"
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                </motion.g>
              </svg>

              {/* Instruction overlay */}
              {!isDragging && stirSpeed < 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 pointer-events-none"
                >
                  <div className="bg-[#FDE8EC]/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#F3D5DC] text-sm text-[#3B2027] whitespace-nowrap">
                    Drag to stir
                  </div>
                </motion.div>
              )}
            </div>

            <button
              onClick={handleKeyboardStir}
              className="mt-8 px-4 py-2 bg-[#3B2027] text-[#F6E3E8] text-sm font-medium hover:bg-[#52303B] transition-colors rounded-lg"
              aria-label="Stir the cauldron to reveal a question"
            >
              Stir
            </button>
          </div>

          {/* Questions panel */}
          <div className="flex-1 max-w-md w-full">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-[#A87680]">
                Sample questions
              </p>
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
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="p-4 border border-[#F3D5DC] bg-[#FDE8EC] rounded-xl shadow-sm"
                  >
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
            className="inline-flex items-center gap-3 rounded-full bg-[#3B2027] py-3 pl-6 pr-2 text-sm font-medium text-[#F6E3E8] transition-colors duration-200 hover:bg-[#52303B] shadow-[0_12px_28px_-12px_rgba(59,32,39,0.55)]"
          >
            <span>Generate your own quiz</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6E3E8] text-[#3B2027] transition-transform duration-200 hover:translate-x-0.5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
