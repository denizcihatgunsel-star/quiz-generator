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
    <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {/* Streak */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Streak</p>
        </div>
        <p className="text-3xl font-semibold text-foreground">
          {data.currentStreak} <span className="text-sm font-normal text-muted-foreground">days</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Best: {data.longestStreak} days</p>
      </div>

      {/* Level */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Level</p>
        </div>
        <p className="text-3xl font-semibold text-foreground">{data.level}</p>
        <div className="mt-2">
          <div className="h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{data.xpProgress.current}/{data.xpProgress.needed} XP</p>
        </div>
      </div>

      {/* Total XP */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Total XP</p>
        </div>
        <p className="text-3xl font-semibold text-accent">{data.totalXp.toLocaleString()}</p>
      </div>

      {/* Streak Freezes */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">❄️</span>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Freezes</p>
        </div>
        <p className="text-3xl font-semibold text-foreground">{data.streakFreezes}</p>
        <p className="mt-1 text-xs text-muted-foreground">Protect your streak</p>
      </div>
    </div>
  );
}
