import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS, getPost } from "@/lib/blog/posts";
import LandingPageLayout from "@/components/LandingPageLayout";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | Examina Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      images: [OG_IMAGE],
      publishedTime: post.dateIso,
      modifiedTime: post.dateIso,
      siteName: "Examina",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.dateIso,
    dateModified: post.dateIso,
    image: [OG_IMAGE.url],
    author: { "@type": "Organization", name: "Examina" },
    publisher: {
      "@type": "Organization",
      name: "Examina",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <LandingPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.15em] text-neutral-400">
            {post.tag}
          </span>
          <span className="text-xs text-neutral-300">
            <time dateTime={post.dateIso}>{post.date}</time> · {post.readTime} read
          </span>
        </div>

        <h1 className="text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-500">
          {post.description}
        </p>

        <div className="mt-14 space-y-14">
          {post.sections.map((s, i) => (
            <section key={i}>
              <h2 className="mb-4 text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl">
                {s.h}
              </h2>
              {s.p?.map((para, j) => (
                <p key={j} className="mb-4 leading-relaxed text-neutral-600">
                  {para}
                </p>
              ))}
              {s.list && (
                <ul className="mb-4 space-y-3">
                  {s.list.map((item, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-neutral-600">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-2xl border border-neutral-200 bg-white p-8">
          <h2 className="mb-6 text-xl font-medium tracking-tight text-neutral-900">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {post.faq.map((f, i) => (
              <div key={i}>
                <p className="mb-1.5 font-medium text-neutral-900">{f.q}</p>
                <p className="leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14 border-t border-neutral-200 pt-10">
          <p className="mb-4 text-sm text-neutral-400">Keep reading</p>
          <div className="flex flex-wrap gap-3">
            {POSTS.filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                >
                  {p.title}
                </Link>
              ))}
          </div>
        </div>
      </article>
    </LandingPageLayout>
  );
}
