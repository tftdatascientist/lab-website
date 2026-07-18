import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { services } from "@/content/services";
import {
  getAllTerms,
  getCategories as getSlownikCategories,
  getAllL2Pairs,
  getAllL3Slugs,
} from "@/lib/slownik";
import { getCategories, getAllGroups, getAllProcesses, isThinProcess, codeToSlug } from "@/lib/procesy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/wdrozenia`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/procesy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/slownik`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/o-nas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/polityka-prywatnosci`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/regulamin`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/wdrozenia/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const slownikKategorie: MetadataRoute.Sitemap = getSlownikCategories().map((c) => ({
    url: `${SITE_URL}/slownik/kategoria/${c.key}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const slownikL2: MetadataRoute.Sitemap = getAllL2Pairs().map(({ l1, l2 }) => ({
    url: `${SITE_URL}/slownik/kategoria/${l1}/${l2}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const slownikL3: MetadataRoute.Sitemap = getAllL3Slugs().map((l3) => ({
    url: `${SITE_URL}/slownik/grupa/${l3}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const slownikPages: MetadataRoute.Sitemap = getAllTerms().map((t) => ({
    url: `${SITE_URL}/slownik/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  const procesyPages: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${SITE_URL}/procesy/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const procesyGrupy: MetadataRoute.Sitemap = getAllGroups().map((g) => ({
    url: `${SITE_URL}/procesy/${g.categorySlug}/${codeToSlug(g.code)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const procesyProcesy: MetadataRoute.Sitemap = getAllProcesses()
    .filter((p) => !isThinProcess(p)) // thin (noindex) procesy poza sitemap
    .map((p) => ({
      url: `${SITE_URL}/procesy/proces/${codeToSlug(p.code)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...slownikPages,
    ...slownikKategorie,
    ...slownikL2,
    ...slownikL3,
    ...procesyPages,
    ...procesyGrupy,
    ...procesyProcesy,
  ];
}
