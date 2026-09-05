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
import { allRoutes } from "@/lib/routes";
import { localePath } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { ensureGsap, ScrollTrigger } from "@/lib/gsapConfig";

type Phase = "idle" | "sweeping" | "settling";

type TransitionContextValue = {
  navigate: (href: string) => void;
  phase: Phase;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionNavigate must be used within TransitionProvider");
  }
  return ctx.navigate;
}

// The decorative sweep is a fixed-duration flourish, entirely decoupled from
// how long the actual navigation takes. It never blocks on the network: if
// the destination is slow, the sweep finishes on its own schedule and
// whatever Next has ready (or its own themed loading state) simply shows
// through — there is no failure mode where this holds a static full-colour
// screen indefinitely.
const SWEEP_MS = 460;
const SETTLE_MS = 260;
const QUICK_MS = 200;

export function TransitionProvider({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clickDriven = useRef(false);
  const isFirstRender = useRef(true);

  // Warm every primary route's RSC payload well ahead of any click, so a
  // real navigation resolves near-instantly once it happens — this is what
  // actually prevents the transition from ever having to "wait".
  useEffect(() => {
    ensureGsap();
    for (const route of allRoutes) {
      router.prefetch(localePath(locale, `/${route.path}`));
    }
  }, [router, locale]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (reducedMotion) {
        router.push(href);
        return;
      }
      clearTimers();
      clickDriven.current = true;
      setPhase("sweeping");
      // Tear down every pinned/scrubbed ScrollTrigger before React starts
      // unmounting the outgoing page — GSAP reparents pinned elements into
      // "pin-spacer" wrappers outside React's own bookkeeping, so leaving
      // one alive during unmount races React's own DOM removal and throws.
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      router.push(href);
      timers.current.push(
        setTimeout(() => setPhase("settling"), SWEEP_MS),
        setTimeout(() => {
          clickDriven.current = false;
          setPhase("idle");
        }, SWEEP_MS + SETTLE_MS)
      );
    },
    [pathname, router, reducedMotion, clearTimers]
  );

  // The route actually changed via Back/Forward or a plain anchor (not our
  // own navigate(), which already owns its own phase timeline above). Refs
  // can only be read in effects/handlers, never during render, so this has
  // to run post-commit rather than the more direct render-time prop-sync
  // pattern; the mounted-flag ref keeps it from also firing on first paint.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!clickDriven.current) {
      setPhase("settling");
    }
  }, [pathname]);

  useEffect(() => {
    if (phase !== "settling" || clickDriven.current) return;
    const t = setTimeout(() => setPhase("idle"), QUICK_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <TransitionContext.Provider value={{ navigate, phase }}>
      {children}
      <TransitionOverlay phase={phase} />
    </TransitionContext.Provider>
  );
}

// The transition's brightness dip must apply only to the scrollable page
// content, never to the fixed header/menu around it: a CSS `filter` other
// than `none` establishes a containing block for `position: fixed`
// descendants, which would silently turn the header (and the menu's
// fixed scrim/panel) into elements positioned relative to this wrapper
// instead of the viewport — they'd drift away with scroll instead of
// staying pinned. Scoping the filter to just `<main>` keeps the blast
// radius to the page content, where nothing needs to stay viewport-fixed
// for longer than the ~200ms the dip lasts.
export function TransitionViewport({ children }: { children: React.ReactNode }) {
  const ctx = useContext(TransitionContext);
  const phase = ctx?.phase ?? "idle";
  return (
    <main
      id="page-viewport"
      className="relative transition-[filter] duration-200 ease-out"
      style={{ filter: phase === "sweeping" ? "brightness(0.62)" : "none" }}
    >
      {children}
    </main>
  );
}

function TransitionOverlay({ phase }: { phase: Phase }) {
  if (phase !== "sweeping") return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <motion.div
        className="absolute inset-y-0 bg-active"
        style={{ width: "46vw", skewX: -14 }}
        initial={{ x: "-60vw", opacity: 0.95 }}
        animate={{ x: "150vw" }}
        transition={{ duration: SWEEP_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 bg-bone/90"
        style={{ width: "3px", skewX: -14 }}
        initial={{ x: "-60vw" }}
        animate={{ x: "150vw" }}
        transition={{ duration: SWEEP_MS / 1000, ease: [0.65, 0, 0.35, 1], delay: 0.02 }}
      />
    </div>
  );
}
