import Posts from 'components/posts/Posts';
import { getAllPosts } from 'lib/MDXLoader';
import { GetStaticProps } from 'next';
import { FC } from 'react';
import { Post } from 'types';

type Props = {
  posts: Post[];
};

const BlogPage: FC<Props> = ({ posts }) => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-zinc-100 mt-4 mb-4 md:mb-0">
        All Posts
      </h1>
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
