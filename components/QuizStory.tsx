"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { drawStoryFrame, storyTimeline, storyNarration, STORY_W, STORY_H } from "@/lib/storyRenderer";
import type { QuizData } from "@/types/quiz";

type Phase = "ready" | "recording" | "done" | "error";

const MIME_ORDER = [
  { mime: "video/mp4;codecs=avc1", ext: "mp4" },
  { mime: "video/webm;codecs=vp9", ext: "webm" },
  { mime: "video/webm", ext: "webm" },
];

export default function QuizStory({
  quiz,
  languageCode,
  onClose,
}: {
  quiz: QuizData;
  languageCode?: string;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [elapsed, setElapsed] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [ext, setExt] = useState("webm");
  const [voiceOn, setVoiceOn] = useState(true);
  const voiceSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const stopRef = useRef<() => void>(() => {});

  const tl = storyTimeline(quiz);
  const totalSeconds = Math.round(tl.duration);
  const progress = Math.round((Math.min(elapsed, tl.duration) / tl.duration) * 100);

  useEffect(
    () => () => {
      try {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
      stopRef.current();
    },
    []
  );

  const startRecording = async () => {
    let rafId = 0;
    try {
      await document.fonts.ready;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unsupported");

      const chosen = MIME_ORDER.find((m) => MediaRecorder.isTypeSupported(m.mime));
      if (!chosen) throw new Error("Recording unsupported");
      setExt(chosen.ext);

      // Narration gets recorded by capturing this tab's audio.
      let audioTrack: MediaStreamTrack | null = null;
      let displayStream: MediaStream | null = null;
      if (voiceOn && voiceSupported && navigator.mediaDevices?.getDisplayMedia) {
        try {
          displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
          audioTrack = displayStream.getAudioTracks()[0] ?? null;
          displayStream.getVideoTracks().forEach((t) => t.stop());
        } catch {
          audioTrack = null;
        }
      }

      const videoStream = canvas.captureStream(30);
      const mix = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...(audioTrack ? [audioTrack] : []),
      ]);

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(mix, { mimeType: chosen.mime, videoBitsPerSecond: 10_000_000 });
      recorder.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: chosen.mime });
        setVideoUrl(URL.createObjectURL(blob));
        setPhase("done");
      };

      const synth = voiceOn && voiceSupported ? window.speechSynthesis : null;
      let voice: SpeechSynthesisVoice | null = null;
      if (synth) {
        try {
          const wanted = (languageCode ?? "en").slice(0, 2).toLowerCase();
          voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith(wanted)) ?? null;
        } catch {
          voice = null;
        }
      }
      const speak = (text: string) => {
        if (!synth) return;
        try {
          const u = new SpeechSynthesisUtterance(text);
          u.rate = 1.04;
          if (voice) u.voice = voice;
          else if (languageCode) u.lang = languageCode;
          synth.speak(u);
        } catch {
          /* ignore */
        }
      };
      const cues = storyNarration(quiz).sort((a, b) => a.t - b.t);

      const finish = () => {
        cancelAnimationFrame(rafId);
        try {
          synth?.cancel();
        } catch {
          /* ignore */
        }
        try {
          recorder.stop();
        } catch {
          /* ignore */
        }
        videoStream.getTracks().forEach((t) => t.stop());
        displayStream?.getTracks().forEach((t) => t.stop());
      };
      stopRef.current = finish;

      setPhase("recording");
      recorder.start(500);

      const startTime = performance.now();
      let cueIdx = 0;
      const tick = (now: number) => {
        const t = (now - startTime) / 1000;
        drawStoryFrame(ctx, canvas.width, canvas.height, t, quiz);
        while (cueIdx < cues.length && t >= cues[cueIdx].t) {
          speak(cues[cueIdx].text);
          cueIdx++;
        }
        setElapsed(Math.min(tl.duration, t));
        if (t < tl.duration + 0.15) {
          rafId = requestAnimationFrame(tick);
        } else {
          finish();
        }
      };
      rafId = requestAnimationFrame(tick);
    } catch {
      setPhase("error");
    }
  };

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
              {totalSeconds}s teaser · {tl.questionCount} questions · made for Stories
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

        {phase === "ready" && (
          <div className="flex w-full flex-col items-center gap-4">
            <button
              onClick={() => setVoiceOn((v) => !v)}
              disabled={!voiceSupported}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
                voiceOn
                  ? "bg-[#B0607A] text-white shadow-[0_8px_20px_-8px_rgba(176,96,122,0.7)]"
                  : "border border-[#F3D5DC] bg-white/70 text-[#8C5A68]"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${voiceOn ? "bg-white" : "bg-[#C98A98]"}`} />
              Voiceover {voiceOn ? "on" : "off"}
            </button>
            {voiceOn && voiceSupported && (
              <p className="max-w-md text-center text-xs leading-relaxed text-[#9A7280]">
                When you press record, your browser will ask what to share — pick{" "}
                <span className="font-medium text-[#7E3E55]">this tab</span> and turn on{" "}
                <span className="font-medium text-[#7E3E55]">share tab audio</span> so the narration is
                saved into the video.
              </p>
            )}
            <button
              onClick={startRecording}
              className="rounded-full bg-[#3B2027] px-8 py-3 text-sm font-medium text-[#F6E3E8] shadow-[0_12px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98]"
            >
              Record {totalSeconds}s story
            </button>
          </div>
        )}

        {phase !== "ready" && (
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
                  playsInline
                  controls
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
        )}

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
              Post it to TikTok or Instagram Stories — the link does the rest.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}