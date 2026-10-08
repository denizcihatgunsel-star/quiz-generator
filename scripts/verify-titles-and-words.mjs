#!/usr/bin/env node
/**
 * Verify combo page titles and word counts on live preview
 */

const COMBO_PAGES = [
  '/subjects/algebra/practice-questions',
  '/subjects/algebra/quiz',
  '/subjects/spelling/flashcards',
  '/subjects/spelling/worksheet-generator',
  '/subjects/spelling/quiz-generator',
  '/subjects/geometry/practice-questions',
  '/subjects/geometry/quiz',
  '/subjects/french/flashcards',
  '/subjects/world-history/quiz',
  '/subjects/grammar/quiz',
  '/exams/ap-us-history/practice-questions',
  '/exams/ap-psychology/flashcards',
  '/subjects/math/practice-questions',
  '/subjects/math/worksheet-generator',
  '/subjects/english/practice-questions',
  '/subjects/english/quiz',
  '/subjects/spanish/flashcards',
  '/subjects/spanish/quiz',
  '/subjects/vocabulary/flashcards',
  '/subjects/vocabulary/quiz',
  '/subjects/biology/quiz',
  '/subjects/chemistry/flashcards',
  '/subjects/chemistry/quiz',
];

const HUB_PAGES = [
  '/subjects/spelling',
  '/subjects/grammar',
  '/subjects/algebra',
  '/subjects/geometry',
  '/subjects/world-history',
  '/subjects/french',
  '/exams/ap-us-history',
  '/exams/ap-psychology',
];

async function fetchPage(baseUrl, path) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  return response.text();
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? match[1].trim() : 'NO TITLE FOUND';
}

function stripAndCount(html) {
  // Remove script, style, nav, header, footer tags and their content
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  text = text.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '');
  text = text.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '');
  text = text.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '');
  
  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'");
  
  // Count words
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(w => w.length > 0);
  return words.length;
}

async function main() {
  const baseUrl = process.argv[2];
  if (!baseUrl) {
    console.error('Usage: node verify-titles-and-words.mjs <BASE_URL>');
    process.exit(1);
  }
  
  console.log('## Combo Pages\n');
  console.log('| Path | Title | Words |');
  console.log('|------|-------|-------|');
  
  for (const path of COMBO_PAGES) {
    try {
      const html = await fetchPage(baseUrl, path);
      const title = extractTitle(html);
      const words = stripAndCount(html);
      console.log(`| ${path} | ${title} | ${words} |`);
    } catch (error) {
      console.log(`| ${path} | ERROR: ${error.message} | - |`);
    }
  }
  
  console.log('\n## Hub Pages\n');
  console.log('| Path | Title | Words |');
  console.log('|------|-------|-------|');
  
  for (const path of HUB_PAGES) {
    try {
      const html = await fetchPage(baseUrl, path);
      const title = extractTitle(html);
      const words = stripAndCount(html);
      console.log(`| ${path} | ${title} | ${words} |`);
    } catch (error) {
      console.log(`| ${path} | ERROR: ${error.message} | - |`);
    }
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
