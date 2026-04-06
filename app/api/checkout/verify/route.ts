import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed.", status: session.payment_status }, { status: 400 });
    }

    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;

    if (!userId || !planId) {
      return NextResponse.json({ error: "Missing metadata." }, { status: 400 });
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
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
