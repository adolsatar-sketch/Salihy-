import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";
import { programs, type ProgramSlug } from "@/data/programs";
import { t, buildAlternates } from "@/lib/utils";
import { ProgramTemplate } from "@/components/programs/ProgramTemplate";

export function generateStaticParams() {
  return locales.flatMap((locale) => programs.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};

  const title = `${t(locale, program.title)} | ${locale === "ar" ? "أكاديمية صالحي" : locale === "tr" ? "Salihy Akademisi" : "Salihy Academy"}`;
  return {
    title,
    description: t(locale, program.summary),
    alternates: buildAlternates(locale, `/programs/${slug}`),
    openGraph: { title, description: t(locale, program.summary) },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const program = programs.find((p) => p.slug === (slug as ProgramSlug));
  if (!program) notFound();

  return <ProgramTemplate program={program} locale={locale} />;
}
