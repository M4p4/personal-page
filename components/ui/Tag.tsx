import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  title: string;
  href?: string;
};

const Tag: FC<Props> = ({ title, href }) => {
  if (href) {
    return (
      <Link
        href={href}
        className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
      >
        # {title}
      </Link>
    );
  }

  return (
    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
      # {title}
    </span>
  );
};

export default Tag;
