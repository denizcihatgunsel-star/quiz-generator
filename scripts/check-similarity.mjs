#!/usr/bin/env node
/**
 * Calculate Jaccard similarity between two pages
 */

async function fetchPage(baseUrl, path) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  return response.text();
}

function stripAndTokenize(html) {
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  text = text.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '');
  text = text.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '');
  text = text.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '');
  text = text.replace(/<[^>]+>/g, ' ');
  
  const tokens = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);
  
  return new Set(tokens);
}

function jaccardSimilarity(set1, set2) {
  const intersection = new Set([...set1].filter(t => set2.has(t)));
  const union = new Set([...set1, ...set2]);
  return union.size > 0 ? intersection.size / union.size : 0;
}

async function main() {
  const baseUrl = process.argv[2];
  const path1 = process.argv[3];
  const path2 = process.argv[4];
  
  if (!baseUrl || !path1 || !path2) {
    console.error('Usage: node check-similarity.mjs <BASE_URL> <PATH1> <PATH2>');
    process.exit(1);
  }
  
  const html1 = await fetchPage(baseUrl, path1);
  const html2 = await fetchPage(baseUrl, path2);
  
  const tokens1 = stripAndTokenize(html1);
  const tokens2 = stripAndTokenize(html2);
  
  const similarity = jaccardSimilarity(tokens1, tokens2);
  
  console.log(`${path1} vs ${path2}`);
  console.log(`Jaccard similarity: ${similarity.toFixed(3)}`);
  console.log(`Tokens in page 1: ${tokens1.size}`);
  console.log(`Tokens in page 2: ${tokens2.size}`);
  console.log(`Status: ${similarity < 0.40 ? 'PASS (<0.40)' : 'FAIL (>=0.40)'}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
