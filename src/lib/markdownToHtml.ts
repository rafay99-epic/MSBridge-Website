import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

function processMermaidDiagrams(html: string): string {
  const mermaidRegex = /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g;
  
  let processedHtml = html;
  let match;
  
  while ((match = mermaidRegex.exec(html)) !== null) {
    const mermaidCode = match[1].trim();
    
    // Replace the code block with a div that will be processed by client-side Mermaid
    processedHtml = processedHtml.replace(
      match[0],
      `<div class="mermaid" data-mermaid="${encodeURIComponent(mermaidCode)}">${mermaidCode}</div>`
    );
  }
  
  return processedHtml;
}

function processSpecialCodeBlocks(html: string): string {
  let processedHtml = html;
  
  // Process barcode blocks
  const barcodeRegex = /<pre><code class="language-barcode">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(barcodeRegex, (match, content) => {
    return `<div class="barcode">${content.trim()}</div>`;
  });
  
  // Process single line code blocks
  const singleCodeRegex = /<pre><code class="language-single">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(singleCodeRegex, (match, content) => {
    return `<span class="code-single">${content.trim()}</span>`;
  });
  
  // Process diagram blocks (non-mermaid)
  const diagramRegex = /<pre><code class="language-diagram">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(diagramRegex, (match, content) => {
    return `<div class="diagram">${content.trim()}</div>`;
  });
  
  // Process flowchart blocks
  const flowchartRegex = /<pre><code class="language-flowchart">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(flowchartRegex, (match, content) => {
    return `<div class="flowchart">${content.trim()}</div>`;
  });
  
  // Process sequence blocks
  const sequenceRegex = /<pre><code class="language-sequence">([\s\S]*?)<\/code><\/pre>/g;
  processedHtml = processedHtml.replace(sequenceRegex, (match, content) => {
    return `<div class="sequence">${content.trim()}</div>`;
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
  return processMermaidDiagrams(withSpecialBlocks);
}
