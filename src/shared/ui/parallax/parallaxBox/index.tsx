'use client';

import { ReactNode } from 'react';

import { motion } from 'motion/react';

import { useParallax } from './useParallax';

type ParallaxBoxProps = {
  children: ReactNode;
  className?: string;
  start: number;
  end: number;
};

export const ParallaxBox = ({
  children,
  className,
  start,
  end,
}: ParallaxBoxProps) => {
  const { ref, style } = useParallax({ start, end });

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
};
