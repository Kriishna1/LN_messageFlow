import React, { useState } from 'react';
import MermaidDiagram from './components/MermaidDiagram';

// Mermaid chart strings for 4 message types
const diagrams: Record<string, string> = {
  init: `sequenceDiagram
    Runner ->> LDK: init
    LDK ->> Runner: init`,

  error: `sequenceDiagram
    LDK ->> Runner: error
    Runner ->> LDK: error_ack`,

  warning: `sequenceDiagram
    LDK ->> Runner: warning
    Note over LDK,Runner: Something is wrong, but not critical.`,

  open_channel: `sequenceDiagram
    Runner ->> LDK: open_channel
    LDK ->> Runner: accept_channel
    Runner ->> LDK: funding_created
    LDK ->> Runner: funding_signed
    Runner ->> LDK: channel_ready
    LDK ->> Runner: channel_ready`
};

const buttons = ["init", "error", "warning", "open_channel"] as const;

function App() {
  const [selected, setSelected] = useState<keyof typeof diagrams | null>(null);

  return (
    <div style={{ display: 'flex', height: '100vh', padding: '1rem', fontFamily: 'sans-serif' }}>
      {/* Left Panel: Buttons */}
      <div style={{ width: '250px', paddingRight: '1rem', borderRight: '1px solid #ccc' }}>
        <h2 style={{ marginBottom: '1rem' }}>🧪 Select Message</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => setSelected(btn)}
              style={{
                background: selected === btn ? '#cbd5e1' : '#f1f5f9',
                border: '1px solid #94a3b8',
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
              onMouseOut={(e) => e.currentTarget.style.background = selected === btn ? '#cbd5e1' : '#f1f5f9'}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel: Diagram */}
      <div style={{ flex: 1, paddingLeft: '2rem' }}>
        <h2>⚡ Lightning Message Flow</h2>
        {selected ? (
          <MermaidDiagram chart={diagrams[selected]} />
        ) : (
          <p>Click a message to display its flow diagram.</p>
        )}
      </div>
    </div>
  );
}

export default App;
