import { ThemeToggle } from '@/features';

import { HeroParallax, ArticlesList } from '@/widgets';

export function HomePage() {
  return (
    <main className='bg-background text-foreground min-h-dvh'>
      <div className='fixed top-6 right-6 z-50'>
        <ThemeToggle />
      </div>

      <HeroParallax />

      <ArticlesList />

      {/* <div className='100dvh 100wv bg-black'></div> */}
    </main>
  );
}
