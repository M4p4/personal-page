'use client';

import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import useTheme from 'lib/useTheme';

const themes = ['light', 'dark'] as const;

const ThemeToggle = () => {
  const theme = useTheme();

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
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
