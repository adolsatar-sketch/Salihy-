"use client";

import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { localePath } from "@/lib/utils";

export function CoachTransitionChapter({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-obsidian/92 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionLabel number="04" title={locale === "ar" ? "من لاعب إلى مدرب" : locale === "tr" ? "SPORCUDAN ANTRENÖRE" : "FROM FIGHTER TO COACH"} />

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <h2 className="font-heading text-balance text-3xl leading-tight text-bone sm:text-4xl md:text-5xl">
              {locale === "ar" ? (
                <>
                  الإنجاز الحقيقي ليس الكأس الذي تحمله…
                  <br />
                  <span className="text-active">بل البطل الذي تساعده على الوصول إليه.</span>
                </>
              ) : locale === "tr" ? (
                <>
                  Gerçek başarı elinde tuttuğun kupa değil…
                  <br />
                  <span className="text-active">ona ulaşmasına yardım ettiğin şampiyondur.</span>
                </>
              ) : (
                <>
                  The real achievement isn&apos;t the trophy you hold…
                  <br />
                  <span className="text-active">it&apos;s the champion you help reach it.</span>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-steel sm:text-base">
              {locale === "ar"
                ? "من نزالاته الشخصية إلى منصات تتويج أطفاله ولاعبيه، تحوّلت سنوات الخبرة إلى منهج تدريبي كامل."
                : locale === "tr"
                  ? "Kendi mücadelelerinden öğrencilerinin podyumlarına uzanan yıllar, tam bir antrenman yöntemine dönüştü."
                  : "From his own fights to the podiums of his students, years of experience became a complete training method."}
            </p>
            <div className="mt-8">
              <ButtonLink href={localePath(locale, "/coach")} variant="outline">
                {locale === "ar" ? "قصة المدرب الكاملة" : locale === "tr" ? "Antrenörün Tüm Hikayesi" : "The Coach's Full Story"}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            <Reveal delay={0.05} className="col-span-2">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/assets/gallery/gallery-06.jpg"
                  alt={
                    locale === "ar"
                      ? "أربعة لاعبين من بينهم طفل يقفون على منصة التتويج حاملين كؤوسًا وميداليات"
                      : locale === "tr"
                        ? "Aralarında bir çocuğun da bulunduğu dört sporcu, podyumda kupalar ve madalyalar tutuyor"
                        : "Four athletes, including a child, standing on the podium holding trophies and medals"
                  }
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/assets/gallery/gallery-07.jpg"
                  alt={
                    locale === "ar"
                      ? "مدرب يقف بجانب لاعب يحمل كأس بطولة"
                      : locale === "tr"
                        ? "Şampiyonluk kupası tutan bir sporcunun yanında duran antrenör"
                        : "A coach standing beside an athlete holding a championship trophy"
                  }
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/assets/gallery/gallery-08.jpg"
                  alt={
                    locale === "ar"
                      ? "أربعة لاعبين يقفون بجانب كؤوس المراكز الأربعة الأولى"
                      : locale === "tr"
                        ? "Dört podyum derecesi kupasının yanında duran dört sporcu"
                        : "Four athletes standing beside four podium-place trophies"
                  }
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
