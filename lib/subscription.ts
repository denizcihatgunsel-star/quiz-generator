export type PlanId = "free" | "starter" | "plus" | "pro" | "team";

export interface Plan {
  id: PlanId;
  name: string;
  price: number; // USD/month, 0 = free
  quizzesPerMonth: number; // Infinity = unlimited
  features: string[];
  badge?: string;
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    quizzesPerMonth: 5,
    features: [
      "5 quizzes per month",
      "Multiple choice questions",
      "Flashcard generator",
      "Score tracking",
    ],
  },
  starter: {
    id: "starter",
    name: "Starter",
    price: 2,
    quizzesPerMonth: 20,
    features: [
      "20 quizzes per month",
      "Everything in Free",
      "PDF upload support",
      "Quiz history",
    ],
    badge: "Best for Students",
  },
  plus: {
    id: "plus",
    name: "Plus",
    price: 5,
    quizzesPerMonth: 60,
    badge: "Most Popular",
    features: [
      "60 quizzes per month",
      "Everything in Starter",
      "Share quizzes",
      "Download as PDF",
      "Priority support",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 9,
    quizzesPerMonth: 200,
    features: [
      "200 quizzes per month",
      "Everything in Plus",
      "Bulk generation (coming soon)",
      "API access (coming soon)",
    ],
  },
  team: {
    id: "team",
    name: "Team",
    price: 15,
    quizzesPerMonth: Infinity,
    features: [
      "Unlimited quizzes",
      "Everything in Pro",
      "Up to 5 members (coming soon)",
      "Shared quiz library (coming soon)",
      "Dedicated support",
    ],
  },
};

export function getPlan(planId: string): Plan {
  return PLANS[planId as PlanId] ?? PLANS.free;
}

export function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function isUnlimited(plan: Plan): boolean {
  return plan.quizzesPerMonth === Infinity;
}
