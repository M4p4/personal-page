import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

// The theme lives on <html class="dark"> (set before paint by the inline script
// in app/layout.tsx). useSyncExternalStore reads it without a hydration mismatch.
const subscribe = (callback: () => void) => {
  window.addEventListener('theme-change', callback);
  return () => window.removeEventListener('theme-change', callback);
};

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const getServerSnapshot = (): null => null;

const useTheme = () =>
  useSyncExternalStore<Theme | null>(subscribe, getSnapshot, getServerSnapshot);

export default useTheme;
