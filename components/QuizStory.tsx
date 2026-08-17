"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { drawStoryFrame, STORY_DURATION, STORY_W, STORY_H } from "@/lib/storyRenderer";
import type { QuizData } from "@/types/quiz";

type Phase = "recording" | "done" | "error";

const MIME_ORDER = [
  { mime: "video/mp4;codecs=avc1", ext: "mp4" },
  { mime: "video/webm;codecs=vp9", ext: "webm" },
  { mime: "video/webm", ext: "webm" },
];

export default function QuizStory({ quiz, onClose }: { quiz: QuizData; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("recording");
  const [elapsed, setElapsed] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [ext, setExt] = useState("webm");

  useEffect(() => {
    let raf = 0;
    let recorder: MediaRecorder | null = null;
    const chunks: Blob[] = [];
    let cancelled = false;

    (async () => {
      try {
        await document.fonts.ready;
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas unsupported");

        const stream = canvas.captureStream(30);
        const chosen = MIME_ORDER.find((m) => MediaRecorder.isTypeSupported(m.mime));
        if (!chosen) throw new Error("Recording unsupported");

        setExt(chosen.ext);
        recorder = new MediaRecorder(stream, {
          mimeType: chosen.mime,
          videoBitsPerSecond: 8_000_000,
        });
        recorder.ondataavailable = (e) => {
          if (e.data.size) chunks.push(e.data);
        };
        recorder.onstop = () => {
          if (cancelled) return;
          const blob = new Blob(chunks, { type: chosen.mime });
          setVideoUrl(URL.createObjectURL(blob));
          setPhase("done");
        };
        recorder.start(250);

        const startTime = performance.now();
        const tick = (now: number) => {
          if (cancelled) return;
          const t = (now - startTime) / 1000;
          drawStoryFrame(ctx, canvas.width, canvas.height, t, quiz);
          setElapsed(Math.min(STORY_DURATION, t));
          if (t < STORY_DURATION + 0.1) {
            raf = requestAnimationFrame(tick);
          } else {
            recorder?.stop();
          }
        };
        raf = requestAnimationFrame(tick);
      } catch {
        if (!cancelled) setPhase("error");
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      try {
        recorder?.stop();
      } catch {
        /* ignore */
      }
    };
  }, [quiz]);

  const progress = Math.round((elapsed / STORY_DURATION) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3B2027]/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="flex w-full max-w-3xl flex-col items-center gap-5 rounded-3xl border border-[#F3D5DC] bg-[#FDF4F5] p-6 shadow-[0_40px_120px_-40px_rgba(59,32,39,0.7)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl italic text-[#3B2027]">Quiz story</h2>
            <p className="mt-1 text-sm text-[#9A7280]">
              A 15-second teaser of your quiz, made for Stories.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#9A7280] transition-colors hover:text-[#3B2027]"
            aria-label="Close"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative">
          {phase !== "done" ? (
            <canvas
              ref={canvasRef}
              width={STORY_W}
              height={STORY_H}
              className="w-[240px] rounded-2xl shadow-[0_20px_60px_-20px_rgba(59,32,39,0.5)] sm:w-[280px]"
            />
          ) : (
            videoUrl && (
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-[240px] rounded-2xl shadow-[0_20px_60px_-20px_rgba(59,32,39,0.5)] sm:w-[280px]"
              />
            )
          )}
          {phase === "recording" && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-[#3B2027]/80 px-4 py-1.5 text-xs font-medium text-[#F6E3E8] backdrop-blur">
                Recording… {progress}%
              </span>
            </div>
          )}
        </div>

        {phase === "error" && (
          <p className="text-center text-sm text-[#7E3E55]">
            Your browser can&apos;t record video here. Try Chrome, Edge, or Safari.
          </p>
        )}

        {phase === "done" && videoUrl && (
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={videoUrl}
              download={`examina-quiz-story.${ext}`}
              className="rounded-full bg-[#3B2027] px-7 py-3 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98]"
            >
              Download video ({ext.toUpperCase()})
            </a>
            <p className="max-w-xs text-center text-xs leading-relaxed text-[#9A7280] sm:text-left">
              Post it to TikTok or Instagram Stories. The link says it all —{" "}
              <span className="font-medium text-[#7E3E55]">examina.ink</span>
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}