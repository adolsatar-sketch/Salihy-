import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { PageHero } from "@/components/ui/PageHero";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import { newsPosts } from "@/data/news";
import { t, localePath, buildAlternates } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "الأخبار | أكاديمية صالحي" : locale === "tr" ? "Haberler | Salihy Akademisi" : "News | Salihy Academy";
  const description = locale === "ar" ? "آخر أخبار أكاديمية صالحي." : locale === "tr" ? "Salihy Akademisi'nden en son haberler." : "The latest news from Salihy Academy.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/news"),
    openGraph: { title, description },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <PageHero number="09" eyebrow={locale === "ar" ? "الأخبار" : locale === "tr" ? "HABERLER" : "NEWS"} title={locale === "ar" ? "آخر أخبار الأكاديمية" : locale === "tr" ? "Akademiden Son Haberler" : "The Academy's Latest"} />

      {newsPosts.length > 0 && (
        <section className="relative bg-obsidian/92 py-16 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:px-10 md:grid-cols-2">
            {newsPosts.map((post) => (
              <TransitionLink key={post.slug} href={localePath(locale, `/news/${post.slug}`)} className="group block" data-cursor-hover>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={t(locale, post.imageAlt)}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-xs tracking-wide text-steel">{post.date}</p>
                <h2 className="font-heading mt-2 text-xl text-bone group-hover:text-active sm:text-2xl">{t(locale, post.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-steel">{t(locale, post.excerpt)}</p>
              </TransitionLink>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
