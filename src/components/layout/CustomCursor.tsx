"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';

/**
 * Replaces the system pointer with the official logo mark on devices that
 * actually have one (fine pointer + hover). Deliberately no spring/lerp on
 * position: the cursor's job is to feel like an extension of the real
 * pointer, not a trailing effect, so position is written directly from the
 * raw pointer event, coalesced to one write per animation frame via a ref
 * (never React state) and `transform: translate3d()` (never top/left, which
 * would trigger layout). Touch devices never mount this — there is no
 * mouse cursor to replace there.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const ready = useRef(false);

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
    const root = rootRef.current;
    const mark = markRef.current;
    if (!root || !mark) return;

    let hoverDepth = 0;
    let pressed = false;

    const write = () => {
      raf.current = 0;
      root.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };
    const queueWrite = () => {
      if (!raf.current) raf.current = requestAnimationFrame(write);
    };

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      queueWrite();
      if (!ready.current) {
        ready.current = true;
        root.style.opacity = "1";
      }
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        hoverDepth += 1;
        mark.style.transform = "scale(1.4)";
      }
    };
    const onOut = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        hoverDepth = Math.max(0, hoverDepth - 1);
        if (hoverDepth === 0) mark.style.transform = pressed ? "scale(0.8)" : "scale(1)";
      }
    };
    const onDown = () => {
      pressed = true;
      mark.style.transform = "scale(0.8)";
      const glow = document.createElement("span");
      glow.className = "cursor-click-glow";
      root.appendChild(glow);
      glow.addEventListener("animationend", () => glow.remove());
    };
    const onUp = () => {
      pressed = false;
      mark.style.transform = hoverDepth > 0 ? "scale(1.4)" : "scale(1)";
    };
    const onLeave = () => {
      root.style.opacity = "0";
    };
    const onEnter = () => {
      root.style.opacity = "1";
    };

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
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
      ready.current = false;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="custom-cursor-root" style={{ opacity: 0 }}>
      <div ref={markRef} className="custom-cursor-mark">
        <Image src="/assets/logo/logo-mark.png" alt="" fill sizes="24px" className="object-contain" />
      </div>
    </div>
  );
}
