'use client';

import { useMemo } from 'react';
import type { ThreeElements } from '@react-three/fiber';
import { BufferGeometry, CanvasTexture } from 'three';

const BAKED_LIGHT_BALANCE = '#bcbcbc';

const createShadowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new CanvasTexture(canvas);
};

type VoxelModelProps = ThreeElements['group'] & {
  geometry: BufferGeometry;
  size: number;
  shadow?: number;
};

const VoxelModel = ({
  geometry,
  size,
  shadow,
  children,
  ...props
}: VoxelModelProps) => {
  const shadowTexture = useMemo(
    () => (shadow ? createShadowTexture() : null),
    [shadow],
  );

  return (
    <group {...props}>
      {shadowTexture && shadow && (
        <mesh rotation-x={-Math.PI / 2} position-y={0.005} scale={shadow * 2}>
          <planeGeometry />
          <meshBasicMaterial
            map={shadowTexture}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      )}
      <mesh geometry={geometry} scale={size}>
        <meshStandardMaterial
          vertexColors
          color={BAKED_LIGHT_BALANCE}
          roughness={0.9}
        />
      </mesh>
      {children}
    </group>
  );
};

export default VoxelModel;
