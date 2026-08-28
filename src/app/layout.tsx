import { ReactNode } from 'react';
import { Montserrat_Alternates, Roboto_Serif } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { cn } from '@/shared';

import './globals.css';

type Props = {
  children: ReactNode;
};

const robotoSerif = Roboto_Serif({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto-serif',
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat-alternates',
});

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();

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
        <ThemeProvider
          attribute='data-theme'
          defaultTheme='dark'
          disableTransitionOnChange={false}
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
