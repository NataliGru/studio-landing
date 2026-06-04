'use client';

import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

type Props = {
  children: ReactNode;
  locale: string;
};

export function ProvidersLayout({ children, locale }: Props) {
  return (
    <NextIntlClientProvider locale={locale}>
      <ThemeProvider
        attribute='data-theme'
        defaultTheme='dark'
        disableTransitionOnChange={false}
        enableSystem={false}
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
