import React, { Fragment } from 'react';

import { isFilled } from '@prismicio/helpers';
import { SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';

import { CtaSlice } from '.slicemachine/prismicio';
import { LinesBackground } from '@components/atoms/Background';
import { NormalButton, PrismicButton } from '@components/atoms/CustomButtons';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';
import { clsx } from '@utils/common';

const Cta = ({ slice }: SliceComponentProps<CtaSlice>) => {
  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={`gallery-section flex flex-col flex-nowrap relative pt-28 px-0 pb-12 md:pt-0 lg:pb-36 bg-[${
        slice?.primary?.background_color ?? '#FFFFFF'
      }]`}
    >
      <LinesBackground />
      <SectionInnerContainer className="flex w-full flex-nowrap flex-col-reverse">
        <div className="relative -mt-8  md:-mt-80 group">
          <Image
            src={slice.primary.background.url}
            alt={slice.primary.background.alt ?? 'logo'}
            className="w-full inline-block h-auto md:grayscale md:group-hover:grayscale-0 transition-all ease-ease duration-500 opacity-70"
            width={1238}
            height={800}
            quality={100}
          />
        </div>
        <div
          className={clsx(
            'flex flex-row py-0 md:pt-16 md:pb-24  relative',
            'md:justify-end'
          )}
        >
          <div
            className={clsx(
              'green-container bg-primary basis-full mx-5 pt-14 pb-7',
              'md:basis-1/2 md:pb-10 md:mx-0'
            )}
          >
            <SectionTitle
              heading={slice.primary.title}
              text={slice.primary.description}
              align="left"
              className={clsx(
                '[&_*]:text-left [&>p]:text-base [&>p]:font-normal',
                '[&>*]:text-white [&>h2_*]:text-white',
                '[&>h2_*:not(em)]:after:!bg-white [&>h2_*]:px-5 md:[&>h2_*]:px-10',
                '[&_p]:px-5 md:[&_p]:px-10'
              )}
            />
            <div className="button-container px-5 mt-5 md:px-10">
              {isFilled.link(slice.primary.buttonlink) ? (
                <PrismicButton
                  field={slice.primary.buttonlink}
                  text={slice.primary.buttonlabel}
                  buttonStyle="filled"
                  className={clsx(
                    '!border-white !text-primary !bg-white hover:!bg-primary hover:!text-white'
                  )}
                />
              ) : isFilled.keyText(slice.primary.buttonlabel) ? (
                <NormalButton
                  buttonStyle="filled"
                  className={clsx(
                    '!border-white !text-primary !bg-white hover:!bg-primary hover:!text-white'
                  )}
                >
                  {slice.primary.buttonlabel}
                </NormalButton>
              ) : (
                <Fragment />
              )}
            </div>
          </div>
        </div>
      </SectionInnerContainer>
    </section>
  );
};

export default Cta;
