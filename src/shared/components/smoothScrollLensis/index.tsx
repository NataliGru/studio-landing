'use client';

import { useRef } from 'react';

import ReactLenis from 'lenis/react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'motion/react';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { SiSpacex } from 'react-icons/si';

export const SmoothScrollLensis = () => {
  return (
    <div className='w-full bg-zinc-950'>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          // infinite: true,
        }}
      >
        <Nav />
        <Hero />

        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className='fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-3 text-white'>
      <SiSpacex className='text-3xl mix-blend-difference' />

      <button
        onClick={() => {
          document
            .getElementById('launch-schedule')
            ?.scrollIntoView({ behavior: 'smooth' });
        }}
        className='flex cursor-pointer items-center gap-1 text-xs text-zinc-400'
      >
        Launch Schedule <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HIGHT = 1500;

const Hero = () => {
  return (
    <div
      className='relative w-full'
      style={{
        height: `calc(${SECTION_HIGHT}px + 100dvh)`,
      }}
    >
      <CenterImage />

      <ParallaxImages />
      {/* this div is for fade between sections */}
      <div className='absolute right-0 bottom-0 left-0 h-96 bg-linear-to-b from-zinc-950/0 to-zinc-950'></div>
    </div>
  );
};

const CenterImage = () => {
  const { scrollY, scrollYProgress } = useScroll();

  const opacity = useTransform(
    scrollY,
    [SECTION_HIGHT, SECTION_HIGHT + 500], //here you can control fade of the image
    [1, 0],
  );

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HIGHT + 500],
    ['170%', '100%'],
  );

  const clip1 = useTransform(scrollY, [0, SECTION_HIGHT], [25, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HIGHT], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`; //це обрізало зображення в прямокутник
  return (
    <motion.div
      className='sticky top-0 h-screen w-full'
      style={{
        opacity,
        backgroundImage: `url(./4.jpg)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize,
        clipPath,
      }}
    ></motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className='relative z-20 mx-auto max-w-5xl px-4 pt-[200px]'>
      <ParallaxImage
        scr='./1.jpg'
        alt='image1'
        start={-200}
        end={200}
        className='ml-auto w-1/3'
      />

      <ParallaxImage
        scr='./2.jpg'
        alt='image1'
        start={0}
        end={-500}
        className='ml-24 w-5/12'
      />
    </div>
  );
};

interface ParallaxImageProps {
  className?: string;
  alt?: string;
  scr: string;
  start: number;
  end: number;
}

const ParallaxImage = ({
  className,
  alt = '',
  scr,
  start,
  end,
}: ParallaxImageProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`], //it means - that we will have a value when the start of the image
    //  will appear at the end of the page and we will do it till the end of the image will meet the start of the page
  });

  const opacity = useTransform(
    scrollYProgress,
    [0.75, 1], //here you can control fade of the image
    [1, 0],
  );

  const scale = useTransform(
    scrollYProgress,
    [0.5, 1], //here you can control fade of the image
    [1, 0.85],
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1], //here you can control fade of the image
    [start, end],
  );

  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      ref={ref}
      src={scr}
      alt={alt}
      className={className}
      style={{ opacity, transform }}
    />
  );
};

interface ScheduleItemProps {
  title: string;
  location: string;
  date: string;
}

const ScheduleItem = ({ location, title, date }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      className='mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9'
    >
      <div className=''>
        <p className='mb-1.5 text-xl text-zinc-50'>{title}</p>

        <p className='text-sm text-zinc-500 uppercase'>{date}</p>
      </div>

      <div className='flex items-center gap-1.5 text-end text-sm text-zinc-500 uppercase'>
        <p className=''>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};

const Schedule = () => {
  return (
    <section
      id='launch-schedule'
      className='mx-auto max-w-5xl px-4 py-48 text-white'
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          ease: 'easeInOut',
          duration: 0.75,
        }}
        className='mb-20 text-4xl font-black text-zinc-50 uppercase'
      >
        Launch Schedule
      </motion.h1>

      <ScheduleItem title='NG-21' date='Dec 9th' location='Florida' />
      <ScheduleItem title='NG-22' date='Jun 9th' location='Florida' />
      <ScheduleItem title='NG-23' date='Feb 9th' location='Florida' />
      <ScheduleItem title='NG-24' date='Mar 9th' location='Florida' />
    </section>
  );
};
