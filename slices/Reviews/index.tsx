import React, { useState } from 'react';

import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';
import Image from 'next/image';
import Carousel from 'nuka-carousel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { ReviewsSlice } from '.slicemachine/prismicio';
import { LinesBackground } from '@components/atoms/Background';
import { NormalButton } from '@components/atoms/CustomButtons';
import { CustomLink } from '@components/atoms/CustomLink';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';
import { clsx } from '@utils/common';

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-sm text-darkgray font-normal text-left font-raleway">
      {children}
    </p>
  ),
};

const Reviews = ({ slice }: SliceComponentProps<ReviewsSlice>) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number, nextIndex: number) => {
    setCurrentSlide(nextIndex - index + index);
  };

  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={`testimonial-section-two  relative bg-[${
        slice.primary.background_color ?? '#FFFFFF'
      }] py-14 px-0 sm:py-20 md:py-40`}
    >
      <LinesBackground />
      <SectionInnerContainer className="max-w-7xl">
        <div className="trainer-detail relative">
          <div className="inner-box">
            <div className={`flex flex-wrap flex-row justify-center`}>
              <div className="flex basis-full flex-col px-4 text-center lg:basis-1/2">
                <SectionTitle
                  heading={slice.primary.title}
                  className="text-start lg:pr-4 mb-7 [&>h2]:sm:text-lg [&>h2]:md:text-3xl [&>h2]:font-black [&>p]:font-medium [&>p]:text-xs [&>p]:md:text-sm [&>p]:lg:text-sm [&_em]:pb-5"
                  align="left"
                />
              </div>

              <div className="flex justify-center flex-col lg:basis-1/2 max-w-full md:max-w-xl lg:max-w-[50%]">
                <div className="testimonial-outer relative">
                  <Carousel
                    beforeSlide={handleSlideChange}
                    slideIndex={currentSlide}
                    className="client-thumbs-carousel [&_.slide:not(.slide-current)_figure]:border-transparent [&_.slide:not(.slide-current)_figure]:opacity-50"
                    slidesToShow={1}
                    slidesToScroll={1}
                    wrapAround={slice.items.length > 1}
                    renderBottomCenterControls={() => null}
                    renderCenterLeftControls={({
                      previousDisabled,
                      previousSlide,
                    }) => (
                      <NormalButton
                        className={clsx('mt-[470px] sm:mt-96 px-7 py-3 ')}
                        onClick={previousSlide}
                        disabled={previousDisabled}
                        aria-label="avis button gauche"
                      >
                        <IoIosArrowBack size={20} />
                      </NormalButton>
                    )}
                    renderCenterRightControls={({
                      nextDisabled,
                      nextSlide,
                    }) => (
                      <NormalButton
                        className={clsx('mt-[470px] sm:mt-96 px-7 py-3 ')}
                        onClick={nextSlide}
                        disabled={nextDisabled}
                        aria-label="avis button droit"
                      >
                        <IoIosArrowForward size={20} />
                      </NormalButton>
                    )}
                  >
                    {slice.items.map((_item, key) => (
                      <div
                        key={key}
                        className="border-solid border border-gray p-8"
                      >
                        <PrismicRichText
                          field={_item.review}
                          components={components}
                        />
                        <div className="flex mt-4">
                          <Image
                            src={_item.image.url}
                            alt={_item.image.alt}
                            className="overflow-hidden w-14 h-14 block rounded-full mr-2"
                            width={40}
                            height={40}
                            quality={100}
                          />
                          <div className="flex flex-col justify-center text-text">
                            <span className="font-bold">{_item.name}</span>
                            <CustomLink
                              link={_item.social_media_link}
                              className="text-primary"
                            >
                              {_item.social_media_label}
                            </CustomLink>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionInnerContainer>
    </section>
  );
};

export default Reviews;
