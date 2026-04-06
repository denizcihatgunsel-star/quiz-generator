import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { PLANS, type PlanId } from "@/lib/subscription";

const PLAN_PRICES: Record<string, number> = {
  starter: 200,  // $2.00 in cents
  plus: 500,     // $5.00
  pro: 900,      // $9.00
  team: 1500,    // $15.00
};

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { plan } = await req.json();

  if (!plan || !(plan in PLANS) || plan === "free") {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  const priceInCents = PLAN_PRICES[plan];
  if (!priceInCents) {
    return NextResponse.json({ error: "Plan not configured." }, { status: 400 });
  }

  try {
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const stripe = getStripe();
    const origin = req.headers.get("origin") ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const planInfo = PLANS[plan as PlanId];

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planInfo.name} Plan`,
              description: `${planInfo.quizzesPerMonth === Infinity ? "Unlimited" : planInfo.quizzesPerMonth} quizzes per month`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        planId: plan,
      },
      success_url: `${origin}/pricing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", message);
    return NextResponse.json({ error: `Checkout failed: ${message}` }, { status: 500 });
  }
}
