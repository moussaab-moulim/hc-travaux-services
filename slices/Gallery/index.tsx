/* eslint-disable unused-imports/no-unused-vars */
import React, { useState } from 'react';

import { SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';

import { GallerySlice } from '.slicemachine/prismicio';
import { LinesBackground } from '@components/atoms/Background';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';
import Lightbox from '@components/organisms/Lightbox';
import { clsx } from '@utils/common';

const Gallery = ({ slice }: SliceComponentProps<GallerySlice>) => {
  const [currentImage, setCurrentImage] = useState(0);

  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <section
      id={slice.primary.slice_id ?? undefined}
      className={`gallery-section relative pt-16 px-0 pb-12 sm:pt-28  lg:pt-40 lg:pb-36 bg-[${
        slice?.primary?.background_color ?? '#FFFFFF'
      }]`}
    >
      <LinesBackground />
      <SectionInnerContainer>
        <SectionTitle
          heading={slice.primary.title}
          text={slice.primary.description}
          className={clsx('[&>p]:text-base [&>p]:font-normal', '[&>p]:py-5')}
        />
      </SectionInnerContainer>
      <div className="outer-container mt-8">
        <div className="flex flex-row flex-wrap justify-center">
          {/* Gallery Block */}
          {slice.items.map((_item, index) => {
            return (
              <div
                key={index}
                className="gallery-block basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6"
              >
                <div className="inner-box relative group">
                  <div
                    className={clsx(
                      'image cursor-pointer relative overflow-hidden'
                    )}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={_item.image.url}
                      alt={_item.image.url}
                      className={clsx(
                        'relative w-full opacity-75 block max-w-full h-auto md:grayscale md:hover:grayscale-0',
                        'transition-all raleway-raleway duration-500'
                      )}
                      width={200}
                      height={200}
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {viewerIsOpen && (
        <Lightbox
          toogle={viewerIsOpen}
          images={slice.items.map((i) => i.image)}
          initialIndex={currentImage}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
};

export default Gallery;
