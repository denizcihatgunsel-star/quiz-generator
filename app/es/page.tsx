import type { Metadata } from "next";
import LocalizedLanding, { type LocaleData } from "@/components/LocalizedLanding";

const LANGS = { es: "https://www.examina.ink/es", de: "https://www.examina.ink/de", fr: "https://www.examina.ink/fr", pt: "https://www.examina.ink/pt", tr: "https://www.examina.ink/tr" };

export const metadata: Metadata = {
  title: "Generador de Exámenes con IA — Convierte tus Apuntes en Quizzes | Examina",
  description:
    "Convierte tus apuntes en exámenes de opción múltiple, flashcards, completar frases y verdadero/falso en menos de 30 segundos. 29 idiomas y gratis para empezar.",
  alternates: {
    canonical: "https://www.examina.ink/es",
    languages: { ...LANGS, "x-default": "https://www.examina.ink/" },
  },
};

const DATA: LocaleData = {
  code: "es",
  url: "https://www.examina.ink/es",
  kicker: "Generador de quizzes con IA",
  h1: "Tus apuntes, convertidos en exámenes.",
  subtitle:
    "Pega tu lección, sube un PDF o una foto de tus notas. En menos de 30 segundos tendrás un examen completo con explicaciones, niveles de Bloom y dificultad, en 29 idiomas.",
  cta: "Empieza gratis",
  price: "Precios",
  featuresTitle: "Todo lo que necesitas",
  features: [
    { title: "Cuatro tipos de pregunta", body: "Opción múltiple, flashcards, completar frases y verdadero/falso generados desde el mismo material." },
    { title: "Explicaciones en cada respuesta", body: "Cada pregunta incluye por qué es correcta — un examen que también enseña mientras practicas." },
    { title: "Niveles de Bloom", body: "Preguntas distribuidas de recordar a evaluar, con etiquetas de dificultad para exámenes equilibrados." },
  ],
  howTitle: "Cómo funciona",
  steps: [
    { n: "01", title: "Pega o sube tus apuntes", body: "Texto, PDF, Markdown o una foto de tu cuaderno." },
    { n: "02", title: "Genera", body: "La IA crea el examen completo con explicaciones y niveles de Bloom en 29 idiomas." },
    { n: "03", title: "Practica", body: "Practica, repasa con flashcards y sigue tu racha de estudio." },
  ],
  faqTitle: "Preguntas frecuentes",
  faq: [
    { q: "¿Puedo crear un examen desde un PDF?", a: "Sí. Examina acepta PDF, TXT y Markdown, además de texto pegado y fotos de apuntes." },
    { q: "¿Es gratis el generador de quizzes?", a: "Las cuentas gratis incluyen 5 quizzes al mes. Los planes de pago empiezan en 2 $/mes." },
    { q: "¿Funciona en otros idiomas?", a: "Sí — Examina genera contenido en 29 idiomas, tanto preguntas como explicaciones." },
  ],
  footer: "©2026 Examina",
};

export default function SpanishLanding() {
  return <LocalizedLanding data={DATA} />;
}