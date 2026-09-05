"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Animates only when `value` is a plain number string. Bracketed
// placeholders like "[العدد]" are rendered as-is, with a soft pulse instead
// of a fake count-up — never fabricated numbers.
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const numeric = /^\d+$/.test(value);
  const [display, setDisplay] = useState(numeric ? "0" : value);

  useEffect(() => {
    if (!inView || !numeric) return;
    const target = parseInt(value, 10);
    const duration = 1200;
    const start = performance.now();

    let frame: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.round(target * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, numeric, value]);

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {display}
      {numeric ? "+" : ""}
    </motion.span>
  );
}
