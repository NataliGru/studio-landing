import { ThemeToggle } from '@/features';

import { GuideList } from '../guideList';
import { HeroParallaxDesktop } from '../heroParallaxDesktop';
import { HeroParallaxMobile } from '../heroParallaxMobile';

export function HomePage() {
  return (
    <main className='bg-background text-foreground min-h-dvh'>
      <div className='fixed top-6 right-6 z-50'>
        <ThemeToggle />
      </div>

      <div className='sm:hidden'>
        <HeroParallaxMobile />
      </div>

      <div className='hidden sm:block'>
        <HeroParallaxDesktop />
      </div>

      <GuideList />

      <div className='100dvh 100wv bg-black'></div>
    </main>
  );
}
