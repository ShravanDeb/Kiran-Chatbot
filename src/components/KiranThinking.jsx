import { useState, useEffect } from 'react';

export default function KiranThinking({ fadingOut }) {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(2), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`msg-row assistant ${fadingOut ? 'fade-out' : ''}`}>
      <div className="msg-avatar">
        <div className="lotus-pulse">
          <span role="img" aria-label="lotus" style={{ fontSize: 18 }}>🌸</span>
        </div>
      </div>
      <div className="thinking-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {phase === 1 ? (
            <span className="thinking-text">Kiran is thinking</span>
          ) : (
            <div className="thinking-dots">
              <span className="thinking-dot" />
              <span className="thinking-dot" />
              <span className="thinking-dot" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
