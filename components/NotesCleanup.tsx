"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CleanupResult {
  original: string;
  cleaned: string;
  contentCheck: {
    passed: boolean;
    suspiciousSentences: string[];
    suspiciousWords: string[];
  };
  gaps: string[];
}

interface NotesCleanupProps {
  notes: string;
  onAccept: (cleanedNotes: string) => void;
  onCancel: () => void;
}

export default function NotesCleanup({ notes, onAccept, onCancel }: NotesCleanupProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CleanupResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"side-by-side" | "original" | "cleaned">("side-by-side");
  const [editedCleaned, setEditedCleaned] = useState<string>("");

  const handleCleanup = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/cleanup-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Cleanup failed");
      }

      setResult(data);
      setEditedCleaned(data.cleaned); // Initialize editable version
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptCleaned = () => {
    // Use the edited version (user can edit the cleaned pane)
    onAccept(editedCleaned);
  };

  const handleKeepOriginal = () => {
    onAccept(notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl border border-[#F3D5DC] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F3D5DC] flex items-center justify-between bg-gradient-to-r from-[#FDE8EC] to-white">
          <div>
            <h2 className="text-xl font-medium text-[#3B2027]">Clean up notes</h2>
            <p className="text-xs text-[#9A7280] mt-0.5">
              Fix grammar, add structure, merge fragments
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-[#9A7280] hover:text-[#3B2027] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!result && !loading && (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-[#E9A8B8] to-[#B0607A] flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <p className="text-sm text-[#4A3038] mb-2">
                Ready to clean up your notes
              </p>
              <p className="text-xs text-[#9A7280] max-w-md mx-auto">
                This will fix grammar, add structure with headings and bullets, and merge fragments.
                It won't add new facts or fill in gaps.
              </p>
              <button
                onClick={handleCleanup}
                className="mt-6 px-6 py-2.5 bg-[#3B2027] text-[#F6E3E8] text-sm font-medium rounded-full hover:bg-[#52303B] transition-colors"
              >
                Clean up notes
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-[#B0607A] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className="text-sm text-[#9A7280]">Cleaning up your notes...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={handleCleanup}
                className="mt-4 text-sm text-[#B0607A] hover:text-[#3B2027] transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {result && (
            <div>
              {/* View toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setView("side-by-side")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    view === "side-by-side"
                      ? "bg-[#3B2027] text-[#F6E3E8]"
                      : "bg-white border border-[#F3D5DC] text-[#9A7280] hover:text-[#3B2027]"
                  }`}
                >
                  Side by side
                </button>
                <button
                  onClick={() => setView("original")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    view === "original"
                      ? "bg-[#3B2027] text-[#F6E3E8]"
                      : "bg-white border border-[#F3D5DC] text-[#9A7280] hover:text-[#3B2027]"
                  }`}
                >
                  Original only
                </button>
                <button
                  onClick={() => setView("cleaned")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    view === "cleaned"
                      ? "bg-[#3B2027] text-[#F6E3E8]"
                      : "bg-white border border-[#F3D5DC] text-[#9A7280] hover:text-[#3B2027]"
                  }`}
                >
                  Cleaned only
                </button>
              </div>

              {/* Content check warning */}
              {!result.contentCheck.passed && (
                <div className="mb-4 p-4 rounded-xl border border-[#F3D5DC] bg-[#FDE8EC]/50">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#9A4F68] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#7E3E55]">Possible new content detected</p>
                      <p className="text-xs text-[#9A7280] mt-1">
                        Some sentences may contain words not in your original notes. Review carefully before accepting.
                      </p>
                      {result.contentCheck.suspiciousWords.length > 0 && (
                        <p className="text-xs text-[#B0607A] mt-2">
                          New words: {result.contentCheck.suspiciousWords.slice(0, 10).join(", ")}
                          {result.contentCheck.suspiciousWords.length > 10 && "..."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Gaps detected */}
              {result.gaps.length > 0 && (
                <div className="mb-4 p-4 rounded-xl border border-[#E9B8C4] bg-[#FBF1EE]">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#B0607A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#7E3E55]">Possible gaps</p>
                      <ul className="text-xs text-[#9A7280] mt-2 space-y-1">
                        {result.gaps.map((gap, i) => (
                          <li key={i}>• {gap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Comparison view */}
              <div className={`grid gap-4 ${view === "side-by-side" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {(view === "side-by-side" || view === "original") && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9A7280] mb-2">Original</p>
                    <div className="rounded-xl border border-[#F3D5DC] bg-[#FBF4F6] p-4 text-sm text-[#4A3038] whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                      {result.original}
                    </div>
                  </div>
                )}
                {(view === "side-by-side" || view === "cleaned") && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9A7280] mb-2">
                      Cleaned {view === "cleaned" && "(editable)"}
                    </p>
                    <textarea
                      value={editedCleaned}
                      onChange={(e) => setEditedCleaned(e.target.value)}
                      className="w-full rounded-xl border border-[#E9B8C4] bg-white p-4 text-sm text-[#4A3038] leading-relaxed min-h-[384px] resize-y focus:outline-none focus:ring-2 focus:ring-[#B0607A]/30 focus:border-[#B0607A]"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {result && (
          <div className="px-6 py-4 border-t border-[#F3D5DC] bg-[#FBF4F6] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={handleKeepOriginal}
              className="px-4 py-2 text-sm text-[#9A7280] hover:text-[#3B2027] transition-colors"
            >
              Keep original
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm text-[#9A7280] hover:text-[#3B2027] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAcceptCleaned}
                className="px-5 py-2 bg-[#3B2027] text-[#F6E3E8] text-sm font-medium rounded-full hover:bg-[#52303B] transition-colors"
              >
                Use cleaned version
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
