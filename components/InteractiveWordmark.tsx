"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const WORD = "Examina";
const EASE_OUT = [0.2, 0.65, 0.3, 0.9] as const;

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

export default function InteractiveWordmark({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const targets = useRef<State[]>(WORD.split("").map(() => ({ ...ZERO })));
  const current = useRef<State[]>(WORD.split("").map(() => ({ ...ZERO })));
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
      const range = 190;
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
          x: (dx / d) * f * 26,
          y: (dy / d) * f * 34,
          r: (dx / d) * f * -14,
          s: 1 + f * 0.3,
        };
      }
    };
    const onLeave = () => {
      targets.current = WORD.split("").map(() => ({ ...ZERO }));
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

        const pushF = Math.min(1, Math.hypot(trg.x, trg.y) / 34);
        const idleW = 1 - pushF;
        const ix = Math.sin(t * 0.0012 + i * 0.9) * 4 * idleW;
        const iy = Math.sin(t * 0.0015 + i * 1.2) * 5 * idleW;

        const span = letterRefs.current[i];
        if (span) {
          span.style.transform =
            `translate3d(${(cur.x + ix).toFixed(2)}px, ${(cur.y + iy).toFixed(2)}px, 0) ` +
            `rotate(${cur.r.toFixed(2)}deg) scale(${cur.s.toFixed(3)})`;
        }
      }
      if (active.current) raf.current = requestAnimationFrame(tickRef.current);
    };

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <motion.div ref={containerRef} className={`group relative ${className ?? ""}`}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(233,168,184,0.55), transparent 70%)",
        }}
      />
      {WORD.split("").map((letter, i) => (
        <span key={i} className="inline-block align-bottom">
          <motion.span
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className="inline-block will-change-transform"
            initial={{ y: "1.1em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 + i * 0.06 }}
            onAnimationComplete={() => {
              if (i === WORD.length - 1 && !active.current && !reduced) {
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
