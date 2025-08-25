import { NextResponse } from "next/server";
import { getAllVersions } from "@/lib/versions";
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
  const versions = getAllVersions();

  const items = versions
    .map((v) => {
      const link = `${SITE_URL}/versions#build-${v.buildNumber}`;
      const pubDate = new Date(v.releaseDate).toUTCString();
      const title = `v${v.version} (build ${v.buildNumber})`;
      const desc = v.changelog || "";
      return `\n    <item>
      <title>${escape(title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escape(desc)}</description>
      <enclosure url="${SITE_URL}${v.downloadUrl}" type="application/vnd.android.package-archive"/>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>MS Bridge Releases</title>
    <link>${SITE_URL}/versions</link>
    <description>Latest APK releases for MS Bridge</description>
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


