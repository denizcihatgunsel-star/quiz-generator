/**
 * AP Human Geography combo pages (practice-questions + study-guide)
 */
import type { ComboData } from "./types";

export const AP_HUMAN_GEOGRAPHY_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "ap human geography practice test",
      secondaryKeywords: [
        "ap human geography practice exams",
        "ap geography practice test",
        "ap human geo practice exam",
      ],
      monthlyVolume: 6600,
    },
    h1: "AP Human Geography Practice Questions — Master Geographic Concepts",
    intro:
      "Build comprehensive AP Human Geography knowledge with practice questions covering all seven units: Thinking Geographically, Population and Migration, Cultural Patterns, Political Geography, Agriculture and Rural Land Use, Cities and Urban Land Use, and Industrial and Economic Development. Each question includes detailed explanations, geographic models, and real-world applications. Perfect for AP exam preparation focusing on spatial thinking, geographic models, and data analysis. Not affiliated with or endorsed by the College Board.",
    sampleItems: [
      {
        q: "According to the rank-size rule, if the largest city in a country has a population of 10 million, what would be the expected population of the second-largest city?",
        a: "5 million",
        explanation:
          "The rank-size rule states that the nth largest city has 1/n the population of the largest city. For the 2nd city: 10 million × (1/2) = 5 million. This pattern creates a predictable urban hierarchy where city size decreases regularly with rank. The rule applies most accurately in developed countries with mature urban systems. Primate city patterns, common in developing countries, violate this rule when one city dominates the urban system far beyond what the rank-size rule predicts.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "True or False: In the demographic transition model, stage 5 is characterized by declining population due to birth rates falling below death rates.",
        a: "True",
        explanation:
          "True. Stage 5 (only observed in some highly developed countries like Japan and Germany) occurs when total fertility rates fall well below replacement level (2.1 children per woman), causing birth rates to drop below death rates despite low mortality. This results in natural decrease and aging populations. Not all demographers agree stage 5 exists as a distinct stage—some consider it an extension of stage 4. Countries in potential stage 5 face challenges including labor shortages, pension system strain, and declining economic productivity from smaller working-age cohorts.",
        bloomLevel: "Remember",
        type: "true-false",
      },
      {
        q: "Von Thünen's model explains agricultural land use patterns based on which primary factor?",
        a: "Distance from the central market",
        explanation:
          "Von Thünen's model (1826) explains how land rent and transportation costs determine agricultural land use at varying distances from the market. Intensive farming (vegetables, dairy) occupies rings closest to market due to high perishability and transport costs, while extensive farming (grains, ranching) is located farther away where land is cheaper. The model assumes: isolated state, flat terrain, uniform soil, one central market, and farmers act to maximize profit. While unrealistic, the model reveals fundamental economic geography principles about distance-decay effects on land use decisions. Modern agriculture shows similar patterns around urban areas despite technological changes in transportation and refrigeration.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which of the following is an example of a centrifugal force within a country?",
        a: "Religious or ethnic conflict",
        explanation:
          "Centrifugal forces divide people and threaten state unity: ethnic/religious conflict (Yugoslavia breakup, Rwanda genocide), economic inequality (regional wealth disparities), weak institutions, separatist movements, linguistic diversity without common language. Centripetal forces unite people: shared national identity, strong institutions, economic prosperity, common language/religion, fair governance, unifying symbols (flags, anthems, sports teams). The balance between centripetal and centrifugal forces determines state stability. Even strong states experience centrifugal pressures (Catalonia in Spain, Scotland in UK), but centripetal forces maintain unity if sufficiently strong.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "Rostow's stages of economic development model has been criticized primarily because:",
        a: "It assumes all countries follow the same Western development path",
        explanation:
          "Critics argue Rostow's model (1960) is ethnocentric and overly simplistic: assumes linear progression through five stages (traditional, preconditions for takeoff, takeoff, drive to maturity, high mass consumption) mirroring Western industrialization, ignores colonialism's role in underdevelopment, assumes all societies share Western consumption goals, treats development as purely economic (ignoring social/cultural factors), doesn't account for different development paths (Asian tigers' export-led growth, resource-based economies). Alternative models (dependency theory, world systems theory) emphasize global power structures and exploitation rather than internal stages. Modern development economics recognizes multiple paths to development shaped by historical context, geography, institutions, and global position.",
        bloomLevel: "Analyze",
        type: "multiple-choice",
      },
      {
        q: "What is the primary purpose of gerrymandering?",
        a: "Manipulate electoral district boundaries to favor a political party",
        explanation:
          "Gerrymandering is redrawing electoral districts to gain political advantage through two strategies: packing (concentrating opposition voters into few districts to waste their votes) and cracking (dispersing opposition voters across many districts to dilute their voting power). Named after Massachusetts Governor Elbridge Gerry (1812), whose party created a salamander-shaped district. While legal in most U.S. states (except when used for racial discrimination per Voting Rights Act), gerrymandering undermines democratic principles by allowing politicians to choose their voters rather than voters choosing representatives. Independent redistricting commissions (California, Arizona, Michigan) aim to reduce gerrymandering. The practice raises questions about fair representation and is contentious in Supreme Court cases.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which Green Revolution innovation had the greatest impact on increasing global food production?",
        a: "High-yielding variety (HYV) seeds",
        explanation:
          "The Green Revolution (1960s-1980s) dramatically increased agricultural productivity through HYV seeds (dwarf wheat, IR8 rice) that produced more grain per plant, used nutrients more efficiently, and resisted lodging (falling over). Combined with irrigation, chemical fertilizers, and pesticides, HYV seeds tripled yields in Asia and prevented predicted famines. However, the revolution had costs: increased inequality (favored wealthy farmers who could afford inputs), environmental damage (fertilizer runoff, pesticide pollution, aquifer depletion), loss of genetic diversity (monoculture replaced traditional varieties), increased farmer debt, and corporate control of seed supply. Critics argue it prioritized production over sustainability and equity.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Bid-rent theory predicts that land value is highest:",
        a: "At the center of the city (CBD)",
        explanation:
          "Bid-rent theory explains urban land use by modeling how land values decrease with distance from the CBD. Businesses bid highest for central locations due to accessibility to customers and transportation. The theory creates concentric zones: commercial (CBD—highest rent), industrial (moderate rent, need space and transport access), residential (lowest rent per square foot, but total value depends on lot size). Within residential areas, wealthier households can afford larger lots farther from center (more space, lower density), while lower-income households occupy smaller, expensive central locations near employment. The model assumes monocentric city, uniform land, and rational actors maximizing utility. Modern cities show polycentric patterns (multiple centers, edge cities) that complicate the theory but don't invalidate its core principle: land value reflects accessibility.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "Which of the following best exemplifies the concept of distance decay?",
        a: "People are more likely to shop at nearby stores than distant ones",
        explanation:
          "Distance decay describes how interaction between locations decreases as distance increases due to time, cost, and effort. Examples: people shop locally, migration decreases with distance, cultural traits diffuse slowly over space. The friction of distance creates patterns: gravity model predicts interaction between cities based on size and distance, Tobler's First Law states 'near things are more related than distant things.' Technology (internet, air travel, phones) reduces but doesn't eliminate distance decay—people still prefer nearby interactions when possible. Understanding distance decay explains spatial patterns in trade, migration, diffusion of innovations, and cultural exchanges.",
        bloomLevel: "Apply",
        type: "multiple-choice",
      },
      {
        q: "True or False: A primate city is always the capital of a country.",
        a: "False",
        explanation:
          "False. A primate city is the largest city that dominates the urban hierarchy, typically more than twice the size of the second city and serving as the economic and cultural center. It doesn't need to be the political capital. Examples: New York (not capital), São Paulo (not capital), Lagos (not capital). Some countries have both: Paris is France's capital and primate city, London is UK's capital and primate city. Primate cities are common in developing countries due to colonial legacy (colonizers concentrated investment in one port city) and continuing rural-to-urban migration to opportunity centers. Countries with multiple large cities (US, China, India) lack true primate cities—their urban systems are more balanced.",
        bloomLevel: "Understand",
        type: "true-false",
      },
      {
        q: "Wallerstein's world systems theory divides countries into core, periphery, and semi-periphery. Which characteristic defines core countries?",
        a: "Specialized in high-tech manufacturing and services, exploit periphery for resources",
        explanation:
          "In Wallerstein's world systems theory (1974), core countries (US, Western Europe, Japan) control global economy through: advanced technology and capital-intensive production, high wages and consumption, political/military dominance, exploitation of periphery through unequal exchange (buying cheap raw materials, selling expensive manufactured goods). Periphery countries (sub-Saharan Africa, parts of Latin America/Asia) provide raw materials and cheap labor, have weak states, and depend on core. Semi-periphery countries (China, Brazil, India, Mexico) are transitional—exploit periphery but are exploited by core, mix manufacturing and agriculture. The system perpetuates global inequality through structural relationships, not individual country deficiencies. Core position is maintained through control of technology, capital, and international institutions (World Bank, IMF, WTO).",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "Which statement best describes the concept of time-space compression?",
        a: "Innovations in transportation and communication make distant places feel closer",
        explanation:
          "Time-space compression (David Harvey, 1989) describes how globalization and technology shrink the perceived distance between places by reducing travel time and communication barriers. Jet travel connects continents in hours; internet enables instant global communication; shipping containers reduce freight costs. This creates a 'smaller world' where events in one place immediately affect others (2008 financial crisis, COVID-19 pandemic). However, compression is uneven: wealthy, connected people/places experience greater compression than poor, isolated ones. The digital divide, visa restrictions, and economic barriers mean time-space compression amplifies inequality—some people live in a globally connected world while others remain locally isolated. This uneven compression shapes migration patterns, economic opportunities, and cultural exchanges.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
    ],
    topicsCovered: [
      "Thinking Geographically: maps and spatial concepts, geographic data analysis",
      "Population and Migration: demographic transition model, population pyramids, migration patterns and causes",
      "Cultural Patterns: language families and diffusion, religion and belief systems, ethnicity and nationalism",
      "Political Geography: state formation and boundaries, types of governance, centripetal and centrifugal forces, gerrymandering",
      "Agriculture: von Thünen's model, Green Revolution, subsistence vs. commercial agriculture",
      "Cities and Urban Land Use: urbanization patterns, urban models (concentric zone, sector, multiple nuclei), bid-rent theory, urban sprawl, gentrification",
      "Industrial and Economic Development: Rostow's stages, world systems theory, comparative advantage, sustainable development",
    ],
    studyTips: {
      workflow: [
        "Study geographic models (demographic transition, von Thünen, Christaller, bid-rent, gravity model) until you can sketch and explain each from memory—models appear constantly on AP exam",
        "Practice applying concepts to real-world examples—don't just memorize definitions, understand how theories explain actual spatial patterns",
        "Review key vocabulary (primate city, centrifugal force, time-space compression, distance decay) and use terms precisely in written responses",
        "Analyze maps and data (population pyramids, urban models, migration flows) to build spatial analysis skills tested on FRQs",
        "Connect concepts across units—migration links to population AND cultural patterns AND urbanization",
      ],
      tips: [
        "Memorize major geographic models and be able to draw them with labels: demographic transition (5 stages), von Thünen (agricultural rings), urban models (concentric zone, sector, multiple nuclei), Rostow's stages",
        "Understand the difference between concepts that sound similar: urban sprawl vs. gentrification, centripetal vs. centrifugal forces, emigration vs. immigration, site vs. situation",
        "Learn real-world examples for abstract concepts: China's one-child policy (population policy), Berlin Wall (political boundary), Green Revolution in India (agricultural change), suburbanization in US (urban sprawl)",
        "Practice FRQ format: answer all parts of each question, use geographic terminology correctly, provide specific examples with details, organize answers clearly",
        "Review the geographic skills tested: map reading, data analysis, spatial relationships, scales of analysis (local, national, global)",
        "Connect causes and effects: don't just know WHAT happened, understand WHY and what resulted. Why does stage 3 have rapid population growth? (declining death rates but still-high birth rates)",
      ],
    },
    faq: [
      {
        q: "What makes AP Human Geography different from regular geography?",
        a: "AP Human Geography focuses on spatial analysis of human activities—how people organize space, create cultural landscapes, and interact with their environment. It emphasizes geographic models, data analysis, and applying concepts to real-world patterns rather than memorizing place names.",
      },
      {
        q: "Do I need to memorize countries and capitals?",
        a: "No. The AP exam doesn't test place-name memorization. However, knowing major regions and countries helps you provide specific examples in free-response questions. Focus on understanding geographic patterns and processes rather than memorizing maps.",
      },
      {
        q: "What are the hardest units on the AP exam?",
        a: "Students commonly struggle with Agriculture (understanding agricultural systems and von Thünen model) and Industrial Development (applying world systems theory and development models). These units require understanding abstract economic geographic concepts.",
      },
      {
        q: "How should I prepare for FRQs?",
        a: "Practice writing under time pressure (FRQs are 50% of score). Answer all parts of each question explicitly, use geographic terminology correctly, provide specific named examples with details, and organize your response clearly. Quality matters more than quantity—focused, accurate answers score higher than long, vague responses.",
      },
    ],
    relatedPages: [
      "/exams/ap-human-geography",
      "/subjects/human-geography",
      "/exams/ap-world-history/practice-questions",
      "/ai-quiz-generator",
    ],
  },
  {
    slug: "study-guide",
    type: "study-guide",
    meta: {
      type: "study-guide",
      primaryKeyword: "human geography ap study guide",
      secondaryKeywords: [
        "ap human geography study guide",
        "ap geography study guide",
      ],
      monthlyVolume: 1000,
    },
    h1: "AP Human Geography Study Guide — Master All Units",
    intro:
      "Comprehensive AP Human Geography study guide covering essential concepts, models, and terminology across all seven units. Organize your review with structured outlines, key vocabulary, and connections between geographic themes. Perfect for final exam review or building foundational knowledge throughout the course. Generate custom study guides from your class notes to focus on topics you need most. Not affiliated with or endorsed by the College Board.",
    sampleItems: [
      {
        q: "Unit 1: Thinking Geographically - Key Concepts",
        a: "Scale (local, national, global), spatial patterns, diffusion (relocation, hierarchical, contagious, stimulus), distance decay, time-space compression, geographic data and maps",
        explanation:
          "Unit 1 establishes foundational concepts used throughout the course: scale (what level you're analyzing—neighborhood vs. continent matters for patterns observed), spatial patterns (how things are arranged across space), diffusion (how ideas, diseases, innovations spread through space and time—relocation diffusion moves with people, hierarchical diffuses through urban hierarchy, contagious spreads person-to-person like disease, stimulus diffuses as adapted idea), distance decay (interaction decreases with distance), time-space compression (technology makes distant places feel closer). Master these concepts early—they apply to every subsequent unit. Practice: explain how a cultural trait diffuses, analyze patterns at different scales, interpret spatial data from maps.",
        bloomLevel: "Remember",
      },
      {
        q: "Unit 2: Population and Migration - Demographic Transition Model Stages",
        a: "Stage 1: High birth/death (slow growth), Stage 2: Declining death, high birth (rapid growth), Stage 3: Declining birth, low death (slowing growth), Stage 4: Low birth/death (slow growth), Stage 5: Very low birth, low death (decline)",
        explanation:
          "The demographic transition model explains how populations change as countries develop: Stage 1 (pre-industrial): high birth and death rates due to disease, famine, war; slow population growth; no current countries in this stage. Stage 2 (developing): death rates fall due to improved medicine, sanitation, food; birth rates remain high; rapid population growth; examples: sub-Saharan Africa, Afghanistan. Stage 3 (industrializing): birth rates decline due to urbanization, education, women's employment, contraception access; population growth slows; examples: India, Mexico. Stage 4 (developed): low birth and death rates; slow growth or stability; examples: US, Canada, most of Europe. Stage 5 (post-industrial, debated): birth rates below replacement; natural decrease; aging population; examples: Japan, Germany, Italy. Understanding this model explains global population distribution, migration pressures, and development challenges.",
        bloomLevel: "Remember",
      },
      {
        q: "Unit 5: Agriculture - Von Thünen Model Rings (inner to outer)",
        a: "Ring 1: Intensive farming/dairy (perishable, high rent); Ring 2: Forest/timber; Ring 3: Grains/field crops; Ring 4: Ranching/livestock (extensive, low rent)",
        explanation:
          "Von Thünen's model (1826) explains agricultural land use patterns based on transportation costs and land rent. Assumes: isolated state, flat terrain, uniform fertility, one central market, farmers maximize profit. Ring 1 (closest to market): intensive farming (vegetables, milk, flowers) due to high perishability, high transport costs per pound, and high land rent; farmers can afford expensive land because products command high prices. Ring 2: forest/timber for fuel and building (heavy, expensive to transport; important in 19th century before coal). Ring 3: field crops (wheat, corn) less perishable, moderate transport costs, moderate land rent. Ring 4: ranching/grazing (extensive use, animals walk to market, lowest land rent). Modern version: observe similar patterns around cities—truck farms near suburbs, grain belt farther out. Model teaches economic geography principles even though exact rings don't exist due to terrain variation, multiple markets, and modern transport (trucks, rail, refrigeration).",
        bloomLevel: "Remember",
      },
    ],
    topicsCovered: [
      "Geographic concepts and skills",
      "Population dynamics and migration",
      "Cultural patterns and landscapes",
      "Political organization of space",
      "Agricultural systems",
      "Urban geography",
      "Industrial and economic development",
    ],
    studyTips: {
      workflow: [
        "Create a master concept list for each unit with definitions, examples, and connections to other units",
        "Practice drawing all major models from memory (demographic transition, von Thünen, urban models) and labeling key features",
        "Build a vocabulary notebook with geographic terms, accurate definitions, and real-world examples for each",
        "Make comparison charts for similar concepts: types of diffusion, types of agriculture, types of boundaries, urban models",
        "Review FRQs from past exams to see how concepts are tested—this reveals what you need to know deeply vs. superficially",
      ],
      tips: [
        "Organize notes by unit and theme—don't let information scatter across notebooks and Google Docs",
        "Use study guide to identify gaps: which models can't you draw? Which terms can't you define precisely? Focus study time there",
        "Connect abstract concepts to concrete examples from news, your community, or case studies—this builds deeper understanding",
        "Test yourself actively: cover answers, try to recall definitions and examples, check accuracy—don't just re-read highlights",
        "Form a study group to quiz each other, explain concepts in your own words, and discuss real-world applications",
      ],
    },
    faq: [
      {
        q: "How should I structure my AP Human Geography study guide?",
        a: "Organize by unit (1-7), then by major concepts within each unit. Include: key vocabulary with definitions and examples, models with sketches and labels, real-world case studies, connections to other units. Use bullet points and white space—dense paragraphs are hard to review quickly.",
      },
      {
        q: "What should I focus on most?",
        a: "Geographic models (demographic transition, von Thünen, Christaller, gravity model, Rostow's stages, world systems theory), key vocabulary and precise definitions, real-world examples for each concept, and FRQ skills (answering all parts, using terminology correctly).",
      },
      {
        q: "When should I start reviewing?",
        a: "Begin compiling your study guide as you learn each unit—don't wait until right before the exam. Build it incrementally: add definitions, examples, and connections as you go. Final review (2-3 weeks before exam) should be active practice with your completed study guide, not creating it from scratch.",
      },
      {
        q: "Can AI-generated study guides replace my class notes?",
        a: "No. Use AI tools to supplement your notes, organize concepts, and generate practice questions. But your class notes capture what your teacher emphasizes (which often predicts what appears on class tests) and reflect your learning process. Combine both for comprehensive review.",
      },
    ],
    relatedPages: [
      "/exams/ap-human-geography",
      "/exams/ap-human-geography/practice-questions",
      "/subjects/human-geography",
      "/study-guide-generator",
    ],
  },
];
