import React, { useMemo } from 'react';

import { asText } from '@prismicio/helpers';
import { SliceZone } from '@prismicio/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { WithContext, Blog } from 'schema-dts';

import {
  NavigationDocument,
  PageDocument,
  PostDocument,
  SettingsDocument,
} from '.slicemachine/prismicio';
import { BlogList } from '@components/organisms/BlogList';
import { Layout } from '@components/templates/Layout';
import { createRestClient, linkResolver } from '@prismicio';
import { getInstagramFeed } from '@utils/common';
import { getRequiredEnvVariable } from '@utils/constants';
import { mapBlogPagePosts, mapPageSeo } from '@utils/mappers';
import { components } from 'slices';
import { BlogPagePost, InstagramMedia } from 'types/common';

interface IBlog {
  page: PageDocument;
  navigation: NavigationDocument;
  settings: SettingsDocument;
  instagramFeed: InstagramMedia[];
  posts: BlogPagePost[];
  totalPages: number;
}

const Index = ({
  page,
  navigation,
  settings,
  instagramFeed,
  posts,
  totalPages,
}: IBlog) => {
  const pageNumber = Number(useRouter().query.page as string);
  const pageSeo = mapPageSeo(page, settings);
  //TODO add JSON LD to prismic
  const blogJson = useMemo<WithContext<Blog>>(() => {
    const globalJsonLd = JSON.parse(asText(settings.data.jsonld));
    const siteDomain = getRequiredEnvVariable(
      process.env.NEXT_PUBLIC_SITE_URL,
      'NEXT_PUBLIC_SITE_URL'
    );
    const siteName = getRequiredEnvVariable(
      process.env.NEXT_PUBLIC_SITE_NAME,
      'NEXT_PUBLIC_SITE_NAME'
    );
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${siteDomain}/blog/page/${pageNumber}`,
      mainEntityOfPage: `${siteDomain}/blog/page/${pageNumber}`,
      name: pageSeo.meta_title,
      description: pageSeo.meta_description,
      publisher: globalJsonLd.author.map((a: any) => ({
        ...a,
        name: a.name.replace('${siteName}', siteName),
        url: a.url.replace('${siteDomain}', siteDomain),
        '@id': a['@id'].replace('${siteDomain}', siteDomain),
      })),
      blogPost: [
        ...posts.map((post) => {
          return {
            '@type': 'BlogPosting',
            '@id': siteDomain + linkResolver(post),
            url: siteDomain + linkResolver(post),
            mainEntityOfPage: siteDomain + linkResolver(post),
            headline: post.meta_title,
            name: post.title,
            description: post.meta_description,
            datePublished: post.first_publication_date,
            image: pageSeo.featured_image.url
              ? [
                  pageSeo.featured_image.url.replace(
                    '?auto=compress,format',
                    ''
                  ) ?? '',
                ]
              : [],
            keywords: post.keywords?.split(',').map((_k) => _k.trim()),
            author: globalJsonLd.author.map((a: any) => ({
              ...a,
              name: a.name.replace('${siteName}', siteName),
              url: a.url.replace('${siteDomain}', siteDomain),
              '@id': a['@id'].replace('${siteDomain}', siteDomain),
            })),
          };
        }),
      ],
    };
  }, [pageNumber]);

  return (
    <Layout
      navigation={navigation}
      settings={pageSeo}
      instagramFeed={instagramFeed}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${JSON.stringify(blogJson)}
            `,
          }}
          key="bolg-jsonld"
        />
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
      <BlogList posts={posts} totalPages={totalPages} page={pageNumber} />
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const client = createRestClient();

  const page = await client.getByUID('page', 'blog', { lang: locale });

  const postsResponse = await client.getByType<PostDocument>('post', {
    lang: locale,
    page: Number(params.page as string),
    pageSize: 6,
  });
  const totalPages = postsResponse.total_pages;
  const posts: BlogPagePost[] = mapBlogPagePosts(postsResponse.results);

  const navigation = await client.getSingle('navigation', { lang: locale });
  const settings = await client.getSingle('settings', { lang: locale });

  const instagramFeed = getInstagramFeed();

  return {
    props: {
      totalPages,
      posts,
      page,
      navigation,
      settings,
      instagramFeed,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const client = createRestClient();

  let pages: { locale: string; pages: number }[] = [];
  for (let index = 0; index < locales.length; index++) {
    const locale = locales[index];
    const _pages = await client.getByType<PostDocument>('post', {
      lang: locale,
      pageSize: 6,
    });
    pages.push({ locale: locale, pages: _pages.total_pages });
  }

  const routes: string[] = [];
  pages.forEach((_page) => {
    const lang = _page.locale === 'fr' ? '' : `/${_page.locale}`;

    for (let i = 1; i <= _page.pages; i++) {
      routes.push(`${lang}/blog/page/${i}`);
    }
  });

  return {
    paths: routes,
    fallback: false,
  };
};
