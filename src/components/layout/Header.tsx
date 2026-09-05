"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { primaryRoutes, programRoutes } from "@/lib/routes";
import { t, localePath, swapLocaleInPath } from "@/lib/utils";
import { INSTAGRAM_URL, buildWhatsappLink, WHATSAPP_ENABLED } from "@/data/site";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the menu when the route changes — adjusted during render (the
  // React-recommended way to reset state on a prop change) instead of an
  // effect, so it never causes an extra render pass.
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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const langHref = swapLocaleInPath(pathname, otherLocale);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-transform duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
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
              <span
                className={`block h-px w-6 bg-bone transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-6 bg-bone transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`block h-px w-6 bg-bone transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[70] bg-obsidian"
          >
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6 pb-10 pt-28 sm:px-10">
              <nav className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
                <ul className="space-y-1">
                  {primaryRoutes.map((route, i) => (
                    <motion.li
                      key={route.path}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.04, duration: 0.5 }}
                      onMouseEnter={() => setActivePreview(route.preview)}
                      onMouseLeave={() => setActivePreview(null)}
                    >
                      <TransitionLink
                        href={localePath(locale, `/${route.path}`)}
                        className="group flex items-baseline gap-4 border-b border-bone/10 py-3 transition-colors hover:border-active"
                        data-cursor-hover
                      >
                        <span className="font-heading text-xs text-steel">{route.number}</span>
                        <span className="font-heading text-2xl text-bone transition-colors group-hover:text-active sm:text-3xl">
                          {t(locale, route.label)}
                        </span>
                      </TransitionLink>
                    </motion.li>
                  ))}
                </ul>

                <div className="hidden md:block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      {activePreview ? (
                        <motion.div
                          key={activePreview}
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="absolute inset-0"
                        >
                          <Image src={activePreview} alt="" fill sizes="400px" className="object-cover" />
                        </motion.div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
                          <Image
                            src="/assets/logo/logo-mark.png"
                            alt=""
                            width={160}
                            height={160}
                            className="opacity-40"
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
                    {programRoutes.map((route) => (
                      <li key={route.path}>
                        <TransitionLink
                          href={localePath(locale, `/${route.path}`)}
                          className="block py-1 text-sm text-steel transition-colors hover:text-bone"
                          data-cursor-hover
                        >
                          {t(locale, route.label)}
                        </TransitionLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-bone/10 pt-6 text-xs tracking-[0.2em] text-steel">
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
                <TransitionLink href={localePath(locale, "/contact")} className="hover:text-bone" data-cursor-hover>
                  {dict.nav.contact.toUpperCase()}
                </TransitionLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
