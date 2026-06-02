'use client';

import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';

const sections = [
  {
    title: 'Section 1',
    subtitle: 'Hero section',
    fromColor: '#fcd34d',
    toColor: '#f59e0b',
    textColor: 'text-black',
    glow: 'bg-amber-100/50',
  },
  {
    title: 'Section 2',
    subtitle: 'About section',
    fromColor: '#f59e0b',
    toColor: '#b45309',
    textColor: 'text-black',
    glow: 'bg-orange-200/40',
  },
  {
    title: 'Section 3',
    subtitle: 'Projects section',
    fromColor: '#b45309',
    toColor: '#78350f',
    textColor: 'text-white',
    glow: 'bg-yellow-300/30',
  },
  {
    title: 'Section 4',
    subtitle: 'Contact section',
    fromColor: '#78350f',
    toColor: '#451a03',
    textColor: 'text-white',
    glow: 'bg-orange-500/30',
  },
];

export default function ChatParallax() {
  return (
    <main className='w-full overflow-hidden'>
      {sections.map((section) => (
        <ParallaxSection key={section.title} {...section} />
      ))}
    </main>
  );
}

type ParallaxSectionProps = {
  title: string;
  subtitle: string;
  fromColor: string;
  toColor: string;
  textColor: string;
  glow: string;
};

function ParallaxSection({
  title,
  subtitle,
  fromColor,
  toColor,
  textColor,
  glow,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement | null>(null);

  /**
   * Scroll progress for this exact section.
   *
   * 0 -> section starts scrolling
   * 1 -> section finishes scrolling
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  /**
   * Background layer moves slowly.
   * It creates the feeling that this layer is far away.
   */
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  /**
   * Card layer moves faster than the background.
   * This creates depth between elements.
   */
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);

  /**
   * Text moves the fastest.
   * It feels closer to the user.
   */
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '170%']);

  /**
   * Small background zoom.
   * It makes the section feel more alive.
   */
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className={`relative grid h-screen w-full place-items-center overflow-hidden ${textColor}`}
      style={{
        /**
         * The whole section background is a gradient.
         * No extra absolute gradient layer is needed.
         */
        background: `linear-gradient(
          to bottom,
          ${fromColor} 0%,
          ${fromColor} 60%,
          ${toColor} 100%
        )`,
      }}
    >
      {/* Background moving layer */}
      <motion.div
        style={{
          y: backgroundY,
          scale: backgroundScale,
        }}
        className='absolute inset-0'
      />

      {/* Middle parallax card */}
      <motion.div
        style={{ y: cardY }}
        className='absolute right-20 bottom-24 h-56 w-80 rounded-[32px] border border-white/30 bg-white/20 backdrop-blur-md'
      />
      {/* Main text content */}
      <motion.div
        style={{ y: textY }}
        className='relative z-10 px-6 text-center'
      >
        <p className='mb-4 text-sm tracking-[0.4em] uppercase opacity-70'>
          {subtitle}
        </p>

        <h2 className='text-6xl font-bold md:text-8xl'>{title}</h2>
      </motion.div>
    </section>
  );
}
