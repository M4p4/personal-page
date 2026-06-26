import type { Metadata } from 'next';
import Posts from 'components/posts/Posts';
import Headline from 'components/ui/Headline';
import { getAllPosts } from 'lib/MDXLoader';

export const metadata: Metadata = {
  title: 'Web Development & SEO Blog',
  description:
    'Welcome to my personal blog where I share my thoughts and experiences on programming and search engine optimization (SEO).',
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
  ]);

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-zinc-100 mt-4 mb-4">
        Blog
      </h1>
      <p>
        Welcome to my personal blog where I share my thoughts and experiences on
        programming and search engine optimization (SEO). Follow along as I
        delve into the latest technologies and techniques in these ever-evolving
        fields and learn how to improve your own skills and website&#39;s
        visibility.
      </p>
      <Headline title="Latest Posts" />
      <Posts posts={posts} />
    </>
  );
}
