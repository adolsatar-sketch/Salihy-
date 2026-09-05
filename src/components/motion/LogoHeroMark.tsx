"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const MARK_SRC = "/assets/logo/logo-full.png";
// A moving highlight confined to the logo's own silhouette (its real alpha
// shape, via CSS mask), never a redrawn or separately-illustrated dragon —
// this is the closest a raster-only asset can get to "a light passing
// through the path" without tracing/redrawing the artwork.
const MARK_MASK = `url(${MARK_SRC})`;

/**
 * The desktop hero centerpiece: the official logo — dragon and wordmark
 * intact, never redrawn — rendered large and dignified, always fully
 * visible (opacity never starts at 0), settling in from a slightly smaller
 * scale, breathing gently, tilting toward the pointer, and carrying a
 * red-light sweep confined to its own silhouette. No spin, no cheap pulse.
 */
export function LogoHeroMark({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotionSafe();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 60, damping: 14 });
  const springTiltY = useSpring(tiltY, { stiffness: 60, damping: 14 });
  const rotateX = useTransform(springTiltY, [-1, 1], [6, -6]);
  const rotateY = useTransform(springTiltX, [-1, 1], [-6, 6]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);

  useEffect(() => {
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time entrance-complete flag, not a render loop
      setSettled(true);
      return;
    }
    const t = window.setTimeout(() => setSettled(true), 700);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!enabled || reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      tiltX.set(Math.max(-1, Math.min(1, nx)));
      tiltY.set(Math.max(-1, Math.min(1, ny)));
    };
    const onLeave = () => {
      tiltX.set(0);
      tiltY.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, tiltX, tiltY]);

  return (
    <div ref={sectionRef} className={className}>
      <motion.div
        ref={containerRef}
        style={reduceMotion ? undefined : { scale: scrollScale, opacity: scrollOpacity }}
        className="relative mx-auto aspect-square w-[72vw] max-w-[420px] sm:w-[50vw] md:w-[36vw]"
      >
        {/* Ambient glow breathing behind the mark */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-25%] rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-active) 45%, transparent) 0%, transparent 68%)" }}
          animate={reduceMotion ? { opacity: 0.35 } : { opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* The logo itself — always visible, never opacity:0 at mount */}
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={
            reduceMotion
              ? { filter: "drop-shadow(0 0 24px rgba(178,15,32,0.35))" }
              : { rotateX, rotateY, transformPerspective: 800, filter: "drop-shadow(0 0 24px rgba(178,15,32,0.35))" }
          }
        >
          {/* Slow, subtle organic wobble — a gentle life, not a spin */}
          <motion.div
            className="relative h-full w-full"
            animate={
              settled && !reduceMotion
                ? { rotate: [0, 0.6, -0.4, 0], y: [0, -6, 0] }
                : undefined
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src={MARK_SRC} alt="" fill sizes="(min-width: 768px) 36vw, 72vw" className="object-contain" priority />
          </motion.div>

          {/* Light sweep, masked to the logo's own silhouette */}
          {!reduceMotion && (
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
              style={{
                WebkitMaskImage: MARK_MASK,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: MARK_MASK,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            >
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-active/70 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 2.6, delay: 0.5, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
