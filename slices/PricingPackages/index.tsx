import React from 'react';

import { asText, isFilled } from '@prismicio/helpers';
import {
  JSXMapSerializer,
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react';
import Image from 'next/image';

import { PricingPackagesSlice } from '.slicemachine/prismicio';
import { LinesBackground } from '@components/atoms/Background';
import { PrismicButton } from '@components/atoms/CustomButtons';
import { Heading } from '@components/atoms/Heading';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';
import { clsx } from '@utils/common';

const listComponent: JSXMapSerializer = {
  list: ({ children }) => (
    <ul className="price-list relative mt-10">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-3 text-base list-inside list-['-'] text-left sm:mb-3 lg:text-base xl:text-base lg:mb-4 relative font-normal font-raleway text-text">
      {children}
    </li>
  ),
};
const PricingPackages = ({
  slice,
}: SliceComponentProps<PricingPackagesSlice>) => {
  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={clsx(
        'pricing-section relative ',
        `bg-[${slice.primary.background_color ?? '#FFFFFF'}]`,
        'pt-14 sm:pt-20 sm:pb-12 md:pt-36 md:pb-36 '
      )}
    >
      <LinesBackground />
      {/*       {isFilled.image(slice?.primary?.background) && (
        <Background
          background={slice.primary.background}
          className=" before:absolute before:content-[''] before:left-0 before:top-0 before:right-0 before:bottom-0 before:bg-[#0d0d0d]/90 before:z-[1]"
        />
      )} */}
      <SectionInnerContainer className="max-w-7xl relative">
        <SectionTitle
          heading={slice.primary.title}
          text={slice.primary.description}
          className={clsx(
            '[&>p]:text-base [&>p]:font-normal',
            'mb-20 sm:mb-10 md:mb-20'
          )}
        />

        <div className="relative flex flex-row flex-wrap justify-center">
          {/* Pricing Block */}

          {slice.items.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'relative bg-white basis-full max-w-md md:basis-1/2 lg:basis-1/3 px-4 mb-10'
              )}
            >
              <div
                className={clsx(
                  'flex flex-col flex-nowrap inner-box h-full py-10 px-4 sm:pt-12 sm:pb-14 sm:px-9 relative text-center ml-0 ',
                  'rounded shadow-allAround'
                )}
              >
                <div className="icon-box">
                  <span className="icon">
                    {isFilled.image(item.icon) && (
                      <Image
                        src={item.icon.url}
                        alt={item.icon.alt}
                        height={70}
                        width={70}
                        quality={100}
                      />
                    )}

                    <Heading
                      as="h3"
                      className={clsx(
                        'text-left !font-normal !text-2xl', // underline
                        'after:block after:w-28 after:h-px after:bg-primary after:mt-2 lg:after:w-40 lg:after:mt-5'
                      )}
                    >
                      <PrismicText field={item.title} />
                    </Heading>
                  </span>
                </div>
                <div className="flex justify-center items-end price relative text-text mt-10 mb-5 font-raleway text-5xl sm:text-6xl lg:text-6xl">
                  {asText(item.price).split('/')[0]}
                  {asText(item.price).split('/')[1] && (
                    <span className=" font-normal block text-xl font-raleway text-center">
                      {asText(item.price).split('/')[1]}
                    </span>
                  )}
                </div>
                <PrismicRichText field={item.list} components={listComponent} />
                <div className="flex-1" />
                <div className="mt-10">
                  <PrismicButton
                    buttonStyle="filled"
                    field={item.buttonlink}
                    text={item.buttonlabel}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionInnerContainer>
    </section>
  );
};

export default PricingPackages;
