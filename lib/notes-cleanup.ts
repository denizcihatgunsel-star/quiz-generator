/**
 * Notes cleanup utilities
 * 
 * The cleanup process:
 * 1. Rephrases and reorganizes user-pasted notes
 * 2. Fixes grammar, merges fragments, adds structure (headings/bullets)
 * 3. MUST NOT add facts, definitions, examples, or numbers not in the source
 * 4. Flags gaps instead of filling them
 */

/**
 * Check if an answer is grounded in the notes using word overlap.
 * 
 * Strategy: Extract content words from the answer and notes, apply stemming,
 * and check if enough of the answer's words appear in the notes.
 * 
 * Numbers (digits, years, percentages) must appear literally in the notes.
 * Question stem is NOT used to avoid false passes.
 */
export function isAnswerGrounded(
  answer: string,
  notes: string
): boolean {
  // Normalize: lowercase, remove punctuation except hyphens and digits
  const normalize = (text: string) => 
    text.toLowerCase().replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extract numbers (including years, percentages) from answer
  const answerNumbers = answer.match(/\b\d+(?:\.\d+)?%?\b/g) || [];
  
  // Check that all numbers in the answer appear literally in notes
  const normalizedNotes = normalize(notes);
  for (const num of answerNumbers) {
    if (!normalizedNotes.includes(num.toLowerCase())) {
      return false; // Number not in notes, must fail
    }
  }
  
  // Extract words, filter common stop words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'them', 'their', 'what', 'which', 'who', 'when', 'where', 'why', 'how'
  ]);
  
  const extractContentWords = (text: string): Set<string> => {
    const normalized = normalize(text);
    const words = normalized.split(/\s+/);
    return new Set(
      words
        .filter(w => w.length > 2 && !stopWords.has(w) && !/^\d+$/.test(w)) // Exclude pure numbers
        .map(w => {
          // Simple stemming: remove common suffixes
          return w
            .replace(/ies$/, 'y')
            .replace(/es$/, '')
            .replace(/s$/, '')
            .replace(/ed$/, '')
            .replace(/ing$/, '');
        })
    );
  };
  
  const answerWords = extractContentWords(answer);
  const notesWords = extractContentWords(notes);
  
  if (answerWords.size === 0) return true; // Empty answer, pass by default
  
  // Very short answers (1-2 words) pass if at least one word matches
  if (answerWords.size <= 2 && answerWords.size > 0) {
    const matchedWords = Array.from(answerWords).filter(w => notesWords.has(w));
    return matchedWords.length > 0;
  }
  
  // Count how many answer words appear in notes
  const matchedWords = Array.from(answerWords).filter(w => notesWords.has(w));
  const overlapRatio = matchedWords.length / answerWords.size;
  
  // Lenient threshold: 50% word overlap (allows for rewording)
  return overlapRatio >= 0.5;
}

/**
 * Post-check heuristic to detect if new content was added.
 * 
 * Strategy: Extract "content words" (nouns, verbs, adjectives, numbers) from both
 * original and cleaned text. If cleaned text contains many content words not present
 * in the original (beyond expected variations like plurals), flag those sentences.
 * 
 * This is a simple heuristic and won't catch everything, but it's cheap and fast.
 */
export function detectNewContent(original: string, cleaned: string): {
  passedCheck: boolean;
  suspiciousSentences: string[];
  suspiciousWords: string[];
} {
  // Normalize: lowercase, remove punctuation except hyphens
  const normalize = (text: string) => 
    text.toLowerCase().replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extract words, filter common stop words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'them', 'their', 'what', 'which', 'who', 'when', 'where', 'why', 'how'
  ]);
  
  const extractContentWords = (text: string): Set<string> => {
    const normalized = normalize(text);
    const words = normalized.split(/\s+/);
    return new Set(
      words
        .filter(w => w.length > 2 && !stopWords.has(w))
        .map(w => {
          // Simple stemming: remove common suffixes
          return w
            .replace(/ies$/, 'y')
            .replace(/es$/, '')
            .replace(/s$/, '')
            .replace(/ed$/, '')
            .replace(/ing$/, '');
        })
    );
  };
  
  const originalWords = extractContentWords(original);
  const cleanedWords = extractContentWords(cleaned);
  
  // Find words in cleaned that aren't in original
  const newWords = Array.from(cleanedWords).filter(w => !originalWords.has(w));
  
  // Split cleaned text into sentences
  const sentences = cleaned
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  const suspiciousSentences: string[] = [];
  const suspiciousWords: string[] = [];
  
  // Check each sentence: if more than 40% of its content words are "new", flag it
  for (const sentence of sentences) {
    const sentenceWords = extractContentWords(sentence);
    const sentenceNewWords = Array.from(sentenceWords).filter(w => newWords.includes(w));
    
    if (sentenceWords.size > 0 && sentenceNewWords.length / sentenceWords.size > 0.4) {
      suspiciousSentences.push(sentence);
      suspiciousWords.push(...sentenceNewWords);
    }
  }
  
  return {
    passedCheck: suspiciousSentences.length === 0,
    suspiciousSentences: [...new Set(suspiciousSentences)],
    suspiciousWords: [...new Set(suspiciousWords)]
  };
}

/**
 * Detect potential gaps in the notes that the user should be aware of.
 * 
 * This looks for patterns that suggest missing information:
 * - References to undefined terms (e.g., "the process" without defining what process)
 * - Numbered lists with gaps (1, 2, 4...)
 * - Mentions of "step X" without showing step X
 */
export function detectGaps(text: string): string[] {
  const gaps: string[] = [];
  
  // Check for numbered list gaps
  const numberMatches = [...text.matchAll(/(?:^|\n)\s*(\d+)[.)]\s/gm)];
  if (numberMatches.length > 1) {
    const numbers = numberMatches.map(m => parseInt(m[1]));
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== numbers[i - 1] + 1) {
        gaps.push(`Numbered list jumps from ${numbers[i - 1]} to ${numbers[i]}`);
      }
    }
  }
  
  // Check for undefined references (heuristic: "the X" or "The X" where X is capitalized and never defined)
  const undefinedTerms = new Set<string>();
  const definedTerms = new Set<string>();
  
  // Find definitions (simple pattern: "X is/are/means")
  const definitions = text.matchAll(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:is|are|means|refers to|involves|works)\b/gi);
  for (const match of definitions) {
    definedTerms.add(match[1].toLowerCase());
  }
  
  // Find references (pattern: "the X" or "The X" where X is capitalized)
  const references = text.matchAll(/\b[Tt]he\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g);
  for (const match of references) {
    const term = match[1].toLowerCase();
    if (!definedTerms.has(term) && term.length > 3) {
      undefinedTerms.add(match[1]);
    }
  }
  
  if (undefinedTerms.size > 0) {
    const terms = Array.from(undefinedTerms).slice(0, 3);
    gaps.push(`Terms used but not defined: ${terms.join(', ')}`);
  }
  
  // Check for mentions of steps without showing them
  const stepMentions = [...text.matchAll(/step\s+(\d+)/gi)];
  const mentionedSteps = new Set(stepMentions.map(m => parseInt(m[1])));
  const shownSteps = new Set([...text.matchAll(/(?:^|\n)\s*(?:step\s+)?(\d+)[.)]\s/gim)].map(m => parseInt(m[1])));
  
  for (const step of mentionedSteps) {
    if (!shownSteps.has(step)) {
      gaps.push(`Step ${step} is mentioned but not shown`);
    }
  }
  
  return gaps;
}
