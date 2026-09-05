export const locales = ["ar", "en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
  tr: "ltr",
};

export const localeLabel: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  tr: "Türkçe",
};

export const localeShortLabel: Record<Locale, string> = {
  ar: "AR",
  en: "EN",
  tr: "TR",
};
