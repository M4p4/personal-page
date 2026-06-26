import React, { FC } from 'react';
import { classNames } from '../../lib/helpers';

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const NavbarButton: FC<Props> = ({ children, className = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        className,
        'rounded-md border border-zinc-400 p-2 hover:bg-orange-200 dark:border-zinc-700 dark:hover:bg-zinc-800',
      )}
    >
      {children}
    </button>
  );
};

export default NavbarButton;
