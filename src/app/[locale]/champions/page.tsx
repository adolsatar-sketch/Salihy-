import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { ChampionsGrid } from "@/components/champions/ChampionsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "الأبطال | أكاديمية صالحي" : "Champions | Salihy Academy";
  const description =
    locale === "ar"
      ? "تعرّف على أبطال أكاديمية صالحي الذين صعدوا منصات التتويج المحلية والدولية."
      : "Meet the Salihy Academy champions who reached local and international podiums.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/champions"),
    openGraph: { title, description },
  };
}

export default async function ChampionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <section className="relative bg-obsidian pb-4 pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">06 — {locale === "ar" ? "الأبطال" : "CHAMPIONS"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "جيل جديد يصعد المنصة" : "A New Generation Takes the Podium"}
            </h1>
          </Reveal>
        </div>
      </section>
      <ChampionsGrid locale={locale} />
    </>
  );
}
