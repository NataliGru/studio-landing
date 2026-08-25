'use client';

import { motion, MotionValue } from 'motion/react';
import { ParallaxBlock } from './parallax-block';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface HeroTextBlockProps {
  titleY: MotionValue<string>;
  onScrollToArticlesSection: () => void;
}

export const HeroTextBlock = ({
  titleY,
  onScrollToArticlesSection,
}: HeroTextBlockProps) => {
  const t = useTranslations('hero');

  return (
    <ParallaxBlock
      blockClassName='text-foreground absolute z-20 flex w-full max-w-6xl 2xl:max-w-[80vw] flex-col gap-3 md:gap-5 px-6 sm:px-10 lg:px-12'
      yPosition={titleY}
      initialTranslateY='90%'
      duration={1.8}
      delay={0.2}
    >
      <motion.p
        className='text-accent 3xl:text-3xl flex items-center gap-4 text-[10px] font-bold tracking-[0.35em] uppercase xl:text-xl xl:leading-0'
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className='bg-accent h-px w-16' />
        {t('subtitle')}
      </motion.p>

      <motion.h1
        className='3xl:text-9xl 3xl:leading-none text-3xl leading-tight font-semibold sm:text-5xl lg:text-7xl 2xl:text-[84px]'
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {t('title')}
      </motion.h1>

      <motion.button
        className='3xl:text-3xl 3xl:font-semibold flex w-fit cursor-pointer items-center gap-1 px-2 text-[10px] md:text-xs xl:text-2xl'
        aria-label={t('scrollToArticles')}
        onClick={onScrollToArticlesSection}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {t('scrollDown')}

        <motion.span
          animate={{ y: [0, 10, -10, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ArrowDown className='3xl:size-9 size-4 xl:size-8' />
        </motion.span>
      </motion.button>
    </ParallaxBlock>
  );
};
