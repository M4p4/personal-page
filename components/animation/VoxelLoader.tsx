'use client';

import React, { Suspense, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import VoxelSpinner from './VoxelSpinner';
import Loki from './Loki';
import Decor from './Decor';
import MugSteam from './MugSteam';
import { retouchAtlas } from './retouchAtlas';

const TABLE_COLOR = '#b07a4a';
const cameraPosition: [number, number, number] = [4, 4, 5];
const polarAngle = Math.acos(cameraPosition[1] / Math.hypot(...cameraPosition));

const Model = () => {
  const { scene } = useGLTF('/animations/jaro.glb');
  useLayoutEffect(() => retouchAtlas(scene, TABLE_COLOR), [scene]);

  return (
    <group scale={1.4} position={[0, -1, 0]}>
      <primitive object={scene} />
      <Decor />
      <MugSteam position={[1.3, 1.8, 0.7]} />
      <Loki position={[2.25, 0.2, 0.9]} rotation={[0, 0.5, 0]} />
    </group>
  );
};

const VoxelLoader = () => {
  return (
    <div className="h-96 w-full cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ position: cameraPosition }}>
        {/* Intensities scaled up for three r155+ physically-correct lighting
            (legacy lighting was the default under the old three/r3f versions). */}
        <ambientLight intensity={1.5} position={[4, 4, 5]} />
        <ambientLight intensity={4.5} position={[1000, 1000, 500]} />
        <Suspense fallback={<VoxelSpinner />}>
          <Model />
        </Suspense>
        <OrbitControls
          autoRotate
          rotateSpeed={0.35}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={polarAngle}
          maxPolarAngle={polarAngle}
        />
      </Canvas>
    </div>
  );
};

export default VoxelLoader;
