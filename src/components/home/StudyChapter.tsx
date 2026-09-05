"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { BrandMark } from "@/components/motion/BrandMark";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { getDictionary } from "@/i18n/dictionaries";
import { t, localePath } from "@/lib/utils";
import { studyProgramCopy, studyPathItems, studyGrades, type StudyGrade } from "@/data/studyProgram";

// The Dual Path: one school-notebook-ruled line (study) and one
// belt-gradient line (training) draw themselves in as the section scrolls
// into view, both carrying the same six confirmed grades as stations, and
// meet at a single connector on the right — "two paths, one future". Pure
// scroll-linked SVG/CSS, no pinning, no video, no stock imagery.
export function StudyChapter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 90%", "end 60%"] });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-charcoal/92 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="06" title={t(locale, studyProgramCopy.eyebrow)} />
        <p className="mt-3 font-heading text-xs tracking-[0.3em] text-steel/60">{t(locale, studyProgramCopy.chapterTitle)}</p>

        <Reveal className="mt-6 max-w-2xl">
          <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {t(locale, studyProgramCopy.headline)}
          </h2>
          <p className="mt-4 text-lg text-active">{t(locale, studyProgramCopy.supportingLine)}</p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-steel sm:text-base">{t(locale, studyProgramCopy.body)}</p>
        </Reveal>

        <DualPath locale={locale} scrollYProgress={scrollYProgress} />

        <div className="mt-14 grid gap-8 sm:mt-20 sm:grid-cols-3">
          {studyPathItems.map((item) => (
            <Reveal key={item.key}>
              <p className="font-heading text-xs tracking-[0.3em] text-active">{t(locale, item.label)}</p>
              <p className="mt-2 text-sm leading-relaxed text-steel">{t(locale, item.description)}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16 text-center sm:mt-20">
          <p className="font-heading text-balance text-xl text-bone sm:text-2xl">{t(locale, studyProgramCopy.closingLine)}</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href={localePath(locale, "/registration")} variant="primary">
              {dict.common.bookTrial}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DualPath({ locale, scrollYProgress }: { locale: Locale; scrollYProgress: MotionValue<number> }) {
  const reduceMotion = useReducedMotionSafe();
  const draw = useTransform(scrollYProgress, [0, 0.75], [0, 1]);
  const connectorOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const mobileMaskScale = useTransform(draw, (v) => 1 - v);

  return (
    <div className="relative mt-16 sm:mt-24">
      {/* Desktop: two parallel horizontal lines meeting in a connector on the end side. */}
      <div className="relative hidden h-56 sm:block">
        <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="study-belt-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-charcoal)" />
              <stop offset="55%" stopColor="var(--color-blood)" />
              <stop offset="100%" stopColor="var(--color-active)" />
            </linearGradient>
          </defs>

          {/* Faint notebook ruling behind the study line only. */}
          <line x1="50" y1="35" x2="1150" y2="35" stroke="var(--color-bone)" strokeOpacity="0.07" strokeWidth="1" />
          <line x1="50" y1="75" x2="1150" y2="75" stroke="var(--color-bone)" strokeOpacity="0.07" strokeWidth="1" />

          <motion.line
            x1="50"
            y1="55"
            x2="1150"
            y2="55"
            stroke="var(--color-bone)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeDasharray="2 10"
            strokeLinecap="round"
            style={{ pathLength: reduceMotion ? 1 : draw }}
          />
          <motion.line
            x1="50"
            y1="165"
            x2="1150"
            y2="165"
            stroke="url(#study-belt-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength: reduceMotion ? 1 : draw }}
          />
          <motion.line
            x1="1150"
            y1="55"
            x2="1150"
            y2="165"
            stroke="var(--color-active)"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            style={{ opacity: reduceMotion ? 1 : connectorOpacity }}
          />
        </svg>

        {/* A faint watermark on the training side only, reusing the existing emblem asset. */}
        <BrandMark
          variant="emblem"
          maxOpacity={0.05}
          parallax={4}
          className="absolute bottom-0 end-[10%] h-24 w-24"
        />

        <div className="absolute inset-x-[4%] top-[10%] flex justify-between">
          {studyGrades.map((grade, i) => (
            <GradeStation key={grade.number} grade={grade} index={i} scrollYProgress={scrollYProgress} locale={locale} reduceMotion={reduceMotion} tone="study" />
          ))}
        </div>
        <div className="absolute inset-x-[4%] bottom-[4%] flex justify-between">
          {studyGrades.map((grade, i) => (
            <GradeStation key={grade.number} grade={grade} index={i} scrollYProgress={scrollYProgress} locale={locale} reduceMotion={reduceMotion} tone="training" />
          ))}
        </div>
      </div>

      {/* Mobile: a single vertical path — the two lines already merged. */}
      <div className="relative flex gap-5 sm:hidden">
        <div className="relative w-[3px] shrink-0 self-stretch overflow-hidden rounded-full bg-bone/15">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, var(--color-bone) 0%, var(--color-blood) 55%, var(--color-active) 100%)" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 origin-bottom bg-charcoal"
            style={{ scaleY: reduceMotion ? 0 : mobileMaskScale }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-8 py-1">
          {studyGrades.map((grade, i) => (
            <GradeStationRow key={grade.number} grade={grade} index={i} scrollYProgress={scrollYProgress} locale={locale} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GradeStation({
  grade,
  index,
  scrollYProgress,
  locale,
  reduceMotion,
  tone,
}: {
  grade: StudyGrade;
  index: number;
  scrollYProgress: MotionValue<number>;
  locale: Locale;
  reduceMotion: boolean;
  tone: "study" | "training";
}) {
  const start = (index / studyGrades.length) * 0.7;
  const end = start + 0.08;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [tone === "study" ? -8 : 8, 0]);

  return (
    <motion.div
      style={reduceMotion ? { opacity: 1 } : { opacity, y }}
      className={`flex flex-col items-center gap-1 text-center ${tone === "study" ? "" : "flex-col-reverse"}`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${tone === "study" ? "bg-bone/70" : "bg-active"}`}
        aria-hidden="true"
      />
      <span className="font-heading text-[10px] text-steel/80">{grade.number}</span>
      {tone === "training" && <span className="max-w-[5.5rem] text-[10px] leading-tight text-steel">{t(locale, grade.label)}</span>}
    </motion.div>
  );
}

function GradeStationRow({
  grade,
  index,
  scrollYProgress,
  locale,
  reduceMotion,
}: {
  grade: StudyGrade;
  index: number;
  scrollYProgress: MotionValue<number>;
  locale: Locale;
  reduceMotion: boolean;
}) {
  const start = (index / studyGrades.length) * 0.7;
  const end = start + 0.08;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const x = useTransform(scrollYProgress, [start, end], [-8, 0]);

  return (
    <motion.div style={reduceMotion ? { opacity: 1 } : { opacity, x }} className="flex items-center gap-3">
      <span className="font-heading text-xs text-steel/80">{grade.number}</span>
      <span className="text-sm text-bone">{t(locale, grade.label)}</span>
    </motion.div>
  );
}
