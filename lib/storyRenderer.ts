import type { QuizData } from "@/types/quiz";

export const STORY_W = 1080;
export const STORY_H = 1920;

const INTRO_DUR = 5;
const OUTRO_DUR = 4;
const MAX_QUESTIONS = 8;

export interface QuestionSegment {
  start: number;
  dur: number;
}

export interface StoryTimeline {
  introStart: number;
  introDur: number;
  segments: QuestionSegment[];
  outroStart: number;
  duration: number;
  questionCount: number;
}

function countWords(s: string): number {
  return s.split(/\s+/).filter(Boolean).length;
}

export function storyTimeline(quiz: QuizData): StoryTimeline {
  const qs = quiz.multipleChoice.slice(0, MAX_QUESTIONS);
  const list = qs.length > 0 ? qs : [];
  let t = INTRO_DUR;
  const segments: QuestionSegment[] = list.map((q) => {
    const dur = Math.min(9, Math.max(4.5, 3.2 + countWords(q.question) * 0.3));
    const seg = { start: t, dur };
    t += dur;
    return seg;
  });
  const outroStart = t;
  return {
    introStart: 0,
    introDur: INTRO_DUR,
    segments,
    outroStart,
    duration: t + OUTRO_DUR,
    questionCount: list.length,
  };
}

export interface NarrationCue {
  t: number;
  text: string;
}

export function storyNarration(quiz: QuizData): NarrationCue[] {
  const tl = storyTimeline(quiz);
  const cues: NarrationCue[] = [
    { t: 1.0, text: `Test yourself. ${quiz.topic}.` },
  ];
  tl.segments.forEach((seg, i) => {
    const q = quiz.multipleChoice[i];
    if (!q) return;
    cues.push({ t: seg.start + 0.4, text: q.question });
    const correct = q.options[q.correctIndex];
    if (correct) {
      cues.push({
        t: seg.start + seg.dur - 1.7,
        text: `The answer is: ${correct}`,
      });
    }
  });
  cues.push({
    t: tl.outroStart + 0.6,
    text: `Make your own quiz at Examina dot ink.`,
  });
  return cues;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const seg01 = (t: number, start: number, dur: number) => clamp01((t - start) / dur);
const fadeOutAt = (t: number, end: number, dur: number) => clamp01((end - t) / dur);

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

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
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
}

function drawQuestionCard(
  ctx: CanvasRenderingContext2D,
  w: number,
  localT: number,
  dur: number,
  q: { question: string; options: string[]; correctIndex: number },
  index: number
) {
  const appear = easeOutCubic(seg01(localT, 0, 0.55));
  const disappear = fadeOutAt(localT, dur - 0.05, 0.4);
  const alpha = appear * disappear;
  if (alpha <= 0) return;

  const cx = 100;
  const cw = w - 200;
  const cardY = 1090;
  const cardH = 500;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  rr(ctx, cx, cardY, cw, cardH, 44);
  ctx.fill();
  ctx.strokeStyle = "#F3D5DC";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Question number chip
  ctx.fillStyle = "#B0607A";
  ctx.font = `600 30px "Space Grotesk", ui-sans-serif, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(`Q${index + 1}`, cx + 40, cardY - 26);

  ctx.fillStyle = "#4A3038";
  ctx.font = `600 46px "Space Grotesk", ui-sans-serif, sans-serif`;
  const qlines = wrap(ctx, q.question, cw - 80).slice(0, 3);
  const qx = cx + 40;
  const qy0 = cardY + 66;
  qlines.forEach((l, i) =>
    ctx.fillText(l, qx, qy0 + i * 60)
  );
  const qEnd = qy0 + qlines.length * 60;

  const oy0 = qEnd + 34;
  const oh = 64;
  const ogap = 18;
  const flashAt = dur - 1.7;

  q.options.slice(0, 4).forEach((opt, oi) => {
    const oe = easeOutBack(clamp01((localT - (0.7 + oi * 0.16)) / 0.4));
    if (oe <= 0) return;
    const oy = oy0 + oi * (oh + ogap);
    const flashed = localT > flashAt;
    const flashA = clamp01((localT - flashAt) / 0.25);
    const s = Math.max(0.01, oe);

    ctx.save();
    ctx.translate(cx + 40, oy + oh / 2);
    ctx.scale(s, s);
    ctx.fillStyle = flashed && flashA > 0 && oi === q.correctIndex ? "#B0607A" : "rgba(255,255,255,0.92)";
    rr(ctx, -40, -oh / 2, cw - 80, oh, 31);
    ctx.fill();
    ctx.strokeStyle =
      flashed && flashA > 0 && oi === q.correctIndex ? "#B0607A" : "#F3D5DC";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle =
      flashed && flashA > 0 && oi === q.correctIndex ? "#F6E3E8" : "#5D4450";
    const label = `${String.fromCharCode(65 + oi)}. ${opt}`;
    let lfs = 34;
    ctx.font = `500 ${lfs}px "Space Grotesk", ui-sans-serif, sans-serif`;
    while (ctx.measureText(label).width > cw - 150 && lfs > 22) {
      lfs -= 2;
      ctx.font = `500 ${lfs}px "Space Grotesk", ui-sans-serif, sans-serif`;
    }
    ctx.fillText(label, -10, 2);

    if (flashed && flashA > 0 && oi === q.correctIndex) {
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

export function drawStoryFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  quiz: QuizData
) {
  const tl = storyTimeline(quiz);
  const SANS = `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`;
  const SERIF = `"Instrument Serif", Georgia, "Times New Roman", serif`;

  drawBackground(ctx, w, h, t);

  // Progress bar
  const p = clamp01(t / tl.duration);
  ctx.fillStyle = "#B0607A";
  ctx.globalAlpha = 0.85;
  ctx.fillRect(0, 0, w * p, 10);
  ctx.globalAlpha = 1;

  // Footer watermark
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(154,114,128,0.85)";
  ctx.font = `500 34px ${SANS}`;
  ctx.fillText("examina.ink", w / 2, h - 80);

  // ---- Intro ----
  const introFade = fadeOutAt(t, tl.introDur - 0.1, 0.45);
  if (introFade > 0) {
    const e1 = seg01(t, 0.6, 0.9) * introFade;
    ctx.globalAlpha = e1;
    ctx.textAlign = "center";
    try {
      ctx.letterSpacing = "16px";
    } catch {
      /* older browsers */
    }
    ctx.fillStyle = "#A87680";
    ctx.font = `600 40px ${SANS}`;
    ctx.fillText("A QUIZ TEASER", w / 2, 520 + (1 - easeOutCubic(seg01(t, 0.6, 0.9))) * 40);
    try {
      ctx.letterSpacing = "0px";
    } catch {
      /* older browsers */
    }

    const e1b = seg01(t, 1.0, 0.8);
    if (e1b > 0) {
      ctx.globalAlpha = e1 * e1b;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#3B2027";
      ctx.font = `italic 190px ${SERIF}`;
      ctx.fillText("Examina", w / 2, 700 + (1 - easeOutCubic(e1b)) * 50);
      const mw = ctx.measureText("Examina").width;
      ctx.fillStyle = "#B0607A";
      ctx.beginPath();
      ctx.arc(w / 2 + mw / 2 + 34, 668, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.textBaseline = "alphabetic";
    }

    const e2 = seg01(t, 2.8, 0.7);
    if (e2 > 0) {
      ctx.globalAlpha = e1 * e2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#3B2027";
      const topic = quiz.topic || "Your quiz";
      let fs = 72;
      ctx.font = `600 ${fs}px ${SANS}`;
      while (ctx.measureText(topic).width > 900 && fs > 40) {
        fs -= 4;
        ctx.font = `600 ${fs}px ${SANS}`;
      }
      ctx.fillText(topic, w / 2, 950 + (1 - easeOutCubic(e2)) * 60);
      ctx.textBaseline = "alphabetic";
    }
    ctx.globalAlpha = 1;
  }

  // ---- Questions ----
  tl.segments.forEach((seg, i) => {
    const q = quiz.multipleChoice[i];
    if (!q) return;
    if (t < seg.start - 0.1 || t > seg.start + seg.dur) return;
    drawQuestionCard(ctx, w, t - seg.start, seg.dur, q, i);
  });

  // ---- Outro ----
  if (t >= tl.outroStart) {
    const e5 = seg01(t, tl.outroStart, 0.6);
    ctx.globalAlpha = e5;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const pulse = 1 + Math.sin(t * 3) * 0.08;
    ctx.save();
    ctx.translate(w / 2, 1150);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = "#B0607A";
    heart(ctx, 56);
    ctx.restore();

    ctx.fillStyle = "#9A7280";
    ctx.font = `italic 56px ${SERIF}`;
    ctx.fillText("Made with", w / 2, 1250);

    const e5b = easeOutBack(seg01(t, tl.outroStart + 0.5, 0.7));
    if (e5b > 0) {
      ctx.save();
      ctx.translate(w / 2, 1410);
      ctx.scale(e5b, e5b);
      ctx.translate(-w / 2, -1410);
      ctx.fillStyle = "#3B2027";
      ctx.font = `italic 200px ${SERIF}`;
      ctx.fillText("Examina", w / 2, 1410);
      ctx.restore();
    }

    const e5c = seg01(t, tl.outroStart + 1.2, 0.5);
    if (e5c > 0) {
      ctx.globalAlpha = e5 * e5c;
      ctx.fillStyle = "#B0607A";
      ctx.font = `600 42px ${SANS}`;
      ctx.fillText("examina.ink", w / 2, 1640);
      ctx.fillStyle = "#9A7280";
      ctx.font = `400 34px ${SANS}`;
      ctx.fillText(
        `${tl.questionCount} questions · ${quiz.flashcards.length} flashcards`,
        w / 2,
        1720
      );
    }
    ctx.textBaseline = "alphabetic";
    ctx.globalAlpha = 1;
  }
}