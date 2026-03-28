import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getStripe, getPlanPriceId } from "@/lib/stripe";
import { PLANS, type PlanId } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { plan } = await req.json();

  if (!plan || !(plan in PLANS) || plan === "free") {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  const priceId = getPlanPriceId(plan);
  if (!priceId) {
    return NextResponse.json({ error: "Plan not configured for payments." }, { status: 400 });
  }

  try {
    // Find or create Stripe customer
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const sub = await db.subscription.findUnique({ where: { userId: user.id } });
    let customerId = sub?.stripeCustomerId;

    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId: user.id },
      });
      customerId = customer.id;

      // Save Stripe customer ID
      await db.subscription.upsert({
        where: { userId: user.id },
        update: { stripeCustomerId: customerId },
        create: { userId: user.id, plan: "free", status: "active", stripeCustomerId: customerId },
      });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXTAUTH_URL ?? "http://localhost:3001";

    const checkoutSession = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/pricing?success=true&plan=${plan}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        planId: plan,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", message);
    return NextResponse.json({ error: `Checkout failed: ${message}` }, { status: 500 });
  }
}
