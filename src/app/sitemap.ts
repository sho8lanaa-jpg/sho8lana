import type { MetadataRoute } from "next";
import { GOVERNORATES } from "@/lib/governorates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sho8lana.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/search`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/favorites`, changeFrequency: "weekly", priority: 0.3 },
    { url: `${siteUrl}/history`, changeFrequency: "weekly", priority: 0.3 },
  ];

  const governorateRoutes: MetadataRoute.Sitemap = GOVERNORATES.map((gov) => ({
    url: `${siteUrl}/search?gov=${gov.value}`,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [...staticRoutes, ...governorateRoutes];
}
