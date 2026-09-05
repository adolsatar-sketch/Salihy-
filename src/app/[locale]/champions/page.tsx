import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { ChampionsGrid } from "@/components/champions/ChampionsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "الأبطال | أكاديمية صالحي" : "Champions | Salihy Academy";
  const description =
    locale === "ar"
      ? "طلاب أكاديمية صالحي أثناء التدريب والمشاركات."
      : "Salihy Academy's students during training and appearances.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/champions"),
    openGraph: { title, description },
  };
}

export default async function ChampionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <PageHero number="06" eyebrow={locale === "ar" ? "الأبطال" : "CHAMPIONS"} title={locale === "ar" ? "طلاب الأكاديمية" : "Academy Students"} />
      <ChampionsGrid locale={locale} />
    </>
  );
}
