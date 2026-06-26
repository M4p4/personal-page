import React, { FC } from 'react';

type Props = {
  title: string;
};

const Tag: FC<Props> = ({ title }) => {
  return (
    <div className="rounded-md bg-teal-600 px-2 py-1 text-xs font-semibold">
      {title}
    </div>
  );
};

export default Tag;
