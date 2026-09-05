"use client";

import { Suspense } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import { champions, type Champion } from "@/data/champions";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { useQueryModal } from "@/lib/useQueryModal";

export function ChampionsGrid({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={null}>
      <ChampionsGridInner locale={locale} />
    </Suspense>
  );
}

function ChampionsGridInner({ locale }: { locale: Locale }) {
  const { activeId, open, close } = useQueryModal("player");
  const active = champions.find((c) => c.slug === activeId) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div className="space-y-4">
        {champions.map((champion, i) => (
          <Reveal key={champion.slug} delay={i * 0.06}>
            <button
              type="button"
              onClick={() => open(champion.slug)}
              className="group grid w-full grid-cols-[auto_1fr] items-center gap-6 border-b border-bone/10 py-6 text-start sm:grid-cols-[220px_1fr_auto]"
              data-cursor-hover
            >
              <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden sm:w-full">
                <Image
                  src={champion.image}
                  alt={t(locale, champion.imageAlt)}
                  fill
                  sizes="(min-width: 640px) 220px, 96px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="font-heading text-xl text-bone transition-colors group-hover:text-active sm:text-2xl md:text-3xl">
                  {t(locale, champion.tournament)}
                </p>
                {champion.belt && <p className="mt-1 text-xs text-steel">{t(locale, champion.belt)}</p>}
              </div>
              <p className="hidden font-heading text-sm text-gold sm:block">{t(locale, champion.result)}</p>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal open={Boolean(active)} onClose={close} labelledBy="champion-title">
        {active && <ChampionDetail champion={active} locale={locale} />}
      </Modal>
    </div>
  );
}

function ChampionDetail({ champion, locale }: { champion: Champion; locale: Locale }) {
  return (
    <div className="grid sm:grid-cols-2">
      <div className="relative aspect-[3/4] sm:aspect-auto">
        <Image src={champion.image} alt={t(locale, champion.imageAlt)} fill sizes="500px" className="object-cover" />
      </div>
      <div className="p-6 sm:p-8">
        <h2 id="champion-title" className="font-heading text-2xl text-bone sm:text-3xl">
          {t(locale, champion.tournament)}
        </h2>
        <dl className="mt-6 space-y-3 text-sm">
          {champion.belt && <Row label={locale === "ar" ? "الحزام" : "Belt"} value={t(locale, champion.belt)} />}
          <Row label={locale === "ar" ? "المركز" : "Result"} value={t(locale, champion.result)} />
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-steel">{t(locale, champion.story)}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-bone/10 pb-2">
      <dt className="text-steel">{label}</dt>
      <dd className="text-bone">{value}</dd>
    </div>
  );
}
