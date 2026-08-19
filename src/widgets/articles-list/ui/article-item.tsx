'use client';

import { ShadowBlock } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'motion/react';
import { Fragment } from 'react';
import { ArticleMediaSide } from '../model/types';
import { useArticleAnimation } from '../model/use-article-animation';
import { DescriptionWord } from './description-word';

interface ArticleItemProps {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  readMore: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageSide: ArticleMediaSide;
}

export const ArticleItem = ({
  imageSide,
  imageSrc,
  imageAlt,
  number,
  eyebrow,
  title,
  description,
  href,
  readMore,
}: ArticleItemProps) => {
  const {
    listItemRef,
    imageStyle,
    numberStyle,
    eyebrowStyle,
    titleStyle,
    descriptionStyle,
    descriptionProgress,
    readMoreStyle,
  } = useArticleAnimation(imageSide);

  const descriptionWords = description.split(' ');

  return (
    <motion.article
      ref={listItemRef}
      id={number}
      className={clsx(
        'relative flex gap-18 lg:gap-25 2xl:gap-52',
        imageSide === 'right'
          ? 'flex-col-reverse md:flex-row-reverse'
          : 'flex-col-reverse md:flex-row',
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
    >
      {/* Image block */}
      <motion.div className='relative flex-1' style={imageStyle}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className='pointer-events-none hidden h-auto w-full object-cover md:block'
        />

        <Image
          src={imageSrc}
          alt={imageAlt}
          width={566}
          height={720}
          className='pointer-events-none h-auto w-full object-cover md:hidden'
        />

        <ShadowBlock className='absolute inset-x-0 bottom-0 h-1/2' />
      </motion.div>

      {/* Content block */}
      <div
        className={clsx(
          '3xl:gap-20 relative flex flex-1 flex-col gap-6',
          'pt-14',
          'md:pt-14 lg:pl-14',
          'xl:pt-30 xl:pl-30',
          '3xl:pt-45 3xl:pl-45',
        )}
      >
        <motion.p
          className={clsx(
            'absolute',
            '3xl:text-[320px] text-8xl font-extrabold opacity-10 md:text-[150px] xl:text-[240px]',
            '-translate-x-8 -translate-y-15',
            'md:-translate-x-18 md:-translate-y-30',
            'lg:-translate-x-25 lg:-translate-y-25',
            'xl:-translate-x-40 xl:-translate-y-40',
            '3xl:-translate-x-55 3xl:-translate-y-50',
          )}
          style={numberStyle}
        >
          {number}
        </motion.p>

        <motion.p
          className={clsx(
            'flex items-center gap-4',
            'text-accent 3xl:text-3xl text-xs font-bold tracking-[0.35em] uppercase xl:text-lg 2xl:text-2xl',
          )}
          style={eyebrowStyle}
        >
          <span className='bg-accent h-px w-16' />
          {eyebrow}
        </motion.p>

        <motion.h2
          className={
            '3xl:text-9xl text-3xl font-semibold sm:text-5xl md:text-6xl xl:text-7xl'
          }
          style={titleStyle}
        >
          {title}
        </motion.h2>

        <motion.p
          className='3xl:text-5xl leading-8 sm:text-lg lg:text-xl 2xl:text-2xl 2xl:leading-normal'
          style={descriptionStyle}
        >
          {descriptionWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <DescriptionWord
                progress={descriptionProgress}
                index={index}
                count={descriptionWords.length}
              >
                {word}
              </DescriptionWord>

              {index < descriptionWords.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </motion.p>

        <Link href={href}>
          <motion.p
            style={readMoreStyle}
            className='text-accent 3xl:text-4xl flex items-center gap-4 text-xs font-bold lowercase sm:text-base lg:text-xl 2xl:text-2xl'
          >
            {readMore}
          </motion.p>
        </Link>
      </div>
    </motion.article>
  );
};
