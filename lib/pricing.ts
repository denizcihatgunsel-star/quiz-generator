/**
 * Halloween 2026 sale: 20% off every paid plan.
 *
 * Ends at the same hard cutoff as the theme (2026-11-01 00:00 Europe/Istanbul) via
 * isHalloweenSeason(). Every check takes `now` and is evaluated per request/revalidation,
 * never at build time, so all prices revert on their own after the cutoff.
 *
 * The charged discount is a Stripe coupon (HALLOWEEN_COUPON_ID, redeem_by = cutoff) that
 * /api/checkout attaches server-side. Display prices are derived from the plan's real base
 * price with the same percentage, so the page and the Stripe total always agree.
 */
import { isHalloweenSeason } from "@/lib/seasonal";
import { PLANS, type Plan, type PlanId } from "@/lib/subscription";

export const HALLOWEEN_DISCOUNT_PERCENT = 20;
export const HALLOWEEN_COUPON_ID = "examina-halloween-2026-20off";
/** 2026-11-01T00:00:00+03:00 */
export const HALLOWEEN_SALE_CUTOFF_UNIX = 1793480400;
/** Last day of the sale, for schema.org priceValidUntil */
export const HALLOWEEN_PRICE_VALID_UNTIL = "2026-10-31";
export const HALLOWEEN_SALE_LABEL = "Halloween 20% off";
export const HALLOWEEN_SALE_ENDS = "Ends Oct 31";

export function isHalloweenSaleActive(now: Date = new Date()): boolean {
  return isHalloweenSeason(now) && now.getTime() < HALLOWEEN_SALE_CUTOFF_UNIX * 1000;
}

export function planPriceCents(plan: Pick<Plan, "price">): number {
  return Math.round(plan.price * 100);
}

export function discountedCents(baseCents: number): number {
  return Math.round((baseCents * (100 - HALLOWEEN_DISCOUNT_PERCENT)) / 100);
}

/** 200 -> "2", 160 -> "1.60" */
export function formatAmount(cents: number): string {
  return cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2);
}

export function formatUsd(cents: number): string {
  return `$${formatAmount(cents)}`;
}

export type PlanPriceDisplay = {
  /** Regular price, e.g. "$2" */
  regular: string;
  /** Sale price, e.g. "$1.60"; null when no sale applies (free plan, after cutoff) */
  sale: string | null;
};

export function planPriceDisplay(plan: Pick<Plan, "price">, now: Date = new Date()): PlanPriceDisplay {
  const base = planPriceCents(plan);
  const regular = formatUsd(base);
  if (base <= 0 || !isHalloweenSaleActive(now)) return { regular, sale: null };
  return { regular, sale: formatUsd(discountedCents(base)) };
}

type OfferLike = { "@type": "Offer"; price: string; priceCurrency: string; [key: string]: unknown };

/**
 * schema.org Offer for a plan. During the sale `price` is the sale price, valid until Oct 31,
 * and the regular price stays as a StrikethroughPrice specification.
 */
export function withSaleOffer<T extends OfferLike>(offer: T, plan: Pick<Plan, "price">, now: Date = new Date()): T {
  const base = planPriceCents(plan);
  if (base <= 0 || !isHalloweenSaleActive(now)) return offer;
  return {
    ...offer,
    price: formatAmount(discountedCents(base)),
    priceValidUntil: HALLOWEEN_PRICE_VALID_UNTIL,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/StrikethroughPrice",
      price: formatAmount(base),
      priceCurrency: offer.priceCurrency,
    },
  };
}

/* ------------------------------------------------------------------------------------------
 * Shared plan Offers for page-level JSON-LD (/, /pricing, /ai-quiz-generator, ...), so every
 * page describes each tier the same way and carries the same sale data.
 * ---------------------------------------------------------------------------------------- */

export const PLAN_OFFER_DESCRIPTIONS: Record<PlanId, string> = {
  free: "10 quizzes per month, no credit card required",
  starter: "20 quizzes per month",
  plus: "60 quizzes per month",
  pro: "200 quizzes per month",
  team: "Unlimited quizzes for up to 5 members",
};

export function planOffers(now: Date = new Date()) {
  return Object.values(PLANS).map((plan) =>
    withSaleOffer(
      {
        "@type": "Offer" as const,
        name: plan.name,
        price: formatAmount(planPriceCents(plan)),
        priceCurrency: "USD",
        description: PLAN_OFFER_DESCRIPTIONS[plan.id],
        url: "https://www.examina.ink/pricing",
      },
      plan,
      now
    )
  );
}

/* ------------------------------------------------------------------------------------------
 * Sale-aware prose. Landing pages keep their regular copy verbatim; while the sale runs, the
 * known price phrases get a sale variant ("$1.60/month for Halloween (regularly $2, until
 * Oct 31)"). Visible text shows the variant only under the Halloween theme (like /pricing);
 * structured data and meta descriptions use the sale text. Computed per render.
 * ---------------------------------------------------------------------------------------- */

export type SaleCopy = { regular: string; sale: string };
export type Copy = string | SaleCopy;

/** Text for structured data / meta: the sale variant when there is one. */
export function copyText(copy: Copy): string {
  return typeof copy === "string" ? copy : copy.sale;
}

type PaidPlanId = Exclude<PlanId, "free">;

function priceTable(): { r: Record<PaidPlanId, string>; s: Record<PaidPlanId, string> } {
  const ids: PaidPlanId[] = ["starter", "plus", "pro", "team"];
  const r = {} as Record<PaidPlanId, string>;
  const s = {} as Record<PaidPlanId, string>;
  for (const id of ids) {
    const base = planPriceCents(PLANS[id]);
    r[id] = formatUsd(base);
    s[id] = formatUsd(discountedCents(base));
  }
  return { r, s };
}

/** [regular phrase, sale phrase] pairs, longest/most specific first. */
export function salePhrases(): [string, string][] {
  const { r, s } = priceTable();
  const note = (id: PaidPlanId) => `for Halloween (regularly ${r[id]}, until Oct 31)`;
  return [
    [
      `Starter is ${r.starter}/month for 20 quizzes, Plus ${r.plus}/month for 60, Pro ${r.pro}/month for 200, and Team ${r.team}/month for unlimited.`,
      `For Halloween, until Oct 31: Starter is ${s.starter}/month for 20 quizzes (regularly ${r.starter}), Plus ${s.plus}/month for 60 (regularly ${r.plus}), Pro ${s.pro}/month for 200 (regularly ${r.pro}), and Team ${s.team}/month for unlimited (regularly ${r.team}).`,
    ],
    [
      `Starter ${r.starter}/mo, Plus ${r.plus}/mo, Pro ${r.pro}/mo, Team ${r.team}/mo.`,
      `For Halloween, until Oct 31: Starter ${s.starter}/mo (regularly ${r.starter}), Plus ${s.plus}/mo (regularly ${r.plus}), Pro ${s.pro}/mo (regularly ${r.pro}), Team ${s.team}/mo (regularly ${r.team}).`,
    ],
    [`start at just ${r.starter}/month`, `start at just ${s.starter}/month ${note("starter")}`],
    [`start at ${r.starter}/month`, `start at ${s.starter}/month ${note("starter")}`],
    [`from ${r.starter}/month`, `from ${s.starter}/month ${note("starter")}`],
    [`Plus (${r.plus}/mo)`, `Plus (${s.plus}/mo for Halloween, regularly ${r.plus}, until Oct 31)`],
  ];
}

/** Sale variant of a piece of copy, or the copy unchanged (no price phrase, or no sale). */
export function saleCopy(text: string, now: Date = new Date()): Copy {
  if (!isHalloweenSaleActive(now)) return text;
  let out = text;
  for (const [regular, sale] of salePhrases()) {
    if (out.includes(regular)) out = out.split(regular).join(sale);
  }
  return out === text ? text : { regular: text, sale: out };
}

type LandingCopyData = {
  intro?: Copy[];
  features: { title: string; body: Copy }[];
  faq: { q: string; a: Copy }[];
};

/** Applies saleCopy to a KeywordLanding data object's prose (intro, feature bodies, FAQ answers). */
export function saleLandingData<T extends LandingCopyData>(data: T, now: Date = new Date()): T {
  const map = (c: Copy) => (typeof c === "string" ? saleCopy(c, now) : c);
  return {
    ...data,
    intro: data.intro?.map(map),
    features: data.features.map((f) => ({ ...f, body: map(f.body) })),
    faq: data.faq.map((f) => ({ ...f, a: map(f.a) })),
  };
}
