"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StreakWidget from "@/components/StreakWidget";
import SiteHeader from "@/components/SiteHeader";
import { LoadingDots } from "@/components/ui";

interface SavedQuizItem {
  id: string;
  topic: string;
  score: number | null;
  total: number | null;
  shareId: string | null;
  isPublic?: boolean;
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
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

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

  useEffect(() => {
    if (session && showAdminPanel) {
      setLoadingUsers(true);
      fetch("/api/admin/users")
        .then((r) => r.json())
        .then((d) => setAdminUsers(d.users ?? []))
        .finally(() => setLoadingUsers(false));
    }
  }, [session, showAdminPanel]);

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

  const bestScore =
    scoredQuizzes.length > 0
      ? Math.round(
          Math.max(...scoredQuizzes.map((q) => (q.score! / q.total!) * 100))
        )
      : null;

  const filteredQuizzes = quizzes.filter((q) => {
    if (filter === "scored") return q.score !== null && q.total !== null;
    if (filter === "unscored") return q.score === null || q.total === null;
    return true;
  });

  const scoreTrend = scoredQuizzes
    .slice(0, 10)
    .reverse()
    .map((q) => Math.round((q.score! / q.total!) * 100));

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your quiz history and performance overview.</p>
        </div>

        <StreakWidget />

        <div className="mb-8 mt-8 flex flex-wrap gap-3">
          {userRole === "student" && (
            <Link
              href="/study"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <span>📚</span> Study Mode
            </Link>
          )}
          {userRole === "teacher" && (
            <Link
              href="/classroom/join"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <span>🏫</span> Classroom
            </Link>
          )}
          <Link
            href="/analytics"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span>📊</span> {userRole === "teacher" ? "Class Analytics" : "Analytics"}
          </Link>
          <Link
            href="/referral"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span>🎁</span> Invite Friends
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span>🌐</span> Explore Quizzes
          </Link>
          {session?.user?.email === "denizcihatgunsel@gmail.com" && (
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="inline-flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-500/20"
            >
              <span>👥</span> Admin Panel
            </button>
          )}
        </div>

        {showAdminPanel && session?.user?.email === "denizcihatgunsel@gmail.com" && (
          <div className="mb-10 rounded-xl border border-purple-500/20 bg-purple-500/10 p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-purple-800">Admin Panel - User Management</h2>
              <p className="text-sm text-purple-600">Email: {session.user.email}</p>
            </div>
            
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Total Users</p>
                <p className="text-2xl font-semibold text-foreground">{adminUsers.length}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold text-foreground">
                  ${adminUsers.reduce((sum, u) => {
                    const priceMap = { free: 0, starter: 2, plus: 5, pro: 9, team: 15 };
                    const planPrice = priceMap[u.plan as keyof typeof priceMap] || 0;
                    return sum + planPrice;
                  }, 0)}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Teacher Accounts</p>
                <p className="text-2xl font-semibold text-foreground">{adminUsers.filter((u) => u.role === "teacher").length}</p>
              </div>
            </div>
            
            {loadingUsers ? (
              <div className="rounded-xl border border-border bg-card py-12 text-center shadow-sm">
                <LoadingDots />
                <p className="mt-4 text-muted-foreground">Loading user data...</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {adminUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              user.role === "teacher"
                                ? "bg-green-100 text-green-800"
                                : user.role === "student"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{user.plan}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Total Quizzes</p>
            <p className="text-3xl font-semibold text-foreground">{totalQuizzes}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Completed</p>
            <p className="text-3xl font-semibold text-foreground">{scoredQuizzes.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Avg Score</p>
            <p className="text-3xl font-semibold text-foreground">
              {avgScore !== null ? (
                <span className={avgScore >= 80 ? "text-[color:var(--success)]" : avgScore >= 60 ? "text-[color:var(--warning)]" : "text-danger"}>
                  {avgScore}%
                </span>
              ) : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Best Score</p>
            <p className="text-3xl font-semibold text-foreground">
              {bestScore !== null ? (
                <span className="text-[color:var(--success)]">{bestScore}%</span>
              ) : "—"}
            </p>
          </div>
        </div>

        {scoreTrend.length >= 2 && (
          <div className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Score Trend</h2>
              <span className="text-xs text-muted-foreground">Last {scoreTrend.length} quizzes</span>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {scoreTrend.map((score, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">{score}%</span>
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      score >= 80 ? "bg-[color:var(--success)]/80" : score >= 60 ? "bg-[color:var(--warning)]/80" : "bg-danger/80"
                    }`}
                    style={{ height: `${Math.max(8, (score / 100) * 80)}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Quiz History</h2>
          <div className="flex gap-1 rounded-lg border border-border bg-muted p-1">
            {(["all", "scored", "unscored"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f === "scored" ? "Scored" : "Unscored"}
              </button>
            ))}
          </div>
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="rounded-xl border border-border bg-card py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="mb-4 text-muted-foreground">
              {filter === "all" ? "No quizzes yet" : `No ${filter} quizzes`}
            </p>
            {filter === "all" && (
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Generate your first quiz
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <Link
                        href={`/quiz/${q.shareId}`}
                        className="truncate text-sm font-medium text-foreground transition-colors hover:text-accent"
                      >
                        {q.topic}
                      </Link>
                      {scorePercent !== null && (
                        <span className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-semibold ${
                          scorePercent >= 80
                            ? "border-[color:var(--success)]/20 bg-[color:var(--success)]/10 text-[color:var(--success)]"
                            : scorePercent >= 60
                            ? "border-[color:var(--warning)]/20 bg-[color:var(--warning)]/10 text-[color:var(--warning)]"
                            : "border-danger/20 bg-danger-soft text-danger"
                        }`}>
                          {scorePercent}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
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

                  <div className="flex shrink-0 items-center gap-2">
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
                        className="rounded-lg border border-[color:var(--success)]/20 bg-[color:var(--success)]/10 px-3 py-1.5 text-xs font-medium text-[color:var(--success)] transition-colors hover:opacity-80 disabled:opacity-60"
                      >
                        {startingLive === q.id ? "..." : "Go Live"}
                      </button>
                    )}
                    {q.shareId && (
                      <button
                        onClick={() => copyShareLink(q.shareId!)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {copied === q.shareId ? "Copied!" : "Share"}
                      </button>
                    )}
                    <button
                      onClick={async () => {
                        const newPublic = !q.isPublic;
                        const res = await fetch("/api/explore", {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ quizId: q.id, isPublic: newPublic }),
                        });
                        if (res.ok) {
                          setQuizzes((prev) =>
                            prev.map((quiz) => quiz.id === q.id ? { ...quiz, isPublic: newPublic } : quiz)
                          );
                        }
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        q.isPublic
                          ? "border-[color:var(--success)]/20 bg-[color:var(--success)]/10 text-[color:var(--success)] hover:opacity-80"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {q.isPublic ? "Public" : "Publish"}
                    </button>
                    <Link
                      href={`/quiz/${q.shareId}`}
                      className="rounded-lg border border-accent/20 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:opacity-80"
                    >
                      View
                    </Link>
                    {confirmDelete === q.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => deleteQuiz(q.id)}
                          disabled={deleting === q.id}
                          className="rounded-lg border border-danger/20 bg-danger-soft px-2.5 py-1.5 text-xs font-medium text-danger transition-colors disabled:opacity-50"
                        >
                          {deleting === q.id ? "..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(q.id)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-danger/20 hover:text-danger"
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
