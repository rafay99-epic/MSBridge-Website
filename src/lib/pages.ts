import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const pagesDirectory = join(process.cwd(), "_pages");

export type StaticPage = {
  slug: string;
  title: string;
  content: string;
};

export function getStaticPageBySlug(slug: string): StaticPage | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(pagesDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { slug: realSlug, title: data.title ?? realSlug, content };
}


