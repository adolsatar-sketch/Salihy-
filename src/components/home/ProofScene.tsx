"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, t } from "@/lib/utils";
import { achievements, medalLabel, achievementHeadline } from "@/data/achievements";

export function ProofScene({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [activeId, setActiveId] = useState(achievements[0]?.id);
  const active = achievements.find((a) => a.id === activeId) ?? achievements[0];

  if (!active) return null;

  return (
    <section className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="03" title={locale === "ar" ? "البرهان" : "PROOF"} />
        <Reveal className="mt-6 max-w-2xl">
          <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? "منصات تتويج، لا مجرد صور" : "Podiums, not just photographs"}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[4/3] w-full overflow-hidden"
            >
              <Image
                src={active.image}
                alt={t(locale, active.note)}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian to-transparent p-6">
                <p className="font-heading text-[10px] tracking-[0.3em] text-gold">{t(locale, medalLabel[active.medal])}</p>
                <p className="mt-1 text-lg text-bone">{achievementHeadline(active, locale)}</p>
                <p className="mt-1 text-xs text-steel">{t(locale, active.place)}</p>
              </div>

              {active.region === "outside" && (
                <div className="absolute end-4 top-4 flex items-center gap-2 bg-obsidian/70 px-3 py-1.5 text-[10px] tracking-[0.15em] text-bone/80">
                  <span>{locale === "ar" ? "بغداد" : "BAGHDAD"}</span>
                  <svg width="24" height="6" viewBox="0 0 24 6" aria-hidden="true">
                    <line x1="0" y1="3" x2="24" y2="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                  <span>{t(locale, active.place).split("،")[0]}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:pb-0">
            {achievements.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`group relative aspect-[4/5] w-28 shrink-0 overflow-hidden lg:w-full ${
                  item.id === active.id ? "ring-1 ring-active" : ""
                }`}
                data-cursor-hover
              >
                <Image src={item.image} alt="" fill sizes="140px" className="object-cover transition-opacity group-hover:opacity-80" />
                <div
                  className={`absolute inset-0 bg-obsidian transition-opacity ${item.id === active.id ? "opacity-0" : "opacity-45"}`}
                />
              </button>
            ))}
          </div>
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
