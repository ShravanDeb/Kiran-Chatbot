'use client';

import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import InputBar from './InputBar';
import SuggestedChips from './SuggestedChips';
import { useChat } from '../hooks/useChat';
import { useTheme } from '../hooks/useTheme';
import { useAccessibility } from '../hooks/useAccessibility';
import { SkipNavLink, SkipNavContent } from './SkipNav';

export default function ChatInterface() {
  const [language, setLanguage] = useState('en');
  const [inputText, setInputText] = useState('');
  const inputAreaRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();
  const { messages, isLoading, isStreaming, isThinking, sendMessage, clearChat } = useChat(language);
  const { highContrast, toggleHighContrast, fontSize, cycleFontSize } = useAccessibility();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const el = inputAreaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      document.documentElement.style.setProperty('--input-area-height', `${h}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleSend = (text) => {
    sendMessage(text);
    setInputText('');
  };

  return (
    <div className="chat-layout">
      <SkipNavLink />
      <Header
        language={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNewChat={clearChat}
        highContrast={highContrast}
        onToggleHighContrast={toggleHighContrast}
        fontSize={fontSize}
        onCycleFontSize={cycleFontSize}
      />
      <SkipNavContent />
      <MessageList
        messages={messages}
        isLoading={isLoading}
        isStreaming={isStreaming}
        language={language}
        isThinking={isThinking}
      />
      <div className="input-area" ref={inputAreaRef}>
        {inputText.trim() && (
          <SuggestedChips language={language} onChipClick={handleSend} filterText={inputText} />
        )}
        <InputBar
          language={language}
          onSend={handleSend}
          disabled={isLoading || isStreaming}
          onInputChange={setInputText}
        />
      </div>
    </div>
  );
}
