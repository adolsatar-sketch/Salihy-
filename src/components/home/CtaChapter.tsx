"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";
import { buildWhatsappLink } from "@/data/site";

export function CtaChapter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const message =
    locale === "ar"
      ? "السلام عليكم، أود حجز حصة تجريبية في أكاديمية صالحي."
      : locale === "tr"
        ? "Merhaba, Salihy Akademisi'nde bir deneme dersi ayırtmak istiyorum."
        : "Hello, I'd like to book a trial class at Salihy Academy.";

  return (
    <section className="relative overflow-hidden bg-obsidian/92 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <Image src="/assets/logo/logo-mark.png" alt="" width={900} height={900} />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center sm:px-10">
        <Reveal>
          <p className="font-heading text-xs tracking-[0.4em] text-steel">10 — {locale === "ar" ? "ابدأ الآن" : locale === "tr" ? "BAŞLA" : "BEGIN"}</p>
          <h2 className="font-heading text-balance mt-6 text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? "كل بطل بدأ بخطوة أولى." : locale === "tr" ? "Her şampiyon ilk adımla başladı." : "Every champion started with a first step."}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={localePath(locale, "/registration")} variant="primary">
              {dict.common.bookTrial}
            </ButtonLink>
            <ExternalButtonLink href={buildWhatsappLink(message)} target="_blank" rel="noopener noreferrer" variant="outline">
              {dict.common.whatsappContact}
            </ExternalButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
