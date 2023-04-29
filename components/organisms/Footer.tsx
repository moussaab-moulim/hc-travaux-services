import { Fragment } from 'react';

import { isFilled } from '@prismicio/helpers';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import { ImageField } from '@prismicio/types';
import Image from 'next/image';
import Link from 'next/link';

import { Background } from '@components/atoms/Background';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { clsx } from '@utils/common';
import { InstagramMedia } from 'types/common';

interface IFooter {
  logo: ImageField;
  instagramFeed: InstagramMedia[];
  contactDetails: any;
  backgroundImage: ImageField;
}
const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-sm font-raleway uppercase text-white leading-6 font-light">
      {children}
    </p>
  ),
};
export const Footer = ({ logo, backgroundImage, contactDetails }: IFooter) => {
  return (
    <Fragment>
      <footer
        className={'main-footer relative z-0 overflow-hidden pb-11 md:p-0'}
      >
        <Background
          background={backgroundImage}
          className={clsx(
            'before:absolute before:content-[""] before:left-0 before:top-0 before:right-0 before:bottom-0 before:z-[1] before:bg-black/70 '
          )}
        />
        <SectionInnerContainer>
          {/* Widgets Section */}
          <div className="widgets-section relative  pt-8 mt-5 ">
            <div
              className={clsx(
                'footer-widget logo-widget w-full flex flex-col items-center justify-center '
              )}
            >
              {isFilled.image(logo) && (
                <div
                  className={clsx(
                    'logo grid place-items-center w-full py-5',
                    'border-solid border-0 border-b border-white/20 '
                  )}
                >
                  <Link href="/" className="flex justify-center w-[100px] ">
                    <Image
                      src={logo.url}
                      alt={logo.alt ?? 'logo'}
                      className="w-full inline-block h-auto"
                      width={1000}
                      height={255}
                      quality={100}
                    />
                  </Link>
                </div>
              )}
              <div
                className={clsx(
                  'contact-details text-center w-full py-5 flex flex-col gap-4 justify-center md:justify-between items-center',
                  'md:flex-row',
                  'border-solid border-0 border-b border-white/20 '
                )}
              >
                {isFilled.richText(contactDetails) && (
                  <PrismicRichText
                    field={contactDetails}
                    components={components}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom text-center py-5 ">
            <div className="copyright relative text-white font-light uppercase font-raleway">
              <Link
                className="cursor-pointer"
                href="https://uchihadigital.com"
                target="_blank"
              >
                DESIGN BY Uchiha Digital.
              </Link>
            </div>
          </div>
        </SectionInnerContainer>
      </footer>
    </Fragment>
  );
};
