'use client';

import { useLenis } from 'lenis/react';
import { useEffect } from 'react';

interface UseMobileScrollLock {
  isOpenMenu: boolean;
}

export const useMobileScrollLock = ({ isOpenMenu }: UseMobileScrollLock) => {
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
};
