'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ReactNode } from 'react';

const variants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    },
  },
};

type Props = {
  children: ReactNode;
};

export const PageTransition = ({ children }: Props) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <>{children}</>;
  return (
    <motion.div initial="initial" animate="enter" variants={variants}>
      {children}
    </motion.div>
  );
};
