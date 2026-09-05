import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { t, localePath, buildAlternates } from "@/lib/utils";
import { pillars, audiences, shortDescription, tagline } from "@/data/academy";
import { address, trainingDays, generalNote } from "@/data/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "الأكاديمية | أكاديمية صالحي للكيوكوشنكاي" : locale === "tr" ? "Akademi | Salihy Kyokushin Akademisi" : "The Academy | Salihy Kyokushin Academy";
  const description =
    locale === "ar"
      ? "مدرسة كيوكوشنكاي كاراتيه في بغداد – الصليخ، لجميع الأعمار: الرجال، النساء، الشباب والأطفال."
      : locale === "tr"
        ? "Bağdat – Al-Sulaikh'te her yaş için bir Kyokushin karate okulu: erkekler, kadınlar, gençler ve çocuklar."
        : "A Kyokushin karate school in Baghdad – Al-Sulaikh, for all ages: men, women, youth and children.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/academy"),
    openGraph: { title, description },
  };
}

export default async function AcademyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <PageHero number="04" eyebrow={locale === "ar" ? "الأكاديمية" : locale === "tr" ? "AKADEMİ" : "THE ACADEMY"} title={t(locale, tagline)} subtitle={t(locale, shortDescription)} />

      <section className="relative bg-charcoal/92 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <SectionLabel number="—" title={locale === "ar" ? "ما الذي نبنيه" : locale === "tr" ? "NE İNŞA EDİYORUZ" : "WHAT WE BUILD"} />
          <div className="mt-10 grid gap-px overflow-hidden border border-bone/10 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={t(locale, pillar.title)} delay={i * 0.05}>
                <div className="h-full bg-obsidian p-7">
                  <p className="font-heading text-base text-active">{t(locale, pillar.title)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{t(locale, pillar.description)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-obsidian/92 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <SectionLabel number="—" title={locale === "ar" ? "بيئة تدريب لكل الأعمار" : locale === "tr" ? "HERKES İÇİN BİR ANTRENMAN ALANI" : "A TRAINING GROUND FOR ALL"} />
          <div className="mt-8 flex flex-wrap gap-4">
            {audiences.map((audience) => (
              <span key={t(locale, audience)} className="border border-bone/15 px-5 py-2 text-sm text-bone">
                {t(locale, audience)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal/92 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <SectionLabel number="—" title={locale === "ar" ? "الموقع" : locale === "tr" ? "KONUM" : "LOCATION"} className="justify-center" />
            <p className="mt-6 text-xl text-bone">{t(locale, address)}</p>
            {trainingDays.length > 0 && (
              <ul className="mx-auto mt-6 max-w-sm space-y-2 text-start text-sm text-steel">
                {trainingDays.map((day) => (
                  <li key={t(locale, day.day)} className="flex justify-between gap-4 border-b border-bone/10 py-2">
                    <span>{t(locale, day.day)}</span>
                    <span>{t(locale, day.hours)}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-xs leading-relaxed text-steel/70">{t(locale, generalNote)}</p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={localePath(locale, "/contact")} variant="outline">
                {locale === "ar" ? "التواصل والموقع" : locale === "tr" ? "İletişim ve Konum" : "Contact & Location"}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
