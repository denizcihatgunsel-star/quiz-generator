import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getPlan, currentMonth } from "@/lib/subscription";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const userId = session.user.id;
  const month = currentMonth();

  const [subscription, usageRecord] = await Promise.all([
    db.subscription.findUnique({ where: { userId } }),
    db.usageRecord.findUnique({ where: { userId_month: { userId, month } } }),
  ]);

  const plan = getPlan(subscription?.plan ?? "free");
  const used = usageRecord?.count ?? 0;
  const limit = plan.quizzesPerMonth === Infinity ? -1 : plan.quizzesPerMonth;

  return NextResponse.json({
    planId: plan.id,
    planName: plan.name,
    used,
    limit,
    unlimited: plan.quizzesPerMonth === Infinity,
    remaining: plan.quizzesPerMonth === Infinity ? -1 : Math.max(0, plan.quizzesPerMonth - used),
  });
}
