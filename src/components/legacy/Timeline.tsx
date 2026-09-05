"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import { careerTimeline } from "@/data/coach";

export function Timeline({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.2", "end 0.8"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl px-6 sm:px-10">
      <div className="absolute start-6 top-0 bottom-0 w-px bg-bone/10 sm:start-8" aria-hidden="true">
        <motion.div
          className="absolute inset-0 w-px bg-active"
          style={{ scaleY: progress, transformOrigin: "top" }}
        />
      </div>

      <ol className="space-y-16 sm:space-y-24">
        {careerTimeline.map((milestone, i) => (
          <TimelineItem key={i} milestone={milestone} locale={locale} index={i} />
        ))}
      </ol>
    </div>
  );
}

function TimelineItem({
  milestone,
  locale,
  index,
}: {
  milestone: (typeof careerTimeline)[number];
  locale: Locale;
  index: number;
}) {
  return (
    <motion.li
      className="relative ps-16 sm:ps-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.6, delay: 0.05 }}
    >
      <span className="absolute start-[19px] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-active bg-obsidian rtl:translate-x-1/2 sm:start-[27px]" />
      <p className="font-heading text-xs tracking-[0.3em] text-gold">
        {String(index + 1).padStart(2, "0")} — {milestone.year}
      </p>
      <h3 className="font-heading mt-3 text-2xl text-bone sm:text-3xl">{t(locale, milestone.title)}</h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel sm:text-base">
        {t(locale, milestone.description)}
      </p>
      {milestone.image && (
        <div className="relative mt-6 aspect-[16/10] w-full max-w-md overflow-hidden">
          <Image src={milestone.image} alt={t(locale, milestone.title)} fill sizes="(min-width: 640px) 420px, 90vw" className="object-cover" />
        </div>
      )}
    </motion.li>
  );
}
