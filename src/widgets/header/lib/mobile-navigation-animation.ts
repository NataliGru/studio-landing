import type { MotionProps } from 'motion/react';

export const MENU_MOTION: MotionProps = {
  initial: {
    clipPath: 'inset(0 0 100% 0)',
  },
  animate: {
    clipPath: 'inset(0 0 0% 0)',
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
  },
  transition: {
    duration: 0.5,
    ease: [0.76, 0, 0.24, 1],
  },
};

export const MENU_LIST_MOTION: MotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.18,
      },
    },
  },
};

export const MENU_LIST_ITEM_MOTION: MotionProps = {
  variants: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  transition: {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
  },
};

export const MENU_FOOTER_MOTION: MotionProps = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
  transition: {
    delay: 0.3,
    duration: 0.35,
  },
};
