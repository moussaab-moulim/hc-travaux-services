import { useMemo } from 'react';

import { asText } from '@prismicio/helpers';
import { SliceZone } from '@prismicio/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { WithContext, BlogPosting } from 'schema-dts';

import {
  NavigationDocument,
  PostDocument,
  SettingsDocument,
} from '.slicemachine/prismicio';
import { Layout } from '@components/templates/Layout';
import { getInstagramFeed } from '@utils/common';
import { getRequiredEnvVariable } from '@utils/constants';
import { mapPageSeo } from '@utils/mappers';
import { components } from 'slices';
import { InstagramMedia } from 'types/common';

import { createRestClient, linkResolver } from '../../../prismicio';

interface IPost {
  page: PostDocument;
  navigation: NavigationDocument;
  settings: SettingsDocument;
  instagramFeed: InstagramMedia[];
}
const Page = ({ page, navigation, settings, instagramFeed }: IPost) => {
  const pageSeo = mapPageSeo(page, settings);
  const postJson = useMemo<WithContext<BlogPosting>>(() => {
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
      '@type': 'BlogPosting',
      '@id': `${siteDomain}${pageSeo.path}`,
      headline: pageSeo.meta_title,
      name: pageSeo.meta_title,
      image: pageSeo.featured_image.url
        ? [
            pageSeo.featured_image.url.replace('?auto=compress,format', '') ??
              '',
          ]
        : [],
      datePublished: page.first_publication_date,
      dateModified: page.last_publication_date,
      author: globalJsonLd.author.map((a: any) => ({
        ...a,
        name: a.name.replace('${siteName}', siteName),
        url: a.url.replace('${siteDomain}', siteDomain),
        '@id': a['@id'].replace('${siteDomain}', siteDomain),
      })),
      publisher: globalJsonLd.author.map((a: any) => ({
        ...a,
        name: a.name.replace('${siteName}', siteName),
        url: a.url.replace('${siteDomain}', siteDomain),
        '@id': a['@id'].replace('${siteDomain}', siteDomain),
      })),
      description: pageSeo.meta_description,
      isAccessibleForFree: true,
    };
  }, []);
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
            __html: `${JSON.stringify(postJson)}
            `,
          }}
          key={'post-jsonld-' + page.uid}
        />
      </Head>
      {/* //TODO add from prismic
      <ArticleJsonLd
        type="BlogPosting"
        url={pageSeo.domain + pageSeo.path}
        title={pageSeo.meta_title}
        images={
          pageSeo.featured_image.url
            ? [
                pageSeo.featured_image.url.replace(
                  '?auto=compress,format',
                  ''
                ) ?? '',
              ]
            : []
        }
        datePublished={pageSeo.article.publishedTime}
        dateModified={pageSeo.article.modifiedTime}
        authorName={ JSON.parst(settings.jsonLd).author.map(a=>({name:a.name})
          [
          {
            name: 'Edison Ramirez',
            url: pageSeo.article.authors[0],
          },
          {
            name: 'Edison Ramirez',
            url: pageSeo.article.authors[1],
          },
        ]}
        publisherName="Edison Ramirez"
        publisherLogo={pageSeo.logo.url}
        description={pageSeo.meta_description}
        isAccessibleForFree={true}
      /> */}
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const client = createRestClient();

  const page = await client.getByUID<PostDocument>(
    'post',
    params.uid as string,
    {
      lang: locale,
    }
  );
  const navigation = await client.getSingle<NavigationDocument>('navigation', {
    lang: locale,
  });
  const settings = await client.getSingle<SettingsDocument>('settings', {
    lang: locale,
  });

  const instagramFeed = getInstagramFeed();
  return {
    props: {
      page,
      navigation,
      settings,
      instagramFeed,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const client = createRestClient();

  let pages: PostDocument<string>[] = [];

  for (let index = 0; index < locales.length; index++) {
    const locale = locales[index];
    const _pages = await client.getAllByType<PostDocument>('post', {
      lang: locale,
    });
    pages = pages.concat(_pages);
  }

  return {
    paths: pages.map((page) => linkResolver(page)),
    fallback: false,
  };
};
