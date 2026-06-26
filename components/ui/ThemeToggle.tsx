'use client';

import React, { useSyncExternalStore } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const themes = ['light', 'dark'] as const;

// The theme lives on <html class="dark"> (set before paint by the inline script
// in app/layout.tsx). useSyncExternalStore reads it without a hydration mismatch.
const subscribe = (callback: () => void) => {
  window.addEventListener('theme-change', callback);
  return () => window.removeEventListener('theme-change', callback);
};

const getSnapshot = (): 'light' | 'dark' =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const getServerSnapshot = (): null => null;

const ThemeToggle = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    window.dispatchEvent(new Event('theme-change'));
  };

  // null until hydrated on the client — avoids rendering a mismatched toggle.
  if (!theme) return <></>;

  return (
    <div className="inline-flex items-center rounded-3xl bg-orange-300 p-[1px] dark:bg-zinc-600">
      {themes.map((t) => {
        const checked = t === theme;
        return (
          <button
            key={t}
            className={`${
              checked ? 'bg-white text-black' : ''
            } rounded-3xl p-2`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {t === 'light' ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
