import type { Bi } from "./utils";

export type ChapterNumber = string;

export type RouteEntry = {
  path: string;
  number: ChapterNumber;
  label: Bi;
  preview: string;
};

// Central route registry: header nav, the fullscreen menu, the footer, and
// the sitemap all read from this single list.
export const primaryRoutes: RouteEntry[] = [
  { path: "", number: "00", label: { ar: "الرئيسية", en: "Home" }, preview: "/assets/gallery/gallery-03.jpg" },
  { path: "coach", number: "01", label: { ar: "المدرب", en: "The Coach" }, preview: "/assets/gallery/gallery-07.jpg" },
  { path: "legacy", number: "02", label: { ar: "المسيرة", en: "Legacy" }, preview: "/assets/gallery/gallery-04.jpg" },
  { path: "achievements", number: "03", label: { ar: "الإنجازات", en: "Achievements" }, preview: "/assets/gallery/gallery-05.jpg" },
  { path: "academy", number: "04", label: { ar: "الأكاديمية", en: "The Academy" }, preview: "/assets/gallery/gallery-01.jpg" },
  { path: "programs", number: "05", label: { ar: "البرامج", en: "Programs" }, preview: "/assets/gallery/gallery-09.jpg" },
  { path: "champions", number: "06", label: { ar: "الأبطال", en: "Champions" }, preview: "/assets/gallery/gallery-06.jpg" },
  { path: "gallery", number: "07", label: { ar: "الصور", en: "Gallery" }, preview: "/assets/gallery/gallery-02.jpg" },
  { path: "videos", number: "08", label: { ar: "الفيديوهات", en: "Videos" }, preview: "/assets/gallery/gallery-10.jpg" },
  { path: "news", number: "09", label: { ar: "الأخبار", en: "News" }, preview: "/assets/gallery/gallery-08.jpg" },
  { path: "faq", number: "10", label: { ar: "الأسئلة الشائعة", en: "FAQ" }, preview: "/assets/gallery/gallery-01.jpg" },
  { path: "registration", number: "11", label: { ar: "التسجيل", en: "Registration" }, preview: "/assets/gallery/gallery-06.jpg" },
  { path: "contact", number: "12", label: { ar: "التواصل والموقع", en: "Contact & Location" }, preview: "/assets/gallery/gallery-09.jpg" },
];

export const programRoutes: RouteEntry[] = [
  { path: "programs/kids", number: "05.1", label: { ar: "الأطفال", en: "Kids" }, preview: "/assets/gallery/gallery-06.jpg" },
  { path: "programs/youth", number: "05.2", label: { ar: "الناشئون والشباب", en: "Youth" }, preview: "/assets/gallery/gallery-09.jpg" },
  { path: "programs/adults", number: "05.3", label: { ar: "البالغون", en: "Adults" }, preview: "/assets/gallery/gallery-03.jpg" },
  { path: "programs/women", number: "05.4", label: { ar: "النساء", en: "Women" }, preview: "/assets/gallery/gallery-01.jpg" },
  { path: "programs/competition-team", number: "05.5", label: { ar: "فريق البطولات", en: "Competition Team" }, preview: "/assets/gallery/gallery-08.jpg" },
  { path: "programs/study-sport", number: "05.6", label: { ar: "الدراسة والرياضة", en: "Study & Sport" }, preview: "/assets/gallery/gallery-09.jpg" },
  { path: "programs/training-system", number: "05.7", label: { ar: "نظام التدريب", en: "Training System" }, preview: "/assets/gallery/gallery-10.jpg" },
  { path: "programs/belt-journey", number: "05.8", label: { ar: "رحلة الأحزمة", en: "Belt Journey" }, preview: "/assets/gallery/gallery-01.jpg" },
];

export const allRoutes: RouteEntry[] = [...primaryRoutes, ...programRoutes];
