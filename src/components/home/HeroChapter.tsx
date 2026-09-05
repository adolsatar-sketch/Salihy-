"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/Button";
import { RevealLines } from "@/components/ui/Reveal";
import { LogoHeroMark } from "@/components/motion/LogoHeroMark";
import { LogoHeroMarkMobile } from "@/components/motion/LogoHeroMarkMobile";
import { localePath } from "@/lib/utils";

// The Hero's visual centerpiece is the official logo — not a photo of a
// fighter. Real photography belongs in the documentary chapters further
// down the page (Origin, Impact, Proof) and inside Gallery/Legacy/
// Achievements, never here.
export function HeroChapter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const reducedMotion = useReducedMotion();

  const lines =
    locale === "ar"
      ? ["من ساحة النزال", "إلى صناعة أبطال الغد"]
      : locale === "tr"
        ? ["MÜCADELEDEN", "ŞAMPİYONLARIN GELECEĞİNE"]
        : ["FROM THE FIGHT", "TO THE FUTURE OF CHAMPIONS"];

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-obsidian/85 pt-24">
      <LogoHeroMark className="mx-auto hidden md:block" />
      <LogoHeroMarkMobile className="mx-auto md:hidden" />

      {/* Text and CTA are secondary: they settle in after the logo, and
          never compete with it for visual weight. */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 pt-8 text-center sm:px-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-heading mb-5 text-xs tracking-[0.4em] text-steel">
          {locale === "ar" ? "أكاديمية صالحي للكيوكوشنكاي" : locale === "tr" ? "SALIHY KYOKUSHIN AKADEMİSİ" : "SALIHY KYOKUSHIN ACADEMY"}
        </p>
        <h1 className="font-heading text-balance text-3xl leading-[1.1] text-bone xs:text-4xl sm:text-5xl">
          <RevealLines lines={lines} />
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-steel sm:text-base">
          {locale === "ar"
            ? "تدريب احترافي، انضباط، ثقة وصناعة أبطال لجميع الأعمار."
            : locale === "tr"
              ? "Profesyonel antrenman, disiplin, özgüven — her yaştan şampiyon yetiştirmek."
              : "Professional training, discipline, confidence — building champions of every age."}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href={localePath(locale, "/legacy")} variant="primary" data-cursor-hover>
            {dict.common.exploreJourney}
          </ButtonLink>
          <ButtonLink href={localePath(locale, "/registration")} variant="outline" data-cursor-hover>
            {dict.common.bookTrial}
          </ButtonLink>
        </div>
      </motion.div>

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
