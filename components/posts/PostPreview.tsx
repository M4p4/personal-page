import Image from 'next/image';
import React, { FC } from 'react';
import { PostPreviewMode } from '../../types';
import { EyeIcon } from '@heroicons/react/24/solid';

type Props = {
  mode: PostPreviewMode;
};

const PostPreview: FC<Props> = ({ mode }) => {
  if (mode === 'full') {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
        <Image
          className="rounded-xl object-fill h-64 w-full md:w-auto md:h-36 bg-orange-200 border border-slate-300 dark:border-zinc-700 hover:brightness-125"
          src="/images/test.jpg"
          alt="test"
          width={480}
          height={320}
        />
        <div className="flex flex-col justify-start items-center gap-2 py-2">
          <div className="text-left w-full font-normal text-sm inline-flex justify-start items-center gap-2 text-orange-800 dark:text-orange-400">
            <span>November 11, 2021</span> •<span>10 min read</span> •
            <span>258,757 views</span>
          </div>
          <div className="text-left w-full font-medium text-xl">
            {'I am a test title'}
          </div>
          <div className="text-left text-sm w-full text-zinc-800 dark:text-zinc-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            aspernatur minus, similique quas aliquid minima veniam ratione cum
            ea ipsa.
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full group cursor-pointer">
        <div className="relative group-hover:scale-105">
          <Image
            className="rounded-xl object-fill h-48 md:h-40 bg-orange-200 border border-slate-300 dark:border-zinc-700"
            src="/images/test.jpg"
            alt="test"
            width={480}
            height={320}
          />
          <div className="absolute bottom-1 left-1">
            <span className="inline-flex gap-1 opacity-0 group-hover:opacity-100 font-medium text-xs bg-orange-200 dark:bg-zinc-800 p-1 rounded-md group-hover:bg-opacity-80 duration-500 ease-in-out">
              1337 <EyeIcon className="w-4 h-4" />
            </span>
          </div>
          <div className="absolute bottom-1 right-1">
            <span className="opacity-0 group-hover:opacity-100 font-medium text-xs bg-orange-200 dark:bg-zinc-800 p-1 rounded-md group-hover:bg-opacity-80 duration-500 ease-in-out">
              {1} min read
            </span>
          </div>
        </div>

        <div className="text-center pt-3 pb-1">{'I am a test title'}</div>
      </div>
    );
  }
};

export default PostPreview;
