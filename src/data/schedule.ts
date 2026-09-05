import type { Bi } from "@/lib/utils";

export type ScheduleSlot = {
  day: Bi;
  timeRange: Bi;
  group: Bi;
};

// Indicative weekly structure within the academy's confirmed training days
// (Saturday, Monday, Wednesday — 2:00 PM to 10:00 PM). Exact slot boundaries
// per age group are placeholders to be confirmed and adjusted here once fixed.
export const weeklySlots: ScheduleSlot[] = [
  {
    day: { ar: "السبت، الاثنين، الأربعاء", en: "Saturday, Monday, Wednesday" },
    timeRange: { ar: "2:00 – 4:00 مساءً", en: "2:00 – 4:00 PM" },
    group: { ar: "الأطفال", en: "Kids" },
  },
  {
    day: { ar: "السبت، الاثنين، الأربعاء", en: "Saturday, Monday, Wednesday" },
    timeRange: { ar: "4:00 – 6:00 مساءً", en: "4:00 – 6:00 PM" },
    group: { ar: "الناشئون والشباب", en: "Youth" },
  },
  {
    day: { ar: "السبت، الاثنين، الأربعاء", en: "Saturday, Monday, Wednesday" },
    timeRange: { ar: "6:00 – 8:00 مساءً", en: "6:00 – 8:00 PM" },
    group: { ar: "النساء", en: "Women" },
  },
  {
    day: { ar: "السبت، الاثنين، الأربعاء", en: "Saturday, Monday, Wednesday" },
    timeRange: { ar: "8:00 – 10:00 مساءً", en: "8:00 – 10:00 PM" },
    group: { ar: "الرجال وفريق البطولات", en: "Men & Competition Team" },
  },
];

export const scheduleNote: Bi = {
  ar: "هذا التوزيع إرشادي ضمن أيام التدريب المؤكدة، ويُحدَّد نهائيًا مع المدرب بحسب الفئة العمرية والمستوى عند التسجيل.",
  en: "This layout is indicative within the confirmed training days, and is finalized with the coach based on age group and level upon registration.",
};
