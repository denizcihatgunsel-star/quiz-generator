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

interface Glint {
  x: number;
  y: number;
  seed: number;
  speed: number;
  w: number;
  h: number;
}

interface Cloud {
  sprite: HTMLCanvasElement;
  x: number;
  y: number;
  scale: number;
  alpha: number;
  drift: number;
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
    const clouds: Cloud[] = [];
    let cx = -999;
    let cy = -999;
    let lastX = -999;
    let lastY = -999;
    let lastMove = -999;

    const glints: Glint[] = [];
    const gauss = () => {
      let s = 0;
      for (let i = 0; i < 3; i++) s += Math.random();
      return (s / 3 - 0.5) * 2;
    };

    const makeGlints = () => {
      glints.length = 0;
      const pathX = W * 0.62;
      for (let i = 0; i < 64; i++) {
        const y = H * (HORIZON + 0.02 + Math.pow(Math.random(), 1.4) * 0.52);
        const near = y / (H * 0.94) - HORIZON;
        glints.push({
          x: pathX + gauss() * W * (0.02 + near * 0.09),
          y,
          seed: Math.random() * 10,
          speed: 1.4 + Math.random() * 2.4,
          w: 1 + Math.random() * 2.4,
          h: 1 + Math.random() * 1.4,
        });
      }
    };

    const makeCloud = (scale: number) => {
      const s = document.createElement("canvas");
      s.width = 260;
      s.height = 90;
      const c = s.getContext("2d");
      if (!c) return null;
      const blobs = [
        [100, 48, 42],
        [140, 55, 34],
        [60, 58, 30],
        [185, 52, 26],
      ];
      for (const [bx, by, br] of blobs) {
        const g = c.createRadialGradient(bx, by, 0, bx, by, br);
        g.addColorStop(0, "rgba(255, 253, 250, 0.9)");
        g.addColorStop(1, "rgba(255, 253, 250, 0)");
        c.fillStyle = g;
        c.fillRect(0, 0, 260, 90);
      }
      return { sprite: s, scale, x: Math.random() * 1.2 - 0.1, y: 0.05 + Math.random() * 0.2, alpha: 0.35 + Math.random() * 0.3, drift: 2 + Math.random() * 4 };
    };

    const buildBackground = () => {
      const b = document.createElement("canvas");
      b.width = canvas.width;
      b.height = canvas.height;
      const bctx = b.getContext("2d");
      if (!bctx) return null;

      const hy = H * HORIZON;

      const sky = bctx.createLinearGradient(0, 0, 0, hy);
      sky.addColorStop(0, "#FDF8F1");
      sky.addColorStop(0.55, "#F4EFE8");
      sky.addColorStop(0.88, "#E3ECEF");
      sky.addColorStop(1, "#DCE9EE");
      bctx.fillStyle = sky;
      bctx.fillRect(0, 0, W, hy);

      const sun = bctx.createRadialGradient(W * 0.62, hy - H * 0.045, 0, W * 0.62, hy - H * 0.045, W * 0.5);
      sun.addColorStop(0, "rgba(255, 247, 233, 0.98)");
      sun.addColorStop(0.3, "rgba(255, 246, 232, 0.5)");
      sun.addColorStop(1, "rgba(255, 246, 232, 0)");
      bctx.fillStyle = sun;
      bctx.fillRect(0, 0, W, hy);

      const ridge = (x: number, base: number, s: number) =>
        base -
        H *
          (0.024 +
            0.017 * Math.sin(x * 0.012 * s + 1.2) +
            0.010 * Math.sin(x * 0.028 * s + 3.9) +
            0.007 * Math.sin(x * 0.05 * s + 0.4));

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

      drawHills("#E9E6DE", hy + H * 0.065, 1);
      drawHills("#DCCDC2", hy + H * 0.115, 1.4);

      const water = bctx.createLinearGradient(0, hy, 0, H);
      water.addColorStop(0, "#CFDEE7");
      water.addColorStop(0.3, "#B4CBD9");
      water.addColorStop(0.65, "#8FACBF");
      water.addColorStop(1, "#6E8FA8");
      bctx.fillStyle = water;
      bctx.fillRect(0, hy, W, H - hy);

      // diagonal sunlight streaks across the surface
      const streak = (sx: number, len: number, alpha: number, angle: number) => {
        bctx.save();
        bctx.translate(W * sx, hy + H * 0.04);
        bctx.rotate(angle);
        const g = bctx.createLinearGradient(0, 0, len, 0);
        g.addColorStop(0, "rgba(255, 251, 244, 0)");
        g.addColorStop(0.5, `rgba(255, 251, 244, ${alpha})`);
        g.addColorStop(1, "rgba(255, 251, 244, 0)");
        bctx.fillStyle = g;
        bctx.fillRect(0, -H * 0.012, len, H * 0.024);
        bctx.restore();
      };
      streak(0.32, W * 0.85, 0.09, 0.09);
      streak(0.55, W * 0.95, 0.12, 0.05);
      streak(0.78, W * 0.8, 0.07, 0.12);

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
      clouds.length = 0;
      for (let i = 0; i < 4; i++) {
        const c = makeCloud(0.7 + Math.random() * 0.9);
        if (c) clouds.push(c);
      }
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
        ripples.push({ x: cx, y: cy, r: 6, alpha: 0.5 });
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

    const wavePath = (w: Wave, t: number, sampleX: (x: number) => number, out: number[]) => {
      let n = 0;
      for (let x = 0; x <= W; x += W / 56) {
        out[n] = sampleX(x);
        n++;
      }
      return n;
    };

    const draw = (time: number) => {
      const t = time * 0.001;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (bg) ctx.drawImage(bg, 0, 0, W, H);
      const hy = H * HORIZON;

      // drifting clouds
      for (const c of clouds) {
        const cw = 260 * c.scale;
        const chh = 90 * c.scale;
        c.x += c.drift * 0.008;
        if (c.x > 1.25) c.x = -0.35;
        ctx.globalAlpha = c.alpha;
        ctx.drawImage(c.sprite, c.x * W - cw / 2, c.y * hy - chh / 2, cw, chh);
        ctx.globalAlpha = 1;
      }

      const overWater = cx > 0 && cy > hy;

      ctx.lineCap = "round";
      const pts: number[] = new Array(57);
      for (const w of waves) {
        const isNear = w.depth > 0.45;
        const lift = Math.sin(t * w.speed + w.phase);
        const sample = (x: number) => {
          let push = 0;
          if (overWater) {
            const d = Math.hypot(x - cx, w.y - cy);
            const R = 150;
            if (d < R * 2) {
              push = Math.exp(-(d * d) / (R * R)) * (10 + w.depth * 16) * Math.sin(t * 5 + x * 0.04 + w.phase);
            }
          }
          return w.y + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp + push;
        };
        const n = wavePath(w, t, sample, pts);

        // shadow stroke (trough)
        const darkA = (isNear ? 0.5 : 0.6) + 0.15 * (0.5 + 0.5 * lift);
        ctx.strokeStyle = `rgba(64, 92, 112, ${(darkA * 0.55).toFixed(3)})`;
        ctx.lineWidth = 1.6 + w.depth * 2.6;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          if (i === 0) ctx.moveTo(i * (W / 56), pts[i] + 1.6);
          else ctx.lineTo(i * (W / 56), pts[i] + 1.6);
        }
        ctx.stroke();

        // crest stroke
        const crestA = isNear ? 0.4 : 0.55 + 0.12 * (0.5 + 0.5 * lift);
        ctx.strokeStyle = `rgba(${isNear ? 140 : 150}, ${isNear ? 165 : 185}, ${isNear ? 190 : 205}, ${crestA.toFixed(3)})`;
        ctx.lineWidth = 0.8 + w.depth * 1.8;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          if (i === 0) ctx.moveTo(i * (W / 56), pts[i]);
          else ctx.lineTo(i * (W / 56), pts[i]);
        }
        ctx.stroke();

        // light crest highlight on near waves
        if (isNear && lift > 0.1) {
          ctx.strokeStyle = `rgba(255, 255, 250, ${(0.12 + 0.22 * lift).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 0; i < n; i++) {
            if (i === 0) ctx.moveTo(i * (W / 56), pts[i] - 1.8);
            else ctx.lineTo(i * (W / 56), pts[i] - 1.8);
          }
          ctx.stroke();
        }
      }

      // horizon haze (atmospheric distance)
      const haze = ctx.createLinearGradient(0, hy - H * 0.01, 0, hy + H * 0.13);
      haze.addColorStop(0, "rgba(232, 240, 243, 0.85)");
      haze.addColorStop(1, "rgba(232, 240, 243, 0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, hy - H * 0.01, W, H * 0.14);

      // sun glitter path — shimmering dashes
      for (const gl of glints) {
        const spark = Math.pow(Math.max(0, Math.sin(t * gl.speed + gl.seed)), 7);
        if (spark < 0.05) continue;
        ctx.fillStyle = `rgba(255, 250, 240, ${(spark * 0.85).toFixed(3)})`;
        ctx.fillRect(gl.x, gl.y, gl.w, gl.h);
      }

      if (overWater) {
        const sheen = ctx.createLinearGradient(cx - 60, 0, cx + 60, 0);
        sheen.addColorStop(0, "rgba(255, 255, 255, 0)");
        sheen.addColorStop(0.5, "rgba(255, 252, 245, 0.2)");
        sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = sheen;
        ctx.fillRect(cx - 60, hy, 120, H - hy);
      }

      // elliptical ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 2.8;
        rp.alpha -= 0.024;
        if (rp.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${(rp.alpha * 0.85).toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r * 1.7, rp.r * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(70, 98, 120, ${(rp.alpha * 0.3).toFixed(3)})`;
        ctx.beginPath();
        ctx.ellipse(rp.x + 2, rp.y + 2, rp.r * 1.7, rp.r * 0.55, 0, 0, Math.PI * 2);
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
