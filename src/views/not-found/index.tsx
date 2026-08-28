import { Links } from '@/settings';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export const NotFoundPage = async () => {
  const t = await getTranslations('notFound');

  return (
    <div className='flex flex-col items-center justify-center gap-10 py-20'>
      <div className='relative flex h-full w-full flex-1 flex-col items-center justify-center gap-5 px-10 py-20 text-center'>
        <div
          aria-hidden
          className='text-foreground/5 absolute -z-10 text-[clamp(12rem,30vw,30rem)] font-bold'
        >
          404
        </div>

        <p className='text-accent 3xl:text-3xl flex items-center gap-4 text-base font-bold xl:text-xl'>
          <span className='bg-accent h-px w-16' /> {t('eyebrow')}
        </p>

        <h1 className='3xl:text-9xl text-3xl font-semibold sm:text-5xl lg:text-7xl 2xl:text-[84px]'>
          {t('title')}
        </h1>

        <p className='3xl:text-5xl sm:text-lg lg:text-xl 2xl:text-2xl'>
          {t('description')}
        </p>

        <Link
          href={Links.index}
          className='3xl:text-5xl border-accent hover:bg-accent/20 transition-all-300 block rounded-2xl border px-3 py-5 sm:text-lg lg:text-xl 2xl:text-2xl'
        >
          {t('backHome')}
        </Link>
      </div>

      <Image
        src={'/not-found-image.webp'}
        alt='compass'
        width={655}
        height={819}
        sizes='(min-width: 655px) 50vw, 100vw'
        className='pointer-events-none aspect-655/819'
      />
    </div>
  );
};
