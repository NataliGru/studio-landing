'use client';

import { useRef } from 'react';

import Image from 'next/image';

import ReactLenis from 'lenis/react';
import { motion, useTransform } from 'motion/react';

import { useScrollProgress } from '@/shared/hooks';

export function HeroParallaxMobile() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScrollProgress({
    targetRef: sectionRef,
    offset: ['start start', 'end end'],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '-1%']);

  const mountainsY = useTransform(scrollYProgress, [0, 1], ['140%', '65%']);

  const titleY = useTransform(scrollYProgress, [0, 1], ['-3.86%', '85%']);

  const foregroundY = useTransform(scrollYProgress, [0, 1], ['115%', '65%']);

  return (
    <ReactLenis root>
      {/* SCROLL AREA */}
      <section ref={sectionRef} className='relative h-[150dvh]'>
        {/* PINNED HERO */}
        <div className='bg-background sticky top-0 h-[95dvh] w-full overflow-hidden'>
          {/* SKY */}
          <motion.div
            className='absolute z-0 h-[95dvh]'
            style={{
              y: skyY,
            }}
            initial={{
              opacity: 0,
              translateY: '-5%',
            }}
            animate={{
              opacity: 1,
              translateY: '0%',
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src='/parallaxHero/unsplash.png'
              alt=''
              width={1920}
              height={2070}
              sizes='100vw'
              className='object-contain'
              priority
            />
          </motion.div>

          <div
            aria-hidden
            className='from-background/0 to-background absolute inset-0 z-10 bg-linear-to-b'
          />

          {/* MOUNTAINS */}
          <motion.div
            className='absolute z-10'
            style={{
              y: mountainsY,
            }}
            initial={{
              opacity: 0,
              translateY: '-7%',
            }}
            animate={{
              opacity: 1,
              translateY: '0%',
            }}
            transition={{
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src='/parallaxHero/mountains1.png'
              alt=''
              width={1920}
              height={2070}
            />

            <div
              aria-hidden
              className='from-background/0 to-background pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[35dvh] bg-linear-to-b'
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            className='text-foreground absolute top-[35dvh] z-20 flex w-full max-w-6xl flex-col gap-5 px-6 sm:top-[30dvh] sm:px-10 lg:top-[100dvh] lg:px-12'
            style={{
              y: titleY,
            }}
            initial={{
              opacity: 0,
              translateY: '90%',
            }}
            animate={{
              opacity: 1,
              translateY: '0%',
            }}
            transition={{
              duration: 1.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
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
          </motion.div>

          {/* FOREGROUND */}
          <motion.div
            className='absolute z-30'
            style={{
              y: foregroundY,
            }}
            initial={{
              opacity: 0,
              translateY: '-8%',
            }}
            animate={{
              opacity: 1,
              translateY: '0%',
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src='/parallaxHero/man1.png'
              alt=''
              width={1920}
              height={2070}
            />

            <div
              aria-hidden
              className='from-background/0 to-background pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[35dvh] bg-linear-to-b'
            />
          </motion.div>

          {/* BOTTOM FADE */}
          <div
            aria-hidden
            className='from-background/0 to-background pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[35dvh] bg-linear-to-b'
          />
        </div>
      </section>
    </ReactLenis>
  );
}
