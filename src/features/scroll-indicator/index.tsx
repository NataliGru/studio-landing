'use client';
import { motion, useScroll } from 'motion/react';

export const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      id='scroll-indicator'
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        originX: 0,
        backgroundColor: 'white',
        zIndex: 50,
      }}
    />
  );
};
