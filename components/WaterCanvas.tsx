"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// Phase 2 — discrete 2D wave equation on a ping-pong FBO heightfield.
// Heights are stored with a 0.5 bias so troughs survive unsigned RGBA8.
const SIM_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_a;
uniform vec2 u_texel;
in vec2 v_uv;
out vec4 o;
void main() {
  vec4 c = texture(u_a, v_uv);
  float h = c.r * 2.0 - 1.0;
  float p = c.g * 2.0 - 1.0;
  float l = texture(u_a, v_uv - vec2(u_texel.x, 0.0)).r * 2.0 - 1.0;
  float r = texture(u_a, v_uv + vec2(u_texel.x, 0.0)).r * 2.0 - 1.0;
  float u = texture(u_a, v_uv - vec2(0.0, u_texel.y)).r * 2.0 - 1.0;
  float d = texture(u_a, v_uv + vec2(0.0, u_texel.y)).r * 2.0 - 1.0;
  float nxt = (l + r + u + d) * 0.5 - p;
  nxt *= 0.985;
  o = vec4(nxt * 0.5 + 0.5, h * 0.5 + 0.5, 0.0, 1.0);
}`;

// Mouse velocity impulses drawn into the heightfield.
const SPLAT_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_b;
uniform vec2 u_pos;
uniform float u_force;
in vec2 v_uv;
out vec4 o;
void main() {
  vec4 c = texture(u_b, v_uv);
  vec2 dd = v_uv - u_pos;
  float g = exp(-dot(dd, dd) * 260.0) * u_force;
  if (g < 0.002) { o = c; return; }
  o = vec4(c.r + g * 0.5, c.g, 0.0, 1.0);
}`;

// Phase 3+4 — the liquid glass layer. Samples the STILL backdrop texture
// with Sobel-gradient offsets (Snell's-law refraction) so the scene bends
// like thick gel under the cursor. Phase 5 — Blinn-Phong specular + softbox
// glare + crest sparks on top. No opaque water color: the scene stays visible.
const RENDER_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_h;
uniform sampler2D u_scene;
uniform vec2 u_texel;
uniform float u_time;
uniform vec2 u_cursor;
in vec2 v_uv;
out vec4 o;

float hAt(vec2 uv) { return texture(u_h, uv).r * 2.0 - 1.0; }

void main() {
  vec2 uv = v_uv;

  float hl = hAt(vec2(uv.x - u_texel.x, uv.y));
  float hr = hAt(vec2(uv.x + u_texel.x, uv.y));
  float hu = hAt(vec2(uv.x, uv.y - u_texel.y));
  float hd = hAt(vec2(uv.x, uv.y + u_texel.y));
  vec2 g = vec2(hr - hl, hd - hu);
  float slope = length(g);

  // refraction: bend the backdrop lookup by the local slope
  vec2 off = g * 0.11 + g * 0.10 * smoothstep(0.02, 0.18, slope);
  vec3 col = texture(u_scene, clamp(uv + off, 0.001, 0.999)).rgb;

  // surface normal from the Sobel gradient
  vec3 N = normalize(vec3(-g.x * 12.0, 1.0, -g.y * 12.0));

  // Blinn-Phong studio light (Z toward the screen, per the reference)
  vec3 L = normalize(vec3(0.5, 0.5, 2.0));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(N, H), 0.0), 96.0);
  float fres = pow(1.0 - N.y, 3.0);

  // softbox glare streak following the cursor
  vec2 dc = uv - u_cursor;
  float glare = exp(-dot(dc, dc) * 16.0) * 0.55;

  // bright sparks on near-horizontal wave slopes (sun on water)
  float sparks = pow(clamp(slope * 6.0, 0.0, 1.0), 3.0) * 0.5;

  col += vec3(1.0, 0.975, 0.94) * (spec * (0.22 + glare * 0.8) + sparks * 0.5);
  col += vec3(1.0, 0.985, 0.955) * fres * 0.14;

  // faint gel veil so the glass reads as a material
  col = mix(col, vec3(0.975, 0.98, 0.99), 0.035 + 0.06 * fres);

  o = vec4(col, 1.0);
}`;

export default function WaterCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) {
      console.warn("[water] WebGL2 not supported, showing static band");
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };

    const link = (vsSrc: string, fsSrc: string) => {
      const vs = compile(gl.VERTEX_SHADER, vsSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      if (!p) return null;
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(p));
        return null;
      }
      return p;
    };

    const simProg = link(VERT, SIM_FRAG);
    const splatProg = link(VERT, SPLAT_FRAG);
    const renderProg = link(VERT, RENDER_FRAG);
    if (!simProg || !splatProg || !renderProg) {
      console.warn("[water] shader compile failed, showing static band");
      return;
    }
    console.info("[water] WebGL2 liquid-glass layer initialized");

    const quad = gl.createBuffer();
    if (!quad) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPos = (p: WebGLProgram) => {
      const loc = gl.getAttribLocation(p, "a_pos");
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };

    const uni = (p: WebGLProgram, name: string) => gl.getUniformLocation(p, name);
    const simU = { a: uni(simProg, "u_a"), texel: uni(simProg, "u_texel") };
    const splatU = { b: uni(splatProg, "u_b"), pos: uni(splatProg, "u_pos"), force: uni(splatProg, "u_force") };
    const renU = {
      h: uni(renderProg, "u_h"),
      scene: uni(renderProg, "u_scene"),
      texel: uni(renderProg, "u_texel"),
      time: uni(renderProg, "u_time"),
      cursor: uni(renderProg, "u_cursor"),
    };

    let simW = 0;
    let simH = 0;
    let texA: WebGLTexture | null = null;
    let texB: WebGLTexture | null = null;
    let fboA: WebGLFramebuffer | null = null;
    let fboB: WebGLFramebuffer | null = null;
    let sceneTex: WebGLTexture | null = null;
    let resScale = 1;

    const makeTex = () => {
      const t = gl.createTexture();
      if (!t) return null;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, simW, simH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      return t;
    };

    const makeFbo = (t: WebGLTexture) => {
      const f = gl.createFramebuffer();
      if (!f) return null;
      gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return f;
    };

    // ---------- Backdrop: the still, realistic pastel seascape ----------
    const buildBackdrop = (w: number, h: number) => {
      const b = document.createElement("canvas");
      b.width = w;
      b.height = h;
      const c = b.getContext("2d");
      if (!c) return null;
      const hy = h * 0.44;

      const sky = c.createLinearGradient(0, 0, 0, hy);
      sky.addColorStop(0, "#FDF8F1");
      sky.addColorStop(0.55, "#F3EEE7");
      sky.addColorStop(0.88, "#E2EBEE");
      sky.addColorStop(1, "#DAE8ED");
      c.fillStyle = sky;
      c.fillRect(0, 0, w, hy);

      const sun = c.createRadialGradient(w * 0.62, hy - h * 0.05, 0, w * 0.62, hy - h * 0.05, w * 0.5);
      sun.addColorStop(0, "rgba(255, 247, 233, 0.98)");
      sun.addColorStop(0.3, "rgba(255, 246, 232, 0.5)");
      sun.addColorStop(1, "rgba(255, 246, 232, 0)");
      c.fillStyle = sun;
      c.fillRect(0, 0, w, hy);

      const cloud = (bx: number, by: number, s: number) => {
        const blobs = [
          [0, 0, 40],
          [36, -8, 32],
          [72, 2, 26],
          [-32, 4, 28],
        ];
        for (const [ox, oy, br] of blobs) {
          const g = c.createRadialGradient(bx + ox * s, by + oy * s, 0, bx + ox * s, by + oy * s, br * s);
          g.addColorStop(0, "rgba(255, 253, 250, 0.85)");
          g.addColorStop(1, "rgba(255, 253, 250, 0)");
          c.fillStyle = g;
          c.fillRect(0, 0, w, hy);
        }
      };
      cloud(w * 0.22, hy * 0.35, 1.5);
      cloud(w * 0.55, hy * 0.55, 1.9);
      cloud(w * 0.78, hy * 0.28, 1.3);

      const ridge = (x: number, base: number, s: number) =>
        base -
        h *
          (0.024 +
            0.017 * Math.sin(x * 0.012 * s + 1.2) +
            0.01 * Math.sin(x * 0.028 * s + 3.9) +
            0.007 * Math.sin(x * 0.05 * s + 0.4));
      const hills = (color: string, base: number, s: number) => {
        c.beginPath();
        c.moveTo(0, h);
        c.lineTo(0, ridge(0, base, s));
        for (let x = 0; x <= w; x += w / 64) c.lineTo(x, ridge(x, base, s));
        c.lineTo(w, h);
        c.closePath();
        c.fillStyle = color;
        c.fill();
      };
      hills("#E9E6DE", hy + h * 0.065, 1);
      hills("#DCCDC2", hy + h * 0.115, 1.4);

      const sea = c.createLinearGradient(0, hy, 0, h);
      sea.addColorStop(0, "#CFDEE7");
      sea.addColorStop(0.3, "#B4CBD9");
      sea.addColorStop(0.65, "#8FACBF");
      sea.addColorStop(1, "#6E8FA8");
      c.fillStyle = sea;
      c.fillRect(0, hy, w, h - hy);

      const streak = (sx: number, len: number, alpha: number, angle: number) => {
        c.save();
        c.translate(w * sx, hy + h * 0.04);
        c.rotate(angle);
        const g = c.createLinearGradient(0, 0, len, 0);
        g.addColorStop(0, "rgba(255, 251, 244, 0)");
        g.addColorStop(0.5, `rgba(255, 251, 244, ${alpha})`);
        g.addColorStop(1, "rgba(255, 251, 244, 0)");
        c.fillStyle = g;
        c.fillRect(0, -h * 0.012, len, h * 0.024);
        c.restore();
      };
      streak(0.32, w * 0.85, 0.06, 0.09);
      streak(0.55, w * 0.95, 0.08, 0.05);
      streak(0.78, w * 0.8, 0.05, 0.12);

      // quiet sparkle dots under the sun
      for (let i = 0; i < 22; i++) {
        const yy = hy + Math.pow(Math.random(), 1.3) * h * 0.5;
        c.fillStyle = `rgba(255, 250, 240, ${0.12 + Math.random() * 0.2})`;
        c.fillRect(w * 0.62 + (Math.random() - 0.5) * w * 0.1, yy, 1 + Math.random() * 2, 1);
      }

      const haze = c.createLinearGradient(0, hy - h * 0.01, 0, hy + h * 0.13);
      haze.addColorStop(0, "rgba(232, 240, 243, 0.85)");
      haze.addColorStop(1, "rgba(232, 240, 243, 0)");
      c.fillStyle = haze;
      c.fillRect(0, hy - h * 0.01, w, h * 0.14);

      return b;
    };

    const rebuild = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect || rect.width < 4 || rect.height < 4) return;
      rectCache.left = rect.left;
      rectCache.top = rect.top;
      rectCache.width = rect.width;
      rectCache.height = rect.height;
      const scale = Math.min(window.devicePixelRatio || 1, 1.15, Math.sqrt(1.2e6 / (rect.width * rect.height)));
      canvas.width = Math.max(1, Math.round(rect.width * scale * 0.85));
      canvas.height = Math.max(1, Math.round(rect.height * scale * 0.85));
      simW = Math.max(112, Math.min(200, Math.round((rect.width / 8) * resScale)));
      simH = Math.max(112, Math.min(200, Math.round((rect.height / 8) * resScale)));
      texA = makeTex();
      texB = makeTex();
      fboA = texA ? makeFbo(texA) : null;
      fboB = texB ? makeFbo(texB) : null;
      if (fboA && fboB) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fboA);
        gl.clearColor(0.5, 0.5, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fboB);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      if (sceneTex) gl.deleteTexture(sceneTex);
      const backdrop = buildBackdrop(canvas.width, canvas.height);
      if (backdrop) {
        sceneTex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, sceneTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, backdrop);
      }
    };
    rebuild();

    const ro = new ResizeObserver(rebuild);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;
    let userInteracting = false;
    let windAcc = 0;
    let ambientAcc = 0;
    let cursor = { x: 0.62, y: 0.5 };
    const rectCache = { left: 0, top: 0, width: 0, height: 0 };

    // Rule 1: the listener ONLY records raw coordinates. No rect queries,
    // no math, no velocity. Passive so the browser never blocks on it.
    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      userInteracting = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const splat = (x: number, y: number, force: number) => {
      if (!fboA || !texB || !splatProg) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboA);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(splatProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texB);
      gl.uniform1i(splatU.b, 0);
      gl.uniform2f(splatU.pos, x, y);
      gl.uniform1f(splatU.force, force);
      aPos(splatProg);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const renderOnce = (time: number) => {
      if (!fboB || !texA || !renderProg || !simProg || !texB || !sceneTex) return;

      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(simProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(simU.a, 0);
      gl.uniform2f(simU.texel, 1 / simW, 1 / simH);
      aPos(simProg);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      const tmpT = texA;
      texA = texB;
      texB = tmpT;
      const tmpF = fboA;
      fboA = fboB;
      fboB = tmpF;

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(renderProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(renU.h, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, sceneTex);
      gl.uniform1i(renU.scene, 1);
      gl.uniform2f(renU.texel, 1 / simW, 1 / simH);
      gl.uniform1f(renU.time, time * 0.001);
      gl.uniform2f(renU.cursor, cursor.x, cursor.y);
      aPos(renderProg);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let lastNow = performance.now();
    let slowFrames = 0;
    let stopped = false;

    const loop = (time: number) => {
      if (stopped) return;

      // Rule 2: velocity is computed exactly once per frame, here in the loop.
      if (userInteracting) {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        velX = currentX - prevX;
        velY = currentY - prevY;
        prevX = currentX;
        prevY = currentY;
        userInteracting = false;
      } else {
        velX *= 0.9;
        velY *= 0.9;
      }

      const uvX = (currentX - rectCache.left) / rectCache.width;
      const uvY = 1 - (currentY - rectCache.top) / rectCache.height;
      const speed = Math.hypot(velX, velY);
      if (uvX >= 0 && uvX <= 1 && uvY >= 0 && uvY <= 1 && speed > 0.3) {
        splat(uvX, Math.min(uvY, 0.98), Math.min(0.3, speed * 0.09));
      }
      cursor = { x: uvX, y: uvY };

      // The water is never still: constant small ambient ripples
      ambientAcc += 16.6;
      if (ambientAcc > 130 + Math.random() * 90) {
        ambientAcc = 0;
        const n = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < n; i++) {
          splat(0.08 + Math.random() * 0.84, 0.52 + Math.random() * 0.42, 0.006 + Math.random() * 0.014);
        }
      }

      windAcc += 16.6;
      if (windAcc > 320 + Math.random() * 200) {
        windAcc = 0;
        splat(Math.random(), 0.66 + Math.random() * 0.3, 0.008);
      }

      renderOnce(time);

      const frameDt = time - lastNow;
      lastNow = time;
      if (frameDt > 45 && resScale > 0.55) {
        resScale *= 0.8;
        rebuild();
      } else if (frameDt < 25 && resScale < 1) {
        resScale = Math.min(1, resScale * 1.2);
        rebuild();
      }

      if (frameDt > 55) {
        slowFrames += 1;
        if (slowFrames > 60) {
          console.warn("[water] sustained slow frames, switching to static band");
          stopped = true;
          canvas.style.display = "none";
          return;
        }
      } else if (slowFrames > 0) {
        slowFrames = 0;
      }

      if (!reduced) raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      renderOnce(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
