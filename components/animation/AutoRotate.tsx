'use client';

import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

const SECONDS_PER_TURN = 30;
const MAX_FRAME_DELTA = 0.1;

const AutoRotate = ({ children }: { children: ReactNode }) => {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y +=
      ((Math.PI * 2) / SECONDS_PER_TURN) * Math.min(delta, MAX_FRAME_DELTA);
  });

  return <group ref={group}>{children}</group>;
};

export default AutoRotate;
