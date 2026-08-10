'use client';

import Image from 'next/image';

import { type Variants, motion } from 'motion/react';

import { Link, cn } from '@/shared';

type GuideMediaSide = 'left' | 'right';

type GuideTextProps = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  readMore: string;
  href: string;
};

type GuideArticleProps = GuideTextProps & {
  imageSrc: string;
  imageAlt: string;
  imageSide: GuideMediaSide;
};

export type GuideListItem = GuideArticleProps;

type GuideListClientProps = {
  items: GuideListItem[];
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function GuideText({
  number,
  eyebrow,
  title,
  description,
  readMore,
  href,
}: GuideTextProps) {
  return (
    <div className='relative max-w-xl pt-8 lg:pt-10'>
      <span
        aria-hidden
        className='font-heading text-surface-muted/70 absolute -top-2 -left-3 text-8xl leading-none font-bold sm:-left-8 sm:text-9xl lg:-top-8 lg:-left-24 lg:text-[10rem]'
      >
        {number}
      </span>

      <div className='relative z-10'>
        <p className='text-accent mb-4 flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase'>
          <span className='bg-accent h-px w-12 shrink-0 sm:w-16' />
          {eyebrow}
        </p>

        <h2 className='mb-5 text-3xl leading-tight font-semibold text-balance md:text-5xl'>
          {title}
        </h2>

        <p className='text-muted mb-6 text-sm leading-7'>{description}</p>

        <Link
          href={href}
          className='text-accent inline-flex items-center gap-3 text-xs font-bold'
        >
          {readMore}
          <span aria-hidden className='text-base leading-none'>
            -&gt;
          </span>
        </Link>
      </div>
    </div>
  );
}

function GuideArticle({
  imageSrc,
  imageAlt,
  imageSide,
  ...textProps
}: GuideArticleProps) {
  const isImageLeft = imageSide === 'left';

  return (
    <motion.article
      id={textProps.href.split('#')[1]}
      variants={itemVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.35 }}
      className='grid items-center gap-10 lg:grid-cols-2 lg:gap-24'
    >
      <div
        className={cn(
          'relative z-10 mx-auto aspect-[3/4] w-full max-w-[360px] overflow-hidden lg:max-w-[420px]',
          isImageLeft ? 'lg:order-1 lg:mr-auto' : 'lg:order-2 lg:ml-auto',
        )}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes='(min-width: 1024px) 420px, min(100vw - 48px, 360px)'
          className='object-cover'
        />
      </div>

      <div className={cn(isImageLeft ? 'lg:order-2' : 'lg:order-1')}>
        <GuideText {...textProps} />
      </div>
    </motion.article>
  );
}

export function GuideListClient({ items }: GuideListClientProps) {
  return (
    <section className='bg-background text-foreground relative z-40 px-6 py-24 sm:px-10 lg:px-12 lg:py-32'>
      <div className='mx-auto grid max-w-6xl gap-24 lg:gap-36'>
        {items.map((item) => (
          <GuideArticle key={item.number} {...item} />
        ))}
      </div>
    </section>
  );
}
