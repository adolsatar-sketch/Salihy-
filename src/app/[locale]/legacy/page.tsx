import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/ui/PageHero";
import { Timeline } from "@/components/legacy/Timeline";
import { buildAlternates } from "@/lib/utils";
import { careerTimeline } from "@/data/coach";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "المسيرة — الرحلة الكاملة | أكاديمية صالحي" : locale === "tr" ? "Miras — Tüm Yolculuk | Salihy Akademisi" : "Legacy — The Full Journey | Salihy Academy";
  const description =
    locale === "ar"
      ? "من أول حصة تدريب إلى تأسيس أكاديمية صالحي — الجدول الزمني الكامل للمسيرة."
      : locale === "tr"
        ? "İlk antrenman seansından Salihy Akademisi'nin kuruluşuna — yolculuğun tüm zaman çizelgesi."
        : "From the first training session to founding Salihy Academy — the complete timeline of the journey.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/legacy"),
    openGraph: { title, description },
  };
}

export default async function LegacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <PageHero
        number="02"
        eyebrow={locale === "ar" ? "المسيرة" : locale === "tr" ? "MİRAS" : "LEGACY"}
        title={locale === "ar" ? "من الخطوة الأولى إلى الأكاديمية" : locale === "tr" ? "İlk Adımdan Akademiye" : "From the First Step to the Academy"}
      />

      {careerTimeline.length > 0 && (
        <section className="relative bg-obsidian/92 pb-32">
          <Timeline locale={locale} />
        </section>
      )}
    </>
  );
}
