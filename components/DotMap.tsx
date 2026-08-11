"use client";

// Scroll-to-explore world map: a real dot-matrix globe (rasterized from
// Natural Earth 110m) where scrolling reveals one country at a time,
// biggest first. Faint ocean grid sets the canvas; each new country pops
// in with a springy stagger and a soft "ignite" flash. The newest load
// shows in a counter with a thin progress line.

import { memo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import worldDots from "@/lib/data/world-dots.json";

const W = 1200;
const H = 600;
const SPACING = 20;

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

function smoothstep(t: number) {
  const v = Math.max(0, Math.min(1, t));
  return v * v * (3 - 2 * v);
}

const CountryGroup = memo(function CountryGroup({
  country,
  revealed,
  flash,
}: {
  country: (typeof worldDots)[number];
  revealed: boolean;
  flash: boolean;
}) {
  return (
    <g className={flash ? "country-flash" : undefined}>
      {country.dots.map(([x, y], i) => (
        <circle
          key={`${country.name}-${i}`}
          cx={x}
          cy={y}
          r={4}
          fill="#8C5563"
          className={`world-dot${revealed ? " revealed" : ""}`}
          style={{ transitionDelay: `${(i * 29) % 240}ms` }}
        />
      ))}
    </g>
  );
});

export default function DotMap({
  className,
  variant = "desktop",
}: {
  className?: string;
  variant?: "desktop" | "mobile";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const mobile = variant === "mobile";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(TOTAL, Math.floor(smoothstep(v) * TOTAL)));
    setCount((prev) => (prev === next ? prev : next));
  });

  const current = worldDots[count - 1];
  const progress = count / TOTAL;

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: `${mobile ? 480 : 680}vh` }}
      aria-hidden="true"
    >
      <div
        className={`sticky top-0 flex ${
          mobile ? "h-[86svh]" : "h-screen"
        } items-center justify-center overflow-hidden`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(176,96,122,0.2),transparent)]"
        />

        <svg viewBox={`0 0 ${W} ${H}`} fill="none" className={className}>
          <title>Dot map of the world loading country by country</title>
          <g fill="#F1D3DA">
            {OCEAN.map((d, i) => (
              <circle key={`o${i}`} cx={d.x} cy={d.y} r={1.1} />
            ))}
          </g>
          {worldDots.map((country, i) => (
            <CountryGroup
              key={country.name}
              country={country}
              revealed={i < count}
              flash={i === count - 1}
            />
          ))}
        </svg>

        <div
          className={`pointer-events-none absolute inset-x-0 ${
            mobile ? "bottom-16" : "bottom-8"
          } flex flex-col items-center gap-2 text-center`}
        >
          <div className="h-px w-40 overflow-hidden rounded-full bg-[#F3D5DC]">
            <div
              className="h-full origin-left bg-[#B0607A] transition-transform duration-500 ease-out"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <p
            className={`font-mono tracking-[0.3em] text-[#C98A98] ${
              mobile ? "text-[10px]" : "text-[11px]"
            }`}
          >
            {String(Math.min(count, TOTAL)).padStart(2, "0")} / {TOTAL} countries
          </p>
          <p
            className={`h-6 font-serif italic text-[#8C5563] ${
              mobile ? "text-xs" : "text-sm"
            }`}
          >
            {current?.name ?? "Scroll to explore"}
          </p>
        </div>
      </div>
    </div>
  );
}
