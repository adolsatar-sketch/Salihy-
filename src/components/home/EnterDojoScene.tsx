"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { ensureGsap, gsap } from "@/lib/gsapConfig";
import { t, localePath } from "@/lib/utils";
import { programs, type ProgramSlug } from "@/data/programs";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { KineticBelt } from "@/components/motion/KineticBelt";

const pathSlugs: ProgramSlug[] = ["kids", "youth", "adults", "women", "competition-team", "study-sport"];

export function EnterDojoScene({ locale }: { locale: Locale }) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const darkPanelRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ProgramSlug | null>(null);

  useEffect(() => {
    if (reducedMotion || !darkPanelRef.current) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      // Sticky + scrub, not GSAP `pin` — a fixed-height sticky wrapper gets
      // the same "hold still while it fades" effect with plain CSS instead
      // of GSAP's pin-spacer DOM surgery.
      gsap.to(darkPanelRef.current, {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const activeProgram = selected ? programs.find((p) => p.slug === selected) : null;

  return (
    <>
      <section ref={sectionRef} className="relative h-[140vh]">
        <div ref={darkPanelRef} className="sticky top-0 flex h-screen items-center justify-center bg-obsidian">
          <p className="font-heading text-balance max-w-lg px-6 text-center text-2xl leading-snug text-bone sm:text-3xl">
            {locale === "ar" ? "من كل ذلك… وُلدت أكاديمية." : "From all of that… an academy was born."}
          </p>
        </div>
      </section>

      <div className="relative bg-bone py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <p className="font-heading text-xs tracking-[0.4em] text-charcoal/50">
            06 — {locale === "ar" ? "ادخل الدوجو" : "ENTER THE DOJO"}
          </p>
          <h2 className="font-heading text-balance mt-6 text-3xl leading-tight text-charcoal sm:text-4xl md:text-5xl">
            {locale === "ar" ? "لمن تبحث عن التدريب؟" : "Who are you looking to train?"}
          </h2>

          <div className="mt-8 h-4 w-32 text-blood">
            <KineticBelt d="M0 8 L 100 8" viewBox="0 0 100 16" strokeWidth={1.4} className="h-full w-full" showCrease={false} />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {pathSlugs.map((slug) => {
              const program = programs.find((p) => p.slug === slug);
              if (!program) return null;
              const isActive = selected === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setSelected((current) => (current === slug ? null : slug))}
                  className={`border px-4 py-5 text-start transition-colors ${
                    isActive ? "border-blood bg-blood text-bone" : "border-charcoal/15 text-charcoal hover:border-blood/50"
                  }`}
                  data-cursor-hover
                >
                  <span className="font-heading text-lg sm:text-xl">{t(locale, program.shortTitle)}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeProgram && (
              <motion.div
                key={activeProgram.slug}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="mt-10 grid gap-6 border-t border-charcoal/10 pt-10 sm:grid-cols-2 sm:items-center">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={activeProgram.heroImage}
                      alt={t(locale, activeProgram.heroImageAlt)}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal/60">{t(locale, activeProgram.ageRange)}</p>
                    <p className="font-heading mt-2 text-2xl text-charcoal">{t(locale, activeProgram.title)}</p>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{t(locale, activeProgram.summary)}</p>
                    <p className="mt-4 text-sm text-charcoal/80">— {t(locale, activeProgram.goals[0])}</p>
                    <TransitionLink
                      href={localePath(locale, `/programs/${activeProgram.slug}`)}
                      className="mt-6 inline-block border-b border-blood text-sm text-blood"
                      data-cursor-hover
                    >
                      {locale === "ar" ? "افتح الصفحة الكاملة" : "Open the full page"}
                    </TransitionLink>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
