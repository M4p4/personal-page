import Posts from 'components/posts/Posts';
import { getAllPosts } from 'lib/MDXLoader';
import { GetStaticProps } from 'next';
import { FC } from 'react';
import { Post } from 'types';
import NextHeadSeo from 'next-head-seo';

type Props = {
  posts: Post[];
};

const BlogPage: FC<Props> = ({ posts }) => {
  return (
    <>
      <NextHeadSeo
        title="Web Development & SEO Blog"
        description="Welcome to my personal blog where I share my thoughts and experiences on
        programming and search engine optimization (SEO)."
      />
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
      <h2 className="text-2xl font-semibold dark:text-zinc-100 py-4">
        Latest Posts
      </h2>
      <Posts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = getAllPosts([
    'title',
    'excerpt',
    'author',
    'coverImage',
    'date',
    'readTime',
    'slug',
  ]);
  return {
    props: { posts },
  };
};

export default BlogPage;
