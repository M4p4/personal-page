import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import { getAllSlugs, getPostBySlug } from 'lib/MDXLoader';
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

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export default async function BlogPostPage({
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
    <div className="max-w-prose mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight md:tracking-normal dark:text-zinc-100 mb-0 mt-4">
        {post.title}
      </h1>
      <div className="flex justify-start gap-2 items-center mt-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.author.image}
          alt={post.author.name}
          className="w-6 h-6 rounded-full m-0"
        />
        <div className="text-sm">
          {post.author.name} / {formatDate(post.date)} / {post.readTime} read
        </div>
      </div>
      <article className="prose dark:prose-invert mt-4">
        <MDXRemote
          source={post.content}
          components={MDXComponents}
          options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
        />
      </article>
    </div>
  );
}
