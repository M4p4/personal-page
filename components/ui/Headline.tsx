import React, { FC } from 'react';

type Props = {
  title: string;
};

const Headline: FC<Props> = ({ title }) => {
  return (
    <h2 className="mt-3 py-4 text-xl leading-tight font-semibold md:mt-5 md:leading-normal lg:text-2xl dark:text-zinc-100">
      {title}
    </h2>
  );
};

export default Headline;
