import { Raleway } from '@next/font/google';
import { useMediaQuery } from 'react-responsive';

import { InstagramMedia } from 'types/common';

import instagramMedia from '../instagram.json';
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
export const GOOGLE_SEARCH_ID = process.env.NEXT_PUBLIC_SEARCH_CONSOLE;

export const getInstagramFeed = (): InstagramMedia[] => {
  //if (process.env.NODE_ENV !== 'production') return [];

  return instagramMedia as InstagramMedia[];
};

export const raleway = Raleway({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const useResponsive = () => {
  const sm = useMediaQuery({
    query: '(min-width: 640px)',
  });
  const md = useMediaQuery({
    query: '(min-width: 768px)',
  });
  const lg = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  const xl = useMediaQuery({
    query: '(min-width: 1280px)',
  });
  const xxl = useMediaQuery({
    query: '(min-width: 1536px)',
  });

  return { sm, md, lg, xl, xxl };
};

export const clsx = (...inputs: string[]): string => {
  return inputs.reduce((prev, next) => `${prev} ${next}`, '');
};
