"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { KineticBelt } from "@/components/motion/KineticBelt";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { primaryRoutes, programRoutes } from "@/lib/routes";
import { t, localePath, swapLocaleInPath } from "@/lib/utils";
import { INSTAGRAM_URL, WHATSAPP_ENABLED, buildWhatsappLink } from "@/data/site";
import { useVisitedRoutes } from "@/lib/useVisitedRoutes";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { hasLenisInstance, startLenisScroll, stopLenisScroll } from "@/lib/lenisSingleton";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > lastY && y > 160);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);

    // Prefer pausing Lenis itself over `overflow: hidden` on <body>: toggling
    // that while Lenis is running changes the viewport (the scrollbar
    // disappears) mid-flight, which was observed making Lenis recompute its
    // scroll limits and snap the page back near the top. `lenis.stop()`
    // already fully blocks wheel-driven scroll, so it doesn't need help from
    // overflow on desktop; touch devices have no Lenis instance at all, so
    // overflow-hidden remains the only (and safe) way to lock scroll there.
    if (hasLenisInstance()) {
      if (menuOpen) stopLenisScroll();
      else startLenisScroll();
    } else {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }

    return () => {
      document.documentElement.classList.remove("menu-open");
      if (hasLenisInstance()) startLenisScroll();
      else document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const langHref = swapLocaleInPath(pathname, otherLocale);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-transform duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`flex items-center justify-between px-5 py-4 transition-colors duration-500 sm:px-8 ${
            solid || menuOpen ? "bg-obsidian/85 backdrop-blur-sm" : "bg-transparent"
          }`}
        >
          <TransitionLink href={localePath(locale, "/")} className="relative z-10 flex items-center gap-2" data-cursor-hover>
            <span className="relative h-9 w-9 sm:h-10 sm:w-10">
              <Image src="/assets/logo/logo.png" alt={dict.meta.siteName} fill sizes="40px" className="object-contain" priority />
            </span>
            <span className="font-heading hidden text-sm tracking-[0.3em] text-bone xs:inline">SALIHY</span>
          </TransitionLink>

          <div className="flex items-center gap-3 sm:gap-5">
            <TransitionLink
              href={langHref}
              className="font-heading text-xs tracking-[0.25em] text-bone/80 transition-colors hover:text-bone"
              data-cursor-hover
              aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              {dict.nav.language}
            </TransitionLink>

            <TransitionLink
              href={localePath(locale, "/registration")}
              className="hidden border border-bone/30 px-4 py-2 text-xs tracking-[0.2em] text-bone transition-colors hover:border-active hover:bg-active sm:inline-block"
              data-cursor-hover
            >
              {dict.common.register}
            </TransitionLink>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
              data-cursor-hover
            >
              <span className={`block h-px w-6 bg-bone transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-bone transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-px w-6 bg-bone transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <DojoMap locale={locale} pathname={pathname} onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}

function DojoMap({ locale, pathname, onClose }: { locale: Locale; pathname: string; onClose: () => void }) {
  const dict = getDictionary(locale);
  const visited = useVisitedRoutes();
  const [preview, setPreview] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const sideOffset = locale === "ar" ? "-100%" : "100%";
  const closedTransform = isDesktop ? { x: sideOffset, y: 0 } : { x: 0, y: "100%" };

  return (
    <>
      {/* Scrim over whatever remains visible of the compressed page */}
      <motion.button
        type="button"
        aria-label={dict.nav.close}
        onClick={onClose}
        className="fixed inset-0 z-[65] bg-obsidian/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Live preview, desktop only — sits behind the panel */}
      <div className="pointer-events-none fixed inset-y-0 start-0 end-[26rem] z-[66] hidden items-center justify-center lg:flex">
        <AnimatePresence mode="wait">
          {preview && (
            <motion.div
              key={preview}
              className="relative aspect-[3/4] w-[26vw] max-w-md overflow-hidden rounded-sm"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.9, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Image src={preview} alt="" fill sizes="26vw" className="object-cover" />
              <div className="absolute inset-0 bg-obsidian/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        role="dialog"
        aria-modal="true"
        initial={closedTransform}
        animate={{ x: 0, y: 0 }}
        exit={closedTransform}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        className="fixed inset-x-0 bottom-0 z-[70] flex h-[88dvh] flex-col rounded-t-2xl bg-obsidian sm:inset-y-0 sm:end-0 sm:bottom-auto sm:h-auto sm:w-[26rem] sm:rounded-none sm:border-s sm:border-bone/10"
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-bone/25" />
        </div>
        <div className="flex items-center justify-between px-6 pt-4 sm:pt-6 sm:px-8">
          <span className="font-heading text-xs tracking-[0.4em] text-steel">
            {locale === "ar" ? "خريطة الدوجو" : "DOJO MAP"}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.nav.close}
            className="flex h-9 w-9 items-center justify-center text-bone"
            data-cursor-hover
          >
            ✕
          </button>
        </div>

        <nav className="relative mt-6 flex-1 overflow-y-auto px-6 pb-6 sm:px-8">
          <div className="relative ps-6">
            <KineticBelt
              d="M2 0 L2 100"
              viewBox="0 0 4 100"
              strokeWidth={1.4}
              className="absolute inset-y-0 start-0 h-full w-1 text-bone/25"
              showCrease={false}
            />
            <ul>
              {primaryRoutes.map((route, i) => {
                const href = localePath(locale, `/${route.path}`);
                const isCurrent = pathname === href;
                const isVisited = visited.has(href);
                return (
                  <motion.li
                    key={route.path}
                    initial={{ opacity: 0, x: locale === "ar" ? -12 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.03, duration: 0.4 }}
                    onMouseEnter={() => setPreview(route.preview)}
                    onMouseLeave={() => setPreview(null)}
                  >
                    <TransitionLink
                      href={href}
                      className="group flex items-center gap-4 py-3"
                      data-cursor-hover
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          isCurrent ? "bg-active" : isVisited ? "bg-bone/50" : "bg-bone/15"
                        }`}
                      />
                      <span className="font-heading text-[10px] text-steel">{route.number}</span>
                      <span
                        className={`font-heading text-xl transition-colors sm:text-2xl ${
                          isCurrent ? "text-active" : "text-bone group-hover:text-active"
                        }`}
                      >
                        {t(locale, route.label)}
                      </span>
                    </TransitionLink>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-1 border-t border-bone/10 pt-6">
            {programRoutes.map((route) => (
              <TransitionLink
                key={route.path}
                href={localePath(locale, `/${route.path}`)}
                className="py-1.5 text-sm text-steel transition-colors hover:text-bone"
                data-cursor-hover
              >
                {t(locale, route.label)}
              </TransitionLink>
            ))}
          </div>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 px-6 py-6 sm:px-8">
          <div className="flex gap-5 text-xs tracking-[0.15em] text-steel">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-bone" data-cursor-hover>
              INSTAGRAM
            </a>
            {WHATSAPP_ENABLED && (
              <a
                href={buildWhatsappLink(locale === "ar" ? "السلام عليكم" : "Hello")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bone"
                data-cursor-hover
              >
                WHATSAPP
              </a>
            )}
          </div>
          <TransitionLink
            href={localePath(locale, "/registration")}
            className="border border-active bg-active px-5 py-2.5 text-xs tracking-[0.2em] text-bone transition-colors hover:bg-blood"
            data-cursor-hover
          >
            {dict.common.register}
          </TransitionLink>
        </div>
      </motion.div>
    </>
  );
}
