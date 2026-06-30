import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ChatMessage from './ChatMessage';
import KiranThinking from './KiranThinking';
import { t } from '../utils/i18n';

export default function MessageList({
  messages,
  isLoading,
  isStreaming,
  language,
  isThinking,
}) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const prevMsgLenRef = useRef(messages.length);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    if (isThinking && !showThinking) {
      setShowThinking(true);
    }
    if (!isThinking && showThinking) {
      const timer = setTimeout(() => setShowThinking(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isThinking, showThinking]);

  const hasNewMessage = messages.length > prevMsgLenRef.current;
  useEffect(() => {
    if (!userScrolledUp && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: hasNewMessage ? 'smooth' : 'auto', block: 'end' });
    }
    prevMsgLenRef.current = messages.length;
  }, [messages, isLoading, userScrolledUp, hasNewMessage]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setUserScrolledUp(!isNearBottom);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    setUserScrolledUp(false);
  };

  const isEmpty = messages.length === 0;

  const messagesToShow = showThinking
    ? messages.slice(0, -1)
    : messages;

  return (
    <div
      className="msg-list"
      ref={containerRef}
      onScroll={handleScroll}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      <div className="msg-list-inner">
        {isEmpty ? (
          <div className="welcome-card">
            <div className="welcome-card-inner">
              <div className="welcome-avatar">
                <img src="/logo.svg" alt="Kiran" />
              </div>
              <h2 className="welcome-title">
                {t('welcome.title', language)}
              </h2>
              <p className="welcome-subtitle">
                {t('welcome.subtitle', language)}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messagesToShow.map(msg => (
              <ChatMessage key={msg.id} message={msg} language={language} />
            ))}
            {showThinking && (
              <KiranThinking fadingOut={!isThinking} />
            )}
          </>
        )}
        <div ref={bottomRef} className="scroll-anchor" />
      </div>

      {userScrolledUp && (
        <button
          className="scroll-btn"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          <ChevronDown size={18} />
        </button>
      )}
    </div>
  );
}
