import type { Metadata } from "next";
import LocalizedLanding, { type LocaleData } from "@/components/LocalizedLanding";

const LANGS = { es: "https://www.examina.ink/es", de: "https://www.examina.ink/de", fr: "https://www.examina.ink/fr", pt: "https://www.examina.ink/pt", tr: "https://www.examina.ink/tr" };

export const metadata: Metadata = {
  title: "Générateur de Quiz IA — Transformez vos Notes en Tests | Examina",
  description:
    "Transformez vos notes en QCM, flashcards, textes à trous et vrai/faux en moins de 30 secondes. 29 langues, gratuit pour commencer.",
  alternates: {
    canonical: "https://www.examina.ink/fr",
    languages: { ...LANGS, "x-default": "https://www.examina.ink/" },
  },
};

const DATA: LocaleData = {
  code: "fr",
  url: "https://www.examina.ink/fr",
  kicker: "Générateur de quiz IA",
  h1: "Vos notes, transformées en tests.",
  subtitle:
    "Collez votre cours, importez un PDF ou photographiez vos notes. En moins de 30 secondes, obtenez un test complet avec explications, niveaux de Bloom et difficulté, en 29 langues.",
  cta: "Commencer gratuitement",
  price: "Tarifs",
  featuresTitle: "Tout ce qu'il vous faut",
  features: [
    { title: "Quatre types de questions", body: "QCM, flashcards, textes à trous et vrai/faux générés à partir du même support." },
    { title: "Explications pour chaque réponse", body: "Chaque question explique pourquoi elle est correcte — un test qui enseigne en pratiquant." },
    { title: "Niveaux de Bloom", body: "Questions réparties de mémorisation à évaluation, avec tags de difficulté pour des tests équilibrés." },
  ],
  howTitle: "Comment ça marche",
  steps: [
    { n: "01", title: "Collez ou importez vos notes", body: "Texte, PDF, Markdown ou photo de votre cahier." },
    { n: "02", title: "Générez", body: "L'IA crée le test complet avec explications et niveaux de Bloom en 29 langues." },
    { n: "03", title: "Entraînez-vous", body: "Quiz, flashcards et suivi de votre série d'étude." },
  ],
  faqTitle: "Questions fréquentes",
  faq: [
    { q: "Puis-je créer un quiz à partir d'un PDF ?", a: "Oui. Examina accepte les PDF, TXT et Markdown, ainsi que le texte collé et les photos de notes." },
    { q: "Le générateur de quiz est-il gratuit ?", a: "Les comptes gratuits incluent 5 quiz par mois. Les formules payantes commencent à 2 $/mois." },
    { q: "Est-ce que ça fonctionne dans d'autres langues ?", a: "Oui — Examina génère du contenu dans 29 langues, questions et explications comprises." },
  ],
  footer: "©2026 Examina",
};

export default function FrenchLanding() {
  return <LocalizedLanding data={DATA} />;
}