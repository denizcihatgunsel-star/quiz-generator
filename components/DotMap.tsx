"use client";

// Scroll-to-explore world map: a real dot-matrix globe (rasterized from
// Natural Earth 110m) where every few scrolls a new country pops in,
// biggest first. Faint ocean grid sets the canvas; revealed countries are
// plum, unrevealed land stays invisible until its turn comes.

import { memo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import worldDots from "@/lib/data/world-dots.json";

const W = 1200;
const H = 600;
const SPACING = 20;
const SECTION_VH = 380;

const TOTAL = worldDots.length;

const OCEAN = (() => {
  const dots: { x: number; y: number }[] = [];
  for (let y = SPACING; y < H; y += SPACING) {
    for (let x = SPACING; x < W; x += SPACING) {
      dots.push({ x, y });
    }
  }
  return dots;
})();

const CountryGroup = memo(function CountryGroup({
  country,
  revealed,
}: {
  country: (typeof worldDots)[number];
  revealed: boolean;
}) {
  return (
    <g>
      {country.dots.map(([x, y], i) => (
        <circle
          key={`${country.name}-${i}`}
          cx={x}
          cy={y}
          r={2}
          fill="#8C5563"
          className={`world-dot${revealed ? " revealed" : ""}`}
          style={{ transitionDelay: `${(i * 37) % 300}ms` }}
        />
      ))}
    </g>
  );
});

export default function DotMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(TOTAL, Math.floor(v * TOTAL)));
    setCount((prev) => (prev === next ? prev : next));
  });

  const current = worldDots[count - 1];

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${SECTION_VH}vh` }}
      aria-hidden="true"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" className={className}>
          <title>Dot map of the world loading country by country</title>
          <g fill="#F1D3DA">
            {OCEAN.map((d, i) => (
              <circle key={`o${i}`} cx={d.x} cy={d.y} r={1.2} />
            ))}
          </g>
          {worldDots.map((country, i) => (
            <CountryGroup key={country.name} country={country} revealed={i < count} />
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#C98A98]">
            {String(Math.min(count, TOTAL)).padStart(2, "0")} / {TOTAL} countries
          </p>
          <p className="h-6 font-serif text-sm italic text-[#8C5563]">
            {current?.name ?? "Scroll to explore"}
          </p>
        </div>
      </div>
    </div>
  );
}
