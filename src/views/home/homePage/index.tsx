import { HeroParallax, ArticlesList } from '@/widgets';

export function HomePage() {
  return (
    <main className='bg-background text-foreground relative isolate min-h-dvh'>
      <HeroParallax />

      <ArticlesList />
    </main>
  );
}
