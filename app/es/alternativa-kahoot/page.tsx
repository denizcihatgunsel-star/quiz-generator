import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import KeywordLanding from "@/components/KeywordLanding";
import { saleLandingData, planOffers } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Alternativa a Kahoot — Generador de Quiz con IA Gratis",
  description:
    "Alternativa gratis a Kahoot con generación de preguntas con IA. Crea quizzes para clase desde tus notas. Sin límites de preguntas.",
  path: "/es/alternativa-kahoot",
});

const faqs = [
  {
    q: "¿Cómo es Examina diferente de Kahoot?",
    a: "Kahoot requiere que escribas cada pregunta manualmente. Examina genera preguntas de quiz desde tus notas de clase usando IA. Sube tus notas y obtén un quiz listo en segundos.",
  },
  {
    q: "¿Puedo hacer juegos en vivo como Kahoot?",
    a: "Sí. Los estudiantes se unen con un código desde sus teléfonos—no necesitan cuentas. Tú controlas el ritmo y ves resultados en vivo.",
  },
  {
    q: "¿El plan gratis es suficiente para profesores?",
    a: "El plan gratis te da 5 generaciones de quiz por mes. Para uso diario en clase, el plan Team ($15/mes) ofrece quizzes ilimitados para hasta 5 profesores.",
  },
  {
    q: "¿Las preguntas tienen explicaciones?",
    a: "Sí. Cada pregunta incluye la respuesta correcta y una breve explicación, así que incluso los quizzes estilo juego enseñan conceptos.",
  },
];

export default function AlternativaKahootPage() {
  const now = new Date();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.examina.ink/es/alternativa-kahoot#webpage",
        url: "https://www.examina.ink/es/alternativa-kahoot",
        name: "Alternativa a Kahoot | Examina",
        isPartOf: { "@id": "https://www.examina.ink/#website" },
        inLanguage: "es",
      },
      {
        "@type": "SoftwareApplication",
        name: "Examina",
        url: "https://www.examina.ink",
        applicationCategory: "EducationalApplication",
        description: "Generador de quiz con IA - alternativa a Kahoot con generación automática de preguntas.",
        inLanguage: "es",
        offers: planOffers(now),
      },
      {
        "@type": "FAQPage",
        inLanguage: "es",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "ItemList",
        name: "Características Alternativa Kahoot",
        description: "Características clave que hacen de Examina una alternativa fuerte a Kahoot",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Generación de preguntas con IA",
            description: "Sube notas de clase y obtén preguntas de quiz automáticamente. Sin escritura manual.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Modo de clase en vivo",
            description: "Los estudiantes se unen con un código. Sin cuentas necesarias. Resultados en tiempo real y tablas de clasificación.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Asequible para profesores",
            description: "Plan gratis para probarlo. Plan Team con quizzes ilimitados es $15/mes para 5 profesores.",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://www.examina.ink",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Español",
            item: "https://www.examina.ink/es",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Alternativa Kahoot",
            item: "https://www.examina.ink/es/alternativa-kahoot",
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
        data={saleLandingData(
          {
            kicker: "Alternativa a Kahoot",
            h1: "Alternativa a Kahoot con",
            h1Accent: "generación IA",
            subtitle:
              "Deja de escribir cada pregunta de quiz a mano. Sube tus notas de clase y Examina escribe las preguntas por ti. Ejecuta juegos de clase en vivo con códigos de unión—misma energía que Kahoot, fracción del tiempo de preparación.",
            cta: "Pruébalo gratis",
            introTitle: "Por qué profesores están cambiando de Kahoot",
            intro: [
              "Kahoot hizo los quizzes de clase atractivos, pero crear un juego de 20 preguntas todavía significa escribir cada pregunta, cada distractor y cada explicación a mano. Para profesores con múltiples preparaciones, eso son horas por semana.",
              "Examina invierte el proceso: pega tus notas de clase o sube una presentación, y la IA genera preguntas de quiz automáticamente—opción múltiple, verdadero/falso, completar espacios. Cada pregunta incluye una explicación y una etiqueta de taxonomía de Bloom. Revisas para precisión, lanzas el juego, y los estudiantes se unen con un código. Misma energía que Kahoot, fracción del tiempo de preparación.",
            ],
            featuresTitle: "Construido para profesores que necesitan quizzes diarios",
            features: [
              {
                title: "Generar preguntas desde lecciones",
                body: "Sube diapositivas, pega notas o fotografía materiales. Obtén un quiz completo en menos de 30 segundos—preguntas, respuestas, explicaciones.",
              },
              {
                title: "Modo de clase en vivo",
                body: "Los estudiantes se unen con un código desde cualquier dispositivo. Sin registro requerido. Tú controlas el ritmo, ves resultados en vivo y revisas explicaciones después de cada pregunta.",
              },
              {
                title: "Planes de equipo asequibles",
                body: "Plan gratis para 5 quizzes/mes. Plan Team ($15/mes para 5 profesores) incluye quizzes ilimitados y biblioteca de preguntas compartida.",
              },
            ],
            howTitle: "Cómo ejecutar un quiz en vivo con Examina",
            steps: [
              {
                n: "01",
                title: "Genera preguntas desde tu lección",
                body: "Pega notas, sube un PDF o presentación. Elige opción múltiple, verdadero/falso o mixto. La IA escribe las preguntas.",
              },
              {
                n: "02",
                title: "Lanza el quiz",
                body: "Abre el modo clase. Los estudiantes ingresan el código de unión en sus teléfonos o laptops—sin cuentas, sin apps para instalar.",
              },
              {
                n: "03",
                title: "Juega y revisa",
                body: "Controla el ritmo de las preguntas, muestra la tabla de clasificación y muestra explicaciones después de cada ronda. Exporta resultados para seguir el progreso.",
              },
            ],
            faqTitle: "Preguntas frecuentes",
            faq: faqs,
            relatedTitle: "Más para profesores",
            related: [
              { href: "/for-teachers", label: "Para Profesores" },
              { href: "/features/live-classroom-quiz", label: "Quiz de Clase en Vivo" },
              { href: "/ai-quiz-generator", label: "Generador de Quiz IA" },
              { href: "/alternatives/kahoot", label: "Kahoot Alternative (EN)" },
              { href: "/es/generador-de-quizzes", label: "Generador de Quizzes" },
            ],
          },
          now
        )}
      />
    </>
  );
}
