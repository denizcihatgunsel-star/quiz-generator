"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import HalloweenGhost from './HalloweenGhost';

/**
 * Halloween Hero - Art group with moon, pumpkins, candles, ghosts, bats
 * All assets: Microsoft Fluent Emoji (MIT), Openclipart (CC0), NASA (public domain)
 * Bat: hand-drawn filled SVG
 * Mouse parallax on the entire art group
 */
export default function HalloweenHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isActive = true;
    const targetRef = { x: 0, y: 0 };
    const currentRef = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center, max 10px movement
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      targetRef.x = Math.max(-10, Math.min(10, deltaX * 10));
      targetRef.y = Math.max(-10, Math.min(10, deltaY * 10));
    };

    const animate = () => {
      if (!isActive) return;

      // Smooth interpolation
      currentRef.x += (targetRef.x - currentRef.x) * 0.1;
      currentRef.y += (targetRef.y - currentRef.y) * 0.1;

      setParallax({ x: currentRef.x, y: currentRef.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex items-end justify-center w-full max-w-[340px] sm:max-w-[380px] mx-auto" 
      style={{ minHeight: '380px', aspectRatio: 'auto' }}
    >
      <div
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          transition: 'transform 150ms ease-out',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Moon - NASA teal-tinted with soft glow, no black rim */}
        <div 
          className="halloween-moon" 
          aria-hidden="true"
          style={{ 
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
      
      {/* 3 Filled bats around upper moon - solid teal silhouettes */}
      <div className="absolute" style={{ top: '6%', left: '8%', zIndex: 2, transform: 'rotate(-12deg)' }}>
        <div style={{ width: '64px', height: '32px' }} className="max-[767px]:!w-[42px] max-[767px]:!h-[21px]">
          <Image
            src="/seasonal/halloween/bat-filled.svg"
            alt=""
            width={64}
            height={32}
            className="halloween-bat"
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      <div className="absolute" style={{ top: '4%', right: '12%', zIndex: 2, transform: 'rotate(15deg)' }}>
        <div style={{ width: '68px', height: '34px' }} className="max-[767px]:!w-[44px] max-[767px]:!h-[22px]">
          <Image
            src="/seasonal/halloween/bat-filled.svg"
            alt=""
            width={68}
            height={34}
            className="halloween-bat"
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      <div className="absolute" style={{ top: '10%', right: '6%', zIndex: 2, transform: 'rotate(-8deg) scaleX(-1)' }}>
        <div style={{ width: '72px', height: '36px' }} className="max-[767px]:!w-[46px] max-[767px]:!h-[23px]">
          <Image
            src="/seasonal/halloween/bat-filled.svg"
            alt=""
            width={72}
            height={36}
            className="halloween-bat"
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      
      {/* Left ghost at mid-height */}
      <HalloweenGhost 
        className="absolute" 
        style={{ top: '42%', left: '3%', zIndex: 2 }}
      />
      
      {/* Row of 5 pumpkins with 2 candles at LOWER THIRD (bottom 85-95% of moon) */}
      <div 
        className="halloween-pumpkin-row absolute" 
        style={{ 
          bottom: '8%', 
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          gap: '0.2rem',
          alignItems: 'flex-end',
          maxWidth: '92%'
        }}
      >
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={52} height={52} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/candle.webp" alt="" width={42} height={42} className="halloween-candle" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={68} height={68} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={88} height={88} className="halloween-pumpkin center" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={68} height={68} className="halloween-pumpkin" aria-hidden="true" />
        <Image src="/seasonal/halloween/candle.webp" alt="" width={42} height={42} className="halloween-candle" aria-hidden="true" />
        <Image src="/seasonal/halloween/pumpkin.webp" alt="" width={52} height={52} className="halloween-pumpkin" aria-hidden="true" />
      </div>
      
      {/* Right ghost bottom-right */}
      <HalloweenGhost 
        className="absolute" 
        style={{ bottom: '12%', right: '6%', zIndex: 2, transform: 'scaleX(-1)' }}
      />
      </div>
    </div>
  );
}
