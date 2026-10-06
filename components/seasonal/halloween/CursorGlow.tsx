"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * Halloween cursor glow - follows the pointer with a little lag.
 * Desktop only (fine pointer), never with prefers-reduced-motion, and
 * hidden while the pointer is over the quiz box / form fields.
 * Position is written straight to the element (no React re-render per frame)
 * and the rAF loop stops once the glow has caught up with the pointer.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const glow = glowRef.current;
    if (!glow) return;

    const target = { x: -500, y: -500 };
    const current = { x: -500, y: -500 };
    let raf = 0;
    let first = true;

    const paint = () => {
      glow.style.transform = `translate3d(${(current.x - 110).toFixed(1)}px, ${(current.y - 110).toFixed(1)}px, 0)`;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      paint();
      if (Math.abs(target.x - current.x) > 0.3 || Math.abs(target.y - current.y) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (first) {
        current.x = target.x;
        current.y = target.y;
        first = false;
      }
      const el = e.target as Element | null;
      const overForm = !!el?.closest?.('form, input, textarea, select, button, #generate, [role="dialog"]');
      glow.style.opacity = overForm ? '0' : '1';
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const handleLeave = () => {
      glow.style.opacity = '0';
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={glowRef} className="halloween-cursor-glow" style={{ opacity: 0 }} aria-hidden="true" />;
}
