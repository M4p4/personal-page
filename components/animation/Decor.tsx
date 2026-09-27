'use client';

import VoxelModel from './VoxelModel';
import { buildVoxelGeometry, createVoxels, speckle } from './voxels';

const buildPlant = () => {
  const voxels = createVoxels();
  const { fill, disc, blob, carve, set } = voxels;
  const leaf = speckle(['#4f8a45', '#5d9b4f', '#467f3e']);
  const stem = '#3f6b3a';

  disc(0, 0, [0, 4], 2.6, speckle(['#c96f4a', '#c26945']));
  disc(0, 0, [5, 5], 3.1, '#a95a3a');
  disc(0, 0, [5, 5], 2.2, '#4a3222');
  fill([0, 0], [6, 12], [0, 0], stem);
  fill([-1, -1], [6, 9], [1, 1], stem);
  fill([1, 1], [6, 10], [-1, -1], stem);
  set(-2, 10, 2, stem);
  set(2, 11, -2, stem);

  blob([0, 13, 0], [3, 1.6, 3], leaf);
  blob([-3.5, 10.5, 2.5], [2.6, 1.2, 2.2], leaf);
  blob([3.5, 11.5, -2.5], [2.6, 1.2, 2.2], leaf);
  blob([-2.5, 15, -2], [2.2, 1.3, 2.2], leaf);
  blob([2.5, 15.5, 2], [2.2, 1.3, 2.2], leaf);
  blob([0, 17.5, 0], [1.8, 1.2, 1.8], leaf);
  carve([-4, 11, 3], [4, 12, -3], [1, 14, 1], [-2, 16, -2], [3, 16, 2]);

  return buildVoxelGeometry(voxels);
};

const buildDogBed = () => {
  const voxels = createVoxels();
  const { ring, disc } = voxels;
  const bed = speckle(['#d9844f', '#cf7a46']);

  disc(0, 0, [0, 0], 5, bed);
  ring(0, 0, [1, 2], 3.9, 5, bed);
  disc(0, 0, [1, 1], 3.9, speckle(['#f1e4cc', '#eadbbf']));

  return buildVoxelGeometry(voxels);
};

const buildBone = () => {
  const voxels = createVoxels();
  const { fill } = voxels;
  const bone = '#f3ecdc';

  fill([-3, 3], [0, 0], [0, 0], bone);
  fill([-4, -4], [0, 1], [-1, 1], bone);
  fill([4, 4], [0, 1], [-1, 1], bone);

  return buildVoxelGeometry(voxels);
};

const plant = buildPlant();
const dogBed = buildDogBed();
const bone = buildBone();

const Decor = () => (
  <>
    <VoxelModel
      geometry={plant}
      size={0.08}
      shadow={0.45}
      position={[-2.35, 0, 1]}
    />
    <VoxelModel
      geometry={dogBed}
      size={0.1}
      shadow={0.6}
      position={[2.25, 0, 0.9]}
    />
    <VoxelModel
      geometry={bone}
      size={0.05}
      position={[2.55, 0, 0.1]}
      rotation={[0, -0.4, 0]}
    />
  </>
);

export default Decor;
