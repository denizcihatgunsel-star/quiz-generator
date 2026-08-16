"use client";

import { useState } from "react";

const FALLBACK_URL = (topic: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${topic} explained`)}`;

export default function VideoExplanationLink({
  topic,
  className = "",
}: {
  topic: string;
  className?: string;
}) {
  const [finding, setFinding] = useState(false);

  const handleClick = async () => {
    if (finding) return;
    setFinding(true);
    try {
      const res = await fetch("/api/video-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = res.ok ? await res.json() : null;
      const url = data?.fallback ? data.searchUrl : data?.url;
      window.open(url ?? FALLBACK_URL(topic), "_blank", "noopener,noreferrer");
    } catch {
      window.open(FALLBACK_URL(topic), "_blank", "noopener,noreferrer");
    } finally {
      setFinding(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={finding}
      className={`group inline-flex items-center gap-2 rounded-full border border-[#F3D5DC] bg-white/70 px-4 py-2 text-sm text-[#8C5A68] shadow-sm backdrop-blur transition-all duration-200 hover:border-[#B0607A] hover:text-[#3B2027] hover:shadow-[0_8px_24px_-12px_rgba(176,96,122,0.5)] disabled:cursor-wait disabled:opacity-80 ${className}`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B0607A] text-[#F6E3E8] transition-transform duration-200 ${
          finding ? "animate-spin" : "group-hover:scale-110"
        }`}
      >
        {finding ? (
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path d="M12 3a9 9 0 1 1-9 9" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v13.72L19 12 8 5.14z" />
          </svg>
        )}
      </span>
      {finding ? "Finding the best video…" : "Video explanation"}
    </button>
  );
}