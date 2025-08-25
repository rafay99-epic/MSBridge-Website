import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";
import { getAllPosts } from "@/lib/api";
import { getAllVersions } from "@/lib/versions";

const STATIC_ROUTES = [
  "/",
  "/features",
  "/technologies",
  "/versions",
  "/privacy",
  "/terms",
];

export async function GET() {
  const posts = getAllPosts();
  const versions = getAllVersions();

  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: string }[] = [];

  for (const path of STATIC_ROUTES) {
    urls.push({
      loc: `${SITE_URL}${path}`,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? "1.0" : "0.7",
    });
  }

  for (const post of posts) {
    urls.push({
      loc: `${SITE_URL}/posts/${post.slug}`,
      lastmod: new Date(post.date).toISOString(),
      changefreq: "monthly",
      priority: "0.6",
    });
  }

  // Link to versions page with last release date
  if (versions[0]) {
    urls.push({
      loc: `${SITE_URL}/versions`,
      lastmod: new Date(versions[0].releaseDate).toISOString(),
      changefreq: "weekly",
      priority: "0.8",
    });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    ${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ""}
    ${u.priority ? `<priority>${u.priority}</priority>` : ""}
  </url>`)
  .join("\n")}
</urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}


