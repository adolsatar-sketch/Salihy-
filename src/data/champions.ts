import type { Bi } from "@/lib/utils";

export type Champion = {
  slug: string;
  name?: Bi;
  age?: string;
  belt?: Bi;
  tournament?: Bi;
  result?: Bi;
  participations?: string;
  image: string;
  imageAlt: Bi;
  story?: Bi;
};

// Empty until the academy confirms real athlete profiles. A player's name,
// age, belt, tournament, or result must never be inferred from a photo —
// only entered here once the owner provides it directly. See
// CONTENT_NEEDED.md.
export const champions: Champion[] = [];
