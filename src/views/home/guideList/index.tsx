import { getTranslations } from 'next-intl/server';

import { GuideListClient, type GuideListItem } from './guide-list-client';

type GuideItemKey = 'first' | 'second' | 'third';

type GuideMediaSide = 'left' | 'right';

const GUIDE_ITEMS: Array<{
  key: GuideItemKey;
  imageSrc: string;
  imageSide: GuideMediaSide;
}> = [
  {
    key: 'first',
    imageSrc: '/photo/1.png',
    imageSide: 'right',
  },
  {
    key: 'second',
    imageSrc: '/photo/2.png',
    imageSide: 'left',
  },
  {
    key: 'third',
    imageSrc: '/photo/3.png',
    imageSide: 'right',
  },
];

export async function GuideList() {
  const t = await getTranslations('articles');

  const items: GuideListItem[] = GUIDE_ITEMS.map((item) => ({
    number: t(`${item.key}.number`),
    eyebrow: t(`${item.key}.subtitle`),
    title: t(`${item.key}.title`),
    description: t(`${item.key}.description`),
    readMore: t(`${item.key}.readMore`),
    href: `/blog#${item.key}`,
    imageSrc: item.imageSrc,
    imageAlt: t(`${item.key}.title`),
    imageSide: item.imageSide,
  }));

  return <GuideListClient items={items} />;
}
