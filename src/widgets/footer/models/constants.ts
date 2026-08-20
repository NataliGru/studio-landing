import { Links } from '@/settings';

export const MORE_BLOG_ITEMS = {
  title: 'blogTitle',
  areaLabelKey: 'blogAreaLabel',
  items: [
    {
      textKey: 'about',
      link: Links.about,
    },
    {
      textKey: 'contributors',
      link: Links.index,
    },
    {
      textKey: 'writeForUs',
      link: Links.index,
    },
    {
      textKey: 'contact',
      link: Links.index,
    },
    {
      textKey: 'privacy',
      link: Links.index,
    },
  ],
};

export const MORE_COMPANY_ITEMS = {
  title: 'companyTitle',
  areaLabelKey: 'companyAreaLabel',
  items: [
    {
      textKey: 'team',
      link: Links.index,
    },
    {
      textKey: 'jobs',
      link: Links.index,
    },
    {
      textKey: 'press',
      link: Links.index,
    },
  ],
};
