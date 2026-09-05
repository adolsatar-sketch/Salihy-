"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/Button";
import { RevealLines } from "@/components/ui/Reveal";
import { localePath } from "@/lib/utils";

export function HeroChapter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const reducedMotion = useReducedMotion();

  const lines =
    locale === "ar"
      ? ["من ساحة النزال", "إلى صناعة أبطال الغد"]
      : ["FROM THE FIGHT", "TO THE FUTURE OF CHAMPIONS"];

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-obsidian">
      <div className="absolute inset-0">
        <Image
          src="/assets/gallery/gallery-03.jpg"
          alt={
            locale === "ar"
              ? "لاعب كيوكوشنكاي ينفذ ركلة عالية داخل صالة تدريب"
              : "A Kyokushin fighter executing a high kick inside the training hall"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-obsidian/40" />

        {!reducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute -end-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full bg-blood/25 blur-[3px]"
            style={{ filter: "blur(80px)" }}
            animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 sm:px-10 sm:pb-28">
        <p className="font-heading mb-5 text-xs tracking-[0.4em] text-steel">
          {locale === "ar" ? "أكاديمية صالحي للكيوكوشنكاي" : "SALIHY KYOKUSHIN ACADEMY"}
        </p>
        <h1 className="font-heading text-balance text-4xl leading-[1.05] text-bone xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          <RevealLines lines={lines} />
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-steel sm:text-base">
          {locale === "ar"
            ? "تدريب احترافي، انضباط، ثقة وصناعة أبطال لجميع الأعمار."
            : "Professional training, discipline, confidence — building champions of every age."}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={localePath(locale, "/legacy")} variant="primary" data-cursor-hover>
            {dict.common.exploreJourney}
          </ButtonLink>
          <ButtonLink href={localePath(locale, "/registration")} variant="outline" data-cursor-hover>
            {dict.common.bookTrial}
          </ButtonLink>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-steel"
        animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-9 w-[3px] rounded-full bg-gradient-to-b from-bone to-transparent" />
        <span className="text-[10px] tracking-[0.3em]">{dict.common.scrollDown}</span>
      </motion.div>
    </section>
  );
}
