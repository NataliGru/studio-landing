import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import { LinkListWithTitle } from './link-list-with-title';
import { MORE_BLOG_ITEMS, MORE_COMPANY_ITEMS } from '../models/constants';

export const Footer = async () => {
  const t = await getTranslations('footer');

  return (
    <footer
      className={clsx(
        'flex flex-col gap-20 md:flex-row md:justify-between',
        'bg-background text-foreground relative',
        'px-10 py-24 sm:px-24 lg:py-32',
      )}
    >
      <div className='flex flex-col gap-6'>
        <h2 className='text-accent text-3xl font-bold 2xl:text-5xl'>MNTN</h2>

        <p className='3xl:text-4xl text-lg font-semibold 2xl:text-2xl'>
          {t('description')}
        </p>
      </div>

      <div className='flex flex-col gap-20 md:flex-row'>
        <LinkListWithTitle
          title={MORE_BLOG_ITEMS.title}
          items={MORE_BLOG_ITEMS.items}
          areaLabel={MORE_BLOG_ITEMS.areaLabelKey}
        />

        <LinkListWithTitle
          title={MORE_COMPANY_ITEMS.title}
          items={MORE_COMPANY_ITEMS.items}
          areaLabel={MORE_COMPANY_ITEMS.areaLabelKey}
        />
      </div>
    </footer>
  );
};
