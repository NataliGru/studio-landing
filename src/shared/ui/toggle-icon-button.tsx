'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ReactNode } from 'react';

interface ToggleIconButtonProps {
  checked: boolean;
  onToggle: () => void;
  checkedIcon: ReactNode;
  uncheckedIcon: ReactNode;
  ariaLabel?: string;
}

export const ToggleIconButton = ({
  checked,
  onToggle,
  checkedIcon,
  uncheckedIcon,
  ariaLabel,
}: ToggleIconButtonProps) => {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-label={ariaLabel}
      className='relative flex cursor-pointer items-center justify-center p-5'
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={String(checked)}
          initial={{
            opacity: 0,
            rotate: checked ? -90 : 90,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            rotate: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            rotate: checked ? 90 : -90,
            scale: 0.7,
          }}
          transition={{
            duration: 0.25,
            ease: 'easeInOut',
          }}
          className='absolute'
        >
          {checked ? checkedIcon : uncheckedIcon}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
