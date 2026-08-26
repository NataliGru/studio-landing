import type { ComponentProps } from 'react';

import Image from 'next/image';
import { ParallaxBlock } from './parallax-block';

type ParallaxImageBlockProps = Omit<
  ComponentProps<typeof ParallaxBlock>,
  'children'
> & {
  imgSource: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  imgClassName?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
};

export const ParallaxImageBlock = ({
  imgSource,
  imgAlt,
  imgWidth,
  imgHeight,
  imgClassName,
  priority,
  loading,
  ...parallaxProps
}: ParallaxImageBlockProps) => {
  return (
    <ParallaxBlock {...parallaxProps}>
      <Image
        src={imgSource}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
        sizes='100vw'
        priority={priority}
        className={imgClassName}
        loading={loading}
      />
    </ParallaxBlock>
  );
};
