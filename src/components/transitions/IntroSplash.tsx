"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { Locale } from "@/i18n/config";

const SESSION_KEY = "salihy-intro-seen";
// Total on-screen time, start to auto-dismiss: ~2s, well inside the
// 1.8-2.2s window. The logo itself is visible at full opacity from the
// very first frame — only its scale settles in and a light sweep passes
// over it, never a fade-from-black.
const TOTAL_MS = 2000;

export function IntroSplash({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [showSkip, setShowSkip] = useState(false);
  const reducedMotion = useReducedMotionSafe();

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
    const dismissMs = reducedMotion ? 0 : TOTAL_MS;
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
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(178,15,32,0.16),transparent_60%)]" />

          {/* The logo is opaque from the very first frame — only its scale
              settles in, never a fade-from-black. */}
          <motion.div
            initial={{ scale: 0.88 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-40 w-40 xs:h-48 xs:w-48 sm:h-56 sm:w-56"
            style={{ filter: "drop-shadow(0 0 26px rgba(178,15,32,0.4))" }}
          >
            <Image src="/assets/logo/logo-full.png" alt="" fill sizes="224px" priority className="object-contain" />

            {!reducedMotion && (
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
                style={{
                  WebkitMaskImage: `url(/assets/logo/logo-full.png)`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: `url(/assets/logo/logo-full.png)`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              >
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-bone/70 to-transparent"
                />
              </div>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mt-6 text-[10px] tracking-[0.5em] text-steel xs:text-xs"
          >
            {locale === "ar" ? "أكاديمية الكيوكوشنكاي" : "KYOKUSHIN ACADEMY"}
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
                {locale === "ar" ? "تخطي المقدمة" : "SKIP INTRO"}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
