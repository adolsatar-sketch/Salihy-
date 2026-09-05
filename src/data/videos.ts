import type { Bi } from "@/lib/utils";

export type VideoCategory = "fights" | "tournaments" | "training" | "behind";

export type VideoItem = {
  id: string;
  title: Bi;
  description: Bi;
  category: VideoCategory;
  poster: string;
  posterAlt: Bi;
  sources: { src: string; type: "video/mp4" | "video/webm" }[];
};

// No raw video footage has been supplied yet. The Videos page is fully
// wired to render this list the moment real, non-stock clips are added —
// intentionally left empty rather than filled with placeholder or stock
// footage. Add entries here as MP4/WebM files land in /public/assets/videos.
export const videos: VideoItem[] = [];

export const videoCategoryLabels: Record<VideoCategory, Bi> = {
  fights: { ar: "النزالات", en: "Fights" },
  tournaments: { ar: "البطولات", en: "Tournaments" },
  training: { ar: "التدريب", en: "Training" },
  behind: { ar: "خلف الكواليس", en: "Behind the Scenes" },
};
