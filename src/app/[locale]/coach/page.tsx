import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { t, localePath, buildAlternates } from "@/lib/utils";
import { coachProfile, bioIntro, philosophy, vision } from "@/data/coach";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title =
    locale === "ar"
      ? "المدرب — من مقاتل إلى صانع أبطال | أكاديمية صالحي"
      : "The Coach — From Fighter to Champion-Maker | Salihy Academy";
  const description =
    locale === "ar"
      ? "قصة مدرب أكاديمية صالحي: بداياته في الكيوكوشنكاي، مسيرته كمقاتل، وانتقاله لصناعة جيل جديد من الأبطال."
      : "The story of Salihy Academy's coach: his beginnings in Kyokushin, his fighting career, and his transition to building a new generation of champions.";
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

  return (
    <>
      <section className="relative flex min-h-[90dvh] items-end overflow-hidden bg-obsidian">
        <div className="absolute inset-0">
          <Image
            src={coachProfile.portrait}
            alt={t(locale, coachProfile.portraitAlt)}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/10" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 sm:px-10">
          <SectionLabel number="01" title={locale === "ar" ? "المدرب" : "THE COACH"} className="mb-6" />
          <Reveal>
            <h1 className="font-heading text-balance text-4xl text-bone xs:text-5xl sm:text-6xl md:text-7xl">
              {t(locale, coachProfile.fullName)}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm tracking-wide text-steel sm:text-base">
              {t(locale, coachProfile.rankAndBelt)} · {t(locale, coachProfile.yearsOfExperience)}{" "}
              {locale === "ar" ? "خبرة" : "experience"}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-charcoal py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <Reveal>
            <p className="text-balance text-lg leading-relaxed text-bone sm:text-xl">{t(locale, bioIntro)}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-obsidian py-24 sm:py-32">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 sm:px-10 md:grid-cols-2">
          <Reveal>
            <SectionLabel number="—" title={locale === "ar" ? "فلسفة التدريب" : "TRAINING PHILOSOPHY"} />
            <p className="mt-6 text-balance text-xl leading-relaxed text-bone sm:text-2xl">{t(locale, philosophy)}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel number="—" title={locale === "ar" ? "الرؤية" : "VISION"} />
            <p className="mt-6 text-balance text-xl leading-relaxed text-bone sm:text-2xl">{t(locale, vision)}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-charcoal py-24 text-center sm:py-32">
        <div className="mx-auto max-w-xl px-6 sm:px-10">
          <Reveal>
            <h2 className="font-heading text-balance text-3xl text-bone sm:text-4xl">
              {locale === "ar" ? "تتبّع المسيرة كاملة" : "Follow the Full Journey"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-steel sm:text-base">
              {locale === "ar"
                ? "من أول يوم تدريب إلى تأسيس الأكاديمية — رحلة كاملة موثّقة خطوة بخطوة."
                : "From the first day of training to founding the academy — a full journey, documented step by step."}
            </p>
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
