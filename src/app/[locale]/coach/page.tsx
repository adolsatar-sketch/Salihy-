import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { t, localePath, buildAlternates } from "@/lib/utils";
import { coachProfile, philosophy, vision } from "@/data/coach";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "المدرب | أكاديمية صالحي" : "The Coach | Salihy Academy";
  const description =
    locale === "ar"
      ? "المدرب الذي يقود أكاديمية صالحي للكيوكوشنكاي في بغداد."
      : "The coach leading Salihy Kyokushin Academy in Baghdad.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/coach"),
    openGraph: { title, description },
  };
}

export default async function CoachPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const heading = coachProfile.fullName ? t(locale, coachProfile.fullName) : locale === "ar" ? "المدرب" : "The Coach";
  const subline = [coachProfile.rankAndBelt, coachProfile.yearsOfExperience]
    .filter((v): v is NonNullable<typeof v> => Boolean(v))
    .map((v) => t(locale, v));

  return (
    <>
      <PageHero
        number="01"
        eyebrow={locale === "ar" ? "المدرب" : "THE COACH"}
        title={heading}
        subtitle={subline.join(" · ") || undefined}
      />

      {/* Real, documentary photography — the coach in the hall, never a
          staged studio shot, and never inside the Hero itself. */}
      <section className="relative bg-obsidian/92 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <Reveal className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
            <Image
              src={coachProfile.portrait}
              alt={t(locale, coachProfile.portraitAlt)}
              fill
              sizes="(min-width: 640px) 900px, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {(philosophy || vision) && (
        <section className="relative bg-obsidian/92 py-24 sm:py-32">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 sm:px-10 md:grid-cols-2">
            {philosophy && (
              <Reveal>
                <SectionLabel number="—" title={locale === "ar" ? "فلسفة التدريب" : "TRAINING PHILOSOPHY"} />
                <p className="mt-6 text-balance text-xl leading-relaxed text-bone sm:text-2xl">{t(locale, philosophy)}</p>
              </Reveal>
            )}
            {vision && (
              <Reveal delay={0.1}>
                <SectionLabel number="—" title={locale === "ar" ? "الرؤية" : "VISION"} />
                <p className="mt-6 text-balance text-xl leading-relaxed text-bone sm:text-2xl">{t(locale, vision)}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className="relative bg-obsidian/92 py-24 text-center sm:py-32">
        <div className="mx-auto max-w-xl px-6 sm:px-10">
          <Reveal>
            <h2 className="font-heading text-balance text-3xl text-bone sm:text-4xl">
              {locale === "ar" ? "تتبّع المسيرة كاملة" : "Follow the Full Journey"}
            </h2>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={localePath(locale, "/legacy")} variant="primary">
                {locale === "ar" ? "المسيرة" : "The Legacy"}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
