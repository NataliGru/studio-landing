import { AppLocale } from '@/shared';
import { getTranslations } from 'next-intl/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const OPEN_GRAPH_LOCALES: Record<AppLocale, string> = {
  en: 'en_US',
  uk: 'uk_UA',
};

export const createMetadata = async (locale: AppLocale) => {
  const t = await getTranslations({
    locale,
    namespace: 'mainLayout',
  });

  const currentPath = `/${locale}`;

  const title = t('title');
  const description = t('description');
  const image = '/opengraph-image.webp';

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: title,
      template: t('titleTemplate'),
    },
    description,

    keywords: t('keywords')
      .split(',')
      .map((keyword) => keyword.trim()),

    alternates: {
      canonical: currentPath,

      languages: {
        en: '/en',
        uk: '/uk',
        'x-default': '/en',
      },
    },

    openGraph: {
      type: 'website',
      url: currentPath,
      title,
      description,
      siteName: t('siteName'),
      locale: OPEN_GRAPH_LOCALES[locale],
      alternateLocale: Object.values(OPEN_GRAPH_LOCALES).filter(
        (item) => item !== OPEN_GRAPH_LOCALES[locale],
      ),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },

    category: 'travel',
  };
};
