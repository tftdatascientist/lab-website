import type { MetadataRoute } from "next";
import { getAllPosts, getAllTechPosts } from "@/lib/mdx";
import { services } from "@/content/services";
import { getAllTerms, getCategories as getSlownikCategories } from "@/lib/slownik";
import { getCategories, getAllGroups, getAllProcesses, codeToSlug } from "@/lib/procesy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

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

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const techPages: MetadataRoute.Sitemap = getAllTechPosts().map((p) => ({
    url: `${SITE_URL}/technologia/${p.slug}`,
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

  const procesyProcesy: MetadataRoute.Sitemap = getAllProcesses().map((p) => ({
    url: `${SITE_URL}/procesy/proces/${codeToSlug(p.code)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...techPages,
    ...slownikPages,
    ...slownikKategorie,
    ...procesyPages,
    ...procesyGrupy,
    ...procesyProcesy,
  ];
}
