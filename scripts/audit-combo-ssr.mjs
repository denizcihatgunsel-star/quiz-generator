#!/usr/bin/env node
/**
 * Audit combo pages for SSR word count, item count, FAQPage count, schema types, and similarity
 */
import { JSDOM } from 'jsdom';

const COMBO_PAGES = [
  // Algebra
  '/subjects/algebra/practice-questions',
  '/subjects/algebra/quiz',
  // Spelling
  '/subjects/spelling/flashcards',
  '/subjects/spelling/worksheet-generator',
  '/subjects/spelling/quiz-generator',
  // Geometry
  '/subjects/geometry/practice-questions',
  '/subjects/geometry/quiz',
  // French
  '/subjects/french/flashcards',
  // World History
  '/subjects/world-history/quiz',
  // Grammar
  '/subjects/grammar/quiz',
  // AP US History
  '/exams/ap-us-history/practice-questions',
  // AP Psychology
  '/exams/ap-psychology/flashcards',
  // Existing combos
  '/subjects/math/practice-questions',
  '/subjects/math/quiz',
  '/subjects/math/worksheet-generator',
  '/subjects/english/practice-questions',
  '/subjects/english/quiz',
  '/subjects/spanish/flashcards',
  '/subjects/spanish/quiz',
  '/subjects/vocabulary/flashcards',
  '/subjects/vocabulary/quiz',
  '/subjects/biology/flashcards',
  '/subjects/biology/quiz',
  '/subjects/chemistry/flashcards',
  '/subjects/chemistry/quiz',
];

async function fetchHTML(url) {
  const fullUrl = `${url}`;
  const response = await fetch(fullUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

function stripScriptStyleNavHeaderFooter(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  // Remove script, style, nav, header, footer
  doc.querySelectorAll('script, style, nav, header, footer').forEach(el => el.remove());
  
  return doc.body.textContent || '';
}

function countVisibleWords(text) {
  // Strip extra whitespace and count words
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(w => w.length > 0).length;
}

function countSampleItems(html) {
  // Count sample items in SSR HTML
  // Look for <details> elements (new format) or data structures
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  const details = doc.querySelectorAll('details');
  if (details.length > 0) return details.length;
  
  // Fallback: look for question patterns in text
  const text = doc.body.textContent || '';
  const qMatches = text.match(/Question \d+:/g) || [];
  const termMatches = text.match(/Flashcard \d+/g) || [];
  
  return Math.max(qMatches.length, termMatches.length, 0);
}

function countFAQPages(html) {
  const faqMatches = html.match(/"@type"\s*:\s*"FAQPage"/g);
  return faqMatches ? faqMatches.length : 0;
}

function extractSchemaTypes(html) {
  const typeMatches = html.match(/"@type"\s*:\s*"([^"]+)"/g);
  if (!typeMatches) return [];
  
  const types = typeMatches.map(m => {
    const match = m.match(/"@type"\s*:\s*"([^"]+)"/);
    return match ? match[1] : null;
  }).filter(Boolean);
  
  return [...new Set(types)]; // unique
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2); // ignore short words
}

function jaccardSimilarity(text1, text2) {
  const tokens1 = new Set(tokenize(text1));
  const tokens2 = new Set(tokenize(text2));
  
  const intersection = new Set([...tokens1].filter(t => tokens2.has(t)));
  const union = new Set([...tokens1, ...tokens2]);
  
  return union.size > 0 ? intersection.size / union.size : 0;
}

async function auditPage(baseUrl, path) {
  try {
    const html = await fetchHTML(baseUrl + path);
    const visibleText = stripScriptStyleNavHeaderFooter(html);
    const wordCount = countVisibleWords(visibleText);
    const itemCount = countSampleItems(html);
    const faqPageCount = countFAQPages(html);
    const schemaTypes = extractSchemaTypes(html);
    
    return {
      path,
      wordCount,
      itemCount,
      faqPageCount,
      schemaTypes,
      visibleText,
      success: true,
    };
  } catch (error) {
    return {
      path,
      error: error.message,
      success: false,
    };
  }
}

async function main() {
  const baseUrl = process.argv[2];
  if (!baseUrl) {
    console.error('Usage: node audit-combo-ssr.mjs <BASE_URL>');
    console.error('Example: node audit-combo-ssr.mjs https://quiz-generator-git-curso-853bb0-denizcihatgunsel-stars-projects.vercel.app');
    process.exit(1);
  }
  
  console.log(`Auditing ${COMBO_PAGES.length} combo pages on ${baseUrl}...\n`);
  
  const results = [];
  
  for (const path of COMBO_PAGES) {
    process.stdout.write(`Auditing ${path}... `);
    const result = await auditPage(baseUrl, path);
    results.push(result);
    
    if (result.success) {
      console.log(`✓ ${result.wordCount} words, ${result.itemCount} items, ${result.faqPageCount} FAQPage, ${result.schemaTypes.join(', ')}`);
    } else {
      console.log(`✗ ${result.error}`);
    }
  }
  
  console.log('\n=== SUMMARY ===\n');
  
  // Table format
  console.log('Path\tWords\tItems\tFAQPage\tSchema Types');
  for (const r of results.filter(r => r.success)) {
    console.log(`${r.path}\t${r.wordCount}\t${r.itemCount}\t${r.faqPageCount}\t${r.schemaTypes.join(', ')}`);
  }
  
  console.log('\n=== SIMILARITY ANALYSIS ===\n');
  
  // Calculate sibling similarities
  const siblings = [
    ['/subjects/math/practice-questions', '/subjects/algebra/practice-questions'],
    ['/subjects/math/quiz', '/subjects/algebra/quiz'],
    ['/subjects/english/practice-questions', '/subjects/vocabulary/quiz'],
  ];
  
  const successResults = results.filter(r => r.success);
  const similarities = [];
  
  // All pairwise similarities for same parent
  const byParent = {};
  for (const r of successResults) {
    const parts = r.path.split('/');
    const parent = parts.slice(0, 3).join('/'); // /subjects/X or /exams/X
    if (!byParent[parent]) byParent[parent] = [];
    byParent[parent].push(r);
  }
  
  for (const parent in byParent) {
    const pages = byParent[parent];
    for (let i = 0; i < pages.length; i++) {
      for (let j = i + 1; j < pages.length; j++) {
        const sim = jaccardSimilarity(pages[i].visibleText, pages[j].visibleText);
        similarities.push({ path1: pages[i].path, path2: pages[j].path, similarity: sim });
      }
    }
  }
  
  similarities.sort((a, b) => b.similarity - a.similarity);
  
  console.log('Top 10 highest similarities:');
  for (const s of similarities.slice(0, 10)) {
    console.log(`${s.similarity.toFixed(3)}\t${s.path1} <-> ${s.path2}`);
  }
  
  const avg = similarities.reduce((sum, s) => sum + s.similarity, 0) / similarities.length;
  const max = similarities[0]?.similarity || 0;
  
  console.log(`\nMax similarity: ${max.toFixed(3)}`);
  console.log(`Avg similarity: ${avg.toFixed(3)}`);
  
  // Check failures
  const failures = results.filter(r => !r.success);
  if (failures.length > 0) {
    console.log('\n=== FAILURES ===\n');
    for (const f of failures) {
      console.log(`${f.path}: ${f.error}`);
    }
  }
  
  // Quality gates
  console.log('\n=== QUALITY GATES ===\n');
  
  const wordFails = successResults.filter(r => r.wordCount < 700);
  const itemFails = successResults.filter(r => r.itemCount < 8);
  const faqFails = successResults.filter(r => r.faqPageCount !== 1);
  const schemaFails = successResults.filter(r => {
    const hasQuizOrLR = r.schemaTypes.includes('Quiz') || r.schemaTypes.includes('LearningResource');
    const hasFAQ = r.schemaTypes.includes('FAQPage');
    const hasBreadcrumb = r.schemaTypes.includes('BreadcrumbList');
    return !hasQuizOrLR || !hasFAQ || !hasBreadcrumb;
  });
  
  console.log(`Word count < 700: ${wordFails.length} pages`);
  if (wordFails.length > 0) {
    for (const r of wordFails) {
      console.log(`  ${r.path}: ${r.wordCount} words`);
    }
  }
  
  console.log(`\nItem count < 8: ${itemFails.length} pages`);
  if (itemFails.length > 0) {
    for (const r of itemFails) {
      console.log(`  ${r.path}: ${r.itemCount} items`);
    }
  }
  
  console.log(`\nFAQPage count ≠ 1: ${faqFails.length} pages`);
  if (faqFails.length > 0) {
    for (const r of faqFails) {
      console.log(`  ${r.path}: ${r.faqPageCount} FAQPage blocks`);
    }
  }
  
  console.log(`\nMissing required schema: ${schemaFails.length} pages`);
  if (schemaFails.length > 0) {
    for (const r of schemaFails) {
      console.log(`  ${r.path}: ${r.schemaTypes.join(', ')}`);
    }
  }
  
  console.log(`\nSimilarity > 0.40: ${similarities.filter(s => s.similarity > 0.40).length} pairs`);
  for (const s of similarities.filter(s => s.similarity > 0.40)) {
    console.log(`  ${s.similarity.toFixed(3)}: ${s.path1} <-> ${s.path2}`);
  }
  
  const passing = wordFails.length === 0 && itemFails.length === 0 && faqFails.length === 0 && 
                  schemaFails.length === 0 && max <= 0.40;
  
  console.log(`\n${passing ? '✓ ALL QUALITY GATES PASSED' : '✗ QUALITY GATES FAILED'}`);
  process.exit(passing ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
