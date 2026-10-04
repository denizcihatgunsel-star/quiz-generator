"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * HalloweenDecorations: Flat vector SVG decorations (Final Spec)
 * 
 * - 2 pumpkins: flat #E8833A, 90-120px, bottom corners, NO carved faces, hidden <640px
 * - 3 bats: flat, 16-28px, top-right area (left of right edge - 120px, below 140px from top)
 * - Gentle drift, professional flat style
 */

export function HalloweenPumpkins() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <>
      {/* Bottom left pumpkin - hidden <640px */}
      <motion.div
        className="hidden sm:block fixed bottom-8 left-8 z-[3] pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          {/* Flat pumpkin #E8833A - NO carved face */}
          <ellipse cx="55" cy="60" rx="42" ry="38" fill="#E8833A" />
          {/* Stem */}
          <path d="M52 25 Q55 22 58 25 L58 32 Q58 35 55 35 Q52 35 52 32 Z" fill="#78350F" />
          {/* Subtle ribs for dimension */}
          <path d="M55 23 Q53 60 55 97" stroke="#C2410C" strokeWidth="2.5" opacity="0.3" />
          <path d="M40 32 Q39 60 40 92" stroke="#C2410C" strokeWidth="2" opacity="0.25" />
          <path d="M70 32 Q71 60 70 92" stroke="#C2410C" strokeWidth="2" opacity="0.25" />
        </svg>
      </motion.div>

      {/* Bottom right pumpkin - hidden <640px */}
      <motion.div
        className="hidden sm:block fixed bottom-8 right-8 z-[3] pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <svg width="95" height="95" viewBox="0 0 95 95" fill="none">
          {/* Flat pumpkin #E8833A - NO carved face */}
          <ellipse cx="47" cy="52" rx="36" ry="33" fill="#E8833A" />
          {/* Stem */}
          <path d="M45 22 Q47 20 49 22 L49 28 Q49 30 47 30 Q45 30 45 28 Z" fill="#78350F" />
          {/* Subtle ribs */}
          <path d="M47 20 Q45 52 47 83" stroke="#C2410C" strokeWidth="2" opacity="0.3" />
          <path d="M34 28 Q33 52 34 78" stroke="#C2410C" strokeWidth="1.8" opacity="0.25" />
          <path d="M60 28 Q61 52 60 78" stroke="#C2410C" strokeWidth="1.8" opacity="0.25" />
        </svg>
      </motion.div>
    </>
  );
}

export function HalloweenBats() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 3 bats, top-right area
  // kept left of (right edge - 120px) and below 140px from top (clear Sound off pill)
  const bats = [
    { id: 1, right: "140px", top: "160px", size: 28, delay: 0, duration: 16 },
    { id: 2, right: "200px", top: "220px", size: 20, delay: 2, duration: 18 },
    { id: 3, right: "170px", top: "290px", size: 24, delay: 4, duration: 17 },
  ];

  return (
    <>
      {bats.map((bat) => (
        <motion.div
          key={bat.id}
          className="hidden md:block fixed z-[3] pointer-events-none"
          style={{
            right: bat.right,
            top: bat.top,
            width: bat.size,
            height: bat.size,
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  y: [-8, 8, -8],
                  x: [-4, 4, -4],
                  rotate: [-3, 3, -3],
                }
          }
          transition={{
            duration: bat.duration,
            delay: bat.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2A1520" opacity="0.5">
            {/* Simple flat bat silhouette */}
            <path d="M12 2c-1 0-2 1-2 2 0 .5.2 1 .5 1.4C9 6 8 7 7 7c-1.5 0-3 1-3 3 0 1 .5 2 1.5 2.5C4 13 3 14 3 15c0 2 2 3 4 3 1 0 2-.5 3-1l2 2 2-2c1 .5 2 1 3 1 2 0 4-1 4-3 0-1-1-2-2.5-2.5C20 12 20.5 11 20.5 10c0-2-1.5-3-3-3-1 0-2 1-3.5 1.6.3-.4.5-.9.5-1.4 0-1-1-2-2-2z" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}
