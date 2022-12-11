import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import { Post, PostPreviewMode } from '../../types';

type Props = {
  mode: PostPreviewMode;
  post: Post;
};

const PostPreview: FC<Props> = ({ post, mode }) => {
  const { date } = post;
  const postDate = useMemo(() => new Date(date).toLocaleDateString(), [date]);

  if (mode === 'full') {
    return (
      <Link className="group" href={`/blog/${post.slug}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <Image
            className="rounded-xl object-cover h-64 w-full md:w-auto md:h-36 bg-orange-200 border border-slate-300 dark:border-zinc-700 group-hover:brightness-125"
            src="/images/test.jpg"
            alt="test"
            width={480}
            height={320}
          />
          <div className="flex flex-col justify-start items-center gap-2 py-2">
            <div className="text-left w-full font-normal text-sm inline-flex justify-start items-center gap-2 text-orange-800 dark:text-orange-400">
              <span>{postDate}</span> •<span>{post.readTime} read</span>
            </div>
            <div className="text-left w-full font-medium text-xl">
              {post.title}
            </div>
            <div className="text-left text-sm w-full opacity-80">
              {post.excerpt}
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link className="group" href={`/blog/${post.slug}`}>
        <div className="flex flex-col w-full group cursor-pointer">
          <div className="relative">
            <Image
              className="rounded-xl object-cover w-full h-48 bg-orange-200 border border-slate-300 dark:border-zinc-700"
              src="/images/test.jpg"
              alt="test"
              width={480}
              height={320}
            />
            <div className="absolute bottom-1 right-1">
              <span className="opacity-0 group-hover:opacity-100 font-medium text-xs bg-orange-200 dark:bg-zinc-800 p-1 rounded-md group-hover:bg-opacity-80 duration-500 ease-in-out">
                {post.readTime} read
              </span>
            </div>
          </div>

          <div className="text-center pt-3 pb-1">{post.title}</div>
        </div>
      </Link>
    );
  }
};

export default PostPreview;
