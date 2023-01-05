import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import VoxelSpinner from './VoxelSpinner';

type Props = {};

const Model = () => {
  const glb = useLoader(GLTFLoader, '/animations/jaro.glb');
  return (
    <>
      <primitive object={glb.scene} scale={1.4} position={[0, -1, 0]} />
    </>
  );
};

const VoxelLoader = (props: Props) => {
  return (
    <div className="w-full h-96">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 4, 5] }}>
        <ambientLight intensity={0.5} position={[4, 4, 5]} />
        <ambientLight intensity={0.5} position={[1000, 1000, 500]} />
        <Suspense fallback={<VoxelSpinner />}>
          <Model />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
};

export default VoxelLoader;
