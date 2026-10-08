"use client";

import { useState, useEffect } from "react";
import { isHalloweenActive } from "@/lib/seasonal";

/**
 * Mobile Halloween decorations (phone /m app shell, marketing quiz soft accents,
 * /m/pricing). Visual-only: pointer-events none, z behind controls.
 * Renders nothing until mounted, then decides client-side to avoid hydration mismatch.
 * Decision via query param, cookie, or env var.
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
 * Renders decoration markup ONLY when Halloween is active.
 * Client-side decision via query param, cookie, or env var.
 * Returns null when inactive (no hidden markup).
 */
export default function MobileHalloweenDecor({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  // Avoid hydration mismatch: render nothing on server, decide after mount
  useEffect(() => {
    setMounted(true);
    const searchParams = new URLSearchParams(window.location.search);
    setIsActive(isHalloweenActive(searchParams));
  }, []);
  
  if (!mounted || !isActive) return null;

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
        {/* Pumpkin moved to RIGHT of 'IN' in 'JUMP BACK IN', vertically centered, 8px gap */}
        <Prop src={PUMPKIN} className="hw-m-pumpkin hw-m-pumpkin-right" style={{ width: 36, height: 36, top: 2, right: -44 }} />
        
        {/* Gutter props moved further out to clear card grid and CTAs */}
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 42, height: 42, top: 70, left: -50 }} />
        <Prop src={CANDLE} className="hw-m-candle" style={{ width: 28, height: 28, bottom: 8, left: -22 }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 30, height: 15, top: 48, right: -32, transform: "rotate(12deg)" }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 40, height: 40, top: 90, right: -40 }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 38, height: 38, bottom: 24, right: -40, transform: "scaleX(-1)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 24, height: 12, bottom: 4, right: -24, transform: "rotate(-8deg) scaleX(-1)" }} />
      </div>
    );
  }

  if (variant === "quiz-soft") {
    /* Option A · Soft: pumpkins/candle in empty band above card, ghosts+bats in gutters clear of text */
    return (
      <div
        className={`hw-m-layer hw-m-layer--quiz-soft pointer-events-none absolute inset-0 z-0 overflow-visible ${className}`}
        aria-hidden="true"
        data-hw-mobile="quiz-soft"
      >
        {/* Moon peek top-right */}
        <MoonGlow
          className="hw-m-moon--soft"
          style={{
            top: -100,
            right: -100,
            width: 72,
            height: 72,
          }}
        />

        {/* Pumpkins + candle moved up into empty ~100px band above "Try one quiz free" line */}
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 28, height: 28, top: -120, left: "14%" }} />
        <Prop src={CANDLE} className="hw-m-candle" style={{ width: 24, height: 24, top: -122, left: "42%" }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 26, height: 26, top: -120, left: "56%" }} />

        {/* Removed side ghosts/bats - they overlap textarea/card at all mobile widths */}

        {/* Bottom props in gutters */}
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 36, height: 36, bottom: -8, left: -20 }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 24, height: 24, bottom: -4, right: -14 }} />
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
        {/* Ghost in top-right gutter, clear of Sign in button */}
        <Prop src={GHOST} className="hw-m-ghost hw-m-pricing-ghost-title" style={{ width: 44, height: 44, top: 60, right: -32, transform: "scaleX(-1)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 22, height: 11, top: -18, left: -34, transform: "rotate(-12deg)" }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 26, height: 13, top: 2, right: 36, transform: "rotate(14deg)" }} />

        {/* Gutter pumpkins / candles clear of card content, moved out from "20 quizzes per month" bullets */}
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 34, height: 34, top: 280, left: -24 }} />
        <Prop src={CANDLE} className="hw-m-candle" style={{ width: 26, height: 26, top: 320, right: -20 }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin hw-m-pricing-pumpkin-left" style={{ width: 38, height: 38, top: 420, right: -22 }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 42, height: 42, top: 400, left: -24 }} />
        <Prop src={CANDLE} className="hw-m-candle" style={{ width: 28, height: 28, top: 560, left: -18 }} />
        <Prop src={PUMPKIN} className="hw-m-pumpkin" style={{ width: 32, height: 32, top: 580, right: -20 }} />
        <Prop src={BAT} className="hw-m-bat" style={{ width: 24, height: 12, top: 700, left: -16, transform: "rotate(-8deg)" }} />
        <Prop src={GHOST} className="hw-m-ghost" style={{ width: 40, height: 40, top: 720, right: -24, transform: "scaleX(-1)" }} />

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

  // nav-strip — in page flow at bottom of main, never on the icons
  return (
    <div
      className={`hw-m-layer hw-m-layer--nav-strip hw-m-nav-strip pointer-events-none flex items-end justify-center gap-3 ${className}`}
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
