/**
 * Combo pages for Spanish subject hub
 */
import type { ComboData } from "./types";

export const SPANISH_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "spanish flashcards",
      monthlyVolume: 4400,
    },
    h1: "Spanish Flashcards — Master Vocabulary and Grammar",
    intro:
      "Accelerate Spanish learning with AI-generated flashcards covering vocabulary, verb conjugations, grammar rules, and common phrases. Each card includes the Spanish term, English translation, example sentences, and usage notes. Perfect for building vocabulary for AP Spanish, travel preparation, or general language fluency.",
    sampleItems: [
      {
        q: "Hablar (verb)",
        a: "To speak, to talk. Present: hablo, hablas, habla, hablamos, habláis, hablan. Example: Yo hablo español. (I speak Spanish.) Usage: Regular -ar verb.",
        explanation:
          "Hablar is one of the most common regular -ar verbs. Master its conjugation pattern and you'll know how to conjugate hundreds of similar verbs.",
        bloomLevel: "Remember",
      },
      {
        q: "¿Cómo estás?",
        a: "How are you? (informal). Response: Estoy bien, gracias. (I'm well, thanks.) Context: Use with friends, family, peers. Formal version: ¿Cómo está?",
        explanation:
          "One of the first phrases learners master. Remember: 'estás' (informal you) vs 'está' (formal you, or he/she/it is).",
        bloomLevel: "Remember",
      },
      {
        q: "Tener (verb)",
        a: "To have. Present: tengo, tienes, tiene, tenemos, tenéis, tienen. Example: Tengo hambre. (I'm hungry—literally 'I have hunger'). Type: Irregular verb.",
        explanation:
          "Tener is irregular and extremely common. Many idiomatic expressions use tener: tener sed (to be thirsty), tener razón (to be right), tener miedo (to be afraid).",
        bloomLevel: "Remember",
      },
      {
        q: "La casa",
        a: "The house (feminine). Plural: las casas. Example: Mi casa es grande. (My house is big.) Related: el hogar (home).",
        explanation:
          "Casa is feminine, so use 'la' (the) and 'una' (a/an). Most nouns ending in -a are feminine, though there are exceptions (el día = the day).",
        bloomLevel: "Remember",
      },
      {
        q: "Estar (verb)",
        a: "To be (location, temporary states). Present: estoy, estás, está, estamos, estáis, están. Example: Estoy en la escuela. (I'm at school.) Compare: ser (permanent).",
        explanation:
          "Estar vs ser is crucial. Estar = location and temporary conditions (estoy cansado = I'm tired). Ser = identity and permanent traits (soy estudiante = I'm a student).",
        bloomLevel: "Understand",
      },
      {
        q: "Ayer",
        a: "Yesterday. Example: Ayer fui al cine. (Yesterday I went to the movies.) Related: hoy (today), mañana (tomorrow).",
        explanation:
          "Time expressions are essential for discussing when events occur. Ayer triggers past tense (preterite or imperfect) in Spanish.",
        bloomLevel: "Remember",
      },
      {
        q: "Poder (verb)",
        a: "To be able to, can. Present: puedo, puedes, puede, podemos, podéis, pueden. Example: No puedo ir. (I can't go.) Type: Stem-changing verb (o→ue).",
        explanation:
          "Poder is a stem-changing verb where 'o' becomes 'ue' in most conjugations (except nosotros/vosotros). Common in requests: ¿Puedes ayudarme? (Can you help me?)",
        bloomLevel: "Remember",
      },
      {
        q: "Porque / Por qué",
        a: "Porque = because (one word). Por qué = why (two words). Example: ¿Por qué estudias? Porque quiero aprender. (Why do you study? Because I want to learn.)",
        explanation:
          "Common confusion point. Question = two words with accent (por qué). Answer = one word, no accent (porque). Also: por que (for which), porqué (noun: the reason).",
        bloomLevel: "Understand",
      },
      {
        q: "Hacer (verb)",
        a: "To make, to do. Present: hago, haces, hace, hacemos, hacéis, hacen. Example: Hago mi tarea. (I do my homework.) Irregular first person: yo hago.",
        explanation:
          "Hacer is irregular in first person (hago, not *haco). Also used for weather: Hace frío (It's cold), Hace sol (It's sunny).",
        bloomLevel: "Remember",
      },
      {
        q: "Gustar (verb structure)",
        a: "To like (literally 'to be pleasing to'). Structure: Me gusta/gustan. Example: Me gusta el café. (I like coffee.) Me gustan los libros. (I like books.)",
        explanation:
          "Gustar uses indirect object pronouns and reverse structure. 'I like coffee' = 'Coffee is pleasing to me' (Me gusta). Singular gusta / plural gustan based on the thing liked.",
        bloomLevel: "Understand",
      },
      {
        q: "El tiempo",
        a: "Time OR weather (context-dependent). Time: No tengo tiempo. (I don't have time.) Weather: ¿Qué tiempo hace? (What's the weather like?) Related: la vez (occasion).",
        explanation:
          "Tiempo is one of many Spanish words with multiple meanings. Context determines whether it means time, weather, or era/period.",
        bloomLevel: "Understand",
      },
      {
        q: "Preterite vs Imperfect",
        a: "Preterite: completed past actions (fui = I went—done, specific time). Imperfect: ongoing/habitual past (iba = I was going/used to go). Trigger: ayer=pret, siempre=imp.",
        explanation:
          "Choosing preterite vs imperfect is one of the hardest Spanish concepts. Preterite = completed actions with clear beginning/end. Imperfect = background, habits, descriptions in past.",
        bloomLevel: "Analyze",
      },
    ],
    topicsCovered: [
      "Basic vocabulary (200+ common words)",
      "Present tense verb conjugations",
      "Preterite and imperfect tenses",
      "Subjunctive mood",
      "Common idiomatic expressions",
      "Question words and formation",
      "Adjective agreement",
      "Prepositions and pronouns",
      "Everyday conversational phrases",
      "Cultural context notes",
    ],
    studyTips: {
      workflow: [
        "Study 10-15 new Spanish cards daily, focusing on pronunciation as you review each term",
        "Group cards by theme (food vocabulary, -ar verbs, travel phrases) to build contextual connections",
        "Test yourself by covering the English side and recalling the Spanish, then vice versa for both directions of fluency",
      ],
      tips: [
        "Say each Spanish word aloud when studying—connecting sound to meaning improves retention dramatically",
        "Create sentences using new vocabulary words within 24 hours of learning them to move words into active vocabulary",
        "Link Spanish words to images or personal associations rather than just English translations to think in Spanish",
      ],
    },
    faq: [
      {
        q: "What Spanish proficiency level are these flashcards for?",
        a: "Flashcards work for all levels from beginner through advanced. Create cards at your specific level by uploading your course material, textbook chapter, or vocabulary list.",
      },
      {
        q: "Do flashcards include verb conjugations?",
        a: "Yes. Verb cards show all present tense conjugations plus examples. You can also generate dedicated conjugation drills for any tense (preterite, imperfect, subjunctive).",
      },
      {
        q: "Can I hear pronunciations?",
        a: "The flashcards show written Spanish with pronunciation guides. For audio, use alongside a pronunciation app or your textbook's audio resources.",
      },
      {
        q: "Is this good for AP Spanish preparation?",
        a: "Yes. Generate flashcards from your AP Spanish course material to practice the vocabulary, grammar, and cultural concepts tested on the exam.",
      },
      {
        q: "How many cards should I study per day?",
        a: "Research shows 10-15 new cards daily is optimal for retention. Review previously learned cards using spaced repetition (daily, then 3 days, a week, two weeks).",
      },
      {
        q: "Can I create flashcards in other languages?",
        a: "Yes. Examina supports 29 languages, so you can generate flashcards for French, German, Italian, Portuguese, Mandarin, Japanese, and more.",
      },
    ],
    relatedPages: [
      "/subjects/spanish",
      "/subjects/spanish/quiz",
      "/subjects/french",
      "/ai-flashcards",
      "/for-students",
    ],
  },
  {
    slug: "quiz",
    type: "quiz",
    meta: {
      type: "quiz",
      primaryKeyword: "spanish quiz",
      monthlyVolume: 2400,
    },
    h1: "Spanish Quiz — Test Your Language Skills",
    intro:
      "Practice Spanish through interactive quizzes that test vocabulary, grammar, verb conjugations, and reading comprehension. Each question includes detailed explanations of grammar rules and usage patterns. Perfect for reinforcing classroom learning, preparing for exams, or self-assessment of your Spanish proficiency level.",
    sampleItems: [
      {
        q: "Fill in the blank: Yo _____ al cine ayer. (I went to the movies yesterday.)",
        a: "fui",
        explanation:
          "'Fui' is the preterite first person singular of 'ir' (to go). Use preterite because 'ayer' (yesterday) signals a completed action. Present would be 'voy,' imperfect would be 'iba.'",
        bloomLevel: "Apply",
        type: "fill-in-blank",
      },
      {
        q: "Which is grammatically correct?",
        a: "Me gustan los perros. (I like dogs.)",
        explanation:
          "With gustar, the verb agrees with what is liked. 'Los perros' is plural, so use 'gustan' (not gusta). Literal meaning: 'Dogs are pleasing to me.'",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "True or False: 'Estoy aburrido' and 'Soy aburrido' mean the same thing.",
        a: "False",
        explanation:
          "False. 'Estoy aburrido' = I am bored (temporary feeling). 'Soy aburrido' = I am boring (permanent personality trait). Estar vs ser changes the meaning completely.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "Translate: She used to go to the park every day.",
        a: "Ella iba al parque todos los días.",
        explanation:
          "Use imperfect tense ('iba') because this describes a habitual action in the past ('used to' + 'every day'). Preterite would indicate a single completed trip.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "Which verb is irregular in the first person present tense?",
        a: "Hacer → hago (not *haco)",
        explanation:
          "Hacer is irregular: yo hago, tú haces, él hace. Other first-person irregulars: salir→salgo, poner→pongo, traer→traigo, saber→sé, ver→veo.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Fill in the blank: Si yo _____ dinero, compraría una casa. (If I had money, I would buy a house.)",
        a: "tuviera",
        explanation:
          "This requires the imperfect subjunctive ('tuviera') after 'si' in a contrary-to-fact conditional sentence. The conditional 'compraría' in the result clause signals this construction.",
        bloomLevel: "Apply",
        type: "fill-in-blank",
      },
      {
        q: "What is the gender and number of 'la universidad'?",
        a: "Feminine singular",
        explanation:
          "'Universidad' is feminine despite ending in -dad (not -a). Most nouns ending in -dad, -ción, -sión are feminine. Plural: las universidades.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Choose the correct sentence:",
        a: "Hace tres años que estudio español. (I've been studying Spanish for three years.)",
        explanation:
          "Use 'hace + time + que + present tense' for actions that started in the past and continue to the present. English uses present perfect; Spanish uses simple present.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "True or False: 'Por' and 'para' are interchangeable.",
        a: "False",
        explanation:
          "False. Por = reason, exchange, duration, movement through. Para = purpose, destination, deadline, recipient. Example: 'Estudiopara el examen' (for/in order to pass the test) vs 'Estudio por tres horas' (for a duration).",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "What command form is 'No hables': formal or informal?",
        a: "Informal (tú) negative command",
        explanation:
          "Informal negative commands use present subjunctive: no hables (tú), no habléis (vosotros). Formal would be 'no hable' (usted). Positive informal is different: habla (tú).",
        bloomLevel: "Analyze",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Present tense conjugations",
      "Preterite vs imperfect",
      "Subjunctive mood",
      "Ser vs estar",
      "Por vs para",
      "Gustar-type verbs",
      "Object pronouns",
      "Command forms",
      "Gender and number agreement",
      "Common irregular verbs",
    ],
    studyTips: {
      workflow: [
        "Take a Spanish quiz to identify which grammar concepts you struggle with most",
        "Review the explanations for missed questions and study those grammar rules in your textbook or notes",
        "Retake the quiz after studying, then practice similar questions to verify you've mastered the concept",
      ],
      tips: [
        "Pay attention to time expressions (ayer, siempre, cuando era niño) as clues for which verb tense to use",
        "Review verb conjugation charts regularly—many questions test whether you know irregular forms",
        "Think about meaning, not just translation: 'I've been studying for 3 years' = present tense in Spanish (Estudio), not present perfect",
      ],
    },
    faq: [
      {
        q: "What Spanish grammar topics are tested?",
        a: "Quizzes cover verb conjugations, ser vs estar, preterite vs imperfect, subjunctive mood, por vs para, object pronouns, commands, and vocabulary in context.",
      },
      {
        q: "Are these quizzes good for AP Spanish prep?",
        a: "Yes. Generate AP Spanish-style questions by uploading your course material. Questions test grammar and comprehension at appropriate difficulty for the AP exam.",
      },
      {
        q: "Can I practice specific grammar concepts?",
        a: "Yes. Upload notes on a specific topic (e.g., 'subjunctive mood' or 'preterite irregular verbs') and generate a focused quiz on just that concept.",
      },
      {
        q: "Do questions include reading comprehension?",
        a: "Yes. Upload Spanish text passages and generate comprehension questions that test understanding of main ideas, details, and vocabulary in context.",
      },
      {
        q: "How do explanations help me learn?",
        a: "Each explanation shows why the answer is correct and highlights the grammar rule being tested. Learning from mistakes is more effective than just seeing a score.",
      },
      {
        q: "Can I take quizzes multiple times?",
        a: "Yes. Quiz links are reusable. Take the same quiz multiple times to track improvement or generate new quizzes on the same topic with fresh questions.",
      },
    ],
    relatedPages: [
      "/subjects/spanish",
      "/subjects/spanish/flashcards",
      "/subjects/french",
      "/subjects/vocabulary",
      "/ai-quiz-generator",
    ],
  },
];
