export type PlanId = "free" | "plus" | "pro";

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
      "Community support",
    ],
  },
  plus: {
    id: "plus",
    name: "Plus",
    price: 7,
    quizzesPerMonth: 50,
    badge: "Most Popular",
    features: [
      "50 quizzes per month",
      "Everything in Free",
      "Quiz history (coming soon)",
      "Priority support",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 15,
    quizzesPerMonth: Infinity,
    features: [
      "Unlimited quizzes",
      "Everything in Plus",
      "Bulk generation (coming soon)",
      "API access (coming soon)",
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
