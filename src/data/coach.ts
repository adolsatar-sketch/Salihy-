import type { Bi } from "@/lib/utils";

// Every field below is optional/empty on purpose: none of this has been
// confirmed by the academy owner yet, so the page must render correctly
// with all of it missing. Never fill a field with a bracket placeholder
// like "[السنة]" or invented copy — leave it absent and let the page hide
// it. See CONTENT_NEEDED.md for the list of what to ask the owner for.
export const coachProfile: {
  fullName?: Bi;
  rankAndBelt?: Bi;
  yearsOfExperience?: Bi;
  portrait: string;
  portraitAlt: Bi;
} = {
  portrait: "/assets/gallery/gallery-07.jpg",
  portraitAlt: {
    ar: "مدرب أكاديمية صالحي يقف بزي الكيوكوشنكاي إلى جانب أحد اللاعبين حاملًا كأس بطولة",
    en: "Salihy Academy coach standing in Kyokushin gi beside an athlete holding a tournament trophy",
  },
};

// No real first-person quote has been provided — stays undefined until the
// academy supplies real words, never a placeholder or invented sentence.
export const philosophy: Bi | undefined = undefined;

export type CareerMilestone = {
  year?: string;
  title: Bi;
  description: Bi;
  image?: string;
};

// Empty until the academy confirms real milestones (dates, tournaments,
// the founding story). No entry here has ever been provided by the owner,
// so nothing is invented to fill the shape — the Legacy page must hide
// this section entirely when the array is empty.
export const careerTimeline: CareerMilestone[] = [];

// No real vision statement has been provided yet — undefined, not invented.
export const vision: Bi | undefined = undefined;
