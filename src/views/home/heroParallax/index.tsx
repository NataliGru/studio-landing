'use client';

import { useRef } from 'react';

import Image from 'next/image';

import ReactLenis from 'lenis/react';
import { motion, useTransform } from 'motion/react';

import { useScrollProgress } from '@/shared/hooks';

type ParallaxHeroImageProps = {
  src: string;
  width: number;
  height: number;
  className: string;
};

const ParallaxHeroImage = ({
  src,
  width,
  height,
  className,
}: ParallaxHeroImageProps) => {
  return (
    <div className={className}>
      <Image
        src={src}
        alt=''
        width={width}
        height={height}
        priority
        sizes='100vw'
        className='h-auto w-full'
      />
    </div>
  );
};

/**
 * First-screen layered parallax hero.
 *
 * The artwork is split into three visual layers and rendered in depth order:
 * clouds, mountains, then the foreground man. Each layer moves at a different
 * scroll speed to create depth while preserving the original image stack.
 */
export function HeroParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScrollProgress({
    targetRef: sectionRef,
    offset: ['start start', 'end start'],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const mountainsY = useTransform(scrollYProgress, [0, 1], ['-5%', '-15%']);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['-0%', '-5%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <ReactLenis root>
      <section
        ref={sectionRef}
        className='bg-background relative w-full overflow-hidden'
        style={{
          height: `calc(100dvh)`,
        }}
      >
        <div className='absolute top-0 left-1/2 aspect-9/16 w-[max(100vw,calc(100dvh*1.018))] -translate-x-1/2 overflow-hidden sm:aspect-square md:aspect-1920/1700 xl:aspect-16/12 2xl:aspect-5/3'>
          <motion.div
            className='absolute inset-x-0 top-0 z-0 flex justify-center'
            style={{ y: skyY }}
          >
            <ParallaxHeroImage
              src='/parallaxHero/clouds.png'
              width={1920 * 1.3}
              height={1113 * 1.3}
              className='w-full'
            />
          </motion.div>

          <motion.div
            className='absolute inset-x-0 top-[25%] z-10 flex justify-center sm:top-[30%]'
            style={{ y: mountainsY }}
          >
            <ParallaxHeroImage
              src='/parallaxHero/mountains.png'
              width={1920}
              height={1422}
              className='w-[180vw] max-w-none object-contain sm:w-[130vw] md:w-full'
            />
          </motion.div>

          <motion.div
            className='absolute inset-x-0 top-[33%] z-30 flex justify-center sm:top-[50%]'
            style={{ y: foregroundY }}
          >
            <ParallaxHeroImage
              src='/parallaxHero/man.png'
              width={1920}
              height={926}
              className='w-[180vw] max-w-none object-contain sm:w-[130vw] md:w-full'
            />
          </motion.div>
        </div>

        <div
          aria-hidden
          className='from-background/0 to-background absolute inset-0 z-10 bg-linear-to-b' //bg
        />

        {/* <motion.div
          className='text-foreground relative z-20 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 pt-24 sm:px-10 lg:px-12'
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <p className='text-accent mb-6 flex items-center gap-4 text-xs font-bold tracking-[0.35em] uppercase'>
            <span className='bg-accent h-px w-16' />A hiking guide
          </p>
          <h1 className='max-w-4xl text-5xl leading-tight font-semibold text-balance sm:text-7xl lg:text-8xl'>
            Be prepared for the mountains and beyond
          </h1>
        </motion.div> */}

        <div
          aria-hidden
          className='from-background/0 to-background absolute inset-x-0 bottom-0 z-40 h-[40dvh] bg-linear-to-b'
        />
      </section>
    </ReactLenis>
  );
}
