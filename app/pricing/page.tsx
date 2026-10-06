import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 60;

import { PLANS, type PlanId } from "@/lib/subscription";
import SiteHeader from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { CardShell, ManageBilling, PlanCta, PricingActionsProvider } from "./PricingClient";
import {
  HALLOWEEN_DISCOUNT_PERCENT,
  formatUsd,
  discountedCents,
  isHalloweenSaleActive,
  planPriceCents,
  planPriceDisplay,
  withSaleOffer,
} from "@/lib/pricing";
import { SaleAmount, SaleEnds, SalePill, SaleText } from "@/components/seasonal/halloween/SalePrice";

// Evaluated per render (ISR revalidates every 60s), so the sale copy drops after the cutoff.
export function generateMetadata(): Metadata {
  const now = new Date();
  const starter = planPriceCents(PLANS.starter);
  const description = isHalloweenSaleActive(now)
    ? `Halloween sale: ${HALLOWEEN_DISCOUNT_PERCENT}% off every paid plan until Oct 31, from ${formatUsd(discountedCents(starter))}/month (regularly ${formatUsd(starter)}). Free plan: 5 quizzes/month. No credit card required to start.`
    : "Free plan: 5 quizzes/month. Paid plans from $2/month with more quizzes, PDF downloads, and team features. No credit card required to start.";
  return pageMetadata({
    title: "Pricing — Quiz Generator Plans",
    description,
    path: "/pricing",
  });
}

const CHECK = (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);


type PricingFaq = { q: string; a: string; sale?: string };

function getPricingFaqs(saleActive: boolean): PricingFaq[] {
  const p = (id: Exclude<PlanId, "free">) => {
    const base = planPriceCents(PLANS[id]);
    return { regular: formatUsd(base), sale: formatUsd(discountedCents(base)) };
  };
  const starter = p("starter");
  const plus = p("plus");
  const pro = p("pro");
  const team = p("team");
  return [
    {
      q: "Is Examina free to try?",
      a: "Yes. The Free plan includes 5 quizzes per month with multiple choice, flashcards, and score tracking — no credit card required.",
    },
    {
      q: "What do the paid plans cost?",
      a: "Starter is $2/mo (20 quizzes), Plus is $5/mo (60 quizzes), Pro is $9/mo (200 quizzes), and Team is $15/mo for unlimited quizzes for up to 5 members.",
      ...(saleActive && {
        sale: `For Halloween, every paid plan is ${HALLOWEEN_DISCOUNT_PERCENT}% off until Oct 31: Starter is ${starter.sale}/mo (regularly ${starter.regular}, 20 quizzes), Plus is ${plus.sale}/mo (regularly ${plus.regular}, 60 quizzes), Pro is ${pro.sale}/mo (regularly ${pro.regular}, 200 quizzes), and Team is ${team.sale}/mo (regularly ${team.regular}) for unlimited quizzes for up to 5 members.`,
      }),
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel from the billing portal anytime. You keep access through the end of the billing period.",
    },
    {
      q: "Do you offer student discounts?",
      a: "Our Starter plan at $2/mo is priced for students. Free always stays available if you only need a few quizzes a month.",
      ...(saleActive && {
        sale: `Our Starter plan is priced for students, and until Oct 31 it's ${starter.sale}/mo (${HALLOWEEN_DISCOUNT_PERCENT}% off the regular ${starter.regular}/mo) for Halloween. Free always stays available if you only need a few quizzes a month.`,
      }),
    },
  ];
}

const featuredId: PlanId = "plus";

function getPricingFaqSchema(faqs: PricingFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.sale ?? f.a },
    })),
  };
}

function getProductSchema(now: Date) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Examina Quiz Generator",
    description:
      "AI-powered quiz generator with free and paid plans. Turns any text into multiple choice, flashcard, fill-in-the-blank, and true/false questions.",
    brand: { "@type": "Brand", name: "Examina" },
    offers: Object.values(PLANS).map((plan) =>
      withSaleOffer(
        {
          "@type": "Offer" as const,
          name: plan.name,
          price: String(plan.price),
          priceCurrency: "USD",
          description:
            plan.quizzesPerMonth === Infinity
              ? "Unlimited quizzes per month"
              : `${plan.quizzesPerMonth} quizzes per month`,
        },
        plan,
        now
      )
    ),
  };
}

export default function PricingPage() {
  // Per render, never at build time: ISR re-renders this page every 60s.
  const now = new Date();
  const saleActive = isHalloweenSaleActive(now);
  const pricingFaqs = getPricingFaqs(saleActive);
  const pricingFaqSchema = getPricingFaqSchema(pricingFaqs);
  const productSchema = getProductSchema(now);
  return (
    <div className="min-h-screen bg-background">
      <StructuredData data={pricingFaqSchema} />
      <StructuredData data={productSchema} />
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-14 text-center sm:mb-16">
          <p className="mb-4 font-serif text-base italic text-[#B0607A]">Pricing</p>
          <h1 className="text-4xl font-medium tracking-tight text-[#3B2027] sm:text-5xl">
            Simple, student-friendly <span className="font-serif italic text-[#B0607A]">pricing</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#9A7280]">
            Start free. Upgrade when you need more quizzes. Cancel anytime.
          </p>
        </div>

        <PricingActionsProvider>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Object.values(PLANS).map((plan) => {
              const isFeatured = plan.id === featuredId;
              const price = planPriceDisplay(plan, now);
              return (
                <div key={plan.id} className={isFeatured ? "xl:-translate-y-3 xl:scale-[1.02]" : ""}>
                  <CardShell isFeatured={isFeatured} planId={plan.id}>
                    {plan.badge && (
                      <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
                        <span
                          className={`whitespace-nowrap rounded-full px-3.5 py-1 text-[11px] font-medium tracking-wide ${
                            isFeatured
                              ? "bg-gradient-to-r from-[#B0607A] to-[#C98A98] text-white shadow-[0_8px_20px_-8px_rgba(176,96,122,0.7)]"
                              : "bg-[#3B2027] text-[#F6E3E8]"
                          }`}
                        >
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h2 className={`mb-3 font-serif text-lg italic ${isFeatured ? "text-[#9A4F68]" : "text-[#3B2027]"}`}>
                        {plan.name}
                      </h2>
                      {price.sale && <SalePill />}
                      <div className={`flex items-baseline gap-1.5${price.sale ? " flex-wrap" : ""}`}>
                        {plan.price === 0 ? (
                          <span className="font-serif text-5xl text-[#3B2027]">Free</span>
                        ) : price.sale ? (
                          <SaleAmount
                            regular={price.regular}
                            regularNode={<>${plan.price}</>}
                            sale={price.sale}
                            sizeClassName="font-serif text-5xl"
                            regularClassName={`font-serif text-5xl ${isFeatured ? "text-[#B0607A]" : "text-[#3B2027]"}`}
                            suffix="/mo"
                            suffixClassName="text-sm text-[#9A7280]"
                            gapClassName="gap-1.5"
                          />
                        ) : (
                          <>
                            <span className={`font-serif text-5xl ${isFeatured ? "text-[#B0607A]" : "text-[#3B2027]"}`}>
                              ${plan.price}
                            </span>
                            <span className="text-sm text-[#9A7280]">/mo</span>
                          </>
                        )}
                      </div>
                      {price.sale && <SaleEnds />}
                      <p className="mt-2 text-sm text-[#9A7280]">
                        {plan.quizzesPerMonth === Infinity
                          ? "Unlimited quizzes"
                          : `${plan.quizzesPerMonth} quizzes / month`}
                      </p>
                    </div>

                    <ul className="mb-7 flex-1 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[#5D4450]">
                          <span
                            className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                              isFeatured ? "bg-[#B0607A] text-white" : "bg-[#FDE8EC] text-[#B0607A]"
                            }`}
                          >
                            {CHECK}
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <PlanCta plan={plan} isFeatured={isFeatured} salePrice={price.sale} />
                  </CardShell>
                </div>
              );
            })}
          </div>

          <ManageBilling />
        </PricingActionsProvider>


        <section className="mx-auto mt-20 max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-medium tracking-tight text-[#3B2027] sm:text-3xl">
            Pricing <span className="font-serif italic text-[#B0607A]">FAQ</span>
          </h2>
          <div className="space-y-6">
            {pricingFaqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-[#F3D5DC] bg-white/70 px-6 py-5">
                <h3 className="text-sm font-medium text-[#3B2027] sm:text-base">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9A7280]">
                  {f.sale ? <SaleText regular={f.a} sale={f.sale} /> : f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-[#B4939F]">
          Secure payments via Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
}
