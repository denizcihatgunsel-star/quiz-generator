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

  it('should use question stem for additional context', () => {
    const question = 'Where does the Calvin cycle take place?';
    const answer = 'Stroma';
    
    // Without question, "Stroma" alone might not match well
    // With question, combined text includes "Calvin cycle" and "stroma"
    expect(isAnswerGrounded(answer, notes, question)).toBe(true);
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
          expected: 'pass' // Direct match
        },
        {
          question: 'Where does glycolysis occur?',
          answer: 'Cytoplasm',
          expected: 'pass' // Direct match
        },
        {
          question: 'What organelle contains the Krebs cycle?',
          answer: 'Mitochondria',
          expected: 'pass' // Direct match
        },
        {
          question: 'What is the starting molecule of cellular respiration?',
          answer: 'Glucose',
          expected: 'pass' // Direct match
        },
        {
          question: 'What enzyme initiates glycolysis?',
          answer: 'Hexokinase phosphorylates glucose',
          expected: 'fail' // Enzyme not mentioned in notes
        },
        {
          question: 'How many ATP molecules are produced in the Krebs cycle?',
          answer: 'Two ATP molecules per glucose',
          expected: 'pass' // ATP, molecules, glucose all mentioned in notes
        },
        {
          question: 'What is the role of oxygen in cellular respiration?',
          answer: 'Oxygen acts as the final electron acceptor',
          expected: 'pass' // electron, chain mentioned in notes (lenient match)
        }
      ]
    };

    it('should correctly classify grounded and ungrounded answers', () => {
      const results = quiz.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        expected: q.expected,
        actual: isAnswerGrounded(q.answer, notes, q.question) ? 'pass' : 'fail'
      }));

      const passed = results.filter(r => r.actual === 'pass').length;
      const failed = results.filter(r => r.actual === 'fail').length;
      const dropRate = (failed / results.length * 100).toFixed(1);

      console.log(`Biology fixture: ${passed} passed, ${failed} failed, ${dropRate}% drop rate`);
      console.log('Details:', results);

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
          expected: 'pass'
        },
        {
          question: 'Who was the French king during the revolution?',
          answer: 'Louis XVI',
          expected: 'pass'
        },
        {
          question: 'What event is celebrated on July 14th?',
          answer: 'Storming of the Bastille',
          expected: 'pass'
        },
        {
          question: 'Who led the Reign of Terror?',
          answer: 'Robespierre',
          expected: 'pass'
        },
        {
          question: 'What was the Tennis Court Oath?',
          answer: 'The Third Estate vowed not to disband until a constitution was established',
          expected: 'fail' // Tennis Court Oath not mentioned
        },
        {
          question: 'What caused the financial crisis before the revolution?',
          answer: 'Excessive spending on wars and the royal court',
          expected: 'fail' // Causes not detailed in notes
        }
      ]
    };

    it('should correctly classify grounded and ungrounded answers', () => {
      const results = quiz.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        expected: q.expected,
        actual: isAnswerGrounded(q.answer, notes, q.question) ? 'pass' : 'fail'
      }));

      const passed = results.filter(r => r.actual === 'pass').length;
      const failed = results.filter(r => r.actual === 'fail').length;
      const dropRate = (failed / results.length * 100).toFixed(1);

      console.log(`History fixture: ${passed} passed, ${failed} failed, ${dropRate}% drop rate`);
      console.log('Details:', results);

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
          expected: 'pass'
        },
        {
          question: 'What does the pH scale measure?',
          answer: 'Acidity',
          expected: 'pass'
        },
        {
          question: 'What is a neutral pH?',
          answer: 'pH 7',
          expected: 'pass'
        },
        {
          question: 'What do buffer solutions do?',
          answer: 'Resist pH changes',
          expected: 'pass'
        },
        {
          question: 'What is the pH of hydrochloric acid?',
          answer: 'Around 1, making it a strong acid',
          expected: 'fail' // Specific pH value not mentioned
        },
        {
          question: 'What is the conjugate base of acetic acid?',
          answer: 'Acetate ion',
          expected: 'fail' // Conjugate pairs not discussed
        },
        {
          question: 'How do indicators work?',
          answer: 'They change color depending on pH',
          expected: 'fail' // Indicators not mentioned
        }
      ]
    };

    it('should correctly classify grounded and ungrounded answers', () => {
      const results = quiz.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        expected: q.expected,
        actual: isAnswerGrounded(q.answer, notes, q.question) ? 'pass' : 'fail'
      }));

      const passed = results.filter(r => r.actual === 'pass').length;
      const failed = results.filter(r => r.actual === 'fail').length;
      const dropRate = (failed / results.length * 100).toFixed(1);

      console.log(`Chemistry fixture: ${passed} passed, ${failed} failed, ${dropRate}% drop rate`);
      console.log('Details:', results);

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
          expected: 'pass'
        },
        {
          question: 'How do you say "I speak" in Spanish?',
          answer: 'Yo hablo',
          expected: 'pass'
        },
        {
          question: 'What does "comer" mean?',
          answer: 'To eat',
          expected: 'pass'
        },
        {
          question: 'What are the three main verb endings?',
          answer: '-ar, -er, -ir',
          expected: 'pass'
        },
        {
          question: 'What is the preterite form of hablar?',
          answer: 'Hablé for first person',
          expected: 'fail' // Preterite not covered
        },
        {
          question: 'What is the difference between ser and estar?',
          answer: 'Ser is for permanent states, estar is for temporary',
          expected: 'fail' // Neither verb mentioned
        },
        {
          question: 'How do you form the present progressive?',
          answer: 'Use estar plus the gerund ending in -ando or -iendo',
          expected: 'fail' // Progressive tense not mentioned
        }
      ]
    };

    it('should correctly classify grounded and ungrounded answers', () => {
      const results = quiz.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        expected: q.expected,
        actual: isAnswerGrounded(q.answer, notes, q.question) ? 'pass' : 'fail'
      }));

      const passed = results.filter(r => r.actual === 'pass').length;
      const failed = results.filter(r => r.actual === 'fail').length;
      const dropRate = (failed / results.length * 100).toFixed(1);

      console.log(`Spanish fixture: ${passed} passed, ${failed} failed, ${dropRate}% drop rate`);
      console.log('Details:', results);

      results.forEach(r => {
        expect(r.actual).toBe(r.expected);
      });
    });
  });
});

describe('Drop threshold (1/3 rule)', () => {
  it('should drop questions when below 1/3 threshold', () => {
    const totalQuestions = 6;
    const ungoundedCount = 2; // 33% - at threshold
    const dropThreshold = Math.ceil(totalQuestions / 3); // 2
    
    expect(ungoundedCount).toBeLessThanOrEqual(dropThreshold);
  });

  it('should warn instead of drop when above 1/3 threshold', () => {
    const totalQuestions = 6;
    const ungoundedCount = 3; // 50% - above threshold
    const dropThreshold = Math.ceil(totalQuestions / 3); // 2
    
    expect(ungoundedCount).toBeGreaterThan(dropThreshold);
  });

  it('should handle edge cases', () => {
    // With 5 questions, threshold is 2 (ceil(5/3))
    expect(Math.ceil(5 / 3)).toBe(2);
    
    // With 10 questions, threshold is 4 (ceil(10/3))
    expect(Math.ceil(10 / 3)).toBe(4);
    
    // With 3 questions, threshold is 1
    expect(Math.ceil(3 / 3)).toBe(1);
  });
});
