import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PLANS, type PlanId } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { plan } = await req.json();

  if (!plan || !(plan in PLANS)) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  const planDetails = PLANS[plan as PlanId];

  await db.subscription.upsert({
    where: { userId: session.user.id },
    update: { plan, status: "active" },
    create: { userId: session.user.id, plan, status: "active" },
  });

  return NextResponse.json({
    success: true,
    plan,
    name: planDetails.name,
    message:
      plan === "free"
        ? "Downgraded to Free."
        : `Upgraded to ${planDetails.name}! Enjoy your ${planDetails.quizzesPerMonth === Infinity ? "unlimited" : planDetails.quizzesPerMonth + "/month"} quizzes.`,
  });
}
