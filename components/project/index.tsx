import ImageSlider from 'components/ui/ImageSlider';
import { classNames } from 'lib/helpers';
import React, { FC } from 'react';
import Tag from './Tag';

type Props = {
  right?: boolean;
  images: string[];
  title: string;
  date: string;
  tags: string[];
  description: string;
};

const Project: FC<Props> = ({
  right = false,
  images,
  title,
  date,
  tags,
  description,
}) => {
  const order = right ? 'md:flex-row' : 'md:flex-row-reverse';

  return (
    <div className={classNames(order, 'flex flex-col justify-between py-3')}>
      <div className="flex w-full md:w-2/3 max-h-96">
        <ImageSlider images={images} />
      </div>
      <div className="w-full md:w-1/3 text-left md:text-center gap-3 py-10 md:py-5 px-0 md:px-4 flex flex-col justify-between items-center">
        <h3 className="text-xl w-full font-semibold dark:text-zinc-100 uppercase">
          {title}
        </h3>
        <div className="w-full text-xs dark:text-zinc-400 text-zinc-600">
          {date}
        </div>
        <p>{description}</p>
        <div className="w-full md:w-auto font-semibold uppercase dark:text-gray-500">
          Technology Stack
        </div>
        <div className="w-full md:w-auto flex flex-row flex-wrap items-baseline justify-start gap-3 text-zinc-100">
          {tags.map((tag) => (
            <Tag key={tag} title={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
