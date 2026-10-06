"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Halloween Ghost with a gentle hover-away effect.
 *
 * Renders exactly the same box as before (a positioned wrapper div holding
 * the 72x72 ghost image). The drift is written to the wrapper's CSS
 * `translate` property, which composes with any positioning `transform`
 * passed in via `style` (e.g. scaleX(-1)), so layout is never changed.
 * Disabled for coarse pointers and prefers-reduced-motion.
 */
export default function HalloweenGhost({
  style,
  className = '',
}: {
  style?: React.CSSProperties;
  className?: string;
}) {
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ghost = ghostRef.current;
    if (!ghost) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let pushed = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ghost.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const push = Math.min(20, ((150 - distance) / 150) * 20);
        ghost.style.setProperty(
          'translate',
          `${(-Math.cos(angle) * push).toFixed(1)}px ${(-Math.sin(angle) * push).toFixed(1)}px`
        );
        ghost.style.opacity = '0.7';
        pushed = true;
      } else if (pushed) {
        ghost.style.removeProperty('translate');
        ghost.style.opacity = '';
        pushed = false;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      ghost.style.removeProperty('translate');
      ghost.style.opacity = '';
    };
  }, []);

  return (
    <div
      ref={ghostRef}
      className={className}
      style={{ ...style, transition: 'translate 400ms ease, opacity 400ms ease' }}
    >
      <Image
        src="/seasonal/halloween/ghost.webp"
        alt=""
        width={72}
        height={72}
        className="halloween-ghost"
        aria-hidden="true"
      />
    </div>
  );
}
