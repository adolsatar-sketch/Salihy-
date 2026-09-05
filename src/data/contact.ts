import type { Bi } from "@/lib/utils";

export const address: Bi = {
  ar: "بغداد – الصليخ – شارع الـ600 – مقابل الكوخ",
  en: "Baghdad – Al-Sulaikh – 600 Street – Opposite Al-Koukh",
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

// Training days as referenced on the academy's Instagram account.
// Exact per-program class times are placeholders — adjust freely per program once confirmed.
export const trainingDays: ScheduleDay[] = [
  {
    day: { ar: "السبت", en: "Saturday" },
    hours: { ar: "2:00 – 10:00 مساءً", en: "2:00 PM – 10:00 PM" },
  },
  {
    day: { ar: "الاثنين", en: "Monday" },
    hours: { ar: "2:00 – 10:00 مساءً", en: "2:00 PM – 10:00 PM" },
  },
  {
    day: { ar: "الأربعاء", en: "Wednesday" },
    hours: { ar: "2:00 – 10:00 مساءً", en: "2:00 PM – 10:00 PM" },
  },
];

export const generalNote: Bi = {
  ar: "الجدول أعلاه يمثل أيام تواجد الأكاديمية العامة. مواعيد كل فئة عمرية أو برنامج ضمن هذا النطاق تُحدَّد مع المدرب عند التسجيل.",
  en: "The schedule above reflects the academy's general operating days. Exact class times per age group or program are confirmed with the coach upon registration.",
};
