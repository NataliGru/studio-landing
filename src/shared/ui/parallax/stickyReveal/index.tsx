'use client';

import { ReactNode, RefObject } from 'react';

import { motion } from 'motion/react';

import { cn } from '@/shared/lib';
import { StickyRevealEffects } from '@/shared/types';

import { useStickyReveal } from './useStickyReveal';

type StickyRevealProps = {
  targetRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  effects?: StickyRevealEffects;
  className?: string;
};

export const StickyReveal = ({
  targetRef,
  children,
  effects,
  className,
}: StickyRevealProps) => {
  const { style } = useStickyReveal({ targetRef, effects });

  return (
    <motion.div
      className={cn('sticky top-0 h-screen w-full', className)}
      style={style}
    >
      {children}
    </motion.div>
  );
};
