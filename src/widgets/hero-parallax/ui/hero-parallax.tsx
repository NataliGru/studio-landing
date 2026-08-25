'use client';

import { ShadowBlock } from '@/shared';

import { PARALLAX_IMAGE_SIZE, useHeroParallax } from '../model';
import { ParallaxImageBlock } from './parallax-image-block';

import { HeroTextBlock } from './hero-text-block';

export function HeroParallax() {
  const {
    sectionRef,
    skyY,
    mountainsY,
    titleY,
    foregroundY,
    scrollToArticlesSection,
  } = useHeroParallax();

  return (
    <section
      ref={sectionRef}
      className='relative isolate h-[200dvh] contain-[paint]'
    >
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
          duration={0.4}
          delay={0}
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

        <HeroTextBlock
          titleY={titleY}
          onScrollToArticlesSection={scrollToArticlesSection}
        />

        {/* FOREGROUND */}
        <ParallaxImageBlock
          imgSource='/parallaxHero/man1.png'
          blockClassName='absolute z-30 w-full pointer-events-none'
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
