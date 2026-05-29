// eslint-disable-next-line simple-import-sort/imports
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';

import { ProvidersLayout } from '@/providers';
import { cn, isAppLocale, routing } from '@/shared';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>,
) {
  const { locale } = await props.params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'LocaleLayout',
  });

  return {
    title: t('title'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className='h-full' lang={locale}>
      <body className={cn(inter.className, 'flex h-full flex-col')}>
        <ProvidersLayout>{children}</ProvidersLayout>
      </body>
    </html>
  );
}
