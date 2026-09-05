import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { AchievementsExplorer } from "@/components/achievements/AchievementsExplorer";
import { ChampionshipRoute } from "@/components/coach/ChampionshipRoute";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "الإنجازات | أكاديمية صالحي" : locale === "tr" ? "Başarılar | Salihy Akademisi" : "Achievements | Salihy Academy";
  const description =
    locale === "ar"
      ? "لحظات من مشاركات أكاديمية صالحي في البطولات."
      : locale === "tr"
        ? "Salihy Akademisi'nin turnuva katılımlarından anlar."
        : "Moments from Salihy Academy's tournament appearances.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/achievements"),
    openGraph: { title, description },
  };
}

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <PageHero
        number="03"
        eyebrow={locale === "ar" ? "الإنجازات" : locale === "tr" ? "BAŞARILAR" : "ACHIEVEMENTS"}
        title={locale === "ar" ? "لحظات من البطولات" : locale === "tr" ? "Turnuvalardan Anlar" : "Moments from the Tournaments"}
      />

      <ChampionshipRoute locale={locale} showIntro={false} showPhotos={false} />
      <AchievementsExplorer locale={locale} />
    </>
  );
}
