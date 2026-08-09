import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ACHIEVEMENTS } from "@/lib/achievements";

// GET: unlocked achievements for the signed-in user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const unlocked = await db.userAchievement.findMany({
    where: { userId: session.user.id },
    select: { code: true, unlockedAt: true },
  });

  const unlockedMap = new Map(unlocked.map((u) => [u.code, u.unlockedAt]));

  return NextResponse.json({
    achievements: ACHIEVEMENTS.map((a) => ({
      ...a,
      unlocked: unlockedMap.has(a.code),
      unlockedAt: unlockedMap.get(a.code) ?? null,
    })),
  });
}
