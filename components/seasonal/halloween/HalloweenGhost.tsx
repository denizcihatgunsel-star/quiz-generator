"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * Halloween Ghost with hover-away effect
 * Drifts away from cursor on hover, fades to 70%
 */
export default function HalloweenGhost({ 
  style, 
  className = '' 
}: { 
  style?: React.CSSProperties; 
  className?: string 
}) {
  const ghostRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ghost = ghostRef.current;
    if (!ghost) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ghost.getBoundingClientRect();
      const ghostCenterX = rect.left + rect.width / 2;
      const ghostCenterY = rect.top + rect.height / 2;
      
      const dx = e.clientX - ghostCenterX;
      const dy = e.clientY - ghostCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If cursor within 150px, drift away
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const pushDistance = Math.min(20, (150 - distance) / 150 * 20);
        setOffset({
          x: -Math.cos(angle) * pushDistance,
          y: -Math.sin(angle) * pushDistance
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={ghostRef}
      className={className}
      style={{
        ...style,
        transform: `${style?.transform || ''} translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 400ms ease, opacity 400ms ease',
      }}
    >
      <Image
        src="/seasonal/halloween/ghost.webp"
        alt=""
        width={72}
        height={72}
        className="halloween-ghost"
        aria-hidden="true"
        style={{
          opacity: offset.x !== 0 || offset.y !== 0 ? 0.7 : 1,
          transition: 'opacity 400ms ease'
        }}
      />
    </div>
  );
}
