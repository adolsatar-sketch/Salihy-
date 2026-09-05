"use client";

import { useMemo, useState, Suspense } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t } from "@/lib/utils";
import {
  achievements,
  medalLabel,
  counterStats,
  type Achievement,
  type AchievementRegion,
  type AchievementSubject,
  type MedalTier,
  type AchievementScope,
} from "@/data/achievements";
import { getDictionary } from "@/i18n/dictionaries";
import { Modal } from "@/components/ui/Modal";
import { Counter } from "@/components/ui/Counter";
import { useQueryModal } from "@/lib/useQueryModal";

type Filters = {
  year: string;
  region: AchievementRegion | "all";
  subject: AchievementSubject | "all";
  medal: MedalTier | "all";
  scope: AchievementScope | "all";
};

const defaultFilters: Filters = { year: "all", region: "all", subject: "all", medal: "all", scope: "all" };

export function AchievementsExplorer({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={null}>
      <AchievementsExplorerInner locale={locale} />
    </Suspense>
  );
}

function AchievementsExplorerInner({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { activeId, open, close } = useQueryModal("item");

  const years = useMemo(
    () => Array.from(new Set(achievements.map((a) => a.year))),
    []
  );

  const filtered = achievements.filter((a) => {
    if (filters.year !== "all" && a.year !== filters.year) return false;
    if (filters.region !== "all" && a.region !== filters.region) return false;
    if (filters.subject !== "all" && a.subject !== filters.subject) return false;
    if (filters.medal !== "all" && a.medal !== filters.medal) return false;
    if (filters.scope !== "all" && a.scope !== filters.scope) return false;
    return true;
  });

  const active = achievements.find((a) => a.id === activeId) ?? null;

  return (
    <div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 border-y border-bone/10 px-6 py-8 sm:grid-cols-4 sm:px-10">
        {counterStats.map((stat) => (
          <div key={t(locale, stat.label)} className="text-center">
            <Counter value={stat.value} className="font-heading text-3xl text-gold sm:text-4xl" />
            <p className="mt-2 text-[11px] tracking-wide text-steel sm:text-xs">{t(locale, stat.label)}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="flex flex-wrap gap-3 text-xs">
          <FilterGroup
            label={dict.common.year}
            value={filters.year}
            onChange={(v) => setFilters((f) => ({ ...f, year: v }))}
            options={[{ value: "all", label: dict.common.all }, ...years.map((y) => ({ value: y, label: y }))]}
          />
          <FilterGroup
            label={locale === "ar" ? "المكان" : "Region"}
            value={filters.region}
            onChange={(v) => setFilters((f) => ({ ...f, region: v as Filters["region"] }))}
            options={[
              { value: "all", label: dict.common.all },
              { value: "inside", label: dict.common.insideIraq },
              { value: "outside", label: dict.common.outsideIraq },
            ]}
          />
          <FilterGroup
            label={locale === "ar" ? "البطولة" : "Tournament"}
            value={filters.subject}
            onChange={(v) => setFilters((f) => ({ ...f, subject: v as Filters["subject"] }))}
            options={[
              { value: "all", label: dict.common.all },
              { value: "coach", label: dict.common.coachAchievement },
              { value: "student", label: dict.common.studentAchievement },
            ]}
          />
          <FilterGroup
            label={locale === "ar" ? "الميدالية" : "Medal"}
            value={filters.medal}
            onChange={(v) => setFilters((f) => ({ ...f, medal: v as Filters["medal"] }))}
            options={[
              { value: "all", label: dict.common.all },
              { value: "gold", label: dict.common.gold },
              { value: "silver", label: dict.common.silver },
              { value: "bronze", label: dict.common.bronze },
            ]}
          />
          <FilterGroup
            label={locale === "ar" ? "النوع" : "Type"}
            value={filters.scope}
            onChange={(v) => setFilters((f) => ({ ...f, scope: v as Filters["scope"] }))}
            options={[
              { value: "all", label: dict.common.all },
              { value: "individual", label: dict.common.individual },
              { value: "team", label: dict.common.team },
            ]}
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => open(item.id)}
              className="group relative block aspect-[4/5] overflow-hidden text-start"
              data-cursor-hover
            >
              <Image
                src={item.image}
                alt={t(locale, item.note)}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-heading text-[10px] tracking-[0.3em] text-gold">
                  {item.year} · {t(locale, medalLabel[item.medal])}
                </p>
                <p className="mt-1 text-sm text-bone">{t(locale, item.tournament)}</p>
                <p className="mt-1 text-xs text-steel">{t(locale, item.place)}</p>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-steel">
            {locale === "ar" ? "لا توجد نتائج مطابقة لهذا الفلتر بعد." : "No results match this filter yet."}
          </p>
        )}
      </div>

      <Modal open={Boolean(active)} onClose={close} labelledBy="achievement-title">
        {active && <AchievementDetail achievement={active} locale={locale} />}
      </Modal>
    </div>
  );
}

function AchievementDetail({ achievement, locale }: { achievement: Achievement; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div>
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
        <Image src={achievement.image} alt={t(locale, achievement.note)} fill sizes="800px" className="object-contain bg-obsidian" />
      </div>
      <div className="p-6 sm:p-8">
        <p className="font-heading text-xs tracking-[0.3em] text-gold">
          {achievement.year} · {t(locale, medalLabel[achievement.medal])}
        </p>
        <h2 id="achievement-title" className="font-heading mt-3 text-2xl text-bone sm:text-3xl">
          {t(locale, achievement.tournament)}
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <Detail label={dict.common.location} value={t(locale, achievement.place)} />
          <Detail label={dict.common.category} value={t(locale, achievement.category)} />
          <Detail label={dict.common.result} value={t(locale, achievement.result)} />
          <Detail
            label={locale === "ar" ? "النوع" : "Type"}
            value={achievement.scope === "team" ? dict.common.team : dict.common.individual}
          />
          <Detail
            label={locale === "ar" ? "البطولة" : "Tournament type"}
            value={achievement.subject === "coach" ? dict.common.coachAchievement : dict.common.studentAchievement}
          />
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-steel">{t(locale, achievement.note)}</p>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.2em] text-steel">{label}</dt>
      <dd className="mt-1 text-bone">{value}</dd>
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 border border-bone/15 px-3 py-2 text-steel">
      <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.15em]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="bg-transparent text-bone outline-none [&>option]:bg-charcoal"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
