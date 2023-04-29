import { Fragment } from 'react';

import { isFilled } from '@prismicio/helpers';
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';

import { HeroSlice } from '.slicemachine/prismicio';
import { Background } from '@components/atoms/Background';
import { NormalButton, PrismicButton } from '@components/atoms/CustomButtons';
import { Heading } from '@components/atoms/Heading';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { clsx, useResponsive } from '@utils/common';

const heroComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      className={clsx(
        'font-black text-lg md:text-2xl lg:text-3xl flex flex-col flex-nowrap relative',
        '[&_em]:text-5xl [&_em]:md:text-6xl [&_em]:lg:text-7xl [&_em]:text-primary [&_em]:not-italic [&_em]:font-light [&_em]:pb-10',
        //underline
        '[&_*:not(em)]:after:block [&_*:not(em)]:after:w-28 [&_*:not(em)]:after:h-px [&_*:not(em)]:after:absolute',
        ' [&_*:not(em)]:mb-10 [&_*:not(em)]:after:left-0',

        ' [&_*:not(em)]:after:bg-primary [&_*:not(em)]:after:mt-4 [&_*:not(em)]:after:mb-6',

        'lg:[&_*:not(em)]:after:w-40 lg:[&_*:not(em)]:after:mt-5'
      )}
    >
      {children}
    </Heading>
  ),
};

const Hero = ({ slice }: SliceComponentProps<HeroSlice>) => {
  const { md } = useResponsive();
  const backgroundImage = md
    ? slice.primary.backgroundImage
    : slice.primary.backgroundImage.mobile;

  if (slice.variation === 'noActionHero') {
    return (
      <section
        id={slice.primary.slice_id ?? undefined}
        className={clsx('relative group h-[50vh] min-h-[450px] z-[1]')}
      >
        <Background
          background={backgroundImage}
          className={clsx(
            'hero-background transition-all ease-ease duration-500',
            'before:z-[1]'
          )}
          imageClassName="opacity-75"
          priority
        />
        <div
          className={clsx(
            'w-full md:w-1/2 lg:w-1/2 absolute bottom-0 left-0',
            'translate-y-1/2 px-5',
            'md:translate-y-1/4 md:px-0',
            'lg:translate-y-1/4 lg:translate-x-10 '
          )}
        >
          <SectionInnerContainer
            className={clsx(
              'bg-white py-10 md:pb-0 w-full  md:w-full lg:w-5/6 lg:pt-14 lg:pl-12'
            )}
          >
            <PrismicRichText
              field={slice.primary.title}
              components={heroComponents}
            />
          </SectionInnerContainer>
        </div>
      </section>
    );
  }
  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={clsx(
        'hero-section group relative block h-screen',
        slice.primary.class ?? ''
      )}
    >
      <Background
        background={backgroundImage}
        className={clsx('hero-background ', 'h-screen')}
        imageClassName="opacity-75"
        priority
      />

      <SectionInnerContainer className="z-1 h-full">
        <div className="row flex h-full">
          <div className="column-1 w-full flex items-center md:w-3/4 lg:w-3/4">
            {isFilled.richText(slice.primary.title) && (
              <PrismicRichText
                components={heroComponents}
                field={slice.primary.title}
              />
            )}
          </div>
          <div className="column-2 w-full md:w-1/4 lg:w-1/4" />
        </div>
      </SectionInnerContainer>
      <div className="buttons-container z-[9] md:z-auto w-full fixed flex md:absolute max-w-5xl left-1/2 -translate-x-1/2 bottom-0">
        {slice.items.slice(0, 2).map((item, index) => {
          return isFilled.link(item.buttonlink) ? (
            <PrismicButton
              className={clsx(
                'rounded-none border-none w-full font-extrabold',
                'odd:text-text  odd:bg-white',
                'odd:hover:bg-primary odd:hover:text-white odd:shadow-[0_-35px_60px_-15px_rgba(0,0,0,0.3)]',
                'even:text-white  even:bg-primary ',
                'even:hover:bg-white even:hover:text-text',
                'md:bottom-0 md:w-1/2 md:absolute',
                'md:odd:left-0',
                'md:even:right-0 md:even:translate-y-full'
              )}
              key={index}
              field={item.buttonlink}
              text={item.buttontext}
            />
          ) : isFilled.keyText(item.buttontext) ? (
            <NormalButton
              key={index}
              className={clsx(
                'rounded-none border-none w-full font-extrabold ',
                'odd:text-text  odd:bg-white even:px-0.5 odd:px-0.5',
                'odd:hover:bg-primary odd:hover:text-white odd:shadow-[0_-35px_60px_-15px_rgba(0,0,0,0.3)]',
                'even:text-white  even:bg-primary ',
                'even:hover:bg-white even:hover:text-text',
                'md:bottom-0 md:w-1/2 md:absolute',
                'md:odd:left-0',
                'md:even:right-0 md:even:translate-y-full'
              )}
            >
              {item.buttontext}
            </NormalButton>
          ) : (
            <Fragment />
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
