import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { classNames } from 'lib/helpers';
import React, { FC, ReactNode } from 'react';

type BadgeType = 'gain' | 'loss' | 'neutral';

type Props = {
  type?: BadgeType;
  children: ReactNode;
};

const styles: Record<BadgeType, string> = {
  gain: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30',
  loss: 'bg-red-100 text-red-800 ring-red-600/20 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/30',
  neutral:
    'bg-slate-100 text-slate-700 ring-slate-500/20 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-600/50',
};

const Badge: FC<Props> = ({ type = 'neutral', children }) => {
  const Icon =
    type === 'gain' ? ArrowUpIcon : type === 'loss' ? ArrowDownIcon : null;

  return (
    <span
      className={classNames(
        'not-prose inline-flex items-center gap-1 rounded-md px-2 py-0.5 align-middle text-xs font-semibold whitespace-nowrap ring-1 ring-inset',
        styles[type] ?? styles.neutral,
      )}
    >
      {Icon && <Icon aria-hidden className="size-3.5" />}
      {Icon && (
        <span className="sr-only">{type === 'gain' ? 'Gain:' : 'Loss:'}</span>
      )}
      {children}
    </span>
  );
};

export default Badge;
