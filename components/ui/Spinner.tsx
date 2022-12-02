import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const Spinner = () => {
  return (
    <div className="w-full h-96 flex justify-center items-center">
      <ArrowPathIcon className="w-12 h-12 animate-spin" />
    </div>
  );
};

export default Spinner;
