import type { Bi } from "@/lib/utils";

export type MedalTier = "gold" | "silver" | "bronze" | "participation";
export type AchievementScope = "individual" | "team";
export type AchievementRegion = "inside" | "outside";
export type AchievementSubject = "coach" | "student";

export type Achievement = {
  id: string;
  year?: string;
  tournament?: Bi;
  place?: Bi;
  category?: Bi;
  result?: Bi;
  medal?: MedalTier;
  scope?: AchievementScope;
  region?: AchievementRegion;
  subject?: AchievementSubject;
  note?: Bi;
  image: string;
  imageAlt: Bi;
};

// Empty until the academy confirms real results. A tournament name,
// placement, medal color, or year must never be inferred from a photo
// (a banner, a medal color, a "1" on a podium block) — only entered here
// once the owner states it directly. See CONTENT_NEEDED.md.
export const achievements: Achievement[] = [];

export const medalLabel: Record<MedalTier, Bi> = {
  gold: { ar: "ذهبية", en: "Gold" },
  silver: { ar: "فضية", en: "Silver" },
  bronze: { ar: "برونزية", en: "Bronze" },
  participation: { ar: "مشاركة", en: "Participation" },
};

export function achievementHeadline(a: Achievement, locale: "ar" | "en"): string {
  if (a.tournament) return a.tournament[locale];
  if (a.place) return a.place[locale];
  return "";
}
