/**
 * AP World History combo pages
 */
import type { ComboData } from "./types";

export const AP_WORLD_HISTORY_COMBOS: ComboData[] = [
  {
    slug: "practice-questions",
    type: "practice-questions",
    meta: {
      type: "practice-questions",
      primaryKeyword: "ap world history practice test",
      secondaryKeywords: ["ap world history practice exams", "world history ap test questions"],
      monthlyVolume: 8100,
    },
    h1: "AP World History Practice Questions — Master 1200 CE to Present",
    intro:
      "Build comprehensive AP World History: Modern knowledge with practice questions covering all six units from 1200 CE to present. Master historical thinking skills including contextualization, causation, comparison, and continuity and change over time. Each question includes detailed explanations connecting events to broader historical themes. Perfect for AP exam preparation. Not affiliated with or endorsed by the College Board.",
    sampleItems: [
      {
        q: "The Indian Ocean trade network (1200-1450) primarily facilitated the exchange of which commodities?",
        a: "Spices, textiles, precious metals, and enslaved people",
        explanation:
          "The Indian Ocean trade network connected East Africa, Middle East, India, Southeast Asia, and China via monsoon wind patterns. Key goods: spices (pepper, cinnamon, cloves) from Southeast Asia, textiles (silk from China, cotton from India), precious metals (gold from East Africa), ceramics (Chinese porcelain), and enslaved people from East Africa. The network spread Islam, Buddhism, and Hinduism along with commercial goods. Merchants (Arab, Indian, Chinese) established diaspora communities in port cities. Technology: dhow ships with triangular lateen sails, compass, astrolabe. This trade network predates European involvement and demonstrates sophisticated pre-modern globalization.",
        bloomLevel: "Remember",
        type: "multiple-choice",
      },
      {
        q: "The Columbian Exchange most significantly resulted in:",
        a: "Massive demographic changes through disease and population transfer between hemispheres",
        explanation:
          "The Columbian Exchange (post-1492) transformed global demographics and ecology: diseases (smallpox, measles, typhus) devastated indigenous Americans (90% population decline), crops (maize, potatoes, tomatoes to Eurasia; wheat, sugar, coffee to Americas) revolutionized diets and enabled population growth, animals (horses, cattle, pigs to Americas), and forced migration of enslaved Africans to Americas (12 million in transatlantic slave trade). The exchange enriched Europe, devastated indigenous American civilizations, created African diaspora, and reshaped global power structures. It demonstrates how biological factors (germs, crops, animals) drive historical change as much as human decisions.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "Which Enlightenment idea most directly influenced both the American and French Revolutions?",
        a: "Popular sovereignty and natural rights",
        explanation:
          "Enlightenment thinkers (Locke, Rousseau, Montesquieu) argued governments derive legitimacy from consent of the governed, not divine right. Key concepts: natural rights (life, liberty, property), social contract (government exists to protect rights; citizens can overthrow tyranny), separation of powers. American Revolution (1776): Declaration of Independence proclaims 'self-evident' truths about equality and rights, Constitution separates powers. French Revolution (1789): Declaration of Rights of Man asserts liberty, equality, and popular sovereignty; overthrows absolute monarchy. Both revolutions inspired Latin American independence movements, challenged traditional hierarchies, and promoted republican government. However, they initially excluded women and enslaved people from 'universal' rights.",
        bloomLevel: "Analyze",
        type: "multiple-choice",
      },
      {
        q: "True or False: The Mongol Empire facilitated trade and cultural exchange along the Silk Road through the Pax Mongolica.",
        a: "True",
        explanation:
          "True. The Pax Mongolica (Mongol Peace, 13th-14th centuries) secured trade routes across Eurasia under unified Mongol control. Benefits: safety for merchants, standardized weights/measures, postal relay system (yam), protection of diverse religions and cultures, paper money acceptance. The Mongols enabled unprecedented east-west exchange: Marco Polo's travels, transfer of Chinese inventions (gunpowder, printing, compass) to Europe, spread of crops and technologies. However, Mongol conquests also spread bubonic plague (Black Death) along trade routes, killing 30-60% of Europe's population. The empire demonstrated how political unification facilitates globalization despite cultural differences.",
        bloomLevel: "Remember",
        type: "true-false",
      },
      {
        q: "Social Darwinism was used to justify European imperialism in the 19th century through which argument?",
        a: "Europeans were racially and culturally superior and had a duty to civilize other peoples",
        explanation:
          "Social Darwinism misapplied Darwin's evolutionary biology to human societies, claiming some races were 'more evolved' and destined to dominate. Combined with 'civilizing mission' ideology, Europeans rationalized imperialism as benevolent tutelage despite actual motives of economic exploitation and strategic control. Pseudo-scientific racism ranked peoples by cranial measurements, intelligence tests, and cultural development theories. This ideology justified: colonization of Africa and Asia, residential schools for indigenous children, racial segregation, and genocide. It reflected but also reinforced European power, creating lasting harmful legacies including structural racism and Eurocentric worldviews. Modern genetics and anthropology have thoroughly debunked Social Darwinism, but its effects persist.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "The Haitian Revolution (1791-1804) was significant because it:",
        a: "Was the only successful slave revolt resulting in an independent nation",
        explanation:
          "Haiti's revolution was unprecedented: enslaved Africans defeated French colonial power, Spanish and British interventions, and Napoleon's army to establish the first Black republic and second independent nation in the Western Hemisphere. Led by Toussaint L'Ouverture and Jean-Jacques Dessalines, it applied Enlightenment principles of liberty and equality to enslaved people—exposing hypocrisy of revolutions that retained slavery. The revolution terrified slaveholding societies (influenced by fears of similar revolts), inspired abolition movements, and demonstrated that enslaved people could win freedom through armed resistance. However, European powers economically isolated Haiti for decades, and France demanded massive reparations (paid until 1947), crippling Haiti's development.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "Which factor most contributed to the Industrial Revolution beginning in Britain rather than elsewhere?",
        a: "Access to coal and iron, colonial resources, capital accumulation, and political stability",
        explanation:
          "Britain's Industrial Revolution (late 1700s) resulted from convergence of factors: abundant coal and iron ore for steam engines and rails, colonial empire providing raw materials (cotton from India) and markets, capital from Atlantic trade (including slave trade profits), agricultural improvements freeing labor for factories, stable government protecting property rights, canal and road networks, culture valuing innovation and entrepreneurship. No single factor explains industrialization—it required economic, political, geographic, and cultural conditions. Britain's head start created 'first-mover advantage,' but industrialization spread to Belgium, France, Germany, US, and eventually globally. The process transformed economies from agrarian to industrial, created working class, and established Western economic dominance lasting into 20th century.",
        bloomLevel: "Analyze",
        type: "multiple-choice",
      },
      {
        q: "Total war during World War I meant:",
        a: "Entire societies mobilized for war effort, blurring civilian-military distinctions",
        explanation:
          "Total war transformed WWI into industrial conflict requiring full societal mobilization: conscription created mass armies, women entered factories for war production, governments controlled economies (rationing, price controls), propaganda shaped public opinion, civilian targets (U-boats sinking merchant ships, blockades causing starvation, zeppelin raids) became strategic, and entire populations bore war's consequences. This differed from limited wars with professional armies. Total war's demands explain trench warfare (mass casualties from machine guns, artillery, gas), war's duration (four years), governments' expanded powers, and societies' exhaustion. The concept intensified in WWII with strategic bombing, Holocaust, and atomic weapons. Total war demonstrates how modern industrialization enables unprecedented violence and societal transformation.",
        bloomLevel: "Understand",
        type: "multiple-choice",
      },
      {
        q: "The Cold War remained 'cold' between the US and Soviet Union primarily because:",
        a: "Nuclear weapons created mutual assured destruction, preventing direct conflict",
        explanation:
          "Nuclear weapons fundamentally changed great power competition: direct US-Soviet war risked annihilation of both sides and much of humanity. Mutually Assured Destruction (MAD) doctrine meant neither could win nuclear war, creating deterrence balance. Competition shifted to: proxy wars (Korea, Vietnam, Afghanistan), ideological struggle (capitalism vs. communism), arms race, space race, espionage, and Third World influence. Close calls (Cuban Missile Crisis 1962) demonstrated stakes. The Cold War shaped post-1945 world: divided Europe, decolonization influenced by superpower rivalry, military-industrial complexes, and global alliances (NATO, Warsaw Pact). It ended (1989-1991) through Soviet economic exhaustion, not military defeat, demonstrating limits of military power without economic sustainability.",
        bloomLevel: "Analyze",
        type: "multiple-choice",
      },
      {
        q: "True or False: Decolonization after World War II occurred peacefully in most regions.",
        a: "False",
        explanation:
          "False. Decolonization often involved violent independence struggles: Algeria's war against France (1954-1962, ~1 million dead), Vietnam's wars against France and US (millions dead), Kenya's Mau Mau uprising (1952-1960), Indonesia's independence war against Netherlands. Even 'peaceful' transitions (India's partition 1947) involved mass violence (1-2 million dead in Hindu-Muslim riots). However, some achieved independence through negotiation: Ghana (1957), much of French West Africa. Violence reflected colonizers' reluctance to surrender control, economic interests (resources, strategic locations), settler resistance, and Cold War interference (superpowers backed different sides). Decolonization created new nation-states but often with arbitrary borders, ethnic tensions, and economic dependency, shaping contemporary conflicts.",
        bloomLevel: "Remember",
        type: "true-false",
      },
    ],
    topicsCovered: [
      "The Global Tapestry (1200-1450): Mongol Empire, Indian Ocean trade, Islam's spread",
      "Networks of Exchange (1200-1450): Silk Road, trans-Saharan trade, environmental effects",
      "Land-Based Empires (1450-1750): Ottoman, Safavid, Mughal, Qing, European absolute monarchies",
      "Transoceanic Interconnections (1450-1750): Columbian Exchange, Atlantic slave trade, silver trade",
      "Revolutions (1750-1900): Enlightenment, Industrial Revolution, Atlantic revolutions, imperialism",
      "Consequences of Industrialization (1750-1900): nationalism, reforms, resistance",
      "Global Conflict (1900-present): World Wars, Cold War, decolonization, globalization",
      "Post-Cold War World: technological change, migration, environmentalism",
    ],
    studyTips: {
      workflow: [
        "Organize notes by time period (1200-1450, 1450-1750, 1750-1900, 1900-present) AND by theme (cultural, political, economic, technological)",
        "Practice historical thinking skills explicitly: contextualization (what was happening globally at this time?), causation (what caused this and what resulted?), comparison (how did different regions experience this?), continuity and change (what stayed the same? what changed?)",
        "Create timelines for each period with major events, but focus on understanding processes and patterns, not memorizing dates",
        "Connect events across regions: how did the Columbian Exchange affect Europe, Africa, Americas, and Asia differently? How did industrialization spread globally?",
        "Review SAQ and LEQ prompts from past exams to identify what College Board tests repeatedly (revolutions, imperialism, trade networks, technological change)",
      ],
      tips: [
        "Master the SPICE themes (Social, Political, Interactions, Cultural, Economic) to analyze any historical event from multiple perspectives",
        "Understand causation complexity: events have multiple causes (long-term vs. short-term, structural vs. immediate triggers), and historians debate causes",
        "Learn exemplar civilizations/empires for each period: Mongols (1200-1450), Ottomans/Mughals (1450-1750), Britain (1750-1900), US/USSR (1900-present)",
        "Practice writing thesis statements that answer prompts directly, make arguable claims, and preview your reasoning",
        "For DBQ, practice grouping documents by similarities, citing document numbers, analyzing point of view/purpose/audience, and using documents as evidence (not just summarizing them)",
        "Connect history to present: many contemporary issues (nationalism, globalization, inequality, environmental degradation) have historical roots you're studying",
      ],
    },
    faq: [
      {
        q: "What's the difference between AP World History and AP US History?",
        a: "AP World History covers global history from 1200 CE to present across all regions, emphasizing interactions between civilizations and comparative analysis. APUSH focuses deeply on US history from colonial period to present with more detail on domestic political and social developments.",
      },
      {
        q: "Do I need to memorize specific dates?",
        a: "Know approximate periods (century or half-century) rather than exact dates. The exam tests understanding of causation, patterns, and changes over time, not date memorization. However, know major event dates used as chronological markers (1492 Columbus, 1789 French Revolution, 1914 WWI start, 1945 WWII end).",
      },
      {
        q: "How much should I know about each civilization/region?",
        a: "Focus on major empires and regions that illustrate key historical processes: Mongols (trade networks), Ottomans (gunpowder empires), China (continuity and change), Europe (industrialization, imperialism), Africa (slave trade, colonization), Americas (conquest, revolution). You don't need encyclopedic knowledge—understand enough to answer questions about broader patterns.",
      },
      {
        q: "What's the best way to prepare for the DBQ?",
        a: "Practice with past DBQs under time pressure. Skills: quickly read 7 documents and group by themes, analyze author's point of view and purpose, cite documents by number as evidence, bring in outside knowledge (contextualization, additional evidence beyond documents), and write a clear thesis that answers the prompt and previews your argument.",
      },
    ],
    relatedPages: [
      "/exams/ap-world-history",
      "/exams/ap-us-history/practice-questions",
      "/exams/ap-human-geography/practice-questions",
      "/subjects/world-history",
    ],
  },
  {
    slug: "study-guide",
    type: "study-guide",
    meta: {
      type: "study-guide",
      primaryKeyword: "study guide for ap world history",
      secondaryKeywords: ["ap world history exam study guide"],
      monthlyVolume: 720,
    },
    h1: "AP World History Study Guide — Comprehensive Review",
    intro:
      "Comprehensive AP World History study guide organizing essential content by unit and theme. Master key civilizations, historical processes, and thinking skills needed for the AP exam. Generate custom study guides from your class notes to focus on areas needing review. Not affiliated with or endorsed by the College Board.",
    sampleItems: [
      {
        q: "Period 1 (1200-1450) Overview",
        a: "Mongol Empire unifies Asia, facilitates Silk Road trade; Indian Ocean trade connects East Africa to Southeast Asia; Islam spreads through trade and conquest; major empires: Song China, Abbasid Caliphate, Mali, Delhi Sultanate",
        explanation:
          "This period sees increased connectivity through trade networks despite political fragmentation. The Mongol Empire (largest contiguous land empire in history) secured trade routes, enabling unprecedented cultural and technological exchange. Indian Ocean trade predates European involvement and shows sophisticated networks. Islam expands through merchants and Sufis, becoming majority religion across North Africa, Middle East, Central Asia, and parts of South/Southeast Asia. Compare Song China's economic dynamism and innovation with European feudalism. Understand how trade networks spread ideas, religions, and technologies.",
        bloomLevel: "Remember",
      },
      {
        q: "Key Changes in Period 3 (1450-1750)",
        a: "European maritime empires, Columbian Exchange, Atlantic slave trade, gunpowder empires (Ottoman, Safavid, Mughal), global silver trade, plantation economies",
        explanation:
          "This period marks shift from land-based to oceanic trade, European ascendancy through naval technology, and devastating consequences of contact for indigenous Americans. Columbian Exchange: biological transfers reshape global ecology and demographics. Atlantic slave trade: forced migration of 12 million Africans fuels plantation economies producing sugar, tobacco, cotton. Gunpowder empires: centralized Muslim states use military technology to conquer and administer vast territories. Silver from Potosí (Bolivia) becomes global currency, linking Europe, Africa, Americas, and Asia in trade networks. Compare European maritime empires (Spanish, Portuguese, Dutch, English) with land-based empires (Ottomans, Mughals, Qing).",
        bloomLevel: "Understand",
      },
      {
        q: "Causes of Industrial Revolution",
        a: "Coal and iron resources, agricultural improvements, capital accumulation, colonial markets, technological innovations, political stability, cultural attitudes favoring progress",
        explanation:
          "Industrialization required convergence of multiple factors, explaining why it began in Britain: Geography: coal and iron ore for steam engines and machinery. Agriculture: enclosure movement and crop rotation freed labor for factories, increased food production. Capital: profits from colonial trade and Atlantic economy funded factories. Markets: colonies provided raw materials and consumed manufactured goods. Technology: innovations in textile machines (spinning jenny, power loom), steam engines (Watt), metallurgy (Bessemer process) compounded. Politics: stable government, property rights, patent system encouraged investment and innovation. Culture: Enlightenment values of progress, scientific thinking, and individual enterprise. No single factor suffices—industrialization required economic, political, social, and cultural conditions aligning.",
        bloomLevel: "Analyze",
      },
    ],
    topicsCovered: [
      "Historical thinking skills: contextualization, causation, comparison, continuity and change",
      "Trade networks and their impacts",
      "Empire building and governance",
      "Religious and cultural exchanges",
      "Technological innovations and their effects",
      "Resistance to authority and social change",
      "Economic systems and their transformations",
    ],
    studyTips: {
      workflow: [
        "Create unit-by-unit outlines with major themes, key civilizations/empires, and significant developments",
        "Make comparison charts for similar processes across regions (e.g., how did different regions experience imperialism?)",
        "Build a chronological framework with major turning points, but emphasize processes over dates",
        "Practice with past FRQs to identify patterns in what College Board tests",
        "Review your weakest units first, then maintain knowledge through spaced repetition",
      ],
      tips: [
        "Organize study guide by themes (SPICE) within each period to see patterns across time and space",
        "Use active recall: cover answers and test yourself on key concepts and examples before checking accuracy",
        "Connect historical events to their long-term consequences (Columbian Exchange → demographic changes; industrialization → imperialism; decolonization → contemporary conflicts)",
        "Study with peers: explain concepts in your own words, quiz each other, and discuss different interpretations",
        "Focus on quality over quantity: deep understanding of key processes beats superficial coverage of everything",
      ],
    },
    faq: [
      {
        q: "How detailed should my study guide be?",
        a: "Balance breadth and depth. Cover all six units but focus more on high-yield topics that appear frequently: trade networks, revolutions, industrialization, imperialism, world wars, decolonization, globalization. Include enough detail to provide specific examples for essays, but not so much that you can't review efficiently.",
      },
      {
        q: "Should I memorize timelines?",
        a: "Know approximate periods (centuries or half-centuries) and sequence of events, but don't obsess over exact dates. The exam tests causation and change over time, not date memorization. Focus on understanding why events happened in that order and what resulted.",
      },
      {
        q: "How do I prepare for multiple choice vs. free response?",
        a: "Multiple choice tests recognition of facts and concepts—use study guide for knowledge building. Free response tests argumentation and evidence use—practice writing under time pressure. Both require knowing content, but FRQs require organizing knowledge into coherent arguments.",
      },
      {
        q: "When should I start making my study guide?",
        a: "Build it incrementally throughout the year as you learn each unit. Final review should involve active practice with your completed guide, not creating it from scratch right before the exam.",
      },
    ],
    relatedPages: [
      "/exams/ap-world-history",
      "/exams/ap-world-history/practice-questions",
      "/study-guide-generator",
      "/subjects/world-history",
    ],
  },
];
