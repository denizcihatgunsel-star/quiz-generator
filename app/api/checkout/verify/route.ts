import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed.", status: checkoutSession.payment_status }, { status: 400 });
    }

    const userId = checkoutSession.metadata?.userId;
    const planId = checkoutSession.metadata?.planId;

    if (!userId || !planId) {
      return NextResponse.json({ error: "Missing metadata." }, { status: 400 });
    }

    // Only the user who paid may claim the plan from this session
    if (userId !== session.user.id) {
      return NextResponse.json({ error: "This checkout session belongs to another account." }, { status: 403 });
    }

    // Update or create the subscription
    await db.subscription.upsert({
      where: { userId },
      update: { plan: planId, status: "active" },
      create: { userId, plan: planId, status: "active" },
    });

    return NextResponse.json({ success: true, plan: planId });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Verify error:", message);
    return NextResponse.json({ error: "Could not verify payment. Please contact support." }, { status: 500 });
  }
}
