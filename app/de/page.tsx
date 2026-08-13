import type { Metadata } from "next";
import LocalizedLanding, { type LocaleData } from "@/components/LocalizedLanding";

const LANGS = { es: "https://www.examina.ink/es", de: "https://www.examina.ink/de", fr: "https://www.examina.ink/fr", pt: "https://www.examina.ink/pt", tr: "https://www.examina.ink/tr" };

export const metadata: Metadata = {
  title: "KI-Quiz-Generator — Verwandle deine Notizen in Tests | Examina",
  description:
    "Verwandle deine Notizen in Multiple-Choice-, Karteikarten-, Lückentext- und Richtig/Falsch-Quizze in unter 30 Sekunden. 29 Sprachen, kostenlos starten.",
  alternates: {
    canonical: "https://www.examina.ink/de",
    languages: { ...LANGS, "x-default": "https://www.examina.ink/" },
  },
};

const DATA: LocaleData = {
  code: "de",
  url: "https://www.examina.ink/de",
  kicker: "KI-Quizgenerator",
  h1: "Deine Notizen, verwandelt in Tests.",
  subtitle:
    "Füge deine Vorlesung ein, lade ein PDF hoch oder fotografiere deine Notizen. In unter 30 Sekunden erhältst du einen kompletten Test mit Erklärungen, Bloom-Stufen und Schwierigkeitsgraden — in 29 Sprachen.",
  cta: "Kostenlos starten",
  price: "Preise",
  featuresTitle: "Alles, was du brauchst",
  features: [
    { title: "Vier Fragetypen", body: "Multiple-Choice, Karteikarten, Lückentext und Richtig/Falsch — aus demselben Material." },
    { title: "Erklärungen zu jeder Antwort", body: "Jede Frage erklärt, warum sie korrekt ist — ein Test, der beim Üben lehrt." },
    { title: "Bloom-Stufen", body: "Fragen von Erinnern bis Bewerten, mit Schwierigkeitsgraden für ausgewogene Prüfungen." },
  ],
  howTitle: "So funktioniert's",
  steps: [
    { n: "01", title: "Notizen einfügen oder hochladen", body: "Text, PDF, Markdown oder ein Foto deines Hefts." },
    { n: "02", title: "Generieren", body: "Die KI erstellt den kompletten Test mit Erklärungen und Bloom-Stufen in 29 Sprachen." },
    { n: "03", title: "Üben", body: "Quizze, Karteikarten und deine Lernserie — alles an einem Ort." },
  ],
  faqTitle: "Häufige Fragen",
  faq: [
    { q: "Kann ich aus einem PDF einen Test erstellen?", a: "Ja. Examina akzeptiert PDF, TXT und Markdown sowie eingefügten Text und Fotos von Notizen." },
    { q: "Ist der Quizgenerator kostenlos?", a: "Gratis-Konten erhalten 5 Quizze pro Monat. Bezahlte Pläne starten bei 2 $/Monat." },
    { q: "Funktioniert das in anderen Sprachen?", a: "Ja — Examina generiert Inhalte in 29 Sprachen, Fragen und Erklärungen." },
  ],
  footer: "©2026 Examina",
};

export default function GermanLanding() {
  return <LocalizedLanding data={DATA} />;
}