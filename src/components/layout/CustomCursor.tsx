"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';

/**
 * Replaces the system pointer with the official logo mark on devices that
 * actually have one (fine pointer + hover). Touch devices never mount
 * this — there is no mouse cursor to replace there.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotionSafe();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = reduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 420, damping: 34, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const hoverDepth = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!ready) setReady(true);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        hoverDepth.current += 1;
        setHovering(true);
      }
    };
    const onOut = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        hoverDepth.current = Math.max(0, hoverDepth.current - 1);
        if (hoverDepth.current === 0) setHovering(false);
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, ready, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: ready && visible ? 1 : 0, transition: "opacity 0.25s ease" }}
    >
      <motion.div className="absolute top-0 left-0 will-change-transform" style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}>
        {/* Glow burst on click */}
        <AnimatePresence>
          {pressed && (
            <motion.span
              key="burst"
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                translateX: "-50%",
                translateY: "-50%",
                background: "radial-gradient(circle, rgba(178,15,32,0.55) 0%, rgba(178,15,32,0) 70%)",
              }}
              initial={{ width: 10, height: 10, opacity: 0.9 }}
              animate={{ width: 64, height: 64, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>

        {/* Ambient hover glow */}
        <motion.span
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(178,15,32,0.45) 0%, rgba(178,15,32,0) 72%)",
          }}
          animate={{ width: hovering ? 46 : 0, height: hovering ? 46 : 0, opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* The mark itself */}
        <motion.div
          className="relative h-6 w-6"
          style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }}
          animate={{ scale: pressed ? 0.8 : hovering ? 1.4 : 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src="/assets/logo/logo-mark.png" alt="" fill sizes="24px" className="object-contain" />
        </motion.div>
      </motion.div>
    </div>
  );
}
