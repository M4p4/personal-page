import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

const Spinner = () => {
  return (
    <div className="flex h-96 w-full items-center justify-center dark:bg-zinc-900 dark:text-zinc-300">
      <Cog6ToothIcon className="h-12 w-12 animate-spin" />
    </div>
  );
};

export default Spinner;
