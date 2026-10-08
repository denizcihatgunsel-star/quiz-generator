/**
 * Combo pages for MCAT exam hub
 */
import type { ComboData } from "./types";

export const MCAT_COMBOS: ComboData[] = [
  {
    slug: "flashcards",
    type: "flashcards",
    meta: {
      type: "flashcards",
      primaryKeyword: "mcat flashcards",
      monthlyVolume: 880,
    },
    h1: "MCAT Flashcards — Master High-Yield MCAT Content",
    intro:
      "Build MCAT mastery with comprehensive flashcards covering biology, biochemistry, general chemistry, organic chemistry, physics, psychology, sociology, and critical analysis skills. The MCAT administered by AAMC requires both content knowledge and the ability to apply concepts to novel passages and scenarios. These flashcards focus on high-yield topics that appear frequently across all MCAT sections: biochemistry pathways, organic chemistry reactions, physics equations, psychological theories, and sociological concepts. Each card includes the concept, clinical or research relevance where applicable, and connections to other topics. Study systematically by subject, then integrate knowledge across disciplines as the MCAT tests interdisciplinary thinking. Use spaced repetition to move complex pre-medical content into long-term memory efficiently. Essential for medical school applicants aiming for competitive scores.",
    sampleItems: [
      {
        q: "Glycolysis (High-Yield Pathway)",
        a: "Location: Cytoplasm (doesn't require mitochondria or oxygen). Input: 1 glucose (6-carbon). Output: 2 pyruvate (3-carbon each), 2 ATP net (4 produced - 2 invested), 2 NADH. Steps: 10 enzyme-catalyzed reactions. Key regulation: Phosphofructokinase (PFK) is rate-limiting enzyme, inhibited by ATP and citrate (negative feedback), activated by AMP and ADP (low energy signals). Connection: Pyruvate enters mitochondria for Krebs cycle if oxygen present, or converts to lactate for anaerobic ATP production. Clinical: Cancer cells rely on glycolysis even with oxygen present (Warburg effect). MCAT tip: Know ATP yield at each stage and what happens under anaerobic conditions.",
        explanation:
          "Glycolysis is universally tested on the MCAT because it connects to cellular respiration, fermentation, and metabolism regulation. Focus on net ATP yield (2), regulation by PFK, and how the pathway changes in the absence of oxygen.",
        bloomLevel: "Understand",
      },
      {
        q: "Henderson-Hasselbalch Equation",
        a: "Formula: pH = pKa + log([A⁻]/[HA]). Use: Calculate pH of a buffer solution given pKa and concentration ratio of conjugate base to weak acid. Buffer: Weak acid + conjugate base resist pH changes. Most effective when pH = pKa (ratio = 1, log(1) = 0). Buffer capacity: ±1 pH unit from pKa. MCAT application: Physiological buffers (bicarbonate buffer pH 7.4 in blood, phosphate buffer in urine, protein buffers), titration curves (pH at equivalence point, buffer region), amino acid isoelectric point. Example: If pH = pKa, then [A⁻] = [HA]; if pH > pKa, deprotonated form dominates.",
        explanation:
          "Henderson-Hasselbalch appears on almost every MCAT in acid-base contexts, buffer problems, or amino acid pKa questions. Practice rearranging the equation and understanding what happens when pH equals pKa.",
        bloomLevel: "Apply",
      },
      {
        q: "Michaelis-Menten Kinetics",
        a: "Describes enzyme kinetics. Michaelis constant (Km): Substrate concentration at half Vmax. Low Km = high enzyme affinity (binds substrate easily). High Km = low affinity. Vmax: Maximum reaction velocity when enzyme is saturated. Competitive inhibition: Increases Km (appears weaker affinity), Vmax unchanged (can overcome with more substrate). Noncompetitive inhibition: Decreases Vmax (fewer functional enzymes), Km unchanged. Graph: Hyperbolic curve, velocity vs. substrate concentration. MCAT tip: Competitive inhibitors compete for active site (structurally similar to substrate), noncompetitive bind elsewhere (allosteric site). Lineweaver-Burk plot (double reciprocal) linearizes data for analysis.",
        explanation:
          "Michaelis-Menten kinetics is frequently tested in biochemistry passages presenting experimental enzyme data. Know how Km and Vmax change with inhibitors and what these values reveal about enzyme-substrate interaction.",
        bloomLevel: "Understand",
      },
      {
        q: "Amino Acids: All 20 (High-Yield)",
        a: "Nonpolar/Hydrophobic (9): Glycine (G, smallest), Alanine (A), Valine (V), Leucine (L), Isoleucine (I), Methionine (M, has sulfur), Phenylalanine (F, aromatic), Tryptophan (W, aromatic, largest), Proline (P, rigid kink). Polar Uncharged (6): Serine (S), Threonine (T), Cysteine (C, disulfide bonds), Asparagine (N, amide), Glutamine (Q, amide), Tyrosine (Y, aromatic, hydroxyl). Acidic (2, negative at pH 7): Aspartate (D, Asp), Glutamate (E, Glu). Basic (3, positive at pH 7): Lysine (K), Arginine (R), Histidine (H, pKa ~6, partially protonated at pH 7). Special: Cysteine forms disulfide bridges (protein structure), Proline breaks alpha helices, Glycine fits in tight spaces. MCAT tip: Know one-letter codes, side chain properties (polar vs. nonpolar), and which are charged at pH 7.",
        explanation:
          "Amino acid properties dictate protein structure and function. MCAT expects you to predict where amino acids will be located in a protein (hydrophobic residues in core, polar on surface) and how mutations affect structure.",
        bloomLevel: "Remember",
      },
      {
        q: "Piaget's Stages of Cognitive Development",
        a: "(1) Sensorimotor (0-2 years): Object permanence develops (things exist even when not seen), explore via senses and motor actions. (2) Preoperational (2-7 years): Symbolic thought, language develops, egocentrism (can't take others' perspectives), lack conservation (pouring water into different shaped glasses changes amount). (3) Concrete Operational (7-11 years): Logical thinking about concrete objects, understands conservation, less egocentric, can't think abstractly yet. (4) Formal Operational (12+ years): Abstract reasoning, hypothetical thinking, systematic problem-solving, scientific reasoning. MCAT tip: Distinguish from Erikson's psychosocial stages (trust vs. mistrust, identity vs. role confusion) and Kohlberg's moral development (pre-conventional, conventional, post-conventional).",
        explanation:
          "Piaget's stages appear in Psych/Soc passages about child development, education, and cognition. Focus on key milestones and limitations at each stage, especially egocentrism and conservation.",
        bloomLevel: "Remember",
      },
      {
        q: "Stereoisomers: Enantiomers vs. Diastereomers",
        a: "Stereoisomers: Same molecular formula and connectivity, different 3D arrangement. Enantiomers: Non-superimposable mirror images (like left and right hands). Have at least one chiral center (carbon with 4 different groups). Rotate plane-polarized light equally but in opposite directions (one dextrorotatory +, one levorotatory -). Identical physical properties except optical activity. Racemic mixture: 50:50 enantiomer mix, optically inactive. Diastereomers: Stereoisomers that are NOT mirror images. Examples: cis-trans isomers, molecules with multiple chiral centers where some but not all are inverted, meso compounds. Different physical properties. MCAT tip: R/S nomenclature assigns configuration (Cahn-Ingold-Prelog priority rules). Most biological molecules are single enantiomers (L-amino acids, D-sugars).",
        explanation:
          "Stereochemistry is heavily tested in organic chemistry passages. Know how to identify chiral centers, determine R/S configuration, and distinguish enantiomers from diastereomers. Biological specificity for one enantiomer is a common MCAT theme.",
        bloomLevel: "Understand",
      },
      {
        q: "Dopamine, Serotonin, and Neurotransmitter Functions",
        a: "Dopamine: Reward, motivation, movement (substantia nigra), executive function (prefrontal cortex). Deficiency: Parkinson's disease (tremor, rigidity, bradykinesia). Excess: Schizophrenia positive symptoms (hallucinations, delusions). Drugs: L-DOPA (Parkinson's treatment), antipsychotics block dopamine receptors. Serotonin: Mood, sleep, appetite. Deficiency: Depression. SSRIs increase serotonin availability. Also: pain modulation, GI motility (most serotonin in gut). Others: GABA (inhibitory, anxiety), Glutamate (excitatory, learning/memory), Acetylcholine (muscle contraction, parasympathetic, memory), Norepinephrine (alertness, stress response, depression if low), Endorphins (natural pain relief, euphoria). MCAT tip: Link neurotransmitter imbalances to disorders and drug mechanisms.",
        explanation:
          "Neurotransmitter functions connect biology (neuron signaling), psychology (mood disorders), and sociology (drug addiction, mental health stigma). High-yield for Psych/Soc and Bio/Biochem sections.",
        bloomLevel: "Understand",
      },
      {
        q: "Action Potential Phases (Neuron)",
        a: "Resting: -70 mV (Na⁺ outside, K⁺ inside, maintained by Na⁺/K⁺ ATPase pump 3 Na⁺ out, 2 K⁺ in). (1) Depolarization: Stimulus opens voltage-gated Na⁺ channels, Na⁺ influx, membrane potential rises to +30 mV (threshold typically -55 mV). (2) Repolarization: Na⁺ channels inactivate, voltage-gated K⁺ channels open, K⁺ efflux, membrane returns negative. (3) Hyperpolarization: K⁺ channels slow to close, brief overshoot to -90 mV. (4) Return to rest: Na⁺/K⁺ pump restores -70 mV. All-or-none: Full action potential or nothing. Propagation: Depolarization triggers adjacent Na⁺ channels. Myelination: Saltatory conduction (jumps between nodes of Ranvier), faster transmission. MCAT tip: Absolute refractory period (Na⁺ channels inactivated, no second AP possible), relative refractory period (requires stronger stimulus).",
        explanation:
          "Action potentials are fundamental to nervous system function. MCAT tests understanding of ion movements, refractory periods, and how myelination increases conduction speed. Connect to muscle contraction (neuromuscular junction) and synaptic transmission.",
        bloomLevel: "Understand",
      },
      {
        q: "Social Stratification and Inequality",
        a: "Definition: Hierarchical arrangement of groups based on socioeconomic status (SES), power, and prestige. Dimensions: (1) Economic (wealth, income), (2) Social (status, prestige, social capital), (3) Political (power, influence). Theories: (a) Functionalism—stratification necessary to fill important roles, meritocracy (Davis-Moore thesis). (b) Conflict theory—stratification results from competition for resources, perpetuates inequality, ruling class exploits workers (Marx). (c) Symbolic interactionism—status symbols communicate social position, self-fulfilling prophecy maintains stratification. Effects: Health disparities (lower SES = worse health outcomes), educational inequality, social mobility limited (U.S. has less mobility than perceived), discrimination (racism, sexism reinforce stratification). MCAT tip: Apply to healthcare access, clinical trial participation, doctor-patient communication.",
        explanation:
          "Social stratification appears frequently in Psych/Soc passages about healthcare disparities, public health interventions, and social determinants of health. Know how SES affects health and how different theoretical perspectives explain inequality.",
        bloomLevel: "Understand",
      },
      {
        q: "Krebs Cycle (Citric Acid Cycle)",
        a: "Location: Mitochondrial matrix. Input per cycle: 1 acetyl-CoA (2-carbon from pyruvate), 3 NAD⁺, 1 FAD, 1 ADP + Pi. Output: 2 CO₂, 3 NADH, 1 FADH2, 1 GTP (=ATP). Per glucose: Cycle runs twice (2 pyruvate → 2 acetyl-CoA). Total: 6 NADH, 2 FADH2, 2 GTP. Key steps: (1) Acetyl-CoA + oxaloacetate → citrate (6C). (2) Citrate → isocitrate → α-ketoglutarate (5C, CO₂ released, NADH produced). (3) α-ketoglutarate → succinyl-CoA (4C, CO₂, NADH). (4) Succinyl-CoA → succinate (GTP). (5) Succinate → fumarate (FADH2). (6) Fumarate → malate → oxaloacetate (NADH, cycle repeats). Regulation: Inhibited by ATP, NADH, succinyl-CoA (negative feedback). Purpose: Generate high-energy electron carriers (NADH, FADH2) for electron transport chain. MCAT tip: Focus on inputs/outputs and regulation, not every intermediate.",
        explanation:
          "Krebs cycle is central to cellular metabolism, connecting glycolysis, amino acid metabolism, and fatty acid oxidation. MCAT tests how cycle integrates with other pathways and responds to energy status (ATP/ADP, NADH/NAD⁺ ratios).",
        bloomLevel: "Understand",
      },
      {
        q: "Operant Conditioning (Skinner)",
        a: "Learning through consequences. (1) Positive reinforcement: Add pleasant stimulus to increase behavior (praise for studying increases studying). (2) Negative reinforcement: Remove unpleasant stimulus to increase behavior (taking aspirin removes headache, increases aspirin use). (3) Positive punishment: Add unpleasant stimulus to decrease behavior (speeding ticket decreases speeding). (4) Negative punishment: Remove pleasant stimulus to decrease behavior (take away phone for misbehavior). Schedules: Continuous (every time), Fixed ratio (every N responses), Variable ratio (unpredictable, strongest, most resistant to extinction—slot machines), Fixed interval (first response after time period), Variable interval (unpredictable timing). MCAT tip: Distinguish from classical conditioning (Pavlov—associate neutral stimulus with automatic response). Reinforcement increases behavior, punishment decreases it.",
        explanation:
          "Operant conditioning explains behavior modification, addiction, parenting strategies, and therapeutic interventions. MCAT passages often describe experimental designs testing reinforcement schedules or behavior change interventions.",
        bloomLevel: "Understand",
      },
      {
        q: "Electron Transport Chain and Oxidative Phosphorylation",
        a: "Location: Inner mitochondrial membrane. Function: Generate ATP using energy from NADH and FADH2. Process: (1) NADH transfers electrons to Complex I, FADH2 to Complex II. (2) Electrons pass through Complexes I→III→IV, releasing energy. (3) Energy pumps H⁺ from matrix to intermembrane space (Complexes I, III, IV create proton gradient). (4) O₂ is final electron acceptor, forming H₂O at Complex IV. (5) Chemiosmosis: H⁺ flows back through ATP synthase (Complex V), driving ATP production. Yield: ~2.5 ATP per NADH, ~1.5 ATP per FADH2. Total cellular respiration: ~36-38 ATP per glucose (2 from glycolysis, 2 from Krebs, 32-34 from ETC). Uncouplers: Dissipate gradient as heat without making ATP (thermogenin in brown fat). MCAT tip: Cyanide blocks Complex IV, stopping ETC and ATP production.",
        explanation:
          "The ETC produces most cellular ATP. MCAT tests understanding of chemiosmosis, how the proton gradient drives ATP synthesis, and what happens when the chain is blocked (cyanide poisoning, hypoxia). Connect to aerobic vs. anaerobic metabolism.",
        bloomLevel: "Understand",
      },
    ],
    topicsCovered: [
      "Biochemistry pathways (glycolysis, Krebs cycle, electron transport, gluconeogenesis, glycogen metabolism)",
      "Molecular biology (DNA replication, transcription, translation, gene regulation)",
      "Organic chemistry reactions and mechanisms",
      "General chemistry (acid-base, electrochemistry, thermodynamics, kinetics)",
      "Physics equations and concepts (mechanics, electricity, waves, optics)",
      "Psychology (cognitive development, learning theories, memory, neurotransmitters)",
      "Sociology (social stratification, inequality, healthcare disparities, demographics)",
      "Critical analysis and reasoning (CARS passage strategies)",
    ],
    studyTips: {
      workflow: [
        "Study high-yield topics first: biochemistry pathways, amino acids, organic mechanisms, psychology theories, and sociology concepts appear most frequently on the MCAT",
        "Make connections across disciplines: the MCAT tests interdisciplinary thinking (e.g., dopamine connects to neuroscience, Parkinson's disease, drug addiction, societal stigma)",
        "Use flashcards for facts that must be automatic (amino acids, neurotransmitters, physics equations), then practice applying them in passage-based questions",
      ],
      tips: [
        "For biochemistry, draw pathways from memory: glycolysis, Krebs cycle, electron transport chain, gluconeogenesis, fatty acid synthesis and oxidation, amino acid metabolism—visual practice reveals gaps",
        "Learn reaction patterns in organic chemistry rather than memorizing individual reactions: nucleophiles attack electrophiles, leaving groups depart, electron-withdrawing groups activate/deactivate positions",
        "Connect psychology and sociology concepts to healthcare scenarios: how does social stratification affect healthcare access? How does cognitive bias affect clinical decision-making?",
      ],
    },
    faq: [
      {
        q: "How many flashcards should I study daily for the MCAT?",
        a: "Start with 20-30 new cards daily while reviewing previously learned cards (may total 100-150 cards with reviews). Use spaced repetition algorithms (Anki) for optimal retention.",
      },
      {
        q: "Should I memorize every biochemistry pathway in detail?",
        a: "Know high-yield pathways deeply: glycolysis, Krebs cycle, electron transport chain, gluconeogenesis. For others, understand inputs, outputs, location, and regulation. The MCAT tests application, not recall of every intermediate.",
      },
      {
        q: "What's the difference between content review and practice?",
        a: "Flashcards build content knowledge. MCAT passages require applying that knowledge to novel scenarios. Do content review first, then shift heavily to passage-based practice in final 2-3 months.",
      },
      {
        q: "Are these official AAMC flashcards?",
        a: "No. These cover high-yield MCAT content to supplement your study. For official materials, use AAMC practice exams, section banks, and question packs which use real MCAT logic and phrasing.",
      },
      {
        q: "How do I use flashcards for CARS (Critical Analysis)?",
        a: "CARS requires practice, not flashcards. Reading dense humanities passages daily (philosophy, ethics, cultural studies) builds the skills CARS tests. Focus flashcards on content sections (Bio/Biochem, Chem/Phys, Psych/Soc).",
      },
      {
        q: "When should I stop making new flashcards?",
        a: "Most content review finishes 2-3 months before the exam. After that, focus on practice passages and reviewing existing cards. Adding new cards late fragments attention.",
      },
    ],
    relatedPages: [
      "/exams/mcat",
      "/subjects/biology",
      "/subjects/chemistry",
      "/subjects/physics",
      "/subjects/psychology",
      "/ai-flashcards",
    ],
  },
];
