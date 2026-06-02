'use client';
import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

// import { useRef } from 'react';

// const sections = [
//   {
//     title: 'Section 1',
//     subtitle: 'Hero section',
//     className: 'bg-amber-300 text-black',
//   },
//   {
//     title: 'Section 2',
//     subtitle: 'About section',
//     className: 'bg-amber-500 text-black',
//   },
//   {
//     title: 'Section 3',
//     subtitle: 'Projects section',
//     className: 'bg-amber-700 text-white',
//   },
//   {
//     title: 'Section 4',
//     subtitle: 'Contact section',
//     className: 'bg-amber-900 text-white',
//   },
// ];

// export default function HomeLocalized() {
//   return (
//     <main className='relative'>
//       {sections.map((section, index) => (
//         <ParallaxSection
//           key={section.title}
//           index={index}
//           title={section.title}
//           subtitle={section.subtitle}
//           className={section.className}
//         />
//       ))}
//     </main>
//   );
// }

// type ParallaxSectionProps = {
//   index: number;
//   title: string;
//   subtitle: string;
//   className: string;
// };

// function ParallaxSection({
//   index,
//   title,
//   subtitle,
//   className,
// }: ParallaxSectionProps) {
//   const ref = useRef<HTMLElement | null>(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['start start', 'end start'],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
//   const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.65]);
//   const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);

//   return (
//     <section
//       ref={ref}
//       className={`sticky top-0 h-screen overflow-hidden ${className}`}
//       style={{ zIndex: index + 1 }}
//     >
//       <motion.div
//         style={{ scale, opacity }}
//         className='absolute inset-0 flex items-center justify-center'
//       >
//         <div className='absolute inset-8 rounded-[40px] border border-white/30' />

//         <motion.div
//           style={{ y: contentY }}
//           className='relative z-10 flex flex-col items-center text-center'
//         >
//           <p className='mb-4 text-sm uppercase tracking-[0.4em] opacity-70'>
//             {subtitle}
//           </p>

//           <h2 className='text-6xl font-bold md:text-8xl'>{title}</h2>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

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
