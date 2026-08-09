"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import QuizRunner from "@/components/QuizRunner";
import { getQuizTheme } from "@/lib/themes";
import type { MultipleChoiceQuestion } from "@/types/quiz";

interface ChallengeQuiz {
  id: string;
  topic: string;
  theme: string;
  author: string;
  questions: MultipleChoiceQuestion[];
}

export default function DailyChallengePage() {
  const { status } = useSession();
  const router = useRouter();
  const [quiz, setQuiz] = useState<ChallengeQuiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedToday, setCompletedToday] = useState(false);
  const [todayBest, setTodayBest] = useState(0);
  const [reward, setReward] = useState(25);
  const [result, setResult] = useState<{
    xp: number;
    streak: number;
    totalXp: number;
    perfect: boolean;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/daily-challenge")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(d.error);
        } else {
          setQuiz(d.quiz);
          setCompletedToday(d.completedToday);
          setTodayBest(d.todayBest ?? 0);
          setReward(d.reward ?? 25);
        }
      })
      .catch(() => setError("Failed to load the daily challenge."))
      .finally(() => setLoading(false));
  }, [status]);

  const handleSubmit = async (correct: number, total: number) => {
    if (!quiz || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/daily-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId: quiz.id, score: correct, total }),
      });
      const d = await res.json();
      if (res.ok) {
        setResult(d);
        setCompletedToday(true);
      } else {
        setError(d.error ?? "Something went wrong.");
      }
    } catch {
      setError("Something went wrong.");
    }
    setSubmitting(false);
  };

  const theme = getQuizTheme(quiz?.theme);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 font-serif text-sm italic text-[#B0607A]">Daily challenge</p>
          <h1 className="text-4xl font-medium tracking-tight text-[#3B2027] sm:text-5xl">
            One quiz. <span className="font-serif italic text-[#B0607A]">Every day.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9A7280]">
            A fresh community quiz each day. Finish it to earn XP and keep your streak alive.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-24">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-2 w-2 animate-bounce rounded-full bg-[#B0607A]" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-20 text-center backdrop-blur-xl">
            <p className="mb-4 font-serif text-2xl italic text-[#3B2027]">Something went wrong</p>
            <p className="mb-8 text-sm text-[#9A7280]">{error}</p>
            <Link href="/dashboard" className="rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]">
              Back to dashboard
            </Link>
          </div>
        )}

        {!loading && !error && quiz === null && (
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-20 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]">
              <svg className="h-7 w-7 text-[#B0607A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="mb-2 font-serif text-2xl italic text-[#3B2027]">No community quizzes yet</p>
            <p className="mb-8 text-sm text-[#9A7280]">Be the first to publish a quiz — then check back tomorrow.</p>
            <Link href="/dashboard" className="rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]">
              Back to dashboard
            </Link>
          </div>
        )}

        {!loading && !error && quiz && result === null && (
          <>
            {completedToday ? (
              <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-16 text-center backdrop-blur-xl">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]">
                  <svg className="h-7 w-7 text-[#B0607A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="mb-2 font-serif text-3xl italic text-[#3B2027]">Challenge complete</h2>
                <p className="mb-2 text-sm text-[#9A7280]">Today&apos;s quiz was &ldquo;{quiz.topic}&rdquo; — your best score: {todayBest}%</p>
                <p className="text-xs text-[#B4939F]">Come back tomorrow for a new one.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-center gap-3">
                  <span className={`rounded-full px-4 py-1.5 text-xs font-medium ${theme.eyebrow}`}>{theme.label} theme</span>
                  <span className="rounded-full bg-[#F6E4EA] px-4 py-1.5 text-xs font-medium text-[#9A4F68]">+{reward} XP</span>
                  <span className="rounded-full bg-[#F6E4EA] px-4 py-1.5 text-xs font-medium text-[#9A4F68]">by {quiz.author}</span>
                </div>
                <QuizRunner
                  questions={quiz.questions}
                  theme={theme}
                  submitLabel={submitting ? "Claiming..." : "Claim reward"}
                  onSubmit={handleSubmit}
                />
              </>
            )}
          </>
        )}

        {result && (
          <div className="mx-auto max-w-xl rounded-2xl border border-[#F3D5DC] bg-white/70 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#B0607A] to-[#E9A8B8] text-white">
              {result.perfect ? (
                <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ) : (
                <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
            </div>
            <h2 className="font-serif text-3xl italic text-[#3B2027]">{result.perfect ? "Perfect challenge!" : "Challenge complete!"}</h2>
            <p className="mt-3 text-sm text-[#9A7280]">
              {result.perfect && "Perfect score bonus —"} +{result.xp} XP
            </p>
            <p className="mt-1 text-sm text-[#9A7280]">Streak: {result.streak} day{result.streak === 1 ? "" : "s"} · {result.totalXp} total XP</p>
            <Link
              href="/dashboard"
              className="mt-8 inline-block w-full rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] transition-all hover:bg-[#52303B]"
            >
              Back to dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
