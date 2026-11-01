import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Add new routes here as they appear.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
