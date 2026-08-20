'use client';

import { motion } from 'motion/react';

import { ShadowBlock } from '@/shared';

import { useTranslations } from 'next-intl';
import { PARALLAX_IMAGE_SIZE, useHeroParallax } from '../model';
import { ParallaxImageBlock } from './parallax-image-block';
import { ParallaxBlock } from './parallax-block';

export function HeroParallax() {
  const t = useTranslations('hero');

  const { sectionRef, skyY, mountainsY, titleY, foregroundY } =
    useHeroParallax();

  return (
    <section ref={sectionRef} className='relative isolate h-[200dvh] [contain:paint]'>
      {/* PINNED HERO */}
      <div className='bg-background sticky top-0 h-dvh w-full overflow-hidden'>
        {/* SKY */}
        <ParallaxImageBlock
          imgSource='/parallaxHero/unsplash.png'
          blockClassName='absolute z-0 h-[200dvh] w-full'
          yPosition={skyY}
          initialTranslateY='-5%'
          imgAlt='Clouds'
          imgWidth={PARALLAX_IMAGE_SIZE.width}
          imgHeight={PARALLAX_IMAGE_SIZE.height}
          imgClassName='h-auto w-full max-w-none'
          duration={1.4}
        />

        <ShadowBlock className='absolute inset-0 z-10' />

        {/* MOUNTAINS */}
        <ParallaxImageBlock
          imgSource='/parallaxHero/mountains1.png'
          blockClassName='absolute z-10 w-full'
          yPosition={mountainsY}
          initialTranslateY='-7%'
          imgAlt='Mountains'
          imgWidth={PARALLAX_IMAGE_SIZE.width}
          imgHeight={PARALLAX_IMAGE_SIZE.height}
          imgClassName='h-auto w-full max-w-none'
          duration={1.5}
          showBottomShadow
        />

        {/* TEXT */}
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

          <motion.p
            className='3xl:text-3xl 3xl:font-semibold flex items-center text-[10px] md:text-xs xl:text-2xl'
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
          </motion.p>
        </ParallaxBlock>

        {/* FOREGROUND */}
        <ParallaxImageBlock
          imgSource='/parallaxHero/man1.png'
          blockClassName='absolute z-30 w-full'
          yPosition={foregroundY}
          initialTranslateY='-8%'
          imgAlt='Man'
          imgWidth={PARALLAX_IMAGE_SIZE.width}
          imgHeight={PARALLAX_IMAGE_SIZE.height}
          imgClassName='h-auto w-full max-w-none'
          duration={1.8}
          showBottomShadow
        />

        {/* BOTTOM FADE */}
        <ShadowBlock className='absolute inset-x-0 bottom-0 z-40 h-[35dvh]' />
      </div>
    </section>
  );
}
