import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const title = locale === "ar" ? "التسجيل | أكاديمية صالحي" : "Registration | Salihy Academy";
  const description =
    locale === "ar"
      ? "سجّل الآن في أكاديمية صالحي للكيوكوشنكاي واحجز حصتك التجريبية."
      : "Register now at Salihy Kyokushin Academy and book your trial class.";
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/registration"),
    openGraph: { title, description },
  };
}

export default async function RegistrationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <>
      <PageHero
        number="11"
        eyebrow={locale === "ar" ? "التسجيل" : "REGISTRATION"}
        title={locale === "ar" ? "كل بطل بدأ بخطوة أولى" : "Every Champion Started With a First Step"}
      />

      <section className="relative bg-obsidian/92 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-10">
          <RegistrationForm locale={locale} />
        </div>
      </section>
    </>
  );
}
