import { db } from "@/lib/db";
import type { Plan } from "@/lib/subscription";

// Effective monthly quota = plan allowance + referral bonus quizzes.
// Returns -1 when unlimited.
export async function quotaLimit(plan: Plan, userId: string): Promise<number> {
  if (plan.quizzesPerMonth === Infinity) return -1;
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { bonusQuizzes: true },
  });
  return plan.quizzesPerMonth + (user?.bonusQuizzes ?? 0);
}
