#!/usr/bin/env node
/**
 * Local/static smoke for SEO P0/P1 batch (no live deploy required for file checks).
 * Optional LIVE=1 hits production with curl-like fetch.
 */
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const fails = [];
const ok = (m) => console.log("OK  ", m);
const bad = (m) => { console.error("FAIL", m); fails.push(m); };

const mw = readFileSync("middleware.ts", "utf8");
if (mw.includes("pathname.startsWith(\"/m\")") && !mw.includes('pathname === "/m" || pathname.startsWith("/m/")')) {
  bad("middleware still uses bare startsWith('/m')");
} else if (mw.includes('pathname === "/m" || pathname.startsWith("/m/")')) {
  ok("middleware folder-only /m gate");
} else bad("middleware /m gate missing");

if (mw.includes("/ultiple-choice-quiz-maker")) ok("middleware 301 ultiple repair");
else bad("missing ultiple redirect");

const robots = readFileSync("public/robots.txt", "utf8");
if (robots.includes("Allow: /classroom/join")) ok("robots Allow /classroom/join");
else bad("robots missing Allow /classroom/join");
if (robots.includes("Disallow: /_next/")) bad("robots still Disallow /_next/");
else ok("robots no Disallow /_next/");

const sm = readFileSync("app/sitemap.js", "utf8");
if (sm.includes('https://www.examina.ink/"') || sm.includes("`https://www.examina.ink/`") || sm.includes("${SITE}/`")) ok("sitemap home trailing slash intent");
if (sm.includes("/explore") && !sm.includes("omit thin client shells /explore")) bad("sitemap still lists /explore");
else if (sm.includes('`${SITE}/explore`') || sm.includes('https://www.examina.ink/explore')) bad("sitemap still lists /explore URL");
else ok("sitemap omits /explore");
if (sm.includes("/study")) ok("sitemap includes /study");
else bad("sitemap missing /study");

const og = readFileSync("public/og-image.png");
// PNG IHDR width/height at bytes 16-24
const w = og.readUInt32BE(16);
const h = og.readUInt32BE(20);
if (w === 1200 && h === 630) ok(`og-image.png ${w}x${h}`);
else bad(`og-image.png is ${w}x${h}, want 1200x630`);

const home = readFileSync("app/page.tsx", "utf8");
if (home.includes("FAQPage") && home.includes("Free accounts get 5 quizzes per month")) ok("homepage FAQ schema answers");
else bad("homepage FAQ schema mismatch");

const qg = readFileSync("components/QuizGenerator.tsx", "utf8");
if (qg.includes("AI Quiz Generator that turns notes into quizzes")) ok("homepage H1 text in QuizGenerator");
else bad("missing AI Quiz Generator H1");
if (qg.includes('href="/ultiple')) bad("QuizGenerator links /ultiple");
else ok("no /ultiple footer links");

const pricing = readFileSync("app/pricing/page.tsx", "utf8");
if (pricing.startsWith('"use client"')) bad("pricing still client-only");
else ok("pricing is server component");
if (pricing.includes("pricingFaqs") && pricing.includes("$2")) ok("pricing SSR FAQ + prices");
else if (pricing.includes("PLANS") && pricing.includes("plan.price")) ok("pricing SSR plan prices");
else bad("pricing missing SSR plan content");

if (existsSync("app/auth/layout.tsx") && readFileSync("app/auth/layout.tsx","utf8").includes("index: false")) ok("auth noindex");
else bad("auth noindex missing");
if (existsSync("app/dashboard/layout.tsx") && readFileSync("app/dashboard/layout.tsx","utf8").includes("index: false")) ok("dashboard noindex");
else bad("dashboard noindex missing");

if (process.env.LIVE === "1") {
  const urls = [
    "https://www.examina.ink/",
    "https://www.examina.ink/multiple-choice-quiz-maker",
    "https://www.examina.ink/pricing",
    "https://www.examina.ink/sitemap.xml",
    "https://www.examina.ink/og-image.png",
  ];
  for (const u of urls) {
    for (const http of ["--http1.1", "--http2"]) {
      try {
        const out = execSync(`curl -sI ${http} -A 'Mozilla/5.0' '${u}'`, { encoding: "utf8" });
        const line = out.split("\n")[0].trim();
        console.log(`LIVE ${http} ${u} -> ${line}`);
      } catch (e) {
        console.log(`LIVE ${http} ${u} -> error`, e.message);
      }
    }
  }
}

if (fails.length) {
  console.error(`\n${fails.length} failure(s)`);
  process.exit(1);
}
console.log("\nAll local smoke checks passed.");
