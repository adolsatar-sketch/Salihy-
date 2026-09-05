"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { localePath, t } from "@/lib/utils";
import { champions } from "@/data/champions";

export function ChampionsChapter({ locale }: { locale: Locale }) {
  return (
    <section className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="08" title={locale === "ar" ? "الأبطال" : "CHAMPIONS"} />
        <Reveal className="mt-6 max-w-xl">
          <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? "جيل جديد يصعد المنصة" : "A new generation takes the podium"}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {champions.map((champion, i) => (
            <Reveal key={champion.slug} delay={i * 0.07}>
              <TransitionLink
                href={`${localePath(locale, "/champions")}?player=${champion.slug}`}
                className="group block"
                data-cursor-hover
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={champion.image}
                    alt={t(locale, champion.imageAlt)}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                </div>
                <p className="font-heading mt-3 text-sm text-bone">{t(locale, champion.tournament)}</p>
                <p className="text-xs text-gold">{t(locale, champion.result)}</p>
              </TransitionLink>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <ButtonLink href={localePath(locale, "/champions")} variant="outline">
            {locale === "ar" ? "كل الأبطال" : "All Champions"}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
