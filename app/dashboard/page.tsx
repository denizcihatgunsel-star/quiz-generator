"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StreakWidget from "@/components/StreakWidget";

interface SavedQuizItem {
  id: string;
  topic: string;
  score: number | null;
  total: number | null;
  shareId: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<SavedQuizItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "scored" | "unscored">("all");
  const [startingLive, setStartingLive] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"student" | "teacher">("student");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/quiz/history")
        .then((r) => r.json())
        .then((d) => setQuizzes(d.quizzes ?? []))
        .finally(() => setLoading(false));

      fetch("/api/user")
        .then((r) => r.json())
        .then((d) => { if (d.role) setUserRole(d.role); })
        .catch(() => {});
    }
  }, [session]);

  const copyShareLink = (shareId: string) => {
    const url = `${window.location.origin}/quiz/${shareId}`;
    navigator.clipboard.writeText(url);
    setCopied(shareId);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteQuiz = async (id: string) => {
    if (deleting) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/quiz/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuizzes((prev) => prev.filter((q) => q.id !== id));
      }
    } catch {
      // silently ignore
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  const totalQuizzes = quizzes.length;
  const scoredQuizzes = quizzes.filter((q) => q.score !== null && q.total !== null);
  const avgScore =
    scoredQuizzes.length > 0
      ? Math.round(
          scoredQuizzes.reduce((sum, q) => sum + (q.score! / q.total!) * 100, 0) /
            scoredQuizzes.length
        )
      : null;

  // Best score
  const bestScore =
    scoredQuizzes.length > 0
      ? Math.round(
          Math.max(...scoredQuizzes.map((q) => (q.score! / q.total!) * 100))
        )
      : null;

  // Filter quizzes
  const filteredQuizzes = quizzes.filter((q) => {
    if (filter === "scored") return q.score !== null && q.total !== null;
    if (filter === "unscored") return q.score === null || q.total === null;
    return true;
  });

  // Score trend (last 10 scored quizzes, oldest first)
  const scoreTrend = scoredQuizzes
    .slice(0, 10)
    .reverse()
    .map((q) => Math.round((q.score! / q.total!) * 100));

  if (status === "loading" || loading) {
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

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-[#f5f5f0]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Pricing
            </Link>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-500 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New quiz
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Dashboard</h1>
          <p className="text-neutral-500 mt-1">Your quiz history and performance overview.</p>
        </div>

        {/* Streak & XP */}
        <StreakWidget />

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          {userRole === "student" && (
            <Link
              href="/study"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors shadow-sm"
            >
              <span>&#128218;</span> Study Mode
            </Link>
          )}
          {userRole === "teacher" && (
            <Link
              href="/classroom/join"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <span>&#127979;</span> Classroom
            </Link>
          )}
          <Link
            href="/analytics"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm"
          >
            <span>&#128202;</span> {userRole === "teacher" ? "Class Analytics" : "Analytics"}
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Total Quizzes</p>
            <p className="text-3xl font-bold text-neutral-900">{totalQuizzes}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Completed</p>
            <p className="text-3xl font-bold text-neutral-900">{scoredQuizzes.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Avg Score</p>
            <p className="text-3xl font-bold text-neutral-900">
              {avgScore !== null ? (
                <span className={avgScore >= 80 ? "text-emerald-400" : avgScore >= 60 ? "text-amber-400" : "text-red-400"}>
                  {avgScore}%
                </span>
              ) : "—"}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Best Score</p>
            <p className="text-3xl font-bold text-neutral-900">
              {bestScore !== null ? (
                <span className="text-emerald-400">{bestScore}%</span>
              ) : "—"}
            </p>
          </div>
        </div>

        {/* Score Trend */}
        {scoreTrend.length >= 2 && (
          <div className="mb-10 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest">Score Trend</h2>
              <span className="text-xs text-neutral-400">Last {scoreTrend.length} quizzes</span>
            </div>
            <div className="flex items-end gap-1.5 h-24">
              {scoreTrend.map((score, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-neutral-500">{score}%</span>
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      score >= 80 ? "bg-emerald-500/80" : score >= 60 ? "bg-amber-500/80" : "bg-red-500/80"
                    }`}
                    style={{ height: `${Math.max(8, (score / 100) * 80)}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz History Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Quiz History</h2>
          <div className="flex gap-1 p-1 bg-neutral-100 border border-neutral-200 rounded-lg">
            {(["all", "scored", "unscored"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {f === "all" ? "All" : f === "scored" ? "Scored" : "Unscored"}
              </button>
            ))}
          </div>
        </div>

        {/* Quiz List */}
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-neutral-500 mb-4">
              {filter === "all" ? "No quizzes yet" : `No ${filter} quizzes`}
            </p>
            {filter === "all" && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-500/20"
              >
                Generate your first quiz
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuizzes.map((q) => {
              const scorePercent = q.score !== null && q.total !== null
                ? Math.round((q.score / q.total) * 100)
                : null;

              return (
                <div
                  key={q.id}
                  className="group p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Link
                        href={`/quiz/${q.shareId}`}
                        className="text-sm font-medium text-neutral-900 hover:text-violet-600 transition-colors truncate"
                      >
                        {q.topic}
                      </Link>
                      {scorePercent !== null && (
                        <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                          scorePercent >= 80
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : scorePercent >= 60
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {scorePercent}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span>
                        {new Date(q.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {q.score !== null && q.total !== null && (
                        <span>{q.score}/{q.total} correct</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {userRole === "teacher" && (
                      <button
                        onClick={async () => {
                          setStartingLive(q.id);
                          try {
                            const res = await fetch("/api/classroom", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ quizId: q.id }),
                            });
                            const data = await res.json();
                            if (res.ok) router.push(`/classroom/host/${data.code}`);
                          } catch { /* ignore */ }
                          setStartingLive(null);
                        }}
                        disabled={startingLive === q.id}
                        className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-600 hover:bg-emerald-100 font-medium transition-colors disabled:opacity-60"
                      >
                        {startingLive === q.id ? "..." : "Go Live"}
                      </button>
                    )}
                    {q.shareId && (
                      <button
                        onClick={() => copyShareLink(q.shareId!)}
                        className="px-3 py-1.5 rounded-full border border-neutral-200 text-xs text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 transition-colors"
                      >
                        {copied === q.shareId ? "Copied!" : "Share"}
                      </button>
                    )}
                    <Link
                      href={`/quiz/${q.shareId}`}
                      className="px-3 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/20 text-xs text-violet-600 hover:bg-violet-600/20 font-medium transition-colors"
                    >
                      View
                    </Link>
                    {confirmDelete === q.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => deleteQuiz(q.id)}
                          disabled={deleting === q.id}
                          className="px-2.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs text-red-500 hover:bg-red-100 font-medium transition-colors disabled:opacity-50"
                        >
                          {deleting === q.id ? "..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-2.5 py-1.5 rounded-full border border-neutral-200 text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(q.id)}
                        className="px-3 py-1.5 rounded-full border border-neutral-200 text-xs text-neutral-400 hover:text-red-500 hover:border-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
