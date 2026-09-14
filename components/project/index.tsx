import GithubIcon from 'components/icons/GithubIcon';
import { blurImage } from 'lib/helpers';
import Image from 'next/image';
import React, { FC } from 'react';
import type { Project } from 'types';
import Tag from './Tag';

type Props = {
  project: Project;
};

const Project: FC<Props> = ({ project }) => {
  const { image, title, date, tags, description, github } = project;
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-8">
      <Image
        className="w-full rounded-md object-cover md:w-3/5"
        src={image}
        alt={title}
        width={900}
        height={600}
        placeholder="blur"
        blurDataURL={blurImage(900, 600)}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-xl border border-orange-200 p-5 dark:border-zinc-700">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight dark:text-zinc-100">
            {title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{date}</p>
        </div>
        <p>{description}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {tags.map((tag) => (
            <Tag key={tag} title={tag} />
          ))}
        </div>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium transition-colors hover:border-orange-600 hover:text-orange-600 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-orange-400 dark:hover:text-orange-400"
          >
            <GithubIcon className="h-4 w-4" />
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default Project;
