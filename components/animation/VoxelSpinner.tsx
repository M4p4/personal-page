import React, { FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { Html } from '@react-three/drei';

const VoxelSpinner = () => {
  return (
    <Html center>
      <ArrowPathIcon className="w-12 h-12 animate-spin" />
    </Html>
  );
};

export default VoxelSpinner;
