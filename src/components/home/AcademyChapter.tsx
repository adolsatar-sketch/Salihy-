"use client";

import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { localePath, t } from "@/lib/utils";
import { pillars, shortDescription } from "@/data/academy";
import { address } from "@/data/contact";

export function AcademyChapter({ locale }: { locale: Locale }) {
  return (
    <section className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="05" title={locale === "ar" ? "الأكاديمية" : "THE ACADEMY"} />
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <Reveal>
            <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
              {locale === "ar" ? "بيت حقيقي لصناعة الأبطال" : "A real home for building champions"}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-steel sm:text-base">{t(locale, shortDescription)}</p>
            <p className="mt-4 text-xs tracking-wide text-steel/80">{t(locale, address)}</p>
            <div className="mt-8">
              <ButtonLink href={localePath(locale, "/academy")} variant="outline">
                {locale === "ar" ? "تعرف على الأكاديمية" : "Discover the Academy"}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-bone/10 sm:grid-cols-2">
            {pillars.slice(0, 4).map((pillar, i) => (
              <Reveal key={t(locale, pillar.title)} delay={i * 0.06}>
                <div className="h-full bg-obsidian p-6">
                  <p className="font-heading text-sm tracking-wide text-active">{t(locale, pillar.title)}</p>
                  <p className="mt-2 text-xs leading-relaxed text-steel">{t(locale, pillar.description)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
