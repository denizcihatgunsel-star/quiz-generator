"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { drawStoryFrame, storyTimeline, storyNarration, STORY_W, STORY_H } from "@/lib/storyRenderer";
import type { QuizData } from "@/types/quiz";

type Phase = "ready" | "preparing" | "recording" | "done" | "error";

const MIME_ORDER = [
  { mime: "video/mp4;codecs=avc1.42E01E,mp4a.40.2", ext: "mp4" },
  { mime: "video/mp4", ext: "mp4" },
  { mime: "video/webm;codecs=vp9,opus", ext: "webm" },
  { mime: "video/webm;codecs=vp8,opus", ext: "webm" },
  { mime: "video/webm", ext: "webm" },
];

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

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
  const [voiceNote, setVoiceNote] = useState<string | null>(null);

  const tl = storyTimeline(quiz);
  const totalSeconds = Math.round(tl.duration);
  const progress = Math.round((Math.min(elapsed, tl.duration) / tl.duration) * 100);

  const cleanupRef = useRef<() => void>(() => {});

  useEffect(
    () => () => {
      cleanupRef.current();
    },
    []
  );

  const startRecording = async () => {
    let rafId = 0;
    let audioCtx: AudioContext | null = null;
    let audioSource: AudioBufferSourceNode | null = null;

    const cleanup = () => {
      cancelAnimationFrame(rafId);
      try {
        audioSource?.stop();
      } catch {
        /* already stopped */
      }
      try {
        void audioCtx?.close();
      } catch {
        /* ignore */
      }
    };
    cleanupRef.current = cleanup;

    try {
      await document.fonts.ready;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx2d = canvas.getContext("2d");
      if (!ctx2d) throw new Error("Canvas unsupported");

      const chosen = MIME_ORDER.find((m) => MediaRecorder.isTypeSupported(m.mime));
      if (!chosen) throw new Error("Recording unsupported");
      setExt(chosen.ext);

      // ---- Voiceover: server-side neural TTS mixed into the recording ----
      let audioTracks: MediaStreamTrack[] = [];
      if (voiceOn) {
        setPhase("preparing");
        const cues = storyNarration(quiz).sort((a, b) => a.t - b.t);
        try {
          const res = await fetch("/api/story-narration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lines: cues.map((c) => c.text), language: languageCode }),
          });
          if (res.ok) {
            const data = await res.json();
            const clips: string[] = Array.isArray(data.audio) ? data.audio : [];
            const usableCount = cues.filter((_, i) => clips[i]).length;
            if (usableCount > 0) {
              audioCtx = new AudioContext();
              await audioCtx.resume();
              const sr = audioCtx.sampleRate;
              const totalLen = Math.ceil((tl.duration + 0.5) * sr);
              const master = audioCtx.createBuffer(1, totalLen, sr);
              const target = master.getChannelData(0);
              for (let i = 0; i < cues.length && i < clips.length; i++) {
                const b64 = clips[i];
                if (!b64) continue;
                try {
                  const decoded = await audioCtx.decodeAudioData(base64ToArrayBuffer(b64));
                  const src = decoded.getChannelData(0);
                  const offset = Math.floor(cues[i].t * sr);
                  const n = Math.min(src.length, totalLen - offset);
                  if (n > 0) target.set(src.subarray(0, n), offset);
                } catch {
                  /* skip undecodable clip */
                }
              }
              const dest = audioCtx.createMediaStreamDestination();
              audioSource = audioCtx.createBufferSource();
              audioSource.buffer = master;
              audioSource.connect(dest);
              audioSource.connect(audioCtx.destination); // hear it live while rendering
              audioTracks = dest.stream.getAudioTracks();
            } else {
              setVoiceNote("Voice service was busy — recorded without narration.");
            }
          } else {
            setVoiceNote("Voice service was busy — recorded without narration.");
          }
        } catch {
          setVoiceNote("Voice service was busy — recorded without narration.");
        }
      }

      const videoStream = canvas.captureStream(30);
      const mix = new MediaStream([...videoStream.getVideoTracks(), ...audioTracks]);

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(mix, {
        mimeType: chosen.mime,
        videoBitsPerSecond: 10_000_000,
      });
      recorder.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: chosen.mime });
        setVideoUrl(URL.createObjectURL(blob));
        setPhase("done");
      };

      const finish = () => {
        cancelAnimationFrame(rafId);
        try {
          recorder.stop();
        } catch {
          /* ignore */
        }
        videoStream.getTracks().forEach((t) => t.stop());
        try {
          audioSource?.stop();
        } catch {
          /* ignore */
        }
      };

      setPhase("recording");
      setElapsed(0);
      recorder.start(500);
      // Start audio and the animation clock at the same instant for sync
      if (audioSource) {
        try {
          audioSource.start();
        } catch {
          /* ignore */
        }
      }
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = (now - startTime) / 1000;
        drawStoryFrame(ctx2d, canvas.width, canvas.height, t, quiz);
        setElapsed(Math.min(tl.duration, t));
        if (t < tl.duration + 0.15) {
          rafId = requestAnimationFrame(tick);
        } else {
          finish();
        }
      };
      rafId = requestAnimationFrame(tick);
    } catch {
      cleanup();
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
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                voiceOn
                  ? "bg-[#B0607A] text-white shadow-[0_8px_20px_-8px_rgba(176,96,122,0.7)]"
                  : "border border-[#F3D5DC] bg-white/70 text-[#8C5A68]"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${voiceOn ? "bg-white" : "bg-[#C98A98]"}`} />
              Teacher voiceover {voiceOn ? "on" : "off"}
            </button>
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
            {phase === "preparing" ? (
              <div className="flex h-[427px] w-[240px] flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#FDE8EC] to-[#F8E9ED] shadow-[0_20px_60px_-20px_rgba(59,32,39,0.5)] sm:h-[498px] sm:w-[280px]">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#B0607A]/30 border-t-[#B0607A]" />
                <p className="text-xs font-medium text-[#8C5A68]">Generating voiceover…</p>
              </div>
            ) : phase !== "done" ? (
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

        {(phase === "recording" || phase === "done") && voiceNote && (
          <p className="-mt-2 text-center text-xs text-[#B4939F]">{voiceNote}</p>
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