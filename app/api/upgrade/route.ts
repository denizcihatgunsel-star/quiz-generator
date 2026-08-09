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

  // Only the free plan can be granted here — paid plans require a verified
  // Stripe payment through /api/checkout + webhook/verify.
  if (plan !== "free") {
    return NextResponse.json({ error: "Paid plans must be purchased through checkout." }, { status: 400 });
  }

  await db.subscription.upsert({
    where: { userId: session.user.id },
    update: { plan: "free", status: "active" },
    create: { userId: session.user.id, plan: "free", status: "active" },
  });

  return NextResponse.json({
    success: true,
    plan: "free",
    name: PLANS.free.name,
    message: "Downgraded to Free.",
  });
}
