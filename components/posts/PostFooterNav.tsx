import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { FC } from 'react';

type AdjacentPost = { title: string; slug: string } | null;

type Props = {
  older: AdjacentPost;
  newer: AdjacentPost;
};

const PostFooterNav: FC<Props> = ({ older, newer }) => {
  if (!older && !newer) {
    return null;
  }

  return (
    <div className="mx-auto mt-12 max-w-prose border-t border-slate-200 pt-6 dark:border-zinc-800">
      <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {older ? (
          <Link
            href={`/blog/${older.slug}`}
            className="group flex flex-col rounded-lg border border-slate-200 p-4 transition-colors hover:border-orange-400 dark:border-zinc-800"
          >
            <span className="inline-flex items-center gap-1 text-sm opacity-60">
              <ArrowLongLeftIcon className="h-4 w-4" /> Older post
            </span>
            <span className="mt-1 font-medium text-orange-600 dark:text-orange-400">
              {older.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {newer ? (
          <Link
            href={`/blog/${newer.slug}`}
            className="group flex flex-col rounded-lg border border-slate-200 p-4 text-right transition-colors hover:border-orange-400 dark:border-zinc-800"
          >
            <span className="inline-flex items-center justify-end gap-1 text-sm opacity-60">
              Newer post <ArrowLongRightIcon className="h-4 w-4" />
            </span>
            <span className="mt-1 font-medium text-orange-600 dark:text-orange-400">
              {newer.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
};

export default PostFooterNav;
