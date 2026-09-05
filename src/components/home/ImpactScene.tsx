"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ensureGsap, gsap } from "@/lib/gsapConfig";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function ImpactScene({ locale }: { locale: Locale }) {
  // See HeroChapter for why this is our own hydration-safe hook rather than
  // Framer Motion's `useReducedMotion` — it gates whether a DOM node mounts
  // at all below, so it must agree with the server on first client render.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const afterimageRef = useRef<HTMLDivElement>(null);
  const slackRef = useRef<SVGPathElement>(null);
  const tautRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      if (!imageRef.current || !slackRef.current || !tautRef.current) return;

      gsap.set(imageRef.current, { scale: 1.18, x: "6%" });
      gsap.set(tautRef.current, { autoAlpha: 0 });
      gsap.set(afterimageRef.current, { autoAlpha: 0 });

      // Sticky + scrub, not GSAP `pin` — see OriginScene for why.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });

      tl.to(imageRef.current, { scale: 1.02, x: "0%", ease: "none" }, 0)
        .to(slackRef.current, { autoAlpha: 0, duration: 0.08 }, 0.82)
        .to(tautRef.current, { autoAlpha: 1, duration: 0.08 }, 0.82)
        .to(imageRef.current, { x: "-1.5%", duration: 0.06 }, 0.84)
        .fromTo(
          afterimageRef.current,
          { autoAlpha: 0.5, x: "2%" },
          { autoAlpha: 0, x: "0%", duration: 0.14 },
          0.84
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-obsidian">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/assets/gallery/gallery-10.jpg"
            alt={
              locale === "ar"
                ? "لاعب ينفذ ركلة أمامية قوية داخل صالة بطولة أمام جمهور"
                : "An athlete delivering a powerful front kick inside a tournament hall in front of spectators"
            }
            fill
            sizes="100vw"
            className="object-cover object-[50%_25%]"
          />
        </div>
        {!reducedMotion && (
          <div ref={afterimageRef} aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-screen">
            <Image src="/assets/gallery/gallery-10.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_25%]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />

        <div className="absolute inset-x-0 top-24 z-10 mx-auto max-w-6xl px-6 sm:px-10">
          <SectionLabel number="02" title={locale === "ar" ? "الاصطدام" : "IMPACT"} />
        </div>

        <div className="absolute inset-x-6 bottom-28 z-10 mx-auto max-w-xs text-steel/70 sm:inset-x-10 sm:max-w-sm">
          <svg viewBox="0 0 100 12" className="h-4 w-full overflow-visible" aria-hidden="true">
            <path ref={slackRef} d="M0 6 Q 25 12, 50 6 T 100 6" fill="none" stroke="currentColor" strokeWidth={1} />
            <path ref={tautRef} d="M0 6 L 100 6" fill="none" stroke="currentColor" strokeWidth={1.4} />
          </svg>
        </div>

        <div className="absolute inset-x-0 bottom-10 z-10 mx-auto max-w-xl px-6 text-center sm:px-10">
          <p className="text-sm leading-relaxed text-steel sm:text-base">
            {locale === "ar"
              ? "الركلات، النزالات، الاحتكاك المباشر — أسلوب قتالي لم يولد من كتاب، بل من التكرار."
              : "The kicks, the sparring, the full-contact grind — a fighting style born not from a book, but from repetition."}
          </p>
        </div>
      </div>
    </section>
  );
}
