import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { PLANS, type PlanId } from "@/lib/subscription";
import { HALLOWEEN_COUPON_ID, HALLOWEEN_SALE_CUTOFF_UNIX, isHalloweenSaleActive } from "@/lib/pricing";
import type Stripe from "stripe";

function isCouponError(err: unknown): boolean {
  const e = err as { code?: string; param?: string; message?: string } | null;
  if (!e) return false;
  return (
    (e.param ?? "").includes("coupon") ||
    (e.param ?? "").startsWith("discounts") ||
    /coupon/i.test(e.message ?? "")
  );
}

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

    const params: Stripe.Checkout.SessionCreateParams = {
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
    };

    // Halloween sale: 20% off at the real checkout, until 2026-11-01 00:00 Europe/Istanbul.
    // Decided per request on the server; the coupon itself also stops redeeming at the cutoff.
    const saleActive = isHalloweenSaleActive();
    if (saleActive) {
      params.discounts = [{ coupon: HALLOWEEN_COUPON_ID }];
      params.metadata = { ...params.metadata, discount: HALLOWEEN_COUPON_ID };
      // Don't let a discounted session be paid after the cutoff (Stripe allows 30 min to 24 h).
      const nowSec = Math.floor(Date.now() / 1000);
      const untilCutoff = HALLOWEEN_SALE_CUTOFF_UNIX - nowSec;
      if (untilCutoff > 31 * 60 && untilCutoff < 24 * 60 * 60) {
        params.expires_at = HALLOWEEN_SALE_CUTOFF_UNIX;
      }
    }

    let checkoutSession: Stripe.Checkout.Session;
    try {
      checkoutSession = await stripe.checkout.sessions.create(params);
    } catch (err) {
      // Never block a purchase because of the promo: fall back to the regular price.
      if (!saleActive || !isCouponError(err)) throw err;
      console.error("Halloween coupon rejected, retrying at full price:", err instanceof Error ? err.message : String(err));
      const fullPrice: Stripe.Checkout.SessionCreateParams = {
        ...params,
        metadata: { userId: session.user.id, planId: plan },
      };
      delete fullPrice.discounts;
      delete fullPrice.expires_at;
      checkoutSession = await stripe.checkout.sessions.create(fullPrice);
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", message);
    return NextResponse.json({ error: `Checkout failed: ${message}` }, { status: 500 });
  }
}
