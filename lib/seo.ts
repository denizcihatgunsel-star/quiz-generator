import type { Metadata } from "next";

export const SITE_URL = "https://www.examina.ink";
export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Examina AI Quiz Generator — generate quizzes from any text",
} as const;

const LANG_ALTERNATES = {
  en: `${SITE_URL}/`,
  es: `${SITE_URL}/es`,
  de: `${SITE_URL}/de`,
  fr: `${SITE_URL}/fr`,
  pt: `${SITE_URL}/pt`,
  tr: `${SITE_URL}/tr`,
  "x-default": `${SITE_URL}/`,
} as const;

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  locale?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  noIndex?: boolean;
  languages?: boolean;
}): Metadata {
  const url = opts.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${opts.path}`;
  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDescription = opts.ogDescription ?? opts.description;
  const images = opts.images ?? [OG_IMAGE];
  const locale = opts.locale ?? "en_US";

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      ...(opts.languages ? { languages: { ...LANG_ALTERNATES } } : {}),
    },
    openGraph: {
      type: opts.type ?? "website",
      siteName: "Examina",
      title: ogTitle,
      description: ogDescription,
      url,
      images,
      locale,
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: images.map((i) => i.url),
    },
    ...(opts.noIndex
      ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }
      : {}),
  };
}
