import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';

import { useMediaQuery } from '@/shared';
import { ENTER_RANGE, OPACITY_RANGE } from './constants';
import { ArticleMediaSide } from './types';

export const useArticleAnimation = (imageSide: ArticleMediaSide) => {
  const listItemRef = useRef<HTMLElement>(null);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const direction = imageSide === 'left' ? 1 : -1;

  const { scrollYProgress } = useScroll({
    target: listItemRef,
    offset: ['start end', 'end start'],
  });

  const opacityTransform = useTransform(
      scrollYProgress,
      OPACITY_RANGE,
      [0, 0.5, 1],
    );

  const contentStartX = isDesktop ? direction * 250 : 0;
  const descriptionStartX = isDesktop ? direction * 150 : 0;
  const imageStartX = isDesktop ? direction * -250 : 0;


  return {
    listItemRef,
    imageStyle: {
      x: useTransform(scrollYProgress, ENTER_RANGE, [imageStartX, 0]),
      y: useTransform(scrollYProgress, ENTER_RANGE, [300, 0]),
      opacity: opacityTransform
    },
    numberStyle: {
      x: useTransform(scrollYProgress, ENTER_RANGE, [contentStartX, 0]), 
      y: useTransform(scrollYProgress, ENTER_RANGE, [-100, 0]),
    },
    eyebrowStyle: {
      x:  useTransform(scrollYProgress, ENTER_RANGE, [contentStartX, 0]),
      opacity: opacityTransform
    },
    titleStyle: {
      x: useTransform(scrollYProgress, ENTER_RANGE, [contentStartX, 0]),  
      y: useTransform(scrollYProgress, ENTER_RANGE, [50, 0]),
      opacity: opacityTransform
    },
    descriptionStyle: {
      x:  useTransform(scrollYProgress, ENTER_RANGE, [descriptionStartX, 0]), 
      y: useTransform(scrollYProgress, ENTER_RANGE, [100, 0]),
    },
    readMoreStyle: {
      y: useTransform(scrollYProgress, [0, 0.4], [500, 0]),
      opacity: opacityTransform
    },
    opacity: useTransform(
      scrollYProgress,
      OPACITY_RANGE,
      [0, 0.5, 1],
    ),
    descriptionProgress: useTransform(
      scrollYProgress,
      [0.15, 0.45],
      [0, 1],
    ),
  };
}