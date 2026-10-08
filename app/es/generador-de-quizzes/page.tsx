import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Generador de Quizzes con IA — Crea Cuestionarios Online",
  description: "Generador de quizzes con inteligencia artificial. Sube tus apuntes o PDF y obtén preguntas de opción múltiple, verdadero/falso y más. Gratis.",
  path: "/es/generador-de-quizzes",
  locale: "es_ES",
});

const faqs = [
  {
    q: "¿Es gratis el generador de quizzes?",
    a: "Sí. Genera hasta 10 quizzes por mes gratis. Los planes pagos empiezan en $2/mes para 20 quizzes.",
  },
  {
    q: "¿Qué tipos de preguntas genera?",
    a: "Opción múltiple, verdadero/falso, completar espacios en blanco y tarjetas de estudio, todo generado automáticamente.",
  },
  {
    q: "¿Puedo subir archivos en español?",
    a: "Sí. Examina genera preguntas en español a partir de tus apuntes, PDFs o textos en español.",
  },
  {
    q: "¿Incluye respuestas?",
    a: "Sí. Cada pregunta incluye la respuesta correcta y una explicación breve.",
  },
  {
    q: "¿Puedo compartir los quizzes con estudiantes?",
    a: "Sí. Comparte por enlace o descarga como PDF. También hay modo de aula en vivo con códigos de acceso.",
  },
];

export default function GeneradorDeQuizzesPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/es/generador-de-quizzes#webpage",
        url: "https://www.examina.ink/es/generador-de-quizzes",
        name: "Generador de Quizzes con IA | Examina",
        inLanguage: "es",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.examina.ink/#software",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description:
          "Generador de quizzes con inteligencia artificial que convierte apuntes y PDFs en preguntas de opción múltiple, verdadero/falso y completar espacios.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: copyText(saleCopy(f.a, now)) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://www.examina.ink/es",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Generador de Quizzes",
            item: "https://www.examina.ink/es/generador-de-quizzes",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KeywordLanding
        data={saleLandingData({
          kicker: "Generador de Quizzes con IA",
          h1: "Crea cuestionarios con",
          h1Accent: "inteligencia artificial",
          subtitle: `Sube tus apuntes o pega texto y Examina genera preguntas automáticamente: opción múltiple, verdadero/falso, completar espacios y tarjetas de estudio. Todo con respuestas y explicaciones.`,
          cta: "Generar quiz gratis",
          introTitle: "El generador que escribe las preguntas por ti",
          intro: [
            "La mayoría de los generadores de quizzes te obligan a escribir cada pregunta a mano. Examina funciona diferente: sube tus apuntes de clase, un capítulo de libro o un PDF, y la inteligencia artificial genera las preguntas automáticamente.",
            "Obtienes preguntas de opción múltiple, verdadero/falso, completar espacios y tarjetas de estudio, todas con claves de respuesta y explicaciones. Funciona en español y 28 idiomas más.",
          ],
          featuresTitle: "Qué incluye cada quiz",
          features: [
            {
              title: "Generación automática",
              body: "Sube tus apuntes y obtén preguntas en menos de 30 segundos. Cada pregunta incluye la respuesta correcta y una explicación.",
            },
            {
              title: "Múltiples formatos",
              body: "Opción múltiple, verdadero/falso, completar espacios y tarjetas de estudio, todo generado desde el mismo contenido.",
            },
            {
              title: "Comparte y exporta",
              body: "Comparte quizzes por enlace. Descarga como PDF. Crea sesiones en vivo con códigos de acceso para estudiantes.",
            },
          ],
          howTitle: "Cómo crear un quiz en 3 pasos",
          steps: [
            {
              n: "01",
              title: "Sube tu contenido",
              body: "Pega texto, sube un PDF, TXT o Markdown, o toma una foto de apuntes escritos a mano.",
            },
            {
              n: "02",
              title: "Elige el formato",
              body: "Selecciona el tipo de preguntas: opción múltiple, verdadero/falso, completar espacios o tarjetas.",
            },
            {
              n: "03",
              title: "Genera y comparte",
              body: "Tu quiz está listo en segundos. Comparte por enlace, descarga como PDF o lanza una sesión en vivo.",
            },
          ],
          faqTitle: "Preguntas frecuentes",
          faq: faqs,
          relatedTitle: "Herramientas relacionadas",
          related: [
            { href: "/es/generador-quiz-pdf", label: "Generador desde PDF" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator (EN)" },
            { href: "/ai-flashcards", label: "Tarjetas de Estudio" },
            { href: "/for-teachers", label: "Para Profesores" },
            { href: "/es", label: "Inicio en Español" },
          ],
        }, now)}
      />
    </>
  );
}
