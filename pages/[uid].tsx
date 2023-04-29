import { SliceZone } from '@prismicio/react';
import { GetStaticProps } from 'next';

import {
  PageDocument,
  NavigationDocument,
  SettingsDocument,
} from '.slicemachine/prismicio';
import { Layout } from '@components/templates/Layout';
import { getInstagramFeed } from '@utils/common';
//import { bienneBusinessJsonLd } from '@utils/jsonLd/business';
import { mapPageSeo } from '@utils/mappers';
import { components } from 'slices';
import { InstagramMedia } from 'types/common';

import { createRestClient, linkResolver } from '../prismicio';
interface IPage {
  page: PageDocument;
  navigation: NavigationDocument;
  settings: SettingsDocument;
  instagramFeed: InstagramMedia[];
}
const Page = ({ page, navigation, settings, instagramFeed }: IPage) => {
  return (
    <Layout
      navigation={navigation}
      settings={mapPageSeo(page, settings)}
      instagramFeed={instagramFeed}
    >
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const client = createRestClient();

  const page = await client.getByUID<PageDocument>(
    'page',
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

  const instagramFeed: InstagramMedia[] = getInstagramFeed();
  return {
    props: {
      instagramFeed,
      page,
      navigation,
      settings,
    },
  };
};

export async function getStaticPaths() {
  const client = createRestClient();

  const pages = (await client.getAllByType('page', { lang: '*' })) ?? [];

  return {
    paths: pages
      .filter((page) => !['blog', 'home'].includes(page.uid))
      .map((page) => linkResolver(page)),
    fallback: false,
  };
}
