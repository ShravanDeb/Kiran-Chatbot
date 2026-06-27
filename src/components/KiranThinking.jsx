import { useState, useEffect } from 'react';

export default function KiranThinking({ fadingOut }) {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(2), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`message-row message-row-assistant ${fadingOut ? 'kiran-thinking-fadeout' : ''}`}>
      <div className="message-avatar message-avatar-assistant">
        <div className="kiran-thinking-lotus">
          <span role="img" aria-label="lotus" style={{ fontSize: 18 }}>🌸</span>
        </div>
      </div>
      <div className="kiran-thinking">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {phase === 1 ? (
            <span className="kiran-thinking-text">Kiran is thinking</span>
          ) : (
            <div className="kiran-thinking-dots">
              <span className="kiran-dot" />
              <span className="kiran-dot" />
              <span className="kiran-dot" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
