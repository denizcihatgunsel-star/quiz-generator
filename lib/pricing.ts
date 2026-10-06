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
import type { Plan } from "@/lib/subscription";

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
