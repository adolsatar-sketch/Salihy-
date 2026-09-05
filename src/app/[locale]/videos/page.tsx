import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
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
      <section className="relative bg-obsidian pb-4 pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">08 — {locale === "ar" ? "الفيديوهات" : "VIDEOS"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "الحركة لا تُختصر بالصورة" : "Motion Beyond the Still Frame"}
            </h1>
          </Reveal>
        </div>
      </section>

      {videos.length > 0 ? (
        <VideoGrid locale={locale} />
      ) : (
        <section className="relative bg-obsidian py-20 sm:py-28">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center sm:px-10">
            <Reveal>
              <div className="flex flex-col items-center gap-6">
                <Image src="/assets/logo/logo-mark.png" alt="" width={80} height={80} className="opacity-50" />
                <p className="text-sm leading-relaxed text-steel">
                  {locale === "ar"
                    ? "مقاطع الفيديو قيد الإعداد وستُنشر هنا قريبًا. تابع أحدث اللقطات حاليًا عبر حساب الأكاديمية على إنستغرام."
                    : "Video content is in preparation and will be published here soon. Follow the academy's Instagram for the latest footage in the meantime."}
                </p>
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
