import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { isAdminEmail } from "@/lib/admin";
import { getStripe } from "@/lib/stripe";

async function isAdmin(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;
  if (isAdminEmail(session.user.email)) return true;
  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  return user?.role === "admin";
}

// GET: Real revenue from Stripe (paid one-time Checkout Sessions).
// This reflects money actually collected, unlike the plan-price estimate.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // No key configured (e.g. local dev) → return empty rather than erroring.
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ totalRevenue: 0, totalRevenueCents: 0, paidOrders: 0, orders: [] });
  }

  try {
    const stripe = getStripe();
    const orders: {
      id: string;
      email: string | null;
      plan: string | null;
      amount: number; // cents
      currency: string;
      createdAt: number; // unix seconds
    }[] = [];

    let startingAfter: string | undefined;
    // Safety cap to avoid unbounded loops on very large accounts.
    let pages = 0;

    while (pages < 10) {
      const sessions = await stripe.checkout.sessions.list({
        payment_status: "paid",
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      pages += 1;

      for (const s of sessions.data) {
        orders.push({
          id: s.id,
          email: s.customer_details?.email ?? s.customer_email ?? null,
          plan: s.metadata?.planId ?? null,
          amount: s.amount_total ?? 0,
          currency: s.currency ?? "usd",
          createdAt: s.created,
        });
      }

      if (!sessions.has_more || sessions.data.length === 0) break;
      startingAfter = sessions.data[sessions.data.length - 1].id;
    }

    const totalRevenueCents = orders.reduce((sum, o) => sum + o.amount, 0);

    return NextResponse.json({
      totalRevenue: totalRevenueCents / 100,
      totalRevenueCents,
      paidOrders: orders.length,
      orders,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Admin revenue error:", message);
    return NextResponse.json({ error: "Could not load revenue." }, { status: 500 });
  }
}
