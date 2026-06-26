import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import { getAllSlugs, getPostBySlug } from 'lib/MDXLoader';
import { formatDate } from 'lib/helpers';
import MDXComponents from 'components/ui/MDXComponents';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, ['title', 'excerpt', 'ogImage']);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.ogImage?.url ? [post.ogImage.url] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, [
    'title',
    'content',
    'author',
    'readTime',
    'date',
    'excerpt',
  ]);

  return (
    <div className="mx-auto max-w-prose">
      <h1 className="mt-4 mb-0 text-3xl font-bold tracking-tight text-orange-600 md:text-4xl md:tracking-normal dark:text-orange-400">
        {post.title}
      </h1>
      <div className="mt-4 flex items-center justify-start gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.author.image}
          alt={post.author.name}
          className="m-0 h-6 w-6 rounded-full"
        />
        <div className="text-sm opacity-70">
          {post.author.name} · {formatDate(post.date)} · {post.readTime} read
        </div>
      </div>
      <article className="prose mt-4 dark:prose-invert">
        <MDXRemote
          source={post.content}
          components={MDXComponents}
          options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
        />
      </article>
    </div>
  );
}
