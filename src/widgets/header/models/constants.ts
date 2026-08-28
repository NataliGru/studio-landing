import { Links } from '@/settings';

export const NAVIGATION_LINKS = {
  logo: {
    textKey: 'MNTN',
    link: Links.index,
  },
  items: [
    {
      textKey: 'equipment',
      link: Links.equipment.index,
    },
    {
      textKey: 'aboutUs',
      link: Links.about,
    },
    {
      textKey: 'blog',
      link: Links.blog.index,
    },
  ],
  account: {
    textKey: 'account',
    link: Links.account,
  },
};
