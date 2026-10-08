import { describe, it, expect } from "vitest";
import { glob } from "glob";
import { readFileSync } from "fs";
import { FREE_PLAN_LIMIT, STARTER_PLAN_PRICE } from "@/lib/subscription";

describe("Marketing copy compliance", () => {
  it("should not contain hardcoded free-limit claims", async () => {
    // Scan app/, components/, and lib/ for hardcoded plan limits
    const files = await glob("**/*.{ts,tsx,js,jsx}", {
      cwd: process.cwd(),
      ignore: [
        "**/node_modules/**",
        "**/.next/**",
        "**/dist/**",
        "**/__tests__/**",
        "**/lib/subscription.ts", // Allow the source of truth
        "**/lib/pricing.ts", // Allow the source of truth
      ],
    });

    const violations: { file: string; line: number; match: string }[] = [];

    // Patterns that indicate hardcoded free-limit claims
    // Also check for literal "5 generations" and "5 quizzes" in source
    const hardcodedPatterns = [
      /\b5\s+generations?/i,
      /\b5\s+quizzes?/i,
      /\bfive\s+(free\s+)?(generations?|quizzes?|quiz)/i,
      /\b(free|gratis|grátis)\s+(tier|plan|accounts?|users?).*?5\s+(quiz|generation)/i,
      /\b5\s+(quiz|generation).*?(free|gratis|grátis|per\s+month)/i,
    ];

    // Patterns that indicate free PDF generation claims (PDF upload requires Starter)
    const freePdfPatterns = [
      /convert\s+(a\s+)?pdf\s+free/i,
      /from\s+(a\s+)?pdf\s+free/i,
      /pdf.*?gratis/i,
      /pdf.*?grátis/i,
      /desde\s+pdf.*?gratis/i,
      /de\s+pdf.*?grátis/i,
      /generar\s+desde\s+pdf\s+gratis/i,
    ];

    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      const lines = content.split("\n");

      lines.forEach((line, idx) => {
        // Skip lines that use the constants from subscription
        if (line.includes("FREE_PLAN_LIMIT") || line.includes("STARTER_PLAN_PRICE")) {
          return;
        }

        // Check for hardcoded free-limit claims
        for (const pattern of hardcodedPatterns) {
          if (pattern.test(line)) {
            violations.push({
              file,
              line: idx + 1,
              match: line.trim(),
            });
          }
        }

        // Check for free PDF generation claims
        for (const pattern of freePdfPatterns) {
          if (pattern.test(line)) {
            violations.push({
              file,
              line: idx + 1,
              match: line.trim(),
            });
          }
        }
      });
    }

    if (violations.length > 0) {
      const message =
        `Found ${violations.length} hardcoded marketing claims:\n\n` +
        violations
          .slice(0, 10) // Show first 10
          .map((v) => `  ${v.file}:${v.line}\n    ${v.match}`)
          .join("\n\n") +
        (violations.length > 10 ? `\n\n...and ${violations.length - 10} more` : "");

      expect.fail(message);
    }
  });

  it("should use the correct free plan limit from config", () => {
    expect(FREE_PLAN_LIMIT).toBe(10);
    expect(typeof FREE_PLAN_LIMIT).toBe("number");
  });

  it("should use the correct starter price from config", () => {
    expect(STARTER_PLAN_PRICE).toBe(2);
    expect(typeof STARTER_PLAN_PRICE).toBe("number");
  });
});
