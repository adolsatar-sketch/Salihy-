import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { KineticBelt } from "@/components/motion/KineticBelt";
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

// The academy page is deliberately the brightest, warmest room in the site —
// a parent walking through this page (rather than a competitor sizing up
// the fighters) should read it as an inviting, well-run place before
// anything else. Bone is the resting background here, not the exception.
export default async function AcademyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <section className="relative overflow-hidden bg-bone pb-16 pt-40 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-charcoal/45">04 — {locale === "ar" ? "الأكاديمية" : "THE ACADEMY"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-charcoal sm:text-5xl md:text-6xl">{t(locale, tagline)}</h1>
            <p className="mt-6 text-sm leading-relaxed text-charcoal/70 sm:text-base">{t(locale, shortDescription)}</p>
          </Reveal>
          <div className="mx-auto mt-8 h-4 w-40 text-blood/70">
            <KineticBelt d="M0 8 L 100 8" viewBox="0 0 100 16" strokeWidth={1.4} className="h-full w-full" showCrease={false} />
          </div>
        </div>
      </section>

      <section className="relative bg-bone pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <SectionLabel number="—" title={locale === "ar" ? "ما الذي نبنيه" : "WHAT WE BUILD"} className="text-charcoal/50" />
          <div className="mt-10 grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={t(locale, pillar.title)} delay={i * 0.05}>
                <div className="h-full bg-bone p-7">
                  <p className="font-heading text-base text-blood">{t(locale, pillar.title)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{t(locale, pillar.description)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-obsidian py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/assets/gallery/gallery-09.jpg"
              alt={locale === "ar" ? "تدريب ثنائي على الحركات الأساسية داخل الصالة" : "Partner drilling on fundamental movements inside the hall"}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel number="—" title={locale === "ar" ? "بيئة تدريب لكل الأعمار" : "A TRAINING GROUND FOR ALL"} />
            <div className="mt-8 flex flex-wrap gap-3">
              {audiences.map((audience) => (
                <span key={t(locale, audience)} className="border border-bone/15 px-5 py-2 text-sm text-bone">
                  {t(locale, audience)}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-steel">
              {locale === "ar"
                ? "صالة واحدة، ومعايير واحدة، تُدرَّس بحسب عمر كل مجموعة ومستواها — من الخطوة الأولى إلى منصة التتويج."
                : "One hall, one standard, taught to fit each group's age and level — from a student's first step to the podium."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-bone py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <SectionLabel number="—" title={locale === "ar" ? "الموقع وأوقات التدريب" : "LOCATION & HOURS"} className="text-charcoal/50" />
            <p className="mt-6 text-xl text-charcoal">{t(locale, address)}</p>
            <ul className="mt-6 space-y-2 text-sm text-charcoal/70">
              {trainingDays.map((day) => (
                <li key={t(locale, day.day)} className="flex justify-between gap-4 border-b border-charcoal/10 py-2">
                  <span>{t(locale, day.day)}</span>
                  <span>{t(locale, day.hours)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-charcoal/50">{t(locale, generalNote)}</p>
            <div className="mt-8">
              <ButtonLink href={localePath(locale, "/contact")} variant="dark">
                {locale === "ar" ? "التواصل والموقع" : "Contact & Location"}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="relative ms-6 border-s border-charcoal/15 ps-8">
              <KineticBelt
                d="M2 0 L2 100"
                viewBox="0 0 4 100"
                strokeWidth={1.2}
                className="absolute inset-y-0 -start-px h-full w-1 text-charcoal/25"
                showCrease={false}
              />
              <p className="font-heading text-2xl leading-snug text-charcoal">
                {locale === "ar"
                  ? "اتصل بنا، أو مُر من الباب — الحصة التجريبية الأولى تكفي لتعرف إن كانت هذه أكاديميتك."
                  : "Call us, or just walk in — one trial class is enough to know if this is the right academy for your child."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
