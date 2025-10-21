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

    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'strict',
    });

    const mermaidCode = dataMermaid ? decodeURIComponent(dataMermaid) : children;
    
    if (mermaidCode) {
      const generateId = () => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          return `mermaid-${crypto.randomUUID()}`;
        }
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
          const array = new Uint8Array(8);
          crypto.getRandomValues(array);
          return `mermaid-${Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')}`;
        }
        return `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      };
      
      const id = generateId();
      
      mermaid.render(id, mermaidCode).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      }).catch((error) => {
        console.error('Error rendering Mermaid diagram:', error);
        if (ref.current) {
          ref.current.innerHTML = '';
          
          const pre = document.createElement('pre');
          const code = document.createElement('code');
          
          code.textContent = mermaidCode;
          pre.appendChild(code);
          ref.current.appendChild(pre);
        }
      });
    }
  }, [children, dataMermaid]);

  return <div ref={ref} className="mermaid" />;
}
