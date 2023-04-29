import { asText } from '@prismicio/helpers';
import { SharedSlice } from '@prismicio/types';

import {
  HeroSlice,
  PageDocument,
  PostDocument,
  SettingsDocument,
} from '.slicemachine/prismicio';
import { linkResolver } from 'prismicio';
import { BlogPagePost, PageSeo } from 'types/common';

import { getRequiredEnvVariable } from './constants';

export const mapPageSeo = (
  page: PageDocument | PostDocument,
  settings: SettingsDocument
): PageSeo => {
  const siteDomain = getRequiredEnvVariable(
    process.env.NEXT_PUBLIC_SITE_URL,
    'NEXT_PUBLIC_SITE_URL'
  );
  const siteName = getRequiredEnvVariable(
    process.env.NEXT_PUBLIC_SITE_NAME,
    'NEXT_PUBLIC_SITE_NAME'
  );
  return {
    featured_image: page.data.featured_image,
    keywords: page.data.keywords ?? '',
    meta_description: page.data.meta_description ?? '',
    meta_title: page.data.meta_title ?? '',
    domain: siteDomain,

    logo: settings.data.logo,
    logo_invert: settings.data.logo_invert,
    favico: settings.data.favico,
    search_console_key: settings.data.search_console_key ?? '',
    site_name: siteName,
    theme_color: settings.data.theme_color ?? '#ffffff',
    path: linkResolver(page),
    type: page.type === 'page' ? 'website' : 'article',
    locale: page.lang,
    social_media: settings.data.social_media,
    contact_content: settings.data.contact_content,
    footer_background: settings.data.footer_background,
  };
};

export const mapBlogPagePosts = (
  results: PostDocument<string>[]
): BlogPagePost[] => {
  return results.map((_item) => {
    const heroSlice = _item.data.slices.find(
      (_slice: SharedSlice) => _slice.slice_type == 'hero'
    )! as HeroSlice;

    return {
      first_publication_date: _item.first_publication_date,
      uid: _item.uid,
      url: _item.url,
      lang: _item.lang,
      image: _item.data.featured_image,
      title: asText(heroSlice.primary.title),
      type: _item.type,
      meta_description: _item.data.meta_description,
      meta_title: _item.data.meta_title,
      keywords: _item.data.keywords,
    };
  });
};
