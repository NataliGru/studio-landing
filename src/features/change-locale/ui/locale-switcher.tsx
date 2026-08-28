'use client';

import { Fragment, useTransition } from 'react';

import { Locale, useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { routing } from '@/shared';

import clsx from 'clsx';

import { usePathname, useRouter } from '@/shared';

export const LocaleSwitcher = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const params = useParams();

  const t = useTranslations();
  const currentLocale = useLocale(); //default value

  const onChangeLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale },
      );
    });
  };

  return (
    <div className={clsx('flex items-center gap-2')}>
      {routing.locales.map((localeItem) => {
        const isLastElement = localeItem === routing.locales.at(-1);

        return (
          <Fragment key={localeItem}>
            <button
              aria-label={`${t(`locale.label`)} ${t(`locale.${localeItem}`)}`}
              className={clsx(
                'cursor-pointer p-2',
                localeItem === currentLocale
                  ? 'text-accent'
                  : 'text-foreground/50 hover:text-foreground transition-all-300',
              )}
              onClick={() => onChangeLocale(localeItem)}
              disabled={localeItem === currentLocale || isPending}
            >
              {t(`locale.${localeItem}Short`)}
            </button>
            {!isLastElement && <span>|</span>}
          </Fragment>
        );
      })}
    </div>
  );
};
