"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/config";

const SESSION_KEY = "salihy-intro-seen";
const MAX_LIFETIME_MS = 3500;

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

    const skipTimer = setTimeout(() => setShowSkip(true), 500);
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
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-40 w-40 xs:h-48 xs:w-48 sm:h-56 sm:w-56"
          >
            <Image
              src="/assets/logo/logo-mark.png"
              alt=""
              fill
              sizes="224px"
              priority
              className="object-contain"
            />
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/logo/logo.png"
                alt=""
                fill
                sizes="224px"
                priority
                className="object-contain"
              />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, delay: 0.9, times: [0, 0.5, 1] }}
              style={{ mixBlendMode: "overlay" }}
            >
              <motion.div
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 0.9, delay: 0.9, ease: "easeInOut" }}
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-bone/70 to-transparent"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="font-heading mt-6 text-3xl tracking-[0.35em] text-bone xs:text-4xl sm:text-5xl"
          >
            {locale === "ar" ? "صالحي" : "SALIHY"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.35 }}
            className="mt-2 text-[10px] tracking-[0.5em] text-steel xs:text-xs"
          >
            {locale === "ar" ? "أكاديمية الكيوكوشنكاي" : "KYOKUSHIN ACADEMY"}
          </motion.p>
        </div>

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
              {locale === "ar" ? "تخطي المقدمة" : "SKIP INTRO"}
            </motion.button>
          )}
        </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
