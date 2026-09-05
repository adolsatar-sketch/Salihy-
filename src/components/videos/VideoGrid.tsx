"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import { videos } from "@/data/videos";

export function VideoGrid({ locale }: { locale: Locale }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video, locale }: { video: (typeof videos)[number]; locale: Locale }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden bg-charcoal">
      {playing ? (
        <video controls autoPlay playsInline className="h-full w-full object-cover">
          {video.sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block h-full w-full"
          aria-label={t(locale, video.title)}
        >
          <Image src={video.poster} alt={t(locale, video.posterAlt)} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" loading="lazy" />
          <div className="absolute inset-0 flex items-center justify-center bg-obsidian/30 transition-colors group-hover:bg-obsidian/10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-active/90 text-bone">▶</span>
          </div>
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian to-transparent p-4 text-start text-sm text-bone">
            {t(locale, video.title)}
          </p>
        </button>
      )}
    </div>
  );
}
