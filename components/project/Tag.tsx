import React, { FC } from 'react';

type Props = {
  title: string;
};

const Tag: FC<Props> = ({ title }) => {
  return (
    <div className="bg-teal-600 text-xs font-semibold rounded-md px-2 py-1">
      {title}
    </div>
  );
};

export default Tag;
