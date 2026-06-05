'use client';

import { ReactNode, useRef } from 'react';

import { StickyRevealEffects } from '@/shared/types';

import { ParallaxBox } from '../parallaxBox';
import { StickyReveal } from '../stickyReveal';

const SECTION_HEIGHT = 1500;

type ParallaxItem = {
  id: string;
  start: number;
  end: number;
  className?: string;
  content: ReactNode;
};

type ParallaxSectionProps = {
  stickyContent: ReactNode;
  items?: ParallaxItem[];
  stickyRevealEffects?: StickyRevealEffects;
  stickyRevealClassName?: string;
  className?: string;
  contentClassName?: string;
  height?: number;
  withBottomGradient?: boolean;
  opacityItemsRange?: [number, number];
  scaleItemsRange?: [number, number];
};

export const ParallaxSection = ({
  stickyContent,
  items = [],
  stickyRevealClassName,
  stickyRevealEffects,
  className = 'relative w-full overflow-x-clip',
  contentClassName = 'relative z-20 mx-auto max-w-5xl px-4 pt-[200px]',
  height = SECTION_HEIGHT,
  withBottomGradient = true,
  opacityItemsRange,
  scaleItemsRange,
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        height: `calc(${height}px + 100dvh)`,
      }}
    >
      <StickyReveal
        targetRef={sectionRef}
        className={stickyRevealClassName}
        effects={stickyRevealEffects}
      >
        {stickyContent}
      </StickyReveal>

      <div className={contentClassName}>
        {items.map((item) => (
          <ParallaxBox
            key={item.id}
            start={item.start}
            end={item.end}
            className={item.className}
            opacityRange={opacityItemsRange}
            scaleRange={scaleItemsRange}
          >
            {item.content}
          </ParallaxBox>
        ))}
      </div>

      {withBottomGradient && (
        <div className='absolute right-0 bottom-0 left-0 h-96 bg-linear-to-b from-zinc-950/0 to-zinc-950' />
      )}
    </section>
  );
};
