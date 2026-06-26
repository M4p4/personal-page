'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import VoxelSpinner from './VoxelSpinner';

const Model = () => {
  const { scene } = useGLTF('/animations/jaro.glb');
  return <primitive object={scene} scale={1.4} position={[0, -1, 0]} />;
};

const VoxelLoader = () => {
  return (
    <div className="h-96 w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 4, 5] }}>
        {/* Intensities scaled up for three r155+ physically-correct lighting
            (legacy lighting was the default under the old three/r3f versions). */}
        <ambientLight intensity={1.5} position={[4, 4, 5]} />
        <ambientLight intensity={4.5} position={[1000, 1000, 500]} />
        <Suspense fallback={<VoxelSpinner />}>
          <Model />
        </Suspense>
        <OrbitControls rotateSpeed={0.001} autoRotate enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default VoxelLoader;
