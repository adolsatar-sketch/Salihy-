import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { LocaleAttributes } from "@/components/layout/LocaleAttributes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { TransitionProvider } from "@/components/transitions/TransitionProvider";
import { IntroSplash } from "@/components/transitions/IntroSplash";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/data/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.siteName,
    description:
      locale === "ar"
        ? "أكاديمية صالحي للكيوكوشنكاي في بغداد — تدريب احترافي، انضباط، ثقة وصناعة أبطال لجميع الأعمار."
        : "Salihy Kyokushin Academy in Baghdad — professional training, discipline, confidence and champion-building for all ages.",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: dict.meta.siteName,
      siteName: dict.meta.siteName,
      locale: locale === "ar" ? "ar_IQ" : "en_US",
      type: "website",
      images: ["/assets/logo/logo-full.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>
        <LocaleAttributes locale={locale} />
        <IntroSplash locale={locale} />
        <div id="site-content" className="relative">
          <Header locale={locale} />
          <main className="relative">{children}</main>
          <Footer locale={locale} />
          <WhatsAppButton locale={locale} />
        </div>
        <CustomCursor />
        <div className="grain-layer" />
      </TransitionProvider>
    </MotionConfig>
  );
}
