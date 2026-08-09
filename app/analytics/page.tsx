"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AnalyticsData {
  totalQuizzes: number;
  scoredQuizzes: number;
  topics: Array<{
    topic: string;
    quizCount: number;
    avgScore: number | null;
    totalQuestions: number;
  }>;
  difficultyBreakdown: Record<string, { correct: number; total: number }>;
  bloomBreakdown: Record<string, { correct: number; total: number }>;
  weeklyActivity: Record<string, number>;
  streak: {
    currentStreak: number;
    longestStreak: number;
    totalXp: number;
    level: number;
  } | null;
}

export default function AnalyticsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") router.push("/auth/login");
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
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Last 14 days activity
  const activityDays: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    activityDays.push({ date: key, count: data.weeklyActivity[key] || 0 });
  }
  const maxActivity = Math.max(1, ...activityDays.map((d) => d.count));

  // Bloom's Taxonomy colors
  const bloomColors: Record<string, string> = {
    Remember: "bg-blue-400",
    Understand: "bg-cyan-400",
    Apply: "bg-emerald-400",
    Analyze: "bg-amber-400",
    Evaluate: "bg-red-400",
  };

  const totalBloom = Object.values(data.bloomBreakdown).reduce((s, b) => s + b.total, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <header className="border-b border-neutral-200 bg-[#f5f5f0]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Analytics</h1>
          <p className="text-neutral-500 mt-1">Track your learning progress across topics and question types.</p>
        </div>

        {/* Overview stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Total Quizzes</p>
            <p className="text-3xl font-bold text-neutral-900">{data.totalQuizzes}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Scored</p>
            <p className="text-3xl font-bold text-neutral-900">{data.scoredQuizzes}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Streak</p>
            <p className="text-3xl font-bold text-neutral-900">{data.streak?.currentStreak ?? 0} <span className="text-sm font-normal text-neutral-400">days</span></p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Level</p>
            <p className="text-3xl font-bold text-violet-600">{data.streak?.level ?? 1}</p>
          </div>
        </div>

        {/* Activity heatmap */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest">Activity (Last 14 Days)</h2>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {activityDays.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-neutral-400">{day.count > 0 ? day.count : ""}</span>
                <div
                  className={`w-full rounded-t-md transition-all ${day.count > 0 ? "bg-violet-500" : "bg-neutral-100"}`}
                  style={{ height: `${Math.max(4, (day.count / maxActivity) * 80)}px` }}
                />
                <span className="text-[9px] text-neutral-300">
                  {new Date(day.date).toLocaleDateString("en", { weekday: "narrow" })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Bloom's Taxonomy distribution */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">Bloom&apos;s Taxonomy</h2>
            {totalBloom === 0 ? (
              <p className="text-sm text-neutral-400">Generate quizzes to see your Bloom&apos;s distribution.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(data.bloomBreakdown).map(([level, { total }]) => (
                  <div key={level}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-neutral-600">{level}</span>
                      <span className="text-xs text-neutral-400">{total} questions</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full">
                      <div
                        className={`h-full rounded-full ${bloomColors[level] || "bg-neutral-400"}`}
                        style={{ width: `${(total / totalBloom) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Difficulty distribution */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">Difficulty Spread</h2>
            {Object.values(data.difficultyBreakdown).every((d) => d.total === 0) ? (
              <p className="text-sm text-neutral-400">Generate quizzes to see difficulty distribution.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(data.difficultyBreakdown).map(([level, { total }]) => {
                  const totalDiff = Object.values(data.difficultyBreakdown).reduce((s, b) => s + b.total, 0);
                  const color = level === "Easy" ? "bg-emerald-400" : level === "Medium" ? "bg-amber-400" : "bg-red-400";
                  return (
                    <div key={level}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-neutral-600">{level}</span>
                        <span className="text-xs text-neutral-400">{total} questions</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full">
                        <div
                          className={`h-full rounded-full ${color}`}
                          style={{ width: `${totalDiff > 0 ? (total / totalDiff) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Topic performance */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">Performance by Topic</h2>
          {data.topics.length === 0 ? (
            <p className="text-sm text-neutral-400">No quizzes yet.</p>
          ) : (
            <div className="space-y-3">
              {data.topics.map((topic) => (
                <div key={topic.topic} className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{topic.topic}</p>
                    <p className="text-xs text-neutral-400">{topic.quizCount} {topic.quizCount === 1 ? "quiz" : "quizzes"}</p>
                  </div>
                  <div className="text-right">
                    {topic.avgScore !== null ? (
                      <span className={`text-lg font-bold ${
                        topic.avgScore >= 80 ? "text-emerald-500" : topic.avgScore >= 60 ? "text-amber-500" : "text-red-500"
                      }`}>
                        {topic.avgScore}%
                      </span>
                    ) : (
                      <span className="text-sm text-neutral-400">Not scored</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
