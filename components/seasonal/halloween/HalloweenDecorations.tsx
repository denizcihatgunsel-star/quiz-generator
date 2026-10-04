"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * HalloweenDecorations: All decorations behind content, pointer-events none
 * 
 * - 2 pumpkins: loaded from /seasonal/pumpkin.svg, hidden <640px
 * - 5-6 bats: top-right area, clear of nav and Sound off pill
 * - Moon, fog, cobwebs, candle glow
 * - Professional flat style, gentle animations
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
        className="halloween-decoration hidden sm:block fixed bottom-8 left-8 z-[1]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Image 
          src="/seasonal/pumpkin.svg" 
          alt="" 
          width={110} 
          height={110}
          aria-hidden="true"
        />
      </motion.div>

      {/* Bottom right pumpkin - hidden <640px */}
      <motion.div
        className="halloween-decoration hidden sm:block fixed bottom-8 right-8 z-[1]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Image 
          src="/seasonal/pumpkin.svg" 
          alt="" 
          width={95} 
          height={95}
          aria-hidden="true"
        />
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

  // 5-6 bats, top-right area, clear of nav and Sound off pill
  const bats = [
    { id: 1, right: "140px", top: "160px", size: 28, delay: 0, duration: 16 },
    { id: 2, right: "200px", top: "220px", size: 20, delay: 2, duration: 18 },
    { id: 3, right: "170px", top: "290px", size: 24, delay: 4, duration: 17 },
    { id: 4, right: "240px", top: "180px", size: 22, delay: 1, duration: 19 },
    { id: 5, right: "130px", top: "250px", size: 18, delay: 3, duration: 20 },
    { id: 6, right: "210px", top: "150px", size: 26, delay: 5, duration: 18 },
  ];

  return (
    <>
      {bats.map((bat) => (
        <motion.div
          key={bat.id}
          className="halloween-decoration hidden md:block fixed z-[1]"
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

export function HalloweenAtmosphere() {
  return (
    <>
      {/* Pale moon - top-left behind headline */}
      <div className="halloween-moon halloween-decoration" aria-hidden="true" />
      
      {/* Fog band - bottom of hero */}
      <div className="halloween-fog halloween-decoration" aria-hidden="true" />
      
      {/* Cobwebs - top corners */}
      <div className="halloween-cobweb halloween-cobweb-tl halloween-decoration" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L50 50 M0 20 L50 50 M0 40 L50 50 M20 0 L50 50 M40 0 L50 50" 
                stroke="#2A1520" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      </div>
      <div className="halloween-cobweb halloween-cobweb-tr halloween-decoration" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0 L50 50 M100 20 L50 50 M100 40 L50 50 M80 0 L50 50 M60 0 L50 50" 
                stroke="#2A1520" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      </div>
      
      {/* Candle glow - near cauldron */}
      <div className="halloween-candle-glow halloween-decoration" aria-hidden="true" />
    </>
  );
}
