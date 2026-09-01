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

console.log(`smoke-indexing-p0: ${passed} passed`);
