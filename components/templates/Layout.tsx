import React, { Fragment } from 'react';

import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

import { NavigationDocument } from '.slicemachine/prismicio';
//import ContactForm from '@components/organisms/Contact/ContactForm';
import { FormLoading } from '@components/organisms/Contact/ContactForm';
import { Footer } from '@components/organisms/Footer';
import { Header } from '@components/organisms/Header';
import { GOOGLE_SEARCH_ID, raleway } from '@utils/common';
import { IGeneralComponentProps, InstagramMedia, PageSeo } from 'types/common';
const ContactForm = dynamic(
  () => import('@components/organisms/Contact/ContactForm'),
  {
    loading: () => <FormLoading />,
  }
);
interface ILayout extends IGeneralComponentProps {
  navigation: NavigationDocument;
  settings: PageSeo;
  instagramFeed: InstagramMedia[]; //TODO
}

export const Layout = ({
  navigation,
  settings,
  children,
  instagramFeed,
}: ILayout) => {
  return (
    <div className={`relative bg-white text-text ${raleway.variable} `}>
      <NextSeo
        title={settings.meta_title}
        titleTemplate={`%s | ${settings.site_name}`}
        description={settings.meta_description}
        openGraph={{
          title: settings.meta_title,
          description: settings.meta_description,
          url: settings.domain + settings.path,
          //TODO dynamic type
          type: settings.type,
          locale: settings.locale,
          site_name: settings.site_name,
          images: settings.featured_image.url
            ? [
                {
                  url:
                    settings.featured_image.url.replace(
                      '?auto=compress,format',
                      ''
                    ) ?? '',
                  alt: settings.featured_image.alt ?? settings.meta_title,
                  type: 'image/jpeg',
                  width: 1200,
                  height: 630,
                },
              ]
            : [],
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: settings.twitterHandle ?? '',
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          {
            httpEquiv: 'x-ua-compatible',
            content: 'IE=edge',
          },
          {
            name: 'keywords',
            content: settings.keywords,
          },
          {
            name: 'msapplication-TileColor',
            content: settings.theme_color,
          },
          {
            name: 'theme-color',
            content: settings.theme_color,
          },
          {
            name: 'google-site-verification',
            content: GOOGLE_SEARCH_ID ?? '',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: settings.favico?.md?.url ?? '',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            rel: 'icon',
            href: settings.favico?.url ?? '',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            rel: 'apple-touch-icon',
            href: settings.favico?.lg?.url ?? '',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            rel: 'mask-icon',
            href: settings.logo?.url ?? '',
            color: settings.theme_color,
          },
        ]}
      />
      <Header
        navigation={navigation}
        logo={settings.logo}
        siteName={settings.site_name}
        socialMedia={settings.social_media ?? []}
      />

      <main className="pt-20">
        <Fragment>
          {children}

          <ContactForm />
        </Fragment>
      </main>
      <Footer
        logo={settings.logo}
        contactDetails={settings.contact_content}
        instagramFeed={instagramFeed}
        backgroundImage={settings.footer_background}
      />
    </div>
  );
};
