import React, { Fragment } from 'react';

import { ImageField } from '@prismicio/types';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

import { clsx } from '@utils/common';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface LightboxProps {
  toogle: boolean;
  onClose: () => void;
  images: ImageField[];
  initialIndex: number;
}

const Lightbox = ({ toogle, onClose, images, initialIndex }: LightboxProps) => {
  return (
    <Fragment>
      {toogle && (
        <div className="gallery w-full h-full inset-0 z-[9999] fixed">
          <div className="overlay relative h-full w-full flex justify-center items-center bg-black/80">
            <button
              className={clsx(
                'close_button bg-transparent border-none absolute ',
                'top-3 sm:top-14 right-3 lg:right-11 text-5xl',
                'text-white'
              )}
              onClick={onClose}
            >
              &times;
            </button>

            <div className="gallery_image relative block items-center justify-center h-3/4 w-3/4 max-w-[540px] lg:max-w-[630px] min-w-[300px] px-5">
              {/* <Image src={image.url} alt={image.alt} width={737} height={737} /> */}
              <Carousel
                selectedItem={initialIndex}
                showThumbs={true}
                showStatus={false}
                infiniteLoop={false}
                showIndicators={false}
              >
                {images.map((_item, key) => (
                  <Image
                    key={key}
                    src={_item.url}
                    alt={_item.alt}
                    width={737}
                    height={737}
                    quality={100}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Lightbox;
