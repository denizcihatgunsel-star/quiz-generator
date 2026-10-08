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
    quizzesPerMonth: 10,
    features: [
      "10 quizzes per month",
      "All question types",
      "Share quizzes",
      "PDF export",
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
      "API access",
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
      "Bulk generation",
      "API access",
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
      "Up to 5 members",
      "Shared quiz library",
      "Dedicated support",
    ],
  },
};

export function getPlan(planId: string): Plan {
  return Object.hasOwn(PLANS, planId) ? PLANS[planId as PlanId] : PLANS.free;
}

export function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function isUnlimited(plan: Plan): boolean {
  return plan.quizzesPerMonth === Infinity;
}

// Marketing copy helpers - always read from config
export const FREE_PLAN_LIMIT = PLANS.free.quizzesPerMonth;
export const STARTER_PLAN_PRICE = PLANS.starter.price;
