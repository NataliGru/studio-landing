'use client';

import { RefObject, useRef } from 'react';

import { useScroll } from 'motion/react';

type UseScrollProgressOptions<TElement extends HTMLElement> = {
  targetRef?: RefObject<TElement | null>;
  offset?: NonNullable<Parameters<typeof useScroll>[0]>['offset'];
};

/**
 * Tracks vertical scroll progress for a target element.
 *
 * Use this as the low-level scroll primitive for UI presets that need
 * `scrollYProgress`, such as parallax, reveal, fade, or scale effects.
 * If `targetRef` is not provided, the hook creates and returns its own ref.
 */
export const useScrollProgress = <
  TElement extends HTMLElement = HTMLDivElement,
>({
  targetRef,
  offset = ['start end', 'end start'],
}: UseScrollProgressOptions<TElement> = {}) => {
  const internalRef = useRef<TElement | null>(null);
  const ref = targetRef ?? internalRef;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  return {
    ref,
    scrollYProgress,
  };
};
