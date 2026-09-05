"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    // Reading a browser-only media query can't happen during the server
    // render, so this has to run once after mount rather than be derived.
    const fine = window.matchMedia("(pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(fine);
    if (!fine) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    function move(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (dotRef.current) {
            dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          }
          raf = 0;
        });
      }
      const target = e.target as HTMLElement | null;
      setHoveringInteractive(Boolean(target?.closest("a, button, [data-cursor-hover]")));
    }

    function click(e: PointerEvent) {
      const pulse = document.createElement("div");
      pulse.className = "click-pulse";
      pulse.style.left = `${e.clientX - 11}px`;
      pulse.style.top = `${e.clientY - 11}px`;
      document.body.appendChild(pulse);
      setTimeout(() => pulse.remove(), 520);
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="custom-cursor"
      style={{
        scale: hoveringInteractive ? 1.8 : 1,
        backgroundColor: hoveringInteractive ? "rgba(178,15,32,0.15)" : "transparent",
      }}
    />
  );
}
