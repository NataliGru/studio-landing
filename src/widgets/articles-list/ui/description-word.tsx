'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';
import {
  DESCRIPTION_SPREAD,
  DESCRIPTION_WORD_DURATION,
  DESCRIPTION_START_OPACITY,
} from '../model/constants';

interface DescriptionWordProps {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
}

export const DescriptionWord = ({
  children,
  progress,
  index,
  count,
}: DescriptionWordProps) => {
  const start = count <= 1 ? 0 : (index / (count - 1)) * DESCRIPTION_SPREAD;
  const end = Math.min(1, start + DESCRIPTION_WORD_DURATION);

  const opacity = useTransform(
    progress,
    [start, end],
    [DESCRIPTION_START_OPACITY, 1],
  );

  return <motion.span style={{ opacity }}>{children}</motion.span>;
};
