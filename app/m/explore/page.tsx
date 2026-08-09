"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface PublicQuiz {
  id: string;
  topic: string;
  shareId: string;
  author: string;
  questionCount: number;
  createdAt: string;
}

export default function MobileExplore() {
  const [quizzes, setQuizzes] = useState<PublicQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("q", search);

    fetch(`/api/explore?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (requestId !== requestIdRef.current) return;
        setQuizzes(data.quizzes || []);
        setTotalPages(data.totalPages || 1);
      })
      .finally(() => {
        if (requestId === requestIdRef.current) setLoading(false);
      });
  }, [page, search]);

  return (
    <div>
      <p className="font-serif text-sm italic text-[#B0607A]">Community library</p>
      <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#3B2027]">
        Explore <span className="font-serif italic text-[#B0607A]">quizzes</span>
      </h1>

      <div className="relative mt-6">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B4939F]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search topics…"
          className="w-full rounded-full border border-[#F3D5DC] bg-white/80 py-3.5 pl-11 pr-5 text-sm text-[#3B2027] placeholder:text-[#B4939F] shadow-[0_10px_30px_-24px_rgba(176,96,122,0.6)] backdrop-blur-xl transition-all focus:border-[#B0607A] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30"
        />
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-2 w-2 animate-bounce rounded-full bg-[#B0607A]" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-14 text-center backdrop-blur-xl">
            <p className="font-serif text-xl italic text-[#3B2027]">No quizzes found</p>
            <p className="mt-2 text-xs text-[#9A7280]">Try a different search term.</p>
          </div>
        ) : (
          quizzes.map((q) => (
            <Link
              key={q.id}
              href={`/quiz/${q.shareId}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-[#F3D5DC] bg-white/75 p-4 shadow-[0_12px_36px_-26px_rgba(176,96,122,0.5)] backdrop-blur-xl transition-all hover:border-[#E9B8C4] active:scale-[0.99]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-[#3B2027]">{q.topic}</p>
                <p className="mt-1 text-xs text-[#9A7280]">
                  by {q.author} · {q.questionCount} questions
                </p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FDE8EC] text-[#B0607A]">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-full border border-[#F3D5DC] bg-white/70 px-5 py-2.5 text-sm font-medium text-[#7E3E55] transition-colors disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs text-[#9A7280]">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-full border border-[#F3D5DC] bg-white/70 px-5 py-2.5 text-sm font-medium text-[#7E3E55] transition-colors disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
