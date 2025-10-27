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
  try {
    const mermaidRegex = /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g;
    
    const matches = Array.from(html.matchAll(mermaidRegex));
    
    if (matches.length === 0) {
      return html;
    }
    
    let result = '';
    let lastIndex = 0;
    
    for (const match of matches) {
      const mermaidCode = match[1] ? match[1].trim() : '';
      
      if (match.index !== undefined) {
        result += html.slice(lastIndex, match.index);
        
        result += `<div class="mermaid" data-mermaid="${encodeURIComponent(mermaidCode)}">${escapeHtml(mermaidCode)}</div>`;
        
        lastIndex = match.index + match[0].length;
      }
    }
    
    result += html.slice(lastIndex);
    
    return result;
  } catch (error) {
    console.error('Error processing mermaid diagrams:', error);
    return html;
  }
}

function processSpecialCodeBlocks(html: string): string {
  try {
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
  } catch (error) {
    console.error('Error processing special code blocks:', error);
    return html;
  }
}

export default async function markdownToHtml(markdown: string) {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(html)
      .process(markdown);
    
    const htmlContent = result.toString();
    const withSpecialBlocks = processSpecialCodeBlocks(htmlContent);
    const withMermaidDiagrams = processMermaidDiagrams(withSpecialBlocks);
    
    // Configure DOMPurify to allow data attributes and specific custom elements
    // We need to preserve the data-mermaid attribute for client-side processing
    const purified = DOMPurify.sanitize(withMermaidDiagrams, {
      ALLOW_DATA_ATTR: true,
      KEEP_CONTENT: true,
      ADD_ATTR: ['data-mermaid', 'data-id', 'data-label'],
      SAFE_FOR_TEMPLATES: true,
    });
    
    return purified;
  } catch (error) {
    console.error('Error processing markdown:', error);
    // Return a fallback if markdown processing fails
    return `<div class="error">Error loading content. Please try refreshing the page.</div>`;
  }
}
