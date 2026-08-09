import { db } from "@/lib/db";

export interface AchievementDef {
  code: string;
  name: string;
  description: string;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { code: "first_quiz", name: "First Steps", description: "Generate your first quiz" },
  { code: "perfect_score", name: "Perfect Score", description: "Score 100% on a quiz" },
  { code: "streak_7", name: "Week Warrior", description: "Reach a 7-day streak" },
  { code: "streak_30", name: "Monthly Legend", description: "Reach a 30-day streak" },
  { code: "first_publish", name: "Community Hero", description: "Publish a quiz to the community" },
  { code: "daily_1", name: "Daily Grinder", description: "Complete your first daily challenge" },
];

export async function unlockAchievement(userId: string, code: string): Promise<boolean> {
  try {
    await db.userAchievement.create({
      data: { userId, code },
    });
    return true;
  } catch {
    return false; // already unlocked
  }
}

export async function getUnlockedAchievements(userId: string): Promise<string[]> {
  const rows = await db.userAchievement.findMany({
    where: { userId },
    select: { code: true },
  });
  return rows.map((r) => r.code);
}
