import { ArticleItemKey, ArticleMediaSide } from "./types";

export const ENTER_RANGE = [0, 0.35];
export const OPACITY_RANGE = [0, 0.1, 0.2];

export const DESCRIPTION_START_OPACITY = 0.15;
export const DESCRIPTION_SPREAD = 0.8;
export const DESCRIPTION_WORD_DURATION = 0.2;

export const ARTICLES: Array<{
  key: ArticleItemKey;
  imageSrc: string;
  imageSide: ArticleMediaSide;
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