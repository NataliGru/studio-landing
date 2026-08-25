import { getTranslations } from 'next-intl/server';

import clsx from 'clsx';
import { ARTICLES, ARTICLES_LIST_ID } from '../model/constants';
import { ArticleItem } from './article-item';

export async function ArticlesList() {
  const t = await getTranslations('articles');

  const items = ARTICLES.map((item) => ({
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

  return (
    <section
      id={ARTICLES_LIST_ID}
      className={clsx(
        'bg-background text-foreground relative z-40',
        'px-10 py-24 sm:px-24 lg:py-32',
      )}
    >
      <div className='flex flex-col gap-25 lg:gap-50 2xl:gap-96'>
        {items.map((item) => (
          <ArticleItem key={item.number} {...item} />
        ))}
      </div>
    </section>
  );
}
