import type { Bi } from "@/lib/utils";

export type ScheduleSlot = {
  day: Bi;
  timeRange: Bi;
  group: Bi;
};

// Empty until the academy confirms the real weekly schedule per age
// group. No day, time, or group breakdown is invented here. See
// CONTENT_NEEDED.md.
export const weeklySlots: ScheduleSlot[] = [];

export const scheduleNote: Bi = {
  ar: "تُحدَّد مواعيد الحصص بحسب الفئة العمرية والمستوى مع المدرب عند التسجيل.",
  en: "Class times are confirmed with the coach based on age group and level upon registration.",
  tr: "Ders saatleri, kayıt sırasında yaş grubu ve seviyeye göre antrenörle birlikte belirlenir.",
};
