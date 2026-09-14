'use client';

import useTheme, { Theme } from 'lib/useTheme';
import React, { FC, useEffect, useId, useRef, useState } from 'react';

type Props = {
  chart: string;
};

const themeVariables: Record<Theme, Record<string, string | boolean>> = {
  light: {
    darkMode: false,
    background: 'transparent',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    primaryColor: '#ffedd5',
    primaryBorderColor: '#ea580c',
    primaryTextColor: '#18181b',
    secondaryColor: '#f4f4f5',
    tertiaryColor: '#fff7ed',
    lineColor: '#71717a',
    textColor: '#18181b',
    pie1: '#ea580c',
    pie2: '#fb923c',
    pie3: '#fdba74',
    pie4: '#a1a1aa',
    pieStrokeColor: '#ffffff',
    pieOuterStrokeColor: '#e4e4e7',
    pieSectionTextColor: '#18181b',
  },
  dark: {
    darkMode: true,
    background: 'transparent',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    primaryColor: '#27272a',
    primaryBorderColor: '#fb923c',
    primaryTextColor: '#e4e4e7',
    secondaryColor: '#3f3f46',
    tertiaryColor: '#18181b',
    lineColor: '#a1a1aa',
    textColor: '#e4e4e7',
    pie1: '#fb923c',
    pie2: '#ea580c',
    pie3: '#fdba74',
    pie4: '#71717a',
    pieStrokeColor: '#18181b',
    pieOuterStrokeColor: '#3f3f46',
    pieSectionTextColor: '#18181b',
  },
};

const Mermaid: FC<Props> = ({ chart }) => {
  const theme = useTheme();
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!theme) return;
    let cancelled = false;

    const render = async () => {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          suppressErrorRendering: true,
          theme: 'base',
          themeVariables: themeVariables[theme],
        });
        const { svg, bindFunctions } = await mermaid.render(
          `${id}-${theme}`,
          chart,
        );
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = svg;
        bindFunctions?.(ref.current);
        setFailed(false);
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, id, theme]);

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
      <div ref={ref} className="min-h-24 [&_svg]:mx-auto" hidden={failed} />
      {failed && (
        <pre className="text-xs whitespace-pre-wrap text-red-700 dark:text-red-400">
          {chart}
        </pre>
      )}
    </div>
  );
};

export default Mermaid;
