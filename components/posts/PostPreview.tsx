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
      <Link className="group" href={`/blog/${post.slug}`}>
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-4">
          <Image
            className="h-64 w-full rounded-xl border border-slate-300 bg-white object-cover group-hover:brightness-125 md:h-36 md:w-48 dark:border-zinc-700"
            src={post.coverImage}
            alt={post.title}
            placeholder="blur"
            blurDataURL={blurImage(480, 320)}
            width={480}
            height={320}
          />
          <div className="flex flex-col items-center justify-start gap-2 py-2">
            <div className="w-full text-left text-xl font-medium text-orange-600 group-hover:underline dark:text-orange-400">
              {post.title}
            </div>
            <div className="inline-flex w-full items-center justify-start gap-2 text-left text-sm font-normal opacity-70">
              <span>{postDate}</span> ·<span>{post.readTime} read</span>
            </div>
            <div className="w-full text-left text-sm opacity-80">
              {post.excerpt}
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link className="group" href={`/blog/${post.slug}`}>
        <div className="group flex w-full cursor-pointer flex-col">
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

          <div className="pt-3 pb-1 text-center">{post.title}</div>
        </div>
      </Link>
    );
  }
};

export default PostPreview;
