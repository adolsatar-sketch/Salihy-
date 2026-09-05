"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import { champions } from "@/data/champions";
import { galleryItems } from "@/data/gallery";

// With zero confirmed athlete profiles yet, this page never fabricates a
// player's name, age, belt, or tournament — it shows real students and
// team photography from the gallery, captioned the same neutral,
// documentary way as the Gallery page itself. Once the academy confirms
// real profiles, populate `champions` in src/data/champions.ts and this
// switches to a proper per-athlete grid automatically.
export function ChampionsGrid({ locale }: { locale: Locale }) {
  if (champions.length > 0) {
    return null;
  }

  const photos = galleryItems.filter((item) => item.categories.includes("students"));

  if (photos.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((item) => (
          <div key={item.id} className="block w-full text-start">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={item.src}
                alt={t(locale, item.alt)}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-steel">{t(locale, item.caption)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
