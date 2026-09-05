"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, t } from "@/lib/utils";
import { achievements } from "@/data/achievements";
import { galleryItems } from "@/data/gallery";

export function AchievementsChapter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const featured =
    achievements.length > 0
      ? achievements.slice(0, 3).map((a) => ({ id: a.id, image: a.image, caption: a.tournament ?? a.place }))
      : galleryItems
          .filter((item) => item.categories.includes("tournaments") || item.categories.includes("trophies"))
          .slice(0, 3)
          .map((item) => ({ id: item.id, image: item.src, caption: item.caption }));

  if (featured.length === 0) return null;

  return (
    <section className="relative bg-charcoal/92 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="03" title={locale === "ar" ? "الإنجازات" : locale === "tr" ? "BAŞARILAR" : "ACHIEVEMENTS"} />
        <Reveal className="mt-6 max-w-2xl">
          <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? "لحظات من البطولات" : locale === "tr" ? "Turnuvalardan anlar" : "Moments from the tournaments"}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <div className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.caption ? t(locale, item.caption) : ""}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="mt-1 text-sm text-bone">{t(locale, item.caption)}</p>
                  </div>
                )}
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
