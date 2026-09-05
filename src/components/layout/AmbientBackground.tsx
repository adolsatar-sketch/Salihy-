"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useDeviceProfile } from "@/lib/useDeviceProfile";
import { useGlobalMotionVars } from "@/lib/useGlobalMotionVars";
import { SCROLL_COLOR_STOPS, SCROLL_COLOR_OFFSETS } from "@/lib/scrollColor";

/**
 * A living field behind the entire site — layered rust/red glows that
 * drift independently, a faint logo-mark silhouette, grain, and a base
 * color that shifts continuously with scroll position, so the identity
 * never reads as flat, static black on any page.
 *
 * The base color is driven directly by Framer Motion's useScroll() +
 * useTransform() (not a manual rAF loop) — useTransform interpolates
 * color strings natively, which is exactly what a continuous, reversible
 * (scroll up = colors run back the same way) five-stop mix needs.
 *
 * Deliberately filter-free: every glow is a plain radial-gradient circle,
 * not `filter: blur()`. A blurred layer has to be re-rasterized whenever
 * its size changes, which is exactly what "drift" does every frame — on
 * mid-range Android that is the difference between smooth compositing
 * and visible stutter. A gradient achieves the same soft-glow read while
 * staying compositor-only (transform/opacity).
 */
export function AmbientBackground() {
  const reduceMotion = useReducedMotionSafe();
  const { isAndroid } = useDeviceProfile();

  // Owns the site's shared scroll/pointer CSS vars.
  useGlobalMotionVars(reduceMotion);

  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(scrollYProgress, [...SCROLL_COLOR_OFFSETS], [...SCROLL_COLOR_STOPS]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div
        className={`absolute -top-[20%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full ${
          reduceMotion ? "" : "animate-ambient-drift-a"
        }`}
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--color-active) 50%, transparent) 0%, transparent 68%)",
          translate: "var(--pointer-x, 0) calc(var(--pointer-y, 0) + var(--scroll-shift, 0px))",
        }}
      />
      <div
        className={`absolute -right-[10%] top-[30%] h-[55vmax] w-[55vmax] rounded-full ${
          reduceMotion ? "" : "animate-ambient-drift-b"
        }`}
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--color-rust) 95%, transparent) 0%, transparent 70%)",
          translate: "0 calc(var(--scroll-shift, 0px) * -0.6)",
        }}
      />
      {!isAndroid && (
        <div
          className={`absolute bottom-[-25%] left-[20%] h-[60vmax] w-[60vmax] rounded-full ${
            reduceMotion ? "" : "animate-ambient-drift-c"
          }`}
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--color-active) 38%, transparent) 0%, transparent 72%)",
            translate: "calc(var(--pointer-x, 0) * -1) calc(var(--pointer-y, 0) * -1 + var(--scroll-shift, 0px) * 0.4)",
            opacity: "var(--touch-boost, 0.12)",
          }}
        />
      )}
      {/* Warm ember highlight — the "third color" so the field isn't just black/red */}
      <div
        className={`absolute top-[55%] right-[25%] h-[42vmax] w-[42vmax] rounded-full ${
          reduceMotion ? "" : "animate-ambient-drift-d"
        }`}
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--color-gold) 30%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Faint logo-mark silhouette, drifting independently of the glows —
          a real detail taken from the identity, not a decorative import. */}
      <div
        className={`absolute top-[8%] -right-[18%] h-[55vmax] w-[55vmax] opacity-[0.05] ${
          reduceMotion ? "" : "animate-ambient-line"
        }`}
      >
        <Image src="/assets/logo/logo-mark.png" alt="" fill sizes="55vmax" className="object-contain" />
      </div>
      {!isAndroid && (
        <div
          className={`absolute -bottom-[15%] -left-[20%] h-[46vmax] w-[46vmax] rotate-[160deg] opacity-[0.035] ${
            reduceMotion ? "" : "animate-ambient-line"
          }`}
          style={{ animationDelay: "-6s" }}
        >
          <Image src="/assets/logo/logo-mark.png" alt="" fill sizes="46vmax" className="object-contain" />
        </div>
      )}

      {/* Occasional light sweep behind content */}
      {!reduceMotion && (
        <div
          className="animate-ambient-sweep absolute inset-y-0 w-[35%] bg-gradient-to-r from-transparent via-active/[0.08] to-transparent"
          style={{ animationDelay: "-3s" }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_92%)]" />
    </motion.div>
  );
}
