"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

interface Glint {
  x: number;
  y: number;
  speed: number;
  phase: number;
  len: number;
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
    let glints: Glint[] = [];
    let tx = -999;
    let ty = -999;
    let cx = -999;
    let cy = -999;
    let lastX = 0;
    let lastY = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parent = canvas.parentElement!;

    const HORIZON = 0.36;
    const STRIPS = 58;
    const SEG = 26;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glints = [];
      const count = Math.max(8, Math.round(width / 150));
      for (let i = 0; i < count; i++) {
        glints.push({
          x: Math.random() * width,
          y: height * HORIZON + Math.random() * height * 0.55,
          speed: 0.25 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          len: 34 + Math.random() * 70,
        });
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (Math.hypot(tx - lastX, ty - lastY) > 14) {
        ripples.push({ x: tx, y: ty, r: 2, alpha: 0.5 });
        lastX = tx;
        lastY = ty;
        if (ripples.length > 24) ripples.shift();
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      if (tx > -900) {
        cx += (tx - cx) * 0.09;
        cy += (ty - cy) * 0.09;
      }

      const y0 = height * HORIZON;
      const y1 = height * 1.03;
      const stripH = (y1 - y0) / STRIPS;

      const surfaceY = (x: number, t: number) => {
        return (
          Math.sin(x * 0.0032 + t * 0.0011) * 13 +
          Math.sin(x * 0.007 + t * 0.0017 + 1.3) * 7 +
          Math.sin(x * 0.0145 + t * 0.0023 + 2.6) * 3
        );
      };

      for (let i = 0; i <= STRIPS; i++) {
        const baseY = y0 + i * stripH;
        const v = Math.max(0, Math.min(1, (baseY - y0) / (height - y0)));
        const baseR = lerp(248, 197, v);
        const baseG = lerp(220, 133, v);
        const baseB = lerp(228, 156, v);
        const alpha = Math.max(0, Math.min(1, (i + 3) / 10));

        ctx.globalAlpha = alpha;
        ctx.lineWidth = stripH * 1.6;
        ctx.lineCap = "round";

        let runStart = 0;
        let curR = -1;
        let curG = -1;
        let curB = -1;

        const flush = (xEnd: number, yStart: number, yEnd: number) => {
          ctx.strokeStyle = `rgb(${curR | 0},${curG | 0},${curB | 0})`;
          ctx.beginPath();
          ctx.moveTo(runStart, yStart);
          ctx.lineTo(xEnd, yEnd);
          ctx.stroke();
        };

        for (let x = SEG; x <= width; x += SEG) {
          const dx = x - SEG;
          const yPrev = baseY + surfaceY(dx, t);
          const yCur = baseY + surfaceY(x, t);
          const slope = (yCur - yPrev) / SEG;

          let light = Math.max(-0.1, Math.min(0.16, slope * 260));
          const cd = (dx - cx) * (dx - cx) + (baseY - cy) * (baseY - cy);
          light += Math.exp(-cd / 4200) * 0.14;

          const r = baseR + light * 255;
          const g = baseG + light * 255;
          const b = baseB + light * 255;

          if (
            curR < 0 ||
            Math.abs(r - curR) > 3 ||
            Math.abs(g - curG) > 3 ||
            Math.abs(b - curB) > 3
          ) {
            if (curR >= 0) flush(dx, baseY + surfaceY(dx, t), yPrev);
            runStart = dx;
            curR = r;
            curG = g;
            curB = b;
          }
        }
        if (curR >= 0) flush(width, baseY + surfaceY(width, t), baseY + surfaceY(width, t));
        ctx.globalAlpha = 1;
      }

      const horizonGlow = ctx.createLinearGradient(0, y0 - 46, 0, y0 + 34);
      horizonGlow.addColorStop(0, "rgba(255,255,255,0)");
      horizonGlow.addColorStop(0.55, "rgba(255,244,247,0.22)");
      horizonGlow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, y0 - 46, width, 80);

      const depth = ctx.createLinearGradient(0, height * 0.86, 0, height);
      depth.addColorStop(0, "rgba(150,80,108,0)");
      depth.addColorStop(1, "rgba(150,80,108,0.35)");
      ctx.fillStyle = depth;
      ctx.fillRect(0, height * 0.86, width, height * 0.14);

      if (!reduced) {
        for (const g of glints) {
          g.x += g.speed;
          if (g.x > width + g.len) {
            g.x = -g.len;
            g.y = height * HORIZON + Math.random() * height * 0.55;
          }
          g.phase += 0.018;
          const a = Math.max(0, Math.sin(g.phase)) * 0.3;
          if (a < 0.02) continue;
          ctx.strokeStyle = `rgba(255,255,255,${a})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(g.x - g.len / 2, g.y + Math.sin(g.x * 0.02 + g.phase) * 5);
          ctx.lineTo(g.x + g.len / 2, g.y + Math.sin((g.x + g.len) * 0.02 + g.phase) * 5);
          ctx.stroke();
        }
      }

      if (tx > -900) {
        const glow = ctx.createRadialGradient(cx, cy, 4, cx, cy, 190);
        glow.addColorStop(0, "rgba(255,244,247,0.16)");
        glow.addColorStop(1, "rgba(255,244,247,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(cx - 190, cy - 190, 380, 380);
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 1.5;
        rp.alpha *= 0.95;
        if (rp.alpha < 0.02) {
          ripples.splice(i, 1);
          continue;
        }
        for (let ring = 0; ring < 4; ring++) {
          const rr = rp.r + ring * 15;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,238,244,${rp.alpha * (1 - ring / 4)})`;
          ctx.lineWidth = 1.6 - ring * 0.3;
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
