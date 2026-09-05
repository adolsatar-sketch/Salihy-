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
  gold: { ar: "ذهبية", en: "Gold", tr: "Altın" },
  silver: { ar: "فضية", en: "Silver", tr: "Gümüş" },
  bronze: { ar: "برونزية", en: "Bronze", tr: "Bronz" },
  participation: { ar: "مشاركة", en: "Participation", tr: "Katılım" },
};
