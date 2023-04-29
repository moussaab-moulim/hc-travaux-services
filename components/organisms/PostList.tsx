import React, { FC, useState } from 'react';

import Link from 'next/link';
import Carousel from 'nuka-carousel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { LinesBackground } from '@components/atoms/Background';
import { NormalButton } from '@components/atoms/CustomButtons';
import { Heading } from '@components/atoms/Heading';
import { BlogPostItem } from '@components/molecules/BlogPostItem';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { clsx, useResponsive } from '@utils/common';
import { BlogPagePost, IGeneralComponentProps } from 'types/common';

interface PostList {
  posts: BlogPagePost[];
}
const PostList: FC<IGeneralComponentProps<PostList>> = ({ posts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { lg } = useResponsive();
  const handleSlideChange = (index: number, nextIndex: number) => {
    setCurrentSlide(nextIndex - index + index);
  };

  return (
    <section
      className={`testimonial-section-two  relative py-14 px-0 sm:py-20 md:py-40`}
    >
      <LinesBackground />

      <SectionInnerContainer className="max-w-7xl inner-box flex flex-wrap flex-row justify-center">
        <div className="flex basis-full flex-col text-center lg:basis-1/2 mb-16 lg:mb-0">
          <div className="text-center self-center basis-full md:basis-1/2 md:text-left md:pl-10 md:pr-5 mb-12">
            <Heading
              as="h2"
              className={clsx(
                'relative font-extrabold text-base md:text-2xl lg:text-3xl flex flex-col',
                '[&_em]:text-4xl [&_em]:md:text-5xl [&_em]:text-text [&_em]:not-italic [&_em]:font-light',
                //underline
                '[&_*:not(em)]:after:block [&_*:not(em)]:after:w-28 [&_*:not(em)]:after:h-px [&_*:not(em)]:after:absolute',
                ' [&_*:not(em)]:mb-10 [&_*:not(em)]:after:left-1/2  [&_*:not(em)]:after:-translate-x-1/2',
                'md:[&_*:not(em)]:after:!left-0 md:[&_*:not(em)]:after:!translate-x-0',
                ' [&_*:not(em)]:after:bg-primary [&_*:not(em)]:after:mt-4 [&_*:not(em)]:after:mb-6',

                'lg:[&_*:not(em)]:after:w-40 lg:[&_*:not(em)]:after:mt-5'
              )}
            >
              <span>Derniers articles</span>
              <em>
                Des informations et des conseils sur le sport et la nutrition
              </em>
            </Heading>
          </div>
          <div className="flex justify-center lg:justify-start lg:px-10">
            <Link
              href={'/blog/page/1'}
              className={clsx(
                'cursor-pointer inline-block relative font-raleway text-sm px-12 py-4 font-medium uppercase text-primary bg-transparent border border-solid border-primary rounded-full hover:border-primary hover:bg-primary hover:text-white',
                'transition-all ease-ease duration-500',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Notre Blog
            </Link>
          </div>
        </div>

        <div className="flex justify-center flex-col pb-14 lg:basis-1/2 max-w-full md:max-w-xl lg:max-w-[50%]">
          <div className="testimonial-outer relative">
            <Carousel
              beforeSlide={handleSlideChange}
              slideIndex={currentSlide}
              className="client-thumbs-carousel [&_.slide:not(.slide-current)_figure]:border-transparent [&_.slide:not(.slide-current)_figure]:opacity-50"
              slidesToShow={lg ? 2 : 1}
              slidesToScroll={1}
              renderBottomCenterControls={() => null}
              renderCenterLeftControls={({
                previousDisabled,
                previousSlide,
              }) => (
                <NormalButton
                  className={clsx(
                    'mt-[520px] sm:mt-[620px] lg:mt-[340px] px-7 py-3'
                  )}
                  onClick={previousSlide}
                  disabled={previousDisabled}
                  aria-label="avis button gauche"
                >
                  <IoIosArrowBack size={20} />
                </NormalButton>
              )}
              renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                <NormalButton
                  className={clsx(
                    'mt-[520px] sm:mt-[620px] lg:mt-[340px] px-7 py-3'
                  )}
                  onClick={nextSlide}
                  disabled={nextDisabled}
                  aria-label="avis button droit"
                >
                  <IoIosArrowForward size={20} />
                </NormalButton>
              )}
            >
              {posts.map((_item, index) => {
                return (
                  <BlogPostItem
                    key={index}
                    post={_item}
                    className={clsx('[&_img]:aspect-[550/400]')}
                  />
                );
              })}
            </Carousel>
          </div>
        </div>
      </SectionInnerContainer>
    </section>
  );
};

export default PostList;
