"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AnalyticsData {
  totalQuizzes: number;
  scoredQuizzes: number;
  topics: Array<{ topic: string; quizCount: number; avgScore: number | null; totalQuestions: number }>;
  streak: { currentStreak: number; longestStreak: number; totalXp: number; level: number } | null;
}

export default function MobileAnalytics() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") router.push("/m/auth/login");
  }, [sessionStatus, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/analytics")
        .then((r) => r.json())
        .then((d) => { if (!d.error) setData(d); })
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-2 w-2 animate-bounce rounded-full bg-[#B0607A]" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const card = "rounded-2xl border border-[#F3D5DC] bg-white/75 p-5 shadow-[0_14px_40px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl";

  return (
    <div>
      <p className="font-serif text-sm italic text-[#B0607A]">Insights</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Your <span className="font-serif italic text-[#B0607A]">analytics</span>
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className={card}>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A7280]">Quizzes</p>
          <p className="mt-1 font-serif text-3xl text-[#3B2027]">{data.totalQuizzes}</p>
        </div>
        <div className={`${card} bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]`}>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A4F68]">Completed</p>
          <p className="mt-1 font-serif text-3xl text-[#B0607A]">{data.scoredQuizzes}</p>
        </div>
        {data.streak && (
          <>
            <div className={card}>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A7280]">Streak</p>
              <p className="mt-1 font-serif text-3xl text-[#3B2027]">{data.streak.currentStreak} days</p>
            </div>
            <div className={card}>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A7280]">XP / Level</p>
              <p className="mt-1 font-serif text-3xl text-[#3B2027]">{data.streak.totalXp} <span className="text-base text-[#9A7280]">Lv {data.streak.level}</span></p>
            </div>
          </>
        )}
      </div>

      {data.topics.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 font-serif text-xl italic text-[#3B2027]">By topic</h2>
          <div className="space-y-3">
            {data.topics.slice(0, 8).map((t) => (
              <div key={t.topic} className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-[#3B2027]">{t.topic}</p>
                  <span className="shrink-0 text-xs font-semibold text-[#B0607A]">
                    {t.avgScore !== null ? `${Math.round(t.avgScore)}%` : "—"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#9A7280]">
                  {t.quizCount} quiz{t.quizCount === 1 ? "" : "zes"} · {t.totalQuestions} questions
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
