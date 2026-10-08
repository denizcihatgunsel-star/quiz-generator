#!/usr/bin/env node
/**
 * Verification script: Check that every page in the sitemap has exactly one FAQPage schema.
 * 
 * Reads the built sitemap.xml and checks each page for JSON-LD FAQPage schemas.
 * Fails if any page has 0 or more than 1 FAQPage.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = path.join(__dirname, '../.next/server/app');
const SITEMAP_PATH = path.join(__dirname, '../.next/server/app/sitemap.xml');

async function main() {
  console.log('📋 Verifying FAQPage schema uniqueness...\n');

  // Read sitemap
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error(`❌ Sitemap not found at ${SITEMAP_PATH}`);
    console.error('   Run `npm run build` first to generate the sitemap.');
    process.exit(1);
  }

  const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const urlMatches = Array.from(sitemapContent.matchAll(/<loc>(https:\/\/www\.examina\.ink[^<]+)<\/loc>/g));
  const urls = urlMatches.map(m => m[1]);

  console.log(`Found ${urls.length} URLs in sitemap.xml\n`);

  const issues = [];
  const skippedPaths = [];

  for (const url of urls) {
    const urlPath = new URL(url).pathname;
    
    // Map URL path to file path in .next/server/app directory
    // For example: /exams/sat -> .next/server/app/exams/sat.html
    let htmlContent = null;
    const possiblePaths = [
      path.join(BUILD_DIR, urlPath + '.html'),
      path.join(BUILD_DIR, urlPath, 'index.html'),
      path.join(BUILD_DIR, urlPath.replace(/\/$/, '') + '.html'),
    ];

    for (const tryPath of possiblePaths) {
      if (fs.existsSync(tryPath)) {
        htmlContent = fs.readFileSync(tryPath, 'utf8');
        break;
      }
    }

    if (!htmlContent) {
      skippedPaths.push(urlPath);
      continue;
    }

    // Find all JSON-LD script tags
    const jsonLdMatches = Array.from(htmlContent.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi));
    
    let faqPageCount = 0;

    for (const match of jsonLdMatches) {
      try {
        const jsonContent = match[1].trim();
        const parsed = JSON.parse(jsonContent);
        
        // Check if it's a FAQPage directly
        if (parsed['@type'] === 'FAQPage') {
          faqPageCount++;
        }
        
        // Check if it's a @graph containing FAQPage
        if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
          for (const item of parsed['@graph']) {
            if (item['@type'] === 'FAQPage') {
              faqPageCount++;
            }
          }
        }
      } catch (err) {
        // Ignore JSON parse errors
      }
    }

    if (faqPageCount === 0) {
      issues.push({
        url: urlPath,
        count: 0,
        message: 'No FAQPage schema found'
      });
    } else if (faqPageCount > 1) {
      issues.push({
        url: urlPath,
        count: faqPageCount,
        message: `${faqPageCount} FAQPage schemas found (expected 1)`
      });
    } else {
      // Exactly 1 - this is good
      process.stdout.write('.');
    }
  }

  console.log('\n');

  if (skippedPaths.length > 0) {
    console.log(`⚠️  Skipped ${skippedPaths.length} paths (HTML not found in out/ directory):`);
    skippedPaths.slice(0, 10).forEach(p => console.log(`   ${p}`));
    if (skippedPaths.length > 10) {
      console.log(`   ... and ${skippedPaths.length - 10} more`);
    }
    console.log();
  }

  if (issues.length === 0) {
    console.log('✅ All pages have exactly one FAQPage schema!');
    console.log(`   Checked ${urls.length - skippedPaths.length} pages.`);
    process.exit(0);
  } else {
    console.log(`❌ Found ${issues.length} pages with FAQPage schema issues:\n`);
    issues.forEach(issue => {
      console.log(`   ${issue.url}`);
      console.log(`   └─ ${issue.message}`);
    });
    console.log();
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
