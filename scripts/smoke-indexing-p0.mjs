#!/usr/bin/env node
/** Smoke test for indexing P0: folder-only /m strip, robots, SSR pricing. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function isMobileFolder(pathname) {
  return pathname === "/m" || pathname.startsWith("/m/");
}

let passed = 0;
function ok(name, cond) {
  if (!cond) {
    console.error("FAIL", name);
    process.exit(1);
  }
  console.log("ok", name);
  passed++;
}

for (const p of ["/multiple-choice-quiz-maker", "/marketing", "/multiple"]) {
  ok(`${p} is NOT an /m route`, !isMobileFolder(p));
}
for (const p of ["/m", "/m/", "/m/pricing", "/m/classroom/join"]) {
  ok(`${p} IS an /m route`, isMobileFolder(p));
}

// Old /^\/m/ eats the leading slash too: "/multiple..." -> "ultiple..."
ok(
  "old bug: /^\\/m/ strips /multiple-choice-quiz-maker to ultiple...",
  "/multiple-choice-quiz-maker".replace(/^\/m/, "") === "ultiple-choice-quiz-maker",
);
ok(
  "new replace: /^\\/m(?=\\/|$)/ leaves /multiple-choice-quiz-maker intact",
  "/multiple-choice-quiz-maker".replace(/^\/m(?=\/|$)/, "") === "/multiple-choice-quiz-maker",
);

const robots = readFileSync(join(root, "public/robots.txt"), "utf8");
ok("robots Allow: /classroom/join", robots.includes("Allow: /classroom/join"));
ok("robots does not Disallow: /_next/", !robots.includes("Disallow: /_next/"));

for (const rel of ["app/pricing/page.tsx", "app/m/pricing/page.tsx"]) {
  const src = readFileSync(join(root, rel), "utf8");
  ok(`${rel} has no "use client"`, !src.includes('"use client"'));
  ok(`${rel} imports PLANS`, /\bimport\s*\{[^}]*\bPLANS\b/.test(src));
}


const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
ok("layout.tsx imports headers from next/headers", /from\s+["']next\/headers["']/.test(layout));
ok("layout.tsx uses headers()", /\bheaders\s*\(/.test(layout));
ok("layout.tsx reads x-html-lang", layout.includes("x-html-lang"));
ok(
  "layout.tsx does not hardcode only lang=\"en\"",
  !/\blang\s*=\s*["']en["']/.test(layout) || layout.includes("x-html-lang"),
);

const vercel = readFileSync(join(root, "vercel.json"), "utf8");
ok("vercel.json mentions examina.ink host", vercel.includes("examina.ink"));
ok(
  "vercel.json has 308 or permanent true",
  /"statusCode"\s*:\s*308/.test(vercel) || /"permanent"\s*:\s*true/.test(vercel),
);

const middleware = readFileSync(join(root, "middleware.ts"), "utf8");
ok("middleware mentions 308", middleware.includes("308"));
ok("middleware mentions x-html-lang", middleware.includes("x-html-lang"));

console.log(`smoke-indexing-p0: ${passed} passed`);
