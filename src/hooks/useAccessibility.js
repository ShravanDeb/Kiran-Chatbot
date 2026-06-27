import { useState, useEffect, useCallback } from 'react';

const FONT_KEY = 'kiran-font-size';
const HC_KEY = 'kiran-high-contrast';

const FONT_SIZES = ['15px', '18px', '21px'];
const FONT_LABELS = ['normal', 'large', 'xlarge'];

export function useAccessibility() {
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(HC_KEY) === 'true';
    }
    return false;
  });

  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(FONT_KEY);
      return stored && FONT_LABELS.includes(stored) ? stored : 'normal';
    }
    return 'normal';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem(HC_KEY, String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    const idx = FONT_LABELS.indexOf(fontSize);
    const px = idx >= 0 ? FONT_SIZES[idx] : '15px';
    document.documentElement.style.fontSize = px;
    localStorage.setItem(FONT_KEY, fontSize);
  }, [fontSize]);

  const toggleHighContrast = useCallback(() => setHighContrast(prev => !prev), []);

  const cycleFontSize = useCallback(() => {
    setFontSize(prev => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xlarge';
      return 'normal';
    });
  }, []);

  return { highContrast, toggleHighContrast, fontSize, cycleFontSize };
}
