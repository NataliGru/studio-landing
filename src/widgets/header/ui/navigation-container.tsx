'use client';

import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ReactNode, useState } from 'react';

interface NavigationContainerProps {
  children: ReactNode;
}

export const NavigationContainer = ({ children }: NavigationContainerProps) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      className='fixed top-0 right-0 left-0 z-30'
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.header>
  );
};
