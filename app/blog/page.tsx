import type { Metadata } from 'next';
import PostSearch from 'components/posts/PostSearch';
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
  ]);

  return (
    <>
      <h1 className="mt-4 mb-4 text-3xl font-bold tracking-tight md:text-4xl dark:text-zinc-100">
        Blog
      </h1>
      <p>
        Welcome to my personal blog where I share my thoughts and experiences on
        programming and search engine optimization (SEO).
      </p>
      <Headline title="All Posts" />
      <PostSearch posts={posts} />
    </>
  );
}
