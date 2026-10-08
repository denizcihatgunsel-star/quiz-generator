import { describe, it, expect } from 'vitest';
import { detectNewContent, detectGaps } from '../notes-cleanup';

describe('detectNewContent', () => {
  it('should pass when only rephrasing existing content', () => {
    const original = 'The water cycle includes evaporation condensation and precipitation';
    const cleaned = 'The water cycle includes evaporation, condensation, and precipitation.';
    
    const result = detectNewContent(original, cleaned);
    
    expect(result.passedCheck).toBe(true);
    expect(result.suspiciousSentences).toHaveLength(0);
  });

  it('should flag sentences with many new words', () => {
    const original = 'The water cycle has three stages';
    const cleaned = 'The water cycle has three stages. Photosynthesis is the process by which plants convert sunlight into energy using chlorophyll.';
    
    const result = detectNewContent(original, cleaned);
    
    expect(result.passedCheck).toBe(false);
    expect(result.suspiciousSentences.length).toBeGreaterThan(0);
    expect(result.suspiciousWords).toContain('photosynthesi'); // stemmed (removes 's')
  });

  it('should handle plurals and verb forms', () => {
    const original = 'The plant grows in sunlight. Plants need water.';
    const cleaned = 'Plants grow in sunlight and need water.';
    
    const result = detectNewContent(original, cleaned);
    
    // Should pass - all words are variations of original words
    expect(result.passedCheck).toBe(true);
  });

  it('should handle empty and short texts', () => {
    const original = '';
    const cleaned = 'Some new content';
    
    const result = detectNewContent(original, cleaned);
    
    expect(result.passedCheck).toBe(false);
  });

  it('should ignore stop words', () => {
    const original = 'water evaporates';
    const cleaned = 'The water is evaporating and the process continues';
    
    const result = detectNewContent(original, cleaned);
    
    // "process" and "continues" are new (stemmed to "proces" and "continu")
    expect(result.passedCheck).toBe(false);
    expect(result.suspiciousWords).toContain('proces'); // stemmed
  });

  it('should pass when adding structure without new facts', () => {
    const original = 'evaporation sun heats water condensation vapor cools precipitation water falls';
    const cleaned = `# Water Cycle

## Evaporation
The sun heats the water.

## Condensation
The vapor cools.

## Precipitation
Water falls.`;
    
    const result = detectNewContent(original, cleaned);
    
    expect(result.passedCheck).toBe(true);
  });
});

describe('detectGaps', () => {
  it('should detect numbered list gaps', () => {
    const text = `Steps:
1. First step
2. Second step
4. Fourth step`;
    
    const gaps = detectGaps(text);
    
    expect(gaps).toContain('Numbered list jumps from 2 to 4');
  });

  it('should detect undefined terms', () => {
    const text = 'The Process involves multiple stages. The Mechanism is complex. The Algorithm works well.';
    
    const gaps = detectGaps(text);
    
    // Should detect that Process, Mechanism, Algorithm are referenced but not defined
    expect(gaps.length).toBeGreaterThan(0);
    expect(gaps.some(g => g.toLowerCase().includes('term'))).toBe(true);
  });

  it('should not flag defined terms', () => {
    const text = 'Photosynthesis is the process of converting light to energy. The Photosynthesis occurs in chloroplasts.';
    
    const gaps = detectGaps(text);
    
    // Photosynthesis is defined, so should not be flagged
    expect(gaps.some(g => g.includes('Photosynthesis'))).toBe(false);
  });

  it('should detect mentioned but not shown steps', () => {
    const text = 'As mentioned in step 3, the reaction occurs. Step 5 is important.';
    
    const gaps = detectGaps(text);
    
    expect(gaps).toContain('Step 3 is mentioned but not shown');
    expect(gaps).toContain('Step 5 is mentioned but not shown');
  });

  it('should not flag steps that are shown', () => {
    const text = `1. First step as shown here
2. Second step
See step 2 for details`;
    
    const gaps = detectGaps(text);
    
    expect(gaps.some(g => g.includes('Step 2'))).toBe(false);
  });

  it('should handle text with no gaps', () => {
    const text = `Water Cycle

1. Heat water
2. Vapor rises
3. Clouds form

Evaporation is when water turns to vapor.
Evaporation happens due to heat.`;
    
    const gaps = detectGaps(text);
    
    expect(gaps).toHaveLength(0);
  });
});
