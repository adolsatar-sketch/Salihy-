import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/data/site";

export type Bi = {
  ar: string;
  en: string;
};

export function t(locale: Locale, value: Bi): string {
  return value[locale];
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function swapLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  segments[1] = target;
  return segments.join("/") || `/${target}`;
}

export function buildAlternates(locale: Locale, path: string) {
  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages: {
      ar: `${SITE_URL}${localePath("ar", path)}`,
      en: `${SITE_URL}${localePath("en", path)}`,
    },
  };
}
