import React, { FC } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Html } from '@react-three/drei';

const VoxelSpinner = () => {
  return (
    <Html center>
      <Cog6ToothIcon className="h-12 w-12 animate-spin" />
    </Html>
  );
};

export default VoxelSpinner;
