"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/config";

const SESSION_KEY = "salihy-intro-seen";
const MAX_LIFETIME_MS = 1900;

export function IntroSplash({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [showSkip, setShowSkip] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Deliberately deferred to an effect: reading sessionStorage during the
    // initial render would differ between the server pass (no storage) and
    // the client's hydration pass, causing a hydration mismatch. Staying at
    // `null` through hydration and resolving right after keeps first paint
    // identical on both, and the intro-pending CSS on <html> (set by the
    // inline boot script) already hides content in the meantime.
    let seen = true;
    try {
      seen = Boolean(sessionStorage.getItem(SESSION_KEY));
    } catch {
      seen = true;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!seen);
  }, []);

  useEffect(() => {
    if (visible !== true) return;
    document.documentElement.dataset.intro = "pending";

    const skipTimer = setTimeout(() => setShowSkip(true), 350);
    const dismissMs = reducedMotion ? 0 : MAX_LIFETIME_MS;
    const dismissTimer = setTimeout(() => finish(), dismissMs);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(dismissTimer);
    };
  }, [visible, reducedMotion]);

  function finish() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    document.documentElement.dataset.intro = "done";
    setVisible(false);
  }

  if (visible === null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          role="presentation"
          aria-hidden="true"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-obsidian"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div className="relative flex h-40 w-40 items-center justify-center xs:h-48 xs:w-48">
            {/* 1 — the breath: a thin line grows from nothing */}
            <motion.div
              className="absolute h-px w-24 bg-bone xs:w-28"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.3, 0.75, 1], ease: "easeOut" }}
            />

            {/* 2 — the incomplete ring, present but never quite closed */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                WebkitMaskImage: "conic-gradient(#000 0deg 300deg, transparent 300deg 360deg)",
                maskImage: "conic-gradient(#000 0deg 300deg, transparent 300deg 360deg)",
              }}
            >
              <Image src="/assets/logo/logo-mark.png" alt="" fill sizes="192px" className="object-contain" priority />
            </motion.div>

            {/* 3 — a fraction-of-a-second flash of a real fight frame inside the ring */}
            <motion.div
              className="absolute inset-[22%] overflow-hidden rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.85, 0] }}
              transition={{ duration: 0.85, delay: 0.55, times: [0, 0.35, 0.55, 0.75], ease: "easeInOut" }}
            >
              <Image
                src="/assets/gallery/gallery-10.jpg"
                alt=""
                fill
                sizes="120px"
                className="object-cover"
                priority
              />
            </motion.div>

            {/* 4 — the dragon resolves into view */}
            <motion.div
              className="absolute inset-[12%]"
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.62, ease: "easeOut" }}
            >
              <Image src="/assets/logo/logo.png" alt="" fill sizes="150px" className="object-contain" priority />
            </motion.div>
          </div>

          {/* 5 — the line releases outward, becoming the belt the Hero picks up */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2 bg-bone/70"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: ["0%", "0%", "42vw"], opacity: [0, 0, 1] }}
            transition={{ duration: 0.55, delay: 0.98, times: [0, 0.5, 1], ease: [0.65, 0, 0.35, 1] }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: 0.85, delay: 0.95, times: [0, 0.3, 0.75, 1] }}
            className="font-heading absolute bottom-[38%] text-2xl tracking-[0.35em] text-bone xs:text-3xl"
          >
            {locale === "ar" ? "صالحي" : "SALIHY"}
          </motion.p>

          <AnimatePresence>
            {showSkip && (
              <motion.button
                type="button"
                onClick={finish}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-8 end-8 text-xs tracking-[0.2em] text-steel underline-offset-4 hover:text-bone hover:underline"
              >
                {locale === "ar" ? "تخطي" : "SKIP"}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
