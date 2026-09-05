"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { setLenisInstance } from "@/lib/lenisSingleton";

const SCROLL_KEY_PREFIX = "salihy-scroll:";

function saveScroll(pathname: string, y: number) {
  try {
    sessionStorage.setItem(SCROLL_KEY_PREFIX + pathname, String(y));
  } catch {
    /* ignore */
  }
}

function readScroll(pathname: string): number | null {
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY_PREFIX + pathname);
    return raw ? Number(raw) : null;
  } catch {
    return null;
  }
}

// One Lenis instance for the whole app lifetime (recreated around
// Back/Forward — see below). Desktop gets smoothed wheel scrolling tied
// into GSAP's ticker (the standard Lenis+ScrollTrigger integration); touch
// devices keep native scrolling untouched — smoothing touch input is a
// common source of jank on mid-range Android phones. Reduced-motion users
// get plain native scroll with no Lenis at all.
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const tickRef = useRef<((time: number) => void) | null>(null);
  const isFirstPathname = useRef(true);

  // Next's own Back/Forward scroll restoration doesn't reliably land on
  // pages built from tall, viewport-unit-sized sections like the home
  // page's scenes — it was observed settling at an unrelated position
  // (sometimes the very bottom of the document) instead of where the
  // visitor actually was. Tracking each page's own scroll position
  // ourselves and restoring it explicitly on popstate sidesteps that
  // entirely, rather than depending on the framework's heuristic.
  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        saveScroll(window.location.pathname, window.scrollY);
        raf = 0;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    ensureGsap();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    function createLenis() {
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1 });
      lenisRef.current = lenis;
      setLenisInstance(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      tickRef.current = tick;
      gsap.ticker.add(tick);
    }

    function destroyLenis() {
      if (tickRef.current) gsap.ticker.remove(tickRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      tickRef.current = null;
    }

    // Back/Forward fires this synchronously, ahead of React's own update for
    // the new route (the URL has already changed by this point, so
    // `location.pathname` already reflects the destination). Every pinned
    // ScrollTrigger must die immediately, Lenis gets torn down and rebuilt
    // once the new page has had a moment to lay itself out, and — the fix
    // for the restoration problem above — we explicitly scroll to whatever
    // position this browser last recorded for that exact path.
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const onPopState = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      destroyLenis();
      const target = readScroll(window.location.pathname);
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        if (target !== null) window.scrollTo(0, target);
        if (!prefersReduced && !isCoarsePointer) createLenis();
        requestAnimationFrame(() => ScrollTrigger.refresh());
        // Re-assert once more shortly after: if the framework's own
        // restoration attempt lands late, this makes sure ours is the one
        // that sticks.
        setTimeout(() => {
          if (target !== null) window.scrollTo(0, target);
        }, 300);
      }, 350);
    };
    window.addEventListener("popstate", onPopState);

    if (!prefersReduced && !isCoarsePointer) createLenis();

    return () => {
      window.removeEventListener("popstate", onPopState);
      clearTimeout(settleTimer);
      destroyLenis();
    };
  }, []);

  // Route changed via a push (Back/Forward is handled by the popstate
  // listener above): Next resets the browser's scroll to the top, but
  // Lenis tracks its own internal target separately from the real
  // scrollTop — left alone, it would notice the mismatch and smoothly
  // animate the page back toward wherever it was on the previous page.
  // Snapping Lenis's own state to match keeps the two in sync, and
  // refreshing ScrollTrigger throws out pinned-section math computed
  // against the old page's layout.
  useEffect(() => {
    if (isFirstPathname.current) {
      isFirstPathname.current = false;
      return;
    }
    lenisRef.current?.scrollTo(window.scrollY, { immediate: true });
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <>{children}</>;
}
