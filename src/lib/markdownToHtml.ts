import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export default async function markdownToHtml(markdown: string) {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(html)
      .process(markdown);
    
    return result.toString();
  } catch (error) {
    console.error('Error processing markdown:', error);
    // Return a fallback if markdown processing fails
    return `<div class="error">Error loading content. Please try refreshing the page.</div>`;
  }
}
