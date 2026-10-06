"use client";

import { isHalloweenSeason } from "@/lib/seasonal";

/**
 * Mobile Halloween decorations (phone /m app shell, marketing quiz soft accents,
 * /m/pricing). Visual-only: pointer-events none, z behind controls.
 * Renders nothing when the season is off or after the Nov 1 TRT cutoff.
 */

type Variant = "app-hero" | "jump" | "quiz-soft" | "pricing" | "nav-strip";

const PUMPKIN = "/seasonal/halloween/pumpkin.webp";
const CANDLE = "/seasonal/halloween/candle.webp";
const GHOST = "/seasonal/halloween/ghost.webp";
const BAT = "/seasonal/halloween/bat-filled.svg";
const MOON = "/seasonal/halloween/moon-teal.webp";

function Prop({
  src,
  className,
  style,
  alt = "",
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden="true"
      draggable={false}
      className={`hw-m-prop ${className ?? ""}`}
      style={style}
    />
  );
}

function MoonGlow({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`hw-m-moon ${className ?? ""}`}
      style={style}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOON} alt="" draggable={false} className="hw-m-moon-img" />
    </div>
  );
}

/**
 * Always emits decoration markup while the Halloween calendar window is open.
 * Visibility is CSS-only: `[data-season="halloween"] .hw-m-layer`.
 * That keeps Soft A / Pricing A / app-shell props in SSR HTML for anonymous
 * hard-reload checks, while ?halloween=0 (drops data-season) still hides them.
 */
export default function MobileHalloweenDecor({
  variant,
  active: _activeProp,
  className = "",
}: {
  variant: Variant;
  /** Ignored — kept for call-site compat. Visibility is data-season CSS. */
  active?: boolean;
  className?: string;
}) {
  if (!isHalloweenSeason()) return null;

  if (variant === "app-hero") {
    return (
      <div
        className={`hw-m-layer hw-m-layer--app-hero pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
        aria-hidden="true"
        data-hw-mobile="app-hero"
      >
        <MoonGlow
          className="hw-m-moon--soft"
          style={{
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 220,
            height: 220,
          }}
        />
      </div>
    );
  }

  if (variant === "jump") {
    return (
      <div
        className={`hw-m-layer hw-m-layer--jump pointer-events-none absolute inset-0 z-0 overflow-visible ${className}`}
        aria-hidden="true"
        data-hw-mobile="jump"
      >
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 36, height: 36, top: -6, left: -10 }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 28, height: 14, top: 18, left: -14, transform: "rotate(-18deg)" }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 42, height: 42, top: 70, left: -18 }} />
        <Prop src={CANDLE} className="hw-m-candle" style={{ width: 28, height: 28, bottom: 8, left: -8 }} />

        <Prop src={BAT} className="hw-m-bat" style={{ width: 30, height: 15, top: -4, right: -12, transform: "rotate(12deg)" }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 40, height: 40, top: 48, right: -14 }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 38, height: 38, bottom: 24, right: -16, transform: "scaleX(-1)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 24, height: 12, bottom: 4, right: 4, transform: "rotate(-8deg) scaleX(-1)" }} />
      </div>
    );
  }

  if (variant === "quiz-soft") {
    /* Option A · Soft: pumpkins/candle above card, ghosts+bats in gutters only.
       No dense moon glow behind the quiz card. */
    return (
      <div
        className={`hw-m-layer hw-m-layer--quiz-soft pointer-events-none absolute inset-0 z-0 overflow-visible ${className}`}
        aria-hidden="true"
        data-hw-mobile="quiz-soft"
      >
        {/* Compact moon peek top-right (not behind the card) */}
        {/* Compact moon peek — kept clear of the card / Example link */}
        <MoonGlow
          className="hw-m-moon--soft"
          style={{
            top: -100,
            right: -100,
            width: 72,
            height: 72,
          }}
        />

        {/* Thin band ABOVE the quiz card: 2 pumpkins + candle */}
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 28, height: 28, top: -36, left: "14%" }} />
        <Prop src={CANDLE} className="hw-m-candle" style={{ width: 24, height: 24, top: -38, left: "42%" }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 26, height: 26, top: -36, left: "56%" }} />

        {/* Upper gutter ghosts — right ghost fully off the card edge */}
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 40, height: 40, top: "2%", left: -18 }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 32, height: 32, top: -28, right: -40, transform: "scaleX(-1)" }} />

        {/* Side gutter bats only */}
        <Prop src={BAT} className="hw-m-bat" style={{ width: 22, height: 11, top: "22%", left: -10, transform: "rotate(-12deg)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 20, height: 10, top: "40%", left: -8, transform: "rotate(8deg) scaleX(-1)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 22, height: 11, top: "58%", left: -10, transform: "rotate(-6deg)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 22, height: 11, top: "24%", right: -10, transform: "rotate(14deg)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 20, height: 10, top: "42%", right: -8, transform: "rotate(-10deg)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 22, height: 11, top: "60%", right: -10, transform: "rotate(6deg) scaleX(-1)" }} />

        {/* Peeking ghost bottom-left + tiny pumpkin bottom-right */}
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 36, height: 36, bottom: -4, left: -14 }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 24, height: 24, bottom: 0, right: -8 }} />
      </div>
    );
  }

  if (variant === "pricing") {
    return (
      <div
        className={`hw-m-layer hw-m-layer--pricing pointer-events-none absolute inset-0 z-0 overflow-visible ${className}`}
        aria-hidden="true"
        data-hw-mobile="pricing"
      >
        <MoonGlow
          className="hw-m-moon--soft"
          style={{
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: 200,
            height: 200,
          }}
        />
        {/* Side ghosts / bats — left pair tucked beside/behind label, not over "Pricing" */}
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 38, height: 38, top: 44, left: -26 }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 24, height: 12, top: -14, left: -20, transform: "rotate(-12deg)" }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 44, height: 44, top: 10, right: -14, transform: "scaleX(-1)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 26, height: 13, top: 2, right: 36, transform: "rotate(14deg)" }} />

        {/* Gutter pumpkins / candles between card lanes (absolute along page) */}
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 34, height: 34, top: 210, left: -10 }} />
        <Prop src={CANDLE} className="hw-m-candle" style={{ width: 26, height: 26, top: 250, right: -8 }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 38, height: 38, top: 420, right: -12 }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 42, height: 42, top: 400, left: -14 }} />
        <Prop src={CANDLE} className="hw-m-candle" style={{ width: 28, height: 28, top: 560, left: -8 }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 32, height: 32, top: 580, right: -10 }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 24, height: 12, top: 700, left: -6, transform: "rotate(-8deg)" }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 40, height: 40, top: 720, right: -14, transform: "scaleX(-1)" }} />

        {/* Footer strip — fixed in the first viewport above the tab bar (Option A) */}
        <div className="hw-m-footer-strip hw-m-pricing-footer-fixed flex items-end justify-center gap-3">
          <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 32, height: 32, position: "relative", top: "auto", left: "auto", right: "auto" }} />
          <Prop src={BAT} className="hw-m-bat" style={{ width: 28, height: 14, position: "relative", top: "auto", left: "auto", right: "auto" }} />
          <Prop src={CANDLE} className="hw-m-candle" style={{ width: 28, height: 28, position: "relative", top: "auto", left: "auto", right: "auto" }} />
          <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 34, height: 34, position: "relative", top: "auto", left: "auto", right: "auto" }} />
          <Prop src={BAT} className="hw-m-bat" style={{ width: 28, height: 14, position: "relative", top: "auto", left: "auto", right: "auto", transform: "scaleX(-1)" }} />
          <Prop src={CANDLE} className="hw-m-candle" style={{ width: 28, height: 28, position: "relative", top: "auto", left: "auto", right: "auto" }} />
          <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 32, height: 32, position: "relative", top: "auto", left: "auto", right: "auto" }} />
        </div>
      </div>
    );
  }

  // nav-strip — thin row ABOVE the bottom tab bar, never on the icons
  return (
    <div
      className={`hw-m-layer hw-m-layer--nav-strip hw-m-nav-strip pointer-events-none fixed inset-x-0 flex items-end justify-center gap-3 ${className}`}
      aria-hidden="true"
      data-hw-mobile="nav-strip"
    >
      <Prop src={BAT} className="hw-m-bat" style={{ width: 26, height: 13, position: "relative", top: "auto", left: "auto", right: "auto", transform: "rotate(-10deg)" }} />
      <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 28, height: 28, position: "relative", top: "auto", left: "auto", right: "auto" }} />
      <Prop src={BAT} className="hw-m-bat" style={{ width: 24, height: 12, position: "relative", top: "auto", left: "auto", right: "auto" }} />
      <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 30, height: 30, position: "relative", top: "auto", left: "auto", right: "auto" }} />
      <Prop src={BAT} className="hw-m-bat" style={{ width: 26, height: 13, position: "relative", top: "auto", left: "auto", right: "auto", transform: "rotate(8deg) scaleX(-1)" }} />
      <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 28, height: 28, position: "relative", top: "auto", left: "auto", right: "auto" }} />
      <Prop src={BAT} className="hw-m-bat" style={{ width: 24, height: 12, position: "relative", top: "auto", left: "auto", right: "auto", transform: "scaleX(-1)" }} />
    </div>
  );
}
