"use client";

import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";
import { buildWhatsappLink, WHATSAPP_ENABLED, INSTAGRAM_URL } from "@/data/site";

export function CtaChapter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const message =
    locale === "ar"
      ? "السلام عليكم، أود حجز حصة تجريبية في أكاديمية صالحي."
      : "Hello, I'd like to book a trial class at Salihy Academy.";

  return (
    <section className="relative overflow-hidden bg-obsidian py-28 sm:py-36">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-64 w-64 text-bone/[0.07]"
        viewBox="0 0 100 100"
      >
        <path d="M20 30 C 45 15, 55 45, 80 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 70 C 45 85, 55 55, 80 70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </svg>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center sm:px-10">
        <Reveal>
          <p className="font-heading text-xs tracking-[0.4em] text-steel">09 — {locale === "ar" ? "ابدأ الآن" : "BEGIN"}</p>
          <h2 className="font-heading text-balance mt-6 text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? "كل بطل بدأ بخطوة أولى." : "Every champion started with a first step."}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={localePath(locale, "/registration")} variant="primary">
              {dict.common.bookTrial}
            </ButtonLink>
            {WHATSAPP_ENABLED ? (
              <ExternalButtonLink href={buildWhatsappLink(message)} target="_blank" rel="noopener noreferrer" variant="outline">
                {dict.common.whatsappContact}
              </ExternalButtonLink>
            ) : (
              <ExternalButtonLink href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" variant="outline">
                Instagram
              </ExternalButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
