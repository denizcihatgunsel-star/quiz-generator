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
  isPublic?: boolean;
  createdAt: string;
}

interface Achievement {
  code: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

export default function MobileDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<SavedQuizItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userRole, setUserRole] = useState<"student" | "teacher">("student");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/m/auth/login");
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

      fetch("/api/achievements")
        .then((r) => r.json())
        .then((d) => { if (d.achievements) setAchievements(d.achievements); })
        .catch(() => {});
    }
  }, [session]);

  const copyShareLink = (shareId: string) => {
    const url = `${window.location.origin}/quiz/${shareId}`;
    navigator.clipboard.writeText(url);
    setCopied(shareId);
    setTimeout(() => setCopied(null), 2000);
  };

  const togglePublic = async (q: SavedQuizItem) => {
    const newPublic = !q.isPublic;
    const res = await fetch("/api/explore", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId: q.id, isPublic: newPublic }),
    });
    if (res.ok) {
      setQuizzes((prev) => prev.map((quiz) => quiz.id === q.id ? { ...quiz, isPublic: newPublic } : quiz));
    }
  };

  const deleteQuiz = async (id: string) => {
    const res = await fetch(`/api/quiz/${id}`, { method: "DELETE" });
    if (res.ok) {
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const scored = quizzes.filter((q) => q.score !== null && q.total !== null);
  const avg = scored.length
    ? Math.round(scored.reduce((s, q) => s + (q.score! / q.total!) * 100, 0) / scored.length)
    : null;
  const best = scored.length
    ? Math.round(Math.max(...scored.map((q) => (q.score! / q.total!) * 100)))
    : null;

  if (status === "loading" || loading) {
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

  return (
    <div>
      <p className="font-serif text-sm italic text-[#B0607A]">{session?.user?.name?.split(" ")[0]}</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Your learning, <span className="font-serif italic text-[#B0607A]">at a glance.</span>
      </h1>

      <div className="mt-6">
        <StreakWidget />
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Link
          href={userRole === "teacher" ? "/m/classroom/join" : "/m/study"}
          className="flex-1 rounded-full bg-[#3B2027] py-3 text-center text-sm font-medium text-[#F6E3E8] shadow-[0_12px_28px_-12px_rgba(59,32,39,0.6)] transition-all hover:bg-[#52303B] active:scale-[0.98]"
        >
          {userRole === "teacher" ? "Classroom" : "Study mode"}
        </Link>
        <Link
          href="/m/analytics"
          className="flex-1 rounded-full border border-[#F3D5DC] bg-white/70 py-3 text-center text-sm font-medium text-[#7E3E55] transition-colors hover:bg-[#F6EBEE] active:scale-[0.98]"
        >
          Analytics
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-serif text-xl italic text-[#3B2027]">Stats</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Quizzes", String(quizzes.length)],
            ["Avg", avg !== null ? `${avg}%` : "—"],
            ["Best", best !== null ? `${best}%` : "—"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-4 text-center shadow-[0_14px_40px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A7280]">{label}</p>
              <p className="mt-1 font-serif text-3xl text-[#3B2027]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {achievements.filter((a) => a.unlocked).length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 font-serif text-xl italic text-[#3B2027]">Achievements</h2>
          <div className="flex gap-2.5 overflow-x-auto pb-2">
            {achievements.map((a) => (
              <div
                key={a.code}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 ${
                  a.unlocked
                    ? "border-[#E9B8C4] bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]"
                    : "border-[#F3D5DC] bg-white/50 opacity-60"
                }`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${
                  a.unlocked ? "bg-gradient-to-br from-[#B0607A] to-[#E9A8B8] text-white" : "bg-[#F6EBEE] text-[#B4939F]"
                }`}>
                  {a.unlocked ? "✓" : "•"}
                </span>
                <span className={`text-xs font-medium ${a.unlocked ? "text-[#7E3E55]" : "text-[#9A7280]"}`}>{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 font-serif text-xl italic text-[#3B2027]">Quiz history</h2>

        {quizzes.length === 0 ? (
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-14 text-center backdrop-blur-xl">
            <p className="mb-5 font-serif text-xl italic text-[#3B2027]">Nothing here — yet.</p>
            <Link href="/m/create" className="inline-block rounded-full bg-[#3B2027] px-6 py-3 text-sm font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]">
              Generate your first quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {quizzes.map((q) => {
              const pct = q.score !== null && q.total !== null ? Math.round((q.score / q.total) * 100) : null;
              return (
                <div key={q.id} className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-4 shadow-[0_12px_36px_-26px_rgba(176,96,122,0.5)] backdrop-blur-xl">
                  <Link href={`/quiz/${q.shareId}`} className="block">
                    <div className="flex items-start justify-between gap-3">
                      <p className="truncate font-medium text-[#3B2027]">{q.topic}</p>
                      {pct !== null && (
                        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                          pct >= 80
                            ? "border-[#2F7D46]/20 bg-[#E9F5EC] text-[#2F7D46]"
                            : pct >= 60
                            ? "border-[#C98A98]/20 bg-[#C98A98]/10 text-[#9A4F68]"
                            : "border-[#C25B5B]/20 bg-[#FDF1F1] text-[#C25B5B]"
                        }`}>{pct}%</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[#9A7280]">
                      {new Date(q.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      {q.score !== null && q.total !== null && ` · ${q.score}/${q.total} correct`}
                    </p>
                  </Link>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {q.shareId && (
                      <button
                        onClick={() => copyShareLink(q.shareId!)}
                        className="rounded-full border border-[#F3D5DC] px-3.5 py-1.5 text-xs text-[#9A7280] transition-colors hover:text-[#3B2027]"
                      >
                        {copied === q.shareId ? "Copied!" : "Share"}
                      </button>
                    )}
                    <button
                      onClick={() => togglePublic(q)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        q.isPublic
                          ? "border-[#2F7D46]/20 bg-[#E9F5EC] text-[#2F7D46]"
                          : "border-[#F3D5DC] text-[#9A7280] hover:text-[#3B2027]"
                      }`}
                    >
                      {q.isPublic ? "Public" : "Publish"}
                    </button>
                    <Link
                      href={`/quiz/${q.shareId}`}
                      className="rounded-full bg-[#3B2027] px-4 py-1.5 text-xs font-medium text-[#F6E3E8] transition-colors hover:bg-[#52303B]"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => { if (confirm("Delete this quiz?")) deleteQuiz(q.id); }}
                      className="rounded-full border border-[#F3D5DC] px-3.5 py-1.5 text-xs text-[#9A7280] transition-colors hover:border-[#C25B5B]/20 hover:text-[#C25B5B]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
