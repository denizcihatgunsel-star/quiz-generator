#!/usr/bin/env node
import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/auth/login", { waitUntil: "networkidle2" });
  await page.screenshot({ path: "debug-login-page.png", fullPage: true });
  
  // Get page HTML
  const html = await page.content();
  console.log("Login page HTML length:", html.length);
  console.log("Has email input:", html.includes('name="email"'));
  console.log("Has password input:", html.includes('name="password"'));
  console.log("Has input id=email:", html.includes('id="email"'));
  
  await browser.close();
}

main();
