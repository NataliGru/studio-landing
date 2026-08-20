import Link from 'next/link';
import { FooterListItem } from '../models/types';
import { getTranslations } from 'next-intl/server';

interface LinkListWithTitleProps {
  title: string;
  items: FooterListItem[];
  areaLabel: string;
}

export const LinkListWithTitle = async ({
  title,
  items,
  areaLabel,
}: LinkListWithTitleProps) => {
  const t = await getTranslations('footer');

  return (
    <nav className='flex flex-col gap-6'>
      <h3 className='text-accent 3xl:text-4xl text-2xl font-bold 2xl:text-3xl'>
        {t(title)}
      </h3>

      <ul aria-label={t(areaLabel)} className='flex flex-col gap-4'>
        {items.map((item) => (
          <li
            key={item.textKey}
            className='group 3xl:text-3xl text-lg 2xl:text-2xl'
          >
            <Link href={item.link} className='block'>
              <span className='block w-fit'>
                {t(item.textKey)}

                <span className='bg-accent transition-all-300 block h-px w-0 group-hover:w-full 2xl:h-1' />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
