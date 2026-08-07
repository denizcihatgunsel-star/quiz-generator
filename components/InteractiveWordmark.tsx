"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const WORD = "Examina";
const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

export default function InteractiveWordmark({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const targets = useRef(WORD.split("").map(() => ({ x: 0, y: 0 })));
  const current = useRef(WORD.split("").map(() => ({ x: 0, y: 0 })));
  const raf = useRef(0);
  const active = useRef(false);
  const tickRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const strength = 30;
      const range = 160;
      for (let i = 0; i < letterRefs.current.length; i++) {
        const span = letterRefs.current[i];
        if (!span) continue;
        const sRect = span.getBoundingClientRect();
        const scx = sRect.left + sRect.width / 2 - rect.left;
        const scy = sRect.top + sRect.height / 2 - rect.top;
        const dx = cx - scx;
        const dy = cy - scy;
        const d = Math.hypot(dx, dy) || 1;
        const f = Math.max(0, 1 - d / range);
        targets.current[i] = {
          x: (dx / d) * f * strength * 0.35,
          y: (dy / d) * f * strength,
        };
      }
    };
    const onLeave = () => {
      targets.current = WORD.split("").map(() => ({ x: 0, y: 0 }));
    };

    tickRef.current = () => {
      for (let i = 0; i < current.current.length; i++) {
        current.current[i].x += (targets.current[i].x - current.current[i].x) * 0.12;
        current.current[i].y += (targets.current[i].y - current.current[i].y) * 0.12;
        const span = letterRefs.current[i];
        if (span) {
          span.style.transform = `translate3d(${current.current[i].x.toFixed(2)}px, ${current.current[i].y.toFixed(2)}px, 0)`;
        }
      }
      if (active.current) raf.current = requestAnimationFrame(tickRef.current);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <motion.div ref={containerRef} className={className}>
      {WORD.split("").map((letter, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
          <motion.span
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 + i * 0.06 }}
            onAnimationComplete={() => {
              if (i === WORD.length - 1 && !active.current) {
                active.current = true;
                raf.current = requestAnimationFrame(tickRef.current);
              }
            }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
