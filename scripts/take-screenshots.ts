#!/usr/bin/env node
/**
 * Take signed-in screenshots for Study Mode verification.
 * Run with: npx tsx scripts/take-screenshots.ts
 */

import puppeteer from "puppeteer";

const BASE_URL = "http://localhost:3000";
const EMAIL = "test@local.dev";
const PASSWORD = "test1234";

async function main() {
  console.log("🚀 Launching browser...");
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Log in via form
  console.log("🔐 Logging in via form...");
  await page.goto(`${BASE_URL}/auth/login`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1000));
  
  // Fill in login form (using id selectors)
  await page.type('#email', EMAIL);
  await page.type('#password', PASSWORD);
  
  // Submit form
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 3000));
  
  // Check if we're logged in by looking for redirect
  const currentUrl = page.url();
  console.log(`Current URL after login: ${currentUrl}`);
  
  if (currentUrl.includes("/auth/login")) {
    console.error("❌ Login failed - still on login page");
    console.log("Taking debug screenshot...");
    await page.screenshot({ path: "debug-login-failed.png" });
    await browser.close();
    process.exit(1);
  }
  
  console.log("✅ Logged in successfully");

  // 1. Mobile home card at 390px
  console.log("\n📸 Screenshot 1: Mobile /m home card (390px)");
  await page.setViewport({ width: 390, height: 844 });
  await page.setUserAgent(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
  );
  await page.goto(`${BASE_URL}/m`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: "study-v7-m-home.png", fullPage: false });
  console.log("✅ Saved: study-v7-m-home.png");

  // 2. Mobile /m/study/misses mid-session at 390px
  console.log("\n📸 Screenshot 2: Mobile /m/study/misses (390px)");
  await page.goto(`${BASE_URL}/m/study/misses`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: "study-v7-m-misses.png", fullPage: false });
  console.log("✅ Saved: study-v7-m-misses.png");

  // 3. Desktop /dashboard card at 1280px
  console.log("\n📸 Screenshot 3: Desktop /dashboard (1280px)");
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: "study-v7-dashboard.png", fullPage: false });
  console.log("✅ Saved: study-v7-dashboard.png");

  // 4. Results screen - simulate answering a question first
  console.log("\n📸 Screenshot 4: Quiz results screen (1280px)");
  
  // Navigate to study misses, answer one question
  await page.goto(`${BASE_URL}/study/misses`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2000));
  
  // Check if there's a question to answer
  const hasQuestion = await page.$("button[type='submit']");
  if (hasQuestion) {
    // Click the first option (look for radio input or clickable option)
    const options = await page.$$("[role='radio'], .cursor-pointer");
    if (options.length > 0) {
      await options[0].click();
      await new Promise((r) => setTimeout(r, 500));
      
      // Submit
      const submitBtn = await page.$("button[type='submit']");
      if (submitBtn) {
        await submitBtn.click();
        await new Promise((r) => setTimeout(r, 2000));
      }
      
      // Take screenshot of results
      await page.screenshot({ path: "study-v7-quiz-results.png", fullPage: false });
      console.log("✅ Saved: study-v7-quiz-results.png");
    } else {
      // No options found, take screenshot anyway
      await page.screenshot({ path: "study-v7-quiz-results.png", fullPage: false });
      console.log("⚠️  No options found, saved current page: study-v7-quiz-results.png");
    }
  } else {
    // No question found, take screenshot anyway
    await page.screenshot({ path: "study-v7-quiz-results.png", fullPage: false });
    console.log("⚠️  No question found, saved current page: study-v7-quiz-results.png");
  }

  await browser.close();
  console.log("\n🎉 All screenshots taken!");
  console.log("\nScreenshots:");
  console.log("  - study-v7-m-home.png");
  console.log("  - study-v7-m-misses.png");
  console.log("  - study-v7-dashboard.png");
  console.log("  - study-v7-quiz-results.png");
}

main().catch((e) => {
  console.error("❌ Screenshot failed:", e);
  process.exit(1);
});
