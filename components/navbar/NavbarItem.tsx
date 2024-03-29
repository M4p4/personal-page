import Link from 'next/link';
import React, { FC } from 'react';
import { classNames } from '../../lib/helpers';

type Props = {
  isActive?: boolean;
  text: string | React.ReactNode;
  href: string;
  isMobile?: boolean;
};

const NavbarItem: FC<Props> = ({
  text,
  href,
  isActive = false,
  isMobile = false,
}) => {
  let className = classNames(
    isMobile
      ? 'text-center dark:bg-zinc-700 dark:hover:bg-zinc-600 max-h-10  bg-orange-300 hover:bg-orange-200 rounded-md py-2 mb-1'
      : 'p-2 hover:bg-orange-200 dark:hover:bg-zinc-800 rounded-md hidden md:flex',
    isActive ? 'font-semibold dark:text-zinc-50' : 'dark:text-zinc-100'
  );

  return (
    <Link href={href}>
      <div className={className}>{text}</div>
    </Link>
  );
};

export default NavbarItem;
