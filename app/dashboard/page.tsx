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

const BOOK = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const USERS = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CHART = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const GIFT = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8m4 10v-10m8 10v-10M9 2h6M9 2a3 3 0 00-3 3h0a3 3 0 013 3M15 2a3 3 0 013 3h0a3 3 0 01-3 3M3 8h18a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V9a1 1 0 011-1z" />
  </svg>
);

const GLOBE = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const SHIELD = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ARROW = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const primaryBtn =
  "inline-flex items-center gap-2 rounded-full bg-[#3B2027] px-5 py-2.5 text-sm font-medium text-[#F6E3E8] shadow-[0_10px_30px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] hover:shadow-[0_14px_36px_-12px_rgba(59,32,39,0.65)] active:scale-[0.98]";
const ghostBtn =
  "inline-flex items-center gap-2 rounded-full border border-[#F3D5DC] bg-white/70 px-5 py-2.5 text-sm font-medium text-[#7E3E55] transition-all hover:border-[#E9B8C4] hover:bg-[#F6EBEE] active:scale-[0.98]";

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
  const [daily, setDaily] = useState<{
    quiz: { id: string; topic: string; author: string } | null;
    completedToday: boolean;
    todayBest: number;
    reward: number;
  } | null>(null);
  const [achievements, setAchievements] = useState<
    { code: string; name: string; description: string; unlocked: boolean; unlockedAt: string | null }[]
  >([]);

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

      fetch("/api/daily-challenge")
        .then((r) => r.json())
        .then((d) => {
          if (!d.error) setDaily(d);
        })
        .catch(() => {});

      fetch("/api/achievements")
        .then((r) => r.json())
        .then((d) => { if (d.achievements) setAchievements(d.achievements); })
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

  const updateAdminUser = async (userId: string, plan: string) => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, plan }),
      });
      if (res.ok) {
        setAdminUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, plan } : u)));
      }
    } catch {
      // ignore
    }
    setLoadingUsers(false);
  };

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

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = session?.user?.name?.split(" ")[0];

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

      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <p className="mb-3 font-serif text-sm italic text-[#B0607A]">{greeting}, {firstName}</p>
          <h1 className="text-4xl font-medium tracking-tight text-[#3B2027] sm:text-5xl">
            Your learning, <span className="font-serif italic text-[#B0607A]">at a glance.</span>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#9A7280]">
            A quiet corner for your quizzes, scores, and streaks.
          </p>
        </div>

        <StreakWidget />

        {daily && (
          <Link
            href="/daily-challenge"
            className="group mb-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#E9B8C4] bg-gradient-to-r from-[#FDE8EC] via-[#FBF1EE] to-[#FDF4F6] p-6 shadow-[0_20px_60px_-30px_rgba(176,96,122,0.6)] transition-all hover:border-[#B0607A]/50 hover:shadow-[0_24px_70px_-30px_rgba(176,96,122,0.65)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B0607A] to-[#E9A8B8] text-white shadow-[0_10px_25px_-10px_rgba(176,96,122,0.8)]">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="mb-1 font-serif text-lg italic text-[#9A4F68]">Daily challenge</p>
                {daily.completedToday ? (
                  <>
                    <p className="text-sm font-medium text-[#3B2027]">Done for today — best {daily.todayBest}%</p>
                    <p className="text-xs text-[#9A7280]">Come back tomorrow for a new quiz.</p>
                  </>
                ) : daily.quiz ? (
                  <>
                    <p className="text-sm font-medium text-[#3B2027]">&ldquo;{daily.quiz.topic}&rdquo; awaits</p>
                    <p className="text-xs text-[#9A7280]">by {daily.quiz.author} · earn +{daily.reward} XP and streak credit</p>
                  </>
                ) : (
                  <p className="text-sm font-medium text-[#3B2027]">No community quizzes yet</p>
                )}
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#3B2027] px-5 py-2.5 text-sm font-medium text-[#F6E3E8] transition-all group-hover:bg-[#52303B]">
              {daily.completedToday ? "Review" : "Play now"} {ARROW}
            </span>
          </Link>
        )}

        <div className="mb-10 flex flex-wrap gap-3">
          {userRole === "student" && (
            <Link href="/study" className={primaryBtn}>
              {BOOK} Study Mode
            </Link>
          )}
          {userRole === "teacher" && (
            <Link href="/classroom/join" className={primaryBtn}>
              {USERS} Classroom
            </Link>
          )}
          <Link href="/analytics" className={ghostBtn}>
            {CHART} {userRole === "teacher" ? "Class Analytics" : "Analytics"}
          </Link>
          <Link href="/referral" className={ghostBtn}>
            {GIFT} Invite Friends
          </Link>
          <Link href="/explore" className={ghostBtn}>
            {GLOBE} Explore Quizzes
          </Link>
          {session?.user?.email === "denizcihatgunsel@gmail.com" && (
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="inline-flex items-center gap-2 rounded-full border border-[#B0607A]/25 bg-[#FDE8EC]/70 px-5 py-2.5 text-sm font-medium text-[#9A4F68] transition-all hover:bg-[#F6D5DD] active:scale-[0.98]"
            >
              {SHIELD} Admin Panel
            </button>
          )}
        </div>

        {showAdminPanel && session?.user?.email === "denizcihatgunsel@gmail.com" && (
          <div className="mb-12 rounded-2xl border border-[#F3D5DC] bg-white/70 p-6 shadow-[0_16px_50px_-24px_rgba(176,96,122,0.4)] backdrop-blur-xl">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-2xl italic text-[#3B2027]">Admin — user management</h2>
              <p className="text-sm text-[#9A7280]">Signed in as {session.user.email}</p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#F3D5DC] bg-white p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#9A7280]">Total Users</p>
                <p className="font-serif text-3xl text-[#3B2027]">{adminUsers.length}</p>
              </div>
              <div className="rounded-xl border border-[#F3D5DC] bg-white p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#9A7280]">Total Revenue</p>
                <p className="font-serif text-3xl text-[#3B2027]">
                  ${adminUsers.reduce((sum, u) => {
                    const priceMap = { free: 0, starter: 2, plus: 5, pro: 9, team: 15 };
                    const planPrice = priceMap[u.plan as keyof typeof priceMap] || 0;
                    return sum + planPrice;
                  }, 0)}
                </p>
              </div>
              <div className="rounded-xl border border-[#F3D5DC] bg-white p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#9A7280]">Teacher Accounts</p>
                <p className="font-serif text-3xl text-[#3B2027]">{adminUsers.filter((u) => u.role === "teacher").length}</p>
              </div>
            </div>

            {loadingUsers ? (
              <div className="rounded-xl border border-[#F3D5DC] bg-white py-12 text-center">
                <LoadingDots />
                <p className="mt-4 text-sm text-[#9A7280]">Loading user data...</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#F3D5DC] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#F3D5DC] bg-[#FBF4F6]">
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#9A7280]">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#9A7280]">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#9A7280]">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#9A7280]">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#9A7280]">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F6EBEE]">
                      {adminUsers.map((user) => (
                        <tr key={user.id} className="transition-colors hover:bg-[#FBF4F6]">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3B2027]">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9A7280]">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              user.role === "teacher"
                                ? "bg-[#E9F5EC] text-[#2F7D46]"
                                : user.role === "student"
                                ? "bg-[#FDE8EC] text-[#9A4F68]"
                                : "bg-[#F3EDEC] text-[#8A7A75]"
                            }`}>{user.role}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={user.plan}
                              onChange={(e) => updateAdminUser(user.id, e.target.value)}
                              className="rounded-lg border border-[#F3D5DC] bg-white px-2 py-1 text-sm font-medium text-[#3B2027] transition-colors focus-visible:border-[#B0607A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0607A]/40"
                            >
                              {["free", "starter", "plus", "pro", "team"].map((p) => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9A7280]">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {achievements.length > 0 && (
          <div className="mb-12 rounded-2xl border border-[#F3D5DC] bg-white/70 p-6 shadow-[0_16px_50px_-28px_rgba(176,96,122,0.4)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl italic text-[#3B2027]">Achievements</h2>
              <span className="text-xs text-[#9A7280]">
                {achievements.filter((a) => a.unlocked).length} of {achievements.length} unlocked
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {achievements.map((a) => (
                <div
                  key={a.code}
                  title={a.unlocked ? a.description : `Locked — ${a.description}`}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                    a.unlocked
                      ? "border-[#E9B8C4] bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE] shadow-[0_10px_30px_-18px_rgba(176,96,122,0.6)]"
                      : "border-[#F3D5DC] bg-white/50 opacity-60"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      a.unlocked
                        ? "bg-gradient-to-br from-[#B0607A] to-[#E9A8B8] text-white"
                        : "border border-[#F3D5DC] bg-[#F6EBEE] text-[#B4939F]"
                    }`}
                  >
                    {a.unlocked ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${a.unlocked ? "text-[#7E3E55]" : "text-[#9A7280]"}`}>{a.name}</p>
                    <p className="mt-0.5 text-[10px] leading-tight text-[#B4939F]">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-5 shadow-[0_16px_50px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#9A7280]">Total Quizzes</p>
            <p className="font-serif text-4xl text-[#3B2027]">{totalQuizzes}</p>
          </div>
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-5 shadow-[0_16px_50px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#9A7280]">Completed</p>
            <p className="font-serif text-4xl text-[#3B2027]">{scoredQuizzes.length}</p>
          </div>
          <div className="rounded-2xl border border-[#F3D5DC] bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE] p-5 shadow-[0_16px_50px_-28px_rgba(176,96,122,0.5)]">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#9A4F68]">Avg Score</p>
            <p className="font-serif text-4xl text-[#3B2027]">
              {avgScore !== null ? (
                <span className={avgScore >= 80 ? "text-[color:var(--success)]" : avgScore >= 60 ? "text-[#C98A98]" : "text-danger"}>
                  {avgScore}%
                </span>
              ) : "—"}
            </p>
          </div>
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-5 shadow-[0_16px_50px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#9A7280]">Best Score</p>
            <p className="font-serif text-4xl text-[#3B2027]">
              {bestScore !== null ? (
                <span className="text-[color:var(--success)]">{bestScore}%</span>
              ) : "—"}
            </p>
          </div>
        </div>

        {scoreTrend.length >= 2 && (
          <div className="mb-12 rounded-2xl border border-[#F3D5DC] bg-white/70 p-6 shadow-[0_16px_50px_-28px_rgba(176,96,122,0.4)] backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl italic text-[#3B2027]">Score trend</h2>
              <span className="text-xs text-[#9A7280]">Last {scoreTrend.length} quizzes</span>
            </div>
            <div className="flex h-28 items-end gap-2">
              {scoreTrend.map((score, i) => (
                <div key={i} className="group flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[10px] font-medium text-[#9A7280] opacity-0 transition-opacity group-hover:opacity-100">{score}%</span>
                  <div
                    className={`w-full rounded-full transition-all ${
                      score >= 80
                        ? "bg-gradient-to-t from-[#B0607A] to-[#E9A8B8]"
                        : score >= 60
                        ? "bg-gradient-to-t from-[#C98A98] to-[#F0C3CE]"
                        : "bg-gradient-to-t from-[#9A6A78] to-[#D9AAB6]"
                    }`}
                    style={{ height: `${Math.max(10, (score / 100) * 88)}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl italic text-[#3B2027]">Quiz history</h2>
          <div className="flex gap-1 rounded-full border border-[#F3D5DC] bg-white/70 p-1 backdrop-blur-xl">
            {(["all", "scored", "unscored"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-[#3B2027] text-[#F6E3E8] shadow-sm"
                    : "text-[#9A7280] hover:text-[#3B2027]"
                }`}
              >
                {f === "all" ? "All" : f === "scored" ? "Scored" : "Unscored"}
              </button>
            ))}
          </div>
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-20 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]">
              <svg className="h-7 w-7 text-[#B0607A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="mb-6 font-serif text-2xl italic text-[#3B2027]">
              {filter === "all" ? "Nothing here — yet." : `No ${filter} quizzes`}
            </p>
            {filter === "all" && (
              <Link href="/" className={primaryBtn}>
                Generate your first quiz {ARROW}
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
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#F3D5DC] bg-white/70 p-5 shadow-[0_12px_40px_-28px_rgba(176,96,122,0.45)] backdrop-blur-xl transition-all hover:border-[#E9B8C4] hover:shadow-[0_16px_48px_-24px_rgba(176,96,122,0.5)]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/quiz/${q.shareId}`}
                        className="truncate font-medium text-[#3B2027] transition-colors hover:text-[#B0607A]"
                      >
                        {q.topic}
                      </Link>
                      {scorePercent !== null && (
                        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                          scorePercent >= 80
                            ? "border-[color:var(--success)]/20 bg-[color:var(--success)]/10 text-[color:var(--success)]"
                            : scorePercent >= 60
                            ? "border-[#C98A98]/20 bg-[#C98A98]/10 text-[#9A4F68]"
                            : "border-danger/20 bg-danger-soft text-danger"
                        }`}>
                          {scorePercent}%
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#9A7280]">
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

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
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
                        className="rounded-full border border-[color:var(--success)]/20 bg-[color:var(--success)]/10 px-3.5 py-1.5 text-xs font-medium text-[color:var(--success)] transition-colors hover:opacity-80 disabled:opacity-60"
                      >
                        {startingLive === q.id ? "..." : "Go Live"}
                      </button>
                    )}
                    {q.shareId && (
                      <button
                        onClick={() => copyShareLink(q.shareId!)}
                        className="rounded-full border border-[#F3D5DC] px-3.5 py-1.5 text-xs text-[#9A7280] transition-colors hover:text-[#3B2027]"
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
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        q.isPublic
                          ? "border-[color:var(--success)]/20 bg-[color:var(--success)]/10 text-[color:var(--success)] hover:opacity-80"
                          : "border-[#F3D5DC] text-[#9A7280] hover:text-[#3B2027]"
                      }`}
                    >
                      {q.isPublic ? "Public" : "Publish"}
                    </button>
                    <Link
                      href={`/quiz/${q.shareId}`}
                      className="rounded-full bg-[#3B2027] px-4 py-1.5 text-xs font-medium text-[#F6E3E8] transition-all hover:bg-[#52303B]"
                    >
                      View
                    </Link>
                    {confirmDelete === q.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => deleteQuiz(q.id)}
                          disabled={deleting === q.id}
                          className="rounded-full border border-danger/20 bg-danger-soft px-3 py-1.5 text-xs font-medium text-danger transition-colors disabled:opacity-50"
                        >
                          {deleting === q.id ? "..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="rounded-full border border-[#F3D5DC] px-3 py-1.5 text-xs text-[#9A7280] transition-colors hover:text-[#3B2027]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(q.id)}
                        className="rounded-full border border-[#F3D5DC] px-3.5 py-1.5 text-xs text-[#9A7280] transition-colors hover:border-danger/20 hover:text-danger"
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
