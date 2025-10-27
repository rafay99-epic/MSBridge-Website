"use client";

import markdownStyles from "./markdown-styles.module.css";
import MermaidDiagram from "./mermaid-diagram";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  // Process content to replace mermaid divs with MermaidDiagram components
  const processContent = (html: string) => {
    try {
      const mermaidRegex = /<div class="mermaid" data-mermaid="([^"]*)"[^>]*>([\s\S]*?)<\/div>/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = mermaidRegex.exec(html)) !== null) {
        // Add content before the mermaid div
        if (match.index > lastIndex) {
          parts.push(
            <div
              key={`content-${lastIndex}`}
              className={markdownStyles["markdown"]}
              dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, match.index) }}
            />
          );
        }

        // Add the mermaid diagram component
        parts.push(
          <MermaidDiagram
            key={`mermaid-${match.index}`}
            data-mermaid={match[1]}
          >
            {match[2]}
          </MermaidDiagram>
        );

        lastIndex = match.index + match[0].length;
      }

      // Add remaining content
      if (lastIndex < html.length) {
        parts.push(
          <div
            key={`content-${lastIndex}`}
            className={markdownStyles["markdown"]}
            dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }}
          />
        );
      }

      return parts.length > 0 ? parts : (
        <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: html }} />
      );
    } catch (error) {
      console.error('Error processing content:', error);
      // Fallback to just rendering the HTML without processing
      return <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: html }} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {processContent(content)}
    </div>
  );
}
