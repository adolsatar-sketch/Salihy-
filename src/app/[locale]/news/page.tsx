import type { Metadata } from "next";
import Image from "next/image";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
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
  const title = locale === "ar" ? "الأخبار والبطولات | أكاديمية صالحي" : "News & Tournaments | Salihy Academy";
  const description =
    locale === "ar"
      ? "آخر أخبار أكاديمية صالحي ونتائج البطولات المحلية والدولية."
      : "The latest news from Salihy Academy and results from local and international tournaments.";
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
      <section className="relative bg-obsidian pb-4 pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">09 — {locale === "ar" ? "الأخبار" : "NEWS"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "آخر أخبار الأكاديمية" : "The Academy's Latest"}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-obsidian py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:px-10 md:grid-cols-2">
          {newsPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <TransitionLink href={localePath(locale, `/news/${post.slug}`)} className="group block" data-cursor-hover>
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
                <h2 className="font-heading mt-2 text-xl text-bone group-hover:text-active sm:text-2xl">
                  {t(locale, post.title)}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-steel">{t(locale, post.excerpt)}</p>
              </TransitionLink>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
