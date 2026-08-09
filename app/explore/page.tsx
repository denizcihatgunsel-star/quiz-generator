"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

interface PublicQuiz {
  id: string;
  topic: string;
  shareId: string;
  author: string;
  questionCount: number;
  createdAt: string;
}

const SEARCH = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ARROW = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7m0 0H8m9 0v9" />
  </svg>
);

export default function ExplorePage() {
  const [quizzes, setQuizzes] = useState<PublicQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("q", search);

    fetch(`/api/explore?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setQuizzes(data.quizzes || []);
        setTotalPages(data.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [page, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <p className="mb-3 font-serif text-sm italic text-[#B0607A]">Community library</p>
          <h1 className="text-4xl font-medium tracking-tight text-[#3B2027] sm:text-5xl">
            Explore <span className="font-serif italic text-[#B0607A]">quizzes</span>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#9A7280]">
            Browse quizzes shared by the Examina community.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B4939F]">
            {SEARCH}
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by topic..."
            className="w-full rounded-full border border-[#F3D5DC] bg-white/70 py-3 pl-11 pr-4 text-sm text-[#3B2027] shadow-[0_12px_40px_-24px_rgba(176,96,122,0.5)] backdrop-blur-xl transition-all placeholder:text-[#B4939F] focus:border-[#E9B8C4] focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-[#B0607A]"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-20 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE]">
              <svg className="h-7 w-7 text-[#B0607A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="mb-2 font-serif text-2xl italic text-[#3B2027]">No quizzes found</p>
            <p className="text-sm text-[#9A7280]">Be the first to publish a quiz from your dashboard!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((q) => (
                <Link
                  key={q.id}
                  href={`/quiz/${q.shareId}`}
                  className="group flex flex-col rounded-2xl border border-[#F3D5DC] bg-white/70 p-6 shadow-[0_16px_50px_-28px_rgba(176,96,122,0.45)] backdrop-blur-xl transition-all hover:border-[#E9B8C4] hover:shadow-[0_24px_60px_-24px_rgba(176,96,122,0.55)]"
                >
                  <h3 className="mb-4 line-clamp-2 font-medium text-[#3B2027] transition-colors group-hover:text-[#B0607A]">
                    {q.topic}
                  </h3>
                  <div className="mt-auto">
                    <div className="mb-3 flex items-center justify-between border-b border-[#F6EBEE] pb-3">
                      <p className="text-xs text-[#9A7280]">{q.questionCount} questions</p>
                      <p className="max-w-[45%] truncate text-xs text-[#9A7280]">by {q.author}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-[#B4939F]">
                        {new Date(q.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDE8EC] text-[#B0607A] transition-all group-hover:bg-[#B0607A] group-hover:text-white">
                        {ARROW}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-full border border-[#F3D5DC] bg-white/70 px-4 py-2 text-sm text-[#9A7280] transition-all hover:text-[#3B2027] disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="px-3 text-sm text-[#9A7280]">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-full border border-[#F3D5DC] bg-white/70 px-4 py-2 text-sm text-[#9A7280] transition-all hover:text-[#3B2027] disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
