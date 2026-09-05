"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ensureGsap, gsap } from "@/lib/gsapConfig";

export function TransformationScene({ locale }: { locale: Locale }) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      if (!leftHalfRef.current || !rightHalfRef.current) return;
      // Sticky + scrub, not GSAP `pin` — see OriginScene for why.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });
      tl.to(leftHalfRef.current, { xPercent: -100, ease: "none" }, 0).to(
        rightHalfRef.current,
        { xPercent: 100, ease: "none" },
        0
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-obsidian">
      <div className="absolute inset-0">
        <Image
          src="/assets/gallery/gallery-06.jpg"
          alt={
            locale === "ar"
              ? "أربعة لاعبين من بينهم طفل يقفون على منصة التتويج حاملين كؤوسًا وميداليات"
              : "Four athletes, including a child, standing on the podium holding trophies and medals"
          }
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/30" />
      </div>

      <div ref={leftHalfRef} className="absolute inset-y-0 start-0 w-1/2 overflow-hidden">
        <div className="relative h-full w-[200%]">
          <Image
            src="/assets/gallery/gallery-07.jpg"
            alt={
              locale === "ar"
                ? "مدرب يقف بجانب لاعب يحمل كأس بطولة"
                : "A coach standing beside an athlete holding a championship trophy"
            }
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div ref={rightHalfRef} className="absolute inset-y-0 end-0 w-1/2 overflow-hidden">
        <div className="relative h-full w-[200%] -translate-x-1/2">
          <Image
            src="/assets/gallery/gallery-07.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 top-24 z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="04" title={locale === "ar" ? "التحوّل" : "TRANSFORMATION"} />
      </div>

      <div className="absolute inset-x-0 bottom-20 z-10 mx-auto max-w-2xl px-6 text-center sm:px-10">
        <p className="font-heading text-balance text-2xl leading-snug text-bone sm:text-3xl md:text-4xl">
          {locale === "ar" ? (
            <>
              الإنجاز ليس ما تحمله بيدك.
              <br />
              <span className="text-active">الإنجاز من يصل بعدك.</span>
            </>
          ) : (
            <>
              The achievement isn&apos;t what you hold in your hand.
              <br />
              <span className="text-active">It&apos;s who reaches it after you.</span>
            </>
          )}
        </p>
      </div>
      </div>
    </section>
  );
}
