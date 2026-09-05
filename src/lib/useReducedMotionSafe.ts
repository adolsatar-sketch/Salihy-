"use client";

import { useEffect, useState } from "react";
import { useReducedMotion as useReducedMotionUpstream } from "framer-motion";

/**
 * Framer Motion's own `useReducedMotion()` reads the OS preference
 * synchronously on the client's very first render — by design, so even the
 * first frame respects it. But the server always renders assuming `false`,
 * since there's no `window` there. Any component whose rendered DOM
 * structure or inline styles branch on the value then genuinely mismatches
 * between server and client on hydration whenever a visitor's OS has
 * Reduced Motion on — a real React hydration error, not a false alarm.
 *
 * This wrapper holds the value at `false` (matching SSR) until just after
 * mount, then reveals the real value. Hydration always matches; the true
 * preference still takes effect within one paint of mount.
 */
export function useReducedMotionSafe(): boolean {
  const upstream = useReducedMotionUpstream();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration gate, not a render loop
    setMounted(true);
  }, []);

  return mounted ? Boolean(upstream) : false;
}
