import type { Metadata } from 'next';
import { Suspense } from 'react';
import PostSearch, { PostSearchFromParams } from 'components/posts/PostSearch';
import Headline from 'components/ui/Headline';
import { getAllPosts } from 'lib/MDXLoader';

export const metadata: Metadata = {
  title: 'Web Development & SEO Blog',
  description:
    'Browse and search all my posts on programming and search engine optimization (SEO).',
};

export default function BlogPage() {
  const posts = getAllPosts([
    'title',
    'excerpt',
    'author',
    'coverImage',
    'date',
    'readTime',
    'slug',
    'content',
    'tags',
  ]);

  return (
    <>
      <h1 className="mt-4 mb-4 text-3xl font-bold tracking-tight md:text-4xl dark:text-zinc-100">
        Blog
      </h1>
      <p>I write about coding, trading, and whatever else is on my mind.</p>
      <Headline title="All Posts" />
      <Suspense fallback={<PostSearch posts={posts} />}>
        <PostSearchFromParams posts={posts} />
      </Suspense>
    </>
  );
}
