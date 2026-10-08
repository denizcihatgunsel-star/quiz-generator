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
  planOffers,
} from "@/lib/pricing";
import { SaleAmount, SaleEnds, SalePill, SaleText, saleRowClassName } from "@/components/seasonal/halloween/SalePrice";

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
      a: "Our Starter plan at $2/mo is priced for students. The Free plan always stays available if you only need a few quizzes a month.",
      ...(saleActive && {
        sale: `Until Oct 31, the Starter plan is ${starter.sale}/mo (${HALLOWEEN_DISCOUNT_PERCENT}% off the regular ${starter.regular}/mo) for Halloween—priced specifically for students. The Free plan always stays available if you only need a few quizzes a month.`,
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
    offers: planOffers(now),
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
                      {price.sale ? <SalePill /> : saleActive && <SalePill placeholder />}
                      <div className={`flex items-baseline gap-1.5${price.sale ? ` ${saleRowClassName}` : ""}`}>
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
                      {price.sale ? <SaleEnds /> : saleActive && <SaleEnds placeholder />}
                      <p className="mt-2 text-sm text-[#9A7280]">
                        {plan.quizzesPerMonth === Infinity
                          ? "Unlimited quizzes"
                          : `${plan.quizzesPerMonth} quizzes / month`}
                      </p>
                    </div>

                    <ul className="mb-7 flex-1 space-y-3" data-plan-features={isFeatured ? "featured" : ""}>
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


        <section className="mx-auto mt-20 max-w-5xl">
          <h2 className="mb-6 text-center text-2xl font-medium tracking-tight text-[#3B2027] sm:text-3xl">
            What's included <span className="font-serif italic text-[#B0607A]">across plans</span>
          </h2>
          <div className="mx-auto mb-16 max-w-3xl space-y-3 text-base leading-relaxed text-[#5D4450]">
            <p>
              All Examina plans give you access to four question types: multiple choice with detailed explanations, interactive flashcards with 3D flip, fill-in-the-blank questions, and true/false with reasoning. All questions are tagged with Bloom's Taxonomy cognitive levels so you know whether you're testing recall, understanding, or application.
            </p>
            <p>
              The platform generates quizzes in 29 languages, handles content from 50 to 15,000 characters, and creates each quiz in under 30 seconds. Every quiz includes score tracking so you can monitor your progress over time. Free and Starter plans let you take quizzes for personal study; Plus and above add sharing via unique quiz links and PDF export for offline use or printing.
            </p>
            <p>
              The main differences between plans are: how many quizzes you can generate per month, whether you can upload PDF files (Starter and above—PDFs require optical character recognition which costs more to process), and whether you can share quizzes or export them to PDF (Plus and above). Free users can paste text directly or upload TXT and Markdown files for quiz generation.
            </p>
          </div>

          <h2 className="mb-6 text-center text-2xl font-medium tracking-tight text-[#3B2027] sm:text-3xl">
            Choosing the <span className="font-serif italic text-[#B0607A]">right plan</span>
          </h2>
          <div className="mx-auto mb-16 max-w-3xl space-y-6">
            <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-6">
              <h3 className="mb-2 font-medium text-[#3B2027]">Free Plan (5 quizzes/month)</h3>
              <p className="text-sm leading-relaxed text-[#9A7280]">
                Good for students who need occasional practice quizzes before midterms and finals, or anyone trying Examina to see if it fits their study workflow. Five quizzes is enough to test one subject per month or create a few practice tests throughout the semester. Take quizzes for personal study (no sharing or PDF export). No credit card required to start. Upload TXT or Markdown files, or paste text directly.
              </p>
            </div>
            <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-6">
              <h3 className="mb-2 font-medium text-[#3B2027]">Starter Plan (20 quizzes/month)</h3>
              <p className="text-sm leading-relaxed text-[#9A7280]">
                Most popular for individual students taking 4-6 classes. Twenty quizzes covers one practice quiz per subject per week, plus extras for exam prep. PDF upload is included, so you can generate questions directly from textbook pages and lecture slide PDFs without manual copying. Still for personal study only (sharing and PDF export start at Plus).
              </p>
            </div>
            <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-6">
              <h3 className="mb-2 font-medium text-[#3B2027]">Plus Plan (60 quizzes/month)</h3>
              <p className="text-sm leading-relaxed text-[#9A7280]">
                For active students who create multiple practice sets per subject, or tutors working with several students. Sixty quizzes means 2-3 practice quizzes per subject per week, with room for extra review quizzes before exams. Plus adds sharing via quiz links and PDF export, so you can share with study groups or print for offline practice. Works well for teachers who assign weekly quizzes to one or two classes.
              </p>
            </div>
            <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-6">
              <h3 className="mb-2 font-medium text-[#3B2027]">Pro Plan (200 quizzes/month)</h3>
              <p className="text-sm leading-relaxed text-[#9A7280]">
                Built for teachers who assign quizzes to multiple classes or create frequent formative assessments. Two hundred quizzes covers daily exit tickets, weekly review quizzes, and unit tests across 4-5 classes. Includes all Plus features (sharing, PDF export, API access). Also suits tutoring centers or study groups with heavy usage.
              </p>
            </div>
            <div className="rounded-2xl border border-[#F3D5DC] bg-white/70 p-6">
              <h3 className="mb-2 font-medium text-[#3B2027]">Team Plan (unlimited quizzes, up to 5 members)</h3>
              <p className="text-sm leading-relaxed text-[#9A7280]">
                For departments, tutoring teams, or teacher groups who need to share quiz generation capacity. Each team member gets their own account, and the team shares unlimited quiz generation with all Pro features. Perfect for schools, tutoring centers, or corporate training teams where multiple people create and share assessments.
              </p>
            </div>
          </div>

          <h2 className="mb-6 text-center text-2xl font-medium tracking-tight text-[#3B2027] sm:text-3xl">
            Compare Examina to <span className="font-serif italic text-[#B0607A]">manual quiz creation</span>
          </h2>
          <div className="mx-auto mb-16 max-w-3xl space-y-3 text-base leading-relaxed text-[#5D4450]">
            <p>
              Writing a good 10-question multiple choice quiz manually takes 30-45 minutes: you have to write each question, come up with plausible wrong answers that expose real misunderstandings, write explanations, and make sure questions test different cognitive levels. Examina does this in under 30 seconds by reading your source material and automatically generating questions with proper distractors and explanations.
            </p>
            <p>
              Creating flashcards by hand requires typing every term and definition, formatting them, and then either printing physical cards or manually entering them into a digital flashcard app. Examina generates interactive flashcards with 3D flip animations directly from your notes, already in a shareable digital format. For a 50-term vocabulary list, that's 20 minutes saved.
            </p>
            <p>
              The pedagogical advantage is consistency: Examina maps every question to Bloom's Taxonomy and generates a mix of recall, understanding, and application questions automatically. When you write questions manually, it's easy to default to simple recall questions because they're faster to write. Examina's AI varies question complexity intentionally, giving you better practice material without extra effort.
            </p>
          </div>
        </section>

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
