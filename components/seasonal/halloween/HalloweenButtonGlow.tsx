"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HalloweenButtonGlow: Wrapper for enhanced button interactions
 * 
 * Targets:
 * - #generate button (Generate Answer)
 * - Sign in link (/auth/login)
 * 
 * Effects:
 * - Orange-to-plum border + shadow on hover/focus-visible (200ms)
 * - 2 bat silhouettes (16px) flutter out once on hover (600ms)
 * - Keyboard accessible (same glow on :focus-visible)
 */

interface BatAnimation {
  id: string;
  direction: "left" | "right";
}

export default function HalloweenButtonGlow({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [bats, setBats] = useState<BatAnimation[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const triggerBats = () => {
    if (reducedMotion || hasTriggered) return;
    
    const newBats: BatAnimation[] = [
      { id: `bat-left-${Date.now()}`, direction: "left" },
      { id: `bat-right-${Date.now() + 1}`, direction: "right" },
    ];
    setBats(newBats);
    setHasTriggered(true);

    setTimeout(() => {
      setBats([]);
      setHasTriggered(false);
    }, 600);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerBats();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = (e: React.FocusEvent) => {
    setIsFocused(true);
    triggerBats();
  };

  const handleBlur = (e: React.FocusEvent) => {
    setIsFocused(false);
  };

  const isActive = isHovered || isFocused;

  return (
    <div
      className="relative inline-block will-change-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      style={{ isolation: "isolate" }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-[-2px] rounded-[inherit] pointer-events-none transition-opacity duration-200"
        style={{
          opacity: isActive ? 1 : 0,
          boxShadow: isActive
            ? "0 0 0 2px rgba(255, 122, 26, 0.4), 0 0 20px rgba(176, 96, 122, 0.3)"
            : "none",
          background: isActive
            ? "linear-gradient(135deg, rgba(255, 122, 26, 0.15), rgba(176, 96, 122, 0.15))"
            : "transparent",
        }}
      />

      {/* Bats */}
      <AnimatePresence>
        {bats.map((bat) => (
          <motion.div
            key={bat.id}
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: bat.direction === "left" ? "0%" : "100%",
              width: 16,
              height: 16,
            }}
            initial={{
              x: 0,
              y: "-50%",
              opacity: 0,
              rotate: bat.direction === "left" ? -15 : 15,
            }}
            animate={{
              x: bat.direction === "left" ? -40 : 40,
              y: ["-50%", "-70%", "-90%"],
              opacity: [0, 1, 0],
              rotate: bat.direction === "left" ? [-15, -25, -35] : [15, 25, 35],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="text-[#3B2027]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 8c0-.5.3-1 .8-1.2.4-.2.9-.1 1.2.2l1 1V6c0-.6.4-1 1-1s1 .4 1 1v3l2-2c.3-.3.8-.4 1.2-.2.5.2.8.7.8 1.2 0 .3-.1.6-.3.8L8 11.6l2.7 2.8c.2.2.3.5.3.8 0 .5-.3 1-.8 1.2-.4.2-.9.1-1.2-.2l-2-2v3c0 .6-.4 1-1 1s-1-.4-1-1v-2l-1 1c-.3.3-.8.4-1.2.2-.5-.2-.8-.7-.8-1.2 0-.3.1-.6.3-.8L5 12.4 2.3 9.6c-.2-.2-.3-.5-.3-.8z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Original button/link */}
      {children}
    </div>
  );
}
