"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * HeroPumpkins: 3 minimalist glowing pumpkin SVGs
 * 
 * Positioned in side margins outside text column
 * Around the h1 'AI Quiz Generator that turns notes into quizzes'
 * - Top-right (below Sound off button at top-20)
 * - Bottom-left
 * - Third pumpkin middle-right
 * 
 * 3 on desktop (>1024px), 1 on tablet (640-1024px), none under 640px
 * Size: 56-96px
 * Opacity 0.4 with slow glow pulse 0.35-0.5 every 4s
 * Normal blend mode (light hero background)
 * z-index behind text, pointer-events:none, aria-hidden
 * Respects prefers-reduced-motion
 */

interface Pumpkin {
  id: string;
  position: "top-right" | "bottom-left" | "middle-right";
  size: number;
  delay: number;
  hideOnTablet?: boolean;
}

const PUMPKINS: Pumpkin[] = [
  { id: "p1", position: "top-right", size: 72, delay: 0, hideOnTablet: false },
  { id: "p2", position: "bottom-left", size: 80, delay: 1.3, hideOnTablet: true },
  { id: "p3", position: "middle-right", size: 64, delay: 2.6, hideOnTablet: true },
];

export default function HeroPumpkins() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const getPositionStyle = (position: string) => {
    switch (position) {
      case "top-right":
        return { right: "2%", top: "140px" }; // Below Sound off button (top-20 = 80px + margin)
      case "bottom-left":
        return { left: "2%", bottom: "15%" };
      case "middle-right":
        return { right: "3%", top: "50%" };
      default:
        return {};
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {PUMPKINS.map((pumpkin) => (
        <motion.div
          key={pumpkin.id}
          className={`hidden ${pumpkin.hideOnTablet ? "lg:block" : "sm:block"}`}
          style={{
            position: "absolute",
            ...getPositionStyle(pumpkin.position),
            width: pumpkin.size,
            height: pumpkin.size,
            opacity: 0.4,
          }}
          animate={
            reducedMotion
              ? { opacity: 0.4 }
              : {
                  opacity: [0.35, 0.5, 0.35],
                }
          }
          transition={{
            duration: 4,
            delay: pumpkin.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 12px rgba(255, 122, 26, 0.5))" }}
          >
            {/* Stem */}
            <path
              d="M48 10 Q50 5 52 10 L52 18 Q52 20 50 20 Q48 20 48 18 Z"
              fill="#4a7c59"
            />
            {/* Pumpkin body */}
            <ellipse cx="50" cy="55" rx="35" ry="32" fill="#ff7a1a" />
            {/* Ridges */}
            <path
              d="M50 25 Q48 50 50 85"
              stroke="#e66a10"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M38 30 Q36 55 38 82"
              stroke="#e66a10"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <path
              d="M62 30 Q64 55 62 82"
              stroke="#e66a10"
              strokeWidth="1.5"
              opacity="0.5"
            />
            {/* Eyes */}
            <path
              d="M35 45 L40 50 L35 55 Z"
              fill="#2d1810"
            />
            <path
              d="M65 45 L60 50 L65 55 Z"
              fill="#2d1810"
            />
            {/* Mouth */}
            <path
              d="M40 65 Q50 72 60 65"
              stroke="#2d1810"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
