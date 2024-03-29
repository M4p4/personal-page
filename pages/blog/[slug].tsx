import { getAllSlugs, getPostBySlug } from 'lib/MDXLoader';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { Post } from 'types';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import rehypeHighlight from 'rehype-highlight';
import Moment from 'moment';
import NextHeadSeo from 'next-head-seo';

type Props = {
  post: Post;
  source: any;
};

const BlogPostPage: FC<Props> = ({ post, source }) => {
  return (
    <>
      <NextHeadSeo title={`${post.title}`} description={`${post.excerpt}`} />
      <article className="prose justify-between dark:prose-invert mt-4 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight md:tracking-normal dark:text-zinc-100 mb-0">
          {post.title}
        </h1>
        <div className="flex justify-start space-x-2 items-center mt-2">
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-6 h-6 rounded-full m-0"
          />
          <div className="text-sm">
            {post.author.name} / {Moment(post.date).format('d MMM YYYY')} /{' '}
            {post.readTime} read
          </div>
        </div>
        <MDXRemote {...source} components={{}} />
      </article>
    </>
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
  const post = getPostBySlug(slug as string, [
    'title',
    'content',
    'author',
    'readTime',
    'date',
    'excerpt',
  ]);
  const mdxSource = await serialize(post.content, {
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });
  return {
    props: { post: post, source: mdxSource },
  };
};

export default BlogPostPage;
