'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { FC, useMemo, useState } from 'react';
import { Post } from '../../types';
import Posts from './Posts';

type Props = {
  posts: Post[];
  activeTag?: string | null;
};

// Weight matches so a hit in the title ranks above a hit in the body.
const scorePost = (post: Post, terms: string[]) => {
  const title = (post.title ?? '').toLowerCase();
  const tags = (post.tags ?? []).map((tag) => tag.toLowerCase());
  const excerpt = (post.excerpt ?? '').toLowerCase();
  const content = (post.content ?? '').toLowerCase();

  return terms.reduce((score, term) => {
    if (title.includes(term)) score += 5;
    if (tags.some((tag) => tag.includes(term))) score += 3;
    if (excerpt.includes(term)) score += 2;
    if (content.includes(term)) score += 1;
    return score;
  }, 0);
};

const PostSearch: FC<Props> = ({ posts, activeTag }) => {
  const [query, setQuery] = useState('');

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length >= 3;
  const tag = activeTag?.trim().toLowerCase() || null;

  const results = useMemo(() => {
    const tagged = tag
      ? posts.filter((post) =>
          (post.tags ?? []).some((postTag) => postTag.toLowerCase() === tag),
        )
      : posts;

    if (!isSearching) return tagged;

    const terms = trimmedQuery.toLowerCase().split(/\s+/).filter(Boolean);

    return tagged
      .map((post) => ({ post, score: scorePost(post, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ post }) => post);
  }, [posts, tag, trimmedQuery, isSearching]);

  const count =
    results.length === 0
      ? 'No posts'
      : `${results.length} ${results.length === 1 ? 'post' : 'posts'}`;
  const status = [
    count,
    isSearching && `found for “${trimmedQuery}”`,
    tag && 'tagged',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 opacity-50" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts…"
          aria-label="Search posts"
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-10 pl-10 text-sm transition-colors outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:border-zinc-700 dark:bg-zinc-800/50 dark:focus:border-orange-400 dark:focus:ring-orange-400"
        />
        {isSearching && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 opacity-60 hover:opacity-100"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {(isSearching || tag) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="opacity-70">{status}</span>
          {tag && (
            <span className="inline-flex items-center gap-1 rounded-md bg-orange-100 py-0.5 pr-1 pl-2 font-medium text-orange-700 dark:bg-zinc-800 dark:text-orange-400">
              # {tag}
              <Link
                href="/blog"
                scroll={false}
                aria-label="Clear tag filter"
                className="rounded p-0.5 opacity-70 hover:opacity-100"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </Link>
            </span>
          )}
        </div>
      )}

      {results.length > 0 && <Posts posts={results} />}
    </div>
  );
};

export const PostSearchFromParams: FC<Pick<Props, 'posts'>> = ({ posts }) => {
  const searchParams = useSearchParams();

  return <PostSearch posts={posts} activeTag={searchParams.get('tag')} />;
};

export default PostSearch;
