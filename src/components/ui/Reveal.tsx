"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span";
  y?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 28, once = true }: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// Line-by-line mask reveal for headlines: each child line wipes upward into
// view, like it's being uncovered rather than fading in.
export function RevealLines({
  lines,
  className,
  lineClassName,
  delayStep = 0.08,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delayStep?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Observed on the outer, never-transformed wrapper — the animated lines
  // themselves get translated well outside their own box pre-reveal, which
  // makes them unreliable IntersectionObserver targets.
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.75, delay: i * delayStep, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
