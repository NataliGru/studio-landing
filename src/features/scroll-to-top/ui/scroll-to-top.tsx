'use client';

import clsx from 'clsx';
import { ArrowUp } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const ScrollToTop = () => {
  const t = useTranslations('navigation');

  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(true);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (current > 700) {
      setHidden(previous < current);
    } else {
      setHidden(true);
    }
  });

  const onScrollToTop = () => {
    if (hidden) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      className={clsx(
        'fixed right-5 bottom-5 z-40 flex cursor-pointer flex-col items-center justify-center gap-1 p-1',
        'group',
        'border-accent rounded-full border backdrop-blur-xs backdrop-brightness-70',
        '3xl:size-36 size-21 2xl:size-24',
      )}
      onClick={onScrollToTop}
      aria-label={t('scrollToTop')}
      animate={{
        y: hidden ? 100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        ease: 'easeInOut',
      }}
    >
      <motion.span
        animate={{ y: [0, 8, -8, 0] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ArrowUp
          className={clsx(
            'opacity-50 group-hover:opacity-100',
            '3xl:size-7 size-4 xl:size-5',
          )}
        />
      </motion.span>

      <span
        className={clsx(
          'transition-all-300 opacity-50 group-hover:opacity-100',
          '3xl:text-lg line-clamp-2 text-[10px] 2xl:text-xs',
        )}
      >
        {t('scrollToTop')}
      </span>
    </motion.button>
  );
};
