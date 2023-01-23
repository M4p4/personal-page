import React, { FC } from 'react';

type Props = {
  title: string;
};

const Headline: FC<Props> = ({ title }) => {
  return (
    <h2 className="text-2xl font-semibold dark:text-zinc-100 py-4 mt-3 md:mt-5">
      {title}
    </h2>
  );
};

export default Headline;
