import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getXpForNextLevel } from "@/lib/xp";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const streak = await db.userStreak.findUnique({
    where: { userId: session.user.id },
  });

  if (!streak) {
    return NextResponse.json({
      currentStreak: 0,
      longestStreak: 0,
      totalXp: 0,
      level: 1,
      xpProgress: { current: 0, needed: 100 },
      streakFreezes: 1,
    });
  }

  return NextResponse.json({
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    totalXp: streak.totalXp,
    level: streak.level,
    xpProgress: getXpForNextLevel(streak.totalXp),
    streakFreezes: streak.streakFreezes,
    lastActiveDate: streak.lastActiveDate,
  });
}
