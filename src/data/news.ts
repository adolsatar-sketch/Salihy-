import type { Bi } from "@/lib/utils";

export type NewsPost = {
  slug: string;
  date: string;
  title: Bi;
  excerpt: Bi;
  body: Bi[];
  image: string;
  imageAlt: Bi;
};

// Empty until the academy has real, confirmed news to publish. An article
// must never be written without real information behind it. See
// CONTENT_NEEDED.md.
export const newsPosts: NewsPost[] = [];
