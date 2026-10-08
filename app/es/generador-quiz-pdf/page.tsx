import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { copyText, saleCopy, saleLandingData } from "@/lib/pricing";
import { FREE_PLAN_LIMIT, STARTER_PLAN_PRICE } from "@/lib/subscription";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Generador de Quiz desde PDF — Convierte PDF a Cuestionario",
  description: "Genera cuestionarios desde archivos PDF automáticamente. Sube un PDF y obtén preguntas con IA. Perfecto para estudiar con apuntes o libros.",
  path: "/es/generador-quiz-pdf",
  locale: "es_ES",
});

const faqs = [
  {
    q: "¿Cómo funciona el generador desde PDF?",
    a: "Sube un archivo PDF con tus apuntes o un capítulo de libro. Examina extrae el texto y genera preguntas automáticamente.",
  },
  {
    q: "¿Qué tipo de PDFs funciona mejor?",
    a: "PDFs con texto (no escaneados como imágenes). Si tu PDF es una imagen, usa la opción de foto para OCR.",
  },
  {
    q: "¿Es gratis?",
    a: `El plan gratuito incluye ${FREE_PLAN_LIMIT} quizzes por mes hechos desde texto pegado. Subir PDF requiere el plan Starter a $${STARTER_PLAN_PRICE}/mes.`,
  },
  {
    q: "¿Cuántas páginas puede procesar?",
    a: "Hasta 15,000 caracteres por generación, aproximadamente 5-10 páginas dependiendo del formato.",
  },
  {
    q: "¿Incluye las respuestas?",
    a: "Sí. Cada pregunta incluye la respuesta correcta y una explicación breve.",
  },
];

export default function GeneradorQuizPdfPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/es/generador-quiz-pdf#webpage",
        url: "https://www.examina.ink/es/generador-quiz-pdf",
        name: "Generador de Quiz desde PDF | Examina",
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
          "Generador de quizzes que convierte archivos PDF en cuestionarios automáticamente usando inteligencia artificial. Ideal para apuntes y libros de texto.",
      },
      {
        "@type": "HowTo",
        name: "Cómo Generar un Quiz desde PDF",
        description: "Convierte un archivo PDF en un cuestionario en tres pasos",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Sube tu PDF",
            text: "Selecciona un archivo PDF con apuntes, capítulos de libro o material de estudio.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Elige el formato",
            text: "Selecciona tipo de preguntas: opción múltiple, verdadero/falso o completar espacios.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Genera y estudia",
            text: "Obtén tu quiz con respuestas y explicaciones en segundos. Practica online o descarga como PDF.",
          },
        ],
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
            name: "Generador Quiz desde PDF",
            item: "https://www.examina.ink/es/generador-quiz-pdf",
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
          kicker: "Generador desde PDF",
          h1: "Convierte PDF a",
          h1Accent: "cuestionario",
          subtitle: `Sube un archivo PDF con tus apuntes, capítulo de libro o material de clase. Examina extrae el texto y genera preguntas automáticamente con inteligencia artificial.`,
          cta: "Generar desde PDF",
          introTitle: "De PDF a quiz en menos de un minuto",
          intro: [
            "Tienes apuntes en PDF, un capítulo escaneado o slides de clase guardados como PDF. Convertir eso en un cuestionario de práctica normalmente significa leer todo, escribir preguntas a mano, y formatear las respuestas. Con Examina, subes el PDF y el resto es automático.",
            "La inteligencia artificial extrae el texto, identifica los conceptos clave y escribe preguntas de opción múltiple, verdadero/falso y completar espacios. Cada pregunta incluye la respuesta correcta y una explicación. Obtienes un quiz completo en menos de 30 segundos.",
          ],
          featuresTitle: "Cómo funciona",
          features: [
            {
              title: "Sube PDFs directamente",
              body: "Sube archivos PDF con texto (apuntes, libros, artículos). Examina extrae el contenido automáticamente.",
            },
            {
              title: "Preguntas generadas con IA",
              body: "La inteligencia artificial lee tu PDF y genera preguntas en segundos. Incluye respuestas y explicaciones para cada pregunta.",
            },
            {
              title: "Practica o imprime",
              body: "Toma el quiz online, comparte por enlace o descarga como PDF para imprimir. Perfecto para estudiar o enseñar.",
            },
          ],
          howTitle: "Cómo generar un quiz desde PDF",
          steps: [
            {
              n: "01",
              title: "Sube tu archivo PDF",
              body: "Selecciona un PDF desde tu computadora o teléfono. Examina procesa hasta 15,000 caracteres por generación.",
            },
            {
              n: "02",
              title: "Configura las opciones",
              body: "Elige tipo de preguntas, nivel de dificultad e idioma. El generador hace el resto.",
            },
            {
              n: "03",
              title: "Revisa y usa el quiz",
              body: "Revisa las preguntas generadas. Edita si es necesario. Practica online, comparte o descarga como PDF.",
            },
          ],
          faqTitle: "Preguntas frecuentes",
          faq: faqs,
          relatedTitle: "Herramientas relacionadas",
          related: [
            { href: "/es/generador-de-quizzes", label: "Generador de Quizzes" },
            { href: "/quiz-generator-from-pdf", label: "PDF to Quiz (EN)" },
            { href: "/ai-quiz-generator", label: "AI Quiz Generator" },
            { href: "/notes-to-quiz", label: "Apuntes a Quiz" },
            { href: "/es", label: "Inicio en Español" },
          ],
        }, now)}
      />
    </>
  );
}
