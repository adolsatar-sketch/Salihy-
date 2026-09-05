"use client";

import { useSyncExternalStore } from "react";

// A `useSyncExternalStore`-based media query hook: matchMedia is an external
// store, and this is exactly the API React provides for subscribing to one
// without ever calling `setState` inside an effect body ourselves.
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
