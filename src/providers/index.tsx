'use client';

import { ReactNode, useEffect } from 'react';

import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  Timezone,
} from 'next-intl';
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
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      <ReactLenis root>{children}</ReactLenis>
    </NextIntlClientProvider>
  );
}
