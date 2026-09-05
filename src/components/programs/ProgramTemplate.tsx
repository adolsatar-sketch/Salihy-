import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { t, localePath } from "@/lib/utils";
import type { Program } from "@/data/programs";
import { beltRanks } from "@/data/programs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/dictionaries";

export function ProgramTemplate({ program, locale }: { program: Program; locale: Locale }) {
  const dict = getDictionary(locale);

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
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 sm:grid-cols-4 sm:px-10">
          <InfoStat label={locale === "ar" ? "الفئة العمرية" : "Age Range"} value={t(locale, program.ageRange)} />
          <InfoStat label={locale === "ar" ? "المستوى" : "Level"} value={t(locale, program.level)} />
          <InfoStat label={locale === "ar" ? "عدد الحصص" : "Sessions"} value={t(locale, program.sessionsPerWeek)} />
          <InfoStat label={locale === "ar" ? "مدة الحصة" : "Duration"} value={t(locale, program.sessionDuration)} />
        </div>
      </section>

      <section className="relative bg-obsidian py-24 sm:py-32">
        <div className="mx-auto grid max-w-5xl gap-16 px-6 sm:px-10 md:grid-cols-2">
          <Reveal>
            <SectionLabel number="—" title={locale === "ar" ? "لمن هذا البرنامج؟" : "WHO IS THIS FOR?"} />
            <p className="mt-6 text-balance text-lg leading-relaxed text-bone sm:text-xl">{t(locale, program.audience)}</p>

            <SectionLabel number="—" title={locale === "ar" ? "الأهداف" : "GOALS"} className="mt-12" />
            <ul className="mt-6 space-y-3">
              {program.goals.map((goal) => (
                <li key={t(locale, goal)} className="flex gap-3 text-sm leading-relaxed text-steel sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-active" />
                  {t(locale, goal)}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionLabel number="—" title={locale === "ar" ? "ماذا سيتعلم الطالب؟" : "WHAT WILL YOU LEARN?"} />
            <ul className="mt-6 space-y-3">
              {program.curriculum.map((item) => (
                <li key={t(locale, item)} className="flex gap-3 text-sm leading-relaxed text-steel sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {t(locale, item)}
                </li>
              ))}
            </ul>

            <SectionLabel number="—" title={locale === "ar" ? "متطلبات البدء" : "REQUIREMENTS"} className="mt-12" />
            <ul className="mt-6 space-y-3">
              {program.requirements.map((item) => (
                <li key={t(locale, item)} className="flex gap-3 text-sm leading-relaxed text-steel sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bone/40" />
                  {t(locale, item)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {program.slug === "belt-journey" && (
        <section className="relative bg-charcoal py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <SectionLabel number="—" title={locale === "ar" ? "مسار الأحزمة" : "BELT PATH"} />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {beltRanks.map((belt, i) => (
                <div key={t(locale, belt.name)} className="flex items-center gap-4">
                  <div className="text-center">
                    <span
                      className="mx-auto block h-8 w-16 rounded-sm border border-bone/40 shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
                      style={{ backgroundColor: belt.colorHex }}
                    />
                    <p className="mt-2 max-w-[6rem] text-[11px] leading-tight text-steel">{t(locale, belt.name)}</p>
                  </div>
                  {i < beltRanks.length - 1 && (
                    <span className="text-steel/40">{locale === "ar" ? "←" : "→"}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative bg-obsidian py-20 text-center sm:py-28">
        <div className="mx-auto max-w-xl px-6 sm:px-10">
          <ButtonLink href={localePath(locale, "/registration")} variant="primary">
            {program.isInformational ? dict.common.exploreJourney : dict.common.register}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-heading text-sm text-bone sm:text-base">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-steel">{label}</p>
    </div>
  );
}
