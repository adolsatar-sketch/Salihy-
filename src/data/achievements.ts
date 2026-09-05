import type { Bi } from "@/lib/utils";

export type MedalTier = "gold" | "silver" | "bronze" | "participation";
export type AchievementScope = "individual" | "team";
export type AchievementRegion = "inside" | "outside";
export type AchievementSubject = "coach" | "student";

export type Achievement = {
  id: string;
  // Undefined fields are simply not rendered anywhere — never shown as a
  // bracketed placeholder. Fill them in once confirmed.
  year?: string;
  tournament?: Bi;
  place: Bi;
  category?: Bi;
  result: Bi;
  medal: MedalTier;
  scope: AchievementScope;
  region: AchievementRegion;
  subject: AchievementSubject;
  note: Bi;
  image: string;
};

// Every entry is grounded in real academy photography. Tournament names and
// host cities visible on banners/flags in the photo itself are recorded as
// fact; anything not legible or confirmed (exact year, precise age category,
// an unbannered local tournament's name) is left undefined rather than
// invented or shown as "[placeholder]".
export const achievements: Achievement[] = [
  {
    id: "ach-saffron-karabuk",
    tournament: {
      ar: "البطولة الدولية الأولى للزعفران للكيوكوشنكاي",
      en: "1st International Saffron Kyokushin Championship",
    },
    place: { ar: "كارابوك، تركيا", en: "Karabük, Turkey" },
    result: { ar: "المركز الأول", en: "1st Place" },
    medal: "gold",
    scope: "individual",
    region: "outside",
    subject: "student",
    note: {
      ar: "تمثيل العراق على منصة التتويج في بطولة دولية استضافتها مدينة كارابوك التركية.",
      en: "Representing Iraq on the podium at an international championship hosted in Karabük, Turkey.",
    },
    image: "/assets/gallery/gallery-05.jpg",
  },
  {
    id: "ach-budokaido-tokat",
    tournament: {
      ar: "بطولة بودوكايدو بين المحافظات — توكات",
      en: "Budokaido Inter-Provincial Championship — Tokat",
    },
    place: { ar: "توكات، تركيا", en: "Tokat, Turkey" },
    category: { ar: "فئات متعددة", en: "Multiple Categories" },
    result: { ar: "المركز الأول والمركز الثالث", en: "1st Place & 3rd Place" },
    medal: "gold",
    scope: "team",
    region: "outside",
    subject: "student",
    note: {
      ar: "مشاركة جماعية ضمّت لاعبين من فئات عمرية مختلفة، بإشراف الاتحاد التركي للووشو كونغ فو.",
      en: "A group participation spanning several age categories, held under the Turkish Wushu Kung-Fu Federation.",
    },
    image: "/assets/gallery/gallery-06.jpg",
  },
  {
    id: "ach-local-second",
    place: { ar: "بغداد، العراق", en: "Baghdad, Iraq" },
    result: { ar: "المركز الثاني", en: "2nd Place" },
    medal: "silver",
    scope: "individual",
    region: "inside",
    subject: "student",
    note: {
      ar: "ثنائي من لاعبي الأكاديمية يحتفلان بالوصول إلى منصة التتويج معًا في بطولة محلية.",
      en: "Two academy athletes celebrating reaching the podium together at a local championship.",
    },
    image: "/assets/gallery/gallery-02.jpg",
  },
  {
    id: "ach-team-podium-sweep",
    place: { ar: "بغداد، العراق", en: "Baghdad, Iraq" },
    result: { ar: "المراكز الأول حتى الرابع", en: "1st through 4th Place" },
    medal: "gold",
    scope: "team",
    region: "inside",
    subject: "student",
    note: {
      ar: "فريق الأكاديمية يتصدّر منصة التتويج بالكامل في إحدى البطولات المحلية.",
      en: "The academy's team sweeping the entire podium at a local championship.",
    },
    image: "/assets/gallery/gallery-08.jpg",
  },
];

export const medalLabel: Record<MedalTier, Bi> = {
  gold: { ar: "ذهبية", en: "Gold" },
  silver: { ar: "فضية", en: "Silver" },
  bronze: { ar: "برونزية", en: "Bronze" },
  participation: { ar: "مشاركة", en: "Participation" },
};

// A short, honest headline for any achievement — its real tournament name
// when known, otherwise its confirmed location. Never a placeholder token.
export function achievementHeadline(a: Achievement, locale: "ar" | "en"): string {
  if (a.tournament) return a.tournament[locale];
  return a.place[locale];
}
