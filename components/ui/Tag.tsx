import React, { FC } from 'react';

type Props = {
  title: string;
};

const Tag: FC<Props> = ({ title }) => {
  return (
    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
      # {title}
    </span>
  );
};

export default Tag;
