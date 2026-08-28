import { isAppLocale } from '@/shared';
import { notFound } from 'next/navigation';

export const getValidLocale = (locale: string) => {
  if (!isAppLocale(locale)) {
    notFound();
  }

  return locale;
};
