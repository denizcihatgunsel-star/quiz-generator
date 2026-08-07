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
    let tx = 0;
    let ty = 0;
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
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (Math.hypot(tx - lastX, ty - lastY) > 18) {
        ripples.push({ x: tx, y: ty, r: 2, alpha: 0.4 });
        lastX = tx;
        lastY = ty;
      }
      if (ripples.length > 24) ripples.shift();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;

      const waveCount = 9;
      for (let i = 0; i < waveCount; i++) {
        const y = (height / (waveCount - 1)) * i;
        const amp = 3.5 + (i % 3) * 3;
        const speed = 0.0003 + (i % 4) * 0.00011;
        const phase = i * 1.7;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          let yy =
            y +
            Math.sin(x * 0.004 + t * speed * 60 + phase) * amp +
            Math.sin(x * 0.0011 + phase) * amp * 0.7;

          const dx = x - cx;
          const dy = yy - cy;
          const d2 = dx * dx + dy * dy;
          const push = Math.exp(-d2 / 9000) * Math.sin(dx * 0.12 - t * 0.006) * 16;
          yy += push;

          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.38)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 1.15;
        rp.alpha *= 0.94;
        if (rp.alpha < 0.02) {
          ripples.splice(i, 1);
          continue;
        }
        for (let ring = 0; ring < 3; ring++) {
          const rr = rp.r + ring * 15;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${rp.alpha * (1 - ring / 3)})`;
          ctx.lineWidth = 1.6 - ring * 0.4;
          ctx.stroke();
        }
      }
    };

    parent.addEventListener("pointermove", onMove);

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
      parent.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
