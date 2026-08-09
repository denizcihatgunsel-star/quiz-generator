"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ARROW = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const BOLT = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

interface Daily {
  quiz: { id: string; topic: string; author: string } | null;
  completedToday: boolean;
  todayBest: number;
  reward: number;
}

export default function MobileHome() {
  const { data: session } = useSession();
  const [daily, setDaily] = useState<Daily | null>(null);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/daily-challenge")
      .then((r) => r.json())
      .then((d) => { if (!d.error) setDaily(d); })
      .catch(() => {});
  }, [session]);

  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <div className="relative">
      {/* Floating pastel orbs — pure CSS, animated on mobile */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="orb-drift h-40 w-40 rounded-full bg-[#E9A8B8]/70 blur-2xl" style={{ top: "-2rem", right: "-3rem" }} />
        <div className="orb-drift h-32 w-32 rounded-full bg-[#F6DCE5]/90 blur-2xl" style={{ animationDelay: "-5s", top: "16rem", left: "-3rem" }} />
        <div className="orb-drift h-28 w-28 rounded-full bg-[#C98A98]/50 blur-2xl" style={{ animationDelay: "-9s", top: "30rem", right: "-2rem" }} />
        <span className="twinkle absolute left-8 top-10 h-2 w-2 rounded-full bg-[#B0607A]" />
        <span className="twinkle absolute right-10 top-24 h-1.5 w-1.5 rounded-full bg-[#E9A8B8]" style={{ animationDelay: "-1s" }} />
        <span className="twinkle absolute left-1/3 top-1/2 h-2 w-2 rounded-full bg-[#C98A98]" style={{ animationDelay: "-1.8s" }} />
        <span className="float-glyph absolute right-8 top-2/3 text-xl text-[#E9A8B8]">✦</span>
        <span className="float-glyph absolute left-6 bottom-24 text-base text-[#C98A98]" style={{ animationDelay: "-3s" }}>❀</span>
      </div>

      {/* Hero — big visible wordmark */}
      <section className="pt-6 text-center">
        <p className="animate-[fade-up_0.6s_ease-out_both] text-[11px] uppercase tracking-[0.4em] text-[#A87680]">
          A quiz generator
        </p>
        <h1
          className="mt-5 font-serif text-[64px] font-medium leading-[0.95] tracking-tight text-[#3B2027] sm:text-7xl"
          style={{ textShadow: "0 8px 30px rgba(176,96,122,0.25)" }}
        >
          Examina
        </h1>
        <p
          className="mx-auto mt-4 max-w-xs font-serif text-lg italic leading-relaxed text-[#8C5A68]"
          style={{ animation: "fade-up 0.6s ease-out 0.15s both" }}
        >
          Turn your study notes into structured quizzes, instantly.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/m/create"
            className="flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-[#3B2027] py-4 pl-6 pr-4 text-sm font-medium text-[#F6E3E8] shadow-[0_14px_34px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98]"
          >
            <span>Start generating</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F6E3E8] text-[#3B2027]">{ARROW}</span>
          </Link>
          <div className="flex gap-3">
            <Link href="/m/explore" className="text-sm text-[#9A7280] underline underline-offset-4 transition-colors hover:text-[#3B2027]">
              Explore quizzes
            </Link>
            <Link href="/m/daily-challenge" className="text-sm text-[#9A7280] underline underline-offset-4 transition-colors hover:text-[#3B2027]">
              Daily challenge
            </Link>
          </div>
        </div>
      </section>

      {/* Daily challenge banner */}
      {session?.user && daily && (
        <Link
          href="/m/daily-challenge"
          className="card-breathe mt-10 flex items-center justify-between gap-4 rounded-2xl border border-[#E9B8C4] bg-white/80 p-5 shadow-[0_20px_50px_-28px_rgba(176,96,122,0.6)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B0607A] to-[#E9A8B8] text-white shadow-[0_10px_22px_-10px_rgba(176,96,122,0.8)]">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-serif text-base italic text-[#9A4F68]">Daily challenge</p>
              {daily.completedToday ? (
                <p className="text-sm font-medium text-[#3B2027]">Done — best {daily.todayBest}%</p>
              ) : daily.quiz ? (
                <p className="text-sm font-medium text-[#3B2027]">&ldquo;{daily.quiz.topic}&rdquo;</p>
              ) : (
                <p className="text-sm font-medium text-[#3B2027]">No community quizzes yet</p>
              )}
              {!daily.completedToday && daily.quiz && (
                <p className="text-xs text-[#9A7280]">+{daily.reward} XP today</p>
              )}
            </div>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FDE8EC] text-[#B0607A]">{BOLT}</span>
        </Link>
      )}

      {/* Quick actions */}
      <section className="mt-10">
        <h2 className="mb-4 font-serif text-xl italic text-[#3B2027]">
          {firstName ? `Good to see you, ${firstName}` : "Jump back in"}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={session?.user ? "/m/dashboard" : "/m/auth/register"}
            className="rounded-2xl border border-[#F3D5DC] bg-white/75 p-5 shadow-[0_14px_40px_-26px_rgba(176,96,122,0.5)] backdrop-blur-xl transition-all hover:border-[#E9B8C4] active:scale-[0.98]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#B0607A] to-[#E9A8B8] text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#3B2027]">{session?.user ? "Dashboard" : "Create account"}</p>
            <p className="mt-0.5 text-xs text-[#9A7280]">{session?.user ? "Your quizzes & stats" : "Free in 30 seconds"}</p>
          </Link>

          <Link
            href="/m/study"
            className="rounded-2xl border border-[#F3D5DC] bg-white/75 p-5 shadow-[0_14px_40px_-26px_rgba(176,96,122,0.5)] backdrop-blur-xl transition-all hover:border-[#E9B8C4] active:scale-[0.98]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E9A8B8] to-[#C98A98] text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#3B2027]">Study mode</p>
            <p className="mt-0.5 text-xs text-[#9A7280]">Flashcards on schedule</p>
          </Link>

          <Link
            href="/m/explore"
            className="rounded-2xl border border-[#F3D5DC] bg-white/75 p-5 shadow-[0_14px_40px_-26px_rgba(176,96,122,0.5)] backdrop-blur-xl transition-all hover:border-[#E9B8C4] active:scale-[0.98]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C98A98] to-[#B0607A] text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#3B2027]">Explore</p>
            <p className="mt-0.5 text-xs text-[#9A7280]">Community quizzes</p>
          </Link>

          <Link
            href={session?.user ? "/m/settings" : "/m/auth/login"}
            className="rounded-2xl border border-[#F3D5DC] bg-white/75 p-5 shadow-[0_14px_40px_-26px_rgba(176,96,122,0.5)] backdrop-blur-xl transition-all hover:border-[#E9B8C4] active:scale-[0.98]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#9A7280] to-[#C98A98] text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#3B2027]">{session?.user ? "Settings" : "Sign in"}</p>
            <p className="mt-0.5 text-xs text-[#9A7280]">{session?.user ? "API keys & team" : "Welcome back"}</p>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-10">
        <h2 className="mb-4 font-serif text-xl italic text-[#3B2027]">How it works</h2>
        <div className="space-y-3">
          {[
            ["1", "Paste or upload", "Drop in your notes — paste text, PDF, or a photo of your lesson."],
            ["2", "Generate", "AI builds questions mapped to Bloom&apos;s Taxonomy in 29 languages."],
            ["3", "Practice", "Quiz yourself, review with flashcards, and track your streak."],
          ].map(([n, title, body]) => (
            <div key={n} className="flex items-start gap-4 rounded-2xl border border-[#F3D5DC] bg-white/70 p-4 backdrop-blur-xl">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FDE8EC] font-serif text-base italic text-[#B0607A]">{n}</span>
              <div>
                <p className="text-sm font-medium text-[#3B2027]">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#9A7280]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
