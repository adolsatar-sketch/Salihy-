import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";
import { newsPosts } from "@/data/news";
import { Reveal } from "@/components/ui/Reveal";
import { t, buildAlternates } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) => newsPosts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${t(locale, post.title)} | ${locale === "ar" ? "أكاديمية صالحي" : "Salihy Academy"}`,
    description: t(locale, post.excerpt),
    alternates: buildAlternates(locale, `/news/${slug}`),
    openGraph: { title: t(locale, post.title), description: t(locale, post.excerpt) },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="relative bg-obsidian/92 pb-24 pt-40">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <Reveal>
          <p className="text-xs tracking-wide text-steel">{post.date}</p>
          <h1 className="font-heading text-balance mt-4 text-3xl text-bone sm:text-4xl md:text-5xl">{t(locale, post.title)}</h1>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden">
            <Image src={post.image} alt={t(locale, post.imageAlt)} fill sizes="800px" className="object-cover" priority />
          </div>
        </Reveal>

        <div className="mt-10 space-y-5">
          {post.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-base leading-relaxed text-steel sm:text-lg">{t(locale, paragraph)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
