import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { allRoutes } from "@/lib/routes";
import { newsPosts } from "@/data/news";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of allRoutes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path ? `/${route.path}` : ""}`,
        changeFrequency: "weekly",
        priority: route.path === "" ? 1 : 0.7,
      });
    }
    for (const post of newsPosts) {
      entries.push({
        url: `${SITE_URL}/${locale}/news/${post.slug}`,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
