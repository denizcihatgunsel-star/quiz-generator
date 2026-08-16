"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hoverCapable =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

interface State {
  x: number;
  y: number;
  r: number;
  s: number;
}

const ZERO = { x: 0, y: 0, r: 0, s: 1 };

export default function MagneticText({
  text,
  wordClass = "",
  wordVariants,
}: {
  text: string;
  wordClass?: string;
  wordVariants?: Variants;
}) {
  const words = text.split(" ");
  const containerRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const targets = useRef<State[]>(words.map(() => ({ ...ZERO })));
  const current = useRef<State[]>(words.map(() => ({ ...ZERO })));
  const raf = useRef(0);
  const active = useRef(false);
  const tickRef = useRef<(t: number) => void>(() => {});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const range = 150;
      for (let i = 0; i < wordRefs.current.length; i++) {
        const span = wordRefs.current[i];
        if (!span) continue;
        const sRect = span.getBoundingClientRect();
        const scx = sRect.left + sRect.width / 2 - rect.left;
        const scy = sRect.top + sRect.height / 2 - rect.top;
        const dx = cx - scx;
        const dy = cy - scy;
        const d = Math.hypot(dx, dy) || 1;
        const f = Math.max(0, 1 - d / range);
        targets.current[i] = {
          x: (dx / d) * f * 14,
          y: (dy / d) * f * 18,
          r: (dx / d) * f * -8,
          s: 1 + f * 0.12,
        };
      }
    };
    const onLeave = () => {
      targets.current = words.map(() => ({ ...ZERO }));
    };

    if (hoverCapable && !reduced) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    }

    tickRef.current = (t: number) => {
      for (let i = 0; i < current.current.length; i++) {
        const trg = targets.current[i];
        const cur = current.current[i];
        cur.x += (trg.x - cur.x) * 0.1;
        cur.y += (trg.y - cur.y) * 0.1;
        cur.r += (trg.r - cur.r) * 0.1;
        cur.s += (trg.s - cur.s) * 0.1;

        const pushF = Math.min(1, Math.hypot(trg.x, trg.y) / 18);
        const idleW = 1 - pushF;
        const ix = Math.sin(t * 0.0011 + i * 1.1) * 2 * idleW;
        const iy = Math.sin(t * 0.0014 + i * 1.4) * 2.5 * idleW;

        const span = wordRefs.current[i];
        if (span) {
          span.style.transform =
            `translate3d(${(cur.x + ix).toFixed(2)}px, ${(cur.y + iy).toFixed(2)}px, 0) ` +
            `rotate(${cur.r.toFixed(2)}deg) scale(${cur.s.toFixed(3)})`;
        }
      }
      if (active.current) raf.current = requestAnimationFrame(tickRef.current);
    };

    if (hoverCapable && !reduced) {
      active.current = true;
      raf.current = requestAnimationFrame(tickRef.current);
    }

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <span ref={containerRef} className="inline">
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={wordVariants}
          className={`mr-[0.24em] inline-block will-change-transform ${wordClass}`}
        >
          <span
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className="inline-block will-change-transform"
          >
            {w}
          </span>
        </motion.span>
      ))}
    </span>
  );
}