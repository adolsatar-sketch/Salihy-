import { Alexandria, IBM_Plex_Sans_Arabic, Oswald, Inter } from "next/font/google";

export const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-alexandria",
  display: "swap",
});

export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

// latin-ext is required for Turkish characters (ç ğ ı İ ö ş ü) — without
// it, next/font only fetches Basic Latin glyphs and Turkish text silently
// falls back to a system font mid-word.
export const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = `${alexandria.variable} ${ibmPlexArabic.variable} ${oswald.variable} ${inter.variable}`;
