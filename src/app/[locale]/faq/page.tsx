import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
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
  const title = locale === "ar" ? "الأسئلة الشائعة | أكاديمية صالحي" : "FAQ | Salihy Academy";
  const description =
    locale === "ar"
      ? "إجابات عن أكثر الأسئلة شيوعًا حول التسجيل، الأعمار، الجدول، وموقع أكاديمية صالحي."
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
      <section className="relative bg-obsidian pb-4 pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">10 — FAQ</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-obsidian py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <FaqAccordion locale={locale} />
        </div>
      </section>
    </>
  );
}
