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
    <>
      <header className="navbar">
        <div className="navbar-row-1">
          <button
            className="nav-btn"
            onClick={onNewChat}
            aria-label={t('aria.newChat', language)}
            title={t('button.newChat', language)}
          >
            <MessageSquarePlus size={18} />
          </button>

          <div className="nav-brand">
            <span className="nav-brand-title">{t('header.title', language)}</span>
            <span className="nav-brand-tagline">{t('header.tagline', language)}</span>
          </div>

          <div className="nav-controls">
            <div className="lang-pill-group lang-pill-group--desktop" role="radiogroup" aria-label="Language">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`lang-segment ${language === lang.code ? 'lang-segment-active' : 'lang-segment-inactive'}`}
                  onClick={() => onLanguageChange(lang.code)}
                  role="radio"
                  aria-checked={language === lang.code}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>

            <div className="nav-icon-row">
              <button
                className="nav-icon-btn"
                onClick={onCycleFontSize}
                aria-label={FONT_TOOLTIPS[fontSize]}
                title={FONT_TOOLTIPS[fontSize]}
              >
                <Type size={15} />
                <FontSizeDots count={fontDotCount} />
              </button>

              <button
                className={`nav-icon-btn ${highContrast ? 'is-active' : ''}`}
                onClick={onToggleHighContrast}
                aria-label="Toggle High Contrast"
                title="Toggle High Contrast"
              >
                <Contrast size={15} />
              </button>

              <button
                className={`nav-icon-btn ${isDark ? 'is-active' : ''}`}
                onClick={onToggleTheme}
                aria-label={t('aria.toggleTheme', language)}
                title="Toggle Theme"
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>
        </div>

        <div className="lang-pill-group lang-pill-group--mobile" role="radiogroup" aria-label="Language">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-segment ${language === lang.code ? 'lang-segment-active' : 'lang-segment-inactive'}`}
              onClick={() => onLanguageChange(lang.code)}
              role="radio"
              aria-checked={language === lang.code}
            >
              {lang.nativeLabel}
            </button>
          ))}
        </div>
      </header>
    </>
  );
}
