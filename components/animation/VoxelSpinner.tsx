import React, { FC } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Html } from '@react-three/drei';

const VoxelSpinner = () => {
  return (
    <Html center>
      <Cog6ToothIcon className="w-12 h-12 animate-spin" />
    </Html>
  );
};

export default VoxelSpinner;
