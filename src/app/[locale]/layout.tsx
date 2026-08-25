import {
  getMessages,
  getTranslations,
  setRequestLocale,
  getTimeZone,
} from 'next-intl/server';
import { Montserrat_Alternates, Roboto_Serif } from 'next/font/google';
import { notFound } from 'next/navigation';

import { ProvidersLayout } from '@/providers';
import { cn, isAppLocale, routing } from '@/shared';
import { Footer } from '@/widgets';
import { HeaderNavigation } from '@/widgets/header';
import { ScrollToTop } from '@/features/scroll-to-top';

const robotoSerif = Roboto_Serif({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto-serif',
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat-alternates',
});

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

  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <html className='h-full' lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          montserratAlternates.className,
          robotoSerif.variable,
          montserratAlternates.variable,
          'flex h-full flex-col',
        )}
      >
        <ProvidersLayout
          locale={locale}
          messages={messages}
          timeZone={timeZone}
        >
          <div className='bg-background text-foreground flex min-h-dvh flex-col'>
            <HeaderNavigation />
            <div className='relative z-0 flex-1'>{children}</div>
            <Footer />

            <ScrollToTop />
          </div>
        </ProvidersLayout>
      </body>
    </html>
  );
}
