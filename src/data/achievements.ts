import type { Bi } from "@/lib/utils";

export type MedalTier = "gold" | "silver" | "bronze" | "participation";
export type AchievementScope = "individual" | "team";
export type AchievementRegion = "inside" | "outside";
export type AchievementSubject = "coach" | "student";

export type Achievement = {
  id: string;
  year: string;
  tournament: Bi;
  place: Bi;
  category: Bi;
  result: Bi;
  medal: MedalTier;
  scope: AchievementScope;
  region: AchievementRegion;
  subject: AchievementSubject;
  note: Bi;
  image: string;
};

// Every entry below is grounded in real academy photography. Where a detail
// (exact year, precise placing, or category) is not legible or confirmed,
// it is intentionally left as an editable placeholder rather than invented.
export const achievements: Achievement[] = [
  {
    id: "ach-saffron-karabuk",
    year: "[السنة]",
    tournament: {
      ar: "البطولة الدولية الأولى للزعفران للكيوكوشنكاي",
      en: "1st International Saffron Kyokushin Championship",
    },
    place: { ar: "كارابوك، تركيا", en: "Karabük, Turkey" },
    category: { ar: "[الفئة العمرية]", en: "[Age Category]" },
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
    year: "[السنة]",
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
    year: "[السنة]",
    tournament: { ar: "[اسم البطولة المحلية]", en: "[Local Tournament Name]" },
    place: { ar: "بغداد، العراق", en: "Baghdad, Iraq" },
    category: { ar: "[الفئة العمرية]", en: "[Age Category]" },
    result: { ar: "المركز الثاني", en: "2nd Place" },
    medal: "silver",
    scope: "individual",
    region: "inside",
    subject: "student",
    note: {
      ar: "ثنائي من لاعبي الأكاديمية يحتفلان بالوصول إلى منصة التتويج معًا.",
      en: "Two academy athletes celebrating reaching the podium together.",
    },
    image: "/assets/gallery/gallery-02.jpg",
  },
  {
    id: "ach-team-podium-sweep",
    year: "[السنة]",
    tournament: { ar: "[اسم البطولة المحلية]", en: "[Local Tournament Name]" },
    place: { ar: "بغداد، العراق", en: "Baghdad, Iraq" },
    category: { ar: "[الفئة العمرية]", en: "[Age Category]" },
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

export type CounterStat = {
  value: string;
  label: Bi;
};

// Placeholder counters — replace `value` with confirmed totals. Kept as
// strings so a placeholder like "[العدد]" can be dropped in safely.
export const counterStats: CounterStat[] = [
  { value: "[العدد]", label: { ar: "بطولة محلية", en: "Local Tournaments" } },
  { value: "[العدد]", label: { ar: "مشاركة دولية", en: "International Participations" } },
  { value: "[العدد]", label: { ar: "ميدالية ذهبية", en: "Gold Medals" } },
  { value: "[العدد]", label: { ar: "لاعب مسجّل", en: "Registered Athletes" } },
];
