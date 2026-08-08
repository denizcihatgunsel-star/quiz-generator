"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

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
  nxt *= 0.988;
  o = vec4(nxt * 0.5 + 0.5, h * 0.5 + 0.5, 0.0, 1.0);
}`;

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
  float g = exp(-dot(dd, dd) * 240.0) * u_force;
  if (g < 0.002) { o = c; return; }
  o = vec4(c.r + g * 0.5, c.g, 0.0, 1.0);
}`;

// Renders the whole hero as a pastel landscape seen "out of a window":
// cream sky with softbox sun glow and drifting fog, terracotta clay hills
// on the horizon, and a viscous sea below that refracts the scene like a
// gel lens (heightfield-driven displacement) with fresnel reflection,
// softbox glare that follows the cursor, and a sun glitter path.
const RENDER_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_h;
uniform vec2 u_texel;
uniform float u_time;
uniform float u_horizon;
uniform vec2 u_cursor;
in vec2 v_uv;
out vec4 o;

float heightAt(vec2 uv) { return texture(u_h, uv).r * 2.0 - 1.0; }

float skyline(float x) {
  return 0.032
    + 0.022 * sin(x * 3.4 + 1.2)
    + 0.014 * sin(x * 7.8 + 3.9)
    + 0.010 * sin(x * 12.9 + 0.4);
}

// Clay-pink landscape: sky above, two layers of terracotta hills at the horizon.
vec3 backdrop(vec2 uv) {
  float hy = u_horizon;
  float t = clamp((hy - uv.y) / hy, 0.0, 1.0);

  vec3 sky = mix(vec3(0.988, 0.906, 0.925), vec3(0.996, 0.973, 0.953), smoothstep(0.0, 1.0, t));

  float sun = exp(-pow((uv.x - 0.66) * 4.5, 2.0)) * exp(-pow((uv.y - (hy + 0.05)) * 9.0, 2.0));
  sky += vec3(1.0, 0.97, 0.93) * sun * 0.55;

  float fog = 0.5 + 0.5 * sin(uv.x * 14.0 + u_time * 0.05) * sin(uv.x * 6.0 - u_time * 0.03 + 2.0);
  sky = mix(sky, vec3(0.992, 0.958, 0.95), fog * 0.10 * smoothstep(0.0, 1.0, t));

  float dy = uv.y - hy;
  float s1 = skyline(uv.x);
  float s2 = skyline(uv.x * 1.3 + 5.0) * 0.55;

  vec3 col = sky;
  if (dy < s1) {
    col = mix(sky, vec3(0.953, 0.851, 0.788), smoothstep(s1, s1 - 0.02, dy));
  }
  if (dy < s2) {
    col = mix(col, vec3(0.914, 0.741, 0.682), smoothstep(s2, s2 - 0.015, dy));
  }
  return col;
}

void main() {
  float hy = u_horizon;
  if (v_uv.y > hy + 0.14) {
    o = vec4(backdrop(v_uv), 1.0);
    return;
  }

  float t = clamp((hy - v_uv.y) / hy, 0.0, 1.0);

  if (v_uv.y > hy) {
    // Sky / hills band above the horizon
    vec3 col = backdrop(v_uv);
    float haze = exp(-abs(v_uv.y - hy) * 160.0);
    col = mix(col, vec3(0.996, 0.972, 0.95), haze * 0.65);
    o = vec4(col, 1.0);
    return;
  }

  // ---- Water: perspective projection toward the horizon ----
  float dist = clamp(((1.0 - t) / t) * 0.22, 0.0, 1.0);
  vec2 hf = vec2(v_uv.x, 1.0 - dist);
  float pGain = min(t / (1.0 - t) * 0.5, 4.5);

  vec2 hf2 = clamp(vec2(hf.x, hf.y + heightAt(hf) * pGain * 0.4), 0.0, 1.0);
  float hl = heightAt(vec2(hf2.x - u_texel.x, hf2.y));
  float hr = heightAt(vec2(hf2.x + u_texel.x, hf2.y));
  float hd = heightAt(vec2(hf2.x, hf2.y - u_texel.y));
  float hu = heightAt(vec2(hf2.x, hf2.y + u_texel.y));
  vec2 g = vec2(hr - hl, hu - hd);

  // Gel-lens: the glass overlay also bulges toward the cursor
  vec2 cv = clamp(u_cursor, 0.0, 1.0);
  vec2 toCursor = cv - v_uv;
  float cd = length(toCursor);
  float lens = exp(-cd * cd * 30.0) * 0.045;
  vec2 disp = vec2(g.x * 0.085, g.y * 0.05 * (0.4 + t * 1.5)) + normalize(toCursor + 1e-5) * lens;

  vec3 refr = backdrop(clamp(vec2(v_uv.x + disp.x, v_uv.y + disp.y), 0.0, 1.0));
  vec3 refl = backdrop(clamp(vec2(v_uv.x, hy + (hy - v_uv.y) * 0.9), 0.0, 1.0));

  vec3 N = normalize(vec3(-g.x * 9.0, 1.0, -g.y * 9.0 * (0.45 + t * 1.6)));
  float F = 0.045 + 0.955 * pow(1.0 - N.y, 2.0);
  F = max(F, smoothstep(0.0, 0.2, 1.0 - t) * 0.8);

  vec3 col = mix(refr, refl, F);

  // Water body tint — deeper rose toward the viewer
  vec3 deep = mix(vec3(0.93, 0.78, 0.84), vec3(0.62, 0.30, 0.45), pow(t, 0.7));
  col = mix(col, deep, 0.35 + (1.0 - F) * 0.25);

  // Softbox glare streak that follows the cursor
  float sb = exp(-pow((v_uv.x - cv.x) * 5.0, 2.0)) * smoothstep(0.0, 0.28, t);
  col += vec3(1.0, 0.96, 0.92) * sb * (0.18 + 0.10 * sin(u_time * 2.0 + v_uv.y * 40.0));

  // Sun glitter path
  vec3 L = normalize(vec3(0.45, 0.8, 0.35));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(N, H), 0.0), 80.0);
  spec *= 0.85 + 0.15 * sin(u_time * 1.5 + v_uv.x * 90.0);
  float sx = 0.66;
  float glitter = exp(-pow((v_uv.x - sx) * 7.0, 2.0)) * exp(-pow((t - 0.10) * 8.0, 2.0));
  col += vec3(1.0, 0.94, 0.9) * (spec * (0.2 + t * 0.3) + glitter * 0.45);

  // Distance haze at the horizon
  col = mix(col, vec3(0.992, 0.962, 0.94), exp(-t * 26.0) * 0.4);

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
    console.info("[water] WebGL2 landscape water initialized");

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
      texel: uni(renderProg, "u_texel"),
      time: uni(renderProg, "u_time"),
      horizon: uni(renderProg, "u_horizon"),
      cursor: uni(renderProg, "u_cursor"),
    };

    let simW = 0;
    let simH = 0;
    let texA: WebGLTexture | null = null;
    let texB: WebGLTexture | null = null;
    let fboA: WebGLFramebuffer | null = null;
    let fboB: WebGLFramebuffer | null = null;
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

    const rebuild = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect || rect.width < 4 || rect.height < 4) return;
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        1.15,
        Math.sqrt(1.05e6 / (rect.width * rect.height))
      );
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      simW = Math.max(112, Math.min(224, Math.round((rect.width / 7) * resScale)));
      simH = Math.max(112, Math.min(224, Math.round((rect.height / 7) * resScale)));
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
    };
    rebuild();

    const ro = new ResizeObserver(rebuild);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let cursorUv = { x: -2, y: -2 };
    let lastUv = { x: 0, y: 0 };
    let lastMove = -999;
    let velLen = 0;
    let windAcc = 0;
    let cursor = { x: 0.66, y: 0.4 };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const now = performance.now();
      const dt = Math.max(8, now - lastMove);
      velLen = Math.hypot(((x - lastUv.x) / dt) * 1000, ((y - lastUv.y) / dt) * 1000);
      lastUv = { x, y };
      lastMove = now;
      cursorUv = { x, y };
      cursor = { x, y };
    };
    window.addEventListener("pointermove", onMove);

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
      if (!fboB || !texA || !renderProg || !simProg || !texB) return;

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
      gl.uniform2f(renU.texel, 1 / simW, 1 / simH);
      gl.uniform1f(renU.time, time * 0.001);
      gl.uniform1f(renU.horizon, 0.54);
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
      const since = time - lastMove;
      const overCanvas =
        cursorUv.x >= 0 && cursorUv.x <= 1 && cursorUv.y >= 0 && cursorUv.y <= 1;
      if (overCanvas && since < 90 && velLen > 0.02) {
        splat(cursorUv.x, Math.min(cursorUv.y, 0.98), Math.min(0.3, velLen * 0.035));
        velLen = 0;
      }
      velLen *= 0.86;

      windAcc += 16.6;
      if (windAcc > 220 + Math.random() * 140) {
        windAcc = 0;
        splat(Math.random(), 0.72 + Math.random() * 0.26, 0.008);
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
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
