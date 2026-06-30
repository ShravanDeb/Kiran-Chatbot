import { t, LANGUAGES } from '../utils/i18n';
import { Sun, Moon, MessageSquarePlus, Contrast, Type } from 'lucide-react';

const FONT_TOOLTIPS = {
  normal: 'Normal text size',
  large: 'Large text size',
  xlarge: 'Extra large text size',
};

function FontSizeDots({ count }) {
  if (count === 0) return null;
  return (
    <span className="font-size-dot-row">
      <span className="font-size-dot" />
      {count === 2 && <span className="font-size-dot" />}
    </span>
  );
}

export default function Header({
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
  onNewChat,
  highContrast,
  onToggleHighContrast,
  fontSize,
  onCycleFontSize
}) {
  const fontDotCount = fontSize === 'normal' ? 0 : fontSize === 'large' ? 1 : 2;

  return (
    <header className="kiran-header">
      <div className="header-row1">
        <button
          className="new-chat-btn"
          onClick={onNewChat}
          aria-label={t('aria.newChat', language)}
          title={t('button.newChat', language)}
        >
          <MessageSquarePlus size={18} />
        </button>

        <div className="nav-brand">
          <span className="brand-title">{t('header.title', language)}</span>
          <span className="brand-tagline">{t('header.tagline', language)}</span>
        </div>

        <div className="desktop-right-controls">
          <div className="lang-pill-group lang-pill-group--desktop" role="radiogroup" aria-label="Language">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                className={`lang-pill-btn ${language === lang.code ? 'active' : ''}`}
                onClick={() => onLanguageChange(lang.code)}
                role="radio"
                aria-checked={language === lang.code}
              >
                {lang.nativeLabel}
              </button>
            ))}
          </div>

          <button
            className="icon-btn"
            onClick={onCycleFontSize}
            aria-label={FONT_TOOLTIPS[fontSize]}
            title={FONT_TOOLTIPS[fontSize]}
          >
            <Type size={15} />
            <FontSizeDots count={fontDotCount} />
          </button>

          <button
            className={`icon-btn ${highContrast ? 'active' : ''}`}
            onClick={onToggleHighContrast}
            aria-label="Toggle High Contrast"
            title="Toggle High Contrast"
          >
            <Contrast size={15} />
          </button>

          <button
            className={`icon-btn ${isDark ? 'active' : ''}`}
            onClick={onToggleTheme}
            aria-label={t('aria.toggleTheme', language)}
            title="Toggle Theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      <div className="header-row2">
        <div className="lang-pill-group lang-pill-group--mobile" role="radiogroup" aria-label="Language">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-pill-btn ${language === lang.code ? 'active' : ''}`}
              onClick={() => onLanguageChange(lang.code)}
              role="radio"
              aria-checked={language === lang.code}
            >
              {lang.nativeLabel}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
