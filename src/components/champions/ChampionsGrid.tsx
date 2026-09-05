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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {champions.map((champion, i) => (
          <Reveal key={champion.slug} delay={i * 0.06}>
            <button
              type="button"
              id={champion.slug}
              onClick={() => open(champion.slug)}
              className="group block w-full text-start"
              data-cursor-hover
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={champion.image}
                  alt={t(locale, champion.imageAlt)}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                <p className="absolute bottom-3 start-3 font-heading text-[10px] tracking-[0.25em] text-gold">
                  {t(locale, champion.result)}
                </p>
              </div>
              <p className="font-heading mt-3 text-sm text-bone">{t(locale, champion.name)}</p>
              <p className="text-xs text-steel">{t(locale, champion.tournament)}</p>
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
          {t(locale, champion.name)}
        </h2>
        <dl className="mt-6 space-y-3 text-sm">
          <Row label={locale === "ar" ? "العمر" : "Age"} value={champion.age} />
          <Row label={locale === "ar" ? "الحزام" : "Belt"} value={t(locale, champion.belt)} />
          <Row label={locale === "ar" ? "البطولة" : "Tournament"} value={t(locale, champion.tournament)} />
          <Row label={locale === "ar" ? "المركز" : "Result"} value={t(locale, champion.result)} />
          <Row label={locale === "ar" ? "عدد المشاركات" : "Participations"} value={champion.participations} />
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
