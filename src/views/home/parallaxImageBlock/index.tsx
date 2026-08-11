import type { ComponentProps } from 'react';

import Image from 'next/image';

import { ParallaxBlock } from '../parallaxBlock';

type ParallaxImageBlockProps = Omit<
  ComponentProps<typeof ParallaxBlock>,
  'children'
> & {
  imgSource: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  imgClassName?: string;
};

export const ParallaxImageBlock = ({
  imgSource,
  imgAlt,
  imgWidth,
  imgHeight,
  imgClassName,
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
        className={imgClassName}
      />
    </ParallaxBlock>
  );
};
