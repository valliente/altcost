import { useEffect, useCallback } from 'react';

export type ThemeMode = 'light';
const STORAGE_KEY = 'altcost_v0.1.407_theme';

export function useTheme() {
  const theme: ThemeMode = 'light';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }, []);

  const toggleTheme = useCallback(() => {
    // No-op for v0.1.407 strict light mode
    console.warn("Dark mode has been disabled in v0.1.407 to enforce the vibrant light theme.");
  }, []);

  return { theme, toggleTheme };
}
