"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PublicQuiz {
  id: string;
  topic: string;
  shareId: string;
  author: string;
  questionCount: number;
  createdAt: string;
}

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
    <div className="min-h-screen bg-[#f5f5f0]">
      <header className="border-b border-neutral-200 bg-[#f5f5f0]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Examina" className="w-8 h-8 rounded-xl object-cover" />
            <span className="font-semibold text-neutral-900 text-lg">Examina</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Dashboard</Link>
            <Link href="/" className="text-sm text-violet-600 hover:text-violet-500 transition-colors">Create Quiz</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Explore Quizzes</h1>
          <p className="text-neutral-500 mt-1">Browse quizzes shared by the Examina community</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by topic..."
            className="w-full max-w-md px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition shadow-sm"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <p className="text-neutral-500 mb-2">No quizzes found</p>
            <p className="text-sm text-neutral-400">Be the first to publish a quiz from your dashboard!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((q) => (
                <Link
                  key={q.id}
                  href={`/quiz/${q.shareId}`}
                  className="group p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all"
                >
                  <h3 className="text-sm font-medium text-neutral-900 group-hover:text-violet-600 transition-colors mb-2 line-clamp-2">
                    {q.topic}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-400">
                      {q.questionCount} questions
                    </p>
                    <p className="text-xs text-neutral-400">
                      by {q.author}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-300 mt-2">
                    {new Date(q.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-neutral-400">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 transition-colors"
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
