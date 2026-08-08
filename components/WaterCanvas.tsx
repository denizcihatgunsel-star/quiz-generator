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

const RENDER_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_h;
uniform vec2 u_texel;
uniform float u_time;
uniform float u_horizon;
in vec2 v_uv;
out vec4 o;

float heightAt(vec2 uv) { return texture(u_h, uv).r * 2.0 - 1.0; }

vec3 skyColor(vec2 uv) {
  float t = clamp((uv.y - 0.5) * 2.8, 0.0, 1.0);
  vec3 near = vec3(0.988, 0.910, 0.929);
  vec3 far = vec3(0.984, 0.945, 0.933);
  return mix(near, far, t);
}

void main() {
  float hy = u_horizon;
  float t = clamp((v_uv.y - hy) / (1.0 - hy), 0.0, 1.0);
  float edge = smoothstep(0.0, 0.025, t);
  if (edge < 0.004) discard;

  float dist = clamp(((1.0 - t) / t) * 0.22, 0.0, 1.0);
  vec2 hf = vec2(v_uv.x, 1.0 - dist);

  float pGain = min(t / (1.0 - t) * 0.5, 4.5);

  vec2 hf2 = clamp(vec2(hf.x, hf.y + heightAt(hf) * pGain * 0.4), 0.0, 1.0);
  float hc = heightAt(hf2);
  float hl = heightAt(vec2(hf2.x - u_texel.x, hf2.y));
  float hr = heightAt(vec2(hf2.x + u_texel.x, hf2.y));
  float hd = heightAt(vec2(hf2.x, hf2.y - u_texel.y));
  float hu = heightAt(vec2(hf2.x, hf2.y + u_texel.y));
  vec2 g = vec2(hr - hl, hu - hd);

  vec3 N = normalize(vec3(-g.x * 9.0, 1.0, -g.y * 9.0 * (0.45 + t * 1.6)));

  vec3 deep = mix(vec3(0.90, 0.70, 0.78), vec3(0.42, 0.16, 0.31), pow(t, 0.8));
  vec3 reflectCol = skyColor(vec2(v_uv.x, hy + (hy - v_uv.y) * 1.4));
  vec3 refrCol = skyColor(clamp(vec2(v_uv.x + g.x * 0.06, v_uv.y + g.y * 0.05 * (0.4 + t * 1.5)), 0.0, 1.0));

  float F = 0.045 + 0.955 * pow(1.0 - N.y, 2.0);
  F = max(F, smoothstep(0.0, 0.2, 1.0 - t) * 0.82);

  float diffuse = clamp(dot(N, normalize(vec3(0.3, 0.85, 0.35))), 0.0, 1.0);

  vec3 col = mix(refrCol, reflectCol, F);
  col = mix(col, deep, 0.6 + (1.0 - F) * 0.25);
  col *= 0.8 + 0.4 * diffuse;

  vec3 L = normalize(vec3(0.45, 0.8, 0.35));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(N, H), 0.0), 80.0);
  spec *= 0.85 + 0.15 * sin(u_time * 1.5 + v_uv.x * 90.0);
  float sx = 0.64;
  float glitter = exp(-pow((v_uv.x - sx) * 7.0, 2.0)) * exp(-pow((t - 0.10) * 8.0, 2.0));
  col += vec3(1.0, 0.94, 0.9) * (spec * (0.25 + t * 0.35) + glitter * 0.45);

  col = mix(col, reflectCol, smoothstep(0.0, 0.035, 1.0 - t) * 0.55);

  o = vec4(col, edge);
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
    console.info("[water] WebGL2 water simulation initialized");

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
        1.25,
        Math.sqrt(1.5e6 / (rect.width * rect.height))
      );
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      simW = Math.max(128, Math.min(288, Math.round((rect.width / 6) * resScale)));
      simH = Math.max(128, Math.min(288, Math.round((rect.height / 6) * resScale)));
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
      gl.uniform1f(renU.horizon, 1 - 0.42);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      aPos(renderProg);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.disable(gl.BLEND);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let lastNow = performance.now();
    let slowFrames = 0;
    let stopped = false;

    const loop = (time: number) => {
      if (stopped) return;
      const since = time - lastMove;
      if (cursorUv.x > -1 && since < 90 && velLen > 0.02) {
        splat(cursorUv.x, Math.min(cursorUv.y, 0.98), Math.min(0.3, velLen * 0.035));
        velLen = 0;
      }
      velLen *= 0.86;

      windAcc += 16.6;
      if (windAcc > 130 + Math.random() * 100) {
        windAcc = 0;
        splat(Math.random(), 0.72 + Math.random() * 0.26, 0.012);
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
