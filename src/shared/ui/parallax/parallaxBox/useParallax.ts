'use client';

import { useMotionTemplate, useTransform } from 'motion/react';

import { useScrollProgress } from '@/shared/hooks';

type UseParallaxOptions = {
  start?: number;
  end?: number;
  opacityRange?: [number, number];
  scaleRange?: [number, number];
};

/**
 * ParallaxBox animation preset.
 *
 * Converts the element's scroll progress into the specific movement, opacity,
 * and scale effect used by `ParallaxBox`. Keep generic scroll behavior in
 * `useScrollProgress`; this hook should only describe this component preset.
 */
export const useParallax = ({
  start = 0,
  end = -200,
  opacityRange = [1, 0],
  scaleRange = [1, 0.85],
}: UseParallaxOptions = {}) => {
  const { ref, scrollYProgress } = useScrollProgress({
    offset: [`${start}px end`, `end ${Math.abs(end)}px`],
  });

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const opacity = useTransform(scrollYProgress, [0.75, 1], opacityRange);
  const scale = useTransform(scrollYProgress, [0.5, 1], scaleRange);

  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return {
    ref,
    style: {
      opacity,
      transform,
    },
    scrollYProgress,
  };
};
