import type { Metadata } from "next";
import LocalizedLanding, { type LocaleData } from "@/components/LocalizedLanding";

const LANGS = { es: "https://www.examina.ink/es", de: "https://www.examina.ink/de", fr: "https://www.examina.ink/fr", pt: "https://www.examina.ink/pt", tr: "https://www.examina.ink/tr" };

export const metadata: Metadata = {
  title: "Gerador de Quiz com IA — Transforme suas Notas em Testes | Examina",
  description:
    "Transforme suas notas em questões de múltipla escolha, flashcards, lacunas e verdadeiro/falso em menos de 30 segundos. 29 idiomas, grátis para começar.",
  alternates: {
    canonical: "https://www.examina.ink/pt",
    languages: { ...LANGS, "x-default": "https://www.examina.ink/" },
  },
};

const DATA: LocaleData = {
  code: "pt",
  url: "https://www.examina.ink/pt",
  kicker: "Gerador de quiz com IA",
  h1: "Suas notas, transformadas em testes.",
  subtitle:
    "Cole sua aula, envie um PDF ou fotografe suas anotações. Em menos de 30 segundos você tem um teste completo com explicações, níveis de Bloom e dificuldade, em 29 idiomas.",
  cta: "Comece grátis",
  price: "Preços",
  featuresTitle: "Tudo o que você precisa",
  features: [
    { title: "Quatro tipos de questão", body: "Múltipla escolha, flashcards, lacunas e verdadeiro/falso gerados do mesmo material." },
    { title: "Explicações em cada resposta", body: "Cada questão explica por que está correta — um teste que também ensina enquanto você pratica." },
    { title: "Níveis de Bloom", body: "Questões distribuídas de lembrar a avaliar, com níveis de dificuldade para provas equilibradas." },
  ],
  howTitle: "Como funciona",
  steps: [
    { n: "01", title: "Cole ou envie suas notas", body: "Texto, PDF, Markdown ou foto do seu caderno." },
    { n: "02", title: "Gere", body: "A IA cria o teste completo com explicações e níveis de Bloom em 29 idiomas." },
    { n: "03", title: "Pratique", body: "Quiz, flashcards e acompanhamento da sua sequência de estudo." },
  ],
  faqTitle: "Perguntas frequentes",
  faq: [
    { q: "Posso criar um quiz a partir de um PDF?", a: "Sim. O Examina aceita PDF, TXT e Markdown, além de texto colado e fotos de anotações." },
    { q: "O gerador de quiz é gratuito?", a: "Contas gratuitas incluem 5 quizzes por mês. Planos pagos começam em US$ 2/mês." },
    { q: "Funciona em outros idiomas?", a: "Sim — o Examina gera conteúdo em 29 idiomas, perguntas e explicações." },
  ],
  footer: "©2026 Examina",
};

export default function PortugueseLanding() {
  return <LocalizedLanding data={DATA} />;
}