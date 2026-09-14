import TagList from 'components/ui/TagList';
import { blurImage, formatDate } from 'lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { Post, PostPreviewMode } from '../../types';

type Props = {
  mode: PostPreviewMode;
  post: Post;
};

const PostPreview: FC<Props> = ({ post, mode }) => {
  const postDate = formatDate(post.date);

  if (mode === 'full') {
    return (
      <div className="group relative flex flex-col items-center gap-2 md:flex-row md:gap-4">
        <Image
          className="h-64 w-full shrink-0 rounded-xl border border-slate-300 bg-white object-cover group-hover:brightness-125 md:h-36 md:w-48 dark:border-zinc-700"
          src={post.coverImage}
          alt={post.title}
          placeholder="blur"
          blurDataURL={blurImage(480, 320)}
          width={480}
          height={320}
        />
        <div className="flex w-full min-w-0 flex-1 flex-col gap-2 py-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-left text-xl font-medium group-hover:underline after:absolute after:inset-0 dark:text-zinc-100"
          >
            {post.title}
          </Link>
          <div className="inline-flex w-full items-center justify-start gap-2 text-left text-sm font-normal opacity-70">
            <span>{postDate}</span> ·<span>{post.readTime} read</span>
          </div>
          <TagList tags={post.tags} linked className="relative z-10 w-fit" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="group relative flex w-full flex-col">
        <div className="relative">
          <Image
            className="h-48 w-full rounded-xl border border-slate-300 bg-white object-cover dark:border-zinc-700"
            src={post.coverImage}
            alt={post.title}
            placeholder="blur"
            blurDataURL={blurImage(480, 320)}
            width={480}
            height={320}
          />
          <div className="absolute right-1 bottom-1">
            <span className="group-hover:bg-opacity-80 rounded-md bg-orange-200 p-1 text-xs font-medium opacity-0 duration-500 ease-in-out group-hover:opacity-100 dark:bg-zinc-800">
              {post.readTime} read
            </span>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="block pt-3 pb-1 text-center after:absolute after:inset-0"
        >
          {post.title}
        </Link>
        <TagList
          tags={post.tags}
          linked
          className="relative z-10 mx-auto w-fit justify-center"
        />
      </div>
    );
  }
};

export default PostPreview;
