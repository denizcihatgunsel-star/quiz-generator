/**
 * Subject collection for programmatic SEO Wave 2.
 * Each subject is a quiz generator page with sample questions.
 */

export interface Subject {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  topicsList?: string[];
  sampleQuestions: { q: string; a: string; explanation: string }[];
  questionTypesAdvice?: string;
  studyTips?: string[];
  faq: { q: string; a: string }[];
  relatedTools: string[];
  relatedExams?: string[];
}

export const SUBJECTS: Subject[] = [
  {
    slug: "biology",
    name: "Biology",
    description:
      "Generate biology quiz questions on cells, genetics, evolution, ecology, and human body systems.",
    topicsList: [
      "Cell Biology: prokaryotic vs. eukaryotic cell structure, organelles and their functions (nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes, peroxisomes, ribosomes), cell membrane structure (phospholipid bilayer, membrane proteins, cholesterol), membrane transport mechanisms (passive diffusion, facilitated diffusion, osmosis, active transport, endocytosis, exocytosis), cell communication and signaling pathways, cell cycle regulation (G1, S, G2, M phases, checkpoints), mitosis (prophase, metaphase, anaphase, telophase) and meiosis (meiosis I and II producing haploid gametes), apoptosis (programmed cell death)",
      "Genetics and Molecular Biology: DNA structure (double helix, base pairing A-T and G-C, antiparallel strands), DNA replication (semiconservative replication, leading and lagging strands, Okazaki fragments, DNA polymerase, helicase, primase, ligase), transcription (RNA polymerase, promoters, transcription factors, mRNA processing with 5' cap and poly-A tail, splicing and introns/exons), translation (ribosomes, tRNA, codons and anticodons, start and stop codons, peptide bond formation), gene expression and regulation (operons in prokaryotes like lac operon, transcription factors and enhancers in eukaryotes, epigenetics including DNA methylation and histone modification), Mendelian genetics (dominant and recessive alleles, Punnett squares, monohybrid and dihybrid crosses, law of segregation and independent assortment), non-Mendelian inheritance (incomplete dominance, codominance, multiple alleles, polygenic traits, sex-linked inheritance), mutations (point mutations, frameshift mutations, chromosomal aberrations)",
      "Evolution and Phylogenetics: natural selection (variation, heritability, differential survival and reproduction, adaptation), evidence for evolution (fossil record, comparative anatomy including homologous and analogous structures, molecular evidence with DNA and protein similarities, biogeography, embryology), mechanisms of evolution (mutation, gene flow, genetic drift, non-random mating), speciation (allopatric, sympatric, reproductive isolation mechanisms), phylogenetic trees and cladograms (common ancestors, derived vs. ancestral traits, reading evolutionary relationships), population genetics (Hardy-Weinberg equilibrium, allele frequencies, factors that disrupt equilibrium)",
      "Ecology and Ecosystems: population ecology (population growth models including exponential and logistic growth, carrying capacity, limiting factors, density-dependent and density-independent factors), community ecology (species interactions including predation, competition, mutualism, commensalism, parasitism, ecological niches, keystone species), ecosystems (energy flow through trophic levels with producers, primary consumers, secondary consumers, decomposers; food chains and food webs; only ~10% energy transfer between levels), nutrient cycles (carbon cycle with photosynthesis and cellular respiration, nitrogen cycle with nitrogen fixation, nitrification, denitrification, phosphorus cycle, water cycle), biodiversity and conservation (habitat loss, invasive species, climate change impacts, ecosystem services)",
      "Human Body Systems and Physiology: circulatory system (heart anatomy with atria, ventricles, and valves, blood flow through pulmonary and systemic circuits, blood pressure regulation, blood components including RBCs, WBCs, platelets, and plasma), respiratory system (lung anatomy with alveoli, gas exchange via diffusion, breathing mechanics with diaphragm and intercostal muscles, oxygen and carbon dioxide transport in blood with hemoglobin), digestive system (mouth, esophagus, stomach, small intestine, large intestine, accessory organs including liver, pancreas, gallbladder, enzyme digestion of carbohydrates, proteins, and fats, nutrient absorption), nervous system (neurons and action potentials, synapse and neurotransmitters, central nervous system with brain and spinal cord, peripheral nervous system with somatic and autonomic divisions, reflex arcs), immune system (innate immunity with physical barriers and inflammation, adaptive immunity with B cells producing antibodies and T cells for cell-mediated immunity, antigen recognition, memory cells and vaccination), endocrine system (hormones and glands including pituitary, thyroid, adrenal, pancreas with insulin and glucagon for blood glucose regulation, feedback loops including negative and positive feedback)",
      "Cellular Metabolism and Energetics: enzymes (active sites, substrate specificity, induced fit model, factors affecting enzyme activity including temperature, pH, inhibitors with competitive and noncompetitive inhibition, cofactors and coenzymes), cellular respiration (glycolysis in cytoplasm producing 2 ATP and 2 NADH, Krebs cycle in mitochondrial matrix producing NADH and FADH2, electron transport chain in inner mitochondrial membrane with chemiosmosis producing ~32 ATP, total yield of ~36-38 ATP per glucose, anaerobic respiration and fermentation with lactic acid and alcohol fermentation), photosynthesis (light-dependent reactions in thylakoid membranes with photosystems I and II, electron transport producing ATP and NADPH, light-independent reactions with Calvin cycle in stroma fixing CO2 into glucose using ATP and NADPH, C3, C4, and CAM photosynthesis pathways)",
      "Microbiology and Disease: bacteria structure (cell wall with peptidoglycan, flagella, pili, plasmids, binary fission reproduction), bacterial classification (Gram-positive vs. Gram-negative, shapes including cocci, bacilli, spirilla), viruses (structure with capsid and genetic material being DNA or RNA, lytic vs. lysogenic cycles, host specificity, viral diseases including influenza, HIV, COVID-19), fungi (yeast vs. molds, cell walls with chitin, decomposer roles, fungal diseases), protists (protozoa, algae, parasitic protists causing malaria and giardia), disease transmission (direct contact, airborne, vector-borne, waterborne, foodborne), immune response to pathogens, antibiotics and antibiotic resistance",
      "Botany and Plant Biology: plant cell structure (cell wall, central vacuole, chloroplasts), plant tissues (dermal, ground, vascular with xylem transporting water and phloem transporting sugars), plant organs (roots, stems, leaves with stomata for gas exchange and guard cells), photosynthesis in chloroplasts (see above), water transport via transpiration and cohesion-tension theory, plant reproduction (flower anatomy with sepals, petals, stamens, carpels, pollination, fertilization, seed development, fruit formation as ripened ovary), plant hormones (auxins, gibberellins, cytokinins, ethylene, abscisic acid), plant responses to environment (phototropism, gravitropism, photoperiodism)",
    ],
    sampleQuestions: [
      {
        q: "What is the primary function of mitochondria?",
        a: "Produce ATP through cellular respiration",
        explanation:
          "Mitochondria are the powerhouse of the cell, converting glucose and oxygen into ATP (adenosine triphosphate), the cell's energy currency.",
      },
      {
        q: "Which type of RNA carries amino acids to the ribosome?",
        a: "tRNA (transfer RNA)",
        explanation:
          "Transfer RNA molecules bind to specific amino acids and deliver them to the ribosome during protein synthesis.",
      },
      {
        q: "In which phase of mitosis do chromosomes align at the cell's equator?",
        a: "Metaphase",
        explanation:
          "During metaphase, chromosomes line up along the metaphase plate (cell equator) before sister chromatids separate.",
      },
      {
        q: "What is the role of the Calvin cycle in photosynthesis?",
        a: "Convert CO₂ into glucose using ATP and NADPH",
        explanation:
          "The Calvin cycle (light-independent reactions) uses energy from ATP and NADPH produced in light reactions to fix carbon dioxide into glucose.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions work exceptionally well for testing understanding of biological processes and mechanisms—for example, asking about the sequence of events in cellular respiration, identifying which phase of mitosis chromosomes align at the metaphase plate, or determining what happens when an enzyme is exposed to extreme pH. These questions should require applying knowledge to scenarios, not just recognizing memorized facts. Fill-in-the-blank is ideal for drilling terminology (naming organelles, taxonomic classifications, anatomical structures, enzyme names, hormone names) since it forces active recall without answer hints as a crutch. For example, 'The _____ is the site of ATP production via aerobic respiration' requires recalling 'mitochondria' from memory. Flashcards are essential for definitions (photosynthesis, osmosis, homeostasis), diagrams (cell structure, heart anatomy, nitrogen cycle), and matching structures to functions (ribosome = protein synthesis, lysosome = digestion, chloroplast = photosynthesis). True/false questions are highly effective for identifying and correcting common misconceptions that students frequently hold—for example, 'Plants only perform cellular respiration at night' (false, plants respire 24/7 but photosynthesize only during day), 'All mutations are harmful' (false, many are neutral or beneficial), 'Antibiotics kill viruses' (false, antibiotics target bacteria only).",
    studyTips: [
      "Draw diagrams from memory repeatedly until you can produce them without references. Biology is an intensely visual science—being able to sketch a eukaryotic cell with all organelles labeled, draw and label the anatomy of the human heart showing blood flow direction, diagram the nitrogen cycle with all transformation steps (nitrogen fixation, nitrification, denitrification), or illustrate a food web with energy flow proves far deeper understanding than passively recognizing a pre-made diagram in your textbook. Close your notes and draw from memory, then check for accuracy. Repeat this process until every diagram is automatic. This active retrieval strengthens memory much more than re-reading or highlighting diagrams.",
      "Study biological processes in their complete sequence and context, not as isolated steps. Don't memorize the 10 steps of glycolysis as a disconnected list; understand how glycolysis connects to the Krebs cycle (via conversion of pyruvate to acetyl-CoA) and electron transport chain (by producing NADH), where each process occurs (glycolysis in cytoplasm, Krebs in mitochondrial matrix, ETC in inner mitochondrial membrane), and how they work together to produce ATP from glucose. Similarly, understand how DNA replication, transcription, and translation form one continuous pathway from gene to protein, each dependent on the previous step. Context and connections improve retention far more than isolated memorization because your brain stores related information together.",
      "Use concrete analogies to make abstract molecular and cellular concepts memorable. The cell membrane as a gated community (some molecules pass freely, others need permission via receptors, security guards patrol for threats). Enzymes as highly specific locks that only accept one key shape (substrate). DNA replication as unzipping a jacket where each side serves as a template to rebuild the opposite side. The sodium-potassium pump as a revolving door that exchanges passengers (ions) going opposite directions. Active transport as swimming upstream requiring energy input, while passive diffusion is floating downstream. These mental models make microscopic processes easier to visualize and remember long-term.",
      "Practice writing out complete explanations of biological processes in your own words as if teaching someone who has never studied biology. For example, explain mitosis from start to finish including what triggers it, what happens in each phase (prophase, metaphase, anaphase, telophase), what cellular structures are involved (spindle fibers, centromeres, sister chromatids), and what the end result is (two genetically identical daughter cells). If you can clearly explain the process without referring to notes and your explanation includes all key details in logical order, you understand it at a level that will hold up under exam pressure. Teaching is one of the highest forms of learning because it requires organizing knowledge coherently.",
      "Focus disproportionate study time on high-yield topics that appear across multiple units and exam types. Cellular respiration (glycolysis, Krebs cycle, electron transport chain) appears on virtually every biology exam from high school to MCAT. Photosynthesis (light-dependent and light-independent reactions) is tested constantly in plant biology and ecology contexts. DNA replication, transcription, and translation form the central dogma of molecular biology and underpin genetics questions. Cell signaling and signal transduction pathways connect to immune system, nervous system, and endocrine system topics. Enzyme kinetics and factors affecting enzyme activity appear in biochemistry and metabolism questions. Master these foundational processes first before spending time on lower-yield specialty topics.",
      "When studying complex cycles (Krebs cycle, Calvin cycle, nitrogen cycle, carbon cycle), don't just memorize the names of intermediates—understand what inputs are required, what outputs are produced, where the cycle occurs, what its biological purpose is, and what happens if it's disrupted. For example, the Krebs cycle requires acetyl-CoA input, produces NADH, FADH2, and ATP, occurs in the mitochondrial matrix, serves to extract high-energy electrons from fuel molecules, and if disrupted (e.g., by lack of oxygen stopping ETC which stops Krebs by building up NADH), energy production collapses and cells switch to anaerobic fermentation. This functional understanding allows you to solve novel problems, not just recognize memorized facts.",
      "Test yourself on relationships between structure and function at every level of biological organization. For any structure you study (organelle, organ, tissue, molecule), ask 'How does its structure enable its function?' Alveoli have enormous surface area and thin walls to maximize gas exchange. Mitochondria have folded inner membranes (cristae) to increase surface area for electron transport chain proteins. DNA double helix allows each strand to serve as a template during replication. Root hairs increase surface area for water and nutrient absorption. The heart has four chambers with one-way valves to separate oxygenated and deoxygenated blood and maintain unidirectional flow. This structure-function relationship thinking is tested constantly and reveals whether you truly understand biology or just memorized terminology.",
    ],
    faq: [
      {
        q: "What biology topics can I make quizzes for?",
        a: "Upload notes on any biology topic: cell biology, genetics, evolution, ecology, human anatomy and physiology, microbiology, botany, or zoology. The quiz generator works with high school and college-level material.",
      },
      {
        q: "Are the questions good for AP Biology?",
        a: "Yes. Questions are generated at appropriate difficulty levels and tagged with Bloom's taxonomy, making them suitable for AP Biology or college intro courses.",
      },
      {
        q: "Can I generate questions from my textbook?",
        a: "Yes. Upload PDF pages or paste text from your biology textbook and get practice questions with explanations.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 10 quiz generations per month. Paid plans start at $2/month for 20 quizzes.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/notes-to-quiz",
      "/ai-quiz-generator",
    ],
    relatedExams: ["ap", "mcat", "midterm", "finals"],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    description:
      "Create chemistry practice questions on atomic structure, bonding, reactions, stoichiometry, and thermodynamics.",
    topicsList: [
      "Atomic Structure and Periodicity: electron configuration using Aufbau principle, Pauli exclusion principle, and Hund's rule, quantum numbers (n, l, ml, ms), orbital shapes (s, p, d, f), periodic trends including atomic radius, ionic radius, ionization energy, electron affinity, electronegativity (Pauling scale), metallic character, effective nuclear charge",
      "Chemical Bonding: ionic bonds (electrostatic attraction between cations and anions, lattice energy), covalent bonds (single, double, triple bonds, bond polarity, dipole moments), metallic bonding (sea of electrons model, properties of metals), Lewis structures (drawing electron dot structures, octet rule, expanded octets, resonance structures, formal charge calculations), VSEPR theory and molecular geometry (linear, trigonal planar, tetrahedral, trigonal bipyramidal, octahedral, bent, pyramidal), valence bond theory and orbital hybridization (sp, sp², sp³, sp³d, sp³d²), molecular orbital theory (bonding and antibonding orbitals, bond order), intermolecular forces (London dispersion forces, dipole-dipole interactions, hydrogen bonding) and their effects on physical properties",
      "Stoichiometry and Chemical Calculations: the mole concept and Avogadro's number (6.022×10²³), molar mass calculations, converting between mass, moles, and number of particles, percent composition and empirical/molecular formulas, balancing chemical equations using inspection or algebraic methods, stoichiometric calculations using mole ratios, limiting reactant identification, theoretical yield vs. actual yield, percent yield calculations, solution concentration (molarity, molality, percent by mass, dilution calculations M₁V₁=M₂V₂)",
      "Classification and Types of Chemical Reactions: synthesis (combination), decomposition, single replacement, double replacement, combustion reactions, oxidation-reduction (redox) reactions, identifying oxidation states, oxidizing agents and reducing agents, balancing redox reactions using half-reaction method or oxidation number method, precipitation reactions and solubility rules, net ionic equations",
      "Thermodynamics and Thermochemistry: system vs. surroundings, heat and work, internal energy, first law of thermodynamics (ΔU = q + w), enthalpy (H) and heat of reaction (ΔH), exothermic vs. endothermic processes, calorimetry (q = mcΔT), Hess's law (additivity of reaction enthalpies), standard enthalpy of formation, entropy (S) as measure of disorder, second and third laws of thermodynamics, Gibbs free energy (ΔG = ΔH - TΔS), spontaneity predictions (ΔG < 0 is spontaneous), relationship between ΔG and equilibrium constant K",
      "Chemical Kinetics: reaction rate definitions (change in concentration per unit time), rate laws (rate = k[A]^m[B]^n), determining reaction order (zero, first, second order) from experimental data, integrated rate laws, half-life calculations (t½ = 0.693/k for first order), collision theory and activation energy (Ea), Arrhenius equation (k = Ae^(-Ea/RT)), effect of temperature on reaction rate, catalysts (lower Ea but don't change ΔG or equilibrium position), reaction mechanisms (elementary steps, rate-determining step, intermediates)",
      "Chemical Equilibrium: equilibrium constant expressions (Kc for concentration, Kp for pressure), Le Chatelier's principle (predicting shifts when concentration, pressure, volume, or temperature changes), reaction quotient Q vs. equilibrium constant K, calculating equilibrium concentrations using ICE tables (Initial, Change, Equilibrium), relationship between Kc and Kp (Kp = Kc(RT)^Δn), solubility equilibrium (Ksp solubility product constant), common ion effect, complex ion equilibria",
      "Acids, Bases, and pH: Arrhenius, Brønsted-Lowry, and Lewis acid-base theories, conjugate acid-base pairs, strong vs. weak acids and bases, pH scale and pH = -log[H⁺], pOH and pOH = -log[OH⁻], relationship pH + pOH = 14 at 25°C, acid dissociation constant Ka and base dissociation constant Kb, relationship Ka × Kb = Kw = 1.0×10⁻¹⁴, calculating pH of strong and weak acid/base solutions, polyprotic acids (H₂SO₄, H₃PO₄), buffer solutions (Henderson-Hasselbalch equation pH = pKa + log([A⁻]/[HA])), acid-base titrations (equivalence point, indicators, titration curves), hydrolysis of salts (acidic, basic, or neutral solutions)",
      "Electrochemistry: galvanic (voltaic) cells producing electricity from spontaneous redox reactions, cell notation and salt bridge function, standard reduction potentials (E°), calculating standard cell potential (E°cell = E°cathode - E°anode), relationship between E°cell and ΔG° (ΔG° = -nFE°cell), Nernst equation for nonstandard conditions (E = E° - (RT/nF)lnQ), electrolytic cells (using electricity to drive nonspontaneous reactions), electrolysis applications (electroplating, producing elements from molten salts), Faraday's laws of electrolysis, corrosion as undesirable redox process",
      "Organic Chemistry Fundamentals: carbon bonding and hybridization, alkanes (saturated hydrocarbons with single bonds, nomenclature using IUPAC rules, structural isomers), alkenes (C=C double bonds, cis-trans isomerism), alkynes (C≡C triple bonds), aromatic compounds (benzene ring, resonance stabilization), functional groups (alcohols -OH, aldehydes -CHO, ketones -C(=O)-, carboxylic acids -COOH, esters -COO-, amines -NH₂, amides -CONH₂, ethers -O-, halides -X), nomenclature of organic compounds, physical properties and intermolecular forces in organic molecules, common organic reaction types (substitution, addition, elimination, oxidation, reduction, esterification, hydrolysis), reaction mechanisms showing electron movement with curved arrows",
    ],
    sampleQuestions: [
      {
        q: "What is the electron configuration of oxygen (atomic number 8)?",
        a: "1s² 2s² 2p⁴",
        explanation:
          "Oxygen has 8 electrons: 2 in the first shell (1s²), 2 in the 2s orbital (2s²), and 4 in the 2p orbitals (2p⁴).",
      },
      {
        q: "Which type of bond forms when electrons are shared between atoms?",
        a: "Covalent bond",
        explanation:
          "Covalent bonds form when two atoms share one or more pairs of electrons, typically between nonmetals.",
      },
      {
        q: "If 2 moles of hydrogen react with 1 mole of oxygen, how many moles of water form?",
        a: "2 moles",
        explanation:
          "The balanced equation 2H₂ + O₂ → 2H₂O shows that 2 moles of water are produced from 2 moles of hydrogen and 1 mole of oxygen.",
      },
      {
        q: "What happens to the equilibrium position when temperature increases for an exothermic reaction?",
        a: "Shifts to the left (toward reactants)",
        explanation:
          "Le Chatelier's principle: increasing temperature adds heat. For exothermic reactions (which release heat), the equilibrium shifts to consume the added heat by favoring the reverse reaction.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions are excellent for testing conceptual understanding and application—predicting how equilibrium shifts when temperature increases (Le Chatelier's principle), explaining periodic trends in ionization energy, identifying oxidation states in redox reactions, determining molecular geometry from Lewis structures using VSEPR theory, or calculating limiting reactants and theoretical yield in stoichiometry problems. These should require reasoning and applying principles, not just recognizing memorized facts. Fill-in-the-blank is critical for nomenclature and chemical formulas since you must produce the exact correct answer: writing the formula for sulfuric acid (H₂SO₄), naming ionic compounds (calcium phosphate is Ca₃(PO₄)₂), writing electron configurations (chromium is [Ar]3d⁵4s¹), or filling in balanced equations. This forces active recall without multiple choice hints. Flashcards are absolutely essential for high-volume memorization: all polyatomic ions with names, formulas, and charges (sulfate SO₄²⁻, nitrate NO₃⁻, phosphate PO₄³⁻, ammonium NH₄⁺, carbonate CO₃²⁻, hydroxide OH⁻), organic functional groups (aldehyde, ketone, carboxylic acid, ester, amine), strong acids and bases (HCl, HNO₃, H₂SO₄, HClO₄, NaOH, KOH), solubility rules for precipitation reactions. True/false questions effectively identify and correct common misconceptions—for example, 'A catalyst lowers the activation energy of a reaction' (true), 'Catalysts shift the equilibrium position toward products' (false, they only speed up reaching equilibrium), 'Ionic compounds always form from metal + nonmetal' (mostly true with exceptions like NH₄⁺), 'Adding a catalyst increases the yield of a reaction' (false, it only increases the rate).",
    studyTips: [
      "Memorize all common polyatomic ions with their formulas and charges cold—these appear constantly in formula writing, nomenclature, stoichiometry, and solution chemistry, and exams assume instant recognition. Essential ones: sulfate SO₄²⁻, sulfite SO₃²⁻, nitrate NO₃⁻, nitrite NO₂⁻, phosphate PO₄³⁻, carbonate CO₃²⁻, bicarbonate HCO₃⁻, hydroxide OH⁻, ammonium NH₄⁺, acetate CH₃COO⁻, cyanide CN⁻, permanganate MnO₄⁻, chromate CrO₄²⁻, dichromate Cr₂O₇²⁻, hypochlorite ClO⁻, chlorate ClO₃⁻, perchlorate ClO₄⁻. Make flashcards and drill until you can instantly write the formula and charge for any polyatomic ion name, and vice versa. This saves massive amounts of time on exams and prevents errors in multi-step problems.",
      "Practice balancing chemical equations daily until it becomes completely automatic and you can balance equations in under 30 seconds. This fundamental skill is required for stoichiometry (you can't calculate moles of product without a balanced equation), thermodynamics (Hess's law uses balanced equations), electrochemistry (writing half-reactions and overall cell reactions), and virtually every other chemistry topic. Start with simple equations and progress to complex ones including combustion (balancing C, H, then O) and redox reactions. Use the inspection method for simple equations and the half-reaction or algebraic method for redox. Speed and accuracy here unlock the rest of chemistry.",
      "Deeply understand periodic table trends and be able to explain why they occur based on electron configuration and effective nuclear charge. Moving left to right across a period: atomic radius decreases (increasing Zeff pulls electrons closer), ionization energy increases (harder to remove electrons when they're held tighter), electronegativity increases (atoms more strongly attract bonding electrons). Moving down a group: atomic radius increases (more electron shells), ionization energy decreases (outer electrons farther from nucleus and easier to remove), electronegativity decreases. These patterns explain reactivity (Group 1 gets more reactive down, halogens get less reactive down), bonding (electronegativity difference predicts ionic vs. covalent), and most of chemistry's observed behavior. If you understand the 'why,' you can predict properties without memorization.",
      "Master drawing Lewis structures systematically and predicting molecular geometry using VSEPR theory. Count total valence electrons, connect atoms with single bonds, distribute remaining electrons to satisfy octets (or duets for H), then adjust for multiple bonds if needed. Check formal charges to identify best resonance structures (formal charge = valence e⁻ - nonbonding e⁻ - ½ bonding e⁻). Once you have the Lewis structure, count electron groups around the central atom (bonding pairs + lone pairs) to get electron geometry, then count only bonding groups to get molecular shape. This connects structure to properties: polarity, boiling point, solubility. VSEPR and Lewis structures appear on nearly every chemistry exam because they're foundational to understanding molecular behavior.",
      "Prioritize high-yield topics that appear across multiple units and connect to each other. Stoichiometry is the foundation for solution chemistry, gas laws, thermodynamics, and kinetics—you can't calculate anything without mole ratios. Thermodynamics (ΔH, ΔS, ΔG) determines whether reactions are spontaneous and connects to equilibrium (ΔG° = -RTlnK). Chemical kinetics explains how fast equilibrium is reached and connects to catalysis. Acid-base chemistry and buffers appear in titrations, equilibrium, and biochemistry contexts. Electrochemistry brings together redox, thermodynamics (ΔG = -nFE), and equilibrium. Master these core topics first before spending time on niche topics that appear once per semester.",
      "For organic chemistry, practice drawing reaction mechanisms with curved arrows showing electron movement rather than just memorizing individual reactions as isolated facts. Understand that most organic reactions fall into categories: nucleophiles attack electrophiles (substitution, addition), leaving groups depart (elimination, substitution), proton transfers establish reactive intermediates. If you understand electron-rich sites (lone pairs, pi bonds) attack electron-poor sites (carbocations, carbonyl carbons, acidic protons), you can predict or reconstruct mechanisms even for reactions you haven't explicitly memorized. This mechanistic thinking is far more powerful and efficient than rote memorization of hundreds of named reactions.",
      "Work problems from the end of each textbook chapter immediately after reading, not just before exams. Chemistry is learned by doing, not by passive reading. If you read about stoichiometry and then don't practice calculations until the exam review session, you'll have forgotten the process and spent your reading time inefficiently. Active problem-solving immediately after learning the concept cements the process while it's fresh, reveals gaps in understanding when there's time to fix them, and builds speed and accuracy. Aim for 10-15 practice problems per chapter section, including a mix of easy, medium, and hard problems.",
    ],
    faq: [
      {
        q: "What chemistry topics are covered?",
        a: "Generate questions on general chemistry topics: atomic structure, periodic trends, chemical bonding, stoichiometry, reactions, acids and bases, thermodynamics, kinetics, and equilibrium.",
      },
      {
        q: "Can I practice organic chemistry?",
        a: "Yes. Upload your organic chemistry notes (functional groups, reactions, mechanisms) and generate practice questions.",
      },
      {
        q: "Do questions include chemical formulas?",
        a: "Yes. Questions include chemical equations, Lewis structures, and calculations when relevant to your source material.",
      },
      {
        q: "Is this suitable for AP Chemistry?",
        a: "Yes. Questions are generated at appropriate difficulty and complexity for high school AP or college general chemistry courses.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
      "/multiple-choice-quiz-maker",
    ],
    relatedExams: ["ap", "mcat", "midterm", "finals"],
  },
  {
    slug: "physics",
    name: "Physics",
    description:
      "Generate physics quiz questions covering mechanics, electricity, magnetism, waves, thermodynamics, and modern physics.",
    sampleQuestions: [
      {
        q: "A 5 kg object accelerates at 2 m/s². What force is applied?",
        a: "10 N",
        explanation:
          "Using Newton's second law F = ma, force equals mass times acceleration: F = 5 kg × 2 m/s² = 10 N.",
      },
      {
        q: "What happens to resistance when a wire's length doubles?",
        a: "Resistance doubles",
        explanation:
          "Resistance is directly proportional to length (R = ρL/A). If length doubles while area stays constant, resistance doubles.",
      },
      {
        q: "Which law states that energy cannot be created or destroyed?",
        a: "First law of thermodynamics (conservation of energy)",
        explanation:
          "The first law of thermodynamics states that the total energy of an isolated system remains constant; energy can only change forms.",
      },
    ],
    faq: [
      {
        q: "What physics topics can I generate questions for?",
        a: "Upload notes on any physics topic: mechanics (motion, forces, energy), electricity and magnetism, waves and optics, thermodynamics, or modern physics (quantum mechanics, relativity).",
      },
      {
        q: "Are calculations included in questions?",
        a: "Yes. Questions include numerical problems with step-by-step explanations showing the calculation process.",
      },
      {
        q: "Is this good for AP Physics?",
        a: "Yes. Generate questions at appropriate difficulty for AP Physics 1, 2, C (Mechanics), or C (E&M) based on your uploaded notes.",
      },
      {
        q: "Can I practice both conceptual and problem-solving questions?",
        a: "Yes. The generator creates a mix of conceptual understanding questions and quantitative problems based on your source material.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
    ],
    relatedExams: ["ap", "gre", "midterm", "finals"],
  },
  {
    slug: "math",
    name: "Mathematics",
    description:
      "Create math practice questions for algebra, geometry, trigonometry, calculus, and statistics.",
    topicsList: [
      "Algebra: solving linear equations and inequalities (one variable, multi-step, with fractions), solving quadratic equations (factoring, completing the square, quadratic formula), systems of linear equations (substitution, elimination, graphing), polynomials (adding, subtracting, multiplying, dividing, factoring including difference of squares and sum/difference of cubes), rational expressions and equations, exponent rules and radicals, absolute value equations and inequalities",
      "Geometry: angle relationships (complementary, supplementary, vertical, corresponding, alternate interior/exterior), triangle properties (angle sum theorem, exterior angle theorem, triangle inequality, congruence and similarity), Pythagorean theorem and special right triangles (30-60-90, 45-45-90), circles (circumference, area, arc length, sector area, inscribed angles, central angles, chord properties), polygons (interior and exterior angle sums, regular polygons), perimeter and area formulas (rectangles, parallelograms, trapezoids, triangles, circles), surface area and volume of 3D shapes (prisms, pyramids, cylinders, cones, spheres), coordinate geometry (distance formula, midpoint formula, slope, equations of lines)",
      "Trigonometry: six trigonometric functions (sine, cosine, tangent, cosecant, secant, cotangent), unit circle (radian and degree measure, special angles 0°, 30°, 45°, 60°, 90° and their radian equivalents), graphing trigonometric functions (amplitude, period, phase shift, vertical shift), trigonometric identities (Pythagorean identities, angle sum and difference formulas, double angle formulas, half angle formulas), solving trigonometric equations, law of sines and law of cosines for non-right triangles, inverse trigonometric functions",
      "Precalculus: functions and function notation (domain, range, composition, inverse functions), polynomial functions (zeros, end behavior, graphing, Remainder and Factor theorems), rational functions (asymptotes, holes, graphing), exponential functions (growth and decay, compound interest), logarithmic functions (properties of logarithms, change of base formula, solving exponential and logarithmic equations), conic sections (circles, parabolas, ellipses, hyperbolas in standard form, graphing), sequences and series (arithmetic, geometric, summation notation)",
      "Calculus: limits and continuity (evaluating limits algebraically and graphically, one-sided limits, limits at infinity, continuity at a point), derivatives (definition as limit of difference quotient, power rule, product rule, quotient rule, chain rule, derivatives of trig, exponential, and logarithmic functions, implicit differentiation), applications of derivatives (tangent lines, related rates, optimization problems, curve sketching with increasing/decreasing intervals and concavity, L'Hôpital's rule), integrals (antiderivatives, definite integrals, Fundamental Theorem of Calculus, substitution method, integration by parts), applications of integrals (area between curves, volume of solids of revolution using disk and shell methods, accumulation problems), differential equations (separable equations, slope fields, exponential growth and decay models)",
      "Statistics and Probability: descriptive statistics (mean, median, mode, range, quartiles, interquartile range, standard deviation, variance, five-number summary, box plots, histograms, scatterplots), probability fundamentals (sample space, events, P(A) = favorable/total, complement rule, addition rule, multiplication rule for independent events, conditional probability and Bayes' theorem), counting principles (permutations nPr = n!/(n-r)!, combinations nCr = n!/[r!(n-r)!]), probability distributions (discrete vs. continuous, binomial distribution, normal distribution with mean μ and standard deviation σ, z-scores and standard normal table), sampling distributions (Central Limit Theorem, distribution of sample means), confidence intervals and hypothesis testing (null and alternative hypotheses, p-values, Type I and II errors, t-tests, chi-square tests), correlation and linear regression (correlation coefficient r, least-squares regression line, interpreting slope and y-intercept, residuals)",
    ],
    sampleQuestions: [
      {
        q: "Solve for x: 3x + 7 = 22",
        a: "x = 5",
        explanation:
          "Subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5.",
      },
      {
        q: "What is the area of a circle with radius 4?",
        a: "16π (approximately 50.27 square units)",
        explanation:
          "Area of a circle is A = πr². With r = 4, A = π(4)² = 16π ≈ 50.27.",
      },
      {
        q: "Find the derivative of f(x) = x³ + 2x",
        a: "f'(x) = 3x² + 2",
        explanation:
          "Apply the power rule: derivative of x³ is 3x², derivative of 2x is 2. Combined: f'(x) = 3x² + 2.",
      },
      {
        q: "What is the value of sin(π/6)?",
        a: "1/2",
        explanation:
          "π/6 radians equals 30 degrees. The sine of 30 degrees is 1/2, a standard unit circle value.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions work well for conceptual understanding (identifying function types, choosing the correct formula) and for problems where the final answer is a specific number. Fill-in-the-blank is excellent for practicing formula recall and ensuring you arrive at exact answers without hints. Flashcards help memorize formulas, trig identities, and derivative rules. True/false questions identify common algebraic mistakes (e.g., 'x² + x² = x⁴' is false).",
    studyTips: [
      "Memorize core formulas and identities: quadratic formula, distance formula, trig identities, derivative and integral rules. These save time on exams and reduce errors.",
      "Show your work even when practicing alone. Writing out steps catches calculation errors and builds the habit for partial credit on tests.",
      "Check answers by substituting back into the original equation. If you solved for x = 5, plug it back in to verify. This catches sign errors and dropped terms.",
      "Practice mental estimation before calculating. For example, √50 is between 7 and 8 because 7² = 49 and 8² = 64. This catches input errors on calculators.",
      "Focus on problem types that appear frequently: quadratic equations, right triangle trigonometry, basic derivatives and integrals, mean and standard deviation.",
      "For word problems, draw diagrams or write out what you know vs. what you're solving for. Visual representation clarifies the setup and reveals which formula to use.",
    ],
    faq: [
      {
        q: "What math levels can I practice?",
        a: "Generate questions for any level: pre-algebra, algebra 1 and 2, geometry, trigonometry, precalculus, calculus, and statistics.",
      },
      {
        q: "Do questions show step-by-step solutions?",
        a: "Yes. Every question includes an explanation showing the solution process and key concepts.",
      },
      {
        q: "Can I upload problem sets to generate similar questions?",
        a: "Yes. Upload homework problems or textbook pages and the generator creates similar practice problems with different numbers.",
      },
      {
        q: "Is this suitable for standardized tests?",
        a: "Yes. Generate SAT, ACT, GRE, or AP Calculus style questions by uploading relevant practice material.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/ai-quiz-generator",
      "/for-students",
    ],
    relatedExams: ["sat", "act", "gre", "ap", "midterm", "finals"],
  },
  {
    slug: "history",
    name: "History",
    description:
      "Generate history quiz questions on world history, US history, European history, and historical analysis.",
    sampleQuestions: [
      {
        q: "What year did World War II end?",
        a: "1945",
        explanation:
          "World War II ended in 1945 with Germany's surrender in May and Japan's surrender in August after the atomic bombings.",
      },
      {
        q: "Which document established the principle of limited government in England?",
        a: "Magna Carta (1215)",
        explanation:
          "The Magna Carta limited the king's power and established that even monarchs must follow the law, a foundational principle of constitutional government.",
      },
      {
        q: "What was the primary cause of the American Civil War?",
        a: "Slavery and states' rights disputes",
        explanation:
          "While multiple factors contributed, the central issue was the conflict over slavery and whether states had the right to maintain it, leading to secession and war.",
      },
    ],
    faq: [
      {
        q: "What history topics can I generate quizzes for?",
        a: "Upload notes on any history topic: ancient civilizations, medieval history, world wars, US history, European history, or specific events and periods.",
      },
      {
        q: "Do questions test memorization or analysis?",
        a: "Both. Questions are tagged by Bloom's taxonomy level, testing factual recall, understanding of causes and effects, and historical analysis.",
      },
      {
        q: "Can I generate AP History style questions?",
        a: "Yes. Upload AP US History, World History, or European History notes to generate questions matching AP exam format and difficulty.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 10 quiz generations per month. Paid plans start at $2/month.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/quiz-generator-from-pdf",
      "/study-guide-generator",
    ],
    relatedExams: ["ap", "sat", "midterm", "finals"],
  },
  {
    slug: "english",
    name: "English",
    description:
      "Create English quiz questions on grammar, literature analysis, reading comprehension, and writing skills.",
    sampleQuestions: [
      {
        q: "Identify the subject in this sentence: 'The cat on the roof meowed loudly.'",
        a: "The cat",
        explanation:
          "The subject is 'the cat' (with 'on the roof' as a prepositional phrase modifying it). The verb is 'meowed.'",
      },
      {
        q: "What literary device is used: 'The wind whispered through the trees'?",
        a: "Personification",
        explanation:
          "Personification gives human characteristics (whispering) to non-human things (wind).",
      },
      {
        q: "Which sentence is grammatically correct?",
        a: "'She and I went to the store' (not 'Her and me went to the store')",
        explanation:
          "Use subject pronouns (she, I) when they are the subject of the sentence. 'Her' and 'me' are object pronouns.",
      },
    ],
    faq: [
      {
        q: "What English topics are covered?",
        a: "Generate questions on grammar and syntax, literature analysis, reading comprehension, vocabulary, writing techniques, and rhetorical devices.",
      },
      {
        q: "Can I practice AP English Language or Literature?",
        a: "Yes. Upload literary texts or rhetorical analysis material to generate AP-level questions on themes, devices, and argumentation.",
      },
      {
        q: "Do questions include reading passages?",
        a: "Yes. Upload a text passage and the generator creates comprehension and analysis questions based on it.",
      },
      {
        q: "Is this good for SAT/ACT English prep?",
        a: "Yes. Generate grammar and reading comprehension questions matching SAT and ACT format and difficulty.",
      },
    ],
    relatedTools: [
      "/vocabulary",
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
    ],
    relatedExams: ["sat", "act", "ap", "toefl", "ielts"],
  },
  {
    slug: "vocabulary",
    name: "Vocabulary",
    description:
      "Generate vocabulary quiz questions and flashcards for SAT, GRE, TOEFL prep or any word list.",
    topicsList: [
      "SAT Vocabulary: high-frequency academic words that appear repeatedly on college entrance exams including ubiquitous, ephemeral, pragmatic, laconic, ambiguous, benevolent, tenacious, superfluous, esoteric, candid, disparate, frivolous, austere, meticulous, reclusive, capricious, vindicate, mitigate, undermine, substantiate, scrutinize, denounce, alleviate, reconcile; words testing nuance and precision in academic contexts; vocabulary for reading comprehension passages from history, social science, and natural science",
      "GRE Vocabulary: advanced academic and literary terms for graduate school admissions including abstruse, anachronism, assuage, aver, burgeon, chicanery, desultory, ebullient, enervate, equivocate, erudite, filibuster, garrulous, iconoclast, impetuous, intransigent, loquacious, malinger, obdurate, pedantic, perfidy, quixotic, recalcitrant, sanguine, truculent, vitriolic, voluble; words requiring understanding of subtle connotations and shades of meaning; vocabulary appearing in literary criticism, philosophy, and academic discourse",
      "TOEFL/IELTS Vocabulary: English proficiency words for non-native speakers preparing for academic study in English-speaking countries; academic register vocabulary (commence, obtain, fundamental, establish, subsequent, inevitable, phenomenon, comprise, derive, facilitate); words for expressing opinions and arguments (assert, contend, advocate, refute, postulate); words for describing research and evidence (empirical, qualitative, quantitative, methodology, hypothesis, correlation); common academic collocations (conduct research, pose a question, draw a conclusion, cite evidence); phrasal verbs and idiomatic expressions used in academic contexts",
      "Academic Vocabulary Across Disciplines: discipline-specific terminology for college coursework; scientific vocabulary (hypothesis, theory, empirical, methodology, quantitative, qualitative, variable, control group, statistical significance); social science vocabulary (demographics, socioeconomic, correlation, causation, paradigm, ideology, infrastructure); humanities vocabulary (narrative, rhetoric, allegory, juxtaposition, context, interpretation, discourse, aesthetic); mathematical vocabulary (coefficient, equation, variable, ratio, proportion, theorem, proof, domain, range); vocabulary for academic writing (furthermore, nevertheless, consequently, notwithstanding, albeit, whereas, thereby, henceforth)",
      "Word Roots, Prefixes, and Suffixes: Greek roots (bio = life in biology and biography, geo = earth in geography and geology, phon = sound in telephone and phonics, graph = write in autograph and biography, log/logy = study in biology and psychology, chron = time in chronological and chronic, phil = love in philosophy and philanthropy); Latin roots (port = carry in transport and portable, scrib/script = write in prescribe and manuscript, dict = say in dictate and predict, ject = throw in reject and project, bene = good in benefit and benevolent, mal = bad in malicious and malfunction, aud = hear in audience and auditory); prefixes (un-, in-, dis- = not/opposite, re- = again, pre- = before, post- = after, sub- = under, super- = above, inter- = between, intra- = within, extra- = beyond, anti- = against, auto- = self, micro- = small, macro- = large, multi- = many, mono- = one); suffixes (-able/-ible = capable of, -ful = full of, -less = without, -ness = state of, -ment = action/result, -tion/-sion = act/process, -ology = study of, -ist = one who, -ize = to make)",
      "Context Clues for Determining Meaning: definition clues (word is defined directly in the sentence or nearby), synonym clues (a similar word appears nearby to clarify meaning), antonym clues (a contrasting word reveals meaning through opposition, often with signal words like 'unlike,' 'however,' 'although'), example clues (specific examples illustrate the word's meaning), inference clues (overall sentence meaning suggests the word's definition even without explicit hints); recognizing context clue signal words (such as, for example, including, like, unlike, but, however, although, that is, in other words); using part of speech to narrow possibilities; using general sentence meaning and logic to eliminate impossible definitions",
    ],
    sampleQuestions: [
      {
        q: "Which word means 'using very few words'?",
        a: "Laconic",
        explanation:
          "Laconic describes someone who uses few words; brief and to the point in speech.",
      },
      {
        q: "Choose the best synonym for 'ubiquitous':",
        a: "Omnipresent",
        explanation:
          "Both ubiquitous and omnipresent mean present everywhere at the same time.",
      },
      {
        q: "What does 'ephemeral' mean?",
        a: "Lasting a very short time",
        explanation:
          "Ephemeral describes something that is fleeting or transitory, existing briefly.",
      },
      {
        q: "The root 'bene' means 'good.' What does 'benevolent' mean?",
        a: "Kind, charitable, wishing well for others",
        explanation:
          "Benevolent combines 'bene' (good) with 'volent' (wishing), meaning having good intentions toward others.",
      },
    ],
    questionTypesAdvice:
      "Flashcards are the most effective format for vocabulary study—they force active recall of definitions without hints. Multiple choice questions work well for practicing synonym selection and context-based meaning, which appear on SAT and GRE. Fill-in-the-blank tests whether you can supply the exact word from context clues, a deeper skill than recognition. True/false questions help identify common usage errors and misunderstood connotations.",
    studyTips: [
      "Learn words in context, not in isolation. Memorizing 'laconic = brief' is weaker than reading 'Her laconic reply—just 'Fine'—ended the conversation.' Context makes words stick.",
      "Study word roots, prefixes, and suffixes. Knowing 'bene' means good lets you decode benevolent, benefactor, and beneficent without memorizing each separately.",
      "Create example sentences using new words. Writing 'The ephemeral beauty of cherry blossoms makes them more precious' cements the meaning better than rereading a definition.",
      "Group words by theme or root family. Study all words related to 'time' together (ephemeral, contemporary, chronic) or all words with 'mal' (bad): malevolent, malign, malady.",
      "Review spaced intervals: 1 day, 3 days, 1 week, 2 weeks. Spaced repetition moves words from short-term to long-term memory more efficiently than cramming.",
      "For SAT/GRE, focus on high-frequency words that appear repeatedly. A 500-word core vocabulary list covers 80% of challenging words on these tests.",
    ],
    faq: [
      {
        q: "Can I create flashcards for my vocabulary list?",
        a: "Yes. Upload or paste your word list and get flashcards with definitions, synonyms, and example sentences.",
      },
      {
        q: "What vocabulary levels are supported?",
        a: "Generate questions for any level: elementary, high school, SAT, GRE, TOEFL, or academic/professional vocabulary.",
      },
      {
        q: "Do questions include context clues?",
        a: "Yes. Questions use vocabulary in sentence context to test real understanding, not just memorization.",
      },
      {
        q: "Can I practice words in other languages?",
        a: "Yes. Examina generates in 29 languages, so you can create vocabulary practice for Spanish, French, German, and more.",
      },
    ],
    relatedTools: [
      "/ai-flashcards",
      "/fill-in-the-blank-generator",
      "/ai-quiz-generator",
    ],
    relatedExams: ["sat", "gre", "toefl", "ielts"],
  },
  {
    slug: "spanish",
    name: "Spanish",
    description:
      "Create Spanish language quiz questions for vocabulary, grammar, conjugation, and reading comprehension.",
    sampleQuestions: [
      {
        q: "¿Cuál es el pretérito de 'hablar' en la primera persona singular?",
        a: "Hablé",
        explanation:
          "The preterite (past tense) of 'hablar' in first person singular (I) is 'hablé.'",
      },
      {
        q: "Translate: 'She is going to the store.'",
        a: "Ella va a la tienda.",
        explanation:
          "'Va' is the third person singular present of 'ir' (to go). 'A la tienda' means 'to the store.'",
      },
      {
        q: "Which word is feminine: libro, casa, perro, or gato?",
        a: "Casa",
        explanation:
          "'Casa' (house) is feminine (la casa). The others are masculine: el libro, el perro, el gato.",
      },
    ],
    faq: [
      {
        q: "What Spanish topics can I practice?",
        a: "Generate questions on vocabulary, verb conjugation, grammar rules, sentence structure, and reading comprehension at any level.",
      },
      {
        q: "Can I practice for AP Spanish?",
        a: "Yes. Upload AP Spanish course material to generate questions matching the exam's format and difficulty.",
      },
      {
        q: "Do questions include accents and special characters?",
        a: "Yes. Questions use proper Spanish orthography including accents (á, é, í, ó, ú) and ñ.",
      },
      {
        q: "Can I generate questions in Spanish for Spanish speakers?",
        a: "Yes. The tool works in both directions: English speakers learning Spanish, or Spanish speakers studying any subject in Spanish.",
      },
    ],
    relatedTools: [
      "/ai-flashcards",
      "/vocabulary",
      "/fill-in-the-blank-generator",
    ],
    relatedExams: ["ap"],
  },
  {
    slug: "anatomy",
    name: "Anatomy",
    description:
      "Generate anatomy and physiology quiz questions on body systems, organs, tissues, and medical terminology.",
    topicsList: [
      "Skeletal System: axial skeleton (skull bones including cranium and facial bones, vertebral column with cervical/thoracic/lumbar/sacral/coccygeal vertebrae, rib cage with true/false/floating ribs, sternum) and appendicular skeleton (pectoral girdle with clavicle and scapula, upper limb bones including humerus, radius, ulna, carpals, metacarpals, phalanges, pelvic girdle with ilium, ischium, pubis, lower limb bones including femur, patella, tibia, fibula, tarsals, metatarsals, phalanges); bone structure (compact bone with osteons, spongy bone with trabeculae, bone marrow, periosteum, endosteum); bone formation (ossification, growth plates); joints and articulations (fibrous, cartilaginous, synovial joints including hinge, ball-and-socket, pivot, gliding, saddle; joint movements including flexion, extension, abduction, adduction, rotation, circumduction)",
      "Muscular System: three muscle types (skeletal muscle striated and voluntary, cardiac muscle striated and involuntary, smooth muscle non-striated and involuntary); skeletal muscle structure (fascicles, muscle fibers, myofibrils, sarcomeres with actin and myosin, A bands, I bands, Z lines, H zones); muscle contraction mechanism (sliding filament theory, neuromuscular junction, acetylcholine, calcium release, cross-bridge cycling, ATP requirement); major skeletal muscles (head: temporalis, masseter; neck: sternocleidomastoid; trunk: pectoralis major, latissimus dorsi, rectus abdominis, external obliques, erector spinae; upper limb: deltoid, biceps brachii, triceps brachii, brachialis; lower limb: gluteus maximus, quadriceps femoris group including rectus femoris, vastus lateralis, vastus medialis, hamstring group, gastrocnemius, soleus); muscle actions, origins, and insertions; tendons vs. ligaments",
      "Cardiovascular System: heart anatomy (four chambers with right and left atria, right and left ventricles, interatrial septum, interventricular septum, tricuspid valve, bicuspid/mitral valve, pulmonary semilunar valve, aortic semilunar valve, chordae tendineae, papillary muscles, layers including endocardium, myocardium, epicardium, pericardium); blood flow pathway (superior/inferior vena cava → right atrium → tricuspid valve → right ventricle → pulmonary semilunar valve → pulmonary arteries → lungs → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → body); major blood vessels (aorta and branches including coronary arteries, carotid arteries, subclavian, brachial, radial, ulnar, femoral, popliteal, tibial; vena cava system, jugular veins, portal vein); blood vessel structure (tunica intima with endothelium, tunica media with smooth muscle, tunica externa/adventitia, differences in arteries vs. veins vs. capillaries); blood components (plasma, red blood cells with hemoglobin, white blood cells including neutrophils, lymphocytes, monocytes, eosinophils, basophils, platelets)",
      "Respiratory System: upper respiratory tract (nasal cavity, paranasal sinuses, pharynx including nasopharynx, oropharynx, laryngopharynx, larynx with vocal cords and epiglottis) and lower respiratory tract (trachea with C-shaped cartilage rings, bronchi, bronchioles, alveoli); lungs (right lung with three lobes, left lung with two lobes, pleura including visceral and parietal layers, pleural cavity with serous fluid); gas exchange at alveolar-capillary membrane (oxygen diffuses into blood, carbon dioxide diffuses into alveoli); respiratory mechanics (inspiration via diaphragm contraction and external intercostal contraction increasing thoracic volume, expiration normally passive, respiratory volumes including tidal volume, vital capacity, residual volume); oxygen transport via hemoglobin, carbon dioxide transport as bicarbonate ion",
      "Nervous System: central nervous system (brain with cerebrum divided into frontal, parietal, temporal, occipital lobes, cerebral cortex with gray matter, cerebellum, brainstem including midbrain, pons, medulla oblongata, diencephalon with thalamus and hypothalamus; spinal cord with cervical, thoracic, lumbar, sacral segments, gray matter with dorsal and ventral horns, white matter with ascending and descending tracts, meninges including dura mater, arachnoid mater, pia mater, cerebrospinal fluid); peripheral nervous system (12 pairs of cranial nerves: olfactory I, optic II, oculomotor III, trochlear IV, trigeminal V, abducens VI, facial VII, vestibulocochlear VIII, glossopharyngeal IX, vagus X, accessory XI, hypoglossal XII; 31 pairs of spinal nerves; autonomic nervous system with sympathetic and parasympathetic divisions); neuron structure (cell body, dendrites, axon, myelin sheath, Schwann cells, nodes of Ranvier, synapse); nerve impulse transmission (resting potential, action potential, depolarization, repolarization, synaptic transmission with neurotransmitters)",
      "Digestive System: gastrointestinal tract (mouth with teeth and tongue, pharynx, esophagus with peristalsis, stomach with fundus, body, antrum, pyloric sphincter, small intestine with duodenum, jejunum, ileum, large intestine with cecum, appendix, colon including ascending, transverse, descending, sigmoid, rectum, anal canal with internal and external anal sphincters); accessory digestive organs (salivary glands producing amylase, liver producing bile and performing metabolism, gallbladder storing and concentrating bile, pancreas producing digestive enzymes including amylase, lipase, proteases, and producing bicarbonate); digestion (mechanical breakdown, chemical digestion with enzymes breaking down carbohydrates, proteins, and fats) and absorption (nutrients absorbed primarily in small intestine via villi and microvilli)",
      "Urinary System: kidneys (retroperitoneal location, renal cortex, renal medulla with pyramids, renal pelvis, hilum); nephron as functional unit (renal corpuscle with glomerulus and Bowman's capsule, proximal convoluted tubule, loop of Henle with descending and ascending limbs, distal convoluted tubule, collecting duct); kidney function (filtration at glomerulus, reabsorption in tubules returning water and nutrients to blood, secretion adding wastes to urine, urine formation); ureters transporting urine to bladder, urinary bladder (detrusor muscle, internal and external urethral sphincters), urethra",
      "Reproductive System: male reproductive system (testes producing sperm and testosterone, epididymis for sperm maturation and storage, vas deferens, seminal vesicles, prostate gland, bulbourethral glands, penis with erectile tissue); female reproductive system (ovaries producing ova and estrogen and progesterone, fallopian tubes with fimbriae, uterus with fundus, body, cervix, endometrium, myometrium, perimetrium, vagina, external genitalia including labia majora, labia minora, clitoris); menstrual cycle (follicular phase, ovulation, luteal phase, menstruation, hormonal regulation with FSH, LH, estrogen, progesterone)",
      "Endocrine System: major endocrine glands and their hormones (hypothalamus producing releasing and inhibiting hormones, pituitary gland with anterior lobe producing growth hormone, TSH, ACTH, FSH, LH, prolactin, posterior lobe releasing oxytocin and ADH, thyroid gland producing T3, T4, and calcitonin, parathyroid glands producing PTH, adrenal glands with cortex producing cortisol, aldosterone, and sex hormones, medulla producing epinephrine and norepinephrine, pancreas with islets of Langerhans producing insulin and glucagon, gonads producing sex hormones); hormone regulation via negative feedback loops; target organs and hormone actions",
      "Integumentary System: skin layers (epidermis with stratum corneum, stratum lucidum, stratum granulosum, stratum spinosum, stratum basale; dermis with papillary layer and reticular layer containing blood vessels, nerves, hair follicles, sebaceous glands, sweat glands; hypodermis/subcutaneous layer with adipose tissue); skin appendages (hair, nails, sebaceous glands producing sebum, sweat glands including eccrine and apocrine); skin functions (protection, thermoregulation, sensation, vitamin D synthesis, excretion); wound healing phases (hemostasis, inflammation, proliferation with granulation tissue, remodeling)",
    ],
    sampleQuestions: [
      {
        q: "Which chamber of the heart receives oxygenated blood from the lungs?",
        a: "Left atrium",
        explanation:
          "Oxygenated blood returns from the lungs via pulmonary veins to the left atrium, then passes to the left ventricle before being pumped to the body.",
      },
      {
        q: "What type of joint is the shoulder?",
        a: "Ball-and-socket joint",
        explanation:
          "The shoulder is a ball-and-socket joint where the humeral head (ball) fits into the glenoid cavity (socket), allowing wide range of motion.",
      },
      {
        q: "Which cranial nerve is responsible for vision?",
        a: "Optic nerve (CN II)",
        explanation:
          "The optic nerve (cranial nerve II) carries visual information from the retina to the brain.",
      },
      {
        q: "What structure connects muscle to bone?",
        a: "Tendon",
        explanation:
          "Tendons are dense connective tissue that attach muscle to bone, transmitting force from muscle contraction to produce movement.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions work well for identifying structures, functions, and pathways. Fill-in-the-blank is excellent for learning anatomical terminology—you must know the exact spelling of 'phalanges' or 'sternocleidomastoid.' Flashcards are essential for memorizing bones, muscles, nerves, and vessels—anatomy has hundreds of named structures. True/false questions help identify common anatomical misconceptions (e.g., 'The trachea is posterior to the esophagus' is false).",
    studyTips: [
      "Learn anatomy in context of function. Don't just memorize that the left ventricle is thick-walled; understand it's thick because it pumps blood to the entire body, requiring more force than the right ventricle.",
      "Use anatomical position and directional terms consistently. Always orient yourself: superior means toward the head, anterior means toward the front. This prevents confusion when describing locations.",
      "Study systems together that interact. Learn the cardiovascular and respiratory systems simultaneously because they work together for gas exchange. Learn the nervous and muscular systems together because nerves control muscles.",
      "Create labeled diagrams from memory. Being able to draw and label a cross-section of the heart or the layers of skin tests deeper understanding than recognizing a pre-made diagram.",
      "Focus on high-yield structures: major bones (femur, humerus, vertebrae), major muscles (biceps, quadriceps, deltoid), cranial nerves (especially I, II, V, VII, X), and major vessels (aorta, vena cava, pulmonary arteries/veins).",
      "For clinical programs, learn blood supply and innervation of organs. Knowing which nerve controls a muscle or which artery supplies an organ is critical for understanding pathology.",
    ],
    faq: [
      {
        q: "What anatomy topics are covered?",
        a: "Generate questions on all body systems: skeletal, muscular, cardiovascular, respiratory, nervous, digestive, urinary, reproductive, endocrine, and integumentary systems.",
      },
      {
        q: "Is this suitable for nursing or medical students?",
        a: "Yes. Questions are appropriate for nursing school, pre-med anatomy courses, and allied health programs.",
      },
      {
        q: "Can I upload anatomy diagrams?",
        a: "Text-based questions work best. For diagrams, describe the structures in notes and generate identification questions.",
      },
      {
        q: "Do questions use medical terminology?",
        a: "Yes. Questions use proper anatomical terms and include explanations defining medical vocabulary.",
      },
    ],
    relatedTools: [
      "/quiz-generator-from-pdf",
      "/ai-flashcards",
      "/notes-to-quiz",
    ],
    relatedExams: ["mcat", "nclex"],
  },
  {
    slug: "nursing",
    name: "Nursing",
    description:
      "Create nursing quiz questions on patient care, pharmacology, pathophysiology, and NCLEX-style practice.",
    topicsList: [
      "Nursing Fundamentals: vital signs (temperature, pulse, respirations, blood pressure, oxygen saturation, pain assessment as fifth vital sign, normal ranges across lifespan), physical assessment techniques (inspection, palpation, percussion, auscultation, head-to-toe assessment sequence), basic nursing skills (bed making, patient hygiene, positioning and turning, ambulation assistance, fall prevention, infection control with hand hygiene and standard precautions, isolation precautions for airborne, droplet, and contact transmission), documentation (accurate and timely charting, SOAP notes, nursing process documentation, avoiding abbreviations on the Joint Commission's do-not-use list), patient safety (proper patient identification with two identifiers, medication administration rights including right patient, right drug, right dose, right route, right time, right documentation), therapeutic communication vs. non-therapeutic responses",
      "Pharmacology: major drug classifications (ACE inhibitors ending in -pril for hypertension and heart failure, beta blockers ending in -olol, calcium channel blockers ending in -dipine, loop diuretics like furosemide causing potassium loss, thiazide diuretics, anticoagulants including warfarin monitored by INR and heparin monitored by PTT, antiplatelets like aspirin and clopidogrel, opioid analgesics with respiratory depression risk, NSAIDs contraindicated in renal disease and bleeding disorders, antibiotics including penicillins, cephalosporins, fluoroquinolones, macrolides, SSRIs for depression, benzodiazepines for anxiety, antipsychotics, insulin types with onset/peak/duration, oral hypoglycemics, corticosteroids, bronchodilators); mechanisms of action; common and serious side effects; nursing considerations before, during, and after administration; drug interactions; patient teaching; dosage calculations (dimensional analysis, ratio-proportion, IV drip rate calculations in gtt/min, weight-based dosing in mg/kg, mcg/kg/min for critical drips, pediatric calculations, safe dose ranges)",
      "Medical-Surgical Nursing: cardiac disorders (heart failure with left-sided symptoms of dyspnea, orthopnea, crackles vs. right-sided symptoms of peripheral edema, JVD, hepatomegaly; myocardial infarction with chest pain, EKG changes, troponin elevation, PCI or thrombolytic therapy, post-MI care; dysrhythmias including atrial fibrillation, ventricular tachycardia, heart blocks; hypertension management); respiratory disorders (COPD with pursed-lip breathing and barrel chest, asthma with bronchodilators and corticosteroids, pneumonia with antibiotics and respiratory support, pulmonary embolism with anticoagulation); GI disorders (peptic ulcer disease, bowel obstruction, inflammatory bowel disease, liver cirrhosis with ascites and portal hypertension, pancreatitis); neurological disorders (stroke with FAST assessment, increased intracranial pressure, seizures with safety precautions, spinal cord injury); renal disorders (acute kidney injury, chronic kidney disease, dialysis); diabetes management (hypoglycemia vs. hyperglycemia, DKA, HHS, insulin administration); perioperative nursing (preoperative teaching, NPO status, postoperative assessment for bleeding, pain management, respiratory complications, thromboembolism prevention)",
      "Maternal-Newborn Nursing (OB): prenatal care (fetal development stages, prenatal vitamins with folic acid, common discomforts and relief measures, warning signs requiring immediate attention including bleeding, severe headache, visual changes, decreased fetal movement), labor and delivery (stages of labor: first stage with latent, active, and transition phases; second stage pushing; third stage placental delivery; fourth stage first two hours postpartum; fetal heart rate monitoring with baseline, variability, accelerations, early/late/variable decelerations; pain management including epidural, breathing techniques; labor interventions including oxytocin augmentation, cesarean section indications), postpartum care (fundal assessment for height and firmness, lochia assessment for color, amount, and odor, perineal care, breastfeeding support with latch assessment and teaching, postpartum hemorrhage signs, postpartum depression screening), newborn assessment (APGAR scores at 1 and 5 minutes, vital signs with normal ranges, head-to-toe newborn exam, reflexes including Moro, rooting, sucking, grasp, Babinski, newborn screening tests, jaundice assessment and phototherapy, circumcision care, umbilical cord care)",
      "Pediatric Nursing: growth and development milestones (infant, toddler, preschool, school-age, adolescent using Erikson's psychosocial stages and Piaget's cognitive stages), pediatric vital sign normal ranges by age, medication administration considerations in children (weight-based dosing, developmentally appropriate approaches, holding techniques), common childhood illnesses (respiratory infections, otitis media, gastroenteritis with dehydration assessment and oral rehydration, asthma management, epiglottitis, croup, RSV bronchiolitis), immunization schedules, child abuse recognition and mandatory reporting, pediatric safety (car seat safety, choking prevention, poison prevention), family-centered care and involving parents in care decisions",
      "Mental Health Nursing: psychiatric disorders (major depressive disorder with risk for suicide requiring safety contracts and 1:1 observation, bipolar disorder with manic and depressive episodes, schizophrenia with positive symptoms including hallucinations and delusions and negative symptoms including flat affect and avolition, anxiety disorders including generalized anxiety, panic disorder, OCD, PTSD, personality disorders, eating disorders, substance use disorders with withdrawal symptoms and detoxification protocols), therapeutic communication techniques (open-ended questions, reflection, clarification, focusing, silence, providing information, therapeutic touch) vs. non-therapeutic barriers (false reassurance, giving advice, changing the subject, asking 'why' questions), psychotropic medications (SSRIs, SNRIs, tricyclic antidepressants, MAOIs with tyramine dietary restrictions, antipsychotics with extrapyramidal side effects, lithium for bipolar with narrow therapeutic range, benzodiazepines for anxiety with dependency risk), milieu therapy and therapeutic environment, suicide risk assessment and precautions, involuntary commitment criteria",
      "Critical Care Nursing: hemodynamic monitoring (arterial lines for continuous blood pressure monitoring, central venous pressure CVP, pulmonary artery catheters with PCWP, cardiac output measurements, interpreting waveforms, troubleshooting line placement and complications), ventilator management (modes including assist-control, SIMV, CPAP, settings including FiO₂, tidal volume, PEEP, respiratory rate, weaning protocols, preventing ventilator-associated pneumonia), shock states (hypovolemic, cardiogenic, septic, aneurogenic/neurogenic with distinct hemodynamic profiles and treatments), code management (recognizing cardiac arrest rhythms, CPR with 30:2 compression-to-ventilation ratio, defibrillation for VF and pulseless VT, medications including epinephrine and amiodarone, post-resuscitation care, documentation), critical drips (vasopressors including norepinephrine, dopamine, vasopressin; inotropes including dobutamine, milrinone; sedatives and paralytics; insulin drips with hourly glucose monitoring)",
      "Priority Setting and Clinical Judgment: ABC principle (airway always first, then breathing, then circulation), Maslow's hierarchy of needs (physiological needs including oxygen, nutrition, elimination take priority over safety needs including fall prevention and infection control, which take priority over psychosocial needs including coping and self-esteem), delegation and scope of practice (RNs perform initial assessment, develop care plans, administer IV push medications, evaluate outcomes, teach patients; LPNs perform data collection, reinforce teaching, give oral and IM medications, perform basic procedures; UAPs perform ADLs including bathing, feeding, toileting, ambulation, vital signs on stable patients but cannot assess, give medications, or teach), triage and multiple-patient prioritization (assess the most unstable patient first, recognize when to call rapid response or code blue, time management with routine care vs. urgent needs), recognizing clinical deterioration (early warning signs including changes in mental status, vital sign trends, worsening respiratory status, decreased urine output)",
    ],
    sampleQuestions: [
      {
        q: "A patient with heart failure is prescribed furosemide. Which electrolyte should the nurse monitor?",
        a: "Potassium",
        explanation:
          "Furosemide is a loop diuretic that causes potassium loss. Hypokalemia can lead to serious cardiac arrhythmias, so potassium levels must be monitored closely.",
      },
      {
        q: "What is the priority nursing action for a patient experiencing anaphylaxis?",
        a: "Administer epinephrine",
        explanation:
          "Epinephrine is the first-line treatment for anaphylaxis. It reverses airway swelling and hypotension, addressing life-threatening symptoms immediately.",
      },
      {
        q: "Which assessment finding indicates decreased cardiac output?",
        a: "Cool, clammy skin and weak peripheral pulses",
        explanation:
          "Decreased cardiac output reduces perfusion to extremities, causing cool skin, weak pulses, and compensatory vasoconstriction.",
      },
      {
        q: "A nurse is teaching a diabetic patient about insulin injection sites. Which site has the fastest absorption?",
        a: "Abdomen",
        explanation:
          "The abdomen has the fastest insulin absorption rate, followed by arms, then thighs. This matters for timing insulin with meals.",
      },
    ],
    questionTypesAdvice:
      "Multiple choice questions are essential for NCLEX-style priority-setting ('What should the nurse do first?') and require choosing the best answer among several correct-sounding options. Fill-in-the-blank is critical for dosage calculation practice where you must arrive at an exact number without answer hints. Flashcards help memorize drug classifications, lab values, and disease processes. True/false questions identify common nursing misconceptions (e.g., 'A nurse can delegate assessment to a UAP' is false).",
    studyTips: [
      "Always apply ABC (airway, breathing, circulation) and Maslow's hierarchy when prioritizing. Physiological needs come before safety, which comes before psychosocial needs.",
      "Memorize normal lab values and therapeutic drug ranges. NCLEX assumes you know these and won't provide reference ranges. Critical values include potassium (3.5-5.0), sodium (135-145), glucose (70-100), INR (2-3 on warfarin).",
      "Study pharmacology by drug class, not individual drugs. Learn ACE inhibitors as a group: they all end in '-pril,' lower blood pressure by blocking angiotensin, cause hyperkalemia, and have a common side effect of dry cough.",
      "Practice dosage calculations daily. Use dimensional analysis or the formula method consistently. Common calculations: IV drip rates, mg/kg dosing, unit conversions.",
      "Understand delegation and scope of practice. RNs assess, plan, and evaluate. LPNs implement care and give medications. UAPs do basic care and ADLs. NCLEX tests whether you delegate appropriately.",
      "For priority questions, choose the patient who is unstable, has an airway problem, or shows signs of physiological deterioration. Psychosocial concerns and teaching come after acute physiological issues are resolved.",
    ],
    faq: [
      {
        q: "What nursing topics can I generate questions for?",
        a: "Upload notes on fundamentals, pharmacology, med-surg, pediatrics, OB, psych, critical care, or any nursing specialty.",
      },
      {
        q: "Are questions NCLEX-style?",
        a: "Yes. Questions follow NCLEX format with priority ('first action,' 'most important') and evidence-based rationales.",
      },
      {
        q: "Can I practice pharmacology calculations?",
        a: "Yes. Upload dosage calculation notes and generate practice problems with step-by-step solutions.",
      },
      {
        q: "Is this a substitute for NCLEX review courses?",
        a: "No. This supplements your study by providing extra practice questions. Use alongside comprehensive NCLEX review materials.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
    ],
    relatedExams: ["nclex"],
  },
  {
    slug: "psychology",
    name: "Psychology",
    description:
      "Generate psychology quiz questions on cognitive psychology, developmental psychology, abnormal psychology, and research methods.",
    sampleQuestions: [
      {
        q: "According to Piaget, which stage is characterized by abstract thinking?",
        a: "Formal operational stage",
        explanation:
          "The formal operational stage (age 12+) is when individuals develop abstract reasoning, hypothetical thinking, and systematic problem-solving.",
      },
      {
        q: "What neurotransmitter is most associated with depression?",
        a: "Serotonin",
        explanation:
          "Serotonin deficiency is strongly linked to depression. Many antidepressants (SSRIs) work by increasing serotonin availability in the brain.",
      },
      {
        q: "Which research method establishes cause and effect?",
        a: "Experimental method",
        explanation:
          "Only experiments with random assignment and controlled variables can establish causal relationships. Correlational studies show associations but not causation.",
      },
    ],
    faq: [
      {
        q: "What psychology topics are covered?",
        a: "Generate questions on cognitive psychology, behavioral psychology, developmental psychology, social psychology, abnormal psychology, neuroscience, and research methods.",
      },
      {
        q: "Can I practice for AP Psychology?",
        a: "Yes. Upload AP Psych notes to generate questions matching exam format, difficulty, and content areas.",
      },
      {
        q: "Do questions include research studies?",
        a: "Yes. Questions reference classic studies (Milgram, Zimbardo, Pavlov, etc.) when relevant to your uploaded material.",
      },
      {
        q: "Is this suitable for college-level courses?",
        a: "Yes. Generate questions appropriate for intro psychology, abnormal psychology, cognitive neuroscience, or specialized upper-level courses.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/quiz-generator-from-pdf",
    ],
    relatedExams: ["ap", "mcat", "midterm", "finals"],
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    description:
      "Create computer science quiz questions on programming, algorithms, data structures, and software engineering.",
    sampleQuestions: [
      {
        q: "What is the time complexity of binary search?",
        a: "O(log n)",
        explanation:
          "Binary search divides the search space in half with each comparison, resulting in logarithmic time complexity.",
      },
      {
        q: "In Python, which data structure is immutable?",
        a: "Tuple",
        explanation:
          "Tuples are immutable (cannot be changed after creation), unlike lists which are mutable.",
      },
      {
        q: "What does SQL stand for?",
        a: "Structured Query Language",
        explanation:
          "SQL is the standard language for managing and querying relational databases.",
      },
    ],
    faq: [
      {
        q: "What CS topics can I generate questions for?",
        a: "Upload notes on programming (Python, Java, C++), data structures, algorithms, databases, web development, software engineering, or computer theory.",
      },
      {
        q: "Can I practice coding questions?",
        a: "Yes, but the focus is on conceptual questions and code reading. For hands-on coding practice, use dedicated coding platforms alongside this tool.",
      },
      {
        q: "Do questions include code snippets?",
        a: "Yes. Questions can include code examples for debugging, output prediction, or concept identification.",
      },
      {
        q: "Is this good for AP Computer Science?",
        a: "Yes. Generate AP CS A (Java) questions from your course material matching exam format and difficulty.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
    ],
    relatedExams: ["ap", "midterm", "finals"],
  },
  {
    slug: "spelling",
    name: "Spelling",
    description:
      "Generate spelling practice questions and tests for elementary through high school students, ESL learners, and adult education. Test mastery of commonly misspelled words, phonics patterns, homophones, word roots, prefixes and suffixes, and grade-level vocabulary. Create weekly spelling tests, pre-tests to identify problem words, diagnostic assessments, or review quizzes before standardized exams. Upload your school's curriculum word lists, textbook vocabulary, or personal spelling demons to generate targeted practice with immediate feedback. Questions include multiple choice (identifying correct spelling among common errors), fill-in-the-blank (completing sentences with correctly spelled words), error detection (finding and correcting misspellings in context), and sentence dictation formats. Each question provides memory aids, common error patterns, and mnemonic devices to help cement correct spellings. Perfect for teachers creating weekly spelling homework, homeschool parents tracking student progress, or learners working independently to improve spelling accuracy and confidence.",
    sampleQuestions: [
      {
        q: "Choose the correctly spelled word:",
        a: "Definitely (not definately)",
        explanation:
          "Many people misspell 'definitely' because of the pronunciation. Remember: it's related to 'finite' and 'definite.'",
      },
      {
        q: "Which word is spelled correctly?",
        a: "Separate (not seperate)",
        explanation:
          "The correct spelling is 'separate.' Remember there's 'a rat' in separate.",
      },
      {
        q: "Fill in the blank: She was em___rrassed by the mistake.",
        a: "barrassed (embarrassed)",
        explanation:
          "Embarrassed has two r's and two s's. Think: really, really should stay silent.",
      },
    ],
    faq: [
      {
        q: "What spelling levels can I practice?",
        a: "Generate spelling quizzes for elementary, middle school, high school, or adult ESL learners. Upload your weekly spelling list or vocabulary words.",
      },
      {
        q: "Can I create spelling tests from my curriculum?",
        a: "Yes. Upload your school's spelling list and generate multiple choice or fill-in-the-blank spelling questions.",
      },
      {
        q: "Do questions include context?",
        a: "Yes. Questions show words in sentence context to test real understanding, not just memorization.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 10 quiz generations per month. Paid plans start at $2/month for 20 quizzes.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/fill-in-the-blank-generator",
      "/vocabulary",
    ],
  },
  {
    slug: "grammar",
    name: "Grammar",
    description:
      "Create grammar quiz questions on sentence structure, parts of speech, punctuation rules, subject-verb agreement, verb tenses, pronoun usage, modifiers, and common usage errors for middle school through adult English learners. Test understanding of how language works at the sentence and word level through identification of errors, correction exercises, sentence combining, and application of grammar rules in context. Generate practice covering nouns, verbs, adjectives, adverbs, prepositions, conjunctions, articles, fragments, run-ons, comma usage, apostrophes, semicolons, active versus passive voice, parallelism, dangling modifiers, who versus whom, its versus it's, and hundreds of other grammar concepts. Questions require not just recognition of correct grammar but understanding why rules exist and how to apply them in writing. Ideal for standardized test preparation (SAT, ACT, GRE), essay writing improvement, ESL grammar practice, or reinforcing concepts taught in English classes. Upload grammar exercises from your textbook, notes from class, or specific grammar rules you struggle with to generate targeted practice that builds grammatical intuition and eliminates common errors.",
    sampleQuestions: [
      {
        q: "Identify the error: 'Me and him went to the store.'",
        a: "Should be 'He and I went to the store'",
        explanation:
          "Use subject pronouns (he, I) when they are the subject of the sentence. 'Me' and 'him' are object pronouns.",
      },
      {
        q: "Which sentence uses commas correctly?",
        a: "After the meeting, we went to lunch.",
        explanation:
          "An introductory phrase (After the meeting) is followed by a comma before the main clause.",
      },
      {
        q: "Choose the correct verb form: 'Neither the teacher nor the students ___ ready.'",
        a: "were",
        explanation:
          "When using 'neither...nor,' the verb agrees with the nearest subject (students, plural), so use 'were.'",
      },
    ],
    faq: [
      {
        q: "What grammar topics are covered?",
        a: "Generate questions on parts of speech, sentence structure, subject-verb agreement, verb tenses, punctuation, modifiers, and common usage errors.",
      },
      {
        q: "Is this suitable for ESL learners?",
        a: "Yes. Questions work for both native English speakers and ESL students at intermediate to advanced levels.",
      },
      {
        q: "Can I practice for standardized tests?",
        a: "Yes. Generate SAT, ACT, or TOEFL-style grammar questions by uploading relevant practice material.",
      },
      {
        q: "Do questions explain the rules?",
        a: "Yes. Every question includes an explanation of the grammar rule being tested.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
      "/vocabulary",
    ],
    relatedExams: ["sat", "act", "toefl", "ielts"],
  },
  {
    slug: "algebra",
    name: "Algebra",
    description:
      "Generate algebra practice questions on linear equations, inequalities, quadratic equations, functions and graphs, polynomials, factoring, systems of equations, exponents and radicals, rational expressions, and word problems for pre-algebra through Algebra 2 students. Cover fundamental skills like solving one-variable and two-variable equations, graphing lines and parabolas, understanding function notation, manipulating algebraic expressions, and applying algebra to real-world scenarios. Test both computational proficiency (can you solve 3x + 7 = 22?) and conceptual understanding (what does slope represent? why do we factor?). Create practice for homework review, exam preparation, summer skill maintenance, SAT/ACT math prep, or college placement test readiness. Upload notes from your Algebra 1 or Algebra 2 textbook, problem sets from class, or specific topics you find challenging (like factoring trinomials, solving systems by substitution versus elimination, or word problems involving distance-rate-time relationships). Questions include step-by-step solution methods, common error warnings, and explanations of why techniques work. Build the algebraic foundation necessary for advanced math courses including geometry, trigonometry, pre-calculus, and calculus.",
    sampleQuestions: [
      {
        q: "Solve for x: 5x - 8 = 27",
        a: "x = 7",
        explanation:
          "Add 8 to both sides: 5x = 35. Then divide both sides by 5: x = 7.",
      },
      {
        q: "Factor: x² + 7x + 12",
        a: "(x + 3)(x + 4)",
        explanation:
          "Find two numbers that multiply to 12 and add to 7. Those numbers are 3 and 4, so the factors are (x + 3)(x + 4).",
      },
      {
        q: "What is the slope of the line y = -2x + 5?",
        a: "-2",
        explanation:
          "In slope-intercept form y = mx + b, m is the slope. Here, the slope is -2.",
      },
    ],
    faq: [
      {
        q: "What algebra topics can I practice?",
        a: "Generate questions on solving equations and inequalities, graphing linear and quadratic functions, factoring polynomials, systems of equations, exponents, and rational expressions.",
      },
      {
        q: "Is this suitable for Algebra 1 and Algebra 2?",
        a: "Yes. Upload your course notes to generate questions matching your specific curriculum and difficulty level.",
      },
      {
        q: "Do questions show step-by-step solutions?",
        a: "Yes. Every problem includes a detailed explanation showing the solution steps.",
      },
      {
        q: "Can I use this for SAT math prep?",
        a: "Yes. Generate SAT-style algebra questions by uploading relevant practice problems.",
      },
    ],
    relatedTools: [
      "/ai-quiz-generator",
      "/notes-to-quiz",
      "/quiz-generator-from-pdf",
    ],
    relatedExams: ["sat", "act", "midterm", "finals"],
  },
  {
    slug: "geometry",
    name: "Geometry",
    description:
      "Create geometry practice questions on angles, triangles, quadrilaterals, circles, polygons, area and perimeter formulas, volume and surface area calculations, coordinate geometry, transformations, congruence and similarity, geometric proofs, and the Pythagorean theorem for high school geometry students. Test understanding of fundamental concepts like angle relationships (complementary, supplementary, vertical angles), triangle properties (types, angle sum, exterior angles, special right triangles), circle formulas (circumference, area, arc length, sector area), polygon angle sums, 3D shape volumes (prisms, cylinders, pyramids, cones, spheres), and coordinate plane distance and midpoint formulas. Generate practice for daily homework, unit exams, final exam review, SAT/ACT geometry preparation, or summer refreshers before pre-calculus. Upload geometry notes, textbook problem sets, or theorem lists to create questions testing both computational skills (find the area, calculate the volume) and conceptual reasoning (why are base angles of an isosceles triangle equal? how do you prove triangles congruent?). Questions include diagrams described in text, step-by-step solutions, common mistake warnings, and connections between geometric concepts. Essential practice for building spatial reasoning and proof-writing abilities needed in higher mathematics.",
    sampleQuestions: [
      {
        q: "What is the sum of interior angles in a hexagon?",
        a: "720 degrees",
        explanation:
          "Use the formula (n - 2) × 180° where n is the number of sides. For a hexagon (6 sides): (6 - 2) × 180° = 720°.",
      },
      {
        q: "A circle has a radius of 5 cm. What is its area?",
        a: "25π cm² (approximately 78.54 cm²)",
        explanation:
          "Area of a circle is A = πr². With r = 5 cm, A = π(5)² = 25π ≈ 78.54 cm².",
      },
      {
        q: "If two parallel lines are cut by a transversal, and one angle is 65°, what is the corresponding angle?",
        a: "65°",
        explanation:
          "Corresponding angles are equal when parallel lines are cut by a transversal, so the answer is 65°.",
      },
    ],
    faq: [
      {
        q: "What geometry topics are covered?",
        a: "Generate questions on angles, triangles, quadrilaterals, circles, polygons, area and perimeter, volume and surface area, coordinate geometry, transformations, and geometric proofs.",
      },
      {
        q: "Do questions include diagrams?",
        a: "Questions describe geometric figures in text. For diagram-based problems, describe the figure in your notes when uploading.",
      },
      {
        q: "Is this good for high school geometry?",
        a: "Yes. Questions match typical high school geometry curriculum and can be generated at appropriate difficulty levels.",
      },
      {
        q: "Can I practice for standardized tests?",
        a: "Yes. Generate SAT, ACT, or GRE geometry questions by uploading relevant practice material.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/ai-quiz-generator",
      "/multiple-choice-quiz-maker",
    ],
    relatedExams: ["sat", "act", "gre", "midterm", "finals"],
  },
  {
    slug: "world-history",
    name: "World History",
    description:
      "Generate world history quiz questions covering ancient civilizations, classical empires, medieval kingdoms, Renaissance and Reformation, Age of Exploration and colonization, revolutionary movements, industrialization, imperialism, world wars, Cold War conflicts, and contemporary global issues across all major regions including Europe, Asia, Africa, the Americas, and Oceania. Test knowledge of political developments (rise and fall of empires, revolutions, wars, treaties), economic systems (feudalism, mercantilism, capitalism, communism), social structures (class systems, gender roles, slavery, labor movements), cultural achievements (art, literature, philosophy, religion, scientific discoveries), and technological innovations that shaped human civilization. Practice identifying cause-and-effect relationships, comparing historical events across time periods and regions, analyzing continuity and change, and understanding different historical perspectives. Perfect for AP World History exam preparation, IB History assessments, college survey courses, or general knowledge building. Upload textbook chapters, class notes on specific eras, or documentaries you watched to generate questions testing both factual recall and higher-order thinking about historical patterns, causation, and significance of events in global context.",
    sampleQuestions: [
      {
        q: "Which ancient civilization built Machu Picchu?",
        a: "The Inca Empire",
        explanation:
          "Machu Picchu was built by the Inca Empire in the 15th century in present-day Peru, serving as a royal estate and sacred religious site.",
      },
      {
        q: "What was the primary cause of World War I?",
        a: "The assassination of Archduke Franz Ferdinand triggered a chain of alliances",
        explanation:
          "While multiple factors existed (militarism, alliances, imperialism, nationalism), the assassination of Archduke Franz Ferdinand in June 1914 was the immediate trigger that activated the alliance system and led to war.",
      },
      {
        q: "Which revolution established the principle that governments derive power from the consent of the governed?",
        a: "The American Revolution",
        explanation:
          "The American Revolution (1775-1783) and the Declaration of Independence established the principle of popular sovereignty—that government legitimacy comes from the people.",
      },
    ],
    faq: [
      {
        q: "What world history periods can I study?",
        a: "Generate questions on any period: ancient civilizations, classical empires, medieval history, Renaissance, Age of Exploration, revolutions, world wars, Cold War, or modern global issues.",
      },
      {
        q: "Do questions test memorization or analysis?",
        a: "Both. Questions are tagged by Bloom's taxonomy, testing factual knowledge, understanding of causes and effects, and historical analysis skills.",
      },
      {
        q: "Can I practice for AP World History?",
        a: "Yes. Upload AP World History notes to generate questions matching the exam's format, themes, and historical thinking skills.",
      },
      {
        q: "Is this free?",
        a: "Free accounts get 10 quiz generations per month. Paid plans start at $2/month.",
      },
    ],
    relatedTools: [
      "/notes-to-quiz",
      "/quiz-generator-from-pdf",
      "/study-guide-generator",
    ],
    relatedExams: ["ap", "sat", "midterm", "finals"],
  },
  {
    slug: "french",
    name: "French",
    description:
      "Create French language quiz questions for vocabulary acquisition, grammar rules, verb conjugation mastery, reading comprehension, and practical communication skills at beginner (A1-A2), intermediate (B1-B2), or advanced (C1-C2) proficiency levels. Test knowledge of essential vocabulary (greetings, numbers, colors, family, food, travel, emotions), grammatical structures (noun gender and agreement, articles, pronouns, adjectives, prepositions, negation), verb conjugations across all tenses and moods (présent, passé composé, imparfait, futur, conditionnel, subjonctif), sentence construction, idiomatic expressions, and comprehension of written passages. Generate practice for French 1-4 courses, AP French Language and Culture exam preparation, DELF/DALF certification study, or independent language learning. Upload French textbook chapters, grammar exercises, vocabulary lists, or authentic French texts (articles, stories, dialogues) to create targeted questions with detailed explanations in English showing how French grammar works, common learner mistakes to avoid, and tips for remembering irregular verb forms and tricky pronunciation patterns. Build proficiency systematically from basic communication to sophisticated expression in French.",
    sampleQuestions: [
      {
        q: "Quel est le passé composé de 'parler' à la première personne?",
        a: "J'ai parlé",
        explanation:
          "The passé composé (compound past) of 'parler' in first person is formed with avoir: j'ai parlé (I spoke/have spoken).",
      },
      {
        q: "Translate: 'He is going to the library.'",
        a: "Il va à la bibliothèque.",
        explanation:
          "'Va' is the third person singular present of 'aller' (to go). 'À la bibliothèque' means 'to the library.'",
      },
      {
        q: "Which word is masculine: table, livre, maison, or fenêtre?",
        a: "Livre",
        explanation:
          "'Livre' (book) is masculine (le livre). The others are feminine: la table, la maison, la fenêtre.",
      },
    ],
    faq: [
      {
        q: "What French topics can I practice?",
        a: "Generate questions on vocabulary, verb conjugation (present, past, future, subjunctive), grammar rules, sentence structure, and reading comprehension at any level.",
      },
      {
        q: "Can I practice for AP French?",
        a: "Yes. Upload AP French course material to generate questions matching exam format and difficulty.",
      },
      {
        q: "Do questions include accents?",
        a: "Yes. Questions use proper French orthography including accents (é, è, ê, à, ù, ç) and special characters.",
      },
      {
        q: "Is this suitable for beginners?",
        a: "Yes. Generate questions at any level from beginner (introductory vocabulary and present tense) to advanced (subjunctive, literary texts).",
      },
    ],
    relatedTools: [
      "/ai-flashcards",
      "/vocabulary",
      "/fill-in-the-blank-generator",
    ],
    relatedExams: ["ap"],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}
