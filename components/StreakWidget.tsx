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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {/* Streak */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">&#128293;</span>
          <p className="text-xs text-neutral-400 uppercase tracking-widest">Streak</p>
        </div>
        <p className="text-3xl font-bold text-neutral-900">
          {data.currentStreak} <span className="text-sm font-normal text-neutral-400">days</span>
        </p>
        <p className="text-xs text-neutral-400 mt-1">Best: {data.longestStreak} days</p>
      </div>

      {/* Level */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">&#11088;</span>
          <p className="text-xs text-neutral-400 uppercase tracking-widest">Level</p>
        </div>
        <p className="text-3xl font-bold text-neutral-900">{data.level}</p>
        <div className="mt-2">
          <div className="w-full h-1.5 bg-neutral-100 rounded-full">
            <div
              className="h-full bg-violet-500 rounded-full transition-all"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <p className="text-xs text-neutral-400 mt-1">{data.xpProgress.current}/{data.xpProgress.needed} XP</p>
        </div>
      </div>

      {/* Total XP */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">&#9889;</span>
          <p className="text-xs text-neutral-400 uppercase tracking-widest">Total XP</p>
        </div>
        <p className="text-3xl font-bold text-violet-600">{data.totalXp.toLocaleString()}</p>
      </div>

      {/* Streak Freezes */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">&#10052;&#65039;</span>
          <p className="text-xs text-neutral-400 uppercase tracking-widest">Freezes</p>
        </div>
        <p className="text-3xl font-bold text-neutral-900">{data.streakFreezes}</p>
        <p className="text-xs text-neutral-400 mt-1">Protect your streak</p>
      </div>
    </div>
  );
}
