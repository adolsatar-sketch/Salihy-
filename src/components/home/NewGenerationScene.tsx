"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/utils";
import { achievements, medalLabel, achievementHeadline } from "@/data/achievements";

const hotspots = [
  { id: "ach-budokaido-tokat", image: "/assets/gallery/gallery-06.jpg", x: 62, y: 55 },
  { id: "ach-team-podium-sweep", image: "/assets/gallery/gallery-08.jpg", x: 45, y: 45 },
];

export function NewGenerationScene({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative bg-obsidian py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="05" title={locale === "ar" ? "الجيل الجديد" : "THE NEW GENERATION"} />
        <Reveal className="mt-6 max-w-xl">
          <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? "جيل يصعد المنصة معًا" : "A generation reaching the podium together"}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {hotspots.map((spot) => {
            const achievement = achievements.find((a) => a.id === spot.id);
            const isActive = activeId === spot.id;
            return (
              <div
                key={spot.id}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
                onMouseEnter={() => setActiveId(spot.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId((current) => (current === spot.id ? null : spot.id))}
                data-cursor-hover
              >
                <Image src={spot.image} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                <div
                  className="absolute inset-0 bg-obsidian transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 0.15 : 0.35,
                    maskImage: isActive
                      ? `radial-gradient(circle at ${spot.x}% ${spot.y}%, transparent 20%, black 55%)`
                      : undefined,
                    WebkitMaskImage: isActive
                      ? `radial-gradient(circle at ${spot.x}% ${spot.y}%, transparent 20%, black 55%)`
                      : undefined,
                  }}
                />
                <span
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone bg-active/80"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                />

                <AnimatePresence>
                  {isActive && achievement && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-x-4 bottom-4 bg-obsidian/85 p-4"
                    >
                      <p className="font-heading text-[10px] tracking-[0.25em] text-gold">
                        {t(locale, medalLabel[achievement.medal])}
                      </p>
                      <p className="mt-1 text-sm text-bone">{achievementHeadline(achievement, locale)}</p>
                      <p className="mt-1 text-xs text-steel">{t(locale, achievement.result)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
