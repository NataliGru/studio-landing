const GUIDE_ITEMS = [
  {
    number: '01',
    eyebrow: 'Get started',
    title: 'What level of hiker are you?',
    description:
      'Choose the pace, distance, and terrain that match your experience before you head into the mountains.',
  },
  {
    number: '02',
    eyebrow: 'Hiking essentials',
    title: 'Picking the right hiking gear',
    description:
      'Build a compact kit around weather, elevation, and the amount of time you plan to spend on the trail.',
  },
  {
    number: '03',
    eyebrow: 'Where you go is the key',
    title: 'Understand your map and timing',
    description:
      'Plan your route around daylight, elevation gain, and the safest places to turn back if conditions change.',
  },
];

export function GuideList() {
  return (
    <section className='bg-background text-foreground relative z-40 px-6 py-24 sm:px-10 lg:px-12'>
      <div className='mx-auto grid max-w-5xl gap-20'>
        {GUIDE_ITEMS.map((item) => (
          <article
            key={item.number}
            className='relative grid gap-6 md:grid-cols-[160px_1fr]'
          >
            <span className='font-heading text-surface-muted text-8xl leading-none font-bold md:text-9xl'>
              {item.number}
            </span>

            <div className='max-w-2xl pt-2'>
              <p className='text-accent mb-4 flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase'>
                <span className='bg-accent h-px w-14' />
                {item.eyebrow}
              </p>
              <h2 className='mb-5 text-3xl leading-tight font-semibold text-balance md:text-5xl'>
                {item.title}
              </h2>
              <p className='text-muted max-w-xl text-sm leading-7'>
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
