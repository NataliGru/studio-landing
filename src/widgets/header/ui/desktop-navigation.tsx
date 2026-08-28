import { getTranslations } from 'next-intl/server';
import { NAVIGATION_LINKS } from '../models/constants';
import { LocaleSwitcher, ThemeToggle } from '@/features';
import clsx from 'clsx';
import { LogoLink } from './logo-link';
import { AccountLink } from './account-link';
import { NavigationLink } from './navigation-link';

export const DesktopNavigation = async () => {
  const t = await getTranslations('navigation');

  return (
    <nav
      className={clsx(
        'hidden flex-row items-center justify-between gap-5 md:flex lg:gap-20 lg:px-10',
        'from-background/30 to-background/0 bg-linear-to-b backdrop-blur-md backdrop-brightness-90',
      )}
    >
      <LogoLink />

      <ul className='flex flex-row items-center gap-5 text-lg font-medium 2xl:text-2xl'>
        {NAVIGATION_LINKS.items.map((navigationItem) => (
          <li key={navigationItem.textKey} className='text-nowrap'>
            <NavigationLink
              link={navigationItem.link}
              label={t(navigationItem.textKey)}
            />
          </li>
        ))}
      </ul>
      <div className='flex flex-row items-center gap-5'>
        <LocaleSwitcher />

        <ThemeToggle />

        <AccountLink label={t(NAVIGATION_LINKS.account.textKey)} />
      </div>
    </nav>
  );
};
