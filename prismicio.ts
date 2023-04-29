import * as prismic from '@prismicio/client';
import {
  FilledLinkToDocumentField,
  FilledLinkToWebField,
  LinkField,
} from '@prismicio/types';

import sm from './sm.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

interface ResolverInput {
  lang: string;
  uid?: string;
  type: string;
}

export const linkResolver = (doc: ResolverInput) => {
  const lang = doc.lang === 'fr' ? '' : `/${doc.lang}`;
  let url = `${lang}/${doc.uid}`;
  if (doc.uid === 'home') {
    url = '/';
    return url;
  }
  if (doc.uid === 'blog') {
    url = `${lang}/blog/page/1`;
    return url;
  }
  if (doc.type === 'page') {
    url = `${lang}/${doc.uid}`;
    return url;
  }
  if (doc.type === 'post') {
    url = `${lang}/blog/posts/${doc.uid}`;
    return url;
  }

  return url;
};

export const webLinkResolver = (url: any) => {
  if (url.includes('https://action:')) return '';
  if (url.includes('https:///#')) return url.replace('https://', '');
  return url;
};

export const prismicLinkResolver = (linkField: LinkField) => {
  if (linkField.link_type === 'Web') {
    const typedLink = linkField as FilledLinkToWebField;
    return webLinkResolver(typedLink.url);
  } else {
    const typedLink = linkField as FilledLinkToDocumentField;
    return linkResolver(typedLink);
  }
};

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createRestClient = () => {
  const client = prismic.createClient(sm.apiEndpoint, {
    routes: [
      {
        type: 'page',
        uid: 'home',
        path: '/',
      },
      {
        type: 'page',
        uid: 'blog',
        path: '/blog/page/1',
      },
      { type: 'page', path: '/:uid' },
      { type: 'post', path: '/blog/posts/:uid' },
      { type: 'settings', path: '/' },
      { type: 'navigation', path: '/' },
    ],
  });

  return client;
};
