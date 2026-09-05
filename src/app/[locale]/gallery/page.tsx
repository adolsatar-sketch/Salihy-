import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "معرض الصور | أكاديمية صالحي" : "Photo Gallery | Salihy Academy";
  const description =
    locale === "ar"
      ? "معرض صور أكاديمية صالحي: المسيرة، النزالات، البطولات، الكؤوس، الطلاب وخلف الكواليس."
      : "Salihy Academy's photo gallery: the legacy, fights, tournaments, trophies, students and behind the scenes.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/gallery"),
    openGraph: { title, description },
  };
}

export default async function GalleryPage({
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
            <p className="font-heading text-xs tracking-[0.4em] text-steel">07 — {locale === "ar" ? "الصور" : "GALLERY"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "أرشيف بصري حي" : "A Living Visual Archive"}
            </h1>
          </Reveal>
        </div>
      </section>
      <GalleryExplorer locale={locale} />
    </>
  );
}
