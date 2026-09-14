import { classNames, tagHref } from 'lib/helpers';
import React, { FC } from 'react';
import Tag from './Tag';

type Props = {
  tags: string[];
  linked?: boolean;
  className?: string;
};

const TagList: FC<Props> = ({ tags, linked = false, className = '' }) => {
  if (tags.length === 0) return null;

  return (
    <div className={classNames('flex flex-wrap gap-x-3 gap-y-1', className)}>
      {tags.map((tag) => (
        <Tag key={tag} title={tag} href={linked ? tagHref(tag) : undefined} />
      ))}
    </div>
  );
};

export default TagList;
