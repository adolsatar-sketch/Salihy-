"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ensureGsap, gsap } from "@/lib/gsapConfig";

export function OriginScene({ locale }: { locale: Locale }) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      if (!mainRef.current || !leftRef.current || !rightRef.current) return;

      gsap.set(mainRef.current, { scale: 0.72 });
      gsap.set(leftRef.current, { x: 0, opacity: 0.9 });
      gsap.set(rightRef.current, { x: 0, opacity: 0.9 });
      if (grainRef.current) gsap.set(grainRef.current, { opacity: 1 });

      // Sticky + scrub (not GSAP `pin`) on purpose: pinning inserts a
      // "pin-spacer" wrapper into the DOM outside React's bookkeeping, which
      // can race React's own unmount when navigating away and, worse, can
      // still be settling into the layout at the exact moment the browser
      // restores scroll position on Back — sticky positioning gets the same
      // "stay put while it plays out" effect with plain CSS, no DOM surgery.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      tl.to(mainRef.current, { scale: 1.08, ease: "none" }, 0)
        .to(leftRef.current, { x: "-18vw", opacity: 0.35, ease: "none" }, 0)
        .to(rightRef.current, { x: "18vw", opacity: 0.35, ease: "none" }, 0)
        .to(grainRef.current, { opacity: 0.12, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal">
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 mx-auto max-w-6xl px-6 sm:px-10">
          <SectionLabel number="01" title={locale === "ar" ? "البداية" : "ORIGIN"} />
        </div>

        <div className="relative flex h-full items-center justify-center">
          <div ref={leftRef} className="absolute h-[38%] w-[24%] overflow-hidden opacity-90 xs:h-[42%]">
            <Image
              src="/assets/gallery/gallery-09.jpg"
              alt={locale === "ar" ? "لاعبان يتدربان معًا على حركة رفع الركبة" : "Two athletes drilling a knee-raise together"}
              fill
              sizes="24vw"
              className="object-cover grayscale"
            />
          </div>
          <div ref={rightRef} className="absolute h-[38%] w-[24%] overflow-hidden opacity-90 xs:h-[42%]">
            <Image
              src="/assets/gallery/gallery-01.jpg"
              alt={locale === "ar" ? "أجواء صالة تدريب الكيوكوشنكاي" : "The atmosphere of the Kyokushin training hall"}
              fill
              sizes="24vw"
              className="object-cover grayscale"
            />
          </div>

          <div ref={mainRef} className="relative z-10 aspect-[4/5] w-[70%] max-w-md overflow-hidden xs:w-[56%]">
            <Image
              src="/assets/gallery/gallery-04.jpg"
              alt={
                locale === "ar"
                  ? "صورة أرشيفية قديمة للاعبين يتدربان على القتال، أحدهما يرتدي حزامًا أخضر"
                  : "Archival photo of two athletes sparring, one wearing a green belt"
              }
              fill
              sizes="(min-width: 400px) 420px, 70vw"
              className="object-cover"
            />
            <div
              ref={grainRef}
              aria-hidden="true"
              className="absolute inset-0 grayscale"
              style={{
                backgroundColor: "#111111",
                mixBlendMode: "color",
              }}
            />
            <div className="absolute bottom-3 start-3 font-heading text-[10px] tracking-[0.3em] text-bone/80">
              ARCHIVE 01
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 mx-auto max-w-md px-6 text-center sm:px-10">
          <p className="text-sm leading-relaxed text-steel sm:text-base">
            {locale === "ar"
              ? "قبل أن تصبح هناك أكاديمية، كانت هناك سنوات من التدريب، النزالات، الانتصارات، الخسارات والانضباط."
              : "Before there was an academy, there were years of training, fights, wins, losses, and discipline."}
          </p>
        </div>
      </div>
    </section>
  );
}
