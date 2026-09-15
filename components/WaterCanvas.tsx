"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

/** Interactive blush line waves — high-contrast enough to read on #FDE8EC hero. */
export default function WaterCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ripples: Ripple[] = [];
    let tx = -999;
    let ty = -999;
    let cx = -999;
    let cy = -999;
    let lastX = 0;
    let lastY = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (Math.hypot(tx - lastX, ty - lastY) > 12) {
        ripples.push({ x: tx, y: ty, r: 2, alpha: 0.72 });
        lastX = tx;
        lastY = ty;
        if (ripples.length > 32) ripples.shift();
      }
    };

    const waveCount = 14;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      if (tx > -900) {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
      } else {
        // Idle drift from center so lines still breathe before first pointer move
        cx = width * 0.5 + Math.sin(t * 0.0004) * 40;
        cy = height * 0.55 + Math.cos(t * 0.00035) * 28;
      }

      for (let i = 0; i < waveCount; i++) {
        const y = (height / (waveCount - 1)) * i;
        const amp = 9 + (i % 4) * 6;
        const speed = 0.00115 + (i % 5) * 0.0005;
        const phase = i * 1.9;
        // Stronger on blush: ~0.5–0.9
        const alpha = 0.5 + ((i % 6) / 6) * 0.4;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          let yy =
            y +
            Math.sin(x * 0.005 + t * speed + phase) * amp +
            Math.sin(x * 0.002 + phase * 1.3) * amp * 0.85;

          const dx = x - cx;
          const dy = yy - cy;
          const d2 = dx * dx + dy * dy;
          const push = Math.exp(-d2 / 9000) * Math.sin(dx * 0.055 - t * 0.006) * 48;
          yy += push;

          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }

        // Soft white halo for separation from blush
        ctx.strokeStyle = `rgba(255,255,255,${Math.min(0.55, alpha * 0.55)})`;
        ctx.lineWidth = 10;
        ctx.globalAlpha = 0.85;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Core rose line — darker than blush wash
        ctx.strokeStyle = `rgba(176,72,102,${alpha})`;
        ctx.lineWidth = 2.25;
        ctx.stroke();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 1.6;
        rp.alpha *= 0.94;
        if (rp.alpha < 0.03) {
          ripples.splice(i, 1);
          continue;
        }
        for (let ring = 0; ring < 4; ring++) {
          const rr = rp.r + ring * 16;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(176,72,102,${rp.alpha * (1 - ring / 4)})`;
          ctx.lineWidth = 2.1 - ring * 0.35;
          ctx.stroke();
        }
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    if (reduced) {
      draw(0);
    } else {
      const loop = (t: number) => {
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
