import { useState, useCallback, useRef } from 'react';
import { t } from '../utils/i18n';

export function useChat(language) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const abortControllerRef = useRef(null);
  const thinkingStartRef = useRef(0);
  const thinkingTimeoutRef = useRef(null);

  const clearThinkingTimer = () => {
    if (thinkingTimeoutRef.current) {
      clearTimeout(thinkingTimeoutRef.current);
      thinkingTimeoutRef.current = null;
    }
  };

  const endThinking = () => {
    clearThinkingTimer();
    const startTime = thinkingStartRef.current;
    if (startTime === 0) return;
    const elapsed = Date.now() - startTime;
    if (elapsed >= 1200) {
      setIsThinking(false);
    } else {
      thinkingTimeoutRef.current = setTimeout(() => {
        setIsThinking(false);
      }, 1200 - elapsed);
    }
  };

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading || isStreaming) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
    };

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      provider: '',
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);
    setIsThinking(true);
    thinkingStartRef.current = Date.now();

    try {
      abortControllerRef.current = new AbortController();

      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          language: language,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        let errorMsg = '⚠️ Something went wrong. Please try again.';
        try {
          const errorBody = await response.json();
          if (errorBody.limitReached) {
            errorMsg = t('error.limitReached', language);
          }
        } catch {
          // couldn't parse error body, use default
        }
        throw new Error(errorMsg);
      }

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream')) {
        setIsLoading(false);
        setIsStreaming(true);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;

              let parsed;
              try {
                parsed = JSON.parse(data);
                if (parsed.provider) {
                  setMessages(prev => {
                    const updated = [...prev];
                    const lastMsg = updated[updated.length - 1];
                    if (lastMsg.role === 'assistant') {
                      updated[updated.length - 1] = { ...lastMsg, provider: parsed.provider };
                    }
                    return updated;
                  });
                }
                if (parsed.text) {
                  setMessages(prev => {
                    const updated = [...prev];
                    const lastMsg = updated[updated.length - 1];
                    if (lastMsg.role === 'assistant') {
                      updated[updated.length - 1] = {
                        ...lastMsg,
                        content: lastMsg.content + parsed.text,
                      };
                    }
                    return updated;
                  });
                }
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
              } catch (e) {
                if (parsed && e.message !== parsed?.error) {
                  // JSON parse error on incomplete data — skip
                }
              }
            }
          }
        }
      } else {
        const data = await response.json();
        setIsLoading(false);

        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === 'assistant') {
            updated[updated.length - 1] = {
              ...lastMsg,
              content: data.text || data.error || 'No response received.',
            };
          }
          return updated;
        });
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setIsThinking(false);
        return;
      }

      const errorMsg = error.message || '⚠️ Something went wrong. Please try again.';
      setMessages(prev => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        if (lastMsg.role === 'assistant') {
          updated[updated.length - 1] = { ...lastMsg, content: errorMsg };
        }
        return updated;
      });
    } finally {
      endThinking();
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [messages, language, isLoading, isStreaming]);

  const clearChat = useCallback(() => {
    clearThinkingTimer();
    thinkingStartRef.current = 0;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setIsLoading(false);
    setIsStreaming(false);
    setIsThinking(false);
  }, []);

  return { messages, isLoading, isStreaming, isThinking, sendMessage, clearChat };
}
