"use client";

import { useEffect, useRef } from "react";

/**
 * Soft filled displacement field (Unseen-style liquid) — not stroked sine
 * ribbons or concentric drop-ring ripples. Prefer WebGL2 full-screen quad;
 * fall back to low-res 2D ImageData if WebGL2 is unavailable.
 */
export default function WaterCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dprCap = Math.min(Math.max(window.devicePixelRatio || 1, 1), 1.75);
    let width = 1;
    let height = 1;
    let raf = 0;
    let running = !document.hidden && !reduced;
    let disposed = false;

    type Wake = { x: number; y: number; life: number; strength: number };
    const wakes: Wake[] = [];
    let px = -1;
    let py = -1;
    let sx = 0.5;
    let sy = 0.5;
    let lastInjectX = -999;
    let lastInjectY = -999;

    const applySize = (el: HTMLCanvasElement) => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      el.width = Math.max(1, Math.round(width * dprCap));
      el.height = Math.max(1, Math.round(height * dprCap));
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
    };
    applySize(canvas);
    const ro = new ResizeObserver(() => applySize(canvasRef.current || canvas));
    ro.observe(parent);

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      if (Math.hypot(px - lastInjectX, py - lastInjectY) > 18) {
        wakes.push({
          x: px / Math.max(width, 1),
          y: py / Math.max(height, 1),
          life: 1,
          strength: 0.55,
        });
        lastInjectX = px;
        lastInjectY = py;
        if (wakes.length > 18) wakes.shift();
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onVis = () => {
      running = !document.hidden && !reduced;
      if (running && !disposed) startLoop();
    };
    document.addEventListener("visibilitychange", onVis);

    const tickWakes = () => {
      for (let i = wakes.length - 1; i >= 0; i--) {
        wakes[i].life *= 0.965;
        wakes[i].strength *= 0.978;
        if (wakes[i].life < 0.03) wakes.splice(i, 1);
      }
      if (px > 0) {
        sx += (px / width - sx) * 0.04;
        sy += (py / height - sy) * 0.04;
      }
    };

    let startLoop = () => {};
    const stopLoop = () => cancelAnimationFrame(raf);
    let drawStatic = () => {};
    let disposeExtra: (() => void) | null = null;
    let glReady = false;

    const supportsWebGL2 = (() => {
      try {
        const probe = document.createElement("canvas");
        return !!probe.getContext("webgl2");
      } catch {
        return false;
      }
    })();

    if (supportsWebGL2) {
      const gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        powerPreference: "low-power",
      });

      if (gl) {
        const vsSrc = `#version 300 es
in vec2 a;
out vec2 vUv;
void main(){
  vUv = a * 0.5 + 0.5;
  gl_Position = vec4(a, 0.0, 1.0);
}`;

        const fsSrc = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uParallax;
uniform vec4 uWakes[18];
uniform int uWakeCount;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

float wakeField(vec2 uv){
  float h = 0.0;
  for (int i = 0; i < 18; i++) {
    if (i >= uWakeCount) break;
    vec4 w = uWakes[i];
    vec2 d = (uv - w.xy) * vec2(1.0, uRes.y / max(uRes.x, 1.0));
    float g = exp(-dot(d, d) * mix(28.0, 12.0, w.w));
    h += g * w.z * w.w;
  }
  return h;
}

void main(){
  vec2 uv = vUv;
  vec2 p = uv + (uParallax - 0.5) * 0.045;
  float t = uTime * 0.00018;
  float n1 = fbm(p * vec2(2.4, 1.6) + vec2(t * 0.7, t * 0.35));
  float n2 = fbm(p * vec2(5.2, 3.4) - vec2(t * 0.45, -t * 0.55));
  float base = n1 * 0.72 + n2 * 0.28;
  float wake = wakeField(uv);
  float height = base * 0.55 + wake * 0.9;
  height += 0.08 * sin((uv.x + uParallax.x * 0.2) * 6.2831 + t * 2.4) *
            cos((uv.y + uParallax.y * 0.15) * 4.188 + t * 1.6);

  float ry = clamp(uv.y + (height - 0.45) * 0.22 + (0.5 - uParallax.y) * 0.04, 0.0, 1.0);
  vec3 cream = vec3(0.992, 0.945, 0.925);
  vec3 blush = vec3(0.992, 0.910, 0.925);
  vec3 plumSoft = vec3(0.690, 0.376, 0.478);
  vec3 plumDeep = vec3(0.231, 0.125, 0.153);
  vec3 sky = mix(cream, blush, smoothstep(0.15, 0.85, ry));
  vec3 depth = mix(plumSoft, plumDeep, smoothstep(0.25, 0.95, 1.0 - ry));
  vec3 water = mix(sky, depth, 0.22 + height * 0.28);

  float eps = 1.5 / max(uRes.x, 1.0);
  float hx = fbm((p + vec2(eps, 0.0)) * vec2(2.4, 1.6) + vec2(t * 0.7, t * 0.35))
           - fbm((p - vec2(eps, 0.0)) * vec2(2.4, 1.6) + vec2(t * 0.7, t * 0.35));
  float hy = fbm((p + vec2(0.0, eps)) * vec2(2.4, 1.6) + vec2(t * 0.7, t * 0.35))
           - fbm((p - vec2(0.0, eps)) * vec2(2.4, 1.6) + vec2(t * 0.7, t * 0.35));
  float crest = smoothstep(0.02, 0.12, height - 0.42) * (1.0 - smoothstep(0.55, 0.85, height));
  float spec = crest * (0.35 + 0.65 * smoothstep(0.0, 0.08, abs(hx) + abs(hy)));
  vec3 specular = mix(vec3(0.965, 0.890, 0.910), vec3(1.0), 0.35);
  water = mix(water, specular, spec * 0.42);
  water += specular * wake * 0.18;

  float alpha = clamp(0.38 + height * 0.12 + wake * 0.08, 0.28, 0.48);
  float grain = (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.035;
  water += grain;
  outColor = vec4(water, alpha);
}`;

        const compile = (type: number, src: string) => {
          const sh = gl.createShader(type);
          if (!sh) return null;
          gl.shaderSource(sh, src);
          gl.compileShader(sh);
          if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
            gl.deleteShader(sh);
            return null;
          }
          return sh;
        };

        const vs = compile(gl.VERTEX_SHADER, vsSrc);
        const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
        let program: WebGLProgram | null = null;
        if (vs && fs) {
          program = gl.createProgram();
          if (program) {
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
              gl.deleteProgram(program);
              program = null;
            }
          }
          gl.deleteShader(vs);
          gl.deleteShader(fs);
        }

        if (program) {
          glReady = true;
          const buf = gl.createBuffer()!;
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
          );
          const loc = gl.getAttribLocation(program, "a");
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

          const uRes = gl.getUniformLocation(program, "uRes");
          const uTime = gl.getUniformLocation(program, "uTime");
          const uParallax = gl.getUniformLocation(program, "uParallax");
          const uWakes = gl.getUniformLocation(program, "uWakes");
          const uWakeCount = gl.getUniformLocation(program, "uWakeCount");
          const wakeData = new Float32Array(18 * 4);

          const render = (t: number) => {
            if (disposed) return;
            tickWakes();
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.useProgram(program);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, t);
            gl.uniform2f(uParallax, sx, sy);
            wakeData.fill(0);
            const count = Math.min(wakes.length, 18);
            for (let i = 0; i < count; i++) {
              const w = wakes[i];
              wakeData[i * 4] = w.x;
              wakeData[i * 4 + 1] = w.y;
              wakeData[i * 4 + 2] = w.life;
              wakeData[i * 4 + 3] = w.strength;
            }
            gl.uniform4fv(uWakes, wakeData);
            gl.uniform1i(uWakeCount, count);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
          };

          drawStatic = () => render(0);
          startLoop = () => {
            cancelAnimationFrame(raf);
            const loop = (t: number) => {
              if (!running || disposed) return;
              render(t);
              raf = requestAnimationFrame(loop);
            };
            raf = requestAnimationFrame(loop);
          };
          disposeExtra = () => {
            gl.deleteBuffer(buf);
            gl.deleteProgram(program!);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
          };
        } else {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
      }
    }

    if (!glReady) {
      let target: HTMLCanvasElement = canvas;
      let ctx = target.getContext("2d", { alpha: true });
      if (!ctx) {
        const fresh = document.createElement("canvas");
        fresh.className = canvas.className;
        fresh.setAttribute("aria-hidden", "true");
        fresh.style.pointerEvents = "none";
        canvas.replaceWith(fresh);
        target = fresh;
        applySize(target);
        ctx = target.getContext("2d", { alpha: true });
      }
      if (!ctx) {
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
        return;
      }

      const COL_W = 160;
      const COL_H = 90;
      const img = ctx.createImageData(COL_W, COL_H);
      const data = img.data;
      const off = document.createElement("canvas");
      off.width = COL_W;
      off.height = COL_H;
      const octx = off.getContext("2d")!;

      const hash = (x: number, y: number) => {
        const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        return s - Math.floor(s);
      };
      const noise = (x: number, y: number) => {
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const xf = x - xi;
        const yf = y - yi;
        const u = xf * xf * (3 - 2 * xf);
        const v = yf * yf * (3 - 2 * yf);
        const a = hash(xi, yi);
        const b = hash(xi + 1, yi);
        const c = hash(xi, yi + 1);
        const d = hash(xi + 1, yi + 1);
        return a + (b - a) * u + (c - a) * v * (1 - u) + (d - b) * u * v;
      };
      const fbm = (x: number, y: number) => {
        let v = 0;
        let a = 0.5;
        let fx = x;
        let fy = y;
        for (let i = 0; i < 4; i++) {
          v += a * noise(fx, fy);
          const nx = fx * 1.6 + fy * 1.2;
          fy = -fx * 1.2 + fy * 1.6;
          fx = nx;
          a *= 0.5;
        }
        return v;
      };

      const render2d = (t: number) => {
        if (disposed) return;
        tickWakes();
        const time = t * 0.00018;
        const aspect = height / Math.max(width, 1);
        for (let y = 0; y < COL_H; y++) {
          for (let x = 0; x < COL_W; x++) {
            const uvx = x / (COL_W - 1);
            const uvy = y / (COL_H - 1);
            const pxn = uvx + (sx - 0.5) * 0.045;
            const pyn = uvy + (sy - 0.5) * 0.045;
            const n1 = fbm(pxn * 2.4 + time * 0.7, pyn * 1.6 + time * 0.35);
            const n2 = fbm(pxn * 5.2 - time * 0.45, pyn * 3.4 + time * 0.55);
            let h = (n1 * 0.72 + n2 * 0.28) * 0.55;
            for (let wi = 0; wi < wakes.length; wi++) {
              const w = wakes[wi];
              const adx = uvx - w.x;
              const ady = (uvy - w.y) * aspect;
              const g = Math.exp(-(adx * adx + ady * ady) * (12 + 16 * (1 - w.strength)));
              h += g * w.life * w.strength * 0.9;
            }
            const ry = Math.min(1, Math.max(0, uvy + (h - 0.45) * 0.22));
            let r = 253 - ry * 8;
            let gch = 241 - ry * 20;
            let b = 236 - ry * 10;
            const depthT = 0.22 + h * 0.28;
            const pr = 176 * (1 - ry) + 59 * ry;
            const pg = 96 * (1 - ry) + 32 * ry;
            const pb = 122 * (1 - ry) + 39 * ry;
            r = r * (1 - depthT) + pr * depthT;
            gch = gch * (1 - depthT) + pg * depthT;
            b = b * (1 - depthT) + pb * depthT;
            const crest = Math.max(0, Math.min(1, (h - 0.42) / 0.12));
            const spec = crest * 0.42;
            r = r * (1 - spec) + 246 * spec;
            gch = gch * (1 - spec) + 227 * spec;
            b = b * (1 - spec) + 232 * spec;
            const alpha = Math.min(0.48, Math.max(0.28, 0.38 + h * 0.12)) * 255;
            const idx = (y * COL_W + x) * 4;
            data[idx] = r;
            data[idx + 1] = gch;
            data[idx + 2] = b;
            data[idx + 3] = alpha;
          }
        }
        octx.putImageData(img, 0, 0);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, target.width, target.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(off, 0, 0, target.width, target.height);
      };

      drawStatic = () => render2d(0);
      startLoop = () => {
        cancelAnimationFrame(raf);
        const loop = (t: number) => {
          if (!running || disposed) return;
          render2d(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      };
    }

    if (reduced) drawStatic();
    else startLoop();

    return () => {
      disposed = true;
      stopLoop();
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      disposeExtra?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ pointerEvents: "none" }}
    />
  );
}
