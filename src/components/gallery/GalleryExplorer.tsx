"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import { galleryItems, galleryCategoryLabels, type GalleryCategory, type GalleryItem } from "@/data/gallery";
import { getDictionary } from "@/i18n/dictionaries";
import { useQueryModal } from "@/lib/useQueryModal";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ensureGsap, gsap } from "@/lib/gsapConfig";
import { Lightbox } from "./Lightbox";

const categories: GalleryCategory[] = [
  "legacy",
  "fights",
  "tournaments",
  "trophies",
  "students",
  "academy",
  "training",
  "behind",
];

// Every column drifts at its own rate while the "room" scrolls past — the
// difference (rather than any single fast/slow number) is what reads as
// depth. Desktop only: three simultaneous scrub loops is exactly the kind
// of layered motion the mobile art-direction pass forbids.
const COLUMN_SPEEDS = [-7, 4, -3];

export function GalleryExplorer({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={null}>
      <GalleryExplorerInner locale={locale} />
    </Suspense>
  );
}

function GalleryExplorerInner({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const { activeId, open, close } = useQueryModal("photo");
  const reducedMotion = useReducedMotion();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");
  const columnCount = isLg ? 3 : isSm ? 2 : 1;
  const sectionRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = useMemo(
    () => (category === "all" ? galleryItems : galleryItems.filter((item) => item.categories.includes(category))),
    [category]
  );

  const columns = useMemo(() => {
    const cols: GalleryItem[][] = Array.from({ length: columnCount }, () => []);
    filtered.forEach((item, i) => cols[i % columnCount].push(item));
    return cols;
  }, [filtered, columnCount]);

  useEffect(() => {
    if (reducedMotion || columnCount < 2) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      columnRefs.current.forEach((col, i) => {
        if (!col) return;
        gsap.to(col, {
          yPercent: COLUMN_SPEEDS[i % COLUMN_SPEEDS.length],
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion, columnCount, columns]);

  const activeIndex = filtered.findIndex((item) => item.id === activeId);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="flex flex-wrap gap-2 text-xs">
        <FilterChip active={category === "all"} onClick={() => setCategory("all")} label={dict.common.all} />
        {categories.map((cat) => (
          <FilterChip
            key={cat}
            active={category === cat}
            onClick={() => setCategory(cat)}
            label={t(locale, galleryCategoryLabels[cat])}
          />
        ))}
      </div>

      <div ref={sectionRef} className="mt-8 flex gap-4">
        {columns.map((col, i) => (
          <div
            key={i}
            ref={(el) => {
              columnRefs.current[i] = el;
            }}
            className="flex flex-1 flex-col gap-4"
          >
            {col.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => open(item.id)}
                className="group block w-full overflow-hidden"
                data-cursor-hover
              >
                <motion.div
                  layoutId={`gallery-${item.id}`}
                  className="relative w-full"
                  style={{
                    aspectRatio: `${item.width} / ${item.height}`,
                    visibility: activeId === item.id ? "hidden" : "visible",
                  }}
                >
                  <Image
                    src={item.src}
                    alt={t(locale, item.alt)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </motion.div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {activeIndex >= 0 && (
        <Lightbox
          items={filtered}
          index={activeIndex}
          locale={locale}
          onClose={close}
          onNavigate={(item) => open(item.id)}
        />
      )}
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover
      className={`border px-4 py-2 tracking-wide transition-colors ${
        active ? "border-active bg-active text-bone" : "border-bone/15 text-steel hover:border-bone/40 hover:text-bone"
      }`}
    >
      {label}
    </button>
  );
}
