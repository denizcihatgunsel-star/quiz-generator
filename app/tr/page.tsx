import type { Metadata } from "next";
import LocalizedLanding, { type LocaleData } from "@/components/LocalizedLanding";

const LANGS = { es: "https://www.examina.ink/es", de: "https://www.examina.ink/de", fr: "https://www.examina.ink/fr", pt: "https://www.examina.ink/pt", tr: "https://www.examina.ink/tr" };

export const metadata: Metadata = {
  title: "Yapay Zeka Quiz Oluşturucu — Notlarını Teste Dönüştür | Examina",
  description:
    "Notlarını 30 saniyeden kısa sürede çoktan seçmeli, bilgi kartı, boşluk doldurma ve doğru/yanlış testlerine dönüştür. 29 dil, ücretsiz başla.",
  alternates: {
    canonical: "https://www.examina.ink/tr",
    languages: { ...LANGS, "x-default": "https://www.examina.ink/" },
  },
};

const DATA: LocaleData = {
  code: "tr",
  url: "https://www.examina.ink/tr",
  kicker: "Yapay zeka quiz oluşturucu",
  h1: "Notların, testlere dönüşüyor.",
  subtitle:
    "Ders notunu yapıştır, PDF yükle ya da notlarını fotoğrafla. 30 saniyeden kısa sürede açıklamalı, Bloom seviyeli ve zorluk dereceli eksiksiz bir test — 29 dilde.",
  cta: "Ücretsiz başla",
  price: "Fiyatlar",
  featuresTitle: "İhtiyacın olan her şey",
  features: [
    { title: "Dört soru türü", body: "Çoktan seçmeli, bilgi kartı, boşluk doldurma ve doğru/yanlış aynı materyalden üretilir." },
    { title: "Her cevapta açıklama", body: "Her soru neden doğru olduğunu anlatır — pratik yaparken öğreten bir test." },
    { title: "Bloom seviyeleri", body: "Hatırlamadan değerlendirmeye uzanan sorular ve dengeli testler için zorluk etiketleri." },
  ],
  howTitle: "Nasıl çalışır",
  steps: [
    { n: "01", title: "Notlarını yapıştır veya yükle", body: "Metin, PDF, Markdown ya da defter fotoğrafı." },
    { n: "02", title: "Oluştur", body: "Yapay zeka 29 dilde açıklamalı ve Bloom etiketli testi bir anda oluşturur." },
    { n: "03", title: "Pratik yap", body: "Quiz, bilgi kartı ve çalışma serini tek yerde takip et." },
  ],
  faqTitle: "Sık sorulan sorular",
  faq: [
    { q: "PDF'den quiz oluşturabilir miyim?", a: "Evet. Examina PDF, TXT ve Markdown'ın yanı sıra yapıştırılan metin ve not fotoğraflarını da kabul eder." },
    { q: "Quiz oluşturucu ücretsiz mi?", a: "Ücretsiz hesaplar ayda 5 quiz içerir. Ücretli planlar 2 $/ay'dan başlar." },
    { q: "Diğer dillerde de çalışır mı?", a: "Evet — Examina 29 dilde soru ve açıklama üretebilir." },
  ],
  footer: "©2026 Examina",
};

export default function TurkishLanding() {
  return <LocalizedLanding data={DATA} />;
}