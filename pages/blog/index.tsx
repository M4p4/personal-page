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
      <h1 className="text-3xl md:text-4xl font-semibold dark:text-zinc-100 py-3">
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
