import { getAllSlugs, getPostBySlug } from 'lib/MDXLoader';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { Post } from 'types';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import rehypeHighlight from 'rehype-highlight';

type Props = {
  post: Post;
  source: any;
};

const BlogPostPage: FC<Props> = ({ post, source }) => {
  return (
    <article className="prose dark:prose-invert">
      <h1 className="text-4xl font-bold dark:text-zinc-100">{post.title}</h1>
      <MDXRemote {...source} components={{}} />
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs();
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  const post = getPostBySlug(slug as string, ['title', 'content']);
  const mdxSource = await serialize(post.content, {
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });
  return {
    props: { post: post, source: mdxSource },
  };
};

export default BlogPostPage;
