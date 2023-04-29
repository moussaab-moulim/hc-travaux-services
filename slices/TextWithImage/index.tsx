import React from 'react';

import { isFilled } from '@prismicio/helpers';
import { SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';

import { TextWithImageSlice } from '.slicemachine/prismicio';
import { LinesBackground } from '@components/atoms/Background';
import { PrismicButton } from '@components/atoms/CustomButtons';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';
import { clsx } from '@utils/common';

const TextWithImage = ({ slice }: SliceComponentProps<TextWithImageSlice>) => {
  const image = slice.primary.image;

  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={`sidebar-page-container relative bg-[${
        slice.primary.background_color ?? '#FFFFFF'
      }] pb-12 pt-20 py-0 lg:pt-40 lg:pb-28
        `}
    >
      <LinesBackground />
      <SectionInnerContainer>
        <div className="trainer-detail relative">
          <div className="inner-box  ">
            <div
              className={`
                flex flex-wrap
               ${slice.primary.right_text ? 'flex-row-reverse' : 'flex-row'}
              `}
            >
              {/* Column */}
              <div className="flex basis-full flex-wrap px-4 mb-10 md:mb-0 md:basis-1/2 ">
                <SectionTitle
                  heading={slice.primary.title}
                  text={slice.primary.text}
                  className="text-start lg:pr-4 mb-7 [&>h2]:sm:text-lg [&>h2]:md:text-3xl [&>h2]:font-black [&>p]:font-normal [&>p]:pb-5 [&>p]:text-base [&_em]:pb-5"
                  align="left"
                />
                <div className="basis-full flex justify-center md:justify-start">
                  {isFilled.link(slice.primary.buttonlink) && (
                    <PrismicButton
                      className="text-center md:text-left"
                      field={slice.primary.buttonlink}
                      text={slice.primary.buttonlabel}
                    />
                  )}
                </div>
              </div>
              {/* Column */}

              <div className="flex basis-full justify-center flex-col md:basis-1/2 cursor-pointer">
                <div className=" ">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    className={clsx(
                      'max-w-full h-auto w-full relative md:grayscale md:hover:grayscale-0 opacity-70',
                      'transition-all raleway-raleway duration-500'
                    )}
                    sizes="(max-width: 768px) 100vw,500px"
                    width={774}
                    height={500}
                    quality={85}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionInnerContainer>
    </section>
  );
};

export default TextWithImage;
