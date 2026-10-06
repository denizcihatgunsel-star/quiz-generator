"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import HalloweenGhost from './HalloweenGhost';

/**
 * Halloween Hero - Art group with moon, pumpkins, candles, ghosts, bats
 * All assets: Microsoft Fluent Emoji (MIT), Openclipart (CC0), NASA (public domain)
 * Bat: hand-drawn filled SVG
 *
 * Layout is identical to the approved version: the outer box is a flex
 * container (items-end) and the pumpkin row is an in-flow flex child.
 * The parallax layer below is an absolutely positioned copy of that same
 * box (inset 0, same flex alignment), so every child keeps its position.
 * Parallax only writes the CSS `translate` property on that layer
 * (desktop, fine pointer, no reduced motion), never touching children.
 */
export default function HalloweenHero() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      layer.style.setProperty('translate', `${current.x.toFixed(2)}px ${current.y.toFixed(2)}px`);
      if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = layer.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      target.x = Math.max(-8, Math.min(8, dx * 8));
      target.y = Math.max(-8, Math.min(8, dy * 8));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      layer.style.removeProperty('translate');
    };
  }, []);

  return (
    <div className="relative flex items-end justify-center w-full max-w-[340px] sm:max-w-[380px] mx-auto" style={{ minHeight: '380px', aspectRatio: 'auto' }}>
      {/* Parallax layer: same box + same flex alignment as the outer container */}
      <div
        ref={layerRef}
        className="halloween-parallax-layer"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
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
      <HalloweenGhost className="absolute" style={{ top: '42%', left: '3%', zIndex: 2 }} />
      
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
      <HalloweenGhost className="absolute" style={{ bottom: '12%', right: '6%', zIndex: 2, transform: 'scaleX(-1)' }} />
      </div>
    </div>
  );
}
