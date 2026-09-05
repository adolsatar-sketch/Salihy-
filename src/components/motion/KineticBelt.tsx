"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type KineticBeltProps = {
  /** SVG path `d` string for the belt's centerline. */
  d: string;
  viewBox?: string;
  strokeWidth?: number;
  className?: string;
  /** Static reveal amount when no scroll/JS driver is animating it (0-1). SSR-safe. */
  initialProgress?: number;
  showCrease?: boolean;
};

// The site's one recurring visual motif: a minimal, realistic black-belt
// strip rendered as an SVG centerline with a faint fabric crease running
// through it — never a cartoon belt icon. `pathLength={1}` normalizes
// stroke-dash math to 0..1 regardless of the path's real length, so callers
// (GSAP ScrollTrigger, a CSS transition, or nothing at all) can all drive
// `stroke-dashoffset` the same simple way. Renders fully server-side with a
// sensible default reveal, so it degrades to a plain static strip with no JS.
export const KineticBelt = forwardRef<SVGPathElement, KineticBeltProps>(function KineticBelt(
  { d, viewBox = "0 0 100 100", strokeWidth = 3, className, initialProgress = 1, showCrease = true },
  ref
) {
  const offset = 1 - Math.max(0, Math.min(1, initialProgress));

  return (
    <svg viewBox={viewBox} className={cn("overflow-visible", className)} preserveAspectRatio="none" aria-hidden="true">
      <path
        ref={ref}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={offset}
        data-belt-line="true"
      />
      {showCrease && (
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={Math.max(0.5, strokeWidth * 0.18)}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={offset}
          data-belt-crease="true"
        />
      )}
    </svg>
  );
});
