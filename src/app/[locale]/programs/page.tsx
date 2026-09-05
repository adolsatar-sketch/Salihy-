import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { programs } from "@/data/programs";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { localePath, t, buildAlternates } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "البرامج التدريبية | أكاديمية صالحي" : "Training Programs | Salihy Academy";
  const description =
    locale === "ar"
      ? "برامج أكاديمية صالحي لكل الأعمار: الأطفال، الناشئون، البالغون، النساء، فريق البطولات، والمزيد."
      : "Salihy Academy's programs for every age: kids, youth, adults, women, the competition team, and more.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/programs"),
    openGraph: { title, description },
  };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <PageHero
        number="05"
        eyebrow={locale === "ar" ? "البرامج" : "PROGRAMS"}
        title={locale === "ar" ? "مسار لكل مرحلة عمرية" : "A Path for Every Stage of Life"}
      />

      <section className="relative bg-obsidian/92 pb-28">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border border-bone/10 px-0 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={i * 0.05}>
              <TransitionLink
                href={localePath(locale, `/programs/${program.slug}`)}
                className="group relative block aspect-[4/5] overflow-hidden bg-charcoal"
                data-cursor-hover
              >
                <Image
                  src={program.heroImage}
                  alt={t(locale, program.heroImageAlt)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-heading text-xl text-bone">{t(locale, program.shortTitle)}</p>
                  {program.ageRange && <p className="mt-1 text-xs text-steel">{t(locale, program.ageRange)}</p>}
                  <p className="mt-3 max-w-xs text-xs leading-relaxed text-steel/80">{t(locale, program.summary)}</p>
                </div>
              </TransitionLink>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
