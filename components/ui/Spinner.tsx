import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

const Spinner = () => {
  return (
    <div className="w-full h-96 flex justify-center items-center dark:bg-zinc-900 dark:text-zinc-300">
      <Cog6ToothIcon className="w-12 h-12 animate-spin" />
    </div>
  );
};

export default Spinner;
