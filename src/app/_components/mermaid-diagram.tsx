"use client";

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  children: string;
  'data-mermaid'?: string;
}

export default function MermaidDiagram({ children, 'data-mermaid': dataMermaid }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });

    const mermaidCode = dataMermaid ? decodeURIComponent(dataMermaid) : children;
    
    if (mermaidCode) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      
      mermaid.render(id, mermaidCode).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      }).catch((error) => {
        console.error('Error rendering Mermaid diagram:', error);
        if (ref.current) {
          ref.current.innerHTML = `<pre><code>${mermaidCode}</code></pre>`;
        }
      });
    }
  }, [children, dataMermaid]);

  return <div ref={ref} className="mermaid" />;
}
