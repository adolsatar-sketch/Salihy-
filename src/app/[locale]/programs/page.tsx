import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { programs } from "@/data/programs";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { KineticBelt } from "@/components/motion/KineticBelt";
import { localePath, t, buildAlternates, cn } from "@/lib/utils";

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
      <section className="relative bg-obsidian pb-12 pt-40 sm:pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">05 — {locale === "ar" ? "البرامج" : "PROGRAMS"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "مسار لكل مرحلة عمرية" : "A Path for Every Stage of Life"}
            </h1>
            <p className="mt-4 text-sm text-steel">
              {locale === "ar" ? "اختر نقطتك على المسار" : "Choose your point on the path"}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-obsidian pb-28 sm:pb-36">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="relative">
            <KineticBelt
              d="M2 0 L2 100"
              viewBox="0 0 4 100"
              strokeWidth={1.4}
              className="absolute inset-y-0 start-1/2 hidden h-full w-1 -translate-x-1/2 text-bone/15 sm:block"
              showCrease={false}
            />
            <ol className="relative space-y-10 sm:space-y-16">
              {programs.map((program, i) => {
                const flip = i % 2 === 1;
                return (
                  <li key={program.slug}>
                    <Reveal delay={i * 0.04}>
                      <TransitionLink
                        href={localePath(locale, `/programs/${program.slug}`)}
                        data-cursor-hover
                        className="group grid items-center gap-6 sm:grid-cols-2 sm:gap-12"
                      >
                        <div className={cn("relative aspect-[16/10] overflow-hidden", flip && "sm:order-2")}>
                          <Image
                            src={program.heroImage}
                            alt={t(locale, program.heroImageAlt)}
                            fill
                            sizes="(min-width: 640px) 45vw, 100vw"
                            className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-obsidian/10 transition-opacity duration-500 group-hover:opacity-0" />
                        </div>
                        <div className={cn(flip && "sm:order-1 sm:text-end")}>
                          <span className="font-heading text-[11px] tracking-[0.4em] text-active">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="font-heading mt-2 text-2xl text-bone transition-colors group-hover:text-active sm:text-3xl">
                            {t(locale, program.shortTitle)}
                          </p>
                          <p className="mt-1 text-xs tracking-[0.15em] text-steel">{t(locale, program.ageRange)}</p>
                          <p className={cn("mt-3 max-w-sm text-sm leading-relaxed text-steel/80", flip && "sm:ms-auto")}>
                            {t(locale, program.summary)}
                          </p>
                        </div>
                      </TransitionLink>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
