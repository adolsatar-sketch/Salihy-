"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { localeDirection } from "@/i18n/config";

export function LocaleAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDirection[locale];
  }, [locale]);

  return null;
}
