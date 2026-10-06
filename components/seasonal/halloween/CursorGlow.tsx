"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * Halloween cursor glow - follows pointer with lag on desktop
 * Hidden over quiz box and form fields
 */
export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for fine pointer (desktop)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isActive = true;

    const handlePointerMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      
      // Hide over certain elements
      const target = e.target as HTMLElement;
      const shouldHide = target.closest('input, textarea, select, .quiz-box, [role="dialog"]');
      setIsVisible(!shouldHide);
    };

    const animate = () => {
      if (!isActive) return;

      // Smooth lag effect
      const lag = 0.12;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lag;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lag;

      setPosition({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      document.removeEventListener('pointermove', handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="halloween-cursor-glow"
      style={{
        left: position.x,
        top: position.y,
      }}
      aria-hidden="true"
    />
  );
}
