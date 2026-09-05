import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline } from "@/components/legacy/Timeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "المسيرة — الرحلة الكاملة | أكاديمية صالحي" : "Legacy — The Full Journey | Salihy Academy";
  const description =
    locale === "ar"
      ? "من أول حصة تدريب إلى تأسيس أكاديمية صالحي — الجدول الزمني الكامل للمسيرة."
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
      <section className="relative bg-obsidian pb-16 pt-40 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">02 — {locale === "ar" ? "المسيرة" : "LEGACY"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "من الخطوة الأولى إلى الأكاديمية" : "From the First Step to the Academy"}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-obsidian pb-32">
        <Timeline locale={locale} />
      </section>
    </>
  );
}
