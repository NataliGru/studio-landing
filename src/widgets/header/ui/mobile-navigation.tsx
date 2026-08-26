'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLenis } from 'lenis/react';

import clsx from 'clsx';
import { CircleUser, MenuIcon, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { ThemeToggle } from '@/features';
import { ToggleIconButton } from '@/shared';

import { HEADER_LINKS } from '../models/constants';

export const MobileNavigation = () => {
  const t = useTranslations('navigation');

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const onToggle = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (isOpenMenu) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.start();
    };
  }, [isOpenMenu, lenis]);

  return (
    <nav className='relative z-50 md:hidden'>
      <div
        className={clsx(
          'relative z-50 flex h-20 items-center justify-between px-5',
          'from-background/30 to-background/0 bg-linear-to-b',
          'backdrop-blur-md backdrop-brightness-90',
          isOpenMenu && 'border-foreground/30 border-b',
        )}
      >
        <Link
          href={HEADER_LINKS.logo.link}
          onClick={closeMenu}
          className='flex h-full items-center px-5'
        >
          <h2 aria-label='logo' className='text-3xl font-bold'>
            {HEADER_LINKS.logo.textKey}
          </h2>
        </Link>

        <div className='flex h-full items-center gap-10'>
          <ThemeToggle />

          <ToggleIconButton
            checked={isOpenMenu}
            onToggle={onToggle}
            checkedIcon={<X size={30} strokeWidth={2} />}
            uncheckedIcon={<MenuIcon size={30} strokeWidth={2} />}
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{
              clipPath: 'inset(0 0 100% 0)',
            }}
            animate={{
              clipPath: 'inset(0 0 0% 0)',
            }}
            exit={{
              clipPath: 'inset(0 0 100% 0)',
            }}
            transition={{
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
            className={clsx(
              'fixed inset-0 z-40 h-dvh w-dvw',
              // 'from-background to-background/30 bg-linear-to-b',
              'backdrop-blur-md backdrop-brightness-95',
              'flex flex-col',
            )}
          >
            <motion.ul
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.18,
                  },
                },
              }}
              className='flex flex-1 flex-col justify-center gap-4 px-10 text-3xl font-medium'
            >
              {HEADER_LINKS.items.map((item) => (
                <motion.li
                  key={item.textKey}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.link}
                    onClick={closeMenu}
                    aria-label={t(item.textKey)}
                    className='block py-3'
                  >
                    {t(item.textKey)}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
              }}
              transition={{
                delay: 0.3,
                duration: 0.35,
              }}
              className='border-foreground/10 border-t px-10 py-6'
            >
              <Link
                href={HEADER_LINKS.account.link}
                aria-label={t(HEADER_LINKS.account.textKey)}
                onClick={closeMenu}
                className='flex items-center gap-3'
              >
                <CircleUser size={28} strokeWidth={1.7} />

                <span>{HEADER_LINKS.account.textKey}</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
