"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import type { GalleryItem } from "@/data/gallery";

export function Lightbox({
  items,
  index,
  locale,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number;
  locale: Locale;
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const item = items[index];

  const goPrev = () => {
    setZoomed(false);
    onNavigate(items[(index - 1 + items.length) % items.length]);
  };
  const goNext = () => {
    setZoomed(false);
    onNavigate(items[(index + 1) % items.length]);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[95] flex flex-col bg-obsidian/97"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <div className="flex items-center justify-between px-5 py-4 text-xs text-steel sm:px-8">
          <span>
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-active"
          >
            ✕
          </button>
        </div>

        <div
          className="relative flex-1 overflow-hidden px-4 pb-4 sm:px-10 sm:pb-10"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={(e) => {
            if (!touchStart.current || zoomed) return;
            const touch = e.changedTouches[0];
            const dx = touch.clientX - touchStart.current.x;
            const dy = touch.clientY - touchStart.current.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
              if (dx > 0) goPrev();
              else goNext();
            }
            touchStart.current = null;
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative mx-auto h-full max-w-5xl"
            >
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="relative block h-full w-full cursor-zoom-in"
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={{ scale: zoomed ? 1.9 : 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <Image
                    src={item.src}
                    alt={t(locale, item.alt)}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </button>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label={locale === "ar" ? "السابق" : "Previous"}
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-active sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label={locale === "ar" ? "التالي" : "Next"}
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-active sm:flex"
          >
            ›
          </button>
        </div>

        <div className="px-5 pb-6 text-center text-xs text-steel sm:px-8">{t(locale, item.caption)}</div>
      </motion.div>
    </AnimatePresence>
  );
}
