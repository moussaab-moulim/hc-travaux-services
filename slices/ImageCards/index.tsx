import React from 'react';

import { isFilled } from '@prismicio/helpers';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';

import {
  ImageCardsSlice,
  ImageCardsSliceDefaultItem,
  ImageCardsSliceImageCardsWithNoTextItem,
  Simplify,
} from '.slicemachine/prismicio';
import { LinesBackground } from '@components/atoms/Background';
import { buttonClassName } from '@components/atoms/CustomButtons';
import { CustomLink } from '@components/atoms/CustomLink';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';
import { clsx } from '@utils/common';
import { FilledLink } from 'types/common';

interface IImageCard {
  item: Simplify<ImageCardsSliceDefaultItem>;
  parentSize: number;
  index: number;
}
const ImageCard = ({ item, index }: IImageCard) => {
  return (
    <div
      className={`coach-block relative basis-full p-0 sm:basis-1/2  md:basis-1/3 xl:basis-1/${3}`}
    >
      {/* Overlay Box */}
      {/*      <div
        className={clsx(
          'before:absolute before:inset-0 before:h-full before:z-[1] before:bg-black/50 before:transition-transform before:duration-500 before:ease-ease',
          'lg:before:bg-transparents lg:before:scale-x-0 lg:group-hover:before:scale-x-100'
        )}
      /> */}
      {isFilled.link(item.buttonLink) && (
        <CustomLink
          link={item.buttonLink as FilledLink}
          className="absolute inset-0 w-full h-full z-[2]"
        />
      )}

      <div
        className={clsx(
          'image-box h-full relative overflow-hidden',
          'grid grid-rows-2 justify-center items-center'
        )}
      >
        <div
          className={`row-start-1 relative ${
            index % 2 === 0 ? 'sm:row-start-1' : 'sm:row-start-2'
          }  aspect-square`}
        >
          <Image
            src={item.image.url}
            alt={item.image.alt}
            className={clsx(
              'absolute h-full w-full overflow-hidden object-cover opacity-75',
              'md:grayscale md:hover:grayscale-0',
              'transition-all ease-ease duration-500'
            )}
            width={737}
            height={737}
          />
        </div>

        <div
          className={clsx(`text-box z-auto aspect-square gap-y-3 overlay-inner text-center flex flex-col justify-center items-center
          [&>h3]:sm:text-sm [&>h3]:lg:text-2xl [&>h3]:text-primary [&>h3]:font-black  row-start-2 ${
            index % 2 === 0 ? 'sm:row-start-2' : 'sm:row-start-1'
          } `)}
        >
          <PrismicRichText field={item.title} />

          <div
            className={clsx(
              '[&>p]:font-normal [&>p]:text-base',
              '[&>p]:text-center [&>p]:sm:px-4'
            )}
          >
            <PrismicRichText field={item.text} />
          </div>
          <div />

          {/*      {isFilled.link(item.buttonLink) && (
            <div
              className={`lg:hidden ${buttonClassName} group-hover:before:opacity-100 group-hover:before:scale-100 group-hover:text-text group-hover:border-white`}
            >
              <span className="relative z-10">Découvrir</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
interface IImageCardNoText {
  item: Simplify<ImageCardsSliceImageCardsWithNoTextItem>;
  parentSize: number;
}
const ImageCardNotext = ({ item }: IImageCardNoText) => {
  const image = item.image;
  return (
    <div className="coach-block group relative basis-full p-0 sm:basis-1/3 md:basis-1/3 xl:basis-1/5 order-1">
      {isFilled.link(item.buttonLink) && (
        <CustomLink
          link={item.buttonLink as FilledLink}
          className="absolute inset-0 w-full h-full z-[2]"
        />
      )}

      <div className="inner-box relative">
        <div className="image relative overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt}
            width={480}
            height={703}
            quality={100}
            className="block relative w-full"
          />
          <div
            className={clsx(
              'overlay-box flex flex-nowrap justify-center items-center absolute left-0 top-0 right-0 bottom-0 bg-black/20'
            )}
          >
            <div className="overlay-inner py-8 px-4 text-center [&>h3]:text-2xl z-[1] group-hover:outlined-text">
              <PrismicRichText field={item.title} />

              {isFilled.link(item.buttonLink) && (
                <div
                  className={`lg:hidden mt-7  ${buttonClassName} group-hover:before:opacity-100 group-hover:before:scale-100 group-hover:text-text group-hover:border-white`}
                >
                  <span className="relative z-10">Découvrir</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageCards = ({ slice }: SliceComponentProps<ImageCardsSlice>) => {
  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={`relative bg-[${
        slice?.primary?.background_color ?? '#FFFFFF'
      }]`}
    >
      <LinesBackground />
      {isFilled.richText(slice.primary.heading) && (
        <SectionInnerContainer>
          <SectionTitle
            heading={slice.primary.heading}
            text={slice.primary.text}
            className="md:py-10 md:px-10 mb-5 [&>p]:font-normal [&>p]:text-base"
          />
        </SectionInnerContainer>
      )}

      <div className="flex flex-wrap lg:mx-10 justify-center">
        {slice.items.map((item, index) =>
          slice.variation === 'imageCardsWithNoText' ? (
            <ImageCardNotext
              item={item}
              key={index}
              parentSize={slice.items.length}
            />
          ) : (
            <ImageCard
              item={item as Simplify<ImageCardsSliceDefaultItem>}
              key={index}
              parentSize={slice.items.length}
              index={index}
            />
          )
        )}
      </div>
    </section>
  );
};

export default ImageCards;
