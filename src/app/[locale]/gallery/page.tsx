import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
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
      <PageHero number="07" eyebrow={locale === "ar" ? "الصور" : "GALLERY"} title={locale === "ar" ? "أرشيف بصري حي" : "A Living Visual Archive"} />
      <GalleryExplorer locale={locale} />
    </>
  );
}
