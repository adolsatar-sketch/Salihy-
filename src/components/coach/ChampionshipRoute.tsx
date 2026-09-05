import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { t } from "@/lib/utils";
import { journeyStart, careerRouteIntro, careerRouteStations, careerCredentials } from "@/data/coach";
import { galleryItems } from "@/data/gallery";

/**
 * The coach's confirmed career record — a record of places and titles
 * (Baghdad, Iraq, Turkey, Europe), not a dated timeline, since only the
 * 2009 starting point is confirmed. Reused on both the Coach page (with
 * its full intro) and the Achievements page (route + credentials only,
 * since that page's own PageHero already sets the context).
 */
export function ChampionshipRoute({
  locale,
  showIntro = true,
  showPhotos = true,
}: {
  locale: Locale;
  showIntro?: boolean;
  showPhotos?: boolean;
}) {
  const archivePhotos = showPhotos
    ? galleryItems.filter((item) => item.categories.includes("tournaments") || item.categories.includes("trophies")).slice(0, 3)
    : [];

  return (
    <section className="relative bg-obsidian/92 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {showIntro && (
          <Reveal>
            <SectionLabel number="—" title={t(locale, careerRouteIntro.eyebrow)} />
            <h2 className="font-heading text-balance mt-6 max-w-2xl text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
              {t(locale, careerRouteIntro.title)}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-steel sm:text-base">{t(locale, careerRouteIntro.intro)}</p>
          </Reveal>
        )}

        <Reveal delay={showIntro ? 0.1 : 0} className={showIntro ? "mt-14" : ""}>
          <p className="font-heading text-xs tracking-[0.3em] text-active">
            {journeyStart.year} — {t(locale, journeyStart.label)}
          </p>
        </Reveal>

        {/* The route: places and titles, connected by a single quiet line. */}
        <div className="relative mt-10 border-t border-bone/10 pt-10 sm:mt-12">
          <div className="grid gap-10 sm:grid-cols-4 sm:gap-6">
            {careerRouteStations.map((station, i) => (
              <Reveal key={t(locale, station.place)} delay={i * 0.08} className="relative">
                <span className="font-heading text-[10px] tracking-[0.3em] text-steel/70">{t(locale, station.place)}</span>
                <p className="font-heading mt-2 text-xl leading-tight text-bone sm:text-2xl">{t(locale, station.title)}</p>
                {station.sublabel && <p className="mt-1 text-xs text-steel">{t(locale, station.sublabel)}</p>}
                {i < careerRouteStations.length - 1 && (
                  <span className="absolute -end-3 top-0 hidden text-steel/30 sm:block" aria-hidden="true">
                    {locale === "ar" ? "←" : "→"}
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* Archive photography — general documentary record, never tied to a specific station above. */}
        {archivePhotos.length > 0 && (
          <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-3">
            {archivePhotos.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
                  <Image
                    src={item.src}
                    alt={t(locale, item.alt)}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-xs text-steel">{t(locale, item.caption)}</p>
              </Reveal>
            ))}
          </div>
        )}

        {/* Credentials — visually separate from the championship route above. */}
        <div className="mt-16 grid gap-4 border-t border-bone/10 pt-10 sm:mt-20 sm:grid-cols-2">
          {careerCredentials.map((credential, i) => (
            <Reveal key={credential.kind} delay={i * 0.08}>
              <div className="border border-bone/10 bg-charcoal/60 p-6">
                <p className="font-heading text-sm text-bone">{t(locale, credential.label)}</p>
                <p className="mt-2 text-xs leading-relaxed text-steel">{t(locale, credential.sublabel)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
