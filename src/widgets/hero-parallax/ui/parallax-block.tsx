import { ReactNode } from 'react';

import { MotionValue, motion } from 'motion/react';

import { ShadowBlock } from '@/shared';

interface ParallaxBlockProps {
  yPosition: MotionValue<string>;
  blockClassName: string;
  children?: ReactNode;
  showBottomShadow?: boolean;
  initialTranslateY?: string;
  duration: number;
}

export const ParallaxBlock = ({
  yPosition,
  blockClassName,
  children,
  showBottomShadow,
  initialTranslateY = '0%',
  duration,
}: ParallaxBlockProps) => {
  return (
    <motion.div
      className={blockClassName}
      style={{
        y: yPosition,
      }}
      initial={{
        opacity: 0,
        translateY: initialTranslateY,
      }}
      animate={{
        opacity: 1,
        translateY: '0%',
      }}
      transition={{
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}

      {showBottomShadow && (
        <ShadowBlock className='absolute inset-x-0 bottom-0 h-[35dvh]' />
      )}
    </motion.div>
  );
};
