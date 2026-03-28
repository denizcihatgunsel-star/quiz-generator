"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/quiz/history")
        .then((r) => r.json())
        .then((d) => setQuizzes(d.quizzes ?? []))
        .finally(() => setLoading(false));
    }
  }, [session]);

  const copyShareLink = (shareId: string) => {
    const url = `${window.location.origin}/quiz/${shareId}`;
    navigator.clipboard.writeText(url);
    setCopied(shareId);
    setTimeout(() => setCopied(null), 2000);
  };

  const totalQuizzes = quizzes.length;
  const scoredQuizzes = quizzes.filter((q) => q.score !== null && q.total !== null);
  const avgScore =
    scoredQuizzes.length > 0
      ? Math.round(
          (scoredQuizzes.reduce((sum, q) => sum + (q.score! / q.total!) * 100, 0) /
            scoredQuizzes.length)
        )
      : null;

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold">Q</div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">QuizGen</span>
            </Link>
          </div>
          <Link href="/" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">
            ← Generate quiz
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Total Quizzes</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalQuizzes}</p>
          </div>
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Quizzes Scored</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{scoredQuizzes.length}</p>
          </div>
          <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Avg Score</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {avgScore !== null ? `${avgScore}%` : "—"}
            </p>
          </div>
        </div>

        {/* Quiz History */}
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Quiz History</h2>

        {quizzes.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">No quizzes yet</p>
            <Link href="/" className="text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors">
              Generate your first quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {quizzes.map((q) => (
              <div
                key={q.id}
                className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <Link href={`/quiz/${q.shareId}`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    {q.topic}
                  </Link>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {new Date(q.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {q.score !== null && q.total !== null && (
                      <span className="ml-2 text-violet-600 dark:text-violet-400">
                        Score: {q.score}/{q.total} ({Math.round((q.score / q.total) * 100)}%)
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {q.shareId && (
                    <button
                      onClick={() => copyShareLink(q.shareId!)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                    >
                      {copied === q.shareId ? "Copied!" : "Share"}
                    </button>
                  )}
                  <Link
                    href={`/quiz/${q.shareId}`}
                    className="text-xs px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
