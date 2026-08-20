import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { HEADER_LINKS } from '../models/constants';
import { ThemeToggle } from '@/features';
import clsx from 'clsx';
import { CircleUser } from 'lucide-react';

export const DesktopNavigation = async () => {
  const t = await getTranslations('navigation');

  return (
    <nav
      className={clsx(
        'hidden flex-row items-center justify-between gap-10 md:flex lg:gap-20 lg:px-10',
        'from-background/30 to-background/0 bg-linear-to-b backdrop-blur-md backdrop-brightness-90',
      )}
    >
      <Link href={HEADER_LINKS.logo.link} className='p-5 2xl:p-8'>
        <h2 aria-label='logo' className='text-3xl font-bold 2xl:text-5xl'>
          {HEADER_LINKS.logo.textKey}
        </h2>
      </Link>

      <ul className='flex flex-row items-center gap-5 text-lg font-medium 2xl:text-2xl'>
        {HEADER_LINKS.items.map((item) => (
          <li key={item.textKey} className='text-nowrap'>
            <Link href={item.link} className='p-5'>
              {t(item.textKey)}
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex flex-row items-center gap-10'>
        <ThemeToggle />

        <Link href={HEADER_LINKS.account.link} className='p-5'>
          <CircleUser
            className='size-6.5 lg:size-7.5 2xl:size-10'
            strokeWidth={2}
          />
        </Link>
      </div>
    </nav>
  );
};
