import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

// Map plan IDs to Stripe Price IDs (set these in env vars)
export function getPlanPriceId(planId: string): string | undefined {
  const map: Record<string, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    plus: process.env.STRIPE_PRICE_PLUS,
    pro: process.env.STRIPE_PRICE_PRO,
    team: process.env.STRIPE_PRICE_TEAM,
  };
  return map[planId];
}
