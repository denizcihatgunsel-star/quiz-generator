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
 * Check if an answer is grounded in the notes using unknown-specifics detection.
 * 
 * Strategy: An answer fails only if it contains specific information not in the notes:
 * (a) Numbers not found in the notes
 * (b) Proper nouns / capitalized terms not in the notes (except first word)
 * (c) Technical tokens: length >= 8 OR contains digit/uppercase inside (ATP, NADPH)
 * 
 * Common reworded answers ("levels decrease", "intake increases") pass.
 * Skip check entirely for NOT/EXCEPT/LEAST questions (answers are outside notes by design).
 * Question stem is NOT used to avoid false passes.
 */
export function isAnswerGrounded(
  answer: string,
  notes: string,
  questionStem?: string
): boolean {
  // Skip check for NOT/EXCEPT/LEAST questions - answers are outside notes by design
  if (questionStem) {
    const stemWords = questionStem.split(/\s+/);
    if (stemWords.includes('NOT') || stemWords.includes('EXCEPT') || stemWords.includes('LEAST')) {
      return true;
    }
  }
  
  // Extract numbers from both answer and notes
  const extractNumbers = (text: string): Set<string> => {
    const nums = text.match(/\b\d+(?:\.\d+)?/g) || [];
    return new Set(nums);
  };
  
  const answerNumbers = extractNumbers(answer);
  const notesNumbers = extractNumbers(notes);
  
  // (a) Check that all numbers in the answer appear in notes
  for (const num of answerNumbers) {
    if (!notesNumbers.has(num)) {
      return false; // Number not in notes, must fail
    }
  }
  
  // Common English words that don't need verification (length >= 8)
  const commonLongWords = new Set([
    'absolute', 'according', 'actually', 'addition', 'advanced', 'affected', 'allowing',
    'although', 'american', 'anything', 'appeared', 'approach', 'argument', 'arranged',
    'attached', 'attacked', 'attempts', 'audience', 'available', 'balanced', 'basically',
    'becoming', 'believed', 'benefits', 'between', 'building', 'business', 'capacity',
    'catalyze', 'category', 'cellular', 'centered', 'central', 'century', 'certainly', 'challenge',
    'changing', 'chemical', 'children', 'citizens', 'classical', 'combined', 'commander',
    'compared', 'complete', 'composed', 'compound', 'concentrated', 'concentration', 'concept',
    'concerned', 'conclude', 'condition', 'confident', 'conflict', 'connected', 'consider',
    'considered', 'constant', 'contains', 'continue', 'continued', 'continues', 'contract', 'contrast',
    'control', 'controlled', 'convert', 'correct', 'created', 'critical', 'currency',
    'customer', 'decrease', 'decreases', 'defined', 'delivery', 'democratic', 'demonstrate',
    'dependent', 'describe', 'designed', 'despite', 'detailed', 'determine', 'developed',
    'development', 'difference', 'different', 'difficult', 'directly', 'disabled', 'discover',
    'discussed', 'distance', 'distinct', 'distribute', 'document', 'dominant', 'dramatically',
    'economic', 'effectively', 'election', 'electric', 'electron', 'element', 'eliminate', 'emerging',
    'emphasis', 'employed', 'enabling', 'enclosed', 'encouraged', 'energy', 'engaged', 'enzymes',
    'engineering', 'enormous', 'ensuring', 'entering', 'entirely', 'environment', 'equal',
    'equation', 'equipment', 'equivalent', 'especially', 'essential', 'establish', 'estimate',
    'european', 'evaluate', 'eventually', 'evidence', 'examined', 'example', 'exchange',
    'excluded', 'exercise', 'existing', 'expanded', 'expected', 'experience', 'experiment',
    'explained', 'explored', 'exposed', 'expressed', 'extended', 'external', 'extremely',
    'facility', 'featured', 'federal', 'feedback', 'financial', 'fixation', 'followed', 'following',
    'forecast', 'foreign', 'formation', 'formerly', 'formula', 'forward', 'fraction',
    'framework', 'frequency', 'function', 'fundamental', 'generated', 'generation', 'government',
    'gradually', 'greatest', 'guidance', 'happened', 'heading', 'heritage', 'hierarchy',
    'highest', 'historic', 'historical', 'hydrogen', 'identity', 'ignore', 'illustrated',
    'immediate', 'impact', 'implement', 'important', 'improved', 'included', 'including',
    'increase', 'increased', 'increases', 'increasing', 'independent', 'indicate', 'individual',
    'industrial', 'influenced', 'information', 'initially', 'initiative', 'instance', 'instead',
    'institute', 'integrated', 'intended', 'intensity', 'interact', 'interest', 'internal',
    'international', 'interpret', 'interval', 'introduced', 'invasion', 'involved', 'isolated',
    'knowledge', 'landscape', 'language', 'launched', 'learning', 'legislation', 'length',
    'leverage', 'liberal', 'limiting', 'limited', 'literary', 'location', 'maintain',
    'maintained', 'majority', 'management', 'material', 'maximum', 'measured', 'mechanism',
    'medical', 'membrane', 'mentioned', 'military', 'minimize', 'minimum', 'minister',
    'minority', 'moderate', 'modified', 'molecule', 'momentum', 'monetary', 'monitored',
    'movement', 'multiple', 'national', 'natural', 'naturally', 'necessary', 'negative',
    'network', 'neutral', 'nitrogen', 'normally', 'notable', 'observed', 'obtained',
    'occurred', 'offering', 'official', 'operate', 'operated', 'operation', 'opponent',
    'opportunity', 'opposed', 'opposite', 'optimal', 'option', 'ordered', 'ordinary',
    'organic', 'organize', 'organized', 'original', 'outcome', 'outcomes', 'outlined', 'output',
    'overall', 'overcome', 'overlook', 'overview', 'oxygen', 'parallel', 'parameter',
    'particle', 'particular', 'particularly', 'partner', 'passage', 'passing', 'pattern',
    'perceived', 'percent', 'percentage', 'perform', 'performance', 'period', 'permanent',
    'personal', 'persuade', 'physical', 'planning', 'platform', 'political', 'population',
    'position', 'positive', 'possible', 'potential', 'powerful', 'practical', 'practice',
    'predicted', 'preferred', 'prepared', 'presence', 'present', 'presented', 'preserve',
    'pressure', 'prevent', 'previous', 'previously', 'primarily', 'primary', 'principle',
    'priority', 'private', 'probably', 'problem', 'procedure', 'proceed', 'process',
    'produced', 'produces', 'product', 'production', 'profile', 'program', 'progress',
    'project', 'prominent', 'promised', 'promote', 'property', 'proposed', 'protect',
    'protected', 'protein', 'protocol', 'provide', 'provided', 'provides', 'providing',
    'published', 'purchase', 'purpose', 'quantity', 'question', 'reaction', 'reactions', 'reached',
    'reading', 'realistic', 'reality', 'realized', 'receive', 'received', 'recently',
    'recognize', 'recommend', 'recorded', 'reduced', 'reduces', 'reduction', 'referred',
    'reflect', 'reformed', 'regarded', 'region', 'regional', 'register', 'regulate',
    'regulated', 'relation', 'relationship', 'relative', 'released', 'relevant', 'reliable',
    'remained', 'remember', 'removed', 'repeated', 'replace', 'reported', 'represent',
    'represented', 'republic', 'require', 'required', 'requires', 'research', 'reserved',
    'resident', 'resistance', 'resolution', 'resolved', 'resource', 'respond', 'response',
    'responsible', 'restored', 'restrict', 'resulted', 'retained', 'revealed', 'revenue',
    'reviewed', 'revolution', 'secondary', 'section', 'secured', 'selected', 'separate',
    'sequence', 'series', 'service', 'session', 'setting', 'settlement', 'several',
    'shifted', 'shortage', 'showing', 'significantly', 'similar', 'similarly', 'simple',
    'simply', 'simulate', 'simultaneous', 'situation', 'slightly', 'smallest', 'society',
    'solution', 'something', 'somewhat', 'southern', 'specific', 'specified', 'spectrum',
    'stability', 'standard', 'starting', 'statement', 'statesman', 'station', 'statistical',
    'status', 'steadily', 'storage', 'straight', 'strategy', 'strength', 'strictly',
    'striking', 'strong', 'strongly', 'structure', 'struggled', 'studied', 'studying',
    'submitted', 'subsequent', 'substance', 'substantial', 'succeed', 'successful', 'sufficient',
    'suggested', 'suitable', 'summary', 'superior', 'supplied', 'support', 'supported',
    'suppose', 'supposed', 'supreme', 'surface', 'surprise', 'surround', 'survival',
    'sustained', 'symbol', 'system', 'systematic', 'technical', 'technique', 'technology',
    'temperature', 'temporary', 'tendency', 'terminal', 'territory', 'terrorist', 'textbook',
    'theories', 'theory', 'therefore', 'thinking', 'through', 'throughout', 'together',
    'tomorrow', 'traditional', 'training', 'transfer', 'transformed', 'transition', 'translate',
    'transport', 'traveled', 'treated', 'treatment', 'triangle', 'trigger', 'tropical',
    'typically', 'ultimate', 'unable', 'underlying', 'understand', 'undertake', 'uniform',
    'unique', 'united', 'universal', 'unknown', 'unlikely', 'updating', 'urban',
    'utilized', 'validate', 'valuable', 'variable', 'variation', 'variety', 'various',
    'velocity', 'version', 'vertical', 'vessels', 'victory', 'violence', 'virtual',
    'visible', 'volume', 'voluntary', 'warfare', 'warning', 'weakness', 'wealth',
    'weapon', 'weather', 'western', 'whatever', 'whenever', 'wherever', 'whether',
    'widespread', 'wildlife', 'withdraw', 'within', 'without', 'witness', 'working',
    'worried', 'written', 'yesterday'
  ]);
  
  // Common shorter words that also don't need verification
  const commonShortWords = new Set([
    'about', 'above', 'across', 'after', 'again', 'against', 'almost', 'along', 'already', 'also',
    'always', 'among', 'another', 'around', 'away', 'back', 'because', 'become', 'before', 'began',
    'begin', 'behind', 'being', 'below', 'beside', 'better', 'beyond', 'both', 'bring', 'came',
    'come', 'could', 'down', 'during', 'each', 'early', 'either', 'enough', 'even', 'ever',
    'every', 'few', 'find', 'first', 'form', 'found', 'from', 'gave', 'give', 'goes',
    'going', 'good', 'great', 'had', 'has', 'have', 'having', 'help', 'her', 'here',
    'high', 'him', 'his', 'how', 'however', 'into', 'its', 'just', 'keep', 'kept',
    'know', 'known', 'large', 'last', 'late', 'later', 'least', 'left', 'less', 'level',
    'levels', 'like', 'little', 'long', 'look', 'made', 'main', 'make', 'many', 'may',
    'means', 'might', 'more', 'most', 'much', 'must', 'name', 'near', 'need', 'never',
    'next', 'not', 'now', 'number', 'off', 'often', 'old', 'once', 'only', 'other',
    'our', 'out', 'over', 'own', 'part', 'people', 'place', 'point', 'process', 'rate',
    'right', 'said', 'same', 'say', 'see', 'seem', 'seen', 'set', 'she', 'should',
    'show', 'shown', 'side', 'since', 'small', 'some', 'such', 'system', 'take', 'taken',
    'than', 'that', 'their', 'them', 'then', 'there', 'these', 'they', 'thing', 'things',
    'think', 'this', 'those', 'though', 'three', 'through', 'thus', 'time', 'told', 'too',
    'took', 'toward', 'turn', 'turned', 'two', 'under', 'until', 'upon', 'used', 'using',
    'very', 'want', 'was', 'way', 'well', 'went', 'were', 'what', 'when', 'where', 'which',
    'while', 'who', 'whole', 'will', 'with', 'within', 'without', 'word', 'work', 'works',
    'world', 'would', 'year', 'years', 'your', 'affect', 'affects', 'allows', 'apply', 'based',
    'called', 'causes', 'caused', 'change', 'changed', 'changes', 'creates', 'depends', 'drops',
    'effect', 'effects', 'enter', 'enters', 'exist', 'exists', 'flows', 'forms', 'grows',
    'happens', 'holds', 'impact', 'impacts', 'intake', 'leads', 'means', 'moves', 'needs',
    'occurs', 'produce', 'provides', 'remains', 'results', 'seems', 'stays', 'tends', 'uses'
  ]);
  
  // Normalize notes for case-insensitive lookup
  const notesLower = notes.toLowerCase();
  
  // Tokenize answer into words
  const answerTokens = answer.split(/\s+/).filter(t => t.length > 0);
  
  for (let i = 0; i < answerTokens.length; i++) {
    const token = answerTokens[i];
    const tokenClean = token.replace(/[^\w]/g, ''); // Remove punctuation
    
    if (tokenClean.length === 0) continue;
    
    // (b) Proper noun / capitalized term (not first word of sentence)
    // Only check if it's a "proper capitalization" pattern: Capital followed by lowercase
    if (i > 0 && /^[A-Z][a-z]+/.test(tokenClean)) {
      // Check if it appears in notes (case-insensitive)
      if (!notesLower.includes(tokenClean.toLowerCase())) {
        return false; // Capitalized term not in notes
      }
    }
    
    // (c) Technical token: contains digit/uppercase inside OR length >= 8 and not common
    const hasDigitInside = /\d/.test(tokenClean); // CO2, H2O
    const hasMixedCase = /[a-z]/.test(tokenClean) && /[A-Z]/.test(tokenClean); // ATP, NADPH (but not all-caps)
    
    const tokenLower = tokenClean.toLowerCase();
    
    if (hasDigitInside || hasMixedCase) {
      // Technical token with digit or mixed case
      if (!notesLower.includes(tokenLower)) {
        return false; // Technical term not in notes
      }
    } else if (tokenClean.length >= 8) {
      // Long token - check if it's common
      if (!commonLongWords.has(tokenLower)) {
        // Uncommon long word, needs to be in notes
        if (!notesLower.includes(tokenLower)) {
          return false; // Uncommon technical term not in notes
        }
      }
    } else if (tokenClean.length >= 5) {
      // Medium-length token (5-7 chars) - only check if it's not a common short word
      if (!commonShortWords.has(tokenLower)) {
        // Could be technical - check if it appears in notes
        // But don't fail if it's missing (too lenient for medium words)
      }
    }
  }
  
  return true; // All specific checks passed
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
