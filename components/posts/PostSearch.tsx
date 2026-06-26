'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { FC, useMemo, useState } from 'react';
import { Post } from '../../types';
import Posts from './Posts';

type Props = {
  posts: Post[];
};

// Weight matches so a hit in the title ranks above a hit in the body.
const scorePost = (post: Post, terms: string[]) => {
  const title = (post.title ?? '').toLowerCase();
  const excerpt = (post.excerpt ?? '').toLowerCase();
  const content = (post.content ?? '').toLowerCase();

  return terms.reduce((score, term) => {
    if (title.includes(term)) score += 5;
    if (excerpt.includes(term)) score += 2;
    if (content.includes(term)) score += 1;
    return score;
  }, 0);
};

const PostSearch: FC<Props> = ({ posts }) => {
  const [query, setQuery] = useState('');

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length >= 3;

  const results = useMemo(() => {
    if (!isSearching) return posts;

    const terms = trimmedQuery.toLowerCase().split(/\s+/).filter(Boolean);

    return posts
      .map((post) => ({ post, score: scorePost(post, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ post }) => post);
  }, [posts, trimmedQuery, isSearching]);

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

      {isSearching && (
        <p className="text-sm opacity-70">
          {results.length === 0
            ? `No posts found for “${query.trim()}”`
            : `${results.length} ${
                results.length === 1 ? 'post' : 'posts'
              } found`}
        </p>
      )}

      {!(isSearching && results.length === 0) && <Posts posts={results} />}
    </div>
  );
};

export default PostSearch;
