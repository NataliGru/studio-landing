'use client';

import { ReactNode } from 'react';

import { motion } from 'motion/react';

import { useParallax } from './useParallax';

type ParallaxBoxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Initial vertical offset in pixels.
   *
   * Positive values place the element lower at the start of its scroll range,
   * negative values place it higher. Example: `start={200}` begins 200px down.
   */
  start: number;
  /**
   * Final vertical offset in pixels.
   *
   * This is where the element moves by the end of its scroll range.
   * Example: `start={200}` and `end={-200}` moves the element upward by 400px.
   */
  end: number;
  /**
   * Optional opacity output range for the preset fade animation.
   * Use `[1, 1]` to keep the element fully visible.
   */
  opacityRange?: [number, number];
  /**
   * Optional scale output range for the preset scale animation.
   * Use `[1, 1]` to keep the element at its original size.
   */
  scaleRange?: [number, number];
};

export const ParallaxBox = ({
  children,
  className,
  start,
  end,
  opacityRange,
  scaleRange,
}: ParallaxBoxProps) => {
  const { ref, style } = useParallax({ start, end, opacityRange, scaleRange });

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
};
