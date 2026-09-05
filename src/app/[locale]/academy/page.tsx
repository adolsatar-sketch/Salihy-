import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
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
  const title = locale === "ar" ? "الأكاديمية | أكاديمية صالحي للكيوكوشنكاي" : "The Academy | Salihy Kyokushin Academy";
  const description =
    locale === "ar"
      ? "مدرسة كيوكوشنكاي كاراتيه في بغداد – الصليخ، لجميع الأعمار: الرجال، النساء، الشباب والأطفال."
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
      <section className="relative bg-obsidian pb-16 pt-40 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">04 — {locale === "ar" ? "الأكاديمية" : "THE ACADEMY"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">{t(locale, tagline)}</h1>
            <p className="mt-6 text-sm leading-relaxed text-steel sm:text-base">{t(locale, shortDescription)}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-charcoal py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <SectionLabel number="—" title={locale === "ar" ? "ما الذي نبنيه" : "WHAT WE BUILD"} />
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

      <section className="relative bg-obsidian py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <SectionLabel number="—" title={locale === "ar" ? "بيئة تدريب لكل الأعمار" : "A TRAINING GROUND FOR ALL"} />
          <div className="mt-8 flex flex-wrap gap-4">
            {audiences.map((audience) => (
              <span key={t(locale, audience)} className="border border-bone/15 px-5 py-2 text-sm text-bone">
                {t(locale, audience)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-4 border border-bone/15 bg-obsidian text-center">
              <Image src="/assets/logo/logo-mark.png" alt="" width={72} height={72} className="opacity-60" />
              <p className="max-w-xs text-sm text-steel">
                {locale === "ar" ? "صور المقر ستُضاف قريبًا" : "Facility photos coming soon"}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel number="—" title={locale === "ar" ? "الموقع" : "LOCATION"} />
            <p className="mt-6 text-xl text-bone">{t(locale, address)}</p>
            <ul className="mt-6 space-y-2 text-sm text-steel">
              {trainingDays.map((day) => (
                <li key={t(locale, day.day)} className="flex justify-between gap-4 border-b border-bone/10 py-2">
                  <span>{t(locale, day.day)}</span>
                  <span>{t(locale, day.hours)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-steel/70">{t(locale, generalNote)}</p>
            <div className="mt-8">
              <ButtonLink href={localePath(locale, "/contact")} variant="outline">
                {locale === "ar" ? "التواصل والموقع" : "Contact & Location"}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
