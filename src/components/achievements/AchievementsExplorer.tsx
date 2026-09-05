"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import { achievements } from "@/data/achievements";
import { galleryItems } from "@/data/gallery";

// With zero confirmed results yet, this page never fabricates a tournament
// name, placement, or year — it shows real competition photography from
// the gallery, captioned the same neutral, documentary way as the Gallery
// page itself. Once the academy confirms real results, populate
// `achievements` in src/data/achievements.ts and this switches to a proper
// per-result grid automatically.
export function AchievementsExplorer({ locale }: { locale: Locale }) {
  if (achievements.length > 0) {
    return null;
  }

  const photos = galleryItems.filter((item) => item.categories.includes("tournaments") || item.categories.includes("trophies"));

  if (photos.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {photos.map((item) => (
          <div key={item.id} className="mb-4 block w-full break-inside-avoid overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
              <Image
                src={item.src}
                alt={t(locale, item.alt)}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-steel">{t(locale, item.caption)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
