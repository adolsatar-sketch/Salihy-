import type { Bi } from "@/lib/utils";

export const address: Bi = {
  ar: "بغداد – الصليخ – شارع الـ600 – مقابل الكوخ",
  en: "Baghdad – Al-Sulaikh – 600 Street – Opposite Al-Koukh",
  tr: "Bağdat – Al-Sulaikh – 600. Cadde – Al-Koukh Karşısı",
};

export const mapQuery = "Al-Sulaikh, 600 Street, Baghdad, Iraq";

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  mapQuery
)}&output=embed`;

export const mapLinkSrc = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapQuery
)}`;

export type ScheduleDay = {
  day: Bi;
  hours: Bi;
};

// Empty until the academy confirms real training days and hours. See
// CONTENT_NEEDED.md.
export const trainingDays: ScheduleDay[] = [];

export const generalNote: Bi = {
  ar: "مواعيد كل فئة عمرية أو برنامج تُحدَّد مع المدرب عند التسجيل.",
  en: "Exact class times per age group or program are confirmed with the coach upon registration.",
  tr: "Her yaş grubu veya program için ders saatleri, kayıt sırasında antrenörle birlikte belirlenir.",
};
