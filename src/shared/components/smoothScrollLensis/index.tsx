import ReactLenis from 'lenis/react';

import { ParallaxSection } from '@/shared/ui/parallax/parallaxSection';

export const SmoothScrollLenis = () => {
  return (
    <div className='w-full bg-zinc-950'>
      <ReactLenis root options={{ lerp: 0.2 }}>
        <ParallaxSection
          stickyContent={
            <div className='flex h-full items-center justify-center bg-black'>
              {/* <h1 className='text-8xl text-white'>Nataliia</h1> */}
            </div>
          }
          items={
            [
              // {
              //   id: 'image-1',
              //   start: -200,
              //   end: 200,
              //   className: 'ml-auto w-1/3',
              //   content: (
              //     <div className='flex h-full items-center justify-center bg-black'>
              //       <h1 className='text-8xl text-white'>Nataliia</h1>
              //     </div>
              //   ),
              // },
              // {
              //   id: 'image-2',
              //   start: 200,
              //   end: -200,
              //   className: 'ml-auto w-1/3',
              //   content: (
              //     <div className='flex h-full items-center justify-center bg-black'>
              //       <h1 className='text-8xl text-white'>Nataliia222</h1>
              //     </div>
              //   ),
              // },
            ]
          }
        />

        <ParallaxSection
          stickyRevealEffects={{ clip: true, scale: true }}
          stickyContent={
            <div className='relative h-full w-full'>
              {/* <Image
                src='/4.jpg'
                fill
                alt=''
                className='object-cover'
                fetchPriority='high'
                preload
                sizes='100vw'
              /> */}
            </div>
          }
          items={
            [
              // {
              //   id: 'image-1',
              //   start: -200,
              //   end: 200,
              //   className: 'ml-auto w-1/3',
              //   content: (
              //     <Image
              //       src='/1.jpg'
              //       alt='image 1'
              //       width={400}
              //       height={500}
              //       className='h-auto w-full object-cover'
              //       loading='lazy'
              //       sizes='(max-width: 768px) 100vw, 33vw'
              //     />
              //   ),
              // },
              // {
              //   id: 'image-2',
              //   start: 0,
              //   end: -500,
              //   className: 'ml-24 w-5/12',
              //   content: (
              //     <Image
              //       src='/2.jpg'
              //       alt='image 2'
              //       width={500}
              //       height={650}
              //       className='h-auto w-full object-cover'
              //       fetchPriority='high'
              //       preload
              //       sizes='(max-width: 768px) 100vw, 42vw'
              //     />
              //   ),
              // },
            ]
          }
        />
      </ReactLenis>
    </div>
  );
};
