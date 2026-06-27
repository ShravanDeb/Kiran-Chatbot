import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Mic, MicOff } from 'lucide-react';
import { t } from '../utils/i18n';
import { useSpeech } from '../hooks/useSpeech';

export default function InputBar({ language, onSend, disabled, onInputChange }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const { isListening, toggleListening, hasSpeechRecognition } = useSpeech(language);
  const preListenTextRef = useRef('');

  useEffect(() => {
    onInputChange(text);
  }, [text, onInputChange]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
      if (isListening) toggleListening();
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      preListenTextRef.current = text ? text + ' ' : '';
    }
    toggleListening((transcript) => {
      setText(preListenTextRef.current + transcript);
    });
  };

  return (
    <div className="input-bar-wrapper">
      <div className="input-bar">
        <textarea
          ref={textareaRef}
          className="input-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening..." : t('input.placeholder', language)}
          rows={1}
          disabled={disabled}
          aria-label={t('input.placeholder', language)}
        />
        {hasSpeechRecognition && (
          <button
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={handleMicClick}
            disabled={disabled}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        )}
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={disabled || (!text.trim() && !isListening)}
          aria-label={t('aria.sendButton', language)}
        >
          <SendHorizontal size={18} />
        </button>
      </div>
      <p className="input-disclaimer">
        {t('input.disclaimer', language)}
      </p>
    </div>
  );
}
