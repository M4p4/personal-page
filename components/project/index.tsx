import { blurImage } from 'lib/helpers';
import Image from 'next/image';
import React, { FC } from 'react';
import { Project } from 'types';
import Tag from './Tag';

type Props = {
  project: Project;
};

const Project: FC<Props> = ({ project }) => {
  const { image, title, date, tags, description } = project;
  return (
    <div className="flex flex-col md:flex-row items-center">
      <Image
        className="w-full md:w-2/3 rounded-md"
        src={image}
        alt={title}
        width={900}
        height={600}
        placeholder="blur"
        blurDataURL={blurImage(1024, 1024)}
      />
      <div className="w-full md:w-1/2 text-left md:text-center gap-3 pt-3 md:pt-0 px-0 md:pl-2 flex flex-col justify-between items-center">
        <h3 className="text-xl w-full font-semibold dark:text-zinc-100 uppercase tracking-tight">
          {title}
        </h3>
        <div className="w-full text-xs dark:text-zinc-400 text-zinc-600">
          {date}
        </div>
        <p>{description}</p>
        <div className="w-full md:w-auto font-semibold uppercase dark:text-gray-500 md:hidden">
          Technology Stack
        </div>
        <div className="w-full md:w-auto flex flex-row flex-wrap items-baseline justify-start md:justify-center gap-3 text-zinc-100">
          {tags.map((tag) => (
            <Tag key={tag} title={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
