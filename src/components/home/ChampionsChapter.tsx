"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { localePath, t } from "@/lib/utils";
import { champions } from "@/data/champions";
import { galleryItems } from "@/data/gallery";

export function ChampionsChapter({ locale }: { locale: Locale }) {
  const featured =
    champions.length > 0
      ? champions.slice(0, 4).map((c) => ({ key: c.slug, image: c.image, alt: c.imageAlt, caption: c.tournament }))
      : galleryItems
          .filter((item) => item.categories.includes("students"))
          .slice(0, 4)
          .map((item) => ({ key: item.id, image: item.src, alt: item.alt, caption: item.caption }));

  if (featured.length === 0) return null;

  return (
    <section className="relative bg-charcoal/92 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="09" title={locale === "ar" ? "الأبطال" : locale === "tr" ? "ŞAMPİYONLAR" : "CHAMPIONS"} />
        <Reveal className="mt-6 max-w-xl">
          <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? "جيل جديد يصعد المنصة" : locale === "tr" ? "Podyuma çıkan yeni bir nesil" : "A new generation takes the podium"}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.07}>
              <TransitionLink href={localePath(locale, "/champions")} className="group block" data-cursor-hover>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(locale, item.alt)}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                </div>
                {item.caption && <p className="mt-3 text-xs text-steel">{t(locale, item.caption)}</p>}
              </TransitionLink>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <ButtonLink href={localePath(locale, "/champions")} variant="outline">
            {locale === "ar" ? "كل الأبطال" : locale === "tr" ? "Tüm Şampiyonlar" : "All Champions"}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
