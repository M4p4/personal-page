'use client';

import { useRef } from 'react';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import type { Mesh, MeshBasicMaterial } from 'three';

const PUFFS = 4;
const DURATION = 2.4;
const RISE = 0.6;

const MugSteam = (props: ThreeElements['group']) => {
  const puffs = useRef<Mesh[]>([]);

  useFrame(({ clock }) => {
    puffs.current.forEach((puff, index) => {
      const progress =
        ((clock.elapsedTime + (index * DURATION) / PUFFS) % DURATION) /
        DURATION;
      puff.position.set(
        Math.sin(progress * Math.PI * 2 + index) * 0.05,
        progress * RISE,
        0,
      );
      puff.scale.setScalar(0.07 * (1 - progress * 0.5));
      (puff.material as MeshBasicMaterial).opacity =
        0.55 * Math.sin(progress * Math.PI);
    });
  });

  return (
    <group {...props}>
      {Array.from({ length: PUFFS }, (_, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            if (mesh) puffs.current[index] = mesh;
          }}
        >
          <boxGeometry />
          <meshBasicMaterial color="#f5f5f5" transparent depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
};

export default MugSteam;
