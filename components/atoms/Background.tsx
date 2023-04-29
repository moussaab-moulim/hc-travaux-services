import React from 'react';
import { FC } from 'react';

import { isFilled } from '@prismicio/helpers';
import { ImageField } from '@prismicio/types';
import Image, { ImageProps } from 'next/image';

import { clsx } from '@utils/common';
import { IGeneralComponentProps } from 'types/common';

interface IBackground extends Partial<ImageProps> {
  imageClassName?: string;
  priority?: boolean;
}
interface IBackgroundPrismic extends IBackground {
  background: ImageField;
}
interface IBackgroundNormal extends IBackground {
  url: string;
  alt: string;
}

export const Background: FC<IGeneralComponentProps<IBackgroundPrismic>> = (
  props
) => {
  const { background, className, imageClassName, priority, ...rest } = props;
  return (
    <div
      className={clsx(
        'absolute h-full w-full overflow-hidden z-[0] top-0 bg-white',
        className ?? ''
      )}
    >
      {isFilled.image(background) && (
        <Image
          alt={background.alt ?? 'background image'}
          src={background.url}
          fill
          className={`object-center object-cover opacity-75 ${
            imageClassName ?? ''
          }`}
          quality={100}
          priority={priority}
          {...rest}
        />
      )}
    </div>
  );
};
export const BackgroundNormal: FC<IGeneralComponentProps<IBackgroundNormal>> = (
  props
) => {
  const {
    url,
    alt,
    className,
    imageClassName: imageClassname,
    priority,
    ...rest
  } = props;
  return (
    <div
      className={clsx(
        'absolute h-full w-full overflow-hidden z-[0] top-0 bg-transparent',
        className ?? ''
      )}
    >
      <Image
        alt={alt ?? 'background image'}
        src={url}
        fill
        className={`object-center object-cover ${imageClassname ?? ''}`}
        quality={100}
        priority={priority}
        {...rest}
      />
    </div>
  );
};

export const LinesBackground: FC<IGeneralComponentProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        'absolute h-full w-full overflow-hidden z-[0] top-0 bg-transparent',
        className ?? ''
      )}
    >
      <span className="absolute block h-full w-[0.7px] bg-neutral-200/70 left-1/4"></span>
      <span className="absolute block h-full w-[0.7px] bg-neutral-200/70 left-1/2"></span>
      <span className="absolute block h-full w-[0.7px] bg-neutral-200/70 left-3/4"></span>
    </div>
  );
};
