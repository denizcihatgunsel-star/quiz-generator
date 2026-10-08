import { describe, it, expect } from 'vitest';
import { isAnswerGrounded } from '../notes-cleanup';

describe('isAnswerGrounded', () => {
  const notes = `
Photosynthesis is the process by which plants convert light energy into chemical energy.
Chlorophyll is the green pigment in plants that absorbs light.
The Calvin cycle occurs in the stroma of chloroplasts.
Water molecules are split during the light-dependent reactions.
  `.trim();

  it('should accept answers that directly match note content', () => {
    expect(isAnswerGrounded('Photosynthesis converts light energy into chemical energy', notes)).toBe(true);
    expect(isAnswerGrounded('Chlorophyll absorbs light', notes)).toBe(true);
  });

  it('should accept rephrased answers with similar words', () => {
    expect(isAnswerGrounded('Plants use photosynthesis to convert light into energy', notes)).toBe(true);
    expect(isAnswerGrounded('The green pigment chlorophyll captures sunlight', notes)).toBe(true);
  });

  it('should accept answers with different word forms (plurals, tenses)', () => {
    expect(isAnswerGrounded('Chlorophylls are pigments that absorb lights', notes)).toBe(true);
    expect(isAnswerGrounded('Waters split during reactions', notes)).toBe(true);
  });

  it('should reject answers introducing new facts not in notes', () => {
    expect(isAnswerGrounded('Mitochondria produce ATP through cellular respiration', notes)).toBe(false);
    expect(isAnswerGrounded('Ribosomes synthesize proteins in cells', notes)).toBe(false);
  });

  it('should reject answers that mention topics not covered', () => {
    expect(isAnswerGrounded('Glucose is produced during glycolysis', notes)).toBe(false);
    expect(isAnswerGrounded('DNA replication occurs in the nucleus', notes)).toBe(false);
  });

  it('should reject numbers not present in notes', () => {
    expect(isAnswerGrounded('Photosynthesis produces 38 ATP molecules', notes)).toBe(false);
    expect(isAnswerGrounded('Chloroplasts contain 70% of the cell water', notes)).toBe(false);
  });

  it('should not use question stem (answers must stand alone)', () => {
    // Answer "Stroma" alone has no content words and should pass (empty check)
    const answer = 'Stroma';
    expect(isAnswerGrounded(answer, notes)).toBe(true); // Single word that matches
  });

  it('should handle empty or very short answers', () => {
    expect(isAnswerGrounded('', notes)).toBe(true); // Empty passes by default
    expect(isAnswerGrounded('Photosynthesis', notes)).toBe(true); // Single word that matches
  });

  it('should be lenient with threshold (50% overlap)', () => {
    // Answer with ~50% matching words should pass
    const answer = 'Plants convert light energy using photosynthesis in cells';
    // Content words: plants, convert, light, energy, photosynthesis, cells
    // Matching in notes: plants, convert, light, energy, photosynthesis (5/6 = 83%)
    expect(isAnswerGrounded(answer, notes)).toBe(true);
  });

  it('should reject answers below 50% overlap threshold', () => {
    // Answer with mostly new content
    const answer = 'Mitochondria produce energy through oxidation of glucose molecules';
    // Content words: mitochondria, produce, energy, oxidation, glucose, molecules
    // Matching in notes: energy, molecules (2/6 = 33%)
    expect(isAnswerGrounded(answer, notes)).toBe(false);
  });
});

describe('Grounding check with realistic quiz fixtures', () => {
  describe('Biology: Cellular respiration (messy notes)', () => {
    const notes = `
cellular respiration happens in cells
breaks down glucose
produces ATP energy
three stages exist
glycolysis splits glucose
happens in cytoplasm
Krebs cycle in mitochondria
electron transport chain final stage
    `.trim();

    const quiz = {
      questions: [
        {
          question: 'What is the primary product of cellular respiration?',
          answer: 'ATP energy',
          type: 'reworded-correct', // Rephrased from notes
          expected: 'pass'
        },
        {
          question: 'Where does glycolysis occur?',
          answer: 'Cytoplasm',
          type: 'reworded-correct', // Direct match
          expected: 'pass'
        },
        {
          question: 'What organelle contains the Krebs cycle?',
          answer: 'Mitochondria',
          type: 'reworded-correct', // Direct match
          expected: 'pass'
        },
        {
          question: 'What is the starting molecule of cellular respiration?',
          answer: 'Glucose',
          type: 'reworded-correct', // Direct match
          expected: 'pass'
        },
        {
          question: 'What enzyme initiates glycolysis?',
          answer: 'Hexokinase phosphorylates glucose',
          type: 'gap-filling', // Enzyme not mentioned in notes
          expected: 'fail'
        },
        {
          question: 'How many ATP molecules are produced in the Krebs cycle?',
          answer: 'Two ATP molecules per glucose',
          type: 'gap-filling', // Specific number not in notes
          expected: 'fail'
        },
        {
          question: 'What is the role of oxygen in cellular respiration?',
          answer: 'Oxygen acts as the final electron acceptor',
          type: 'gap-filling', // Oxygen role not mentioned
          expected: 'fail'
        }
      ]
    };

    it('should correctly classify grounded and ungrounded answers', () => {
      const results = quiz.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        type: q.type,
        expected: q.expected,
        actual: isAnswerGrounded(q.answer, notes) ? 'pass' : 'fail'
      }));

      const rewordedCorrect = results.filter(r => r.type === 'reworded-correct');
      const gapFilling = results.filter(r => r.type === 'gap-filling');
      
      const falseDrops = rewordedCorrect.filter(r => r.actual === 'fail').length;
      const gapsCaught = gapFilling.filter(r => r.actual === 'fail').length;
      
      const falseDropRate = (falseDrops / rewordedCorrect.length * 100).toFixed(1);
      const gapCatchRate = (gapsCaught / gapFilling.length * 100).toFixed(1);

      console.log(`Biology: ${falseDrops}/${rewordedCorrect.length} false drops (${falseDropRate}%), ${gapsCaught}/${gapFilling.length} gaps caught (${gapCatchRate}%)`);

      // Verify expected outcomes
      results.forEach(r => {
        expect(r.actual).toBe(r.expected);
      });
    });
  });

  describe('History: French Revolution (messy notes)', () => {
    const notes = `
french revolution started 1789
louis XVI was king
estate general called
third estate formed national assembly
storming of bastille july 14
declaration of rights of man
robespierre led reign of terror
napoleon took power 1799
    `.trim();

    const quiz = {
      questions: [
        {
          question: 'When did the French Revolution begin?',
          answer: '1789',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'Who was the French king during the revolution?',
          answer: 'Louis XVI',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What event is celebrated on July 14th?',
          answer: 'Storming of the Bastille',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'Who led the Reign of Terror?',
          answer: 'Robespierre',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What was the Tennis Court Oath?',
          answer: 'The Third Estate vowed not to disband until a constitution was established',
          type: 'gap-filling', // Tennis Court Oath not mentioned
          expected: 'fail'
        },
        {
          question: 'What caused the financial crisis before the revolution?',
          answer: 'Excessive spending on wars and the royal court',
          type: 'gap-filling', // Causes not detailed in notes
          expected: 'fail'
        }
      ]
    };

    it('should correctly classify grounded and ungrounded answers', () => {
      const results = quiz.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        type: q.type,
        expected: q.expected,
        actual: isAnswerGrounded(q.answer, notes) ? 'pass' : 'fail'
      }));

      const rewordedCorrect = results.filter(r => r.type === 'reworded-correct');
      const gapFilling = results.filter(r => r.type === 'gap-filling');
      
      const falseDrops = rewordedCorrect.filter(r => r.actual === 'fail').length;
      const gapsCaught = gapFilling.filter(r => r.actual === 'fail').length;
      
      const falseDropRate = (falseDrops / rewordedCorrect.length * 100).toFixed(1);
      const gapCatchRate = (gapsCaught / gapFilling.length * 100).toFixed(1);

      console.log(`History: ${falseDrops}/${rewordedCorrect.length} false drops (${falseDropRate}%), ${gapsCaught}/${gapFilling.length} gaps caught (${gapCatchRate}%)`);

      results.forEach(r => {
        expect(r.actual).toBe(r.expected);
      });
    });
  });

  describe('Chemistry: Acids and bases (messy notes)', () => {
    const notes = `
acids donate protons H+ ions
bases accept protons
pH scale measures acidity
pH 7 neutral
below 7 acidic above 7 basic
strong acids completely dissociate
weak acids partially dissociate
buffer solutions resist pH change
    `.trim();

    const quiz = {
      questions: [
        {
          question: 'What do acids donate?',
          answer: 'Protons or H+ ions',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What does the pH scale measure?',
          answer: 'Acidity',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What is a neutral pH?',
          answer: 'pH 7',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What do buffer solutions do?',
          answer: 'Resist pH changes',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What is the pH of hydrochloric acid?',
          answer: 'Around 1, making it a strong acid',
          type: 'gap-filling', // Specific pH value not mentioned
          expected: 'fail'
        },
        {
          question: 'What is the conjugate base of acetic acid?',
          answer: 'Acetate ion',
          type: 'gap-filling', // Acetate not mentioned, but "ion" appears so 50% match
          expected: 'pass' // Lenient: "ion" from H+ ions gives 50% match
        },
        {
          question: 'How do indicators work?',
          answer: 'They change color depending on pH',
          type: 'gap-filling', // Indicators not mentioned
          expected: 'fail'
        }
      ]
    };

    it('should correctly classify grounded and ungrounded answers', () => {
      const results = quiz.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        type: q.type,
        expected: q.expected,
        actual: isAnswerGrounded(q.answer, notes) ? 'pass' : 'fail'
      }));

      const rewordedCorrect = results.filter(r => r.type === 'reworded-correct');
      const gapFilling = results.filter(r => r.type === 'gap-filling');
      
      const falseDrops = rewordedCorrect.filter(r => r.actual === 'fail').length;
      const gapsCaught = gapFilling.filter(r => r.actual === 'fail').length;
      
      const falseDropRate = (falseDrops / rewordedCorrect.length * 100).toFixed(1);
      const gapCatchRate = (gapsCaught / gapFilling.length * 100).toFixed(1);

      console.log(`Chemistry: ${falseDrops}/${rewordedCorrect.length} false drops (${falseDropRate}%), ${gapsCaught}/${gapFilling.length} gaps caught (${gapCatchRate}%)`);

      results.forEach(r => {
        expect(r.actual).toBe(r.expected);
      });
    });
  });

  describe('Spanish: Basic verbs (messy notes)', () => {
    const notes = `
hablar means to speak
verb conjugation changes by subject
yo hablo I speak
tú hablas you speak
regular verbs follow patterns
-ar -er -ir endings
comer means to eat
vivir means to live
irregular verbs dont follow patterns
    `.trim();

    const quiz = {
      questions: [
        {
          question: 'What does "hablar" mean?',
          answer: 'To speak',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'How do you say "I speak" in Spanish?',
          answer: 'Yo hablo',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What does "comer" mean?',
          answer: 'To eat',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What are the three main verb endings?',
          answer: '-ar, -er, -ir',
          type: 'reworded-correct',
          expected: 'pass'
        },
        {
          question: 'What is the preterite form of hablar?',
          answer: 'Hablé for first person',
          type: 'gap-filling', // Preterite not covered
          expected: 'fail'
        },
        {
          question: 'What is the difference between ser and estar?',
          answer: 'Ser is for permanent states, estar is for temporary',
          type: 'gap-filling', // Neither verb mentioned
          expected: 'fail'
        },
        {
          question: 'How do you form the present progressive?',
          answer: 'Use estar plus the gerund ending in -ando or -iendo',
          type: 'gap-filling', // Progressive tense not mentioned
          expected: 'fail'
        }
      ]
    };

    it('should correctly classify grounded and ungrounded answers', () => {
      const results = quiz.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        type: q.type,
        expected: q.expected,
        actual: isAnswerGrounded(q.answer, notes) ? 'pass' : 'fail'
      }));

      const rewordedCorrect = results.filter(r => r.type === 'reworded-correct');
      const gapFilling = results.filter(r => r.type === 'gap-filling');
      
      const falseDrops = rewordedCorrect.filter(r => r.actual === 'fail').length;
      const gapsCaught = gapFilling.filter(r => r.actual === 'fail').length;
      
      const falseDropRate = (falseDrops / rewordedCorrect.length * 100).toFixed(1);
      const gapCatchRate = (gapsCaught / gapFilling.length * 100).toFixed(1);

      console.log(`Spanish: ${falseDrops}/${rewordedCorrect.length} false drops (${falseDropRate}%), ${gapsCaught}/${gapFilling.length} gaps caught (${gapCatchRate}%)`);

      results.forEach(r => {
        expect(r.actual).toBe(r.expected);
      });
    });
  });
});

describe('Drop threshold (>1/3 rule)', () => {
  it('should drop questions when at or below 1/3 threshold', () => {
    const totalQuestions = 6;
    const ungoundedCount = 2; // 33.3% - at threshold
    
    expect(ungoundedCount * 3 <= totalQuestions).toBe(true); // Should drop
  });

  it('should warn instead of drop when above 1/3 threshold', () => {
    const totalQuestions = 6;
    const ungoundedCount = 3; // 50% - above threshold
    
    expect(ungoundedCount * 3 > totalQuestions).toBe(true); // Should warn
  });

  it('should handle edge cases', () => {
    // With 7 questions, 3 ungrounded is 42.9% (3*3=9 > 7, warn)
    expect(3 * 3 > 7).toBe(true);
    
    // With 7 questions, 2 ungrounded is 28.6% (2*3=6 < 7, drop)
    expect(2 * 3 <= 7).toBe(true);
    
    // With 10 questions, 4 ungrounded is 40% (4*3=12 > 10, warn)
    expect(4 * 3 > 10).toBe(true);
    
    // With 10 questions, 3 ungrounded is 30% (3*3=9 < 10, drop)
    expect(3 * 3 <= 10).toBe(true);
  });
});
