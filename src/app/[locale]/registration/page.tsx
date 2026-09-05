import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
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
      <section className="relative bg-obsidian pb-4 pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-heading text-xs tracking-[0.4em] text-steel">11 — {locale === "ar" ? "التسجيل" : "REGISTRATION"}</p>
            <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">
              {locale === "ar" ? "كل بطل بدأ بخطوة أولى" : "Every Champion Started With a First Step"}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-obsidian py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-10">
          <RegistrationForm locale={locale} />
        </div>
      </section>
    </>
  );
}
