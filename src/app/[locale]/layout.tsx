import { getMessages, setRequestLocale, getTimeZone } from 'next-intl/server';

import { ProvidersLayout } from '@/providers';
import { routing } from '@/shared';

import { AppShell } from './_ui/app-shell';
import { getValidLocale } from './_lib/get-valid-locale';
import { createMetadata } from './_lib/metadata';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>,
) {
  const { locale: rawLocale } = await props.params;

  const locale = getValidLocale(rawLocale);

  return createMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale: rawLocale } = await params;

  const locale = getValidLocale(rawLocale);

  setRequestLocale(locale);

  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <ProvidersLayout locale={locale} messages={messages} timeZone={timeZone}>
      <AppShell>{children}</AppShell>
    </ProvidersLayout>
  );
}
