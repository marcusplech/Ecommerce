import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/libs/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cart`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/checkout`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
