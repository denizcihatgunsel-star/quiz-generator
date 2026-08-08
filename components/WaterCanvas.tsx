"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

interface Wave {
  depth: number;
  y: number;
  amp: number;
  speed: number;
  phase: number;
  freq: number;
}

const HORIZON = 0.42;
const WAVE_COUNT = 26;

export default function WaterCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let bg: HTMLCanvasElement | null = null;
    let raf = 0;
    let stopped = false;
    const ripples: Ripple[] = [];
    let cx = -999;
    let cy = -999;
    let lastX = -999;
    let lastY = -999;
    let lastMove = -999;

    const glints: { x: number; y: number; seed: number; speed: number; s: number }[] = [];

    const makeGlints = () => {
      glints.length = 0;
      for (let i = 0; i < 26; i++) {
        glints.push({
          x: W * (0.58 + Math.random() * 0.22),
          y: H * (HORIZON + 0.03 + Math.random() * 0.22),
          seed: Math.random() * 10,
          speed: 0.8 + Math.random() * 1.6,
          s: 1.5 + Math.random() * 2.5,
        });
      }
    };

    const buildBackground = () => {
      const b = document.createElement("canvas");
      b.width = canvas.width;
      b.height = canvas.height;
      const bctx = b.getContext("2d");
      if (!bctx) return null;

      const hy = H * HORIZON;

      const sky = bctx.createLinearGradient(0, 0, 0, hy);
      sky.addColorStop(0, "#FCF6F0");
      sky.addColorStop(0.72, "#F3EEE9");
      sky.addColorStop(1, "#E8EEEF");
      bctx.fillStyle = sky;
      bctx.fillRect(0, 0, W, hy);

      const sun = bctx.createRadialGradient(W * 0.66, hy - H * 0.05, 0, W * 0.66, hy - H * 0.05, W * 0.42);
      sun.addColorStop(0, "rgba(255, 246, 232, 0.95)");
      sun.addColorStop(0.35, "rgba(255, 244, 230, 0.45)");
      sun.addColorStop(1, "rgba(255, 244, 230, 0)");
      bctx.fillStyle = sun;
      bctx.fillRect(0, 0, W, hy);

      const ridge = (x: number, base: number, s: number) =>
        base -
        H *
          (0.026 +
            0.018 * Math.sin(x * 0.012 * s + 1.2) +
            0.011 * Math.sin(x * 0.028 * s + 3.9) +
            0.008 * Math.sin(x * 0.05 * s + 0.4));

      const drawHills = (color: string, base: number, s: number) => {
        bctx.beginPath();
        bctx.moveTo(0, H);
        bctx.lineTo(0, ridge(0, base, s));
        for (let x = 0; x <= W; x += W / 64) {
          bctx.lineTo(x, ridge(x, base, s));
        }
        bctx.lineTo(W, H);
        bctx.closePath();
        bctx.fillStyle = color;
        bctx.fill();
      };

      drawHills("#EFE5DF", hy + H * 0.075, 1);
      drawHills("#E2D2C8", hy + H * 0.12, 1.4);

      return b;
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect || rect.width < 4 || rect.height < 4) return;
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2.4e6 / (W * H)) || 1.5);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      bg = buildBackground();
      makeGlints();
    };
    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
      const now = performance.now();
      const moved = Math.hypot(cx - lastX, cy - lastY);
      lastX = cx;
      lastY = cy;
      lastMove = now;
      if (moved > 2 && cy > H * HORIZON && ripples.length < 14) {
        ripples.push({ x: cx, y: cy, r: 6, alpha: 0.55 });
      }
    };
    window.addEventListener("pointermove", onMove);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const waves: Wave[] = [];
    for (let i = 0; i < WAVE_COUNT; i++) {
      const depth = Math.pow((i + 1) / WAVE_COUNT, 1.35);
      waves.push({
        depth,
        y: H * HORIZON + depth * (H - H * HORIZON),
        amp: 1.2 + depth * depth * 13,
        speed: 0.35 + depth * 1.15,
        phase: i * 1.73 + Math.random() * 6.28,
        freq: (1.0 + depth * 2.6) * 0.02,
      });
    }

    const draw = (time: number) => {
      const t = time * 0.001;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (bg) ctx.drawImage(bg, 0, 0, W, H);
      const hy = H * HORIZON;

      const water = ctx.createLinearGradient(0, hy, 0, H);
      water.addColorStop(0, "#D6E1E8");
      water.addColorStop(0.35, "#B9CBD9");
      water.addColorStop(0.8, "#93ACC0");
      water.addColorStop(1, "#7E9AB1");
      ctx.fillStyle = water;
      ctx.fillRect(0, hy, W, H - hy);

      const overWater = cx > 0 && cy > hy;

      ctx.lineCap = "round";
      for (const w of waves) {
        const base = 0.5 + 0.5 * Math.sin(t * w.speed + w.phase);
        const isNear = w.depth > 0.45;
        const r = isNear ? 96 : 152;
        const g = isNear ? 128 : 166;
        const b = isNear ? 112 : 186;
        const alpha = (isNear ? 0.3 : 0.45) + 0.18 * base;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1 + w.depth * 2.2;

        ctx.beginPath();
        for (let x = 0; x <= W; x += W / 56) {
          let push = 0;
          if (overWater) {
            const d = Math.hypot(x - cx, w.y - cy);
            const R = 150;
            if (d < R * 2) {
              push = Math.exp(-(d * d) / (R * R)) * (10 + w.depth * 16) * Math.sin(t * 5 + x * 0.04 + w.phase);
            }
          }
          const y = w.y + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp + push;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (const gl of glints) {
        const a = 0.14 + 0.3 * Math.abs(Math.sin(t * gl.speed + gl.seed));
        ctx.fillStyle = `rgba(255, 252, 245, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.ellipse(gl.x + Math.sin(t * 0.9 + gl.seed * 2) * 3, gl.y, gl.s, gl.s * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      if (overWater) {
        const sheen = ctx.createLinearGradient(cx - 60, 0, cx + 60, 0);
        sheen.addColorStop(0, "rgba(255, 255, 255, 0)");
        sheen.addColorStop(0.5, "rgba(255, 252, 245, 0.22)");
        sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = sheen;
        ctx.fillRect(cx - 60, hy, 120, H - hy);
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 2.6;
        rp.alpha -= 0.024;
        if (rp.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${rp.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const loop = (time: number) => {
      if (stopped) return;
      draw(time);
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
