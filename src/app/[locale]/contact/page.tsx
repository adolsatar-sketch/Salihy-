import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExternalButtonLink } from "@/components/ui/Button";
import { t, buildAlternates } from "@/lib/utils";
import { address, mapEmbedSrc, mapLinkSrc, trainingDays, generalNote } from "@/data/contact";
import { weeklySlots, scheduleNote } from "@/data/schedule";
import { INSTAGRAM_URL, buildWhatsappLink, WHATSAPP_ENABLED } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "التواصل والموقع | أكاديمية صالحي" : locale === "tr" ? "İletişim ve Konum | Salihy Akademisi" : "Contact & Location | Salihy Academy";
  const description =
    locale === "ar"
      ? "تواصل مع أكاديمية صالحي للكيوكوشنكاي في بغداد – الصليخ، واطّلع على جدول التدريب والموقع على الخريطة."
      : locale === "tr"
        ? "Bağdat – Al-Sulaikh'te bulunan Salihy Kyokushin Akademisi ile iletişime geçin ve antrenman programı ile harita konumunu görün."
        : "Contact Salihy Kyokushin Academy in Baghdad – Al-Sulaikh, and see the training schedule and map location.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/contact"),
    openGraph: { title, description },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: t(locale, { ar: "أكاديمية صالحي للكيوكوشنكاي", en: "Salihy Kyokushin Academy", tr: "Salihy Kyokushin Akademisi" }),
    address: {
      "@type": "PostalAddress",
      streetAddress: "600 Street, Al-Sulaikh",
      addressLocality: "Baghdad",
      addressCountry: "IQ",
    },
    sameAs: [INSTAGRAM_URL],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero number="12" eyebrow={locale === "ar" ? "التواصل" : locale === "tr" ? "İLETİŞİM" : "CONTACT"} title={locale === "ar" ? "تعال إلى الصالة" : locale === "tr" ? "Dojoya Gel" : "Come to the Dojo"} />

      <section className="relative bg-obsidian/92 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 md:grid-cols-2">
          <Reveal className="min-w-0">
            <SectionLabel number="—" title={dict.common.addressLabel} />
            <p className="mt-4 text-xl text-bone">{t(locale, address)}</p>

            {trainingDays.length > 0 && (
              <>
                <SectionLabel number="—" title={dict.common.scheduleLabel} className="mt-10" />
                <ul className="mt-4 space-y-2 text-sm text-steel">
                  {trainingDays.map((day) => (
                    <li key={t(locale, day.day)} className="flex justify-between gap-4 border-b border-bone/10 py-2">
                      <span>{t(locale, day.day)}</span>
                      <span>{t(locale, day.hours)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-steel/70">{t(locale, generalNote)}</p>
              </>
            )}

            {weeklySlots.length > 0 && (
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-bone/15 text-start text-steel">
                      <th className="py-2 text-start font-normal">{locale === "ar" ? "الأيام" : locale === "tr" ? "Günler" : "Days"}</th>
                      <th className="py-2 text-start font-normal">{locale === "ar" ? "الوقت" : locale === "tr" ? "Saat" : "Time"}</th>
                      <th className="py-2 text-start font-normal">{locale === "ar" ? "الفئة" : locale === "tr" ? "Grup" : "Group"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklySlots.map((slot, i) => (
                      <tr key={i} className="border-b border-bone/5 text-bone">
                        <td className="py-2 pe-4">{t(locale, slot.day)}</td>
                        <td className="py-2 pe-4">{t(locale, slot.timeRange)}</td>
                        <td className="py-2">{t(locale, slot.group)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-xs leading-relaxed text-steel/70">{t(locale, scheduleNote)}</p>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              {WHATSAPP_ENABLED && (
                <ExternalButtonLink
                  href={buildWhatsappLink(locale === "ar" ? "السلام عليكم" : locale === "tr" ? "Merhaba" : "Hello")}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  {dict.common.whatsappContact}
                </ExternalButtonLink>
              )}
              <ExternalButtonLink
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant={WHATSAPP_ENABLED ? "outline" : "primary"}
              >
                Instagram
              </ExternalButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-bone/10 sm:aspect-square">
              <iframe
                title={locale === "ar" ? "خريطة موقع الأكاديمية" : locale === "tr" ? "Akademi konum haritası" : "Academy location map"}
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale invert-[0.92] contrast-[0.9]"
              />
            </div>
            <a
              href={mapLinkSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-steel underline-offset-4 hover:text-bone hover:underline"
            >
              {locale === "ar" ? "فتح في خرائط جوجل" : locale === "tr" ? "Google Haritalar'da Aç" : "Open in Google Maps"}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
