import { ScrollToTop } from '@/features/scroll-to-top';
import { Footer } from '@/widgets';
import { HeaderNavigation } from '@/widgets/header';
import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className='bg-background text-foreground flex min-h-dvh flex-col'>
      <HeaderNavigation />
      <div className='relative z-0 flex-1'>{children}</div>
      <Footer />

      <ScrollToTop />
    </div>
  );
};
