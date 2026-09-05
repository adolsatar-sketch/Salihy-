"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function BeginningChapter({ locale }: { locale: Locale }) {
  return (
    <section className="relative bg-charcoal/92 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
        <div>
          <SectionLabel number="01" title={locale === "ar" ? "البداية" : locale === "tr" ? "BAŞLANGIÇ" : "THE BEGINNING"} />
          <Reveal className="mt-6" delay={0.05}>
            <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
              {locale === "ar" ? "قبل الأكاديمية… كانت هناك سنوات" : locale === "tr" ? "Akademiden önce… yıllar vardı" : "Before the academy, there were years"}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-steel sm:text-base">
              {locale === "ar"
                ? "قبل أن يصبح هناك أكاديمية، كانت هناك سنوات من التدريب، النزالات، الانتصارات، الخسارات والانضباط."
                : locale === "tr"
                  ? "Bir akademi olmadan önce, yıllarca antrenman, mücadele, zaferler, yenilgiler ve disiplin vardı."
                  : "Before there was an academy, there were years of training, fights, wins, losses, and discipline."}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40}>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 border border-active/30 sm:-inset-6" />
            <figure className="relative aspect-[4/5] w-full max-w-sm overflow-hidden sm:max-w-md md:ms-auto">
              <Image
                src="/assets/gallery/gallery-04.jpg"
                alt={
                  locale === "ar"
                    ? "صورة أرشيفية قديمة للاعبين يتدربان على القتال، أحدهما يرتدي حزامًا أخضر"
                    : locale === "tr"
                      ? "Biri yeşil kuşak takan iki sporcunun idman yaptığı arşiv fotoğrafı"
                      : "Archival photo of two athletes sparring, one wearing a green belt"
                }
                fill
                sizes="(min-width: 768px) 420px, 90vw"
                className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                style={{ filter: "grayscale(0.85) contrast(1.05)" }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-blood mix-blend-color"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.35 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
              <figcaption className="absolute bottom-3 start-3 font-heading text-[10px] tracking-[0.3em] text-bone/80">
                ARCHIVE 01 — [{locale === "ar" ? "السنة" : locale === "tr" ? "YIL" : "YEAR"}]
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
