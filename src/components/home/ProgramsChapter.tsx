"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { localePath, t } from "@/lib/utils";
import { programs } from "@/data/programs";

export function ProgramsChapter({ locale }: { locale: Locale }) {
  const featured = programs.filter((p) => !p.isInformational).slice(0, 4);

  return (
    <section className="relative bg-obsidian/92 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel number="06" title={locale === "ar" ? "البرامج" : locale === "tr" ? "PROGRAMLAR" : "PROGRAMS"} />
            <Reveal className="mt-6">
              <h2 className="font-heading text-balance max-w-xl text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
                {locale === "ar" ? "مسار لكل مرحلة عمرية" : locale === "tr" ? "Her yaş dönemi için bir yol" : "A path for every stage of life"}
              </h2>
            </Reveal>
          </div>
          <TransitionLink
            href={localePath(locale, "/programs")}
            className="font-heading whitespace-nowrap text-xs tracking-[0.3em] text-steel hover:text-bone"
          >
            {locale === "ar" ? "كل البرامج ←" : locale === "tr" ? "TÜM PROGRAMLAR →" : "ALL PROGRAMS →"}
          </TransitionLink>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((program, i) => (
            <Reveal key={program.slug} delay={i * 0.06}>
              <TransitionLink
                href={localePath(locale, `/programs/${program.slug}`)}
                className="group relative block aspect-[3/4] overflow-hidden bg-charcoal"
                data-cursor-hover
              >
                <Image
                  src={program.heroImage}
                  alt={t(locale, program.heroImageAlt)}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-heading text-lg text-bone">{t(locale, program.shortTitle)}</p>
                  {program.ageRange && <p className="mt-1 text-xs text-steel">{t(locale, program.ageRange)}</p>}
                </div>
              </TransitionLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
