"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";

export function DisciplineChapter({ locale }: { locale: Locale }) {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-obsidian/92 py-24">
      <div className="absolute inset-0">
        <Image
          src="/assets/gallery/gallery-01.jpg"
          alt={
            locale === "ar"
              ? "لاعب راكع على الأرض بزي أبيض وحزام أسود بانتظار نتيجة المباراة"
              : locale === "tr"
                ? "Beyaz gi ve siyah kuşakla minderde diz çökmüş, maç sonucunu bekleyen bir sporcu"
                : "An athlete kneeling on the mat in a white gi and black belt, awaiting the match result"
          }
          fill
          sizes="100vw"
          className="object-cover object-[30%_30%] opacity-50"
        />
        <div className="absolute inset-0 bg-obsidian/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-10">
        <Reveal>
          <p className="font-heading text-xs tracking-[0.4em] text-steel">
            {locale === "ar" ? "08 — الانضباط" : locale === "tr" ? "08 — DİSİPLİN" : "08 — DISCIPLINE"}
          </p>
          <h2 className="font-heading text-balance mt-6 text-3xl leading-snug text-bone sm:text-4xl md:text-5xl">
            {locale === "ar" ? (
              <>
                القوة ليست في الضربة وحدها.
                <br />
                القوة في السيطرة، الصبر، الاحترام والاستمرار.
              </>
            ) : locale === "tr" ? (
              <>
                Güç yalnızca vuruşta değildir.
                <br />
                Güç; kontrolde, sabırda, saygıda ve azimde saklıdır.
              </>
            ) : (
              <>
                Strength isn&apos;t only in the strike.
                <br />
                Strength is in control, patience, respect and persistence.
              </>
            )}
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
