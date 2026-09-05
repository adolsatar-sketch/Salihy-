"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import { faqItems } from "@/data/faq";

export function FaqAccordion({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-bone/10 border-y border-bone/10">
      {faqItems.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-start"
              aria-expanded={isOpen}
              data-cursor-hover
            >
              <span className="font-heading text-base text-bone sm:text-lg">{t(locale, item.question)}</span>
              <span className={`shrink-0 text-xl text-steel transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-sm leading-relaxed text-steel sm:text-base">{t(locale, item.answer)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
