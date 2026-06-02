'use client';
import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

export default function MultiLayerParallax() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  return (
    <div className=''>
      <div
        className='relative grid h-screen w-full place-items-center overflow-hidden'
        ref={ref}
      >
        <motion.h1
          className='relative z-10 text-7xl font-bold text-white md:text-9xl'
          style={{ y: textY }}
        >
          Parallax
        </motion.h1>

        <motion.div
          className='absolute inset-0 z-0'
          style={{
            backgroundImage: `url(/image-full.png)`,
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
            y: backgroundY,
          }}
        />
        <motion.div
          className='absolute inset-0 z-20'
          style={{
            backgroundImage: `url(/image-bottom.png)`,
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
          }}
        />
      </div>

      <div className='w-full bg-[#06141D]'>
        <div className='mx-auto max-w-lg space-y-4 py-24 text-neutral-300'>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae
            earum nobis quasi repellat. Amet facere nulla dolorum accusantium
            sit dolores odio excepturi facilis laboriosam officiis dolorem,
            nobis reprehenderit molestiae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae
            earum nobis quasi repellat. Amet facere nulla dolorum accusantium
            sit dolores odio excepturi facilis laboriosam officiis dolorem,
            nobis reprehenderit molestiae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae
            earum nobis quasi repellat. Amet facere nulla dolorum accusantium
            sit dolores odio excepturi facilis laboriosam officiis dolorem,
            nobis reprehenderit molestiae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae
            earum nobis quasi repellat. Amet facere nulla dolorum accusantium
            sit dolores odio excepturi facilis laboriosam officiis dolorem,
            nobis reprehenderit molestiae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae
            earum nobis quasi repellat. Amet facere nulla dolorum accusantium
            sit dolores odio excepturi facilis laboriosam officiis dolorem,
            nobis reprehenderit molestiae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae
            earum nobis quasi repellat. Amet facere nulla dolorum accusantium
            sit dolores odio excepturi facilis laboriosam officiis dolorem,
            nobis reprehenderit molestiae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae
            earum nobis quasi repellat. Amet facere nulla dolorum accusantium
            sit dolores odio excepturi facilis laboriosam officiis dolorem,
            nobis reprehenderit molestiae.
          </p>
        </div>
      </div>
    </div>
  );
}
