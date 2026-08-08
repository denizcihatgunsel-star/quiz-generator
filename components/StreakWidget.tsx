"use client";

import { useState, useEffect } from "react";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  xpProgress: { current: number; needed: number };
  streakFreezes: number;
}

const FLAME = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2.5-0.5-4-2-6 3.5 0.5 7 3 7 8 0-1.5-0.5-3-2-4 3.5 1 4.5 4.5 4.5 6a8 8 0 01-2.843 6.657z" transform="rotate(15 12 12)" />
  </svg>
);

const STAR = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const BOLT = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const SNOWFLAKE = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3v18m0 0l-3-3m3 3l3-3M3 12h18m0 0l-3-3m3 3l-3 3M5.636 5.636l12.728 12.728m0 0l-3-1.414m3 1.414l-1.414-3M18.364 5.636L5.636 18.364m0 0l3-1.414m-3 1.414l1.414-3" />
  </svg>
);

export default function StreakWidget() {
  const [data, setData] = useState<StreakData | null>(null);

  useEffect(() => {
    fetch("/api/streak")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  const xpPercent = Math.min(100, (data.xpProgress.current / data.xpProgress.needed) * 100);

  const card =
    "rounded-2xl border border-[#F3D5DC] bg-white/70 p-5 shadow-[0_16px_50px_-28px_rgba(176,96,122,0.5)] backdrop-blur-xl";

  const iconWrap =
    "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE8EC] to-[#FBF1EE] text-[#B0607A]";

  const label =
    "text-[11px] uppercase tracking-[0.18em] text-[#9A7280]";

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className={card}>
        <div className="mb-3 flex items-center gap-2.5">
          <span className={iconWrap}>{FLAME}</span>
          <p className={label}>Streak</p>
        </div>
        <p className="font-serif text-4xl text-[#3B2027]">
          {data.currentStreak} <span className="font-sans text-sm text-[#9A7280]">days</span>
        </p>
        <p className="mt-1 text-xs text-[#9A7280]">Best: {data.longestStreak} days</p>
      </div>

      <div className={card}>
        <div className="mb-3 flex items-center gap-2.5">
          <span className={iconWrap}>{STAR}</span>
          <p className={label}>Level</p>
        </div>
        <p className="font-serif text-4xl text-[#3B2027]">{data.level}</p>
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F6E4EA]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#B0607A] to-[#E9A8B8] transition-all"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-[#9A7280]">{data.xpProgress.current}/{data.xpProgress.needed} XP</p>
        </div>
      </div>

      <div className={card}>
        <div className="mb-3 flex items-center gap-2.5">
          <span className={iconWrap}>{BOLT}</span>
          <p className={label}>Total XP</p>
        </div>
        <p className="font-serif text-4xl text-[#B0607A]">{data.totalXp.toLocaleString()}</p>
      </div>

      <div className={card}>
        <div className="mb-3 flex items-center gap-2.5">
          <span className={iconWrap}>{SNOWFLAKE}</span>
          <p className={label}>Freezes</p>
        </div>
        <p className="font-serif text-4xl text-[#3B2027]">{data.streakFreezes}</p>
        <p className="mt-1 text-xs text-[#9A7280]">Protect your streak</p>
      </div>
    </div>
  );
}
