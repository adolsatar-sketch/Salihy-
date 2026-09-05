"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { KineticBelt } from "@/components/motion/KineticBelt";
import { ensureGsap, gsap } from "@/lib/gsapConfig";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { HeroActionZone } from "./HeroActionZone";

export function HeroChapter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  // Framer Motion's own `useReducedMotion` resolves the media query eagerly
  // enough on the client that, for a visitor whose OS actually has reduced
  // motion on, its first-render value can already differ from the server's
  // (which always assumes not-reduced) — a real hydration mismatch, not a
  // theoretical one. This is only safe to read during render because it's
  // backed by `useSyncExternalStore` with an explicit server snapshot, which
  // React guarantees agrees with the server on the hydration pass.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const sectionRef = useRef<HTMLDivElement>(null);
  const beltRef = useRef<SVGPathElement>(null);
  const beltContainerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const afterimageRef = useRef<HTMLDivElement>(null);
  const [afterimageFired, setAfterimageFired] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      const belt = beltRef.current;
      const crease = beltContainerRef.current?.querySelector<SVGPathElement>("[data-belt-crease]") ?? null;
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      if (!belt || !line1 || !line2) return;

      const beltNodes = [belt, crease].filter(Boolean) as SVGPathElement[];
      gsap.set(beltNodes, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(line2, { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=70%",
          scrub: 0.4,
        },
      });

      tl.to(beltNodes, { strokeDashoffset: 0, ease: "none" }, 0)
        .to(line1, { autoAlpha: 0, y: -18, ease: "power1.in" }, 0.15)
        .to(line2, { autoAlpha: 1, y: 0, ease: "power1.out" }, 0.28);
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || afterimageFired) return;
    function onScroll() {
      if (window.scrollY > 30 && !afterimageFired) {
        setAfterimageFired(true);
        window.removeEventListener("scroll", onScroll);
        if (afterimageRef.current) {
          gsap.fromTo(
            afterimageRef.current,
            { autoAlpha: 0.55, x: 0 },
            { autoAlpha: 0, x: 24, duration: 0.6, ease: "power2.out" }
          );
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, afterimageFired]);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] min-h-[560px] overflow-hidden bg-charcoal">
      {/* fabric-like base texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #F2EFE8 0px, #F2EFE8 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div className="absolute inset-0 flex justify-end xs:justify-center sm:justify-end">
        <div
          className="relative h-full w-[78%] xs:w-[62%] sm:w-[52%]"
          style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          <Image
            src="/assets/gallery/gallery-03.jpg"
            alt={
              locale === "ar"
                ? "لاعب كيوكوشنكاي ينفذ ركلة عالية داخل صالة تدريب"
                : "A Kyokushin fighter executing a high kick inside the training hall"
            }
            fill
            priority
            sizes="(min-width: 640px) 52vw, 78vw"
            className="object-cover object-[65%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-transparent" />
        </div>

        {!reducedMotion && (
          <div
            ref={afterimageRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden xs:block"
            style={{ opacity: 0, clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)" }}
          >
            <Image
              src="/assets/gallery/gallery-10.jpg"
              alt=""
              fill
              sizes="52vw"
              className="object-cover object-[50%_25%] mix-blend-screen"
            />
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute -start-1/4 top-1/3 h-[55vh] w-[55vh] rounded-full bg-blood/25"
        style={{ filter: "blur(90px)" }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-24 pt-40 sm:px-10 sm:pb-28">
        <p className="font-heading mb-5 text-xs tracking-[0.4em] text-steel">
          {locale === "ar" ? "أكاديمية صالحي للكيوكوشنكاي" : "SALIHY KYOKUSHIN ACADEMY"}
        </p>

        <h1 className="font-heading relative h-[2.4em] text-balance text-4xl leading-[1.1] text-bone xs:text-5xl sm:text-6xl md:text-7xl">
          <span ref={line1Ref} className="absolute inset-0">
            {locale === "ar" ? "من ساحة النزال" : "FROM THE FIGHT"}
          </span>
          <span ref={line2Ref} className="absolute inset-0">
            {locale === "ar" ? "إلى صناعة أبطال الغد" : "TO THE FUTURE OF CHAMPIONS"}
          </span>
        </h1>

        <div ref={beltContainerRef} className="relative mt-8 h-6 w-full max-w-md text-bone/60">
          <KineticBelt
            ref={beltRef}
            d="M0 12 C 20 4, 40 20, 60 12 S 90 4, 100 12"
            viewBox="0 0 100 24"
            strokeWidth={1.2}
            className="h-full w-full"
            initialProgress={reducedMotion ? 1 : 0}
          />
        </div>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-steel sm:text-base">
          {locale === "ar"
            ? "تدريب احترافي، انضباط، ثقة وصناعة أبطال لجميع الأعمار."
            : "Professional training, discipline, confidence — building champions of every age."}
        </p>

        <HeroActionZone locale={locale} />
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-steel">
        <span className="h-9 w-[3px] rounded-full bg-gradient-to-b from-bone to-transparent" />
        <span className="text-[10px] tracking-[0.3em]">{dict.common.scrollDown}</span>
      </div>
    </section>
  );
}
