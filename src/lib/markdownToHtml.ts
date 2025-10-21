import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import DOMPurify from "isomorphic-dompurify";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function processMermaidDiagrams(html: string): string {
  const mermaidRegex = /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g;
  
  const matches = Array.from(html.matchAll(mermaidRegex));
  
  if (matches.length === 0) {
    return html;
  }
  
  let result = '';
  let lastIndex = 0;
  
  for (const match of matches) {
    const mermaidCode = match[1].trim();
    
    result += html.slice(lastIndex, match.index);
    
    result += `<div class="mermaid" data-mermaid="${encodeURIComponent(mermaidCode)}">${escapeHtml(mermaidCode)}</div>`;
    
    lastIndex = match.index! + match[0].length;
  }
  
  result += html.slice(lastIndex);
  
  return result;
}

function processSpecialCodeBlocks(html: string): string {
  let processedHtml = html;
  
  const barcodeRegex = /<pre><code class="language-barcode">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(barcodeRegex, (match, content) => {
    return `<div class="barcode">${escapeHtml(content.trim())}</div>`;
  });
  
  const singleCodeRegex = /<pre><code class="language-single">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(singleCodeRegex, (match, content) => {
    return `<span class="code-single">${escapeHtml(content.trim())}</span>`;
  });
  
  const diagramRegex = /<pre><code class="language-diagram">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(diagramRegex, (match, content) => {
    return `<div class="diagram">${escapeHtml(content.trim())}</div>`;
  });
  
  const flowchartRegex = /<pre><code class="language-flowchart">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(flowchartRegex, (match, content) => {
    return `<div class="flowchart">${escapeHtml(content.trim())}</div>`;
  });
  
  const sequenceRegex = /<pre><code class="language-sequence">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(sequenceRegex, (match, content) => {
    return `<div class="sequence">${escapeHtml(content.trim())}</div>`;
  });
  
  return processedHtml;
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(html)
    .process(markdown);
  
  const htmlContent = result.toString();
  const withSpecialBlocks = processSpecialCodeBlocks(htmlContent);
  const withMermaidDiagrams = processMermaidDiagrams(withSpecialBlocks);
  
  return DOMPurify.sanitize(withMermaidDiagrams);
}
