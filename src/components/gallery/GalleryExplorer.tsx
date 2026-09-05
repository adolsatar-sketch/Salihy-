"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import { galleryItems, galleryCategoryLabels, type GalleryCategory } from "@/data/gallery";
import { getDictionary } from "@/i18n/dictionaries";
import { useQueryModal } from "@/lib/useQueryModal";
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

  const filtered = useMemo(
    () => (category === "all" ? galleryItems : galleryItems.filter((item) => item.categories.includes(category))),
    [category]
  );

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

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => open(item.id)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden"
            data-cursor-hover
          >
            <div className="relative w-full" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
              <Image
                src={item.src}
                alt={t(locale, item.alt)}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </button>
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
