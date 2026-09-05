import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t, localePath, cn } from "@/lib/utils";
import type { Program, ProgramSlug } from "@/data/programs";
import { beltRanks } from "@/data/programs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { KineticBelt } from "@/components/motion/KineticBelt";
import { getDictionary } from "@/i18n/dictionaries";

// Every program shares one structure but not one mood: the accent below is
// each program's "own light" — a single color that tints its stat strip,
// numbering and dividers, so eight pages built from the same template still
// read as eight distinct rooms rather than one page with a slug swapped in.
type Accent = { text: string; dot: string; glow: string };
// Every value here must be a complete, literal Tailwind class string —
// Tailwind's scanner reads raw file text for whole class tokens, so a
// runtime-assembled string like `accent.from + "/10"` would never be
// found and its CSS would silently never be generated.
const accentBySlug: Record<ProgramSlug, Accent> = {
  kids: { text: "text-gold", dot: "bg-gold", glow: "from-gold/10" },
  youth: { text: "text-active", dot: "bg-active", glow: "from-active/10" },
  adults: { text: "text-blood", dot: "bg-blood", glow: "from-blood/10" },
  women: { text: "text-gold", dot: "bg-gold", glow: "from-gold/10" },
  "competition-team": { text: "text-blood", dot: "bg-blood", glow: "from-blood/10" },
  "study-sport": { text: "text-steel", dot: "bg-steel", glow: "from-steel/10" },
  "training-system": { text: "text-steel", dot: "bg-steel", glow: "from-steel/10" },
  "belt-journey": { text: "text-gold", dot: "bg-gold", glow: "from-gold/10" },
};

export function ProgramTemplate({ program, locale }: { program: Program; locale: Locale }) {
  const dict = getDictionary(locale);
  const accent = accentBySlug[program.slug];

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-obsidian">
        <div className="absolute inset-0">
          <Image
            src={program.heroImage}
            alt={t(locale, program.heroImageAlt)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/65 to-obsidian/20" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <KineticBelt
            d="M -10 30 C 30 10, 70 55, 110 20"
            viewBox="0 0 100 60"
            strokeWidth={0.6}
            className={cn("h-full w-full", accent.text)}
            showCrease={false}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-40 sm:px-10">
          <SectionLabel number="05" title={locale === "ar" ? "البرامج" : "PROGRAMS"} className="mb-6" />
          <Reveal>
            <h1 className="font-heading text-balance text-4xl text-bone xs:text-5xl sm:text-6xl">{t(locale, program.title)}</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel sm:text-base">{t(locale, program.summary)}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-charcoal py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
            <div className="absolute inset-x-0 top-3 hidden h-px sm:block">
              <KineticBelt d="M0 1 L100 1" viewBox="0 0 100 2" strokeWidth={1.4} className={cn("h-full w-full", accent.text)} showCrease={false} />
            </div>
            <InfoStat accent={accent} label={locale === "ar" ? "الفئة العمرية" : "Age Range"} value={t(locale, program.ageRange)} />
            <InfoStat accent={accent} label={locale === "ar" ? "المستوى" : "Level"} value={t(locale, program.level)} />
            <InfoStat accent={accent} label={locale === "ar" ? "عدد الحصص" : "Sessions"} value={t(locale, program.sessionsPerWeek)} />
            <InfoStat accent={accent} label={locale === "ar" ? "مدة الحصة" : "Duration"} value={t(locale, program.sessionDuration)} />
          </div>
        </div>
      </section>

      <section className="relative bg-obsidian py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className={cn("font-heading text-5xl leading-none", accent.text)}>&ldquo;</p>
            <p className="font-heading text-balance -mt-4 text-2xl leading-snug text-bone sm:text-3xl">{t(locale, program.audience)}</p>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-px overflow-hidden border border-bone/10 bg-bone/10 px-0 sm:grid-cols-3 sm:px-10">
          <ProgramColumn accent={accent} title={locale === "ar" ? "الأهداف" : "GOALS"} items={program.goals} locale={locale} start={1} />
          <ProgramColumn
            accent={accent}
            title={locale === "ar" ? "ماذا سيتعلم الطالب؟" : "WHAT YOU'LL LEARN"}
            items={program.curriculum}
            locale={locale}
            start={program.goals.length + 1}
          />
          <ProgramColumn
            accent={accent}
            title={locale === "ar" ? "متطلبات البدء" : "REQUIREMENTS"}
            items={program.requirements}
            locale={locale}
            start={program.goals.length + program.curriculum.length + 1}
          />
        </div>
      </section>

      {program.slug === "belt-journey" && (
        <section className="relative bg-charcoal py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <SectionLabel number="—" title={locale === "ar" ? "مسار الأحزمة" : "BELT PATH"} />
            <div className="relative mt-14">
              <div className="absolute inset-x-4 top-5 h-px">
                <KineticBelt d="M0 1 L100 1" viewBox="0 0 100 2" strokeWidth={1.2} className="h-full w-full text-bone/25" showCrease={false} />
              </div>
              <div className="relative flex flex-wrap justify-between gap-y-8">
                {beltRanks.map((belt) => (
                  <div key={t(locale, belt.name)} className="flex w-1/4 min-w-[5.5rem] flex-col items-center text-center sm:w-auto">
                    <span
                      className="mx-auto block h-3 w-3 rounded-full ring-4 ring-charcoal"
                      style={{ backgroundColor: belt.colorHex }}
                    />
                    <p className="mt-4 max-w-[6rem] text-[11px] leading-tight text-steel">{t(locale, belt.name)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={cn("relative bg-gradient-to-t to-obsidian py-20 text-center sm:py-28", accent.glow)}>
        <div className="mx-auto max-w-xl px-6 sm:px-10">
          <ButtonLink href={localePath(locale, "/registration")} variant="primary">
            {program.isInformational ? dict.common.exploreJourney : dict.common.register}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function InfoStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: Accent;
}) {
  return (
    <div className="relative bg-charcoal px-2 text-center">
      <span className={cn("mx-auto mb-4 block h-2 w-2 rounded-full", accent.dot)} />
      <p className="font-heading text-sm text-bone sm:text-base">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-steel">{label}</p>
    </div>
  );
}

function ProgramColumn({
  title,
  items,
  locale,
  start,
  accent,
}: {
  title: string;
  items: Program["goals"];
  locale: Locale;
  start: number;
  accent: Accent;
}) {
  return (
    <div className="h-full bg-obsidian p-7 sm:p-8">
      <p className={cn("font-heading text-xs tracking-[0.3em]", accent.text)}>{title}</p>
      <ul className="mt-5 space-y-4">
        {items.map((item, i) => (
          <li key={t(locale, item)} className="flex gap-3 text-sm leading-relaxed text-steel">
            <span className="font-heading shrink-0 text-xs text-bone/30">{String(start + i).padStart(2, "0")}</span>
            {t(locale, item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
