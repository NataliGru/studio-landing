'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import ReactLenis from 'lenis/react';
import { motion, useTransform } from 'motion/react';

import { ShadowBlock } from '@/shared';
import { useScrollProgress } from '@/shared/hooks';

import { ParallaxBlock } from '../parallaxBlock';
import { ParallaxImageBlock } from '../parallaxImageBlock';
import {
  DEFAULT_VIEWPORT,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  Viewport,
  getParallaxPositions,
} from './utils';

const ASSEMBLE_END = 0.6;

export function HeroParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);

  const { scrollYProgress } = useScrollProgress({
    targetRef: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    let frameId: number;

    const updateViewport = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    updateViewport();

    window.addEventListener('resize', updateViewport);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  const parallax = useMemo(() => getParallaxPositions(viewport), [viewport]);

  const skyY = useTransform(
    scrollYProgress,
    [0, ASSEMBLE_END, 1],
    ['0%', `${parallax.skyEnd}%`, `${parallax.skyEnd}%`],
  );

  const mountainsY = useTransform(
    scrollYProgress,
    [0, ASSEMBLE_END, 1],
    [
      `${parallax.mountains.start}%`,
      `${parallax.mountains.end}%`,
      `${parallax.mountains.end}%`,
    ],
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, ASSEMBLE_END, 1],
    [
      `${parallax.title.start}%`,
      `${parallax.title.end - 50}%`,
      `${parallax.title.end}%`,
    ],
  );

  const foregroundY = useTransform(
    scrollYProgress,
    [0, ASSEMBLE_END, 1],
    [
      `${parallax.foreground.start}%`,
      `${parallax.foreground.end}%`,
      `${parallax.foreground.end}%`,
    ],
  );

  return (
    <ReactLenis root>
      {/* SCROLL AREA */}
      <section ref={sectionRef} className='relative h-[200dvh]'>
        {/* PINNED HERO */}
        <div className='bg-background sticky top-0 h-dvh w-full overflow-hidden'>
          {/* SKY */}
          <ParallaxImageBlock
            imgSource='/parallaxHero/unsplash.png'
            blockClassName='absolute z-0 h-[200dvh] w-full'
            yPosition={skyY}
            initialTranslateY='-5%'
            imgAlt='Clouds'
            imgWidth={IMAGE_WIDTH}
            imgHeight={IMAGE_HEIGHT}
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
            imgWidth={IMAGE_WIDTH}
            imgHeight={IMAGE_HEIGHT}
            imgClassName='h-auto w-full max-w-none'
            duration={1.5}
            showBottomShadow
          />

          {/* TEXT */}
          <ParallaxBlock
            blockClassName='text-foreground absolute z-20 flex w-full max-w-6xl flex-col gap-5 px-6 sm:px-10 lg:px-12'
            yPosition={titleY}
            initialTranslateY='90%'
            duration={1.8}
            delay={0.2}
          >
            <motion.p
              className='text-accent flex items-center gap-4 text-xs font-bold tracking-[0.35em] uppercase'
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
              <span className='bg-accent h-px w-16' />A hiking guide
            </motion.p>

            <motion.h1
              className='text-3xl leading-tight font-semibold sm:text-5xl lg:text-7xl'
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
              Be prepared for the mountains and beyond
            </motion.h1>

            <motion.p
              className='flex items-center text-xs'
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
              scroll down
            </motion.p>
          </ParallaxBlock>

          {/* FOREGROUND */}
          <ParallaxImageBlock
            imgSource='/parallaxHero/man1.png'
            blockClassName='absolute z-30 w-full'
            yPosition={foregroundY}
            initialTranslateY='-8%'
            imgAlt='Man'
            imgWidth={IMAGE_WIDTH}
            imgHeight={IMAGE_HEIGHT}
            imgClassName='h-auto w-full max-w-none'
            duration={1.8}
            showBottomShadow
          />

          {/* BOTTOM FADE */}
          <ShadowBlock className='absolute inset-x-0 bottom-0 z-40 h-[35dvh]' />
        </div>
      </section>
    </ReactLenis>
  );
}
