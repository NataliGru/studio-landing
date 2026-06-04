'use client';

import { RefObject, useMemo } from 'react';

import { MotionStyle, useMotionTemplate, useTransform } from 'motion/react';

import { useScrollProgress } from '@/shared/hooks';
import { StickyRevealEffects } from '@/shared/types';

type UseStickyRevealOptions = {
  targetRef: RefObject<HTMLElement | null>;
  effects?: StickyRevealEffects;
};

const DEFAULT_EFFECTS: StickyRevealEffects = {
  fade: true,
  clip: false,
  scale: false,
};

/**
 * StickyReveal animation preset.
 *
 * Builds the fade, scale, and clip-path styles for the `StickyReveal`
 * component from the scroll progress of its parent section.
 */
export const useStickyReveal = ({
  targetRef,
  effects,
}: UseStickyRevealOptions) => {
  const resolvedEffects = {
    ...DEFAULT_EFFECTS,
    ...effects,
  };

  const { scrollYProgress } = useScrollProgress({
    targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  const clipStart = useTransform(scrollYProgress, [0, 0.75], [25, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 0.75], [75, 100]);

  const clipPath = useMotionTemplate`
    polygon(
      ${clipStart}% ${clipStart}%,
      ${clipEnd}% ${clipStart}%,
      ${clipEnd}% ${clipEnd}%,
      ${clipStart}% ${clipEnd}%
    )
  `;

  const style = useMemo<MotionStyle>(() => {
    return {
      ...(resolvedEffects.fade && { opacity }),
      ...(resolvedEffects.scale && { scale }),
      ...(resolvedEffects.clip && { clipPath }),
    };
  }, [
    resolvedEffects.fade,
    resolvedEffects.scale,
    resolvedEffects.clip,
    opacity,
    scale,
    clipPath,
  ]);

  return {
    scrollYProgress,
    style,
  };
};
