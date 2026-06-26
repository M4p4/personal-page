import { blurImage } from 'lib/helpers';
import Image from 'next/image';
import React, { FC } from 'react';
import type { Project } from 'types';
import Tag from './Tag';

type Props = {
  project: Project;
};

const Project: FC<Props> = ({ project }) => {
  const { image, title, date, tags, description } = project;
  return (
    <div className="flex flex-col items-center md:flex-row">
      <Image
        className="w-full rounded-md md:w-2/3"
        src={image}
        alt={title}
        width={900}
        height={600}
        placeholder="blur"
        blurDataURL={blurImage(900, 600)}
      />
      <div className="flex w-full flex-col items-center justify-between gap-3 px-0 pt-3 text-left md:w-1/2 md:pt-0 md:pl-2 md:text-center">
        <h3 className="w-full text-xl font-semibold tracking-tight uppercase dark:text-zinc-100">
          {title}
        </h3>
        <div className="w-full text-xs text-zinc-600 dark:text-zinc-400">
          {date}
        </div>
        <p>{description}</p>
        <div className="w-full font-semibold uppercase md:hidden md:w-auto dark:text-gray-500">
          Technology Stack
        </div>
        <div className="flex w-full flex-row flex-wrap items-baseline justify-start gap-3 text-zinc-100 md:w-auto md:justify-center">
          {tags.map((tag) => (
            <Tag key={tag} title={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
