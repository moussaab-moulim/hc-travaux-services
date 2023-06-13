import { useMemo } from 'react';

import { asText } from '@prismicio/helpers';
import { SliceZone } from '@prismicio/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { WithContext, ExerciseGym } from 'schema-dts';

import {
  NavigationDocument,
  PageDocument,
  PostDocument,
  SettingsDocument,
} from '.slicemachine/prismicio';
import { Layout } from '@components/templates/Layout';
import { getInstagramFeed } from '@utils/common';
//import { localeBusinessJsonLd } from '@utils/jsonLd/business';
import { getRequiredEnvVariable } from '@utils/constants';
import { mapBlogPagePosts, mapPageSeo } from '@utils/mappers';
import { createRestClient } from 'prismicio';
import { components } from 'slices';
import { BlogPagePost, InstagramMedia } from 'types/common';

interface IHome {
  page: PageDocument;
  navigation: NavigationDocument;
  settings: SettingsDocument;
  instagramFeed: InstagramMedia[];
  posts: BlogPagePost[];
}

export default function Home({
  page,
  navigation,
  settings,
  instagramFeed,
}: IHome) {
  /*   const [posts, { state }] = usePrismicDocumentsByType('post', {
    pageSize: 6,
    lang: 'fr',
    client: client,
  }); */
  const businessJsonLd = useMemo<WithContext<ExerciseGym>>(() => {
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
      '@type': 'ExerciseGym',
      name: siteName,
      url: siteDomain,
      '@id': siteDomain,
      logo: settings.data.logo.url,
      image: page.data.featured_image.url,
      description: globalJsonLd.description,
      telephone: globalJsonLd.telephone,
      sameAs: globalJsonLd.sameAs,
      openingHoursSpecification: globalJsonLd.openingHoursSpecification,
      priceRange: globalJsonLd.priceRange,

      address: globalJsonLd.address,
      location: globalJsonLd.location,
      areaServed: globalJsonLd.areaServed,
    };
  }, []);

  return (
    <Layout
      navigation={navigation}
      settings={mapPageSeo(page, settings)}
      instagramFeed={instagramFeed}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${JSON.stringify(businessJsonLd)}
          `,
          }}
          key="home-jsonld"
        />
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
      {/* <PostList posts={posts} /> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  /* **
   * GET Home Page
   * **/
  const client = createRestClient();

  const page = await client.getByUID<PageDocument>('page', 'home', {
    lang: locale,
  });
  const navigation = await client.getSingle<NavigationDocument>('navigation', {
    lang: locale,
  });
  const settings = await client.getSingle<SettingsDocument>('settings', {
    lang: locale,
  });

  /* **
   * GET Blog Posts
   * **/
  const postsResponse = await client.getByType<PostDocument>('post', {
    lang: locale,
    pageSize: 3,
  });
  const posts: BlogPagePost[] = mapBlogPagePosts(postsResponse.results);

  const instagramFeed: InstagramMedia[] = getInstagramFeed();

  return {
    props: {
      page,
      navigation,
      settings,
      instagramFeed,
      posts,
    },
  };
};
