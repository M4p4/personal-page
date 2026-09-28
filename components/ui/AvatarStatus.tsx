'use client';

import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import { blurImage } from 'lib/helpers';

const statuses = [
  { emoji: '🔥', message: 'Deploying on Friday' },
  { emoji: '🎧', message: 'In the zone' },
  { emoji: '🚀', message: 'Shipping to prod' },
];

let pick: number | null = null;

const getPick = () => {
  if (pick === null) pick = Math.floor(Math.random() * statuses.length);
  return pick;
};

const subscribe = () => () => {};

const AvatarStatus = () => {
  const index = useSyncExternalStore(subscribe, getPick, () => null);
  const status = index === null ? null : statuses[index];

  return (
    <div className="relative shrink-0">
      <Image
        className="h-44 w-44 rounded-full object-cover ring-1 ring-zinc-500 md:h-52 md:w-52 dark:ring-zinc-600"
        src="/images/me.jpg"
        alt="Jaro Ratz"
        placeholder="blur"
        blurDataURL={blurImage(240, 240)}
        width={240}
        height={240}
      />
      {status && (
        <div
          className="group absolute bottom-[18px] left-[14px] hidden h-8 max-w-8 cursor-default items-center overflow-hidden rounded-full bg-orange-100 shadow-sm ring-1 ring-orange-200 transition-all duration-300 ease-out hover:max-w-80 md:flex dark:bg-zinc-800 dark:ring-zinc-700"
          title={status.message}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center text-sm leading-none">
            {status.emoji}
          </span>
          <span className="pr-3 text-[11px] whitespace-nowrap text-zinc-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-zinc-300">
            {status.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default AvatarStatus;
