import { HTMLAttributes } from 'react';

import { ImageField, RichTextField } from '@prismicio/types';

import {
  PostDocument,
  SettingsDocumentDataSocialMediaItem,
} from '.slicemachine/prismicio';

type IGeneralComponentProps<
  T = unknown,
  E extends HTMLAttributes<HTMLElement> = HTMLAttributes<HTMLElement>
> = T & E;

type Nullable<T> = T | null;

export interface PageSeo {
  featured_image: ImageField;
  keywords: string;
  meta_description: string;
  meta_title: string;
  logo: ImageField;
  logo_invert: ImageField;
  favico: ImageField<'lg' | 'md'>;
  domain: string;
  search_console_key: string;
  site_name: string;
  theme_color: string;
  path: string;
  locale: string;
  type: string;
  social_media: SettingsDocumentDataSocialMediaItem[];
  contact_content: RichTextField;
  footer_background: ImageField;
  twitterHandle?: string;
}

type FilledLink =
  | FilledLinkToWebField
  | FilledLinkToDocumentField
  | FilledLinkToMediaField;

interface BlogPagePost
  extends Pick<
    PostDocument,
    'first_publication_date' | 'uid' | 'url' | 'lang' | 'type'
  > {
  image: ImageField;
  title: string;
  meta_description: string;
  meta_title: string;
  keywords: string;
}

export interface InstagramMedia {
  url: string;
  alt: string;
  linkTo: string;
}
