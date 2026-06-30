import { useState, useEffect, useCallback } from 'react';

const FONT_KEY = 'kiran-fs';
const HC_KEY = 'kiran-hc';

const FONT_CLASSES = ['fs-1', 'fs-2', 'fs-3'];
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
      root.classList.add('hc');
    } else {
      root.classList.remove('hc');
    }
    localStorage.setItem(HC_KEY, String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    FONT_CLASSES.forEach(c => root.classList.remove(c));
    const idx = FONT_LABELS.indexOf(fontSize);
    if (idx >= 0) {
      root.classList.add(FONT_CLASSES[idx]);
    } else {
      root.classList.add('fs-1');
    }
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
