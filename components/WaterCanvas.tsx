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
  float h = c.r;
  float p = c.g;
  float l = texture(u_a, v_uv - vec2(u_texel.x, 0.0)).r;
  float r = texture(u_a, v_uv + vec2(u_texel.x, 0.0)).r;
  float u = texture(u_a, v_uv - vec2(0.0, u_texel.y)).r;
  float d = texture(u_a, v_uv + vec2(0.0, u_texel.y)).r;
  float nxt = (l + r + u + d) * 0.5 - p;
  nxt *= 0.985;
  o = vec4(nxt, h, 0.0, 1.0);
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
  o = vec4(c.r + g, c.g, 0.0, 1.0);
}`;

const RENDER_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_h;
uniform vec2 u_texel;
uniform float u_time;
uniform float u_horizon;
in vec2 v_uv;
out vec4 o;

float heightAt(vec2 uv) { return texture(u_h, uv).r; }

vec3 skyColor(vec2 uv) {
  float t = clamp((uv.y - 0.62) * 3.4, 0.0, 1.0);
  vec3 near = vec3(0.988, 0.910, 0.929);
  vec3 far = vec3(0.984, 0.945, 0.933);
  return mix(near, far, t);
}

void main() {
  float hy = u_horizon;
  if (v_uv.y < hy - 0.04) discard;
  float a = smoothstep(hy - 0.04, hy - 0.006, v_uv.y);
  if (a < 0.005) discard;

  float hl = heightAt(v_uv - vec2(u_texel.x, 0.0));
  float hr = heightAt(v_uv + vec2(u_texel.x, 0.0));
  float hd = heightAt(v_uv - vec2(0.0, u_texel.y));
  float hu = heightAt(v_uv + vec2(0.0, u_texel.y));
  vec2 g = vec2(hr - hl, hu - hd);
  vec3 N = normalize(vec3(-g.x * 7.0, 1.0, -g.y * 7.0));

  vec2 ruv = vec2(v_uv.x, hy + (hy - v_uv.y));
  vec3 reflectCol = skyColor(ruv);

  vec3 deep = vec3(0.76, 0.44, 0.56);
  vec3 refrCol = mix(deep, skyColor(v_uv + N.xy * 0.014), 0.62);

  float dist = clamp((hy - v_uv.y) / 0.14, 0.0, 1.0);
  float F = 0.035 + 0.965 * pow(1.0 - N.y, 3.0);
  F = max(F, dist * 0.85);

  vec3 L = normalize(vec3(0.45, 0.75, 0.32));
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float s = pow(max(dot(N, H), 0.0), 240.0) * 0.85
          + pow(max(dot(N, H), 0.0), 12.0) * 0.10;
  s *= 0.85 + 0.15 * sin(u_time * 2.0 + v_uv.x * 80.0);

  vec3 col = mix(refrCol, reflectCol, F);
  col += vec3(1.0, 0.97, 0.92) * s;
  col = mix(col, reflectCol, dist * 0.12);

  o = vec4(col, a);
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
    if (!gl) return;

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
    if (!simProg || !splatProg || !renderProg) return;

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

    let simW = 0;
    let simH = 0;
    let texA: WebGLTexture | null = null;
    let texB: WebGLTexture | null = null;
    let fboA: WebGLFramebuffer | null = null;
    let fboB: WebGLFramebuffer | null = null;

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
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, rect.width < 768 ? 1.25 : 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      simW = Math.max(128, Math.min(512, Math.round(rect.width / 3.2)));
      simH = Math.max(128, Math.min(512, Math.round(rect.height / 3.2)));
      texA = makeTex();
      texB = makeTex();
      fboA = texA ? makeFbo(texA) : null;
      fboB = texB ? makeFbo(texB) : null;
      if (fboA && fboB) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fboA);
        gl.clearColor(0, 0, 0, 1);
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
    };
    window.addEventListener("pointermove", onMove);

    const splat = (x: number, y: number, force: number) => {
      if (!fboA || !texB || !splatProg) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboA);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(splatProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texB);
      gl.uniform1i(gl.getUniformLocation(splatProg, "u_b"), 0);
      gl.uniform2f(gl.getUniformLocation(splatProg, "u_pos"), x, y);
      gl.uniform1f(gl.getUniformLocation(splatProg, "u_force"), force);
      aPos(splatProg);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const renderOnce = () => {
      if (!fboB || !texA || !renderProg || !simProg || !texB) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(simProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(gl.getUniformLocation(simProg, "u_a"), 0);
      gl.uniform2f(gl.getUniformLocation(simProg, "u_texel"), 1 / simW, 1 / simH);
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
      gl.uniform1i(gl.getUniformLocation(renderProg, "u_h"), 0);
      gl.uniform2f(gl.getUniformLocation(renderProg, "u_texel"), 1 / simW, 1 / simH);
      gl.uniform1f(gl.getUniformLocation(renderProg, "u_time"), (performance.now() * 0.001));
      gl.uniform1f(gl.getUniformLocation(renderProg, "u_horizon"), 1 - 0.36);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      aPos(renderProg);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.disable(gl.BLEND);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const loop = (time: number) => {
      const since = time - lastMove;
      if (cursorUv.x > -1 && since < 90 && velLen > 0.02) {
        splat(cursorUv.x, Math.min(cursorUv.y, 0.98), Math.min(0.16, velLen * 0.02));
        velLen = 0;
      }
      velLen *= 0.86;

      windAcc += 16.6;
      if (windAcc > 110 + Math.random() * 90) {
        windAcc = 0;
        splat(Math.random(), 0.72 + Math.random() * 0.26, 0.005);
      }

      renderOnce();
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      renderOnce();
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
