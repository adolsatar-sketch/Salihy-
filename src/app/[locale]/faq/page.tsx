import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/ui/PageHero";
import { faqItems } from "@/data/faq";
import { t, buildAlternates } from "@/lib/utils";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "الأسئلة الشائعة | أكاديمية صالحي" : locale === "tr" ? "Sıkça Sorulan Sorular | Salihy Akademisi" : "FAQ | Salihy Academy";
  const description =
    locale === "ar"
      ? "إجابات عن أكثر الأسئلة شيوعًا حول التسجيل، الأعمار، الجدول، وموقع أكاديمية صالحي."
      : locale === "tr"
        ? "Kayıt, yaşlar, program ve Salihy Akademisi'nin konumu hakkında en sık sorulan soruların yanıtları."
        : "Answers to the most common questions about registration, ages, schedule, and Salihy Academy's location.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/faq"),
    openGraph: { title, description },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: t(locale, item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(locale, item.answer),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero number="10" eyebrow="FAQ" title={locale === "ar" ? "الأسئلة الشائعة" : locale === "tr" ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"} />

      <section className="relative bg-obsidian/92 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <FaqAccordion locale={locale} />
        </div>
      </section>
    </>
  );
}
