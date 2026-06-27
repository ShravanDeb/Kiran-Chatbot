import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kiran-theme';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return { isDark, toggleTheme };
}
