'use client';

import { ReactNode } from 'react';

import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  Timezone,
} from 'next-intl';
import { ThemeProvider } from 'next-themes';
import ReactLenis from 'lenis/react';

type Props = {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: Timezone;
};

export function ProvidersLayout({
  children,
  locale,
  messages,
  timeZone,
}: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
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
