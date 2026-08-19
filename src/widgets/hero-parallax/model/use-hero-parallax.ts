import { useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import { DEFAULT_VIEWPORT, getParallaxPositions } from "./calculate-parallax";
import { Viewport } from "./types";

const ASSEMBLE_END = 0.6;


export const useHeroParallax =  ()  => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    let frameId: number;

    const updateViewport = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    updateViewport();

    window.addEventListener('resize', updateViewport);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  const parallax = useMemo(() => getParallaxPositions(viewport), [viewport]);

  const skyY = useTransform(
    scrollYProgress,
    [0, ASSEMBLE_END, 1],
    ['0%', `${parallax.skyEnd}%`, `${parallax.skyEnd}%`],
  );

  const mountainsY = useTransform(
    scrollYProgress,
    [0, ASSEMBLE_END, 1],
    [
      `${parallax.mountains.start}%`,
      `${parallax.mountains.end}%`,
      `${parallax.mountains.end}%`,
    ],
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, ASSEMBLE_END, 1],
    [
      `${parallax.title.start}%`,
      `${parallax.title.end - 50}%`,
      `${parallax.title.end}%`,
    ],
  );

  const foregroundY = useTransform(
    scrollYProgress,
    [0, ASSEMBLE_END, 1],
    [
      `${parallax.foreground.start}%`,
      `${parallax.foreground.end}%`,
      `${parallax.foreground.end}%`,
    ],
  );

  return {
    sectionRef, 
    skyY, 
    mountainsY, 
    titleY, 
    foregroundY
  };
}