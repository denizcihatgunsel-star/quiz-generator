import { db } from "@/lib/db";
import { unlockAchievement } from "@/lib/achievements";

// XP rewards for actions
export const XP_REWARDS = {
  quiz_generated: 25,
  quiz_scored: 50,
  quiz_perfect: 100,
  flashcard_reviewed: 5,
  daily_challenge: 25,
  streak_bonus_7: 50,
  streak_bonus_30: 200,
} as const;

// Level thresholds
export function getLevelForXp(xp: number): number {
  // Each level requires progressively more XP
  // Level 1: 0, Level 2: 100, Level 3: 250, Level 4: 450, etc.
  let level = 1;
  let threshold = 100;
  let remaining = xp;
  while (remaining >= threshold) {
    remaining -= threshold;
    level++;
    threshold = Math.floor(threshold * 1.5);
  }
  return level;
}

export function getXpForNextLevel(xp: number): { current: number; needed: number } {
  let threshold = 100;
  let remaining = xp;
  while (remaining >= threshold) {
    remaining -= threshold;
    threshold = Math.floor(threshold * 1.5);
  }
  return { current: remaining, needed: threshold };
}

export async function awardXp(userId: string, action: string, xp: number) {
  const today = new Date().toISOString().slice(0, 10);

  // Log the XP event
  await db.xpEvent.create({
    data: { userId, action, xp },
  });

  // Upsert streak record
  const existing = await db.userStreak.findUnique({ where: { userId } });

  if (!existing) {
    const totalXp = xp;
    await db.userStreak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
        totalXp,
        level: getLevelForXp(totalXp),
      },
    });
    return;
  }

  const lastDate = existing.lastActiveDate;
  let newStreak = existing.currentStreak;

  if (lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (lastDate === yesterdayStr) {
      newStreak += 1;
    } else if (existing.streakFreezes > 0 && lastDate) {
      // Use streak freeze if missed only one day
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      if (lastDate === twoDaysAgo.toISOString().slice(0, 10)) {
        newStreak += 1;
        await db.userStreak.update({
          where: { userId },
          data: { streakFreezes: existing.streakFreezes - 1 },
        });
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
  }

  const totalXp = existing.totalXp + xp;
  let bonusXp = 0;

  // Streak milestones
  if (newStreak === 7 && existing.currentStreak < 7) bonusXp = XP_REWARDS.streak_bonus_7;
  if (newStreak === 30 && existing.currentStreak < 30) bonusXp = XP_REWARDS.streak_bonus_30;

  // Achievements
  if (newStreak === 7 && existing.currentStreak < 7) {
    await unlockAchievement(userId, "streak_7");
  }
  if (newStreak === 30 && existing.currentStreak < 30) {
    await unlockAchievement(userId, "streak_30");
  }

  if (bonusXp > 0) {
    await db.xpEvent.create({
      data: { userId, action: `streak_bonus_${newStreak}`, xp: bonusXp },
    });
  }

  const finalXp = totalXp + bonusXp;

  await db.userStreak.update({
    where: { userId },
    data: {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, existing.longestStreak),
      lastActiveDate: today,
      totalXp: finalXp,
      level: getLevelForXp(finalXp),
    },
  });
}
