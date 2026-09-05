import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { AchievementsExplorer } from "@/components/achievements/AchievementsExplorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "الإنجازات والبطولات | أكاديمية صالحي" : "Achievements & Tournaments | Salihy Academy";
  const description =
    locale === "ar"
      ? "أرشيف إنجازات أكاديمية صالحي: بطولات محلية ودولية، ميداليات، وتمثيل العراق على منصات التتويج."
      : "Salihy Academy's achievement archive: local and international tournaments, medals, and representing Iraq on the podium.";
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
      <section className="relative bg-obsidian pb-12 pt-40 sm:pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">03 — {locale === "ar" ? "الإنجازات" : "ACHIEVEMENTS"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "منصات تتويج، لا مجرد صور" : "Podiums, Not Just Photographs"}
            </h1>
          </Reveal>
        </div>
      </section>

      <AchievementsExplorer locale={locale} />
    </>
  );
}
