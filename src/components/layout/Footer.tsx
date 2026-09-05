import Image from "next/image";
import { TransitionLink } from "@/components/transitions/TransitionLink";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { primaryRoutes } from "@/lib/routes";
import { t, localePath } from "@/lib/utils";
import { academyName, tagline } from "@/data/academy";
import { address } from "@/data/contact";
import { INSTAGRAM_URL, buildWhatsappLink, WHATSAPP_ENABLED } from "@/data/site";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-bone/10 bg-obsidian px-6 pb-10 pt-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="relative h-10 w-10">
                <Image src="/assets/logo/logo.png" alt={dict.meta.siteName} fill sizes="40px" className="object-contain" />
              </span>
              <span className="font-heading text-lg tracking-[0.25em] text-bone">SALIHY</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-steel">{t(locale, tagline)}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {primaryRoutes.slice(0, 8).map((route) => (
              <TransitionLink
                key={route.path}
                href={localePath(locale, `/${route.path}`)}
                className="text-steel transition-colors hover:text-bone"
              >
                {t(locale, route.label)}
              </TransitionLink>
            ))}
          </div>

          <div className="text-sm text-steel">
            <p>{t(locale, address)}</p>
            <div className="mt-3 flex gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                Instagram
              </a>
              {WHATSAPP_ENABLED && (
                <a
                  href={buildWhatsappLink(locale === "ar" ? "السلام عليكم" : locale === "tr" ? "Merhaba" : "Hello")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-bone/10 pt-6 text-xs text-steel/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{t(locale, academyName)}</p>
          <p>© {new Date().getFullYear()} — {locale === "ar" ? "جميع الحقوق محفوظة" : locale === "tr" ? "Tüm hakları saklıdır" : "All rights reserved"}</p>
        </div>
      </div>
    </footer>
  );
}
