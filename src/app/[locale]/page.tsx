import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { HeroChapter } from "@/components/home/HeroChapter";
import { BeginningChapter } from "@/components/home/BeginningChapter";
import { FighterChapter } from "@/components/home/FighterChapter";
import { AchievementsChapter } from "@/components/home/AchievementsChapter";
import { CoachTransitionChapter } from "@/components/home/CoachTransitionChapter";
import { AcademyChapter } from "@/components/home/AcademyChapter";
import { ProgramsChapter } from "@/components/home/ProgramsChapter";
import { BrandDivider } from "@/components/ui/BrandDivider";
import { DisciplineChapter } from "@/components/home/DisciplineChapter";
import { ChampionsChapter } from "@/components/home/ChampionsChapter";
import { CtaChapter } from "@/components/home/CtaChapter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const title =
    locale === "ar"
      ? "أكاديمية صالحي للكيوكوشنكاي — بغداد | من ساحة النزال إلى صناعة أبطال الغد"
      : locale === "tr"
        ? "Salihy Kyokushin Akademisi — Bağdat | Mücadeleden Şampiyonların Geleceğine"
        : "Salihy Kyokushin Academy — Baghdad | From the Fight to the Future of Champions";
  const description =
    locale === "ar"
      ? "أكاديمية كيوكوشنكاي كاراتيه في الصليخ، بغداد. تدريب احترافي للأطفال والشباب والرجال والنساء، ومسار حقيقي من أول حصة إلى منصات التتويج المحلية والدولية."
      : locale === "tr"
        ? "Bağdat, Al-Sulaikh'te bir Kyokushin karate akademisi. Çocuklar, gençler, erkekler ve kadınlar için profesyonel antrenman; ilk dersten yerel ve uluslararası podyumlara uzanan gerçek bir yol."
        : "A Kyokushin karate academy in Al-Sulaikh, Baghdad. Professional training for kids, youth, men and women, with a real path from a first class to local and international podiums.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/"),
    openGraph: { title, description },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <HeroChapter locale={locale} />
      <BeginningChapter locale={locale} />
      <FighterChapter locale={locale} />
      <AchievementsChapter locale={locale} />
      <CoachTransitionChapter locale={locale} />
      <AcademyChapter locale={locale} />
      <ProgramsChapter locale={locale} />
      <BrandDivider />
      <DisciplineChapter locale={locale} />
      <ChampionsChapter locale={locale} />
      <CtaChapter locale={locale} />
    </>
  );
}
