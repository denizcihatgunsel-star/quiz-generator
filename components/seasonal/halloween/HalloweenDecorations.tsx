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
      {/* Bottom left pumpkin with candle glow - hidden <640px */}
      <motion.div
        className="halloween-decoration scene-pumpkin hidden sm:block fixed bottom-8 left-8 z-[1]"
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

      {/* Bottom right pumpkin with candle glow - hidden <640px */}
      <motion.div
        className="halloween-decoration scene-pumpkin hidden sm:block fixed bottom-8 right-8 z-[1]"
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
          <svg viewBox="0 0 24 24" fill="#0a0510" opacity="0.85">
            {/* Dark bat silhouette with spread wings */}
            <path d="M21 10c-.6 0-1 .4-1 1 0 .3.1.6.3.8-.2.1-.4.2-.7.2-.8 0-1.5-.5-1.8-1.2-.1-.2-.3-.3-.5-.3s-.4.1-.5.3c-.4.9-1.3 1.5-2.3 1.5-.5 0-1-.2-1.4-.5-.2-.1-.4-.2-.6-.2s-.4.1-.6.2c-.4.3-.9.5-1.4.5-1 0-1.9-.6-2.3-1.5-.1-.2-.3-.3-.5-.3s-.4.1-.5.3c-.3.7-1 1.2-1.8 1.2-.3 0-.5-.1-.7-.2.2-.2.3-.5.3-.8 0-.6-.4-1-1-1s-1 .4-1 1c0 1.1.9 2 2 2 .4 0 .8-.1 1.1-.3.5.8 1.4 1.3 2.4 1.3.7 0 1.3-.2 1.8-.6.5.4 1.1.6 1.8.6s1.3-.2 1.8-.6c.5.4 1.1.6 1.8.6 1 0 1.9-.5 2.4-1.3.3.2.7.3 1.1.3 1.1 0 2-.9 2-2 0-.6-.4-1-1-1zM12 9c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1s-1 .4-1 1v1c0 .6.4 1 1 1z"/>
            <ellipse cx="12" cy="15" rx="2.5" ry="3" fill="#0a0510"/>
          </svg>
        </motion.div>
      ))}
    </>
  );
}

export function HalloweenAtmosphere() {
  return (
    <>
      {/* Pale moon - top-left behind headline with double-layer halo */}
      <div 
        className="halloween-moon halloween-decoration" 
        aria-hidden="true"
        style={{
          boxShadow: '0 0 40px 12px rgba(255, 233, 194, 0.55), 0 0 90px 30px rgba(255, 233, 194, 0.25)'
        }}
      />
      
      {/* Fog band - bottom of hero */}
      <div className="halloween-fog halloween-decoration" aria-hidden="true" />
      
      {/* Cobwebs - top corners, visible */}
      <div className="halloween-cobweb halloween-cobweb-tl halloween-decoration" aria-hidden="true">
        <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L70 70 M0 20 L70 70 M0 40 L70 70 M0 60 L70 70 M20 0 L70 70 M40 0 L70 70 M60 0 L70 70
                   M70 70 L70 0 M70 70 L0 70 M70 70 L35 20 M70 70 L20 35" 
                stroke="#2A1520" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="70" cy="70" r="4" fill="#2A1520"/>
        </svg>
      </div>
      <div className="halloween-cobweb halloween-cobweb-tr halloween-decoration" aria-hidden="true">
        <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M140 0 L70 70 M140 20 L70 70 M140 40 L70 70 M140 60 L70 70 M120 0 L70 70 M100 0 L70 70 M80 0 L70 70
                   M70 70 L70 0 M70 70 L140 70 M70 70 L105 20 M70 70 L120 35" 
                stroke="#2A1520" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="70" cy="70" r="4" fill="#2A1520"/>
        </svg>
      </div>
      
      {/* Candle glow - near cauldron */}
      <div className="halloween-candle-glow halloween-decoration" aria-hidden="true" />
    </>
  );
}
