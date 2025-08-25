import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((p) => {
      const link = `${SITE_URL}/posts/${p.slug}`;
      const pubDate = new Date(p.date).toUTCString();
      return `\n    <item>
      <title>${escape(p.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escape(p.excerpt || "")}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>MS Bridge Blog</title>
    <link>${SITE_URL}</link>
    <description>Latest posts from the MS Bridge blog</description>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}


