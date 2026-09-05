"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { allRoutes } from "@/lib/routes";
import { localePath } from "@/lib/utils";

type Phase = "idle" | "covering" | "revealing" | "quick-reveal";

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionNavigate must be used within TransitionProvider");
  }
  return ctx.navigate;
}

// Both bands land inside ~0.9-1.1s total — cinematic and legible without
// ever feeling slow or laggy.
const COVER_S = 0.42;
const REVEAL_S = 0.5;
const QUICK_S = 0.26;
const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function TransitionProvider({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Warm every primary route's RSC payload well ahead of any click, so a
  // real navigation resolves near-instantly once the cover finishes —
  // this is what actually prevents the transition from ever having to
  // "wait" on the next page or its images.
  useEffect(() => {
    for (const route of allRoutes) {
      router.prefetch(localePath(locale, `/${route.path}`));
    }
  }, [router, locale]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (reducedMotion) {
        router.push(href);
        return;
      }
      pendingHref.current = href;
      setPhase("covering");
    },
    [pathname, router, reducedMotion]
  );

  // The route actually changed (via our covering navigate(), the browser's
  // Back/Forward, or a plain anchor) — adjusted during render, React's own
  // pattern for resetting state on a prop change, rather than in an effect.
  // `prevPathname` starts equal to `pathname`, so this never fires on the
  // very first render.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setPhase(phase === "covering" ? "revealing" : "quick-reveal");
  }

  useEffect(() => {
    // Refs are read/written here rather than during the render above,
    // since effects (not render) are the right place to touch ref values.
    pendingHref.current = null;
  }, [pathname]);

  useEffect(() => {
    if (phase !== "covering") return;
    const timer = setTimeout(() => {
      if (pendingHref.current) {
        router.push(pendingHref.current);
      }
    }, COVER_S * 1000);
    return () => clearTimeout(timer);
  }, [phase, router]);

  useEffect(() => {
    if (phase !== "revealing" && phase !== "quick-reveal") return;
    const duration = phase === "revealing" ? REVEAL_S : QUICK_S;
    const t = setTimeout(() => setPhase("idle"), duration * 1000);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <TransitionOverlay phase={phase} />
    </TransitionContext.Provider>
  );
}

function TransitionOverlay({ phase }: { phase: Phase }) {
  const covering = phase === "covering";
  const duration = phase === "covering" ? COVER_S : phase === "quick-reveal" ? QUICK_S : REVEAL_S;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] bg-obsidian"
      initial={false}
      animate={{ clipPath: covering ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }}
      transition={{ duration, ease: EASE }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(178,15,32,0.22),transparent_62%)]" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: covering ? 1 : 0 }}
        transition={{ duration: 0.2, delay: covering ? 0.14 : 0 }}
      >
        <div className="relative h-28 w-28 xs:h-32 xs:w-32" style={{ filter: "drop-shadow(0 0 20px rgba(178,15,32,0.4))" }}>
          <motion.div
            className="relative h-full w-full"
            initial={false}
            animate={{ clipPath: covering ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
            transition={{ duration: 0.34, delay: 0.04, ease: "easeOut" }}
          >
            <Image src="/assets/logo/logo-mark.png" alt="" fill sizes="128px" className="object-contain" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
