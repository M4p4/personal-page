import Image from 'next/image';
import React, { FC } from 'react';

type Props = {};

const PostPreview: FC<Props> = ({}) => {
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
          <span className="opacity-0 group-hover:opacity-100 font-medium text-xs bg-orange-300 dark:bg-zinc-800 p-1 rounded-md group-hover:bg-opacity-80 duration-500 ease-in-out">
            {3333} views
          </span>
        </div>
        <div className="absolute bottom-1 right-1">
          <span className="opacity-0 group-hover:opacity-100 font-medium text-xs bg-orange-300 dark:bg-zinc-800 p-1 rounded-md group-hover:bg-opacity-80 duration-500 ease-in-out">
            {1} min read
          </span>
        </div>
      </div>

      <div className="text-center pt-3 pb-1">{'I am a test title'}</div>
    </div>
  );
};

export default PostPreview;
