'use client';

import { useState } from 'react';
import { Html } from '@react-three/drei';
import type { ThreeElements } from '@react-three/fiber';
import VoxelModel from './VoxelModel';
import { buildVoxelGeometry, createVoxels, speckle } from './voxels';

const VOXEL = 0.1;

const FUR = speckle(['#3a3a3f', '#434348', '#35353a']);
const HARNESS = '#7d8c5c';
const HARNESS_TRIM = '#667347';
const TAG = '#d64535';
const PATCH = '#e8e8e0';
const EYE = '#7a4a26';
const NOSE = '#111111';

const buildLoki = () => {
  const voxels = createVoxels();
  const { fill, carve } = voxels;

  fill([-2, 2], [0, 2], [-2, 1], FUR);
  fill([-3, -3], [0, 1], [-2, 0], FUR);
  fill([3, 3], [0, 1], [-2, 0], FUR);
  fill([-2, -2], [0, 0], [2, 2], FUR);
  fill([2, 2], [0, 0], [2, 2], FUR);
  fill([-1, -1], [0, 3], [2, 2], FUR);
  fill([1, 1], [0, 3], [2, 2], FUR);
  fill([-1, -1], [0, 0], [3, 3], FUR);
  fill([1, 1], [0, 0], [3, 3], FUR);
  fill([-2, 2], [3, 5], [-1, 2], FUR);
  fill([-1, 1], [6, 7], [0, 2], FUR);
  fill([-2, 2], [7, 7], [1, 3], FUR);
  fill([-2, 2], [8, 12], [0, 3], FUR);
  fill([-1, 1], [13, 13], [1, 2], FUR);
  fill([-1, 1], [7, 8], [4, 4], FUR);
  fill([0, 0], [7, 8], [5, 5], FUR);
  fill([-3, -3], [5, 10], [0, 2], FUR);
  fill([3, 3], [5, 10], [0, 2], FUR);
  carve(
    [-2, 12, 0],
    [2, 12, 0],
    [-2, 12, 3],
    [2, 12, 3],
    [-3, 5, 0],
    [3, 5, 0],
    [-3, 5, 2],
    [3, 5, 2],
  );
  fill([0, 0], [3, 4], [-3, -3], FUR);
  fill([-1, 1], [5, 6], [-4, -3], FUR);

  fill([-2, 2], [4, 5], [-1, 2], HARNESS);
  fill([-1, 1], [4, 5], [3, 3], HARNESS);
  fill([-1, 1], [6, 6], [2, 2], HARNESS_TRIM);
  fill([-2, 2], [3, 3], [2, 2], HARNESS_TRIM);
  fill([-1, -1], [5, 5], [3, 3], TAG);
  fill([1, 1], [4, 4], [3, 3], PATCH);

  fill([-1, -1], [9, 9], [3, 3], EYE);
  fill([1, 1], [9, 9], [3, 3], EYE);
  fill([0, 0], [8, 8], [5, 5], NOSE);

  return buildVoxelGeometry(voxels);
};

const geometry = buildLoki();

const Loki = (props: ThreeElements['group']) => {
  const [hovered, setHovered] = useState(false);

  return (
    <VoxelModel
      {...props}
      geometry={geometry}
      size={VOXEL}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {hovered && (
        <Html position={[0, 1.6, 0]} center>
          <div className="rounded-md bg-orange-200/80 px-2 py-0.5 text-sm whitespace-nowrap dark:bg-zinc-700/80">
            Loki 🐾
          </div>
        </Html>
      )}
    </VoxelModel>
  );
};

export default Loki;
