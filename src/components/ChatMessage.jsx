import { useState } from 'react';
import { Copy, Check, Volume2, VolumeX } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { t } from '../utils/i18n';
import { useSpeech } from '../hooks/useSpeech';

export default function ChatMessage({ message, language }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const { speak, isSpeaking, speakingText } = useSpeech(language);
  const isCurrentlySpeaking = isSpeaking && speakingText === message.content;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = message.content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleListen = () => {
    if (message.content) {
      speak(message.content);
    }
  };

  return (
    <div className={`msg-row ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="msg-avatar">
          <img src="/logo.svg" alt="Kiran" />
        </div>
      )}

      <div className="msg-content">
        {isUser ? (
          <div className="bubble user">
            <p className="msg-text">{message.content}</p>
          </div>
        ) : (
          <div className="bubble assistant">
            {message.content ? (
              <div className="msg-markdown">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ) : (
              <span style={{ opacity: 0.5 }}>...</span>
            )}
          </div>
        )}

        {!isUser && (
          <div className="msg-actions">
            <button
              className={`action-pill ${isCurrentlySpeaking ? 'active' : ''}`}
              onClick={handleListen}
              aria-label="Listen to message"
              title="Listen to message"
              disabled={!message.content}
            >
              {isCurrentlySpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>Listen</span>
            </button>
            <button
              className="action-pill"
              onClick={handleCopy}
              aria-label={t('aria.copyMessage', language)}
              title={copied ? t('button.copied', language) : t('button.copy', language)}
              disabled={!message.content}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? t('button.copied', language) : t('button.copy', language)}</span>
            </button>
          </div>
        )}
        {!isUser && message.provider && (
          <div className="msg-meta">via {message.provider}</div>
        )}
      </div>
    </div>
  );
}
