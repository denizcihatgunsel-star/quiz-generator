import type { QuizData } from "@/types/quiz";

export const STORY_W = 1080;
export const STORY_H = 1920;
export const STORY_DURATION = 15;

const SANS = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
const SERIF = '"Instrument Serif", Georgia, "Times New Roman", serif';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const seg = (t: number, start: number, dur: number) => clamp01((t - start) / dur);
const fadeOut = (t: number, end: number, dur: number) => clamp01((end - t) / dur);

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(test).width > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function heart(ctx: CanvasRenderingContext2D, size: number) {
  const s = size / 2;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.6);
  ctx.bezierCurveTo(0, s * 0.1, -s * 1.2, -s * 0.3, -s * 1.2, s * 0.5);
  ctx.bezierCurveTo(-s * 1.2, s * 1.1, -s * 0.4, s * 1.25, 0, s * 1.6);
  ctx.bezierCurveTo(s * 0.4, s * 1.25, s * 1.2, s * 1.1, s * 1.2, s * 0.5);
  ctx.bezierCurveTo(s * 1.2, -s * 0.3, s * 0.1, s * 0.1, 0, s * 0.6);
  ctx.closePath();
  ctx.fill();
}

export function drawStoryFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  quiz: QuizData
) {
  const topic = quiz.topic || "Your quiz";
  const mcq = quiz.multipleChoice[0];
  const question = mcq ? mcq.question : "Can you ace this quiz?";
  const optArr = mcq ? mcq.options.slice(0, 4) : ["Option A", "Option B", "Option C", "Option D"];
  const chips = [
    `${quiz.multipleChoice.length} MCQ`,
    `${quiz.flashcards.length} flashcards`,
    ...(quiz.fillInTheBlank?.length ? [`${quiz.fillInTheBlank.length} fill-in-blank`] : []),
    ...(quiz.trueFalse?.length ? [`${quiz.trueFalse.length} true/false`] : []),
  ];

  // ---- background ----
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#FDE8EC");
  g.addColorStop(0.5, "#FBF1EE");
  g.addColorStop(1, "#F8E9ED");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const orb = (
    cx: number,
    cy: number,
    r: number,
    color: string,
    alpha: number,
    dx: number,
    dy: number,
    ph: number
  ) => {
    const ox = Math.sin(t * 0.5 + ph) * dx;
    const oy = Math.cos(t * 0.4 + ph * 1.7) * dy;
    const gr = ctx.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, r);
    gr.addColorStop(0, color);
    gr.addColorStop(1, "rgba(248,233,237,0)");
    ctx.globalAlpha = alpha;
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  };
  orb(140, 340, 430, "rgba(233,168,184,0.55)", 0.5, 40, 25, 0);
  orb(950, 1500, 540, "rgba(200,138,152,0.45)", 0.45, 30, 30, 2);
  orb(880, 560, 300, "rgba(233,168,184,0.4)", 0.35, 25, 20, 4);

  // ---- progress bar ----
  const p = clamp01((t - 0.6) / (STORY_DURATION - 1.2));
  if (p > 0) {
    ctx.fillStyle = "#B0607A";
    ctx.globalAlpha = 0.8;
    ctx.fillRect(0, 0, w * p, 10);
    ctx.globalAlpha = 1;
  }

  // ---- footer watermark ----
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(154,114,128,0.85)";
  ctx.font = `500 34px ${SANS}`;
  ctx.fillText("examina.ink", w / 2, h - 80);

  // ---- intro: kicker + wordmark (0.6 - 6.6) ----
  const e1 = seg(t, 0.6, 0.9) * fadeOut(t, 6.6, 0.5);
  if (e1 > 0) {
    ctx.globalAlpha = e1;
    try {
      ctx.letterSpacing = "16px";
    } catch {
      /* older browsers */
    }
    ctx.fillStyle = "#A87680";
    ctx.font = `600 40px ${SANS}`;
    ctx.fillText("A QUIZ TEASER", w / 2, 560 + (1 - easeOutCubic(seg(t, 0.6, 0.9))) * 40);
    try {
      ctx.letterSpacing = "0px";
    } catch {
      /* older browsers */
    }

    const e1b = seg(t, 1.0, 0.8);
    if (e1b > 0) {
      ctx.globalAlpha = e1 * e1b;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#3B2027";
      ctx.font = `italic 190px ${SERIF}`;
      ctx.fillText("Examina", w / 2, 720 + (1 - easeOutCubic(e1b)) * 50);
      const mw = ctx.measureText("Examina").width;
      ctx.fillStyle = "#B0607A";
      ctx.beginPath();
      ctx.arc(w / 2 + mw / 2 + 34, 690, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.textBaseline = "alphabetic";
    }
    ctx.globalAlpha = 1;
  }

  // ---- topic (1.7 - 7.2) ----
  const e2 = seg(t, 1.7, 0.7) * fadeOut(t, 7.2, 0.5);
  if (e2 > 0) {
    ctx.globalAlpha = e2;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#3B2027";
    let fs = 72;
    ctx.font = `600 ${fs}px ${SANS}`;
    while (ctx.measureText(topic).width > 900 && fs > 40) {
      fs -= 4;
      ctx.font = `600 ${fs}px ${SANS}`;
    }
    ctx.fillText(topic, w / 2, 950 + (1 - easeOutCubic(seg(t, 1.7, 0.7))) * 60);
    ctx.textBaseline = "alphabetic";
    ctx.globalAlpha = 1;
  }

  // ---- question card (2.9 - 7.8) ----
  const e3 = seg(t, 2.9, 0.6) * fadeOut(t, 7.8, 0.5);
  if (e3 > 0) {
    const cx = 100;
    const cw = w - 200;
    const cardY = 1090;
    const cardH = 470;
    ctx.globalAlpha = e3;
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    rr(ctx, cx, cardY, cw, cardH, 44);
    ctx.fill();
    ctx.strokeStyle = "#F3D5DC";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#4A3038";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `600 46px ${SANS}`;
    const qlines = wrap(ctx, question, cw - 80);
    const qx = cx + 40;
    const qy0 = cardY + 66;
    qlines.slice(0, 3).forEach((l, i) => ctx.fillText(l, qx, qy0 + i * 60));
    const qEnd = qy0 + Math.min(qlines.length, 3) * 60;

    const oy0 = qEnd + 34;
    const oh = 64;
    const ogap = 18;
    optArr.forEach((opt, i) => {
      const oe = easeOutBack(clamp01((t - (3.6 + i * 0.18)) / 0.4));
      if (oe <= 0) return;
      const oy = oy0 + i * (oh + ogap);
      const flash = mcq !== undefined && i === mcq.correctIndex && t > 6.2;
      const flashA = clamp01((t - 6.2) / 0.25);
      const s = Math.max(0.01, oe);

      ctx.save();
      ctx.translate(cx + 40, oy + oh / 2);
      ctx.scale(s, s);
      ctx.fillStyle = flash && flashA > 0 ? "#B0607A" : "rgba(255,255,255,0.92)";
      rr(ctx, -40, -oh / 2, cw - 80, oh, 31);
      ctx.fill();
      ctx.strokeStyle = flash && flashA > 0 ? "#B0607A" : "#F3D5DC";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = flash && flashA > 0 ? "#F6E3E8" : "#5D4450";
      const label = `${String.fromCharCode(65 + i)}. ${opt}`;
      let lfs = 34;
      ctx.font = `500 ${lfs}px ${SANS}`;
      while (ctx.measureText(label).width > cw - 150 && lfs > 22) {
        lfs -= 2;
        ctx.font = `500 ${lfs}px ${SANS}`;
      }
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(label, -10, 2);

      if (flash && flashA > 0) {
        ctx.strokeStyle = "#F6E3E8";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(cw - 185, -9);
        ctx.lineTo(cw - 168, 7);
        ctx.lineTo(cw - 140, -20);
        ctx.stroke();
      }
      ctx.restore();
    });
    ctx.textBaseline = "alphabetic";
    ctx.globalAlpha = 1;
  }

  // ---- chips (7.6 - 9.9) ----
  const e4 = seg(t, 7.6, 0.5) * fadeOut(t, 9.9, 0.5);
  if (e4 > 0) {
    ctx.globalAlpha = e4;
    const y = 1600;
    const chipW = 250;
    const chipGap = 22;
    const totalW = chips.slice(0, 3).length * chipW + (chips.slice(0, 3).length - 1) * chipGap;
    let x = w / 2 - totalW / 2;
    chips.slice(0, 3).forEach((c, i) => {
      const ce = easeOutBack(clamp01((t - (7.9 + i * 0.22)) / 0.4));
      if (ce <= 0) return;
      ctx.save();
      ctx.translate(x + chipW / 2, y);
      ctx.scale(ce, ce);
      ctx.translate(-(x + chipW / 2), -y);
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      rr(ctx, x, y - 32, chipW, 64, 32);
      ctx.fill();
      ctx.strokeStyle = "#F3D5DC";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#8C5A68";
      ctx.font = `500 29px ${SANS}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(c, x + chipW / 2, y + 2);
      ctx.restore();
      x += chipW + chipGap;
    });
    ctx.textBaseline = "alphabetic";
    ctx.globalAlpha = 1;
  }

  // ---- end card (9.8 - 15) ----
  const e5 = seg(t, 9.8, 0.6);
  if (e5 > 0) {
    ctx.globalAlpha = e5;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const pulse = 1 + Math.sin(t * 3) * 0.08;
    ctx.save();
    ctx.translate(w / 2, 1240);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = "#B0607A";
    heart(ctx, 56);
    ctx.restore();

    ctx.fillStyle = "#9A7280";
    ctx.font = `italic 56px ${SERIF}`;
    ctx.fillText("Made with", w / 2, 1340);

    const e5b = easeOutBack(seg(t, 10.3, 0.7));
    if (e5b > 0) {
      ctx.save();
      ctx.translate(w / 2, 1500);
      ctx.scale(e5b, e5b);
      ctx.translate(-w / 2, -1500);
      ctx.fillStyle = "#3B2027";
      ctx.font = `italic 200px ${SERIF}`;
      ctx.fillText("Examina", w / 2, 1500);
      ctx.restore();
    }

    const e5c = seg(t, 11.1, 0.5);
    if (e5c > 0) {
      ctx.globalAlpha = e5c;
      ctx.fillStyle = "#B0607A";
      ctx.font = `600 44px ${SANS}`;
      ctx.fillText("examina.ink", w / 2, 1720);
    }
    ctx.textBaseline = "alphabetic";
    ctx.globalAlpha = 1;
  }
}