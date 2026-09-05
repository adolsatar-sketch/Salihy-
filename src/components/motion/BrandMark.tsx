"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useDeviceProfile } from "@/lib/useDeviceProfile";

const EMBLEM_SRC = "/assets/brand/emblem-kanku.png";
const WORDMARK_SRC = "/assets/brand/wordmark-calligraphy.png";
// Same silhouette-confined mask technique as LogoHeroMark's dragon sweep —
// the light never leaves the emblem's own alpha shape.
const EMBLEM_MASK = `url(${EMBLEM_SRC})`;

type BrandMarkVariant = "emblem" | "wordmark";

/**
 * A secondary, purely decorative identity mark — the circular kanku emblem
 * or the calligraphy wordmark — used sparingly as a watermark or a small
 * detail. Always dimmer and smaller than the academy logo, never inside the
 * intro/transition, and never competing with the Hero. Motion is limited to
 * a faint scroll-linked drift, a gentle opacity breathe, a one-time reveal
 * on first scroll into view, and (emblem only, optionally) a slow masked
 * light sweep — no rotation, no pulse, no bounce.
 */
export function BrandMark({
  variant,
  className = "",
  maxOpacity = 0.08,
  parallax = 20,
  sweep = false,
}: {
  variant: BrandMarkVariant;
  className?: string;
  maxOpacity?: number;
  parallax?: number;
  sweep?: boolean;
}) {
  const reduceMotion = useReducedMotionSafe();
  const { isMobile } = useDeviceProfile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const drift = isMobile ? parallax * 0.4 : parallax;
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [maxOpacity * 0.7, maxOpacity, maxOpacity * 0.7]);
  // Same scroll progress drives a one-way clip reveal — clamped at the
  // fully-open value once past 12%, so it reads as "unveiled on first
  // approach" without depending on a separate IntersectionObserver trigger.
  const clipPath = useTransform(scrollYProgress, [0, 0.12], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);

  const src = variant === "emblem" ? EMBLEM_SRC : WORDMARK_SRC;

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <motion.div
        className="relative h-full w-full"
        style={reduceMotion ? { opacity: maxOpacity } : { y, opacity, clipPath }}
      >
        <Image src={src} alt="" fill sizes="(min-width: 768px) 32vw, 55vw" className="object-contain" />

        {sweep && variant === "emblem" && !reduceMotion && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: EMBLEM_MASK,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: EMBLEM_MASK,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          >
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-active/40 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{ duration: 6, delay: 1, repeat: Infinity, repeatDelay: 7, ease: "easeInOut" }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
