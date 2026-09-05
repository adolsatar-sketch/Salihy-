"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function FighterChapter({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);

  return (
    <section className="relative bg-obsidian/92 py-24 sm:py-32">
      <div className="mx-auto mb-12 max-w-6xl px-6 sm:px-10">
        <SectionLabel number="02" title={locale === "ar" ? "المقاتل" : "THE FIGHTER"} />
        <Reveal className="mt-6">
          <h2 className="font-heading text-balance max-w-2xl text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar"
              ? "قبل التدريب… كان القتال"
              : "Before the coaching, there was the fight"}
          </h2>
        </Reveal>
      </div>

      <div ref={ref} className="relative h-[70vh] w-full overflow-hidden sm:h-[85vh]">
        <motion.div style={{ scale }} className="absolute inset-0">
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
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
        <div className="absolute bottom-6 start-6 font-heading text-[10px] tracking-[0.3em] text-bone/70 sm:bottom-10 sm:start-10">
          {locale === "ar" ? "الحلبة، قبل الحزام الأسود" : "THE RING, BEFORE THE BLACK BELT"}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="max-w-xl text-sm leading-relaxed text-steel sm:text-base">
            {locale === "ar"
              ? "الركلات، النزالات، القاعات، الزملاء في التدريب — كل تفصيل شكّل أسلوبًا قتاليًا لم يولد من كتاب، بل من التكرار والاحتكاك المباشر."
              : "The kicks, the sparring, the halls, the training partners — every detail forged a fighting style born not from a book, but from repetition and full-contact experience."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
