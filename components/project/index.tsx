import ImageSlider from 'components/ui/ImageSlider';
import { classNames } from 'lib/helpers';
import React, { FC } from 'react';
import { Project } from 'types';
import Tag from './Tag';

type Props = {
  image_right?: boolean;
  project: Project;
};

const Project: FC<Props> = ({ project, image_right = false }) => {
  const order = image_right ? 'md:flex-row-reverse' : 'md:flex-row';
  const { images, title, date, tags, description } = project;

  return (
    <div className={classNames(order, 'flex flex-col justify-between')}>
      <div className="flex w-full md:w-2/3 overflow-hidden mb-auto justify-start">
        <ImageSlider images={images} />
      </div>
      <div className="w-full md:w-1/3 text-left md:text-center gap-3 pt-3 md:pt-0 px-0 md:pl-2 flex flex-col justify-between items-center">
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
