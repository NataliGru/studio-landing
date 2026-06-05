import { ThemeToggle } from '@/features';

import { GuideList } from '../guideList';
import { HeroParallax } from '../heroParallax';

export function HomePage() {
  return (
    <main className='bg-background text-foreground min-h-dvh'>
      <div className='fixed top-6 right-6 z-50'>
        <ThemeToggle />
      </div>
      <HeroParallax />
      <GuideList />
      <div className='100dvh 100wv bg-black'></div>
    </main>
  );
}
