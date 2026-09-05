"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { localePath } from "@/lib/utils";

type Stage = {
  href: string;
  label: { ar: string; en: string };
};

// One CTA slot whose destination and label track how far into the story the
// visitor has scrolled — not three static buttons.
export function HeroActionZone({ locale }: { locale: Locale }) {
  const stages: Stage[] = [
    { href: "/legacy", label: { ar: "اكتشف المسيرة", en: "Discover the Journey" } },
    { href: "/achievements", label: { ar: "شاهد الإنجازات", en: "See the Achievements" } },
    { href: "/registration", label: { ar: "احجز حصتك الأولى", en: "Book Your First Class" } },
  ];
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setStageIndex(progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stage = stages[stageIndex];

  return (
    <div className="relative mt-10 h-14 w-64 max-w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.href}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          <TransitionLink
            href={localePath(locale, stage.href)}
            className="flex h-full w-full items-center justify-center gap-2 bg-active text-sm tracking-wide text-bone transition-colors hover:bg-blood"
            data-cursor-hover
          >
            {locale === "ar" ? stage.label.ar : stage.label.en}
          </TransitionLink>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
