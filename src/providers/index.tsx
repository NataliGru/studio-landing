'use client';

import { ReactNode } from 'react';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import ReactLenis from 'lenis/react';

type Props = {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};

export function ProvidersLayout({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute='data-theme'
        defaultTheme='dark'
        disableTransitionOnChange={false}
        enableSystem={false}
      >
        <ReactLenis root>{children}</ReactLenis>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
