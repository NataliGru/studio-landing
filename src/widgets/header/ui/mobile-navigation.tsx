'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { MenuIcon, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { LocaleSwitcher, ThemeToggle } from '@/features';
import { ToggleIconButton, useToggle } from '@/shared';

import { NAVIGATION_LINKS } from '../models/constants';
import { LogoLink } from './logo-link';
import { AccountLink } from './account-link';
import { NavigationLink } from './navigation-link';
import { useMobileScrollLock } from '../lib/use-mobile-scroll-lock';
import {
  MENU_FOOTER_MOTION,
  MENU_LIST_ITEM_MOTION,
  MENU_LIST_MOTION,
  MENU_MOTION,
} from '../lib/mobile-navigation-animation';

export const MobileNavigation = () => {
  const t = useTranslations('navigation');

  const {
    isOpen: isOpenMenu,
    close: closeMenu,
    toggle: onToggle,
  } = useToggle();

  useMobileScrollLock({ isOpenMenu });

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
        <LogoLink onClick={closeMenu} />

        <div className='flex h-full items-center gap-10'>
          <ThemeToggle />

          <ToggleIconButton
            checked={isOpenMenu}
            onToggle={onToggle}
            checkedIcon={<X size={30} strokeWidth={2} />}
            uncheckedIcon={<MenuIcon size={30} strokeWidth={2} />}
            aria-expanded={isOpenMenu}
            aria-controls='mobile-navigation-menu'
            aria-label={isOpenMenu ? t('closeMenu') : t('openMenu')}
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            {...MENU_MOTION}
            className={clsx(
              'fixed inset-0 z-40 h-dvh w-dvw',
              'backdrop-blur-md backdrop-brightness-95',
              'flex flex-col',
            )}
          >
            <motion.ul
              {...MENU_LIST_MOTION}
              className='flex flex-1 flex-col justify-center gap-4 px-10 text-3xl font-medium'
            >
              {NAVIGATION_LINKS.items.map((navigationItem) => (
                <motion.li
                  key={navigationItem.textKey}
                  {...MENU_LIST_ITEM_MOTION}
                >
                  <NavigationLink
                    link={navigationItem.link}
                    label={t(navigationItem.textKey)}
                    onClick={closeMenu}
                  />
                </motion.li>
              ))}
            </motion.ul>

            <motion.div {...MENU_FOOTER_MOTION} className='mb-5 px-10 text-xl'>
              <LocaleSwitcher />
            </motion.div>

            <motion.div
              {...MENU_FOOTER_MOTION}
              className='border-foreground/10 border-t px-10 py-6'
            >
              <AccountLink
                label={t(NAVIGATION_LINKS.account.textKey)}
                showLabel
                onClick={closeMenu}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
