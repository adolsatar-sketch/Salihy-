"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, t } from "@/lib/utils";
import { achievements, counterStats } from "@/data/achievements";
import { Counter } from "@/components/ui/Counter";

export function AchievementsChapter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const featured = achievements.slice(0, 3);

  return (
    <section className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="03" title={locale === "ar" ? "الإنجازات" : "ACHIEVEMENTS"} />
        <Reveal className="mt-6 max-w-2xl">
          <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? "منصات تتويج، لا مجرد صور" : "Podiums, not just photographs"}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-bone/10 py-8 sm:grid-cols-4">
          {counterStats.map((stat) => (
            <div key={t(locale, stat.label)} className="text-center">
              <Counter value={stat.value} className="font-heading text-3xl text-gold sm:text-4xl" />
              <p className="mt-2 text-[11px] tracking-wide text-steel sm:text-xs">{t(locale, stat.label)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <div className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={t(locale, item.note)}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-heading text-[10px] tracking-[0.3em] text-gold">{item.year}</p>
                  <p className="mt-1 text-sm text-bone">{t(locale, item.tournament)}</p>
                  <p className="mt-1 text-xs text-steel">{t(locale, item.place)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <ButtonLink href={localePath(locale, "/achievements")} variant="outline">
            {dict.common.viewAll}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
