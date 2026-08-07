"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

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
    const parent = canvas.parentElement!;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (Math.hypot(tx - lastX, ty - lastY) > 14) {
        ripples.push({ x: tx, y: ty, r: 2, alpha: 0.55 });
        lastX = tx;
        lastY = ty;
        if (ripples.length > 28) ripples.shift();
      }
    };

    const waveCount = 14;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      if (tx > -900) {
        cx += (tx - cx) * 0.09;
        cy += (ty - cy) * 0.09;
      }

      for (let i = 0; i < waveCount; i++) {
        const y = (height / (waveCount - 1)) * i;
        const amp = 7 + (i % 4) * 5;
        const speed = 0.0012 + (i % 5) * 0.00045;
        const phase = i * 1.9;
        const alpha = 0.28 + ((i % 6) / 6) * 0.32;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          let yy =
            y +
            Math.sin(x * 0.005 + t * speed + phase) * amp +
            Math.sin(x * 0.002 + phase * 1.3) * amp * 0.8;

          const dx = x - cx;
          const dy = yy - cy;
          const d2 = dx * dx + dy * dy;
          const push = Math.exp(-d2 / 7000) * Math.sin(dx * 0.06 - t * 0.006) * 34;
          yy += push;

          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }

        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.4})`;
        ctx.lineWidth = 7;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.strokeStyle = `rgba(188,98,124,${alpha})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 1.4;
        rp.alpha *= 0.95;
        if (rp.alpha < 0.02) {
          ripples.splice(i, 1);
          continue;
        }
        for (let ring = 0; ring < 4; ring++) {
          const rr = rp.r + ring * 14;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(190,100,124,${rp.alpha * (1 - ring / 4)})`;
          ctx.lineWidth = 1.8 - ring * 0.35;
          ctx.stroke();
        }
      }
    };

    window.addEventListener("pointermove", onMove);

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
