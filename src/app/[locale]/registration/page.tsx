import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { buildAlternates } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { KineticBelt } from "@/components/motion/KineticBelt";
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
          {/* The belt ties off here — commitment made visible, not just
              implied by the form beneath it. */}
          <Reveal delay={0.15} className="mx-auto mt-8 h-14 w-48 text-active/80 sm:h-16 sm:w-56">
            <KineticBelt
              d="M -5 30 L 22 30 C 12 16, 32 8, 40 20 C 48 32, 32 42, 26 34 C 22 28, 30 22, 36 28 C 42 34, 38 44, 28 44 L 105 30"
              viewBox="0 0 100 60"
              strokeWidth={1.8}
              className="h-full w-full"
            />
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
