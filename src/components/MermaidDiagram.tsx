import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
});

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMermaid = async () => {
      if (ref.current) {
        try {
          const { svg } = await mermaid.render('mermaid-diagram', chart);
          ref.current.innerHTML = svg;
        } catch (e) {
          console.error("Mermaid render error:", e);
          ref.current.innerHTML = `<pre>${e}</pre>`;
        }
      }
    };

    renderMermaid();
  }, [chart]);

  return <div ref={ref} />;
};

export default MermaidDiagram;
