import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalButtonLink } from "@/components/ui/Button";
import { videos } from "@/data/videos";
import { INSTAGRAM_URL } from "@/data/site";
import { VideoGrid } from "@/components/videos/VideoGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "الفيديوهات | أكاديمية صالحي" : "Videos | Salihy Academy";
  const description =
    locale === "ar"
      ? "لقطات فيديو من تدريبات ونزالات وبطولات أكاديمية صالحي."
      : "Video footage from Salihy Academy's training, fights, and tournaments.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/videos"),
    openGraph: { title, description },
  };
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <PageHero number="08" eyebrow={locale === "ar" ? "الفيديوهات" : "VIDEOS"} title={locale === "ar" ? "الحركة لا تُختصر بالصورة" : "Motion Beyond the Still Frame"} />

      {videos.length > 0 ? (
        <VideoGrid locale={locale} />
      ) : (
        <section className="relative bg-obsidian/92 py-20 sm:py-28">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center sm:px-10">
            <Reveal>
              <div className="flex flex-col items-center gap-6">
                <Image src="/assets/logo/logo-mark.png" alt="" width={80} height={80} className="opacity-50" />
                <ExternalButtonLink href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" variant="outline">
                  Instagram
                </ExternalButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
