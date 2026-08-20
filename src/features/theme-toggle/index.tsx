'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { ToggleIconButton } from '@/shared';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='size-17.5' aria-hidden='true' />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <ToggleIconButton
      checked={isDark}
      onToggle={() => setTheme(isDark ? 'light' : 'dark')}
      checkedIcon={
        <Moon className='size-6.5 lg:size-7.5 2xl:size-10' strokeWidth={2} />
      }
      uncheckedIcon={
        <Sun className='size-6.5 lg:size-7.5 2xl:size-10' strokeWidth={2} />
      }
      ariaLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    />
  );
}
